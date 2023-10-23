const { getWhitespace } = require('../../../../lib/string');
const { getTransformation } = require('../../utility/transformations');
const { openTag, closeTag } = require('../../utility/tags');

const addLists = (portions) => {
  let parsedPortions = portions;
  const olTransformation = getTransformation('ordered.list');
  const ulTransformation = getTransformation('unordered.list');
  parsedPortions = applyListTransformation(parsedPortions, olTransformation);
  parsedPortions = applyListTransformation(parsedPortions, ulTransformation);
  return parsedPortions;
};

const applyListTransformation = (portions, transformation) => {
  return portions.map((portion) => parsePortion(portion, transformation));
};

const parsePortion = (portion, transformation) => {
  const parsedPortion = [];
  let listDepth = 0;
  let unclosedListItem = false;

  const getLineDepth = (leadingSpaces) => {
    const indentation = leadingSpaces ? leadingSpaces.length : 0;
    return 1 + indentation / transformation.indentation;
  };

  const indentTag = (tag, multiplier) => {
    return getWhitespace(multiplier * transformation.indentation) + tag;
  };

  const addItem = (content) => {
    const openItem = openTag(transformation.itemTag);
    parsedPortion.push(indentTag(openItem, listDepth) + content);
    unclosedListItem = true;
  };

  const cleanupItem = () => {
    if (unclosedListItem) {
      const lastLine = parsedPortion.pop();
      parsedPortion.push(lastLine + closeTag(transformation.itemTag));
      unclosedListItem = false;
    }
  };

  const openLists = (upToDepth) => {
    while (listDepth < upToDepth) {
      const openList = openTag(transformation.tag);
      parsedPortion.push(indentTag(openList, listDepth));
      listDepth++;
    }
  };

  const closeLists = (downToDepth) => {
    while (listDepth > downToDepth) {
      const closeList = closeTag(transformation.tag);
      parsedPortion.push(indentTag(closeList, listDepth - 1));
      listDepth--;
    }
  };

  for (const line of portion) {
    const match = line.match(transformation.regex);
    if (match) {
      const spaces = match[1];
      const content = match[2];
      const lineDepth = getLineDepth(spaces);
      cleanupItem();
      openLists(lineDepth);
      closeLists(lineDepth);
      addItem(content);
    } else {
      parsedPortion.push(line);
    }
  }

  cleanupItem();
  closeLists(0);

  return parsedPortion;
};

module.exports = { addLists };
