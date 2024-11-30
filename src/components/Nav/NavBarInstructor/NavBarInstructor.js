import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { submitCourse, getListCourses } from '~/services/createCourse/courseService';
import styles from './NavBarInstructor.module.scss';
import ToastMessage from '~/utils/ToastMessage';

const cx = classNames.bind(styles);

const NavBarInstructor = ({ onSelectSection }) => {
    const navigate = useNavigate();
    const { courseID } = useParams();
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [isDraft, setIsDraft] = useState(null); // Quản lý thông báo
    const sections = [
        { id: 'planLearn', name: 'Chương trình giảng dạy' },
        { id: 'target', name: 'Học viên mục tiêu' },
        { id: 'overview', name: 'Trang tổng quan khóa học' },
        { id: 'message', name: 'Tin nhắn khóa học' },
        { id: 'pricing', name: 'Định giá' },
        { id: 'settings', name: 'Cài đặt' },
    ];


    // Lấy danh sách khóa học
    const getListCourse = async () => {
        try {
            const courses = await getListCourses(); // Gọi API
            const course = courses.find(course => course.id === courseID);
            const isDraft = course ? course.isDraft : null;
            setIsDraft(isDraft);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khóa học:', error);
        }
    };

    useEffect(() => {
        getListCourse(); // Lấy danh sách khóa học khi component mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [selectedSection, setSelectedSection] = useState('planLearn'); // Mặc định chọn 'Học viên mục tiêu'

    const handleSelectSection = (id) => {
        setSelectedSection(id); // Cập nhật mục được chọn
        onSelectSection(id); // Gọi hàm từ props
    };

    // Xử lý khi nhấn nút "Gửi đi để xem xét"
    const handleSubmit = async () => {
        try {
            // Gọi hàm submitCourse để xuất bản khóa học
            await submitCourse(courseID);

            // Có thể redirect người dùng sang trang khác sau khi gửi thành công
            navigate('/user/profile/courses'); // Ví dụ: chuyển hướng đến trang quản lý khóa học hoặc trang khác
        } catch (error) {
            console.error('Lỗi khi gửi khóa học:', error);
            setToast({ type: 'error', message: `${error.response.data.message}` });
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
            <div className={cx('container')}>
                <div className={cx('nav-bar')}>
                    {sections.map((section) => (
                        <div key={section.id} className={cx('nav-item-container')}>
                            {selectedSection === section.id && <div className={cx('indicator')} />}
                            <button
                                className={cx('nav-item', {
                                    active: selectedSection === section.id,
                                })}
                                onClick={() => handleSelectSection(section.id)}
                            >
                                {section.name}
                            </button>
                        </div>
                    ))}
                </div>
                <button disabled={isDraft === false} className={cx('submit-button')} onClick={handleSubmit}>
                    Gửi đi để xem xét
                </button>
            </div>
        </>
    );
};

export default NavBarInstructor;