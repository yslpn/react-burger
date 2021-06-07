import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    const node = React.useRef();
    const modalRoot = document.getElementById('modal');

    const onClose = (e) => {
        if (node.current === e.target || e.keyCode === 27) {
            props.onClose && props.onClose(e);
        }
        return null;
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.addEventListener("keydown", onClose, false);
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener("keydown", onClose, false);
        };
    });

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={(e) => { onClose(e) }} ref={node}>
            {props.children}
        </div>,
        modalRoot
    );
}

ModalOverlay.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalOverlay;