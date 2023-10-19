const { isEmpty } = require('../../../lib/object');

const wrapWithTags = (text, tagName, props = {}) => {
  const prefix = openTag(tagName, props);
  const suffix = closeTag(tagName);
  return `${prefix}${text}${suffix}`;
};

const openTag = (name, props = {}) => {
  let tag = `<${name}`;
  if (!isEmpty(props)) {
    tag += ' ' + writeProps(props);
  }
  tag += `>`;
  return tag;
};

const closeTag = (name) => {
  return `</${name}>`;
};

const writeProps = (props) => {
  let list = [];
  for (const [key, value] of Object.entries(props)) {
    list.push(`${key}="${value}"`);
  }
  return list.join(' ');
};

module.exports = { wrapWithTags, openTag, closeTag };
