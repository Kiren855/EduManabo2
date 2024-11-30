import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Import style của react-quill
import classNames from 'classnames/bind';
import Spinner from '~/utils/Spinner';
import ToastMessage from '~/utils/ToastMessage';
import { getExamLessonById, updateExamLesson } from '~/services/createCourse/sectionsService';
import styles from './EditExamForm.module.scss'; // Giả sử bạn có một file CSS Module

const cx = classNames.bind(styles);

const EditExamForm = () => {
    const location = useLocation(); // Lấy thông tin của location, bao gồm query string
    const navigate = useNavigate();
    // Lấy query parameters từ location.search
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId'); // Lấy giá trị của courseId
    // const { sectionId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const typeId = searchParams.get('typeId');
    const lessonId = searchParams.get('lessonId');
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        subTitle: '',
        contents: [
            {
                question: '',
                options: [{ optionText: '', isCorrect: false }],
            },
        ],
    });

    useEffect(() => {
        const fetchExamContent = async () => {
            try {
                const { title, subTitle, contents } = await getExamLessonById(typeId); // Gọi API
                setFormData({
                    name: decodeURIComponent(searchParams.get('name')), // Giữ lại name từ query string
                    title: title || '', // Nếu không có title thì gán giá trị mặc định là ''
                    subTitle: subTitle || '', // Tương tự với subTitle
                    contents: contents || [
                        { question: '', options: [{ optionText: '', isCorrect: false }] },
                    ], // Nếu không có contents thì gán giá trị mặc định
                });
            } catch (err) {
                setToast({ type: 'error', message: 'Có lỗi xảy ra khi lấy các giá trị cũ.' });
                console.log(err)
            } finally {
                setIsSubmitting(false);
            }
        };

        if (typeId) {
            fetchExamContent(); // Gọi API nếu có typeId
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Xử lý thay đổi dữ liệu cho các trường nhập liệu Quill
    const handleQuillChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    // Xử lý thay đổi câu hỏi
    const handleQuestionChange = (index, value) => {
        const updatedContents = [...formData.contents];
        updatedContents[index].question = value;
        setFormData(prevState => ({
            ...prevState,
            contents: updatedContents,
        }));
    };

    // Xử lý thay đổi đáp án
    const handleOptionChange = (questionIndex, optionIndex, field, value) => {
        const updatedContents = [...formData.contents];
        updatedContents[questionIndex].options[optionIndex][field] = value;
        setFormData(prevState => ({
            ...prevState,
            contents: updatedContents,
        }));
    };

    // Xử lý chọn đáp án đúng (cho phép chọn nhiều đáp án đúng)
    const handleSelectCorrectAnswer = (questionIndex, optionIndex) => {
        const updatedContents = [...formData.contents];
        const option = updatedContents[questionIndex].options[optionIndex];
        option.isCorrect = !option.isCorrect; // Toggle isCorrect khi click vào đáp án
        setFormData(prevState => ({
            ...prevState,
            contents: updatedContents,
        }));
    };

    // Thêm câu hỏi mới
    const addQuestion = () => {
        setFormData(prevState => ({
            ...prevState,
            contents: [
                ...prevState.contents,
                { question: '', options: [{ optionText: '', isCorrect: false }] },
            ],
        }));
    };

    // Thêm đáp án cho câu hỏi
    const addOption = (questionIndex) => {
        const updatedContents = [...formData.contents];
        updatedContents[questionIndex].options.push({ optionText: '', isCorrect: false });
        setFormData(prevState => ({
            ...prevState,
            contents: updatedContents,
        }));
    };

    // Gửi dữ liệu lên API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await updateExamLesson(lessonId, formData); // Gọi hàm createExamLesson đã có sẵn
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
                {/* Các trường nhập liệu Quill */}
                <div className={cx('input-field')}>
                    <label>Tiêu đề:</label>
                    <ReactQuill value={formData.title} onChange={(value) => handleQuillChange('title', value)} />
                </div>
                <div className={cx('input-field')}>
                    <label>Phụ đề:</label>
                    <ReactQuill value={formData.subTitle} onChange={(value) => handleQuillChange('subTitle', value)} />
                </div>
                <div className={cx('input-field')}>
                    <label>Tên:</label>
                    <ReactQuill value={formData.name} onChange={(value) => handleQuillChange('name', value)} />
                </div>

                {/* Các câu hỏi */}
                {formData.contents.map((content, questionIndex) => (
                    <div key={questionIndex} className={cx('question')}>
                        <div className={cx('question-field')}>
                            <label>Câu hỏi {questionIndex + 1}:</label>
                            <ReactQuill
                                value={content.question}
                                onChange={(value) => handleQuestionChange(questionIndex, value)}
                            />
                        </div>

                        {/* Các đáp án */}
                        {content.options.map((option, optionIndex) => (
                            <div key={optionIndex} className={cx('option')}>
                                <label>Đáp án {optionIndex + 1}:</label>
                                <ReactQuill
                                    value={option.optionText}
                                    onChange={(value) =>
                                        handleOptionChange(questionIndex, optionIndex, 'optionText', value)
                                    }
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={option.isCorrect}
                                        onChange={() => handleSelectCorrectAnswer(questionIndex, optionIndex)}
                                        className={cx('is-correct')}
                                    />
                                    Là đáp án đúng
                                </label>
                            </div>
                        ))}

                        {/* Thêm đáp án */}
                        <button type="button" onClick={() => addOption(questionIndex)} className={cx('add-option-button')}>
                            Thêm đáp án
                        </button>
                    </div>
                ))}

                {/* Thêm câu hỏi */}
                <button type="button" onClick={addQuestion} className={cx('add-question-button')}>
                    Thêm câu hỏi
                </button>

                {/* Nút Submit */}
                <button type="submit" disabled={isSubmitting} className={cx('submit-button')}>
                    {isSubmitting ? 'Đang tạo...' : 'Cập nhật bài trắc nghiệm'}
                </button>
            </form>
        </>
    );
};

export default EditExamForm;
