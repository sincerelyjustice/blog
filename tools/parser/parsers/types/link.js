const path = require('path');
const { globalRegex } = require('../../../../lib/string');
const { wrapWithTags, selfClosingTag } = require('../../utility/tags');
const { getTransformation } = require('../../utility/transformations');

const addLinks = (text) => {
  const transformation = getTransformation('link');
  const htmlLinkReplacer = (_, linkText, href) =>
    wrapWithTags(linkText, transformation.tag, { href });
  return text.replace(globalRegex(transformation.regex), htmlLinkReplacer);
};

const addImages = (text, imageDirectory) => {
  const transformation = getTransformation('image');
  const htmlLinkReplacer = (_, alt, ref) => {
    const src = path.join(imageDirectory, ref);
    return selfClosingTag(transformation.tag, { src, alt });
  };
  return text.replace(globalRegex(transformation.regex), htmlLinkReplacer);
};

module.exports = { addLinks, addImages };
