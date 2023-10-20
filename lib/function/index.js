const equalityFactory = (target) => {
  return (source) => source === target;
};

const negator = (fn) => {
  return (...args) => !fn(...args);
};

const pipe = (args, ...fns) => {
  let result;
  for (let i = 0; i < fns.length; i++) {
    const fn = fns[i];
    if (i === 0) {
      result = fn(...args);
    } else {
      result = fn(result);
    }
  }
  return result;
};

module.exports = { equalityFactory, negator, pipe };
