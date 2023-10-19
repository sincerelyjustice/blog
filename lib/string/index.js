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

module.exports = { matchesAny, isEmpty, getWhitespace };
