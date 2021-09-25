import { FC, ReactNode } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { TLocation } from 'types';
import { AppDispatch } from 'index';

const Modal:FC<{children: ReactNode}> = ({ children }) => {
    let location = useLocation<TLocation>();
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <ModalOverlay >
            <div className={styles.modal}>
                <button type="button" aria-label="Закрыть" className={styles['modal__close-btn']}
                    onClick={():void => {
                        if (location.pathname !== '/') {
                            history.goBack();
                        }
                        dispatch({ type: 'CLOSE_MODAL' });
                    }}
                >
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
        </ModalOverlay>
    );
}

export default Modal;