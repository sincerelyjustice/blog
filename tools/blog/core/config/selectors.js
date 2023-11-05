const { arrayToPath } = require('js-toolkit/file-system');

const config = require('./config.json');

const getSrcRoot = () => config.src.paths.root;
const getSrcApp = () => arrayToPath(config.src.paths.app);
const getSrcBlogsPath = () => arrayToPath(config.src.paths.blogs);
const getSrcImagesPath = () => arrayToPath(config.src.paths.images);

const getPublicRoot = () => config.public.paths.root;
const getPublicBlogsPath = () => arrayToPath(config.public.paths.blogs);
const getPublicImagesPath = () => arrayToPath(config.public.paths.images);
const getBlogsIndexPath = () => arrayToPath(config.public.paths.index);

module.exports = {
  getSrcRoot,
  getSrcApp,
  getSrcBlogsPath,
  getSrcImagesPath,
  getPublicRoot,
  getPublicBlogsPath,
  getPublicImagesPath,
  getBlogsIndexPath,
};
