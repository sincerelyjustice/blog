import { useState } from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from 'js-toolkit/string';
import { getSelectedValue } from 'js-toolkit/web';
import { getBlogPath } from '../../../config/theme/selectors';
import { useInitialisationContext } from '../../context/initialisation';
import { getAllTags, sortByRecency } from '../../utility/blogs';
import styles from './index.module.css';

const HomePage = () => {
  const { blogs } = useInitialisationContext();
  const [selectedTag, setSelectedTag] = useState(null);

  const tags = getAllTags(blogs);

  const handleTagSelection = (e) => {
    const selectElement = e.target;
    const selectedValue = getSelectedValue(selectElement);
    if (tags.includes(selectedValue)) {
      setSelectedTag(selectedValue);
    } else {
      setSelectedTag(null);
    }
  };

  const getMatchingBlogs = () => {
    if (selectedTag)
      return blogs.filter((blog) => blog.tags.includes(selectedTag));
    else return blogs;
  };

  return (
    <div className={styles.homeContainer}>
      <label className={styles.selectGroup}>
        <strong>Category:</strong>
        <select onChange={handleTagSelection}>
          <option>-- Choose a category --</option>
          {tags.map((tag) => (
            <option value={tag} key={tag}>
              {capitalize(tag)}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.blogsGroup}>
        <strong>Blogs:</strong>
        <ul>
          {sortByRecency(getMatchingBlogs()).map((blog) => (
            <li key={blog.title}>
              <Link to={getBlogPath(blog.path)}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
