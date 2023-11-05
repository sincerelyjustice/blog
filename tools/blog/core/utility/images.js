const { negator, equalityFactory } = require('js-toolkit/function');
const { copyJson } = require('js-toolkit/object');
const {
  writeImageMetadata,
  writeImagesMetadata,
  removeImage,
  copyImage,
  getImagesMetadata,
} = require('./file-system');
const { getImageReferences } = require('./parse');

const addBlogImages = (blogText, blogTitle) => {
  const imageRefs = getImageReferences(blogText);
  imageRefs.forEach((ref) => addImage(ref, blogTitle));
};

const addImage = (name, blogTitle) => {
  copyImage(name);
  addImageMetada(name, blogTitle);
};

const addImageMetada = (name, blogTitle) => {
  const imagesMetadata = getImagesMetadata();
  const currentData = imagesMetadata[name];
  let updatedData;
  if (currentData?.featuredIn.includes(blogTitle)) {
    updatedData = currentData;
  } else if (currentData) {
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
        delete updatedMetadata[image];
      } else {
        updatedMetadata[image].featuredIn = featuredIn.filter(
          negator(equalityFactory(titleOfRemovedBlog)),
        );
      }
    }
  }
  writeImagesMetadata(updatedMetadata);
};

module.exports = { addBlogImages, cleanupImages };
