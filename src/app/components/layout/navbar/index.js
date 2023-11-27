import { Link } from 'react-router-dom';
import {
  getAboutPath,
  getHomePath,
  getSiteTitle,
} from '../../../../config/theme/selectors';
import InformationIcon from '../../../../assets/icons/information';
import styles from './index.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link className={styles.homeLink} to={getHomePath()}>
        <h1>{getSiteTitle()}</h1>
      </Link>
      <Link className={styles.iconContainer} to={getAboutPath()}>
        <InformationIcon />
      </Link>
    </nav>
  );
};

export default NavBar;
