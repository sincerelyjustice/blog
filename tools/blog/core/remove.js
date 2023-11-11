const { negator, propertyMatcher } = require('js-toolkit/function');
const { writeBlogs, getBlogs } = require('./utility/file-system');
const { cleanupImages } = require('./utility/images');

const removeBlog = (title) => {
  const blogs = getBlogs();
  const matchesTitle = propertyMatcher('title', title);
  if (blogs.some(matchesTitle)) {
    writeBlogs(blogs.filter(negator(matchesTitle)));
    cleanupImages(title);
    console.log(`\nBlog '${title}' removed.`);
  } else {
    console.log(`\nBlog '${title}' was not found.`);
    process.exit(1);
  }
};

module.exports = { removeBlog };
