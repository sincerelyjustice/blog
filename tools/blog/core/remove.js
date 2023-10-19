const { negator } = require('../../../lib/function/negator');
const { getBlogs, writeBlogs } = require('./utility/file-system');

const removeBlog = (title) => {
  const blogs = getBlogs();
  const matchesTitle = (blog) => blog.title === title;
  const titleExists = blogs.find(matchesTitle);
  if (!titleExists) {
    console.log(`Blog ${title} was not found.`);
  } else {
    const newBlogs = blogs.filter(negator(matchesTitle));
    writeBlogs(newBlogs);
    console.log(`Blog ${title} removed.`);
  }
};

module.exports = { removeBlog };
