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
        id: 2,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 3,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 4,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 5,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 6,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 7,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 8,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 9,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 10,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 11,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 12,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 13,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 14,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "Le Tran Dat",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "link_to_image",
        isBestSeller: true
    },
    {
        id: 15,
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