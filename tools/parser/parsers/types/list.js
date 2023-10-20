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

  const indentTag = (tag, multiplier) => {
    return getWhitespace(multiplier * transformation.indentation) + tag;
  };

  const cleanupItem = () => {
    if (unclosedListItem) {
      const lastLine = parsedPortion.pop();
      parsedPortion.push(lastLine + closeTag(transformation.itemTag));
      unclosedListItem = false;
    }
  };

  const cleanupLists = () => {
    while (listDepth > 0) {
      const closeList = closeTag(transformation.tag);
      parsedPortion.push(indentTag(closeList, listDepth - 1));
      listDepth--;
    }
  };

  for (const line of portion) {
    const match = line.match(transformation.regex);
    if (match) {
      cleanupItem();

      const indentation = match[1] ? match[1].length : 0;
      const lineDepth = 1 + indentation / transformation.indentation;

      // open the necessary new lists
      while (lineDepth > listDepth) {
        const openList = openTag(transformation.tag);
        parsedPortion.push(indentTag(openList, listDepth));
        listDepth++;
      }

      // close the necessary open lists
      while (lineDepth < listDepth) {
        const closeList = closeTag(transformation.tag);
        parsedPortion.push(indentTag(closeList, listDepth - 1));
        listDepth--;
      }

      // add new item
      const openItem = openTag(transformation.itemTag);
      parsedPortion.push(indentTag(openItem, listDepth) + match[2]);
      unclosedListItem = true;
    } else {
      parsedPortion.push(line);
    }
  }

  cleanupItem();
  cleanupLists();

  return parsedPortion;
};

module.exports = { addLists };
