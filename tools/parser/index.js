const { addHeadings, addParagraphs, addLists, addLinks } = require('./parsers');
const { getPortions, getLines } = require('./utility/portions');

const textToHtmlParser = (text) => {
  let parsedText;
  const lines = text.split('\n');
  const portions = getPortions(lines);
  const parsedPortions = addLists(addHeadings(addParagraphs(portions)));
  parsedText = getLines(parsedPortions).join('\n');
  parsedText = addLinks(parsedText);
  return parsedText;
};

module.exports = { textToHtmlParser };
