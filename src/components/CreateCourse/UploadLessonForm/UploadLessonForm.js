import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { getDurationFromVideo, createVideoLesson } from '~/services/createCourse/sectionsService';
import styles from './UploadLessonForm.module.scss'; // Import CSS Module
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';

const cx = classNames.bind(styles);

const UploadLessonForm = () => {
    const { sectionId } = useParams();
    const location = useLocation(); // Lấy thông tin của location, bao gồm query string
    const navigate = useNavigate();

    // Lấy query parameters từ location.search
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId'); // Lấy giá trị của courseId
    const [name, setName] = useState('');
    const [duration, setDuration] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null); // Quản lý thông báo
    // Xử lý khi chọn video
    const handleVideoChange = async (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
        if (file) {
            try {
                const videoDuration = await getDurationFromVideo(file);
                setDuration(videoDuration);
            } catch (error) {
                console.error('Error calculating video duration:', error);
            }
        }
    };

    // Xử lý khi chọn thumbnail
    const handleThumbnailChange = (event) => {
        setThumbnailFile(event.target.files[0]);
    };

    // Xử lý gửi form
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !videoFile || !thumbnailFile) {
            setToast({ type: 'warning', message: 'Vui lòng điền đầy đủ thông tin!' });
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('duration', Math.round(duration));
        formData.append('videoFile', videoFile);
        formData.append('thumbnailFile', thumbnailFile);

        setIsSubmitting(true);

        try {
            await createVideoLesson(sectionId, formData);
            navigate(`/courses/edit/${courseId}`);
        } catch (error) {
            console.error('Error creating video lesson:', error);
            setToast({ type: 'error', message: 'Tải video lên thất bại!' });
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
                <Spinner message="Đang tải video..." />
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
            {/* Button để quay lại trang chỉnh sửa khóa học, cố định ở góc trái */}
            <div className={cx('top-bar')}>
                <button className={cx('back-button')} onClick={handleGoBack}>
                    <span className={cx('icon')}><FontAwesomeIcon icon={faArrowLeft} /></span>
                    Quay lại chương trình Học
                </button>
            </div>
            <form onSubmit={handleSubmit} className={cx('upload-form')}>
                <div className={cx('form-group')}>
                    <label htmlFor="name">Tên bài học</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên bài học"
                        className={cx('input-field')}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="video">Video</label>
                    <input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className={cx('input-field')}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className={cx('input-field')}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label>Thời lượng video</label>
                    <p>{duration ? `${Math.round(duration)} giây` : 'Chưa có file nào được chọn'}</p>
                </div>

                <button type="submit" className={cx('submit-button')} >
                    Tạo bài học
                </button>
            </form>
        </>
    );
};

export default UploadLessonForm;
