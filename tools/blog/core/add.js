const { csvToArray, isEmptyString } = require('js-toolkit/string');
const { propertyMatcher } = require('js-toolkit/function');
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
      } else if (currentBlogs.some(propertyMatcher('title', title))) {
        console.log(`Blog '${title}' already exists.`);
        return false;
      } else {
        return true;
      }
    };
    return persistentReadlineQuestion('Enter a title: ', titleAccepter);
  };

  const queryPath = () => {
    const pathAccepter = (path) => {
      if (isEmptyString(path)) {
        return false;
      } else if (currentBlogs.some(propertyMatcher('path', path))) {
        console.log(`A blog with url path '${path}' already exists.`);
        return false;
      } else {
        return true;
      }
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
