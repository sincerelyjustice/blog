import { gatherClasses } from 'lib/web/css';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
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
};

const Markdown = ({ children }) => {
  const { getCustomCodeBlock, getCustomCode, getCustomBlockQuote } = helpers;
  return (
    <ReactMarkdown
      components={{
        pre: getCustomCodeBlock,
        code: getCustomCode,
        blockquote: getCustomBlockQuote,
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
