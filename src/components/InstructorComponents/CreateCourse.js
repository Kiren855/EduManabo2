import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '~/services/createCourse/courseService';
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';
import { getCategories } from '~/services/createCourse/topicsService';

import classNames from 'classnames/bind';
import styles from './CreateCourse.module.scss';

const cx = classNames.bind(styles);

const CreateCourse = () => {
    const navigate = useNavigate();
    const handleExitClick = () => {
        navigate('/user/profile/courses');
    };

    const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái loading
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [step, setStep] = useState(1);
    const [courseType, setCourseType] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [timeCommitment, setTimeCommitment] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(); // Gọi service để lấy dữ liệu
                const temp = data.map(topic => ({
                    id: topic.id,
                    name: topic.name,
                }));
                setCategories(temp);
                setIsLoading(false); // Đánh dấu việc tải dữ liệu xong
            } catch (err) {
                setToast({ type: 'error', message: 'Lấy dữ liệu thất bại! Chuyển hướng trang!' });
                setTimeout(() => {
                    navigate('/user/profile/courses');
                }, 2000);
            }
        };

        fetchCategories(); // Gọi hàm khi component mounted
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        // Hiển thị spinner
        setIsLoading(true);

        try {
            const payload = { title, mainTopic: category };
            console.log('Payload gửi đi:', payload);

            // Gửi request tạo khóa học
            const response = await createCourse(payload);

            console.log('Response:', response);

            // Hiển thị thông báo thành công
            setToast({ type: 'success', message: 'Khóa học được tạo thành công! Đang chuyển hướng...' });

            // Chuyển hướng đến trang chỉnh sửa khóa học
            const courseId = response.result; // Lấy `id` từ `result`
            navigate(`/courses/edit/${courseId}`);

        } catch (error) {
            // Hiển thị thông báo lỗi
            setToast({ type: 'error', message: 'Tạo khóa học thất bại!' });
            console.error('Lỗi tạo khóa học:', error);
        } finally {
            // Ẩn spinner
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Hiển thị spinner hoặc form dựa trên trạng thái `isLoading` */}
            {isLoading ? (
                <div className={cx('container')}>
                    <div className={cx('spinner')}>
                        <Spinner message="Đợi một chút trong khi chúng tôi xử lý yêu cầu của bạn..." />
                    </div>
                </div>
            ) : (
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
                                    <span>Sắp ra mắt</span>
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
                                id="mainTopic"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={cx('select')}
                            >
                                <option value="">Chọn một thể loại</option>
                                {/* Hiển thị danh sách các option với id và name */}
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
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
                        <button className={cx('button', 'next-button1')} onClick={handleExitClick}>Thoát</button>
                    </div>
                </div>
            )}

            {/* Hiển thị ToastMessage */}
            {toast && (
                <ToastMessage
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};

export default CreateCourse;
