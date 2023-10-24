const { csvToArray, isEmpty } = require('../../../lib/string');
const {
  readSourceFile,
  writeBlogs,
  getBlogs,
} = require('./utility/file-system');
const { addImage, getImageReferences, setImagePaths } = require('./utility/images');
const {
  initReadlineInterface,
  readlineQuestion,
  persistentReadlineQuestion,
  closeReadlineInterface,
} = require('./utility/readline');

const addBlogImages = (blogText, blogTitle) => {
  const imageRefs = getImageReferences(blogText);
  imageRefs.forEach((ref) => addImage(ref, blogTitle));
};

const addBlog = async (fileName) => {
  const sourceText = readSourceFile(fileName);
  const currentBlogs = getBlogs();
  initReadlineInterface();

  const queryTitle = async () => {
    const titleAccepter = (title) => {
      if (isEmpty(title)) {
        return false;
      }
      const blogAlreadyHasTitle = (blog) => blog.title === title;
      if (currentBlogs.some(blogAlreadyHasTitle)) {
        console.log(`Blog '${title}' already exists.`);
        return false;
      }
      return true;
    };
    const title = await persistentReadlineQuestion(
      'Enter a title: ',
      titleAccepter
    );
    return title;
  };

  const queryPath = async () => {
    const pathAccepter = (path) => {
      if (isEmpty(path)) {
        return false;
      }
      const blogAlreadyHasPath = (blog) => blog.path === path;
      if (currentBlogs.some(blogAlreadyHasPath)) {
        console.log(`A blog with url path '${path}' already exists.`);
        return false;
      }
      return true;
    };
    const path = await persistentReadlineQuestion(
      'Enter a url path: ',
      pathAccepter
    );
    return path;
  };

  const queryTags = async () => {
    const tags = await readlineQuestion('Enter any blog tags (as csv): ');
    return tags;
  };

  const title = await queryTitle();
  const path = await queryPath();
  const tags = csvToArray(await queryTags());
  const timestamp = Date.now();
  const content = setImagePaths(sourceText);
  const blog = {
    title,
    path,
    tags,
    timestamp,
    content,
  };
  writeBlogs([...currentBlogs, blog]);
  addBlogImages(sourceText, title);
  console.log(`\nBlog '${title}' added.`);
  closeReadlineInterface();
};

module.exports = { addBlog };
