import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateCourse.module.scss';

const cx = classNames.bind(styles);

const CreateCourse = () => {
    const [step, setStep] = useState(1);
    const [courseType, setCourseType] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [timeCommitment, setTimeCommitment] = useState('');

    const categories = ['Lập trình', 'Thiết kế đồ họa', 'Marketing', 'Kinh doanh', 'Ngôn ngữ'];

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        alert('Khóa học của bạn đã được tạo thành công!');
        console.log({ courseType, title, category, timeCommitment });
    };

    return (
        <div className={cx('container')}>
            {step === 1 && (
                <div className={cx('step')}>
                    <h2 className={cx('step-title')}>Trước tiên, hãy tìm hiểu loại khóa học bạn đang tạo.</h2>
                    <div className={cx('outer-button')}>
                        <button
                            onClick={() => setCourseType('course')}
                            className={cx('button', 'block-button', { active: courseType === 'course' })}
                        >
                            <span className={cx('strong')}>Khóa học</span>
                            <span>Các bài giảng video, trắc nghiệm, bài tập coding, v.v. có thể giúp bạn tạo nên trải nghiệm học tập phong phú.</span>
                        </button>
                        <button
                            onClick={() => setCourseType('practice')}
                            className={cx('button', 'block-button', { active: courseType === 'practice' })}
                        >
                            <span className={cx('strong')}>Bài kiểm tra thực hành</span>
                            <span>Giúp học viên luyện thi lấy chứng chỉ bằng cách đưa ra câu hỏi thực hành.</span>
                        </button>
                    </div>
                    <div className={cx('navigation')}>
                        <button onClick={nextStep} className={cx('next-button')} disabled={!courseType}>
                            Tiếp tục
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className={cx('step')}>
                    <h2 className={cx('step-title')}>Vậy còn tiêu đề nội dung thì sao?</h2>
                    <div className={cx('input-parent')}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={60}
                            placeholder="Nhập tiêu đề khóa học (tối đa 60 ký tự)"
                            className={cx('input')}
                        />
                        <p className={cx('char-counter')}>{60 - title.length}</p>
                    </div>
                    <div className={cx('navigation')}>
                        <button onClick={prevStep} className={cx('back-button')}>
                            Quay lại
                        </button>
                        <button onClick={nextStep} className={cx('next-button')} disabled={!title}>
                            Tiếp tục
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className={cx('step')}>
                    <h2 className={cx('step-title')}>Thể loại nào phù hợp nhất với kiến thức mà bạn sẽ chia sẻ?</h2>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={cx('select')}
                    >
                        <option value="">Chọn một thể loại</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <div className={cx('navigation')}>
                        <button onClick={prevStep} className={cx('back-button')}>
                            Quay lại
                        </button>
                        <button onClick={nextStep} className={cx('next-button')} disabled={!category}>
                            Tiếp tục
                        </button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className={cx('step')}>
                    <div className={cx('radio-group')}>
                        <h2 className={cx('question-title')}>Bạn có thể dành bao nhiêu thời gian mỗi tuần để tạo khóa học?</h2>
                        <p className={cx('question-subtitle')}>
                            Không có câu trả lời sai. Chúng tôi có thể giúp bạn đạt mục tiêu của mình ngay cả khi bạn không có nhiều thời gian.
                        </p>
                        <label className={cx('radio')}>
                            <input
                                type="radio"
                                name="time"
                                value="Hiện tại tôi rất bận (0-2 giờ)"
                                onChange={(e) => setTimeCommitment(e.target.value)}
                            />
                            Hiện tại tôi rất bận (0-2 giờ)
                        </label>
                        <label className={cx('radio')}>
                            <input
                                type="radio"
                                name="time"
                                value="Tôi sẽ làm nhưng đây chỉ là việc phụ (2-4 giờ)"
                                onChange={(e) => setTimeCommitment(e.target.value)}
                            />
                            Tôi sẽ làm nhưng đây chỉ là việc phụ (2-4 giờ)
                        </label>
                        <label className={cx('radio')}>
                            <input
                                type="radio"
                                name="time"
                                value="Thời gian của tôi rất linh hoạt (Trên 5 giờ)"
                                onChange={(e) => setTimeCommitment(e.target.value)}
                            />
                            Thời gian của tôi rất linh hoạt (Trên 5 giờ)
                        </label>
                        <label className={cx('radio')}>
                            <input
                                type="radio"
                                name="time"
                                value="Tôi vẫn chưa quyết định được mình có thời gian hay không"
                                onChange={(e) => setTimeCommitment(e.target.value)}
                            />
                            Tôi vẫn chưa quyết định được mình có thời gian hay không
                        </label>
                    </div>

                    <div className={cx('navigation')}>
                        <button onClick={prevStep} className={cx('back-button')}>
                            Quay lại
                        </button>
                        <button
                            onClick={handleSubmit}
                            className={cx('submit-button')}
                            disabled={!timeCommitment}
                        >
                            Hoàn thành
                        </button>
                    </div>
                </div>
            )}
            <div className={cx('footer-bar')}>
                <button className={cx('button', 'next-button1')}>Thoát</button>
            </div>
        </div>
    );
};

export default CreateCourse;
