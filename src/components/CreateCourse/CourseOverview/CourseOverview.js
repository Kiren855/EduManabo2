import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import style cho ReactQuill
import classNames from 'classnames/bind';
import { getCourseOverview, updateCourseOverview } from '~/services/createCourse/courseService';
import { getCategories } from '~/services/createCourse/topicsService';
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';
import styles from './CourseOverview.module.scss';

const cx = classNames.bind(styles);


const CourseOverview = () => {

    const { courseID } = useParams();
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
    //test
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(courseData.category || '');
    const [selectedSubcategory, setSelectedSubcategory] = useState(courseData.subcategory || '');
    const [subcategories, setSubcategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null); // Quản lý thông báo


    useEffect(() => {
        // Gọi API lấy danh mục
        const fetchCategories = async () => {
            try {
                const response = await getCategories(); // Gọi hàm lấy danh mục
                setCategories(response || []); // Lưu vào state categories
            } catch (error) {
                setToast({ type: 'error', message: 'Lấy danh mục thất bại!' });
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        // Cập nhật danh sách thể loại con khi chọn danh mục cha
        const category = categories.find(c => c.id === selectedCategory);
        setSubcategories(category ? category.subtopics : []); // Cập nhật danh sách thể loại con
    }, [selectedCategory, categories]);

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
                setToast({ type: 'error', message: 'Lấy thông tin khóa học thất bại!' });
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setToast({ type: 'success', message: 'Cập nhật thông tin thành công!' });
        } catch (err) {
            setToast({ type: 'error', message: `Lưu dữ liệu không thành công: ${err}` });
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <Spinner message="Đợi một chút..." />; // Hiển thị Spinner khi đang tải
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

                    {/* Chọn ngôn ngữ */}
                    <select
                        value={courseData.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className={cx('select')}
                    >
                        <option value="">Chọn ngôn ngữ</option>
                        <option value="Tiếng Việt">Tiếng Việt</option>
                        <option value="English">English</option>
                    </select>

                    {/* Chọn danh mục cha */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            const categoryId = e.target.value;
                            setSelectedCategory(categoryId); // Cập nhật danh mục cha đã chọn
                            setSelectedSubcategory(''); // Reset thể loại con khi thay đổi danh mục cha
                            handleInputChange('category', categoryId); // Cập nhật vào courseData
                        }}
                        className={cx('select')}
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name} {/* Hiển thị tên danh mục */}
                            </option>
                        ))}
                    </select>

                    {/* Chọn thể loại con */}
                    <select
                        value={selectedSubcategory}
                        onChange={(e) => {
                            const subcategoryId = e.target.value;
                            setSelectedSubcategory(subcategoryId); // Cập nhật thể loại con đã chọn
                            handleInputChange('subcategory', subcategoryId); // Cập nhật vào courseData
                        }}
                        className={cx('select')}
                        disabled={!selectedCategory} // Disabled nếu chưa chọn danh mục cha
                    >
                        <option value="">Chọn thể loại con</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name} {/* Hiển thị tên thể loại con */}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Hình ảnh khóa học */}
                <div className={cx('form-group', 'image-section')}>
                    <label>Hình ảnh khóa học</label>
                    <div className={cx('image-preview')}>
                        {/* Kiểm tra nếu có ảnh cũ, hiển thị ảnh cũ nếu có */}
                        {courseData.courseImage && !courseData.newCourseImage && (
                            <img
                                src={courseData.courseImage}
                                alt="Hình ảnh khóa học"
                                className={cx('course-image')}
                            />
                        )}

                        {/* Luôn luôn hiển thị nút tải ảnh lên */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handleFileChange('newCourseImage', e.target.files[0])
                            }
                            className={cx('file-input')}
                            style={{ display: 'none' }}
                        />
                        <button
                            className={cx('upload-button')}
                            onClick={() => document.querySelector(`.${cx('file-input')}`).click()}
                        >
                            Tải file lên
                        </button>

                        {/* Nếu có ảnh mới, hiển thị ảnh mới */}
                        {courseData.newCourseImage && (
                            <img
                                src={URL.createObjectURL(courseData.newCourseImage)} // Preview ảnh mới
                                alt="Hình ảnh khóa học"
                                className={cx('course-image')}
                            />
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
        </>
    );
};

export default CourseOverview;
