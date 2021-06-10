import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = (props) => {
    const closeModal = (e) => props.close && props.close(e);

    return (
        <ModalOverlay status={props.status} close={props.close}>
            <div className={styles.modal}>
                <button type="button" aria-label="Закрыть" className={styles['modal__close-btn']}
                    onClick={(e) => { closeModal(e) }}
                >
                    <CloseIcon type="primary" />
                </button>
                {props.children}
            </div>
        </ModalOverlay>
    );
}

Modal.propTypes = {
    status: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired
};

export default Modal;