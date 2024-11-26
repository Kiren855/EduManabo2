import React from 'react';
import classNames from 'classnames/bind';

import CurriculumSection from '../CurriculumSection';
import styles from './Curriculum.module.scss';

const cx = classNames.bind(styles);

const Curriculum = () => {
    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Chương trình giảng dạy</h2>

            {/* Thông báo chính */}
            <div className={cx('info-box')}>
                <div className={cx('icon-container')}>
                    <span className={cx('info-icon')}>ℹ</span>
                </div>
                <div className={cx('info-content')}>
                    <p>
                        Đây là nơi bạn thêm nội dung khóa học, chẳng hạn như bài giảng, các
                        phần của khóa học, bài tập, v.v. Hãy nhấp vào biểu tượng + ở bên trái để bắt đầu.
                    </p>
                    <button className={cx('cancel-button')}>Hủy bỏ</button>
                </div>
            </div>

            {/* Hướng dẫn */}
            <div className={cx('instruction')}>
                <p>
                    Hãy bắt đầu xây dựng khóa học của bạn bằng cách tạo các phần, bài giảng và bài thực hành
                    (trắc nghiệm, bài tập coding và bài tập). Sử dụng{' '}
                    <a href="/" className={cx('link')}>
                        đề cương khóa học
                    </a>{' '}
                    của bạn để cấu trúc nội dung của bạn và gắn nhãn các phần và bài giảng của bạn một cách rõ ràng. Nếu bạn định cung cấp khóa học miễn phí, tổng thời lượng của nội dung video phải dưới 2 giờ.
                </p>
            </div>

            {/* Thông báo mới */}
            <div className={cx('new-feature')}>
                <div className={cx('label')}>Mới</div>
                <p>
                    Xem những cải tiến mới nhất về quy trình sáng tạo, các loại câu hỏi mới và các tính năng được AI hỗ trợ trong các bài kiểm tra thực hành.
                </p>
                <button className={cx('cancel-button')}>Hủy bỏ</button>
            </div>

            <div>
                <CurriculumSection />
            </div>
        </div>
    );
};

export default Curriculum;
