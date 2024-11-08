import React, { useState, useEffect } from 'react';
import classNames from "classnames/bind";
import styles from "./Comments.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThumbsUp,
    faThumbsDown
} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as like, faThumbsDown as unlike } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);


function Comments() {
    const [showModal, setShowModal] = useState(false);
    const [loadedComments, setLoadedComments] = useState(12);

    const comments = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        username: `User ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`, // Link ảnh đại diện ngẫu nhiên
        content: `Đây là bình luận ${i + 1}`,
        stars: Math.floor(Math.random() * 5) + 1,
        time: `${Math.floor(Math.random() * 24)} giờ trước`
    }));

    const ratings = {
        5: 67,
        4: 15,
        3: 10,
        2: 5,
        1: 3
    };

    const recentComments = comments.slice(0, 4);
    const displayedComments = comments.slice(0, loadedComments);

    const handleShowMoreComments = () => setLoadedComments((prev) => prev + 12);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setLoadedComments(12); // Reset số bình luận khi đóng modal
    };

    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    const handleClickOutsideModal = (e) => {
        if (e.target.classList.contains(cx('modal'))) {
            handleCloseModal();
        }
    };

    return (
        <div className={cx('comments-section')}>
            <h3>Bình luận gần đây</h3>
            <div className={cx('recent-comments')}>
                {recentComments.map((comment) => (
                    <div key={comment.id} className={cx('comment-item')}>
                        <img src={comment.avatar} alt={`${comment.username}'s avatar`} className={cx('avatar')} />
                        <div className={cx('comment-content')}>
                            <p><strong>{comment.username}</strong></p>
                            <div className={cx('stars-and-time')}>
                                <p>{'★'.repeat(comment.stars)}</p>
                                <p className={cx('comment-time')}>{comment.time}</p>
                            </div>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleOpenModal} className={cx('show-more-button')}>
                Hiển thị thêm bình luận
            </button>

            {showModal && (
                <div className={cx('modal')} onClick={handleClickOutsideModal}>
                    <div className={cx('modal-content')}>
                        <span className={cx('close-button')} onClick={handleCloseModal}>&times;</span>

                        <div className={cx('df')}>
                            <div className={cx('ratings')}>
                                <h4>Đánh giá</h4>
                                {Object.keys(ratings).reverse().map((star) => (
                                    <div key={star} className={cx('rating')}>
                                        <span>{star} sao</span>
                                        <div className={cx('rating-bar')}>
                                            <div
                                                className={cx('rating-fill')}
                                                style={{ width: `${ratings[star]}%` }}
                                            ></div>
                                        </div>
                                        <span>{ratings[star]}%</span>
                                    </div>
                                ))}
                            </div>

                            <div className={cx('modal-comments')}>
                                <h4>Bình luận người dùng</h4>
                                {displayedComments.map((comment) => (
                                    <div key={comment.id} className={cx('comment-item', 'resize')}>
                                        <img src={comment.avatar} alt={`${comment.username}'s avatar`} className={cx('avatar')} />
                                        <div className={cx('comment-content')}>
                                            <p><strong>{comment.username}</strong></p>
                                            <div className={cx('stars-and-time')}>
                                                <p>{'★'.repeat(comment.stars)}</p>
                                                <p className={cx('comment-time')}>{comment.time}</p>
                                            </div>
                                            <p>{comment.content}</p>
                                            <div className={cx('comment-actions')}>
                                                <button className={cx('like-button')}><FontAwesomeIcon icon={like} /></button>
                                                <button className={cx('dislike-button')}><FontAwesomeIcon icon={unlike} /></button>
                                                <button className={cx('report-button')}>Báo cáo</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {loadedComments < comments.length && (
                            <button onClick={handleShowMoreComments} className={cx('load-more-button')}>
                                Hiển thị thêm bình luận
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comments;