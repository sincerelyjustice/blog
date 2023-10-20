const { globalise } = require('../../../../lib/string');
const { wrapWithTags } = require('../../utility/tags');
const { getTransformation } = require('../../utility/transformations');

const addEmphasis = (text) => {
  let parsedText = text;
  const types = ['bold', 'italic', 'underline'];
  const transformations = types.map(getTransformation);
  for (const transformation of transformations) {
    const htmlLinkReplacer = (_, emphaticText) =>
      wrapWithTags(emphaticText, transformation.tag);
    parsedText = parsedText.replace(
      globalise(transformation.regex),
      htmlLinkReplacer
    );
  }
  return parsedText;
};

module.exports = { addEmphasis };
