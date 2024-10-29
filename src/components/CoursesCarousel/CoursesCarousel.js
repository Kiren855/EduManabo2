import classNames from "classnames/bind";
import styles from "./CoursesCarousel.module.scss";

import CourseItem from "../CourseItem";

const cx = classNames.bind(styles)

const courses = [
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "https://9anime.vn/wp-content/uploads/2024/08/1722760791_326_101-Hinh-anh-gai-xinh-Trung-Quoc-dep-nhat-hien.jpg",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    // Thêm các khóa học khác...
];

function CoursesCarousel({ title }) {
    return (
        <>
            <div className={cx('mt-4')}>
                <h2>{title}</h2>
            </div>
            <div className={cx('coursesCarousel')}>
                {courses.map(course => (
                    <CourseItem key={course.id} course={course} />
                ))}
            </div>
        </>

    );
}

export default CoursesCarousel;