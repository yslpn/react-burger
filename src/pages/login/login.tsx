import { useRef, useState, useEffect, FC } from 'react';
import styles from './login.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions/login';
import { AppDispatch, RootState } from 'index';

const LoginPage: FC = () => {
    const { userLogged } = useSelector((store: RootState) => ({
        userLogged: store.login.userLogged
    }));
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<{ email: string; password: string; }>({ email: '', password: '' });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (formData !== { email: '', password: '' }) {
            dispatch(login(formData));
        }
    };

    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    useEffect((): void => {
        passwordRef.current.setAttribute("autocomplete", "current-password");
        emailRef.current.setAttribute("autocomplete", "email");
    }, []);

    const [isShowPass, setPass] = useState<boolean>(false);
    const onIconClick = (): void => {
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