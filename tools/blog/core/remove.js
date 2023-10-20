const { negator } = require('../../../lib/function/negator');
const { getBlogs, writeBlogs } = require('./utility/file-system');

const removeBlog = (title) => {
  const blogs = getBlogs();
  const matchesTitle = (blog) => blog.title === title;
  if (!blogs.some(matchesTitle)) {
    console.log(`Blog '${title}' was not found.`);
  } else {
    writeBlogs(blogs.filter(negator(matchesTitle)));
    console.log(`Blog '${title}' removed.`);
  }
};

module.exports = { removeBlog };
