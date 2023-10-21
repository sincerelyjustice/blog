const fs = require('fs');
const path = require('path');

const arrayToPath = (array) => {
  return path.join(...array);
};

const forwardSlashes = (path) => {
  return path.replace(/\\/g, '/');
};

const copyDir = (source, destination) => {
  const contents = fs.readdirSync(source);
  for (const item of contents) {
    const itemSource = path.join(source, item);
    const itemDestination = path.join(destination, item);
    const stats = fs.statSync(itemSource);
    if (stats.isFile()) {
      fs.copyFileSync(itemSource, itemDestination);
    } else if (stats.isDirectory()) {
      if (!fs.existsSync(itemDestination)) {
        fs.mkdirSync(itemDestination);
      }
      copyDir(itemSource, itemDestination);
    }
  }
};

module.exports = { arrayToPath, forwardSlashes, copyDir };
