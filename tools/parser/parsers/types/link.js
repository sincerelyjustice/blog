const { globalise } = require('../../../../lib/string');
const { wrapWithTags, selfClosingTag } = require('../../utility/tags');
const { getTransformation } = require('../../utility/transformations');

const addLinks = (text) => {
  const transformation = getTransformation('link');
  const htmlLinkReplacer = (_, linkText, href) =>
    wrapWithTags(linkText, transformation.tag, { href });
  return text.replace(globalise(transformation.regex), htmlLinkReplacer);
};

const addImages = (text) => {
  const transformation = getTransformation('image');
  const htmlLinkReplacer = (_, alt, src) =>
    selfClosingTag(transformation.tag, { src, alt });
  return text.replace(globalise(transformation.regex), htmlLinkReplacer);
};

module.exports = { addLinks, addImages };
