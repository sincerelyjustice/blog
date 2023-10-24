import { tomorrowNightBright } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styles from './index.module.css';

const helpers = {
  getLanguage: (className) => {
    if (className) {
      const match = className.match(/language-(\w+)/);
      if (match) return match[1];
    }
    return null;
  },
  trimNewLines: (html) => String(html).replace(/\n$/, ''),
};

const MarkdownCode = ({ children, inline, className, ...otherProps }) => {
  const language = helpers.getLanguage(className);
  const canHighlight = !inline && language;

  return canHighlight ? (
    <SyntaxHighlighter
      className={styles.highlightedCode}
      language={language}
      style={tomorrowNightBright}
      PreTag="div"
      {...otherProps}
    >
      {helpers.trimNewLines(children)}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...otherProps}>
      {children}
    </code>
  );
};

export default MarkdownCode;
