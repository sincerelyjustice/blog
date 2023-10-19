const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..', '..', '..');
const SRC_DIR = path.join(ROOT_DIR, 'src', 'blogs');
const DIST_FILE = path.join(ROOT_DIR, 'dist', 'blogs', 'index.json');

const readSourceFile = (name) => {
  const sourceFile = path.join(SRC_DIR, name);
  if (!fs.existsSync(sourceFile)) {
    console.log(`Could not find source file '${name}'.`);
    process.exit(1);
  }
  return fs.readFileSync(sourceFile, 'utf-8');
};

const getBlogs = () => {
  return JSON.parse(fs.readFileSync(DIST_FILE, 'utf-8'));
};

const writeBlogs = (newBlogs) => {
  fs.writeFileSync(DIST_FILE, JSON.stringify(newBlogs));
};


module.exports = { readSourceFile, getBlogs, writeBlogs };
