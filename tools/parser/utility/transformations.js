const { transformations } = require('../transformations');

const getTransformation = (name) => {
  return transformations.find((transformation) => transformation.name === name);
};

const isLineTransformation = (transformation) => {
  const newlinesRgx = /^\n+$/;
  return newlinesRgx.test(transformation.delimiter);
};

module.exports = { getTransformation, isLineTransformation };
