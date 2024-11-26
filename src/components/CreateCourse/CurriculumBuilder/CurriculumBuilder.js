import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CurriculumBuilder.module.scss';

const cx = classNames.bind(styles);

const CurriculumBuilder = () => {
    const [sections, setSections] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [sectionForm, setSectionForm] = useState({
        title: '',
        objective: '',
    });

    // Open the form to add a new section
    const openAddSectionForm = () => {
        setIsEditing(false);
        setSectionForm({ title: '', objective: '' });
    };

    // Open the form to edit an existing section
    const openEditSectionForm = (index) => {
        setIsEditing(true);
        setEditingIndex(index);
        setSectionForm(sections[index]);
    };

    // Save the section (Add or Edit)
    const saveSection = () => {
        if (isEditing) {
            const updatedSections = [...sections];
            updatedSections[editingIndex] = sectionForm;
            setSections(updatedSections);
        } else {
            setSections([...sections, sectionForm]);
        }
        closeForm();
    };

    // Delete a section
    const deleteSection = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
    };

    // Close the form
    const closeForm = () => {
        setEditingIndex(null);
        setSectionForm({ title: '', objective: '' });
    };

    return (
        <div className={cx('curriculum-builder')}>
            <button onClick={openAddSectionForm} className={cx('add-section-button')}>
                + Phần
            </button>

            <div className={cx('sections')}>
                {sections.map((section, index) => (
                    <div key={index} className={cx('section')}>
                        <div className={cx('section-header')}>
                            <span className={cx('section-title')}>
                                {`Phần chưa xuất bản: `}
                                <strong>{section.title}</strong>
                            </span>
                            <div className={cx('section-actions')}>
                                <button
                                    onClick={() => openEditSectionForm(index)}
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
                            </div>
                        </div>
                        <div className={cx('section-content')}>
                            <p>{section.objective}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Section Form */}
            {sectionForm && (
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
        </div>
    );
};

export default CurriculumBuilder;
