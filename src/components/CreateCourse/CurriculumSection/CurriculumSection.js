import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import LectureForm from '../LectureForm';
import Spinner from '~/utils/Spinner';
import ToastMessage from '~/utils/ToastMessage';
import QuizForm from '../QuizForm';
import { getFullSections } from '~/services/createCourse/sectionsService';

import styles from './CurriculumSection.module.scss';

const cx = classNames.bind(styles);

const CurriculumSection = () => {
    const { courseID } = useParams();
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null); // Quản lý thông báo

    const [sections, setSections] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingContentIndex, setEditingContentIndex] = useState(null); // Track which content is being edited
    const [sectionForm, setSectionForm] = useState({
        title: '',
        objective: '',
        content: [],
    });

    // Fetch dữ liệu giá khi component được mount
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const sectionsList = await getFullSections(courseID);
                setSections(sectionsList);
                console.log(sections)
            } catch (error) {
                setToast({ type: 'error', message: `Lấy dữ liệu thất bại! Vui lòng thử lại!${error}` });
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, [sections]);

    const [currentAction, setCurrentAction] = useState(null); // Action type: "lecture" or "quiz"

    // Open the form to add a new section
    const openForm = () => {
        setIsFormOpen(true);
        setIsEditing(false);
        setSectionForm({ title: '', objective: '', content: [] });
    };

    // Open the form to edit an existing section
    const openEditForm = (index) => {
        setIsFormOpen(true);
        setIsEditing(true);
        setEditingIndex(index);
        setSectionForm(sections[index]);
    };

    // Close the form
    const closeForm = () => {
        setIsFormOpen(false);
        setSectionForm({ title: '', objective: '' });
    };

    // Save the section (Add or Edit)
    const saveSection = () => {
        if (isEditing) {
            const updatedSections = [...sections];
            updatedSections[editingIndex] = sectionForm;
            setSections(updatedSections);
        } else {
            setSections([...sections, sectionForm]);
            console.log(sections)
        }
        closeForm();
    };

    // // Edit content (Lecture or Quiz)
    // const editContent = (content, index) => {
    //     const updatedSections = [...sections];
    //     updatedSections[editingIndex].content[index] = content;
    //     setSections(updatedSections);
    //     setCurrentAction(null);
    //     setEditingContentIndex(null);
    // };

    // Delete content
    const deleteContent = (index) => {
        const updatedSections = [...sections];
        updatedSections[editingIndex].content = updatedSections[editingIndex].content.filter(
            (_, i) => i !== index
        );
        setSections(updatedSections);
    };

    // // Add a lecture or quiz to the current section
    // const addContent = (content) => {
    //     const updatedSections = [...sections];
    //     updatedSections[editingIndex].content.push(content);
    //     setSections(updatedSections);
    // };

    // Delete a section
    const deleteSection = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
    };

    // Move section up
    const moveUp = (index) => {
        if (index > 0) {
            const updatedSections = [...sections];
            const temp = updatedSections[index - 1];
            updatedSections[index - 1] = updatedSections[index];
            updatedSections[index] = temp;
            setSections(updatedSections);
        }
    };

    // Move section down
    const moveDown = (index) => {
        if (index < sections.length - 1) {
            const updatedSections = [...sections];
            const temp = updatedSections[index + 1];
            updatedSections[index + 1] = updatedSections[index];
            updatedSections[index] = temp;
            setSections(updatedSections);
        }
    };

    // Move content up
    const moveContentUp = (contentIndex) => {
        if (contentIndex > 0) {
            const updatedSections = [...sections];
            const contentList = updatedSections[editingIndex].content;
            const temp = contentList[contentIndex - 1];
            contentList[contentIndex - 1] = contentList[contentIndex];
            contentList[contentIndex] = temp;
            setSections(updatedSections);
        }
    };

    // Move content down
    const moveContentDown = (contentIndex) => {
        const updatedSections = [...sections];
        const contentList = updatedSections[editingIndex].content;
        if (contentIndex < contentList.length - 1) {
            const temp = contentList[contentIndex + 1];
            contentList[contentIndex + 1] = contentList[contentIndex];
            contentList[contentIndex] = temp;
            setSections(updatedSections);
        }
    };

    // Add or Edit Quiz
    const handleSaveQuiz = (quiz) => {
        const updatedSections = [...sections];
        if (editingContentIndex !== null) {
            // Sửa Quiz
            updatedSections[editingIndex].content[editingContentIndex] = {
                ...quiz,
                type: 'quiz',
            };
        } else {
            // Thêm Quiz Mới
            updatedSections[editingIndex].content.push({ ...quiz, type: 'quiz' });
        }
        setSections(updatedSections);
        setCurrentAction(null);
        setEditingContentIndex(null);
    };

    // Delete Quiz
    const handleDeleteQuiz = (index) => {
        const updatedSections = [...sections];
        updatedSections[editingIndex].content = updatedSections[editingIndex].content.filter(
            (_, i) => i !== index
        );
        setSections(updatedSections);
    };

    if (loading) {
        return <Spinner message="Đang tải..." />;
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
            <div className={cx('curriculum-section')}>
                <button onClick={openForm} className={cx('add-section-button')}>
                    + Thêm phần
                </button>

                <div className={cx('sections')}>
                    {sections.map((section, index) => (
                        <div key={index} className={cx('section')}>
                            <div className={cx('section-header')}>
                                <span className={cx('section-title')}>
                                    Phần chưa xuất bản: <strong>{section.title}</strong>
                                </span>
                                <div className={cx('section-actions')}>
                                    <button
                                        onClick={() => openEditForm(index)}
                                        className={cx('edit-button')}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => deleteSection(index)}
                                        className={cx('delete-button')}
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        onClick={() => moveUp(index)}
                                        className={cx('move-button')}
                                        disabled={index === 0}
                                    >
                                        ↑ Lên
                                    </button>
                                    <button
                                        onClick={() => moveDown(index)}
                                        className={cx('move-button')}
                                        disabled={index === sections.length - 1}
                                    >
                                        ↓ Xuống
                                    </button>
                                </div>
                            </div>
                            <button
                                className={cx('add-item-button')}
                                onClick={() => setEditingIndex(index)}
                            >
                                + Mục trong khung chương trình
                            </button>
                            {editingIndex === index && (
                                <div className={cx('content-actions')}>
                                    <button
                                        onClick={() => {
                                            setCurrentAction('lecture');
                                            setEditingContentIndex(null);
                                        }}
                                        className={cx('content-button')}
                                    >
                                        + Bài giảng
                                    </button>
                                    {/* <button
                                    onClick={() => {
                                        setCurrentAction('add-quiz');
                                        setEditingContentIndex(null);
                                    }}
                                    className={cx('content-button')}
                                >
                                    + Trắc nghiệm
                                </button> */}
                                    <button
                                        onClick={() => {
                                            setEditingIndex(index);
                                            setCurrentAction('add-quiz');
                                        }}
                                        className={cx('content-button')}
                                    >
                                        + Trắc nghiệm
                                    </button>
                                </div>
                            )}
                            <div className={cx('content-list')}>
                                {section.content.map((item, idx) => (
                                    <div key={idx} className={cx('content-item')}>
                                        {item.type === 'lecture' ? (
                                            <div>
                                                <p>Bài giảng: {item.title}</p>
                                                {item.video && (
                                                    <div>
                                                        <video src={item.video} controls width="100%"></video>
                                                    </div>
                                                )}
                                                {item.article && (
                                                    <div dangerouslySetInnerHTML={{ __html: item.article }}></div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <p>Trắc nghiệm: {item.title}</p>
                                                <p>{item.subTitle}</p>
                                            </div>
                                        )}
                                        <div className={cx('content-actions')}>
                                            <button
                                                onClick={() => moveContentUp(idx)}
                                                className={cx('move-button')}
                                                disabled={idx === 0}
                                            >
                                                ↑ Lên
                                            </button>
                                            <button
                                                onClick={() => moveContentDown(idx)}
                                                className={cx('move-button')}
                                                disabled={idx === section.content.length - 1}
                                            >
                                                ↓ Xuống
                                            </button>
                                            {/* <button
                                            onClick={() => {
                                                setCurrentAction(item.type);
                                                setEditingContentIndex(idx);
                                            }}
                                            className={cx('edit-button')}
                                        >
                                            Sửa
                                        </button> */}
                                            {/* <button
                                            onClick={() => deleteContent(idx)}
                                            className={cx('delete-button')}
                                        >
                                            Xóa
                                        </button> */}
                                            <button
                                                onClick={() => {
                                                    setEditingContentIndex(idx);
                                                    setCurrentAction(item.type === 'lecture' ? 'edit-lecture' : 'edit-quiz');
                                                }}
                                                className={cx('edit-button')}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() =>
                                                    item.type === 'lecture' ? deleteContent(idx) : handleDeleteQuiz(idx)
                                                }
                                                className={cx('delete-button')}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section Form */}
                {isFormOpen && (
                    <div className={cx('form-container')}>
                        <div className={cx('form')}>
                            <h3>{isEditing ? 'Chỉnh sửa phần' : 'Thêm phần mới'}</h3>
                            <label>
                                Phần mới:
                                <input
                                    type="text"
                                    placeholder="Nhập tiêu đề"
                                    value={sectionForm.title}
                                    onChange={(e) =>
                                        setSectionForm({ ...sectionForm, title: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Học viên có thể làm những gì khi phần này kết thúc?
                                <textarea
                                    placeholder="Nhập mục tiêu học tập"
                                    value={sectionForm.objective}
                                    onChange={(e) =>
                                        setSectionForm({ ...sectionForm, objective: e.target.value })
                                    }
                                />
                            </label>
                            <div className={cx('form-actions')}>
                                <button onClick={closeForm} className={cx('cancel-button')}>
                                    Hủy
                                </button>
                                <button onClick={saveSection} className={cx('save-button')}>
                                    {isEditing ? 'Lưu' : 'Thêm phần'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {currentAction === 'lecture' && (
                    <LectureForm
                        data={
                            editingContentIndex !== null
                                ? sections[editingIndex].content[editingContentIndex]
                                : null
                        }
                        onSave={(data) => {
                            const updatedSections = [...sections];
                            if (editingContentIndex !== null) {
                                // Sửa bài giảng
                                updatedSections[editingIndex].content[editingContentIndex] = {
                                    ...data,
                                    type: data.type,
                                };
                            } else {
                                // Thêm bài giảng mới
                                updatedSections[editingIndex].content.push({ ...data });
                            }
                            setSections(updatedSections); // Cập nhật lại state
                            setCurrentAction(null); // Đóng form
                            setEditingContentIndex(null); // Reset trạng thái chỉnh sửa
                        }}
                        onCancel={() => setCurrentAction(null)}
                    />


                )}

                {currentAction === 'edit-lecture' && (
                    <LectureForm
                        data={
                            editingContentIndex !== null
                                ? sections[editingIndex].content[editingContentIndex]
                                : null
                        }
                        onSave={(data) => {
                            const updatedSections = [...sections];
                            if (editingContentIndex !== null) {
                                // Sửa bài giảng
                                updatedSections[editingIndex].content[editingContentIndex] = {
                                    ...data,
                                    type: 'lecture', // Đảm bảo type là "lecture"
                                };
                            }
                            setSections(updatedSections); // Cập nhật lại state
                            setCurrentAction(null); // Đóng form
                            setEditingContentIndex(null); // Reset trạng thái chỉnh sửa
                        }}
                        onCancel={() => {
                            setCurrentAction(null);
                            setEditingContentIndex(null);
                        }}
                    />
                )}

                {/* Hiển thị QuizForm */}
                {(currentAction === 'add-quiz' || currentAction === 'edit-quiz') && (
                    <QuizForm
                        data={
                            editingContentIndex !== null
                                ? sections[editingIndex].content[editingContentIndex]
                                : null
                        }
                        partNumber={editingIndex + 1} // Số thứ tự phần học
                        onSave={handleSaveQuiz}
                        onCancel={() => {
                            setCurrentAction(null);
                            setEditingContentIndex(null);
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default CurriculumSection;
