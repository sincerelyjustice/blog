const makeParagraphTransformations = () => {
  const paragraphTransformation = {
    name: 'paragraph',
    tag: 'p',
    specialChars: [],
    delimiter: '\n\n',
  };
  return [paragraphTransformation];
};

module.exports = { makeParagraphTransformations };
