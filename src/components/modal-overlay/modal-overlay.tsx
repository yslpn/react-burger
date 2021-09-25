import React, { useEffect, FC, ReactNode, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { TLocation } from 'types';
import { AppDispatch } from 'index'

const ModalOverlay:FC<{children: ReactNode}> = ({children}) => {
    const dispatch = useDispatch<AppDispatch>();
    let location = useLocation<TLocation>();
    const history = useHistory();
    const node = React.useRef();
    const modalRoot = document.getElementById('modal');

    const closeWithEscape = (e: KeyboardEvent): null => {
        if (e.key === 'Escape') {
            if (location.pathname !== '/') {
                history.goBack();
            }
            dispatch({ type: 'CLOSE_MODAL' });
        }
        return null;
    };

    const closeWithClick = (e: MouseEvent<HTMLDivElement>): null => {
        if (node.current === e.target) {
            if (location.pathname !== '/') {
                history.goBack();
            }
            dispatch({ type: 'CLOSE_MODAL' });
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
            {children}
        </div>,
        modalRoot
    );
}

export default ModalOverlay;