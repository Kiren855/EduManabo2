import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileSettings.module.scss'; // Đường dẫn CSS
import { updateProfile } from '~/services/auth/userService';
import ToastMessage from '~/utils/ToastMessage';

const cx = classNames.bind(styles);

const ProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('udemyProfile');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');

    // Hàm xử lý thay đổi input
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleBioChange = (event) => setBio(event.target.value);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Hiển thị preview
                setImageFile(file); // Lưu ảnh để gửi lên server
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveImage = async () => {
        if (imageFile) {
            const formData = new FormData();
            formData.append('avatar', imageFile); // Gửi ảnh lên server

            try {
                await updateProfile(formData);
                setToast({ type: 'success', message: 'Cập nhật ảnh thành công!' });
            } catch (error) {
                setToast({ type: 'error', message: `${error.response.FormData.message}` });
                console.error('Lỗi khi upload ảnh hồ sơ:', error);
            }
        } else {
            setToast({ type: 'warning', message: 'Vui lòng chọn ảnh trước khi lưu!' });
        }
    };

    // Hàm xử lý khi nhấn nút "Lưu"
    const handleSaveProfile = async (event) => {
        event.preventDefault();
        if (!firstName || !lastName || !bio) {
            setToast({ type: 'warning', message: 'Vui lòng điền đủ thông tin!' });
            return;
        }
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('introduce', bio);

        try {
            await updateProfile(formData); // URL API cần được thay thế theo API thực tế
            setToast({ type: 'success', message: 'Cập nhật thông tin thành công!' });
        } catch (error) {
            setToast({ type: 'error', message: `${error.response.FormData.message}` });

        }
    };

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
            <div className={cx('profile-settings')}>
                <h3>Hồ sơ & cài đặt</h3>
                <div className={cx('tabs')}>
                    <button
                        className={cx('tab', { active: activeTab === 'udemyProfile' })}
                        onClick={() => setActiveTab('udemyProfile')}
                    >
                        Hồ sơ Edumanabo
                    </button>
                    <button
                        className={cx('tab', { active: activeTab === 'profileImage' })}
                        onClick={() => setActiveTab('profileImage')}
                    >
                        Ảnh hồ sơ
                    </button>
                    <button
                        className={cx('tab', { active: activeTab === 'securitySettings' })}
                        onClick={() => setActiveTab('securitySettings')}
                    >
                        Cài đặt bảo mật
                    </button>
                </div>

                <div className={cx('tab-content')}>
                    {activeTab === 'udemyProfile' && (
                        <div className={cx('udemy-profile')}>
                            <form onSubmit={handleSaveProfile}>
                                <div className={cx('form-group')}>
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        placeholder="Tên"
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label>Họ</label>
                                    <input
                                        type="text"
                                        placeholder="Họ"
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label>Giới thiệu</label>
                                    <input
                                        type="text"
                                        placeholder="Giới thiệu"
                                        value={bio}
                                        onChange={handleBioChange}
                                    />
                                </div>
                                <button type="submit" className={cx('save-button')}>
                                    {'Lưu'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'profileImage' && (
                        <div className={cx('profile-image')}>
                            <div className={cx('image-preview')}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className={cx('preview')} />
                                ) : (
                                    <div className={cx('placeholder')}>Chưa chọn ảnh</div>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className={cx('upload-input')}
                            />
                            <button className={cx('save-button')} onClick={handleSaveImage}>
                                Lưu
                            </button>
                        </div>
                    )}

                    {activeTab === 'securitySettings' && (
                        <div className={cx('security-settings')}>
                            <div className={cx('form-group')}>
                                <input type="checkbox" id="show-profile" />
                                <label htmlFor="show-profile">
                                    Hiển thị hồ sơ của bạn cho người dùng đã đăng nhập
                                </label>
                            </div>
                            <div className={cx('form-group')}>
                                <input type="checkbox" id="show-courses" />
                                <label htmlFor="show-courses">
                                    Hiển thị các khóa học bạn tham gia trên trang hồ sơ của bạn
                                </label>
                            </div>
                            <button className={cx('save-button')}>Lưu</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;
