const { makeParagraphTransformations } = require('./types/paragraph');
const { makeHeadingTransformations } = require('./types/heading');
const { makeListTransformations } = require('./types/list');
const { makeLinkTransformations } = require('./types/link');
const { makeCodeTransformations } = require('./types/code');
const { makeEmphasisTransformations } = require('./types/emphasis');

const transformations = [
  ...makeParagraphTransformations(),
  ...makeHeadingTransformations(),
  ...makeListTransformations(),
  ...makeCodeTransformations(),
  ...makeLinkTransformations(),
  ...makeEmphasisTransformations(),
];

module.exports = {
  transformations,
};
