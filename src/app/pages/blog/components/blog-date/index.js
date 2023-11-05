import { getCalendarDate } from 'js-toolkit/date';
import styles from './index.module.css';

const BlogDate = ({ blog }) => {
  return (
    <span className={styles.blogDate}>
      <small>{getCalendarDate(blog.timestamp)}</small>
      {blog.lastEdited && (
        <small>
          (<em>Last edited:</em> {getCalendarDate(blog.lastEdited)})
        </small>
      )}
    </span>
  );
};

export default BlogDate;
