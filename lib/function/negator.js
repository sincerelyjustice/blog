const negator = (fn) => {
  return (...args) => !fn(...args);
};

module.exports = { negator };
