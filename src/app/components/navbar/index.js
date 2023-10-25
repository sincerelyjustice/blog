import { Link } from 'react-router-dom';
import {
  getContactEmail,
  getHomePath,
  getSiteTitle,
} from '../../../config/theme/selectors';
import EmailIcon from '../../../assets/icons/email';
import styles from './index.module.css';
import { getEmailUrl } from 'lib/web/url';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link className={styles.homeLink} to={getHomePath()}>
        <h1>{getSiteTitle()}</h1>
      </Link>
      <a className={styles.iconContainer} href={getEmailUrl(getContactEmail())}>
        <EmailIcon />
      </a>
    </nav>
  );
};

export default NavBar;
