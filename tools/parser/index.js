const { pipe } = require('../../lib/function');
const { addHeadings, addParagraphs, addLists, addLinks } = require('./parsers');
const { addBlockCode, addInlineCode } = require('./parsers/types/code');
const { getPortions, getLines } = require('./utility/portions');

const textToHtmlParser = (text) => {
  let parsedText;
  const lines = text.split('\n');
  const portions = getPortions(lines);
  const parsedPortions = pipe(
    [portions],
    addParagraphs,
    addHeadings,
    addLists,
    addBlockCode
  );
  parsedText = getLines(parsedPortions).join('\n');
  parsedText = pipe([parsedText], addLinks, addInlineCode);
  return parsedText;
};

module.exports = { textToHtmlParser };
