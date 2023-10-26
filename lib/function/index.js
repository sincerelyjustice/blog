const equalityFactory = (target) => {
  return (source) => source === target;
};

const negator = (fn) => {
  return (...args) => !fn(...args);
};

module.exports = { equalityFactory, negator };
