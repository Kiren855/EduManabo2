import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileSettings.module.scss'; // Đường dẫn CSS

const cx = classNames.bind(styles);

const ProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('udemyProfile');
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
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
                        <form>
                            <div className={cx('form-group')}>
                                <label>Tên</label>
                                <input type="text" placeholder="Tên" />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Họ</label>
                                <input type="text" placeholder="Họ" />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Headline</label>
                                <input type="text" placeholder="Headline" />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Tiểu sử</label>
                                <textarea placeholder="Tiểu sử"></textarea>
                            </div>
                            <div className={cx('form-group')}>
                                <label>Ngôn ngữ</label>
                                <select>
                                    <option>Tiếng Việt</option>
                                    <option>English</option>
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <label>Trang web</label>
                                <input type="url" placeholder="URL" />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Twitter</label>
                                <input type="text" placeholder="Twitter URL" />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Facebook</label>
                                <input type="text" placeholder="Facebook URL" />
                            </div>
                            <div className={cx('form-group')}>
                                <label>LinkedIn</label>
                                <input type="text" placeholder="LinkedIn URL" />
                            </div>
                            <div className={cx('form-group')}>
                                <label>YouTube</label>
                                <input type="text" placeholder="YouTube URL" />
                            </div>
                            <button type="submit" className={cx('save-button')}>
                                Lưu
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
                        <button className={cx('save-button')}>Lưu</button>
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
    );
};

export default ProfileSettings;
