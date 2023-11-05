const fs = require('fs');
const path = require('path');
const { copyJson } = require('js-toolkit/object');
const {
  getSrcRoot,
  getPublicRoot,
  getSrcBlogsPath,
  getBlogsIndexPath,
  getSrcImagesPath,
  getPublicImagesPath,
} = require('../config/selectors');

const ROOT_DIR = path.join(__dirname, '..', '..', '..', '..');
const SRC_DIR = path.join(ROOT_DIR, getSrcRoot());
const PUBLIC_DIR = path.join(ROOT_DIR, getPublicRoot());

const BLOGS_SRC = path.join(SRC_DIR, getSrcBlogsPath());
const BLOGS_INDEX = path.join(PUBLIC_DIR, getBlogsIndexPath());
const IMAGES_SRC = path.join(SRC_DIR, getSrcImagesPath());
const IMAGES_PUBLIC = path.join(PUBLIC_DIR, getPublicImagesPath());

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
  const publicImageFile = path.join(IMAGES_PUBLIC, name);
  fs.copyFileSync(imageFile, publicImageFile);
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
  const imageFile = path.join(IMAGES_PUBLIC, name);
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
