const { wrapWithTags } = require('../../utility/tags');
const { getTransformation } = require('../../utility/transformations');

const addLinks = (text) => {
  const linktransformation = getTransformation('link');
  const allLinksRegex = new RegExp(linktransformation.regex, 'g');
  const htmlLinkReplacer = (_, linkText, href) =>
    wrapWithTags(linkText, linktransformation.tag, { href });
  return text.replace(allLinksRegex, htmlLinkReplacer);
};

module.exports = { addLinks };
