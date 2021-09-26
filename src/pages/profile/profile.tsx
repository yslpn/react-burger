import styles from './profile.module.css';
import { Redirect } from 'react-router-dom';
import UserProfile from 'components/user-profile/user-profile';
import ProfileNav from 'components/profile-nav/profile-nav';
import { FC } from 'react';
import { useAppSelector } from 'services/hooks';

const ProfilePage: FC = () => {
    const { userLogged } = useAppSelector((store) => ({
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