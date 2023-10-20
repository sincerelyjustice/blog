const fs = require('fs');
const path = require('path');
const { copyJson } = require('../../../../lib/object');

const ROOT_DIR = path.join(__dirname, '..', '..', '..', '..');
const SRC_DIR = path.join(ROOT_DIR, 'src', 'blogs');
const DIST_DIR = path.join(ROOT_DIR, 'dist', 'blogs');

const DIST_INDEX_FILE = path.join(DIST_DIR, 'index.json');

const SRC_IMAGE_DIR = path.join(SRC_DIR, 'images');
const DIST_IMAGE_DIR = path.join(DIST_DIR, 'images');

const getBlogsIndex = () =>
  JSON.parse(fs.readFileSync(DIST_INDEX_FILE, 'utf-8'));
const getBlogs = () => getBlogsIndex().blogs;
const getImagesMetadata = () => getBlogsIndex().metadata.images;

const readSourceFile = (name) => {
  const sourceFile = path.join(SRC_DIR, name);
  if (!fs.existsSync(sourceFile)) {
    console.log(`\nCould not find source file '${name}'.`);
    process.exit(1);
  }
  return fs.readFileSync(sourceFile, 'utf-8');
};

const writeBlogs = (newBlogs) => {
  const index = getBlogsIndex();
  fs.writeFileSync(
    DIST_INDEX_FILE,
    JSON.stringify({
      ...index,
      blogs: newBlogs,
    })
  );
};

const copyImage = (name) => {
  const imageFile = path.join(SRC_IMAGE_DIR, name);
  if (!fs.existsSync(imageFile)) {
    console.log(
      `\nYour blog makes reference to an image '${name}', which could not be found.`
    );
    process.exit(1);
  }
  const distImageFile = path.join(DIST_IMAGE_DIR, name);
  fs.copyFileSync(imageFile, distImageFile);
};

const writeImageMetadata = (name, data) => {
  const updatedIndex = copyJson(getBlogsIndex());
  updatedIndex.metadata.images[name] = data;
  fs.writeFileSync(DIST_INDEX_FILE, JSON.stringify(updatedIndex));
};

const writeImagesMetadata = (data) => {
  const updatedIndex = copyJson(getBlogsIndex());
  updatedIndex.metadata.images = data;
  fs.writeFileSync(DIST_INDEX_FILE, JSON.stringify(updatedIndex));
};

const removeImage = (name) => {
  const imageFile = path.join(DIST_IMAGE_DIR, name);
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
