const { propertyMatcher } = require('js-toolkit/function');
const { replaceElements } = require('js-toolkit/array');
const {
  readSourceFile,
  writeBlogs,
  getBlogs,
} = require('./utility/file-system');
const { addBlogImages } = require('./utility/images');
const { makeContent } = require('./utility/parse');
const {
  initReadlineInterface,
  persistentReadlineQuestion,
  closeReadlineInterface,
  readlineQuestion,
} = require('./utility/readline');

const editBlog = async (title) => {
  const currentBlogs = getBlogs();
  const isExistingBlog = propertyMatcher('title', title);
  const existingBlog = currentBlogs.find(isExistingBlog);

  if (!existingBlog) {
    console.log(`Blog '${title}' was not found.`);
    process.exit(1);
  }

  const queryNewTitle = () => {
    const titleAccepter = (newTitle) => {
      if (currentBlogs.some(propertyMatcher('title', newTitle))) {
        console.log(`Blog '${newTitle}' already exists.`);
        return false;
      }
      return true;
    };
    return persistentReadlineQuestion(
      'New title (or leave blank): ',
      titleAccepter,
    );
  };

  const queryNewPath = () => {
    const pathAccepter = (newPath) => {
      if (currentBlogs.some(propertyMatcher('path', newPath))) {
        console.log(`A blog with url path '${newPath}' already exists.`);
        return false;
      }
      return true;
    };
    return persistentReadlineQuestion(
      'New url path (or leave blank): ',
      pathAccepter,
    );
  };

  const queryNewSourceFile = () =>
    readlineQuestion('Source file for your edits (or leave blank): ');

  initReadlineInterface();
  const newTitle = await queryNewTitle();
  const newPath = await queryNewPath();
  const newSourceFile = await queryNewSourceFile();
  closeReadlineInterface();

  if (!newTitle && !newPath && !newSourceFile) {
    process.exit(0);
  }

  const newSourceText = newSourceFile ? readSourceFile(newSourceFile) : null;
  const editedBlog = {
    ...existingBlog,
    ...(newTitle && { title: newTitle }),
    ...(newPath && { path: newPath }),
    ...(newSourceText && {
      content: makeContent(newSourceText),
    }),
    lastEdited: Date.now(),
  };

  writeBlogs(replaceElements(currentBlogs, isExistingBlog, editedBlog));
  if (newSourceText) {
    addBlogImages(newSourceText, title);
  }
  console.log(`\nBlog edited.`);
};

module.exports = { editBlog };
