const path = require('path');
const { copyDir } = require('../../lib/file-system');
const { getSrcRoot, getDistRoot, getSrcApp } = require('../config');

const ROOT_DIR = path.join(__dirname, '..', '..');
const APP_DIR = path.join(ROOT_DIR, getSrcRoot(), getSrcApp());
const DIST_DIR = path.join(ROOT_DIR, getDistRoot());

copyDir(APP_DIR, DIST_DIR);
