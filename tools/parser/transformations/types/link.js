const { getWhitespace } = require('../../../../lib/string');

const makeLinkTransformations = () => {
  const linkTransformation = {
    name: 'link',
    tag: 'a',
    regex: /(?<!\!)\[(.*?)\]\((.*?)\)/,
    delimiter: getWhitespace(1),
  };
  const imageLinkTransformation = {
    name: 'image',
    tag: 'img',
    regex: /\!\[(.*?)\]\((.*?)\)/,
    delimiter: getWhitespace(1),
  };
  return [linkTransformation, imageLinkTransformation];
};

module.exports = { makeLinkTransformations };
