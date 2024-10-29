import classNames from "classnames/bind";
import React, { useState } from 'react';
import styles from "./RecommendedVideos.module.scss";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

const courses = [
    { id: 1, image: 'https://antimatter.vn/wp-content/uploads/2022/10/hinh-anh-gai-xinh-de-thuong.jpg', title: 'Khóa học 1', to: '/', count: 0, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: true },
    { id: 2, image: 'https://media.viez.vn/prod/2022/9/23/large_lo_lem_9_5863_a3bbef0412.jpeg', title: 'Khóa học 2', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 2, price: "1.234.567", isBestSeller: true },
    { id: 3, image: 'https://benhvienthammydonga.vn/wp-content/uploads/2022/06/anh-mat-va-nu-cuoi-nhu-hoa-quyen.jpg', title: 'Khóa học 3', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 1, price: "1.234.567", isBestSeller: false },
    { id: 4, image: 'https://icdn.24h.com.vn/upload/2-2023/images/2023-06-06/kim5_1-1686027959-673-width740height480.jpg', title: 'Khóa học 4', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: false },
    { id: 5, image: 'https://via.placeholder.com/150', title: 'Khóa học 5', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 3.7, price: "1.234.567", isBestSeller: false },
    { id: 6, image: 'https://via.placeholder.com/150', title: 'Khóa học 6', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: false },
    { id: 7, image: 'https://via.placeholder.com/150', title: 'Khóa học 7', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: true },
    { id: 8, image: 'https://via.placeholder.com/150', title: 'Khóa học 8', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: false },
    { id: 9, image: 'https://via.placeholder.com/150', title: 'Khóa học 9', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: true },
    { id: 10, image: 'https://via.placeholder.com/150', title: 'Khóa học 10', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: false },
    { id: 11, image: 'https://via.placeholder.com/150', title: 'Khóa học 11', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: true },
    { id: 12, image: 'https://via.placeholder.com/150', title: 'Khóa học 12', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: true },
    { id: 13, image: 'https://via.placeholder.com/150', title: 'Khóa học 13', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: false },
    { id: 14, image: 'https://via.placeholder.com/150', title: 'Khóa học 14', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: false },
    { id: 15, image: 'https://via.placeholder.com/150', title: 'Khóa học 15', to: '/', count: 345, name: 'AWS Cloud for beginner (Vietnamese)', author: "CNG", rate: 4, price: "1.234.567", isBestSeller: false },
];


function RecommendedVideos({ title, type }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 5; // Số lượng khóa học hiển thị trên mỗi slide
    const navigate = useNavigate();

    // Xác định phần tử bắt đầu và phần tử kết thúc cho mỗi slide
    const startIndex = currentIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedCourses = courses.slice(startIndex, endIndex);

    // Hàm chuyển sang slide tiếp theo
    const nextSlide = () => {
        if ((currentIndex + 1) * itemsPerPage < courses.length) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    // Hàm chuyển về slide trước
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <>
            <div className={cx('mt-4')}>
                <h2>{title}</h2>
            </div>
            <div className={cx('carousel')}>
                <div className={cx('carousel-container')}>
                    {displayedCourses.map(course => (
                        <div
                            key={course.id}
                            className={cx('carousel-item')}
                            onClick={() => handleCourseClick(course.id)}
                        >
                            {course.isBestSeller && (
                                <div className={cx('best-seller')}>Best Seller</div>
                            )}

                            <img src={course.image} alt={course.title} />
                            <div className={cx('course-title')}>
                                <h3>{course.name}</h3>
                                <div className={cx('course-author')}>
                                    <span>{course.author}</span>
                                </div>
                                <div className={cx('course-rate')}>
                                    <span>
                                        {course.rate}<span className={cx('icon-star')}><FontAwesomeIcon icon={faStar} /> </span>({course.count})
                                    </span>
                                </div>
                                <div className={cx('course-price')}>
                                    <strong>{course.price} VND</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx('carousel-buttons')}>
                    {currentIndex > 0 && (
                        <button onClick={prevSlide} className={cx('prev-button')}>❮</button>
                    )}
                    {(currentIndex + 1) * itemsPerPage < courses.length && (
                        <button onClick={nextSlide} className={cx('next-button')}>❯</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default RecommendedVideos;