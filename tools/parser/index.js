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
const { cleanupEscapes } = require('./utility/escape');

const textToHtmlParser = (text, options = {}) => {
  const { imageDirectory = 'images' } = options;
  let parsedLines = text.split('\n');
  const portions = getPortions(parsedLines);
  const parsedPortions = pipe(
    [portions],
    addParagraphs,
    addHeadings,
    addLists,
    addBlockCode
  );
  parsedLines = getLines(parsedPortions);
  parsedLines = parsedLines.map((line) =>
    pipe(
      [line, imageDirectory],
      addImages,
      addLinks,
      addInlineCode,
      addEmphasis,
      cleanupEscapes,
    )
  );
  return parsedLines.join('\n');
};

module.exports = { textToHtmlParser, getImageReferences };
