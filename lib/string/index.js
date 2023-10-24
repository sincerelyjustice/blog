const isEmpty = (string) => {
  return string === '';
};

const csvToArray = (csv) => {
  return isEmpty(csv) ? [] : csv.split(',');
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
  isEmpty,
  csvToArray,
  isEscaped,
  replaceIfNotEscaped,
};
