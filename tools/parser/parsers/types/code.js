const { globalise } = require('../../../../lib/string');
const { wrapPortion } = require('../../utility/portions');
const { wrapWithTags } = require('../../utility/tags');
const { getTransformation } = require('../../utility/transformations');

const addInlineCode = (text) => {
  const transformation = getTransformation('code.inline');
  const htmlCodeReplacer = (_, codeText) =>
    wrapWithTags(codeText, transformation.tag);
  return text.replace(globalise(transformation.regex), htmlCodeReplacer);
};

const addBlockCode = (portions) => {
  const parsedPortions = [];
  const transformation = getTransformation('code.block');
  for (const portion of portions) {
    const match = portion[0].match(transformation.regex);
    if (match) {
      const subTagged = wrapPortion(portion, transformation.subTag, {
        newFirstLine: match[1],
      });
      const tagged = wrapPortion(subTagged, transformation.tag);
      parsedPortions.push(tagged);
    } else {
      parsedPortions.push(portion);
    }
  }
  return parsedPortions;
};

module.exports = { addInlineCode, addBlockCode };
