import classNames from "classnames/bind";
import styles from "./CourseItem.module.scss";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMedal,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)


function CourseItem({ course }) {
    const navigate = useNavigate();


    const handleCourseClick = (courseId) => {
        navigate(`/course/${course.courseId}`);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND', // Hoặc thay 'VND' bằng đơn vị tiền tệ khác nếu cần
        }).format(amount);
    };


    return (
        <div onClick={handleCourseClick} className={cx('courseItem')}>
            <div className={cx('course-image')}>
                <img src={course.image} alt={course.courseName} className={cx('courseImage')} />
            </div>
            {course.isBestSeller && (
                <div className={cx('bestSellerBadge')}><FontAwesomeIcon icon={faMedal} /></div>
            )}
            <div className={cx('course-title')}>
                <h3 className={cx('courseName')}>{course.courseName}</h3>
                <p className={cx('courseAuthor')}>{course.instructorName}</p>
                <div className={cx('courseRate')}>
                    <span>{course.rating}</span>
                    <span className={cx('iconStar')}>⭐</span>
                </div>
                <div className={cx('coursePrice')}>
                    <strong>{`Giá ${formatCurrency(course.price)}`}</strong>
                </div>
            </div>

        </div>
    );
}

export default CourseItem;