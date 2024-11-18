import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from "./QuizComponent.module.scss";

const cx = classNames.bind(styles);

const QuizComponent = ({ questions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleAnswerChange = (questionId, answerIndex, isMultiple) => {
        if (isMultiple) {
            setSelectedAnswers((prevSelectedAnswers) => {
                const currentAnswers = prevSelectedAnswers[questionId] || [];
                if (currentAnswers.includes(answerIndex)) {
                    return {
                        ...prevSelectedAnswers,
                        [questionId]: currentAnswers.filter((index) => index !== answerIndex),
                    };
                } else {
                    return {
                        ...prevSelectedAnswers,
                        [questionId]: [...currentAnswers, answerIndex],
                    };
                }
            });
        } else {
            setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
        }
    };

    return (
        <div className={cx('quiz-container')}>
            {questions.map((question, index) => (
                <div key={index} className={cx('question-container')}>
                    <h3 className={cx('question-text')}>{index + 1}. {question.text}</h3>
                    <div className={cx('answers-container', { 'multiple-answers': question.isMultiple, 'single-answer': !question.isMultiple })}>
                        {question.answers.map((answer, answerIndex) => (
                            <label key={answerIndex} className={cx('answer-option')}>
                                <input
                                    type={question.isMultiple ? 'checkbox' : 'radio'}
                                    name={`question-${index}`}
                                    value={answerIndex}
                                    checked={
                                        question.isMultiple
                                            ? selectedAnswers[question.id]?.includes(answerIndex)
                                            : selectedAnswers[question.id] === answerIndex
                                    }
                                    onChange={() => handleAnswerChange(question.id, answerIndex, question.isMultiple)}
                                />
                                <span className={cx('custom-checkbox')}></span>
                                {answer}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuizComponent;
