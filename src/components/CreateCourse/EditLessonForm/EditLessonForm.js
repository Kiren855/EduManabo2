import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { getDurationFromVideo, updateVideoLesson, getVideoLessonByTypeId, updateNameLesson } from '~/services/createCourse/sectionsService';
import styles from './EditLessonForm.module.scss'; // Import CSS Module
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';

const cx = classNames.bind(styles);

const EditLessonForm = () => {
    const { sectionId } = useParams();
    const location = useLocation(); // Lấy thông tin của location, bao gồm query string
    const navigate = useNavigate();

    // Lấy query parameters từ location.search
    const [isSubmitting, setIsSubmitting] = useState(true);
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId'); // Lấy giá trị của courseId
    const typeId = searchParams.get('typeId');
    const lessonId = searchParams.get('lessonId');
    const [name, setName] = useState(decodeURIComponent(searchParams.get('name')));
    const [duration, setDuration] = useState(0);
    const [durationOld, setDurationOld] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const [videoFileOld, setVideoFileOld] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailFileOld, setThumbnailFileOld] = useState('');
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [previewUrl, setPreviewUrl] = useState(null); // State để lưu URL của ảnh xem trước
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);

    useEffect(() => {
        const fetchVideoContent = async () => {
            try {
                const { videoUrl, thumbnailUrl, duration } = await getVideoLessonByTypeId(typeId); // Gọi API
                setVideoFileOld(videoUrl);
                setThumbnailFileOld(thumbnailUrl);
                setDurationOld(duration);
                setToast({ type: 'success', message: 'Lấy dữ liệu thành công!' });
            } catch (err) {
                setToast({ type: 'error', message: 'Có lỗi xảy ra khi lấy các giá trị cũ.' });
                console.log(err)
            } finally {
                setIsSubmitting(false);
            }
        };

        if (typeId) {
            fetchVideoContent(); // Gọi API nếu có typeId
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Xử lý khi chọn video
    const handleVideoChange = async (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
        setVideoFileOld('');
        if (file) {
            try {
                const videoDuration = await getDurationFromVideo(file);
                setDuration(videoDuration);
                if (videoPreviewUrl) {
                    URL.revokeObjectURL(videoPreviewUrl);
                }
                setVideoPreviewUrl(URL.createObjectURL(file));
            } catch (error) {
                console.error('Error calculating video duration:', error);
            }
        }
    };

    // Xử lý khi chọn thumbnail
    const handleThumbnailChange = (event) => {
        setThumbnailFile(event.target.files[0]);
        setThumbnailFileOld('');
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    };

    // Xử lý gửi form
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name && !videoFile && !thumbnailFile) {
            setIsSubmitting(true);
            try {
                await updateNameLesson(lessonId, name); // Gọi hàm createArticleLesson đã có sẵn
                navigate(`/courses/edit/${courseId}`);
            } catch (error) {
                setToast({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
                console.error('Error:', error);
            } finally {
                setIsSubmitting(false);
            }
        } else if ((videoFile || thumbnailFile) && name && videoFile && thumbnailFile) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('duration', Math.round(duration));
            formData.append('videoFile', videoFile);
            formData.append('thumbnailFile', thumbnailFile);

            setIsSubmitting(true);

            try {
                await updateVideoLesson(sectionId, lessonId, formData);
                navigate(`/courses/edit/${courseId}`);
            } catch (error) {
                console.error('Error creating video lesson:', error);
                setToast({ type: 'error', message: 'Tải video lên thất bại!' });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setToast({ type: 'warning', message: 'Vui lòng điền đầy đủ thông tin! Thiếu ảnh hoặc video!' });
            return;
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
                    Quay lại
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
                    {videoFileOld && videoFileOld.trim() !== '' && (
                        <>
                            <video className={cx('video-player')} controls>
                                <source src={videoFileOld} type="video/mp4" />
                                Trình duyệt của bạn không hỗ trợ thẻ video.
                            </video>
                            <div className={cx('form-group')}>
                                <label>Thời lượng video cũ:</label>
                                <p>{durationOld ? `${Math.round(durationOld)} giây` : 'Video không có thời lượng.'}</p>
                            </div>
                        </>
                    )}
                    {videoPreviewUrl && (
                        <div className={cx('preview-container')}>
                            <video className={cx('preview-video')} controls>
                                <source src={videoPreviewUrl} type="video/mp4" />
                                Trình duyệt của bạn không hỗ trợ thẻ video.
                            </video>
                        </div>
                    )}

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
                    {thumbnailFileOld && thumbnailFileOld.trim() !== '' && (
                        <img
                            className={cx('thumbnail-image')}
                            src={thumbnailFileOld}
                            alt="Thumbnail"
                        />
                    )}
                    {/* Hiển thị ảnh xem trước nếu có */}
                    {previewUrl && (
                        <div className={cx('preview-container')}>
                            <img src={previewUrl} alt="Preview" className={cx('preview-image')} />
                        </div>
                    )}
                    <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className={cx('input-field')}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label>Thời lượng video mới:</label>
                    <p>{duration ? `${Math.round(duration)} giây` : 'Chưa có file nào được chọn'}</p>
                </div>

                <button type="submit" className={cx('submit-button')} >
                    Cập nhật bài giảng
                </button>
            </form>
        </>
    );
};

export default EditLessonForm;
