import React from 'react';
import styles from './forgot-password.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { forgotPassRequest, newPassRequest } from '../../services/api';
import { TLocation } from 'types';
import { useAppSelector } from 'services/hooks';

const ForgotPassPage = () => {
    let history = useHistory();
    let location = useLocation<TLocation>();
    const [formData, setFormData] = React.useState<{ password: string; token: string; }>({ password: '', token: '' });
    const [email, setEmail] = React.useState<string>('');
    const [isVerification, setVerification] = React.useState<boolean>(false);
    const [hasError, setHasError] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [hasSuccess, setHasSuccess] = React.useState<boolean>(false);
    const { userLogged } = useAppSelector((store) => ({
        userLogged: store.login.userLogged
    }));

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onSubmitEmail = (e: React.SyntheticEvent) => {
        e.preventDefault();
        forgotPassRequest(email);
        setVerification(true);
        setEmail('');
        history.push('/reset-password');
    }

    const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setHasError(false);
    };

    const onSubmitReset = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const res = await newPassRequest(formData);
        if(res.success) {
            setHasSuccess(true);
            setEmail('');
        } else {
            setHasError(true);
            setErrorMessage(res.message);
        }
    }

    const [isShowPass, setPass] = React.useState<boolean>(false);
    const onIconClick = (): void => {
        setPass(!isShowPass);
    }

    if (hasSuccess) {
        return (
            <Redirect to={{ pathname: '/login' }} />
        );
    }

    if (!isVerification && location.pathname === '/reset-password') {
        return (
            <Redirect to={{ pathname: '/forgot-password' }} />
        );
    }


    if (isVerification) {
        return (
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmitReset}>
                    <h1 className={styles.heading}>Восстановление пароля</h1>
                    {hasError && <span className={styles.error}>{errorMessage}</span>}
                    <Input
                        type={isShowPass ? 'text' : "password"}
                        placeholder="Введите новый пароль"
                        name="password"
                        icon={isShowPass ? 'HideIcon' : 'ShowIcon'}
                        value={formData.password}
                        onChange={onChangePass}
                        onIconClick={onIconClick}
                        error={hasError}
                        success={hasSuccess}
                    />
                    <Input
                        type="text"
                        placeholder="Введите код из письма"
                        name="token"
                        value={formData.token}
                        onChange={onChangePass}
                        error={hasError}
                        success={hasSuccess}
                    />
                    <span className={styles.button}>
                        <Button>Восстановить</Button>
                    </span>
                </form>
                <p className={styles.text}>
                    Вспомнили пароль?&nbsp;
                    <Link className={styles.link} to={'/login'}>
                        Войти
                    </Link>
                </p>
            </div>
        )
    }

    return (
        userLogged ? <Redirect to={'/'} /> :
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmitEmail}>
                    <h1 className={styles.heading}>Восстановление пароля</h1>
                    <Input
                        type="email"
                        placeholder="Укажите e-mail"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <span className={styles.button}>
                        <Button>Восстановить</Button>
                    </span>
                </form>
                <p className={styles.text}>
                    Вспомнили пароль?&nbsp;
                    <Link className={styles.link} to={'/login'}>
                        Войти
                    </Link>
                </p>
            </div>
    );
}

export default ForgotPassPage;