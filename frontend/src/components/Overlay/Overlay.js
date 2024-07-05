// src/components/Overlay.js
import React, { useEffect, useRef } from 'react';
import styles from './Overlay.module.css';

const Overlay = ({ isVisible, onClose, children }) => {
    const overlayRef = useRef(null);

    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className={styles["overlay"]}>
            <div className={styles["overlay-content"]} ref={overlayRef}>
                {children}
            </div>
        </div>
    );
};

export default Overlay;
