import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import style của react-quill
import classNames from 'classnames/bind';
import { getContentArticleLesson, updatedArticleLesson, updateNameLesson } from '~/services/createCourse/sectionsService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Spinner from '~/utils/Spinner';
import ToastMessage from '~/utils/ToastMessage';
import styles from './EditArticleForm.module.scss'; // Giả sử bạn có một file CSS Module

const cx = classNames.bind(styles);

const EditArticleForm = () => {
    const location = useLocation(); // Lấy thông tin của location, bao gồm query string
    const navigate = useNavigate();
    // Lấy query parameters từ location.search
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const searchParams = new URLSearchParams(location.search);
    const lessonId = searchParams.get('lessonId');
    const courseId = searchParams.get('courseId');
    const typeId = searchParams.get('typeId');
    const nameQuery = decodeURIComponent(searchParams.get('name'));
    const [isSubmitting, setIsSubmitting] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        content: '',
    });
    // Hàm gọi API và lấy nội dung bài viết
    useEffect(() => {
        const fetchArticleContent = async () => {
            try {
                const { content } = await getContentArticleLesson(typeId); // Gọi API
                setFormData({
                    name: nameQuery,  // Nếu có name từ API, update
                    content: content, // Nếu có content từ API, update
                });
            } catch (err) {
                setToast({ type: 'error', message: 'Có lỗi xảy ra khi lấy các giá trị cũ.' });
                console.log(err)
            } finally {
                setIsSubmitting(false);
            }
        };

        if (typeId) {
            fetchArticleContent(); // Gọi API nếu có typeId
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
            await updateNameLesson(lessonId, formData.name); // Gọi hàm createArticleLesson đã có sẵn
            await updatedArticleLesson(lessonId, formData.content); // Gọi hàm createArticleLesson đã có sẵn
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
                    Quay lại
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
                    {isSubmitting ? 'Đang gửi...' : 'Cập nhật bài viết'}
                </button>
            </form>
        </>
    );
};

export default EditArticleForm;
