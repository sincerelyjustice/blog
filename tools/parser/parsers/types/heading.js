const { transformations } = require('../../transformations');
const { wrapPortion } = require('../../utility/portions');

const addHeadings = (portions) => {
  const parsedPortions = [];
  const headingTransformations = transformations.filter((transformation) =>
    transformation.name.startsWith('heading')
  );
  loop: for (const portion of portions) {
    for (const transformation of headingTransformations) {
      const match = portion[0].match(transformation.regex);
      if (match) {
        parsedPortions.push(
          wrapPortion(portion, transformation.tag, { newFirstLine: match[1] })
        );
        continue loop;
      }
    }
    parsedPortions.push(portion);
  }
  return parsedPortions;
};

module.exports = { addHeadings };
