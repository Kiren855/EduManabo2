import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CommentInput.module.scss"; // Giả sử bạn có CSS riêng

const CommentInput = ({
    userAvatar, // URL ảnh đại diện người dùng
    placeholder = "Nhập bình luận của bạn...",
    onSubmit,
    onCancel,
    showCancelButton = true,
    submitButtonText = "Gửi",
    cancelButtonText = "Thoát",
    avatarSize = "40px",
    maxCommentLength = 300,
}) => {
    const [comment, setComment] = useState("");

    const handleInputChange = (e) => {
        if (e.target.value.length <= maxCommentLength) {
            setComment(e.target.value);
        }
    };

    const handleSubmit = () => {
        if (comment.trim()) {
            onSubmit(comment);
            setComment("");
        }
    };

    const handleCancel = () => {
        setComment("");
        if (onCancel) onCancel();
    };

    return (
        <div className={styles.commentInputContainer}>
            <img
                src={userAvatar}
                alt="User Avatar"
                className={styles.avatar}
                style={{ width: avatarSize, height: avatarSize }}
            />
            <div className={styles.inputContainer}>
                <textarea
                    className={styles.commentBox}
                    placeholder={placeholder}
                    value={comment}
                    onChange={handleInputChange}
                />
                <div className={styles.actionButtons}>
                    <button className={styles.submitButton} onClick={handleSubmit}>
                        {submitButtonText}
                    </button>
                    {showCancelButton && (
                        <button className={styles.cancelButton} onClick={handleCancel}>
                            {cancelButtonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

CommentInput.propTypes = {
    userAvatar: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    showCancelButton: PropTypes.bool,
    submitButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    avatarSize: PropTypes.string,
    maxCommentLength: PropTypes.number,
};
// userAvatar: Đường dẫn URL đến ảnh đại diện của người dùng.
// placeholder: Văn bản gợi ý trong ô nhập bình luận.
// onSubmit: Hàm thực thi khi nhấn nút gửi, sẽ nhận giá trị của bình luận.
// onCancel: Hàm thực thi khi nhấn nút thoát (nếu có).
// showCancelButton: Quyết định xem có hiển thị nút thoát hay không.
// submitButtonText & cancelButtonText: Văn bản cho các nút.
// avatarSize: Kích thước ảnh đại diện, có thể được điều chỉnh cho phù hợp với giao diện.
// maxCommentLength: Giới hạn độ dài của bình luận.

export default CommentInput;
