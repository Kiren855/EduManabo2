import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Spinner from '~/utils/Spinner';
import ToastMessage from '~/utils/ToastMessage';

import { getTargetRequirements, updateTargetRequirements } from '~/services/createCourse/courseService';
import styles from './TargetAudience.module.scss';

const cx = classNames.bind(styles);

const TargetAudience = () => {
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const { courseID } = useParams();
    const [inputs, setInputs] = useState({
        objectives: ['', '', '', '', ''], // Mục tiêu
        prerequisites: ['', ''], // Yêu cầu điều kiện
    });

    // Hàm xử lý nhập liệu
    const handleInputChange = (section, index, value) => {
        const updatedSection = [...inputs[section]];
        updatedSection[index] = value;
        setInputs({ ...inputs, [section]: updatedSection });
    };

    // Hàm thêm ô input mới
    const handleAddInput = (section) => {
        if (inputs[section].every((input) => input.trim() !== '')) {
            setInputs({
                ...inputs,
                [section]: [...inputs[section], ''],
            });
        } else {
            setToast({ type: 'warning', message: 'Hãy nhập đầy đủ các ô hiện tại trước khi thêm ô mới!' });
        }
    };
    // Hàm xử lý lưu dữ liệu
    const handleSave = async () => {
        setLoading(true);
        try {
            const data = {
                targetAudiences: inputs.objectives.filter(item => item.trim() !== ''), // Loại bỏ các mục tiêu trống
                requirements: inputs.prerequisites.filter(item => item.trim() !== ''), // Loại bỏ các yêu cầu trống
            };
            await updateTargetRequirements(courseID, data);
            setToast({ type: 'success', message: 'Cập nhật thành công!' });

            // Cập nhật giao diện sau khi lưu thành công
            setInputs({
                objectives: data.targetAudiences,
                prerequisites: data.requirements,
            });
        } catch (error) {
            setToast({ type: 'error', message: `Đã có lỗi xảy ra! ${error}` });
        } finally {
            setLoading(false);
        }
    };

    // Tải dữ liệu khi component được mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const { targetAudiences, requirements } = await getTargetRequirements(courseID);
                setLoading(false);
                setInputs({
                    objectives: targetAudiences.length > 0 ? targetAudiences : ['', '', '', '', ''],
                    prerequisites: requirements.length > 0 ? requirements : ['', ''],
                });
            } catch (error) {
                setToast({ type: 'error', message: 'Lỗi khi tải dữ liệu!' });
                setLoading(false);
            }
        };
        loadData();
    }, [courseID]);


    return (
        <>
            {/* Hiển thị ToastMessage */}
            {toast && (
                <ToastMessage
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
            {loading ? (
                <div className={cx('container-1')}>
                    <div className={cx('spinner')}>
                        <Spinner message="Đợi một chút..." />
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <h2 className={cx('title')}>Học viên mục tiêu</h2>
                    <span className={cx('text-hd')}>
                        Các mô tả sau sẽ hiển thị công khai trên Trang tổng quan khóa học của bạn và sẽ tác động trực tiếp đến thành tích khóa học, đồng thời giúp học viên quyết định xem khóa học đó có phù hợp với họ hay không.
                    </span>

                    {/* Objectives Section */}
                    <div className={cx('section')}>
                        <h3 className={cx('section-title')}>Học viên sẽ học được gì trong khóa học của bạn?</h3>
                        <span className={cx('sub-title')}>Bạn phải nhập ít nhất 4 mục tiêu hoặc kết quả học tập mà học viên có thể mong đợi đạt được sau khi hoàn thành khóa học.</span>
                        {inputs.objectives.map((objective, index) => (
                            <div key={index} className={cx('input-container')}>
                                <input
                                    type="text"
                                    maxLength="160"
                                    value={objective}
                                    onChange={(e) => handleInputChange('objectives', index, e.target.value)}
                                    className={cx('input')}
                                    placeholder={`Ví dụ: Nhập mục tiêu học tập ${index + 1}`}
                                />
                                <span className={cx('char-counter')}>{160 - objective.length}</span>
                            </div>
                        ))}
                        <button className={cx('add-button')} onClick={() => handleAddInput('objectives')}>
                            + Thêm nội dung vào phần hồi của bạn
                        </button>
                    </div>

                    {/* Prerequisites Section */}
                    <div className={cx('section')}>
                        <h3 className={cx('section-title')}>Yêu cầu học điều kiện để tham gia khóa học của bạn là gì?</h3>
                        <span className={cx('sub-title')}>Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị mà học viên bắt buộc phải có trước khi tham gia khóa học. Nếu bạn không có yêu cầu nào, hãy tận dụng phần này và coi đây là cơ hội để bạn hạ thấp tiêu chuẩn cho người mới bắt đầu.</span>
                        {inputs.prerequisites.map((prerequisite, index) => (
                            <div key={index} className={cx('input-container')}>
                                <input
                                    type="text"
                                    maxLength="160"
                                    value={prerequisite}
                                    onChange={(e) => handleInputChange('prerequisites', index, e.target.value)}
                                    className={cx('input')}
                                    placeholder={`Ví dụ: Nhập yêu cầu ${index + 1}`}
                                />
                                <span className={cx('char-counter')}>{160 - prerequisite.length}</span>
                            </div>
                        ))}
                        <button className={cx('add-button')} onClick={() => handleAddInput('prerequisites')}>
                            + Thêm nội dung vào phần hồi của bạn
                        </button>
                    </div>

                    {/* Save Button */}
                    <button className={cx('save-button')} onClick={handleSave}>
                        Lưu
                    </button>
                </div>
            )}
        </>
    );
};

export default TargetAudience;
