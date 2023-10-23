const makeHeadingTransformations = () => {
  const headingTransformations = [];
  const getRegex = (headingNum) => {
    const hashes = '#'.repeat(headingNum);
    return new RegExp(`^${hashes} (.+)$`);
  };
  for (let headingNum = 1; headingNum <= 6; headingNum++) {
    const transformation = {
      name: `heading.${headingNum}`,
      tag: `h${headingNum}`,
      regex: getRegex(headingNum),
      leadingChar: ['#'],
      delimiter: '\n\n',
    };
    headingTransformations.push(transformation);
  }
  return headingTransformations;
};

module.exports = { makeHeadingTransformations };
