import React, { FormEvent, FC } from 'react';
import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from 'services/actions/login';
import { useHistory } from 'react-router-dom';

const RegPage: FC = () => {
    const [formData, setFormData] = React.useState<{ name: string; email: string; password: string; }>({ name: '', email: '', password: '' });
    const history = useHistory();
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let res = await dispatch(register(formData));
        //@ts-ignore
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