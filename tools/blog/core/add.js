const { csvToArray, isEmptyString } = require('js-toolkit/string');
const {
  readSourceFile,
  writeBlogs,
  getBlogs,
} = require('./utility/file-system');
const { addBlogImages } = require('./utility/images');
const { makeContent } = require('./utility/parse');
const {
  initReadlineInterface,
  readlineQuestion,
  persistentReadlineQuestion,
  closeReadlineInterface,
} = require('./utility/readline');

const addBlog = async (fileName) => {
  const sourceText = readSourceFile(fileName);
  const currentBlogs = getBlogs();

  const queryTitle = () => {
    const titleAccepter = (title) => {
      if (isEmptyString(title)) {
        return false;
      }
      const blogAlreadyHasTitle = (blog) => blog.title === title;
      if (currentBlogs.some(blogAlreadyHasTitle)) {
        console.log(`Blog '${title}' already exists.`);
        return false;
      }
      return true;
    };
    return persistentReadlineQuestion('Enter a title: ', titleAccepter);
  };

  const queryPath = () => {
    const pathAccepter = (path) => {
      if (isEmptyString(path)) {
        return false;
      }
      const blogAlreadyHasPath = (blog) => blog.path === path;
      if (currentBlogs.some(blogAlreadyHasPath)) {
        console.log(`A blog with url path '${path}' already exists.`);
        return false;
      }
      return true;
    };
    return persistentReadlineQuestion('Enter a url path: ', pathAccepter);
  };

  const queryTags = () => readlineQuestion('Enter any blog tags (as csv): ');

  initReadlineInterface();
  const title = await queryTitle();
  const path = await queryPath();
  const tags = await queryTags();
  closeReadlineInterface();

  const blog = {
    title,
    path,
    tags: csvToArray(tags),
    content: makeContent(sourceText),
    timestamp: Date.now(),
  };

  writeBlogs([...currentBlogs, blog]);
  addBlogImages(sourceText, title);
  console.log(`\nBlog '${title}' added.`);
};

module.exports = { addBlog };
