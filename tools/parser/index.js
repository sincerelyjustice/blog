const { addHeadings, addParagraphs, addLists } = require('./parsers');
const { getPortions, getLines } = require('./utility/portions');

const textToHtmlParser = (text) => {
  const lines = text.split('\n');
  const portions = getPortions(lines);
  const parsedPortions = addLists(addHeadings(addParagraphs(portions)));
  return getLines(parsedPortions).join('\n');
};

module.exports = { textToHtmlParser };
