const { forwardSlashes } = require('../../../lib/path');
const { textToHtmlParser, getImageReferences } = require('../../parser');
const { getDistImagesPath } = require('./config/selectors');
const {
  readSourceFile,
  writeBlogs,
  getBlogs,
} = require('./utility/file-system');
const { addImage } = require('./utility/images');

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
    const blogs = getBlogs();
    const matchesTitle = (blog) => blog.title === title;
    if (blogs.some(matchesTitle)) {
      console.log(`\nBlog '${title}' already exists`);
    } else {
      const imageRefs = getImageReferences(content);
      const blog = {
        title,
        content: textToHtmlParser(content, {
          imageDirectory: forwardSlashes(getDistImagesPath()),
        }),
        timestamp: helpers.getTimestamp(),
      };
      imageRefs.forEach((ref) => addImage(ref, title));
      writeBlogs([...blogs, blog]);
      console.log(`\nBlog '${title}' added.`);
    }
    rl.close();
  });
};

module.exports = { addBlog };
