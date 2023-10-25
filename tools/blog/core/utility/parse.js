const path = require('path');
const { isEscaped, replaceIfNotEscaped } = require('../../../../lib/string');
const { forwardSlashes } = require('../../../../lib/file-system');
const { getDistImagesPath } = require('../config/selectors');

const IMG_LINK_REGEX = /\!\[(.*?)\]\((.*?)\)/g;

const getImageReferences = (sourceText) => {
  const linkMatches = Array.from(sourceText.matchAll(IMG_LINK_REGEX));
  const isUnescapedMatch = (match) => !isEscaped(sourceText, match.index);
  const getImageReference = (match) => match[2];
  return linkMatches.filter(isUnescapedMatch).map(getImageReference);
};

const setImagePaths = (sourceText) => {
  const replacer = (_, alt, src) => {
    const imgPath = path.join(getDistImagesPath(), src);
    return `![${alt}](/${forwardSlashes(imgPath)})`;
  };
  return replaceIfNotEscaped(sourceText, IMG_LINK_REGEX, replacer);
};

const makeContent = (sourceText) => {
  return setImagePaths(sourceText);
};

module.exports = { makeContent, getImageReferences };
