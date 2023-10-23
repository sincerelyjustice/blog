const { isEmpty } = require('../../../lib/string');
const { wrapWithTags, openTag, closeTag } = require('./tags');

const getPortions = (lines) => {
  const portions = [];
  let currentPortion = [];

  for (const line of lines) {
    const isBlankLine = isEmpty(line.trim());
    if (!isBlankLine) {
      currentPortion.push(line);
    } else if (currentPortion.length) {
      portions.push(currentPortion);
      currentPortion = [];
    }
  }

  if (currentPortion.length) {
    portions.push(currentPortion);
  }

  return portions;
};

const replaceFirstLine = (portion, newFirstLine) => {
  return [newFirstLine, ...portion.slice(1)];
};

const wrapPortion = (portion, tag) => {
  const firstLine = portion[0];
  const portionSize = portion.length;
  if (portionSize === 1) {
    return [wrapWithTags(firstLine, tag)];
  } else {
    const lastLine = portion[portionSize - 1];
    return [
      openTag(tag) + firstLine,
      portion.slice(1, portionSize - 1),
      lastLine + closeTag(tag),
    ];
  }
};

const getLines = (portions) => {
  const lines = [];
  for (const portion of portions) {
    lines.push(...portion);
    // for newlines lost in `getPortions`,
    // collapse into one:
    lines.push('');
  }
  return lines;
};

module.exports = { getPortions, replaceFirstLine, wrapPortion, getLines };
