import NavBar from './navbar';
import styles from './index.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <div className={styles.pageContainer}>{children}</div>
    </div>
  );
};

export default Layout;
