const { transformations } = require('../../transformations');
const { wrapPortion, replaceFirstLine } = require('../../utility/portions');

const addHeadings = (portions) => {
  const parsedPortions = [];
  const headingTransformations = transformations.filter((transformation) =>
    transformation.name.startsWith('heading')
  );
  loop: for (const portion of portions) {
    for (const transformation of headingTransformations) {
      const match = portion[0].match(transformation.regex);
      if (match) {
        let parsedPortion = replaceFirstLine(portion, match[1]);
        parsedPortion = wrapPortion(parsedPortion, transformation.tag);
        parsedPortions.push(parsedPortion);
        continue loop;
      }
    }
    parsedPortions.push(portion);
  }
  return parsedPortions;
};

module.exports = { addHeadings };
