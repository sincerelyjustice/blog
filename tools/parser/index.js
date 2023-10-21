const { pipe } = require('../../lib/function');
const {
  addHeadings,
  addParagraphs,
  addLists,
  addLinks,
  addEmphasis,
  addBlockCode,
  addInlineCode,
  addImages,
} = require('./parsers');
const { getPortions, getLines } = require('./utility/portions');
const { getImageReferences } = require('./utility/images');

const textToHtmlParser = (text, options = {}) => {
  const { imageDirectory = 'images' } = options;
  const lines = text.split('\n');
  const portions = getPortions(lines);
  const parsedPortions = pipe(
    [portions],
    addParagraphs,
    addHeadings,
    addLists,
    addBlockCode
  );
  let parsedText;
  parsedText = getLines(parsedPortions).join('\n');
  parsedText = pipe(
    [parsedText, imageDirectory],
    addImages,
    addLinks,
    addInlineCode,
    addEmphasis
  );
  return parsedText;
};

module.exports = { textToHtmlParser, getImageReferences };
