const path = require('path');

const arrayToPath = (array) => {
  return path.join(...array);
};

const forwardSlashes = (path) => {
  return path.replace(/\\/g, '/');
};

module.exports = { arrayToPath, forwardSlashes };
