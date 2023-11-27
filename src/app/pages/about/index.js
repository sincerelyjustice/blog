import { useInitialisationContext } from '../../context/initialisation';
import Markdown from '../../components/markdown';
import styles from './index.module.css';

const AboutPage = () => {
  const { about } = useInitialisationContext();
  return (
    <article className={styles.aboutContainer}>
      <main>
        <Markdown>{about}</Markdown>
      </main>
    </article>
  );
};

export default AboutPage;
