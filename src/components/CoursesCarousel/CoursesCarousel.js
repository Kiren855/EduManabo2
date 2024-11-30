import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import styles from "./CoursesCarousel.module.scss";
import { getRecommendWithTopic } from "~/services/recommend/recommend";

import CourseItem from "../CourseItem";

const cx = classNames.bind(styles)

function CoursesCarousel({ title }) {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRecommendWithTopic()

                setCourses(data); // Lưu dữ liệu vào state courses
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData(); // Gọi hàm fetchData khi component mount
    }, []);

    return (
        <>
            <div className={cx('mt-4')}>
                <h2>{title}</h2>
            </div>
            <div className={cx('coursesCarousel')}>
                {courses.map(course => (
                    <CourseItem key={course.courseId} course={course} />
                ))}
            </div>
        </>

    );
}

export default CoursesCarousel;