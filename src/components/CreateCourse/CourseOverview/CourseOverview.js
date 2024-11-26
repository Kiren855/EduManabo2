import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import style cho ReactQuill
import classNames from 'classnames/bind';
import { getCourseOverview, updateCourseOverview } from '~/services/createCourse/courseService';
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';
import styles from './CourseOverview.module.scss';

const cx = classNames.bind(styles);


const CourseOverview = () => {

    const courseID = useParams();
    const [courseData, setCourseData] = useState({
        title: '',
        subtitle: '',
        description: '',
        language: '',
        category: '',
        subcategory: '',
        courseImage: '', // Giả sử dữ liệu ảnh sẽ có từ API
        newCourseImage: null, // Dữ liệu ảnh mới
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Lấy thông tin tổng quan khóa học
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const data = await getCourseOverview(courseID); // API lấy dữ liệu
                setCourseData({
                    title: data.title,
                    subtitle: data.subTitle || '',
                    description: data.description || '',
                    language: data.language || '',
                    category: data.mainTopic || '',
                    subcategory: data.subTopic || '',
                    courseImage: data.image || '', // Hình ảnh khóa học từ server
                    newCourseImage: null,
                });
            } catch (err) {
                setError('Failed to load course data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseID]);

    // Hàm xử lý thay đổi input
    const handleInputChange = (field, value) => {
        setCourseData({ ...courseData, [field]: value });
    };

    // Hàm xử lý file upload
    const handleFileChange = (field, file) => {
        if (field === 'newCourseImage') {
            setCourseData({ ...courseData, newCourseImage: file });
        }
    };

    // Hàm lưu dữ liệu
    const handleSave = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', courseData.title);
            formData.append('subTitle', courseData.subtitle);
            formData.append('description', courseData.description);
            formData.append('language', courseData.language);
            formData.append('mainTopic', courseData.category);
            formData.append('subTopic', courseData.subcategory);
            if (courseData.newCourseImage) {
                formData.append('image', courseData.newCourseImage); // Chỉ upload ảnh nếu có thay đổi
            }

            await updateCourseOverview(courseID, formData); // Gọi API PUT để cập nhật dữ liệu
            ToastMessage('Cập nhật khóa học thành công');
        } catch (err) {
            setError('Lưu dữ liệu không thành công');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Trang tổng quan khóa học</h2>
            <p className={cx('description')}>
                Trang tổng quan khóa học của bạn rất quan trọng đối với thành công của bạn trên Edumanabo. Nếu được thực hiện đúng, trang này cũng có thể giúp bạn hiển thị trong các công cụ tìm kiếm như Google. Khi bạn hoàn thành phần này, hãy nghĩ đến việc tạo Trang tổng quan khóa học hấp dẫn thể hiện lý do ai đó muốn ghi danh khóa học của bạn. Tìm hiểu thêm về cách tạo trang tổng quan khóa học của bạn và các tiêu chuẩn tiêu đề khóa học.
            </p>

            {/* Tiêu đề khóa học */}
            <div className={cx('form-group')}>
                <label>Tiêu đề khóa học</label>
                <input
                    type="text"
                    maxLength="60"
                    value={courseData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={cx('input')}
                />
                <span className={cx('count')}>{60 - courseData.title.length}</span>
                <p className={cx('sub-title')}>Tiêu đề của bạn không những phải thu hút sự chú ý, chứa nhiều thông tin mà còn được tối ưu hóa để dễ tìm kiếm</p>
            </div>

            {/* Phụ đề khóa học */}
            <div className={cx('form-group')}>
                <label>Phụ đề khóa học</label>
                <input
                    type="text"
                    maxLength="120"
                    value={courseData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className={cx('input')}
                />
                <span className={cx('count')}>{120 - courseData.subtitle.length}</span>
                <p className={cx('sub-title')}>Sử dụng 1 hoặc 2 từ khóa có liên quan và đề cập đến 3-4 lĩnh vực quan trọng nhất mà bạn đã đề cập trong khóa học của bạn.</p>
            </div>

            {/* Mô tả khóa học */}
            <div className={cx('form-group')}>
                <label>Mô tả khóa học</label>
                <ReactQuill
                    value={courseData.description}
                    onChange={(value) => handleInputChange('description', value)}
                    className={cx('editor')}
                />
                <p className={cx('sub-title')}>Mô tả phải dài ít nhất là 200 từ.</p>
            </div>

            {/* Thông tin cơ bản */}
            <div className={cx('form-group')}>
                <label>Thông tin cơ bản</label>
                <select
                    value={courseData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className={cx('select')}
                >
                    <option value="">Chọn ngôn ngữ</option>
                    <option value="Tiếng Việt">Tiếng Việt</option>
                    <option value="English">English</option>
                </select>
                <select
                    value={courseData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={cx('select')}
                >
                    <option value="">Chọn danh mục</option>
                    <option value="Lập trình">Lập trình</option>
                    <option value="Kinh doanh">Kinh doanh</option>
                </select>
                <select
                    value={courseData.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                    className={cx('select')}
                >
                    <option value="">Chọn thể loại con</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                </select>
            </div>

            {/* Hình ảnh khóa học */}
            <div className={cx('form-group', 'image-section')}>
                <label>Hình ảnh khóa học</label>
                <div className={cx('image-preview')}>
                    {(courseData.newCourseImage || courseData.courseImage) ? (
                        // Nếu có ảnh (URL hoặc file), hiển thị ảnh
                        <>
                            <img
                                src={
                                    courseData.newCourseImage
                                        ? URL.createObjectURL(courseData.newCourseImage) // Preview ảnh mới
                                        : courseData.courseImage // URL ảnh cũ
                                }
                                alt="Hình ảnh khóa học"
                                className={cx('course-image')}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleFileChange('newCourseImage', e.target.files[0])
                                }
                                className={cx('file-input')}
                            />
                            <button
                                className={cx('change-button')}
                                onClick={() => document.querySelector(`.${cx('file-input')}`).click()}
                            >
                                Thay đổi
                            </button>
                        </>
                    ) : (
                        // Nếu chưa có ảnh, hiển thị nút tải file lên
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleFileChange('newCourseImage', e.target.files[0])
                                }
                                className={cx('file-input')}
                            />
                            <button
                                className={cx('upload-button')}
                                onClick={() => document.querySelector(`.${cx('file-input')}`).click()}
                            >
                                Tải file lên
                            </button>
                        </>
                    )}
                </div>
                <p className={cx('note')}>
                    Tải hình ảnh khóa học lên tại đây. Hướng dẫn quan trọng: 750x422 pixel; .jpg, .jpeg, .gif, hoặc .png.
                </p>
            </div>

            {/* Nút lưu */}
            <button className={cx('save-button')} onClick={handleSave}>
                Lưu
            </button>
        </div>
    );
};

export default CourseOverview;
