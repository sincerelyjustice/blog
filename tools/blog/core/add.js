const { forwardSlashes } = require('../../../lib/file-system');
const { textToHtmlParser, getImageReferences } = require('../../parser');
const { getDistImagesPath } = require('../../config');
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

const addBlogImages = (blogText, blogTitle) => {
  const imageRefs = getImageReferences(blogText);
  imageRefs.forEach((ref) => addImage(ref, blogTitle));
};

const addBlog = (fileName) => {
  const sourceText = readSourceFile(fileName);
  const readline = helpers.getReadlineInterface();
  const currentBlogs = getBlogs();
  readline.question('Enter a title: ', (title) => {
    const matchesTitle = (blog) => blog.title === title;
    if (currentBlogs.some(matchesTitle)) {
      console.log(`\nBlog '${title}' already exists`);
      process.exit(1);
    } else {
      const content = textToHtmlParser(sourceText, {
        imageDirectory: forwardSlashes(getDistImagesPath()),
      });
      const timestamp = helpers.getTimestamp();
      const blog = {
        title,
        content,
        timestamp,
      };
      writeBlogs([...currentBlogs, blog]);
      addBlogImages(sourceText, title);
      console.log(`\nBlog '${title}' added.`);
    }
    readline.close();
  });
};

module.exports = { addBlog };
