const { removeDuplicates } = require('../../../lib/array');
const { transformations } = require('../transformations');

const getTransformation = (name) => {
  return transformations.find((transformation) => transformation.name === name);
};

const isPortionTransformation = (transformation) => {
  const newlinesRgx = /^\n+$/;
  return newlinesRgx.test(transformation.delimiter);
};

const getInlineTransformingCharacters = () => {
  const inlineTransformingChars = [];
  for (const transformation of transformations) {
    if (!isPortionTransformation(transformation)) {
      inlineTransformingChars.push(...transformation.specialChars);
    }
  }
  return removeDuplicates(inlineTransformingChars);
};

module.exports = {
  getTransformation,
  isPortionTransformation,
  getInlineTransformingCharacters,
};
