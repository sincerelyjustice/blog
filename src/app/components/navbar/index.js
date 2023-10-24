import { Link } from 'react-router-dom';
import { getHomePath, getSiteTitle } from '../../../config/theme/selectors';

import styles from './index.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link className={styles.homeLink} to={getHomePath()}>
        <h1>{getSiteTitle()}</h1>
      </Link>
    </nav>
  );
};

export default NavBar;
