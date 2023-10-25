import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlogsContext } from '../../context/blogs';
import {
  getBlogPathParamName,
  getNotFoundPath,
} from '../../../config/theme/selectors';
import Markdown from '../../components/markdown';
import BlogDate from './components/blog-date';
import styles from './index.module.css';

const BlogPage = () => {
  const { [getBlogPathParamName()]: blogPath } = useParams();
  const { blogs } = useBlogsContext();
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.path === blogPath);

  useEffect(() => {
    if (!blog) {
      navigate(getNotFoundPath());
    }
  }, [blog, navigate]);

  return blog ? (
    <div className={styles.blogContainer}>
      <article className={styles.blog}>
        <h1 className={styles.blogTitle}>{blog.title}</h1>
        <BlogDate blog={blog} />
        <hr />
        <main>
          <Markdown>{blog.content}</Markdown>
        </main>
      </article>
    </div>
  ) : null;
};

export default BlogPage;
