import React from 'react';
import styles from './profile.module.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserProfile from 'components/user-profile/user-profile';

const ProfilePage = () => {
    const { userLogged } = useSelector(store => ({
        userLogged: store.login.userLogged
    }));

    return (
        !userLogged ? <Redirect to={'/login'} /> :
            <section className={styles.wrapper}>
                <UserProfile />
            </section>
    );
}

export default ProfilePage;