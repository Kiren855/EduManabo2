import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import classNames from 'classnames/bind';
import styles from "./LectureForm.module.scss"

const cx = classNames.bind(styles)

const LectureForm = ({ data, onSave, onCancel }) => {
    const [title, setTitle] = useState(data?.title || '');
    const [lectureType, setLectureType] = useState(data?.type || 'video'); // "video" or "article"
    const [video, setVideo] = useState(data?.video || null);
    const [article, setArticle] = useState(data?.article || '');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setIsUploading(true); // Hiển thị trạng thái đang tải lên
                // API giả lập
                const formData = new FormData();
                formData.append('file', file);
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                setVideo(result.videoURL); // Cập nhật URL video từ API
            } catch (error) {
                console.error('Upload thất bại:', error);
            } finally {
                setIsUploading(false); // Kết thúc trạng thái tải lên
            }
        }
    };

    useEffect(() => {
        if (data) {
            setLectureType(data.video ? 'video' : 'article');
            setVideo(data.video || null);
            setArticle(data.article || '');
        }
    }, [data]);

    return (
        <div className={cx('form-container')}>
            <div className={cx('form')}>
                <h3>{data ? 'Chỉnh sửa bài giảng' : 'Thêm bài giảng'}</h3>
                <label>
                    Tiêu đề:
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề bài giảng"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Loại bài giảng:
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="lectureType"
                                value="video"
                                checked={lectureType === 'video'}
                                onChange={(e) => setLectureType(e.target.value)}
                            />
                            Video
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="lectureType"
                                value="article"
                                checked={lectureType === 'article'}
                                onChange={(e) => setLectureType(e.target.value)}
                            />
                            Bài viết
                        </label>
                    </div>
                </label>
                {lectureType === 'video' && (
                    <div>
                        <label>
                            Video bài giảng:
                            <input type="file" accept="video/*" onChange={handleFileUpload} />
                        </label>
                        {isUploading && <p>Đang tải video lên...</p>}
                        {video && (
                            <div>
                                <p>Video đã tải lên:</p>
                                <video src={video} controls width="100%"></video>
                            </div>
                        )}
                    </div>
                )}
                {lectureType === 'article' && (
                    <div>
                        <label>Bài viết:</label>
                        <ReactQuill value={article} onChange={setArticle} />
                    </div>
                )}
                <button
                    onClick={() =>
                        onSave({
                            title,
                            type: 'lecture',
                            video: lectureType === 'video' ? video : null,
                            article: lectureType === 'article' ? article : null,
                        })
                    }
                    disabled={lectureType === 'video' && isUploading}
                >
                    {data ? 'Lưu' : 'Thêm'}
                </button>
                <button onClick={onCancel}>Hủy</button>
            </div>
        </div>
    );
};

export default LectureForm;
