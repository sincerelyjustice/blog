const { getWhitespace } = require("../../../../lib/string");

const makeEmphasisTransformations = () => {
  const bold = {
    name: 'bold',
    tag: 'strong',
    regex: /\*\*(.+?)\*\*/,
    specialChars: ['*'],
    delimiter: getWhitespace(1),
  };
  const italic = {
    name: 'italic',
    tag: 'em',
    regex: /\*(.+?)\*/,
    specialChars: ['*'],
    delimiter: getWhitespace(1),
  };
  const underline = {
    name: 'underline',
    tag: 'u',
    regex: /\_(.+?)\_/,
    specialChars: ['_'],
    delimiter: getWhitespace(1),
  };
  return [bold, italic, underline];
};

module.exports = { makeEmphasisTransformations };
