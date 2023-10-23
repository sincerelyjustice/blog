const { globalRegex } = require('../../../../lib/string');
const { unescapedReplace } = require('../../utility/escape');
const { wrapWithTags } = require('../../utility/tags');
const { getTransformation } = require('../../utility/transformations');

const addEmphasis = (text) => {
  let parsedText = text;
  const types = ['bold', 'italic', 'underline']; // purposeful order
  const transformations = types.map(getTransformation);
  for (const transformation of transformations) {
    const htmlLinkReplacer = (_, emphaticText) =>
      wrapWithTags(emphaticText, transformation.tag);
    parsedText = unescapedReplace(
      parsedText,
      globalRegex(transformation.regex),
      htmlLinkReplacer
    );
  }
  return parsedText;
};

module.exports = { addEmphasis };
