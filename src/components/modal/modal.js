import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = (props) => {
    const onClose = (e) => props.onClose && props.onClose(e);

    return (
        <div className={styles.modal}>
            <button type="button" aria-label="Закрыть" className={styles['modal__close-btn']}
                onClick={(e) => { onClose(e) }}
            >
                <CloseIcon type="primary" />
            </button>
            {props.children}
        </div>
    )
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;