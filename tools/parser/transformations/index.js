const { makeParagraphTransformations } = require('./types/paragraph');
const { makeHeadingTransformations } = require('./types/heading');
const { makeListTransformations } = require('./types/list');
const { makeLinkTransformations } = require('./types/link');

const transformations = [
  ...makeParagraphTransformations(),
  ...makeHeadingTransformations(),
  ...makeListTransformations(),
  ...makeLinkTransformations(),
];

module.exports = {
  transformations,
};
