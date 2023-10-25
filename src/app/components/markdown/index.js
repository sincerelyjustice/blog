import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { gatherClasses } from '@lib/web/css';
import MarkdownCode from './markdown-code';
import styles from './index.module.css';

const helpers = {
  getCustomCodeBlock: ({ className, ...props }) => (
    <pre className={gatherClasses(className, styles.codeBlock)} {...props} />
  ),
  getCustomCode: ({ ...props }) => <MarkdownCode {...props} />,
  getCustomBlockQuote: ({ className, ...props }) => (
    <blockquote
      className={gatherClasses(className, styles.blockquote)}
      {...props}
    />
  ),
  getCustomLinks: ({ className, ...props }) => (
    <a className={gatherClasses(className, styles.link)} {...props} />
  ),
};

const Markdown = ({ children }) => {
  const {
    getCustomCodeBlock,
    getCustomCode,
    getCustomBlockQuote,
    getCustomLinks,
  } = helpers;
  return (
    <ReactMarkdown
      components={{
        pre: getCustomCodeBlock,
        code: getCustomCode,
        blockquote: getCustomBlockQuote,
        a: getCustomLinks,
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
