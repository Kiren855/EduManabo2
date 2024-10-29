import classNames from "classnames/bind";
import styles from "./AdCarousel.module.scss";
import React, { useState, useEffect } from 'react';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const slides1 = [
    {
        image: images.adcarousel,
        text: 'Đã đến lúc biến ước mơ thành hiện thực. Hãy nhận các khóa học trong danh sách mong ước , rồi thực hiện bước đầu tiên hướng đến mục tiêu của bạn.',
        title: 'Bạn đã ước chưa?'
    },
    {
        image: images.adcarousel1,
        text: 'Trên ghế sofa, từ sân sau hay trên đường đi làm. Ứng dụng của chúng tôi cho phép bạn quyết định chỗ học.',
        title: 'Học từ bất cứ nơi đâu'
    },
];

const slides2 = [
    {
        image: images.adcarousel2,
        text: 'Nếu bạn là người mới sử dụng Udemy thì đây là một tin vui dành cho bạn: Trong thời gian có hạn, các khóa học có giá chỉ từ ₫ 299.000 cho học viên mới! Mua ngay.',
        title: 'Tham gia học tập với chi phí thấp hơn'
    },
    {
        image: images.adcarousel1,
        text: 'Trên ghế sofa, từ sân sau hay trên đường đi làm. Ứng dụng của chúng tôi cho phép bạn quyết định chỗ học.',
        title: 'Học từ bất cứ nơi đâu'
    },
];

function AdCarousel({ isLogin }) {


    const slides = isLogin ? slides1 : slides2

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + slides.length) % slides.length
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 30000); // Chuyển slide sau mỗi 30 giây
        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    return (
        <div className={cx('carousel')}>
            <div className={cx('carousel-slide')}>
                <img src={slides[currentIndex].image} alt={`Slide ${currentIndex + 1}`} />
                <div className={cx('carousel-text')}>
                    <h1>{slides[currentIndex].title}</h1>
                    <span>{slides[currentIndex].text}</span>
                </div>
                <button className={cx('carousel-button', 'prev')} onClick={prevSlide}>❮</button>
                <button className={cx('carousel-button', 'next')} onClick={nextSlide}>❯</button>
            </div>
        </div>
    );
}

export default AdCarousel;
