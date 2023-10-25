const { arrayToPath } = require('../../../../lib/file-system');

const config = require('./config.json');

const getSrcRoot = () => config.src.paths.root;
const getSrcApp = () => arrayToPath(config.src.paths.app);
const getSrcBlogsPath = () => arrayToPath(config.src.paths.blogs);
const getSrcImagesPath = () => arrayToPath(config.src.paths.images);

const getDistRoot = () => config.dist.paths.root;
const getDistBlogsPath = () => arrayToPath(config.dist.paths.blogs);
const getDistImagesPath = () => arrayToPath(config.dist.paths.images);
const getBlogsIndexPath = () => arrayToPath(config.dist.paths.index);

module.exports = {
  getSrcRoot,
  getSrcApp,
  getSrcBlogsPath,
  getSrcImagesPath,
  getDistRoot,
  getDistBlogsPath,
  getDistImagesPath,
  getBlogsIndexPath,
};
