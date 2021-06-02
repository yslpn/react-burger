import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mobileLogo from '../../images/logo.svg'

const AppHeader = () => {

    return (
        <header className={styles.header}>
            <nav className={`${styles['header__nav']} pt-4 pb-4`}>
                <div className={`${styles['header__nav-item']} ${styles['header__nav-item--logo']}`}>
                    <a href="/">
                        <Logo />
                        <img className={styles['header__logo-mobile']} src={mobileLogo} alt="React Burger Logo" />
                    </a>
                </div>
                <div className={`${styles['header__nav-item']}`}>
                    <Button type="secondary" size="medium">
                        <BurgerIcon />
                        <span className="ml-2" >Конструктор</span>
                    </Button>
                </div>
                <div className={styles['header__nav-item']}>
                    <Button type="secondary" size="medium">
                        <ListIcon />
                        <span className="ml-2">Лента&nbsp;заказов</span>
                    </Button>
                </div>
                <div className={styles['header__nav-item']}>
                    <Button type="secondary" size="medium">
                        <ProfileIcon />
                        <span className="ml-2">Личный&nbsp;кабинет</span>
                    </Button>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;