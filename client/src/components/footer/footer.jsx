import styles from './footer.module.css'
import {memo} from 'react';

const Footer = ()=> {
    return (
      <footer>
            <div className={styles.container}>
              Herry PI
            </div>
            <div className={styles.container}>
              This site was made by Fernando Adrogué Benas
            </div>
      </footer>
    );
  }
  
  export default memo(Footer);