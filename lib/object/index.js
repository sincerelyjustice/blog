const isEmpty = (obj) => {
  return !Boolean(Object.keys(obj).length);
};

module.exports = { isEmpty };
