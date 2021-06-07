import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = (props) => {
    const onClose = (e) => props.onClose && props.onClose(e);

    return (
        <ModalOverlay show={props.show} onClose={props.onClose}>
            <div className={styles.modal}>
                <button type="button" aria-label="Закрыть" className={styles['modal__close-btn']}
                    onClick={(e) => { onClose(e) }}
                >
                    <CloseIcon type="primary" />
                </button>
                {props.children}
            </div>
        </ModalOverlay>
    );
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;