const isEmpty = (obj) => {
  return !Boolean(Object.keys(obj).length);
};

const copyJson = (json) => JSON.parse(JSON.stringify(json));

module.exports = { isEmpty, copyJson };
