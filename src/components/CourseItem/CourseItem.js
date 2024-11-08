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
        navigate(`/course/${courseId}`);
    };

    return (
        <div onClick={handleCourseClick} className={cx('courseItem')}>
            <div className={cx('course-image')}>
                <img src={course.image} alt={course.name} className={cx('courseImage')} />
            </div>
            {course.isBestSeller && (
                <div className={cx('bestSellerBadge')}><FontAwesomeIcon icon={faMedal} /></div>
            )}
            <div className={cx('course-title')}>
                <h3 className={cx('courseName')}>{course.name}</h3>
                <p className={cx('courseAuthor')}>{course.author}</p>
                <div className={cx('courseRate')}>
                    <span>{course.rate}</span>
                    <span className={cx('iconStar')}>⭐</span>
                    <span>({course.count})</span>
                </div>
                <div className={cx('coursePrice')}>
                    <strong>{course.price} VND</strong>
                </div>
            </div>

        </div>
    );
}

export default CourseItem;