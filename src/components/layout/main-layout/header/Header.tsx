import HeaderMenu from './header-menu/HeaderMenu'
import styles from './Header.module.scss'
import Logo from './logo/Logo'
import SearchInput from './search/SearchInput'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.search}>
        <SearchInput />
      </div>
      <HeaderMenu />
    </header>
  )
}