const path = require('path');
const { negator, equalityFactory } = require('../../../../lib/function');
const { copyJson } = require('../../../../lib/object');
const { isEscaped, replaceIfNotEscaped } = require('../../../../lib/string');
const { forwardSlashes } = require('../../../../lib/file-system');
const { getDistImagesPath } = require('../../config/selectors');
const {
  writeImageMetadata,
  writeImagesMetadata,
  removeImage,
  copyImage,
  getImagesMetadata,
} = require('./file-system');

const IMG_LINK_REGEX = /\!\[(.*?)\]\((.*?)\)/g;

const getImageReferences = (text) => {
  const linkMatches = Array.from(text.matchAll(IMG_LINK_REGEX));
  const isUnescapedMatch = (match) => !isEscaped(text, match.index);
  const getImageReference = (match) => match[2];
  return linkMatches.filter(isUnescapedMatch).map(getImageReference);
};

const setImagePaths = (text) => {
  const replacer = (_, alt, src) => {
    const imgPath = path.join(getDistImagesPath(), src);
    return `![${alt}](/${forwardSlashes(imgPath)})`;
  };
  return replaceIfNotEscaped(text, IMG_LINK_REGEX, replacer);
};

const addImage = (name, blogTitle) => {
  copyImage(name);
  addImageMetada(name, blogTitle);
};

const addImageMetada = (name, blogTitle) => {
  const imagesMetadata = getImagesMetadata();
  const currentData = imagesMetadata[name];
  let updatedData;
  if (currentData) {
    updatedData = {
      featuredIn: [...currentData.featuredIn, blogTitle],
    };
  } else {
    updatedData = {
      featuredIn: [blogTitle],
    };
  }
  writeImageMetadata(name, updatedData);
};

const cleanupImages = (titleOfRemovedBlog) => {
  const imagesMetadata = getImagesMetadata();
  const updatedMetadata = copyJson(imagesMetadata);
  for (const image of Object.keys(imagesMetadata)) {
    const { featuredIn } = imagesMetadata[image];
    if (featuredIn.includes(titleOfRemovedBlog)) {
      if (featuredIn.length === 1) {
        removeImage(image);
        updatedMetadata[image] = undefined;
      } else {
        updatedMetadata[image] = {
          featuredIn: featuredIn.filter(
            negator(equalityFactory(titleOfRemovedBlog))
          ),
        };
      }
    }
  }
  writeImagesMetadata(updatedMetadata);
};

module.exports = { getImageReferences, setImagePaths, addImage, cleanupImages };
