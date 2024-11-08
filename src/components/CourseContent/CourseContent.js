import classNames from "classnames/bind";
import styles from "./CourseContent.module.scss";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClapperboard,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function CourseContent() {
    const [expandedSections, setExpandedSections] = useState({});
    const [expandAll, setExpandAll] = useState(false);

    const courseData = [
        {
            title: 'Cùng bắt đầu với khóa học',
            lectures: [
                { title: 'Giới thiệu một chút', duration: '2 phút', link: '/video/intro' },
                { title: 'Ứng dụng của khóa học', duration: '4 phút', link: '/video/application' }
            ],
            time: '6 phút'
        },
        {
            title: 'Bắt đầu với Docker',
            lectures: [
                { title: 'Streamer Domixi', duration: '5 phút', link: '/video/domixi' },
                { title: 'Mixi Gaming', duration: '7 phút', link: '/video/mixi-gaming' },
                { title: 'Do Ly', duration: '6 phút', link: '/video/do-ly' }
            ],
            time: '18 phút'
        },
        {
            title: 'Cài đặt Docker', lectures: [
                { title: 'Streamer Domixi', duration: '5 phút', link: '/video/domixi' },
                { title: 'Mixi Gaming', duration: '7 phút', link: '/video/mixi-gaming' },
                { title: 'Do Ly', duration: '6 phút', link: '/video/do-ly' }
            ],
            time: '22 phút'
        },
        {
            title: 'Quản lý Docker Containers',
            lectures: [
                { title: 'Khởi tạo container', duration: '6 phút', link: '/video/init-container' },
                { title: 'Liệt kê container', duration: '3 phút', link: '/video/list-container' },
                { title: 'Xóa container', duration: '5 phút', link: '/video/remove-container' }
            ],
            time: '14 phút'
        },
        {
            title: 'Kết nối mạng trong Docker',
            lectures: [
                { title: 'Tạo Network cho container', duration: '7 phút', link: '/video/create-network' },
                { title: 'Cấu hình mạng Docker', duration: '9 phút', link: '/video/configure-network' }
            ],
            time: '16 phút'
        },
        {
            title: 'Quản lý Docker Images',
            lectures: [
                { title: 'Xây dựng image từ Dockerfile', duration: '10 phút', link: '/video/build-image' },
                { title: 'Lưu trữ và chia sẻ image', duration: '8 phút', link: '/video/share-image' }
            ],
            time: '18 phút'
        }
        // Các mục còn lại giữ nguyên
    ];


    const toggleSection = (index) => {
        setExpandedSections((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleExpandAll = () => {
        const newState = !expandAll;
        setExpandAll(newState);
        const allSections = {};
        courseData.forEach((_, index) => {
            allSections[index] = newState;
        });
        setExpandedSections(allSections);
    };

    return (
        <div className={cx('course-content')}>
            <div className={cx('course-header')}>
                <h2>Nội dung khóa học</h2>
                <span>{courseData.length} phần • {courseData.reduce((total, item) => total + item.lectures.length, 0)} bài giảng</span>
                <button onClick={handleExpandAll}>
                    {expandAll ? 'Thu gọn tất cả các phần' : 'Mở rộng tất cả các phần'}
                </button>
            </div>
            <div className={cx('course-sections')}>
                {courseData.map((section, index) => (
                    <div key={index} className={cx('course-section')}>
                        <div className={cx('section-header')} onClick={() => toggleSection(index)}>
                            <div>
                                <span className={cx('icon')}>{expandedSections[index] ? '▼' : '►'}</span>
                                <strong>{section.title}</strong>
                            </div>
                            <span>{section.lectures.length} bài giảng • {section.time}</span>
                        </div>
                        {expandedSections[index] && (
                            <div className={cx('lectures')}>
                                {section.lectures.map((lecture, i) => (
                                    <div key={i} className={cx('lecture-item')}>
                                        <div>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faClapperboard} />
                                            </span>
                                            <a href={lecture.link} className={cx('lecture-link')} target="_blank" rel="noopener noreferrer">
                                                {lecture.title}
                                            </a>
                                        </div>
                                        <span className={cx('lecture-duration')}>{lecture.duration}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseContent;