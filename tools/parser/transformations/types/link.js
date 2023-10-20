const { getWhitespace } = require('../../../../lib/string');

const makeLinkTransformations = () => {
  return [
    {
      name: 'link',
      tag: 'a',
      regex: /(?<!\!)\[(.*?)\]\((.*?)\)/,
      delimiter: getWhitespace(1),
    },
    {
      name: 'image',
      tag: 'img',
      regex: /\!\[(.*?)\]\((.*?)\)/,
      delimiter: getWhitespace(1),
    }
  ];
};

module.exports = { makeLinkTransformations };
