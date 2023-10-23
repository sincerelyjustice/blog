const removeDuplicates = (array) => {
  return [...new Set(array)];
};

const range = (bound) => {
  const rangeArr = [];
  for (let i = 0; i <= bound; i++) {
    rangeArr.push(i);
  }
  return rangeArr;
};

module.exports = { removeDuplicates, range };
