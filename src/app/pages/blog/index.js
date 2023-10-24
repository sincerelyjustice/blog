import { useNavigate, useParams } from 'react-router-dom';
import { useBlogsContext } from '../../context/blogs';
import { useEffect } from 'react';
import {
  getBlogPathParamName,
  getNotFoundPath,
} from '../../../config/theme/selectors';
import Markdown from '../../components/markdown';

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
    <article className={styles.blog}>
      <h1 className={styles.blogTitle}>{blog.title}</h1>
      <small>{new Date(blog.timestamp).toLocaleDateString('en-GB')}</small>
      <hr />
      <main>
        <Markdown>{blog.content}</Markdown>
      </main>
    </article>
  ) : null;
};

export default BlogPage;
