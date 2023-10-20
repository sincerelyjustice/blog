const { globalise } = require('../../../../lib/string');
const { wrapWithTags } = require('../../utility/tags');
const { getTransformation } = require('../../utility/transformations');

const addLinks = (text) => {
  const transformation = getTransformation('link');
  const htmlLinkReplacer = (_, linkText, href) =>
    wrapWithTags(linkText, transformation.tag, { href });
  return text.replace(globalise(transformation.regex), htmlLinkReplacer);
};

module.exports = { addLinks };
