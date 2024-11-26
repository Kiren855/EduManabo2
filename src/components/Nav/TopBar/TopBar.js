import React from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './TopBar.module.scss';

const cx = classNames.bind(styles);

const TopBar = () => {
    const navigate = useNavigate();
    const handleExitClick = () => {
        navigate('/user/profile/courses');
    };

    return (
        <div className={cx('top-bar')}>
            <button className={cx('back-button')} onClick={handleExitClick}>
                <span className={cx('icon')}><FontAwesomeIcon icon={faArrowLeft} /></span>
                Quay lại khóa học
            </button>
            <div className={cx('status')}>
                <span>BẢN NHÁP</span>
                <span>Đã tải 0 phút nội dung video lên</span>
            </div>
        </div>
    );
};

export default TopBar;
