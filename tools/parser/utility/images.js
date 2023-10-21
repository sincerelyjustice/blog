const { globalRegex } = require("../../../lib/string");
const { getTransformation } = require("./transformations");

const getImageLinkMatches = (text) => {
  const transformation = getTransformation('image');
  const matches = text.matchAll(globalRegex(transformation.regex));
  return Array.from(matches);
};

const getImageReferences = (text) => {
  const imageMatches = getImageLinkMatches(text);
  return imageMatches.map((match) => match[2]);
};

module.exports = { getImageReferences };
