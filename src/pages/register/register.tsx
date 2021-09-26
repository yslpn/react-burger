import React, { FormEvent, FC, useEffect } from 'react';
import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'services/actions/login';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'index';
import { RootState } from 'index';

const RegPage: FC = () => {
    const [formData, setFormData] = React.useState<{ name: string; email: string; password: string; }>({ name: '', email: '', password: '' });
    const history = useHistory();
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const { regUserSuccess } = useSelector((store: RootState) => ({
        regUserSuccess: store.login.regUserSuccess,
    }));
    const dispatch = useDispatch<AppDispatch>();
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(register(formData));
    }

    useEffect(() => {
        if (regUserSuccess) {
            history.replace('/login');
        }
      }, [regUserSuccess]);

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

                <Input placeholder="Пароль" name="password" type="password" value={formData.password} onChange={onChange} />

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