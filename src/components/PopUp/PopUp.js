import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from './PopUp.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PopUp({ tileLink, to, type, Content }) {
    const [data, setData] = useState(null); // State để lưu dữ liệu từ API
    // const [loading, setLoading] = useState(true); // State để kiểm soát hiển thị trong lúc loading
    // const [error, setError] = useState(null); // State để lưu lỗi (nếu có)

    // // useEffect để gọi API khi 'type' thay đổi
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         setError(null); // Reset lại lỗi trước đó
    //         try {
    //             let response;

    //             // Gọi API dựa trên 'type'
    //             if (type === 'wishList') {
    //                 response = await fetch('/api/category-data');
    //             } else if (type === 'shopping') {
    //                 response = await fetch('/api/product-data');
    //             } else if (type === 'user') {
    //                 response = await fetch('/api/user-data');
    //             } else {
    //                 throw new Error('Invalid type provided');
    //             }

    //             const result = await response.json();
    //             setData(result); // Cập nhật dữ liệu
    //         } catch (err) {
    //             setError(err.message); // Cập nhật lỗi nếu có
    //         } finally {
    //             setLoading(false); // Đặt loading thành false khi API hoàn tất
    //         }
    //     };

    //     fetchData(); // Gọi API
    // }, [type]); // Chạy lại useEffect mỗi khi 'type' thay đổi

    // if (loading) {
    //     return <div className={cx('loading')}>
    //         <div className={cx('spinner')}></div>
    //         <span>Loading...</span>
    //     </div>
    // }

    // if (error) {
    //     return <div className={cx('error')}>
    //         <span className={cx('error-icon')}><FontAwesomeIcon icon={faTriangleExclamation} /></span> {/* Icon cảnh báo */}
    //         <span>Error: {error}</span>
    //     </div>

    // }

    const courses = [
        {
            id: 1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkmyw35oN5VxFtxNIOFDzf4MnDzXPQ_KwWw&s',
            title: 'Introduction to JavaScript Introduction to JavaScript ',
            creator: 'John Doe',
            price: '$19.99',
        },
        {
            id: 2,
            image: 'https://i.pinimg.com/236x/bd/01/4e/bd014e320cb0fc316a4875696c2c56df.jpg',
            title: 'Mastering ReactJS',
            creator: 'Jane Smith',
            price: '$29.99',
        },
        {
            id: 3,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzLuLxm_zj5aNmMZ9KCr3eSmmsDMX4FJTu1g&s',
            title: 'Python for Data Science',
            creator: 'Alex Johnson',
            price: '$24.99',
        },
        {
            id: 4,
            image: 'https://icdn.24h.com.vn/upload/2-2023/images/2023-06-06/kim5_1-1686027959-673-width740height480.jpg',
            title: 'UI/UX Design Principles',
            creator: 'Emily Davis',
            price: '$15.99',
        },
        {
            id: 5,
            image: 'https://top10tphcm.com/wp-content/uploads/2024/04/hinh-anh-gai-xinh-han-quoc-dep-nhat-42.jpg',
            title: 'Fullstack Web Development',
            creator: 'Michael Brown',
            price: '$49.99',
        },
    ];

    return (
        <>
            {data ? (
                <div className={cx('courses-container')}>
                    {type === 'wishList' && (
                        <>
                            {courses.map(course => (
                                <div className={cx('course-container')}>
                                    <div key={course.id} className={cx('course-card')}>
                                        <div className={cx('course-image')} >
                                            <img src={course.image} alt={course.title} />
                                        </div>
                                        <div className={cx('shopping-module')}>
                                            <Link className={cx('course-title')}>{course.title}</Link>
                                            <p className={cx('course-creator')}>By {course.creator}</p>
                                            <p className={cx('course-price')}>{course.price}</p>
                                        </div>
                                    </div>
                                    <div className={cx('add-to-cart')}>
                                        <button className={cx('add-to-cart-button')}>Thêm vào giỏ hàng</button>
                                    </div>
                                </div>
                            ))}
                            <div className={cx('panel-module-footer')}>
                                <Link className={cx('link-to-page')}><span>Chuyển đến danh sách mong ước</span></Link>
                            </div>
                        </>
                    )}

                    {type === 'shopping' && (
                        <>
                            {courses.map(course => (
                                <div className={cx('course-container')}>
                                    <div key={course.id} className={cx('course-card')}>
                                        <div className={cx('course-image')} >
                                            <img src={course.image} alt={course.title} />
                                        </div>
                                        <div className={cx('shopping-module')}>
                                            <Link className={cx('course-title')}>{course.title}</Link>
                                            <p className={cx('course-creator')}>By {course.creator}</p>
                                            <p className={cx('course-price')}>{course.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className={cx('panel-module-footer')}>
                                <div className={cx('shopping-module-item')}>
                                    <div>Tổng: </div>
                                    <div>
                                        <span> 2.500.500 vnd</span>
                                    </div>
                                </div>
                                <Link className={cx('link-to-page')}><span>Chuyển đến giỏ hàng</span></Link>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className={cx('pd-1')}>
                    <span className={cx('cart-title')}>{Content} {/* Nội dung khi di chuột */}</span>
                    <Link className={cx('toShopping')} to={to}>
                        <span >{tileLink}</span>
                    </Link>
                </div>
            )}
        </>
    );
}

export default PopUp;
