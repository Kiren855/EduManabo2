import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuestionForm from '../QuestionForm';

import classNames from 'classnames/bind';
import styles from "./QuizForm.module.scss"

const cx = classNames.bind(styles)

const QuizForm = ({ data, partNumber, onSave, onCancel }) => {
    const [title, setTitle] = useState(data?.title || '');
    const [subTitle, setSubTitle] = useState(data?.subTitle || '');
    const [contents, setContents] = useState(data?.contents || []);
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

    // Thêm hoặc sửa câu hỏi
    const handleSaveQuestion = (question) => {
        const updatedContents = [...contents];
        if (editingQuestionIndex !== null) {
            // Sửa câu hỏi
            updatedContents[editingQuestionIndex] = question;
        } else {
            // Thêm câu hỏi mới
            updatedContents.push(question);
        }
        setContents(updatedContents);
        setIsAddingQuestion(false);
        setEditingQuestionIndex(null);
    };

    // Xóa câu hỏi
    const handleDeleteQuestion = (index) => {
        setContents(contents.filter((_, i) => i !== index));
    };

    return (
        <div className={cx('form-container')}>
            <div className={cx('form')}>
                <h3>{data ? 'Chỉnh sửa trắc nghiệm' : 'Thêm trắc nghiệm'}</h3>
                <label>
                    Tiêu đề:
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Mô tả:
                    <ReactQuill value={subTitle} onChange={setSubTitle} />
                </label>
                <h4>Các câu hỏi:</h4>
                <div className="questions-list">
                    {contents.map((content, index) => (
                        <div key={index} className="question-item">
                            <p>{content.question}</p>
                            <ul>
                                {content.options.map((option, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            fontWeight: option.isCorrect ? 'bold' : 'normal',
                                        }}
                                    >
                                        {option.optionText}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    setEditingQuestionIndex(index);
                                    setIsAddingQuestion(true);
                                }}
                            >
                                Sửa
                            </button>
                            <button onClick={() => handleDeleteQuestion(index)}>Xóa</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => setIsAddingQuestion(true)}>Thêm câu hỏi</button>
                <button
                    onClick={() =>
                        onSave({
                            partNumber,
                            title,
                            subTitle,
                            contents,
                        })
                    }
                >
                    Lưu
                </button>
                <button onClick={onCancel}>Hủy</button>
            </div>
            {isAddingQuestion && (
                <QuestionForm
                    data={
                        editingQuestionIndex !== null
                            ? contents[editingQuestionIndex]
                            : null
                    }
                    onSave={handleSaveQuestion}
                    onCancel={() => {
                        setIsAddingQuestion(false);
                        setEditingQuestionIndex(null);
                    }}
                />
            )}
        </div >
    );
};

export default QuizForm;
