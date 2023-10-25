import { removeDuplicates } from '@lib/array';

export const getAllTags = (blogs) => {
  const allTags = [];
  for (const blog of blogs) {
    allTags.push(...blog.tags);
  }
  return removeDuplicates(allTags);
};
