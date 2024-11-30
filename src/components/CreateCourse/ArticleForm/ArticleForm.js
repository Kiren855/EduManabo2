import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import style của react-quill
import classNames from 'classnames/bind';
import { createArticleLesson } from '~/services/createCourse/sectionsService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, useLocation } from 'react-router-dom';
import Spinner from '~/utils/Spinner';
import ToastMessage from '~/utils/ToastMessage';
import styles from './ArticleForm.module.scss'; // Giả sử bạn có một file CSS Module

const cx = classNames.bind(styles);

const ArticleForm = () => {
    const { sectionId } = useParams();
    const location = useLocation(); // Lấy thông tin của location, bao gồm query string
    const navigate = useNavigate();
    // Lấy query parameters từ location.search
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId'); // Lấy giá trị của courseId
    const [formData, setFormData] = useState({
        name: '',
        content: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null); // Quản lý thông báo

    // Xử lý thay đổi trường nhập liệu của ReactQuill
    const handleQuillChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    // Xử lý thay đổi tên bài viết
    const handleNameChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            name: e.target.value,
        }));
    };

    // Gửi dữ liệu lên API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!formData.name || !formData.content) {
            setToast({ type: 'warning', message: 'Vui lòng điền đầy đủ thông tin' });
            return;
        }

        try {
            await createArticleLesson(sectionId, formData); // Gọi hàm createArticleLesson đã có sẵn
            setFormData({
                name: '',
                content: '',
            }); // Reset form sau khi gửi thành công
            navigate(`/courses/edit/${courseId}`);
        } catch (error) {
            setToast({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoBack = () => {
        if (courseId) {
            navigate(`/courses/edit/${courseId}`);
        } else {
            navigate('/courses'); // Nếu không có courseId, điều hướng về trang courses mặc định
        }
    };

    if (isSubmitting) {
        return (
            <div className={cx('df')}>
                <Spinner message="Nhâm nhi cà phê trong khi chúng tôi thực hiện yêu cầu của bạn..." />
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
            <div className={cx('top-bar')}>
                <button className={cx('back-button')} onClick={handleGoBack}>
                    <span className={cx('icon')}><FontAwesomeIcon icon={faArrowLeft} /></span>
                    Quay lại khóa học
                </button>
            </div>
            <form onSubmit={handleSubmit} className={cx('form')}>
                <div className={cx('input-field')}>
                    <label>Tên:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="Nhập tên bài viết"
                        className={cx('input')}
                    />
                </div>

                <div className={cx('input-field')}>
                    <label>Nội dung bài viết:</label>
                    <ReactQuill
                        value={formData.content}
                        onChange={(value) => handleQuillChange('content', value)}
                        className={cx('quill-editor')}
                        placeholder="Nhập nội dung bài viết"
                    />
                </div>

                <button type="submit" className={cx('submit-button')} disabled={isSubmitting}>
                    {isSubmitting ? 'Đang gửi...' : 'Tạo bài viết'}
                </button>
            </form>
        </>
    );
};

export default ArticleForm;
