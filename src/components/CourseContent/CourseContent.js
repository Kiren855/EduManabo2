import classNames from "classnames/bind";
import styles from "./CourseContent.module.scss";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClapperboard,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function CourseContent({ content }) {
    const [expandedSections, setExpandedSections] = useState({});
    const [expandAll, setExpandAll] = useState(false);

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
        content.forEach((_, index) => {
            allSections[index] = newState;
        });
        setExpandedSections(allSections);
    };

    return (
        <div className={cx('course-content')}>
            <div className={cx('course-header')}>
                <h2>Nội dung khóa học</h2>
                <span>{content.length} phần • {content.reduce((total, item) => total + item.lessons.length, 0)} bài giảng</span>
                <button onClick={handleExpandAll}>
                    {expandAll ? 'Thu gọn tất cả các phần' : 'Mở rộng tất cả các phần'}
                </button>
            </div>
            <div className={cx('course-sections')}>
                {content.map((section, index) => (
                    <div key={index} className={cx('course-section')}>
                        <div className={cx('section-header')} onClick={() => toggleSection(index)}>
                            <div>
                                <span className={cx('icon')}>{expandedSections[index] ? '▼' : '►'}</span>
                                <strong>{section.name}</strong>
                            </div>
                            <span>{section.lessons.length} bài giảng •  {Math.floor(section.duration / 60)} phút {section.duration % 60} giây</span>
                        </div>
                        {expandedSections[index] && (
                            <div className={cx('lectures')}>
                                {section.lessons.map((lessons, i) => (
                                    <div key={i} className={cx('lecture-item')}>
                                        <div>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faClapperboard} />
                                            </span>
                                            <span className={cx('lecture-link')} >
                                                {lessons.name}
                                            </span>
                                        </div>
                                        <span className={cx('lecture-duration')}>
                                            {lessons.duration !== null ? `${Math.floor(lessons.duration / 60)} phút ${lessons.duration % 60} giây` : ''}
                                        </span>
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