import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    const node = React.useRef();
    const modalRoot = document.getElementById('modal');

    const closeWithEscape = (e) => {
        if (e.keyCode === 27) {
            props.close && props.close(e);
        }
        return null;
    };

    const closeWithClick = (e) => {
        if (node.current === e.target) {
            props.close && props.close(e);
        }
        return null;
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.addEventListener("keydown", closeWithEscape, false);
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener("keydown", closeWithEscape, false);
        };
    });

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={(e) => { closeWithClick(e) }} ref={node}>
            {props.children}
        </div>,
        modalRoot
    );
}

ModalOverlay.propTypes = {
    status: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired
};

export default ModalOverlay;