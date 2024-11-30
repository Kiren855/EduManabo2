import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { getAccessToken, getRefreshToken } from "~/services/auth/authHelper";
import { getProfile } from "~/services/auth/userService";
import styles from './WelcomeBack.module.scss';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function WelcomeBack() {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const currentUser = accessToken && refreshToken ? true : false;

    const [avatarUrl, setAvatarUrl] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const { avatar, firstName, lastName } = await getProfile();
                setAvatarUrl(avatar);
                setFullName(`${firstName} ${lastName}`)
            } catch (error) {
                console.log(error.response.data.message)
            }
        };

        if (currentUser) {
            fetchPrice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('user-occupation')}>
            {currentUser ? (
                <>
                    <div>
                        {/* Nếu biến isAvatar tồn tại và là true */}
                        <img className={cx('user-avatar')} src={avatarUrl} alt="User Avatar" />
                    </div>
                    <div>
                        <h3>{`Chào mừng ${fullName} trở lại!`}</h3>
                        <div>
                            <Link><span>Thêm nghề nghiệp và sở thích</span></Link>
                        </div>
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </div>
    );
}

export default WelcomeBack;