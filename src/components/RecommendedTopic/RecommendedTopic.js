import classNames from "classnames/bind";
import React, { useState } from 'react';
import styles from "./RecommendedTopic.module.scss";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const topics = [
    { title: 'Giao dịch theo thuật toán' },
    { title: 'Tài chính định lượng' },
    { title: 'Giao dịch quyền chọn' },
    { title: 'API (Application Programming Interface - Giao diện lập trình ứng dụng)' },
    { title: 'Phân tích đầu tư và Quản lý danh mục' },
    { title: 'MetaTrader 5' },
    { title: 'MQL' },
    { title: 'Giao dịch trong ngày' },
    { title: 'Kinh doanh ngoại hối' },
    { title: 'Interactive Brokers' },
    { title: 'Giao dịch theo thuật toán' },
    { title: 'Tài chính định lượng' },
    { title: 'Giao dịch quyền chọn' },
    { title: 'API (Application Programming Interface - Giao diện lập trình ứng dụng)' },
    { title: 'Phân tích đầu tư và Quản lý danh mục' },
    { title: 'MetaTrader 5' },
    { title: 'MQL' },
    { title: 'Giao dịch trong ngày' },
    { title: 'Kinh doanh ngoại hối' },
    { title: 'Interactive Brokers' },
];

function RecommendedTopic({ title }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 10; // Số lượng topic hiển thị trên mỗi trang
    const navigate = useNavigate();

    const startIndex = currentIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedTopics = topics.slice(startIndex, endIndex);

    const nextSlide = () => {
        if ((currentIndex + 1) * itemsPerPage < topics.length) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleTopicClick = (topicTitle) => {
        navigate(`/topics/${topicTitle}`);
    };

    return (
        <>
            <div className={cx('mt-4')}>
                <h2>{title}</h2>
            </div>
            <div className={cx('carousel')}>
                <div className={cx('carousel-container')}>
                    {displayedTopics.map((topic, index) => (
                        <div
                            key={index}
                            className={cx('carousel-item')}
                            onClick={() => handleTopicClick(topic.title)}
                        >
                            <div className={cx('topic-title')}>{topic.title}</div>
                        </div>
                    ))}
                </div>
                <div className={cx('carousel-buttons')}>
                    {currentIndex > 0 && (
                        <button onClick={prevSlide} className={cx('prev-button')}>❮</button>
                    )}
                    {(currentIndex + 1) * itemsPerPage < topics.length && (
                        <button onClick={nextSlide} className={cx('next-button')}>❯</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default RecommendedTopic;
