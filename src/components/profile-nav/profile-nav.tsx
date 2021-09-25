import styles from './profile-nav.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/actions/login';
import { AppDispatch } from 'index'
import { FC, ReactNode } from 'react';

const ProfileNav:FC<{children: ReactNode}> = ({children}) => {
    const dispatch = useDispatch<AppDispatch>();
    const onClick = (): void => {
        dispatch(logout());
    }

    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <NavLink to="/profile" className={styles.link} activeClassName={styles.active} exact>
                    Профиль
                </NavLink>
                <NavLink to="/profile/orders" className={styles.link} activeClassName={styles.active}>
                    История заказов
                </NavLink>
                <NavLink to="/login" className={styles.link} onClick={onClick}>
                    Выход
                </NavLink>
            </nav>
            <p className={styles.text}>
                {children}
            </p>
        </div>
    );
}

export default ProfileNav;