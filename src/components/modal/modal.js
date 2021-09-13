import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Modal = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <ModalOverlay close={props.close}>
            <div className={styles.modal}>
                <button type="button" aria-label="Закрыть" className={styles['modal__close-btn']}
                    onClick={(e) => { 
                        dispatch({ type: 'CLOSE_MODAL' }); 
                        history.goBack();
                    }}
                >
                    <CloseIcon type="primary" />
                </button>
                {props.children}
            </div>
        </ModalOverlay>
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Modal;