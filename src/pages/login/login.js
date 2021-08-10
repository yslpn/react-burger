import { useRef, useState, useEffect } from 'react';
import styles from './login.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions/login';

const LoginPage = () => {
    const { userLogged } = useSelector(store => ({
        userLogged: store.login.userLogged
    }));
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();
        if (formData !== { email: '', password: '' }) {
            dispatch(login(formData));
        }
    };

    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    useEffect(() => {
        passwordRef.current.setAttribute("autocomplete", "current-password");
        emailRef.current.setAttribute("autocomplete", "email");
    }, []);

    const [isShowPass, setPass] = useState(false);
    const onIconClick = () => {
        setPass(!isShowPass);
    }

    return (
        userLogged ? <Redirect to={'/'} /> :
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h1 className={styles.heading}>Вход</h1>
                    <Input ref={emailRef} name="email" type="email" value={formData.email} placeholder="E-mail" onChange={onChange} />
                    <Input onIconClick={onIconClick} icon={isShowPass ? 'HideIcon' : 'ShowIcon'} ref={passwordRef} name="password" type={isShowPass ? 'text' : 'password'} value={formData.password} placeholder="Пароль" onChange={onChange} />
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