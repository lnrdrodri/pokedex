import '../styles/global.scss';

import styles from '../styles/app.module.scss';
import Search from '../components/Search';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <aside>
        <Search />
      </aside>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp
