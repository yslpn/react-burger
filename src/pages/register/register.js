import React from 'react';
import styles from './register.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from 'services/actions/login';
import { useHistory } from 'react-router-dom';

const RegPage = () => {
    const [formData, setFormData] = React.useState({ name: '', email: '', password: '' });
    const history = useHistory();
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const onSubmit = async e => {
        e.preventDefault();
        console.log('super');
        let res = await dispatch(register(formData));
        if (res.ok) {
            history.replace('/login');
        }
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Регистрация</h1>
                <Input
                    type="text"
                    placeholder="Имя"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                />

                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                />

                <PasswordInput placeholder="Пароль" name="password" value={formData.password} onChange={onChange} />

                <span className={styles.button}>
                    <Button>Зарегистрироваться</Button>
                </span>
            </form>
            <p className={styles.text}>
                Уже зарегистрированы?&nbsp;
                <Link className={styles.link} to={'/login'}>
                    Войти
                </Link>
            </p>
        </div>
    );
}

export default RegPage;