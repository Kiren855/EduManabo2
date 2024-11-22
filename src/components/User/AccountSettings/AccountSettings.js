import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AccountSettings.module.scss'; // CSS file

const cx = classNames.bind(styles);

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('accountSecurity');
    const [email, setEmail] = useState('buivancong03@gmail.com');
    const [password, setPassword] = useState('********');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const handleSaveEmail = () => {
        setIsEditingEmail(false);
        alert('Email đã được cập nhật!');
    };

    const handleSavePassword = () => {
        setIsEditingPassword(false);
        alert('Mật khẩu đã được cập nhật!');
    };

    return (
        <div className={cx('account-settings')}>
            <h3>Tài khoản</h3>
            <div className={cx('tabs')}>
                <button
                    className={cx('tab', { active: activeTab === 'accountSecurity' })}
                    onClick={() => setActiveTab('accountSecurity')}
                >
                    Bảo mật tài khoản
                </button>
                <button
                    className={cx('tab', { active: activeTab === 'notificationSettings' })}
                    onClick={() => setActiveTab('notificationSettings')}
                >
                    Cài đặt thông báo
                </button>
                <button
                    className={cx('tab', { active: activeTab === 'closeAccount' })}
                    onClick={() => setActiveTab('closeAccount')}
                >
                    Đóng tài khoản
                </button>
            </div>

            <div className={cx('tab-content')}>
                {activeTab === 'accountSecurity' && (
                    <div className={cx('account-security')}>
                        <div className={cx('form-group')}>
                            <label>Email:</label>
                            <div className={cx('input-wrapper')}>
                                {isEditingEmail ? (
                                    <>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <button className={cx('save-button')} onClick={handleSaveEmail}>
                                            Lưu
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input type="text" value={email} readOnly />
                                        <button
                                            className={cx('edit-button')}
                                            onClick={() => setIsEditingEmail(true)}
                                        >
                                            ✏️
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Mật khẩu:</label>
                            <div className={cx('input-wrapper')}>
                                {isEditingPassword ? (
                                    <>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button className={cx('save-button')} onClick={handleSavePassword}>
                                            Lưu
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input type="password" value={password} readOnly />
                                        <button
                                            className={cx('edit-button')}
                                            onClick={() => setIsEditingPassword(true)}
                                        >
                                            ✏️
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'notificationSettings' && (
                    <div className={cx('notification-settings')}>
                        <div className={cx('notification-group')}>
                            <h3>Là giảng viên, tôi muốn nhận:</h3>
                            <label>
                                <input type="checkbox" />
                                Các tài nguyên hữu ích và nội dung cập nhật quan trọng liên quan đến việc trở thành giảng viên trên Edumanabo.
                            </label>
                        </div>
                        <div className={cx('notification-group')}>
                            <h3>Là học viên, tôi muốn nhận:</h3>
                            <label>
                                <input type="checkbox" />
                                Quảng cáo, đề xuất khóa học và tài nguyên hữu ích từ Edumanabo.
                            </label>
                            <label>
                                <input type="checkbox" />
                                Thông báo từ giảng viên giảng dạy khóa học mà tôi ghi danh.
                            </label>
                            <label>
                                <input type="checkbox" />
                                Không gửi email quảng cáo cho tôi.
                            </label>
                        </div>
                        <button className={cx('save-button')}>Lưu</button>
                    </div>
                )}

                {activeTab === 'closeAccount' && (
                    <div className={cx('close-account')}>
                        <div className={cx('warning')}>
                            <p>
                                <strong>Cảnh báo:</strong> Nếu bạn đóng tài khoản của bạn, bạn sẽ bị hủy đăng ký khỏi tất cả 3 khóa học
                                và sẽ mất vĩnh viễn quyền truy cập vào tài khoản cũng như dữ liệu được liên kết với tài khoản của bạn,
                                ngay cả khi bạn chọn tạo tài khoản mới dùng cùng một địa chỉ email trong tương lai.
                            </p>
                            <p>
                                Xin lưu ý, nếu muốn khôi phục tài khoản của bạn sau khi gửi yêu cầu xóa, bạn sẽ có 14 ngày sau ngày gửi
                                ban đầu để liên hệ với <a href="mailto:privacy@Edumanabo.com">privacy@Edumanabo.com</a> để hủy yêu cầu này.
                            </p>
                            <p>
                                <strong>Thông tin giảng viên:</strong> Bạn là giảng viên có ít nhất một khóa học đã xuất bản hoặc dự thảo khóa học.
                            </p>
                            <p>
                                Xin lưu ý, chúng tôi sẽ không thể xóa bất kỳ khóa học nào có học viên ghi danh do được đảm bảo trọn đời
                                theo Điều khoản sử dụng của Edumanabo. Sau khi đóng tài khoản, các khóa học có học viên ghi danh sẽ được chuyển
                                sang một tài khoản giảng viên chung của Edumanabo để không xảy ra các lượt ghi danh mới và những học viên đã
                                ghi danh có thể tiếp tục truy cập khóa học.
                            </p>
                        </div>
                        <button className={cx('delete-button')}>Đóng tài khoản</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSettings;
