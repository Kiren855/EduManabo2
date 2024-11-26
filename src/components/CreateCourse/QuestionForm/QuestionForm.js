import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import classNames from 'classnames/bind';
import styles from './QuestionForm.module.scss'

const cx = classNames.bind(styles)

const QuestionForm = ({ data, onSave, onCancel }) => {
    const [question, setQuestion] = useState(data?.question || '');
    const [options, setOptions] = useState(data?.options || [{ optionText: '', isCorrect: false }]);
    const [isMultipleChoice, setIsMultipleChoice] = useState(data?.isMultipleChoice || false);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index].optionText = value;
        setOptions(updatedOptions);
    };

    const handleCorrectToggle = (index) => {
        const updatedOptions = [...options];
        if (isMultipleChoice) {
            updatedOptions[index].isCorrect = !updatedOptions[index].isCorrect;
        } else {
            updatedOptions.forEach((option, i) => {
                option.isCorrect = i === index;
            });
        }
        setOptions(updatedOptions);
    };

    const addOption = () => {
        setOptions([...options, { optionText: '', isCorrect: false }]);
    };

    return (
        <div className={cx('form-container')}>
            <div className={cx('form')}>
                <h3>{data ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}</h3>
                <label>
                    Loại câu hỏi:
                    <select
                        value={isMultipleChoice ? 'multiple' : 'single'}
                        onChange={(e) => setIsMultipleChoice(e.target.value === 'multiple')}
                    >
                        <option value="single">Một đáp án</option>
                        <option value="multiple">Nhiều đáp án</option>
                    </select>
                </label>
                <label>
                    Câu hỏi:
                    <ReactQuill value={question} onChange={setQuestion} />
                </label>
                <h4>Đáp án:</h4>
                {options.map((option, index) => (
                    <div key={index} className="option-item">
                        <ReactQuill
                            value={option.optionText}
                            onChange={(value) => handleOptionChange(index, value)}
                        />
                        <input
                            type={isMultipleChoice ? 'checkbox' : 'radio'}
                            checked={option.isCorrect}
                            onChange={() => handleCorrectToggle(index)}
                        />
                    </div>
                ))}
                <button onClick={addOption}>Thêm đáp án</button>
                <button onClick={() => onSave({ question, options, isMultipleChoice })}>
                    Lưu
                </button>
                <button onClick={onCancel}>Hủy</button>
            </div>
        </div>
    );
};

export default QuestionForm;
