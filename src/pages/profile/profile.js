import styles from './profile.module.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserProfile from 'components/user-profile/user-profile';
import { ProfileNav } from 'components/profile-nav';

const ProfilePage = () => {
    const { userLogged } = useSelector(store => ({
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