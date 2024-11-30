import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Spinner from '~/utils/Spinner';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '~/utils/ToastMessage';
import { deleteCourse } from '~/services/createCourse/courseService';
import styles from './Settings.module.scss';

const cx = classNames.bind(styles);

const Settings = () => {
    const navigate = useNavigate();
    const { courseID } = useParams();
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
    const [toast, setToast] = useState(null); // Quản lý thông báo

    // Gửi dữ liệu lên API
    const handleDeleteCourse = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await deleteCourse(courseID); // Gọi hàm createExamLesson đã có sẵn
            navigate(`/user/profile/courses`);
        } catch (error) {
            setToast({ type: 'error', message: `${error.response.data.message}` });
            console.error('Error:', error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className={cx('df')}>
                <Spinner message="Đợi một chút..." />
            </div>
        );
    }
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
            <div className={cx('container')}>
                <h2 className={cx('title')}>Cài đặt</h2>
                <div className={cx('divider')} />

                {/* Trạng thái khóa học */}
                <div className={cx('section')}>
                    <h3>Trạng thái khóa học</h3>
                    <div className={cx('div-button')}>
                        <button className={cx('status-button')}>Hủy xuất bản</button>
                        <span>Học viên mới không thể tìm thấy khóa học của bạn thông qua tính năng tìm kiếm. Tuy nhiên, các học viên hiện tại vẫn có thể truy cập vào nội dung khóa học.</span>
                    </div>
                    <div className={cx('div-button')}>
                        <button onClick={handleDeleteCourse} className={cx('delete-button')}>Xóa</button>
                        <span>Chúng tôi cam kết học viên có quyền truy cập suốt đời. Vì vậy, bạn không thể xóa khóa học sau khi học viên đã ghi danh.</span>
                    </div>
                </div>

                <div className={cx('divider')} />
            </div>
        </>
    );
};

export default Settings;
