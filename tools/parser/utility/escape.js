const { globalRegex } = require('../../../lib/string');
const { getInlineTransformingCharacters } = require('./transformations');

const isEscaped = (text, substringLocation) => {
  const hasPrecedingBackslash =
    substringLocation > 0 && text[substringLocation - 1] === '\\';
  const hasAnother =
    hasPrecedingBackslash && text[substringLocation - 2] === '\\';
  return hasPrecedingBackslash && !hasAnother;
};

const unescapedMatchAll = (text, regex) => {
  const candidates = text.matchAll(globalRegex(regex));
  return Array.from(candidates).filter(
    (match) => !isEscaped(text, match.index)
  );
};

const unescapedReplacer = (text, replacement, ...matchArgs) => {
  if (typeof replacement !== 'string') {
    const matchLocation = matchArgs[matchArgs.length - 2];
    if (!isEscaped(text, matchLocation)) {
      return replacement(...matchArgs);
    } else {
      const originalText = matchArgs[0];
      return originalText;
    }
  }
  return replacement;
};

const unescapedReplace = (text, pattern, replacement) => {
  return text.replace(pattern, (...matchArgs) =>
    unescapedReplacer(text, replacement, ...matchArgs)
  );
};

const unescapedReplaceAll = (text, pattern, replacement) => {
  return text.replaceAll(pattern, (...matchArgs) =>
    unescapedReplacer(text, replacement, ...matchArgs)
  );
};

const escapeInlineCharacters = (text) => {
  const transformingCharacters = getInlineTransformingCharacters();
  let parsedText = text;
  for (const character of transformingCharacters) {
    parsedText = unescapedReplaceAll(parsedText, character, `\\${character}`);
  }
  return parsedText;
};

const cleanupEscapes = (text) => {
  const transformingCharacters = getInlineTransformingCharacters();
  let parsedText = text;
  for (const character of transformingCharacters) {
    parsedText = parsedText.replaceAll(`\\${character}`, character);
  }
  return parsedText;
};

module.exports = {
  unescapedMatchAll,
  unescapedReplace,
  escapeInlineCharacters,
  cleanupEscapes,
};
