import classNames from "classnames/bind";
import styles from "./ScrollToTopButton.module.scss";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUp
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function ScrollToTopButton() {

    const [isVisible, setIsVisible] = useState(false);

    // Hiển thị nút khi người dùng cuộn xuống 200px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Hàm cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <button
            onClick={scrollToTop}
            className={cx('scrollToTopButton', { [styles.visible]: isVisible })}
            aria-label="Scroll to top"
        >
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
    );
}

export default ScrollToTopButton;