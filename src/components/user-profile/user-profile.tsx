import { useRef, useState, useEffect } from 'react';
import styles from './user-profile.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from '../../services/actions/login';
import { FC } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/hooks';

const UserProfile: FC = () => {
    const dispatch = useAppDispatch();
    const { name, email } = useAppSelector((store) => ({
        name: store.login.user.name,
        email: store.login.user.email
    }));
    const [formData, setFormData] = useState<{ name: string; email: string; password: string; }>({ name: name, email: email, password: '' });
    const [isChanged, setChanged] = useState<boolean>(false);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (!isChanged) { setChanged(true) }
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (formData.name && formData.email) {
            dispatch(updateUser(formData));
            setChanged(false);
        }
    };

    const onCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setFormData({
            name: name,
            email: email,
            password: ''
        });
        setChanged(false);
    };
    
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);

    useEffect(() => {
        passwordRef.current.setAttribute("autocomplete", "current-password");
        emailRef.current.setAttribute("autocomplete", "email");
        usernameRef.current.setAttribute("autocomplete", "username");
    }, []);

    return (
        <form className={styles.user_info} onSubmit={onSubmit}>
            <Input ref={usernameRef} onChange={onChange} icon={'EditIcon'} name="name" type="text" value={formData.name} placeholder="Имя" />
            <Input ref={emailRef} onChange={onChange} icon={'EditIcon'} name="email" type="email" value={formData.email} placeholder="Логин" />
            <Input ref={passwordRef} onChange={onChange} icon={'EditIcon'} name="password" type="password" value={formData.password} placeholder="Пароль" />

            {isChanged && formData.password !== '' &&
                <span className={styles.button}>
                    <Button>Сохранить</Button>
                    <Button onClick={onCancel} size='medium' type='secondary'>Отмена</Button>
                </span>
            }
        </form>
    );
}

export default UserProfile;