const { getTransformation } = require('./transformations');
const { unescapedMatchAll } = require('./escape');

const getImageLinkMatches = (text) => {
  const transformation = getTransformation('image');
  return unescapedMatchAll(text, transformation.regex);
};

const getImageReferences = (text) => {
  const imageMatches = getImageLinkMatches(text);
  return imageMatches.map((match) => match[2]);
};

module.exports = { getImageReferences };
