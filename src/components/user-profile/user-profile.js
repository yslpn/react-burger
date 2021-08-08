import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './user-profile.module.css';
import { NavLink } from 'react-router-dom';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { logout }  from '../../services/actions/login';

const UserProfile = () => {
    const { name, email } = useSelector(store => ({
        name: store.login.user.name,
        email: store.login.user.email
    }));
    const [formData, setFormData] = useState({ name: name, email: email, password: '' });
    const [isChanged, setChanged] = useState(false);
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (!isChanged) { setChanged(true) }
    };
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
        if (formData.name && formData.email) {
            console.log(formData);
            //дописать
            setChanged(false);
        }
    };

    const onCancel = (e) => {
        e.preventDefault();
        setFormData({
            name: name,
            email: email,
            password: ''
        });
        setChanged(false);
    };

    const onClick = () => {
        dispatch(logout());
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.navmenu}>
                <nav className={styles.menu}>
                    <NavLink to="/profile" className={styles.link} activeClassName={styles.active}>
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
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <form className={styles.user_info} onSubmit={onSubmit}>
                <Input onChange={onChange} icon={'EditIcon'} name="name" type="text" value={formData.name} placeholder="Имя" />
                <Input onChange={onChange} icon={'EditIcon'} name="email" type="email" value={formData.email} placeholder="Логин" />
                <Input onChange={onChange} icon={'EditIcon'} name="password" type="password" value={formData.password} placeholder="Пароль" />

                {isChanged && formData.password !== '' &&
                    <span className={styles.button}>
                        <Button>Сохранить</Button>
                        <Button onClick={onCancel} size='medium' type='secondary'>Отмена</Button>
                    </span>
                }
            </form>
        </div>
    );
}

export default UserProfile;