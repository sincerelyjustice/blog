const removeDuplicates = (array) => {
  return [...new Set(array)];
};

module.exports = { removeDuplicates };
