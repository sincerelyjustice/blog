const { negator } = require('../../../lib/function');
const { getBlogs, writeBlogs } = require('./utility/file-system');
const { cleanupImages } = require('./utility/images');

const removeBlog = (title) => {
  const blogs = getBlogs();
  const matchesTitle = (blog) => blog.title === title;
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
