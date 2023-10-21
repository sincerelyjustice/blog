const { arrayToPath } = require('../../../../lib/path');

const config = require('./index.json');

const getSrcRoot = () => {
  return config.src.paths.root;
};

const getSrcBlogsPath = () => {
  return arrayToPath(config.src.paths.blogs);
};

const getSrcImagesPath = () => {
  return arrayToPath(config.src.paths.images);
};

const getDistRoot = () => {
  return config.dist.paths.root;
};

const getDistBlogsPath = () => {
  return arrayToPath(config.dist.paths.blogs);
};

const getDistImagesPath = () => {
  return arrayToPath(config.dist.paths.images);
};

const getBlogsIndexPath = () => {
  return arrayToPath(config.dist.paths.index);
};

module.exports = {
  getSrcRoot,
  getSrcBlogsPath,
  getSrcImagesPath,
  getDistRoot,
  getDistBlogsPath,
  getDistImagesPath,
  getBlogsIndexPath,
};
