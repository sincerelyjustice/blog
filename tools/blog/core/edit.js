const { negator } = require('js-toolkit/function');
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
} = require('./utility/readline');

const editBlog = async (title) => {
  const currentBlogs = getBlogs();
  const matchesTitle = (blog) => blog.title === title;
  const existingBlog = currentBlogs.find(matchesTitle);

  if (!existingBlog) {
    console.log(`Blog '${title}' was not found.`);
    process.exit(1);
  }

  initReadlineInterface();
  const sourceFile = await persistentReadlineQuestion(
    'Enter the name of a source file for your edits: ',
  );
  closeReadlineInterface();

  const sourceText = readSourceFile(sourceFile);
  const editedBlog = {
    ...existingBlog,
    content: makeContent(sourceText),
    lastEdited: Date.now(),
  };

  writeBlogs([...currentBlogs.filter(negator(matchesTitle)), editedBlog]);
  addBlogImages(sourceText, title);
  console.log(`\nBlog '${title}' edited.`);
};

module.exports = { editBlog };
