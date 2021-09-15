import styles from './profile-nav.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/actions/login';
import PropTypes from 'prop-types';

const ProfileNav = (props) => {
    const dispatch = useDispatch();
    const onClick = () => {
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
                {props.children}
            </p>
        </div>
    );
}

ProfileNav.propTypes = {
    children: PropTypes.string.isRequired,
};

export default ProfileNav;