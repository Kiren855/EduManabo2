import classNames from "classnames/bind";
import styles from './WelcomeBack.module.scss';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function WelcomeBack() {
    const isAvatar = false;

    return (
        <div className={cx('user-occupation')}>
            {isAvatar ? (
                <>
                    <div>
                        {/* Nếu biến isAvatar tồn tại và là true */}
                        <img className={cx('user-avatar')} src="https://toigingiuvedep.vn/wp-content/uploads/2022/05/anh-gai-trung-quoc-hoa-trang.jpg" alt="User Avatar" />
                    </div>
                    <div>
                        <h3>Chào mừng CNG03 trở lại!</h3>
                        <div>
                            <Link><span>Thêm nghề nghiệp và sở thích</span></Link>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('avatar-default')}>
                        C
                    </div>
                    <div>
                        <h3>Chào mừng CNG03 trở lại!</h3>
                        <div>
                            <Link><span>Thêm nghề nghiệp và sở thích</span></Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WelcomeBack;