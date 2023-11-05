import { removeDuplicates } from 'js-toolkit/array';

export const getAllTags = (blogs) => {
  const allTags = [];
  for (const blog of blogs) {
    allTags.push(...blog.tags);
  }
  return removeDuplicates(allTags);
};

export const sortByRecency = (blogs) => {
  return blogs
    .slice()
    .sort((b1, b2) => new Date(b2.timestamp) - new Date(b1.timestamp));
};
