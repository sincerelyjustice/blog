const { makeParagraphTransformations } = require('./types/paragraph');
const { makeHeadingTransformations } = require('./types/heading');
const { makeListTransformations } = require('./types/list');

const transformations = [
  ...makeParagraphTransformations(),
  ...makeHeadingTransformations(),
  ...makeListTransformations(),
];

module.exports = {
  transformations,
};
