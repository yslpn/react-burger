import styles from './profile.module.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserProfile from 'components/user-profile/user-profile';
import ProfileNav from 'components/profile-nav/profile-nav';
import { RootState } from 'index';
import { FC } from 'react';

const ProfilePage: FC = () => {
    const { userLogged } = useSelector((store: RootState) => ({
        userLogged: store.login.userLogged
    }));

    return (
        !userLogged ? <Redirect to={'/login'} /> :
            <section>
                <div className={styles.wrapper}>
                    <ProfileNav>
                        В этом разделе вы можете изменить свои персональные данные
                    </ProfileNav>
                    <UserProfile />
                </div>
            </section>
    );
}

export default ProfilePage;