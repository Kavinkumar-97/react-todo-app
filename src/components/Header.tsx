import { FunctionComponent } from 'react';
import styles from '../styles/Header.module.css';

const Header: FunctionComponent = () => {

  return (
    <div className={styles.header}>
      <h5 className={styles.title}>Today Todos</h5>
    </div>
  );
};

export default Header;