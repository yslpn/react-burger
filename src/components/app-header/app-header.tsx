import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mobileLogo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

const AppHeader: FC = () => {
    return (
        <header className={styles.header}>
            <nav className={`${styles['header__nav']} pt-4 pb-4`}>
                <NavLink to="/" className={`${styles['header__nav-item']} ${styles['header__nav-item--logo']}`} activeClassName={`${styles['header__nav-item--active']}`} exact>
                    <Logo />
                    <img className={styles['header__logo-mobile']} src={mobileLogo} alt="React Burger Logo" />
                </NavLink>
                <NavLink to="/" className={`${styles['header__nav-item']}`} activeClassName={`${styles['header__nav-item--active']}`} exact>
                    <Button type="secondary" size="medium">
                        <BurgerIcon type='primary' />
                        <span className="ml-2" >Конструктор</span>
                    </Button>
                </NavLink>
                <NavLink to="/feed" className={styles['header__nav-item']} activeClassName={`${styles['header__nav-item--active']}`}>
                    <Button type="secondary" size="medium">
                        <ListIcon type='primary' />
                        <span className="ml-2">Лента&nbsp;заказов</span>
                    </Button>
                </NavLink>
                <NavLink to="/profile" className={styles['header__nav-item']} activeClassName={`${styles['header__nav-item--active']}`}>
                    <Button type="secondary" size="medium">
                        <ProfileIcon type='primary' />
                        <span className="ml-2">Личный&nbsp;кабинет</span>
                    </Button>
                </NavLink>
            </nav>
        </header>
    );
}

export default AppHeader;