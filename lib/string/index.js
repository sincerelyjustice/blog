const globalise = (regex) => {
  return new RegExp(regex, 'g');
};

const matchesAny = (string, regexps) => {
  for (const regex of regexps) {
    if (regex.test(string)) {
      return true;
    }
  }
  return false;
};

const isEmpty = (string) => {
  return string === '';
};

const getWhitespace = (amount) => {
  return ' '.repeat(amount);
};

module.exports = { globalise, matchesAny, isEmpty, getWhitespace };
