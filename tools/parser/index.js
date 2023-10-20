const path = require('path');
const { pipe } = require('../../lib/function');
const { globalise } = require('../../lib/string');
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
const { getTransformation } = require('./utility/transformations');

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
  parsedText = pipe(
    [parsedText],
    addLinks,
    addImages,
    addInlineCode,
    addEmphasis
  );
  return parsedText;
};

const getImageReferences = (text) => {
  const transformation = getTransformation('image');
  const matches = Array.from(text.matchAll(globalise(transformation.regex)));
  const imagePaths = matches.map((match) => match[2]);
  return imagePaths.map((imagePath) => path.basename(imagePath));
};

module.exports = { textToHtmlParser, getImageReferences };
