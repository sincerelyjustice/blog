const { matchesAny } = require('../../../../lib/string');
const { transformations } = require('../../transformations');
const { getTransformation } = require('../../utility/transformations');
const { isPortionTransformation } = require('../../utility/transformations');
const { wrapPortion } = require('../../utility/portions');

const addParagraphs = (portions) => {
  const parsedPortions = [];
  const transformation = getTransformation('paragraph');
  const specialLineRegexps = getSpecialLineRegexps();
  for (const portion of portions) {
    const firstLine = portion[0];
    if (!matchesAny(firstLine, specialLineRegexps)) {
      parsedPortions.push(wrapPortion(portion, transformation.tag));
    } else {
      parsedPortions.push(portion);
    }
  }
  return parsedPortions;
};

const getSpecialLineRegexps = () => {
  const isParagraphTransformation = (transformation) =>
    transformation.name === 'paragraph';
  const regexes = [];
  for (const transformation of transformations) {
    const isSpecialLineTransformation =
      isPortionTransformation(transformation) &&
      !isParagraphTransformation(transformation);
    if (isSpecialLineTransformation) {
      regexes.push(transformation.regex);
    }
  }
  return regexes;
};

module.exports = { addParagraphs };
