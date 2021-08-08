import React from 'react';
import styles from './login.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions/login';

const LoginPage = () => {
    const { userLogged } = useSelector(store => ({
        userLogged: store.login.userLogged
    }));
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({ email: '', password: '' });
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();
        if (formData !== { email: '', password: '' }) {
            dispatch(login(formData));
        }
    };
    return (
        userLogged ? <Redirect to={'/'} /> :
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h1 className={styles.heading}>Вход</h1>
                    <Input name="email" type="email" value={formData.email} placeholder="E-mail" onChange={onChange} />
                    <PasswordInput name="password" value={formData.password} onChange={onChange} />
                    <span className={styles.button}>
                        <Button>Войти</Button>
                    </span>
                </form>
                <p className={styles.text}>
                    Вы — новый пользователь?&nbsp;
                    <Link className={styles.link} to={'/register'}>
                        Зарегистрироваться
                    </Link>
                </p>
                <p className={styles.text}>
                    Забыли пароль?&nbsp;
                    <Link className={styles.link} to={'/forgot-password'}>
                        Восстановить пароль
                    </Link>
                </p>
            </div>
    );
}

export default LoginPage;