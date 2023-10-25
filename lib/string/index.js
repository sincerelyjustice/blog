const isEmptyString = (string) => {
  return string === '';
};

const capitalize = (word) => {
  if (!isEmptyString(word)) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } else return word;
};

const csvToArray = (csv) => {
  return isEmptyString(csv) ? [] : csv.split(',');
};

const isEscaped = (string, substringLocation) => {
  const hasPrecedingBackslash =
    substringLocation > 0 && string[substringLocation - 1] === '\\';
  const hasAnother =
    hasPrecedingBackslash && string[substringLocation - 2] === '\\';
  return hasPrecedingBackslash && !hasAnother;
};

const replaceIfNotEscaped = (text, pattern, replacement) => {
  return text.replace(pattern, (...matchArgs) => {
    if (typeof replacement === 'function') {
      const matchLocation = matchArgs[matchArgs.length - 2];
      if (isEscaped(text, matchLocation)) {
        const originalText = matchArgs[0];
        return originalText;
      } else {
        return replacement(...matchArgs);
      }
    }
    return replacement;
  });
};

module.exports = {
  isEmptyString,
  capitalize,
  csvToArray,
  isEscaped,
  replaceIfNotEscaped,
};
