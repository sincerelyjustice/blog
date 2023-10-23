const { globalRegex } = require('../../../../lib/string');
const { escapeInlineCharacters, unescapedReplace } = require('../../utility/escape');
const { wrapPortion, replaceFirstLine } = require('../../utility/portions');
const { wrapWithTags } = require('../../utility/tags');
const { getTransformation } = require('../../utility/transformations');

const addInlineCode = (text) => {
  const transformation = getTransformation('code.inline');
  const htmlCodeReplacer = (_, codeText) =>
    wrapWithTags(codeText, transformation.tag);
  return unescapedReplace(
    text,
    globalRegex(transformation.regex),
    htmlCodeReplacer
  );
};

const addBlockCode = (portions) => {
  const parsedPortions = [];
  const transformation = getTransformation('code.block');
  for (const portion of portions) {
    const match = portion[0].match(transformation.regex);
    if (match) {
      let parsedPortion = replaceFirstLine(portion, match[1]);
      parsedPortion = parsedPortion.map(escapeInlineCharacters);
      parsedPortion = wrapPortion(parsedPortion, transformation.subTag);
      parsedPortion = wrapPortion(parsedPortion, transformation.tag);
      parsedPortions.push(parsedPortion);
    } else {
      parsedPortions.push(portion);
    }
  }
  return parsedPortions;
};

module.exports = { addInlineCode, addBlockCode };
