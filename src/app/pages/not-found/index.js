import { getNotFoundMessage } from '../../../config/theme/selectors';
import styles from './index.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <p>{getNotFoundMessage()}</p>
    </div>
  );
};

export default NotFoundPage;
