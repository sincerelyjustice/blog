const { textToHtmlParser } = require('../../parser');
const {
  readSourceFile,
  writeBlogs,
  getBlogs,
} = require('./utility/file-system');

const helpers = {
  getReadlineInterface: () =>
    require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    }),
  getTimestamp: () => Date.now(),
};

const addBlog = (fileName) => {
  const content = readSourceFile(fileName);
  const rl = helpers.getReadlineInterface();
  rl.question('Enter a title: ', (title) => {
    const blog = {
      title,
      content: textToHtmlParser(content),
      timestamp: helpers.getTimestamp(),
    };
    writeBlogs([...getBlogs(), blog]);
    console.log(`\nBlog '${title}' added.`);
    rl.close();
  });
};

module.exports = { addBlog };
