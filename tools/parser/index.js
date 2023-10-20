const { pipe } = require('../../lib/function');
const {
  addHeadings,
  addParagraphs,
  addLists,
  addLinks,
  addEmphasis,
  addBlockCode,
  addInlineCode,
} = require('./parsers');
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
  parsedText = pipe([parsedText], addLinks, addInlineCode, addEmphasis);
  return parsedText;
};

module.exports = { textToHtmlParser };
