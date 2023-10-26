const fs = require('fs');
const path = require('path');
const { copyJson } = require('../../../../lib/object');
const {
  getSrcRoot,
  getDistRoot,
  getSrcBlogsPath,
  getBlogsIndexPath,
  getSrcImagesPath,
  getDistImagesPath,
} = require('../config/selectors');

const ROOT_DIR = path.join(__dirname, '..', '..', '..', '..');
const SRC_DIR = path.join(ROOT_DIR, getSrcRoot());
const DIST_DIR = path.join(ROOT_DIR, getDistRoot());

const BLOGS_SRC = path.join(SRC_DIR, getSrcBlogsPath());
const BLOGS_INDEX = path.join(DIST_DIR, getBlogsIndexPath());
const IMAGES_SRC = path.join(SRC_DIR, getSrcImagesPath());
const IMAGES_DIST = path.join(DIST_DIR, getDistImagesPath());

const getBlogsIndex = () => JSON.parse(fs.readFileSync(BLOGS_INDEX, 'utf-8'));
const getBlogs = () => getBlogsIndex().blogs;
const getImagesMetadata = () => getBlogsIndex().metadata.images;

const readSourceFile = (name) => {
  const sourceFile = path.join(BLOGS_SRC, name);
  if (!fs.existsSync(sourceFile)) {
    console.log(`\nCould not find source file '${name}'.`);
    process.exit(1);
  }
  return fs.readFileSync(sourceFile, 'utf-8');
};

const writeBlogs = (newBlogs) => {
  const index = getBlogsIndex();
  fs.writeFileSync(
    BLOGS_INDEX,
    JSON.stringify({
      ...index,
      blogs: newBlogs,
    }),
  );
};

const copyImage = (name) => {
  const imageFile = path.join(IMAGES_SRC, name);
  if (!fs.existsSync(imageFile)) {
    console.log(
      `\nYour blog makes reference to an image '${name}', which could not be found.`,
    );
    process.exit(1);
  }
  const distImageFile = path.join(IMAGES_DIST, name);
  fs.copyFileSync(imageFile, distImageFile);
};

const writeImageMetadata = (name, data) => {
  const updatedIndex = copyJson(getBlogsIndex());
  updatedIndex.metadata.images[name] = data;
  fs.writeFileSync(BLOGS_INDEX, JSON.stringify(updatedIndex));
};

const writeImagesMetadata = (data) => {
  const updatedIndex = copyJson(getBlogsIndex());
  updatedIndex.metadata.images = data;
  fs.writeFileSync(BLOGS_INDEX, JSON.stringify(updatedIndex));
};

const removeImage = (name) => {
  const imageFile = path.join(IMAGES_DIST, name);
  fs.unlinkSync(imageFile);
};

module.exports = {
  getBlogsIndex,
  getBlogs,
  getImagesMetadata,
  readSourceFile,
  writeBlogs,
  copyImage,
  writeImageMetadata,
  writeImagesMetadata,
  removeImage,
};
