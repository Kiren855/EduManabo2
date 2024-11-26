import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from "./ToastMessage.module.scss";

const cx = classNames.bind(styles);

const ToastMessage = ({ type, message, duration = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        // Thanh progress giảm dần
        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.max(prev - 100 / (duration / 100), 0));
        }, 100);

        // Đóng toast sau thời gian `duration`
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose && onClose(); // Gọi callback khi toast đóng
        }, duration);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        }; // Dọn dẹp timer và interval khi component unmount
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={cx('toast', `toast-${type}`)}>
            <div className={cx('message-container')}>
                <span>{message}</span>
                <button className={cx('close-button')} onClick={() => {
                    setIsVisible(false);
                    onClose && onClose();
                }}>
                    &times;
                </button>
            </div>
            <div className={cx('progress-bar')} style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default ToastMessage;
