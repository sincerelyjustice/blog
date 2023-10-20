const makeParagraphTransformations = () => {
  const paragraphTransformation = {
    name: 'paragraph',
    tag: 'p',
    delimiter: '\n\n',
  };
  return [paragraphTransformation];
};

module.exports = { makeParagraphTransformations };
