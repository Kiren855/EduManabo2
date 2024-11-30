import { Link } from "react-router-dom";
import { getProfile } from "~/services/auth/userService";
import css from "./InstructorNavbar.module.scss";

import images from "~/assets/images";
import { useState, useEffect } from "react";

const InstructorNavbar = () => {
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const { avatar, email, firstName, lastName, } = await getProfile();
                setAvatar(avatar);
                setEmail(email);
                setFullName(`${firstName} ${lastName}`)
            } catch (error) {
                console.log(error.response.data.message)
            }
        };

        fetchPrice();
    }, []);

    return (
        <div className={css.navbar}>
            <div className={css.right}>
                <Link className={css.hovBox} to="/">
                    Học viên
                </Link>
                <div className={css.notiBox}>
                    <img
                        className={css.notiIcon}
                        src={images.notificationIcon}
                        alt="notification icon"
                    />
                </div>
                <div className={css.profile}>
                    <img alt="HTT" src={avatar} className={css.profileIcon} />
                    <div className={css.menuBox}>
                        <div className={css.innerMenuBox}>
                            <div className={css.prflDiv}>
                                <Link to="/user/profile/settings" className={css.user}>
                                    <div className={css.leftUserDiv}>
                                        <img
                                            src={avatar}
                                            alt="user profile"
                                            className={css.userProfileImg}
                                        />
                                    </div>
                                    <div className={css.rightUserDiv}>
                                        <div className={css.uname}>{fullName}</div>
                                        <div className={css.email}>{email}</div>
                                    </div>
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/" className={css.menuItem}>
                                    Học viên
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/" className={css.menuItem}>
                                    Thông báo
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/user/profile/account" className={css.menuItem}>
                                    Cài đặt tài khoản
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/profile/public" className={css.menuItem}>
                                    Hồ sơ công khai
                                </Link>
                                <Link
                                    to="/user/profile/settings"
                                    className={css.menuItem}
                                >
                                    Chỉnh sửa hồ sơ
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/help" className={css.menuItem}>
                                    Trợ giúp và hỗ trợ
                                </Link>
                                <Link to="/logout" className={css.menuItem}>
                                    Đăng xuất
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <div className={css.menuItem2}>
                                    <span>
                                        <div className={css.menuItemTxt1}>Edumanabo Bussiness</div>
                                        <div className={css.menuItemTxt2}>
                                            Mang việc học đến với công ty của bạn
                                        </div>
                                    </span>
                                    <span>
                                        <img src={images.exitIcon} className={css.icon} alt="exit icon" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorNavbar;
