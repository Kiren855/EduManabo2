import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { getCourseMessages, updateCourseMessages } from '~/services/createCourse/courseService';
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';

import classNames from 'classnames/bind';
import styles from './CourseMessage.module.scss';

const cx = classNames.bind(styles);

const CourseMessage = () => {

    const { courseID } = useParams(); // Lấy courseID từ URL
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null); // Quản lý thông báo

    const [messages, setMessages] = useState({
        welcomeMessage: '', // Tin nhắn chào mừng
        congratulationMessage: '', // Tin nhắn chúc mừng
    });

    // Giả lập gọi API lấy dữ liệu từ server
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getCourseMessages(courseID);
                setLoading(false);
                setMessages({
                    welcomeMessage: data.result.welcome,
                    congratulationMessage: data.result.congratulation,
                });
            } catch (error) {
                setLoading(false);
                setToast({ type: 'error', message: 'Lấy dữ liệu thất bại!' });
            }
        };

        fetchMessages();
    }, [courseID]);

    // Hàm xử lý thay đổi tin nhắn
    const handleChangeMessage = (field, value) => {
        setMessages({ ...messages, [field]: value });
    };

    // Hàm xử lý lưu tin nhắn
    const handleSave = async () => {
        setLoading(true);
        const newMessages = {
            welcome: messages.welcomeMessage || null, // Nếu không có giá trị thì truyền null
            congratulation: messages.congratulationMessage || null, // Nếu không có giá trị thì truyền null
        };

        try {
            const data = await updateCourseMessages(courseID, newMessages);
            setLoading(false);
            if (data.code === 1000) {
                setToast({ type: 'success', message: 'Cập nhật thành công!' });
            }
        } catch (error) {
            setToast({ type: 'error', message: 'Cập nhật dữ liệu thất bại! Vui lòng thử lại!' });
            setLoading(false);
        }
    };

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
                <div className={cx('container')}>
                    <div className={cx('spinner')}>
                        <Spinner message="Đợi một chút..." />
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <h2 className={cx('title')}>Tin nhắn khóa học</h2>
                    <p className={cx('description')}>
                        Bạn có thể viết tin nhắn cho học viên (tùy chọn) để khuyến khích học viên tương tác với nội dung khóa học.
                        Tin nhắn này sẽ được tự động gửi đi khi họ tham gia hoặc hoàn thành khóa học. Nếu bạn không muốn gửi tin nhắn
                        chào mừng hoặc chúc mừng, hãy để trống hộp văn bản này.
                    </p>

                    {/* Tin nhắn chào mừng */}
                    <div className={cx('form-group')}>
                        <label>Tin nhắn chào mừng</label>
                        <ReactQuill
                            value={messages.welcomeMessage || ''} // Nếu là null thì hiển thị chuỗi trống
                            onChange={(value) => handleChangeMessage('welcomeMessage', value)}
                            className={cx('editor')}
                        />
                    </div>

                    {/* Tin nhắn chúc mừng */}
                    <div className={cx('form-group')}>
                        <label>Tin nhắn chúc mừng</label>
                        <ReactQuill
                            value={messages.congratulationMessage || ''} // Nếu là null thì hiển thị chuỗi trống
                            onChange={(value) =>
                                handleChangeMessage('congratulationMessage', value)
                            }
                            className={cx('editor')}
                        />
                    </div>

                    {/* Nút lưu */}
                    <button className={cx('save-button')} onClick={handleSave}>
                        Lưu
                    </button>
                </div>
            )}
        </>
    );
};

export default CourseMessage;
