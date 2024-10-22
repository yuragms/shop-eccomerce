import Ad from './Ad';
import Main from './Main';
import Top from './Top';
import styles from './styles.module.scss';

export default function Header({ country, searchHandler }) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main searchHandler={searchHandler} />
    </header>
  );
}
