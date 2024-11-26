import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NavBarInstructor.module.scss';

const cx = classNames.bind(styles);

const NavBarInstructor = ({ onSelectSection }) => {
    const sections = [
        { id: 'target', name: 'Học viên mục tiêu' },
        { id: 'planLearn', name: 'Chương trình giảng dạy' },
        { id: 'overview', name: 'Trang tổng quan khóa học' },
        { id: 'message', name: 'Tin nhắn khóa học' },
        { id: 'pricing', name: 'Định giá' },
        { id: 'settings', name: 'Cài đặt' },
    ];

    const [selectedSection, setSelectedSection] = useState('target'); // Mặc định chọn 'Học viên mục tiêu'

    const handleSelectSection = (id) => {
        setSelectedSection(id); // Cập nhật mục được chọn
        onSelectSection(id); // Gọi hàm từ props
    };

    return (
        <div className={cx('container')}>
            <div className={cx('nav-bar')}>
                {sections.map((section) => (
                    <div key={section.id} className={cx('nav-item-container')}>
                        {selectedSection === section.id && <div className={cx('indicator')} />}
                        <button
                            className={cx('nav-item', {
                                active: selectedSection === section.id,
                            })}
                            onClick={() => handleSelectSection(section.id)}
                        >
                            {section.name}
                        </button>
                    </div>
                ))}
            </div>
            <button className={cx('submit-button')} onClick={() => alert('Gửi đi để xem xét!')}>
                Gửi đi để xem xét
            </button>
        </div>
    );
};

export default NavBarInstructor;
