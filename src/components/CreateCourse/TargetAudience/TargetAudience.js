import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TargetAudience.module.scss';

const cx = classNames.bind(styles);

const TargetAudience = ({ data, onSave }) => {
    const [inputs, setInputs] = useState({
        objectives: data.objectives || ['', '', '', '', ''], // Mục tiêu
        prerequisites: data.prerequisites || ['', ''], // Yêu cầu điều kiện
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
            alert('Hãy nhập đầy đủ các ô hiện tại trước khi thêm ô mới!');
        }
    };

    // Hàm xử lý lưu dữ liệu
    const handleSave = () => {
        onSave(inputs); // Gọi hàm lưu từ component cha
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Học viên mục tiêu</h2>
            <span className={cx('text-hd')}>Các mô tả sau sẽ hiển thị công khai trên Trang tổng quan khóa học của bạn và sẽ tác động trực tiếp đến thành tích khóa học, đồng thời giúp học viên quyết định xem khóa học đó có phù hợp với họ hay không.</span>

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
                            onChange={(e) =>
                                handleInputChange('objectives', index, e.target.value)
                            }
                            className={cx('input')}
                            placeholder={`Ví dụ: Nhập mục tiêu học tập ${index + 1}`}
                        />
                        <span className={cx('char-counter')}>
                            {160 - objective.length}
                        </span>
                    </div>
                ))}
                <button
                    className={cx('add-button')}
                    onClick={() => handleAddInput('objectives')}
                >
                    + Thêm nội dung vào phần hồi của bạn
                </button>
            </div>

            {/* Prerequisites Section */}
            <div className={cx('section')}>
                <h3 className={cx('section-title')}>
                    Yêu cầu học điều kiện để tham gia khóa học của bạn là gì?
                </h3>
                <span className={cx('sub-title')}>Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị mà học viên bắt buộc phải có trước khi tham gia khóa học. Nếu bạn không có yêu cầu nào, hãy tận dụng phần này và coi đây là cơ hội để bạn hạ thấp tiêu chuẩn cho người mới bắt đầu.
                </span>
                {inputs.prerequisites.map((prerequisite, index) => (
                    <div key={index} className={cx('input-container')}>
                        <input
                            type="text"
                            maxLength="160"
                            value={prerequisite}
                            onChange={(e) =>
                                handleInputChange('prerequisites', index, e.target.value)
                            }
                            className={cx('input')}
                            placeholder={`Ví dụ: Nhập yêu cầu ${index + 1}`}
                        />
                        <span className={cx('char-counter')}>
                            {160 - prerequisite.length}
                        </span>
                    </div>
                ))}
                <button
                    className={cx('add-button')}
                    onClick={() => handleAddInput('prerequisites')}
                >
                    + Thêm nội dung vào phần hồi của bạn
                </button>
            </div>

            {/* Save Button */}
            <button className={cx('save-button')} onClick={handleSave}>
                Lưu
            </button>
        </div>
    );
};

export default TargetAudience;
