import classNames from "classnames/bind";
import React, { useState, useEffect } from 'react';
import styles from "./RecommendedVideos.module.scss";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRecommend } from "~/services/recommend/recommend";
import {
    faStar,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)




function RecommendedVideos({ title, type, setIsLoading, setToast }) {

    const [currentIndex, setCurrentIndex] = useState(0); // Chỉ số trang hiện tại
    const itemsPerPage = 5; // Số lượng khóa học hiển thị trên mỗi slide
    const [courses, setCourses] = useState([]); // Danh sách tất cả các khóa học
    const [displayedCourses, setDisplayedCourses] = useState([]); // Danh sách các khóa học hiển thị
    const navigate = useNavigate();

    // Hàm lấy dữ liệu từ API và cập nhật state
    const fetchData = async () => {
        try {
            const coursesData = await getRecommend(); // Giả sử getRecommend là hàm lấy dữ liệu khóa học
            setCourses(coursesData); // Lưu tất cả khóa học vào state courses
        } catch (err) {
            console.error('Lỗi khi lấy khóa học:', err);
        }
    };

    // Cập nhật displayedCourses khi currentIndex hoặc courses thay đổi
    useEffect(() => {
        const startIndex = currentIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedCourses(courses.slice(startIndex, endIndex)); // Cập nhật danh sách hiển thị khóa học
    }, [currentIndex, courses]); // Chạy lại khi currentIndex hoặc courses thay đổi

    // Hàm chuyển sang slide tiếp theo
    const nextSlide = () => {
        if ((currentIndex + 1) * itemsPerPage < courses.length) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    // Gọi hàm fetchData khi component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Hàm chuyển về slide trước
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND', // Hoặc thay 'VND' bằng đơn vị tiền tệ khác nếu cần
        }).format(amount);
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
                            onClick={() => handleCourseClick(course.courseId)}
                        >
                            {course.isBestSeller && (
                                <div className={cx('best-seller')}>Best Seller</div>
                            )}

                            <img src={course.image} alt={course.title} />
                            <div className={cx('course-title')}>
                                <h3>{course.courseName}</h3>
                                <div className={cx('course-author')}>
                                    <span>{course.instructorName}</span>
                                </div>
                                <div className={cx('course-rate')}>
                                    <span>
                                        {course.rating}<span className={cx('icon-star')}><FontAwesomeIcon icon={faStar} /> </span>
                                    </span>
                                </div>
                                <div className={cx('course-price')}>
                                    <strong>{`Giá ${formatCurrency(course.price)}`}</strong>
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