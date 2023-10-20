const { addParagraphs } = require('./types/paragraph');
const { addHeadings } = require('./types/heading');
const { addLists } = require('./types/list');
const { addLinks, addImages } = require('./types/link');
const { addInlineCode, addBlockCode } = require('./types/code');
const { addEmphasis } = require('./types/emphasis');

module.exports = {
  addParagraphs,
  addHeadings,
  addLists,
  addLinks,
  addImages,
  addInlineCode,
  addBlockCode,
  addEmphasis,
};
