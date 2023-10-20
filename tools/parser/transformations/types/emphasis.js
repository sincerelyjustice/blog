const { getWhitespace } = require("../../../../lib/string");

const makeEmphasisTransformations = () => {
  const bold = {
    name: 'bold',
    tag: 'strong',
    regex: /\*\*(.+?)\*\*/,
    delimiter: getWhitespace(1),
  };
  const italic = {
    name: 'italic',
    tag: 'em',
    regex: /\*(.+?)\*/,
    delimiter: getWhitespace(1),
  };
  const underline = {
    name: 'underline',
    tag: 'u',
    regex: /\_(.+?)\_/,
    delimiter: getWhitespace(1),
  };
  return [bold, italic, underline];
};

module.exports = { makeEmphasisTransformations };
