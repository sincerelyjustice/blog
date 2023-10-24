import { Link } from 'react-router-dom';
import { getBlogPath } from '../../../config/theme/selectors';
import { useBlogsContext } from '../../context/blogs';
import styles from './index.module.css';

const HomePage = () => {
  const { blogs } = useBlogsContext();
  return (
    <div className={styles.listContainer}>
      <ul className={styles.blogsList}>
        {blogs.map((blog) => (
          <li key={blog.title}>
            <Link to={getBlogPath(blog.path)}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
