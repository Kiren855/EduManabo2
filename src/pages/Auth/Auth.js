import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebookF, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames/bind";
import styles from "./Auth.module.scss";

const cx = classNames.bind(styles)

function Auth() {

    // Sử dụng useState để quản lý trạng thái 'active'
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true); // Thêm lớp "active"
    };

    const handleLoginClick = () => {
        setIsActive(false); // Gỡ lớp "active"
    };

    return (
        <div className={cx('container', { active: isActive })}
            id="container">
            <div className={cx('form-container', 'sign-up')}>
                <form>
                    <h1>Create Account</h1>
                    <div className={cx('social-icons')}>
                        <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faGooglePlusG} /></Link>
                        <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faFacebookF} /></Link>
                        <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faLinkedin} /></Link>
                        <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faGithub} /></Link>
                    </div>
                    <span>or use your email for registeration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className={cx('form-container', 'sign-in')}>
                <form>
                    <h1>Sign In</h1>
                    <div className={cx('social-icons')}>
                        <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faGooglePlusG} /></Link>
                        <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faFacebookF} /></Link>
                        <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faLinkedin} /></Link>
                        <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faGithub} /></Link>
                    </div>
                    <span>or use your email password</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forget Your Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className={cx('toggle-container')}>
                <div className={cx('toggle')}>
                    <div className={cx('toggle-panel', 'toggle-left')}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className={cx('hidden')} onClick={handleLoginClick} id="login">Sign In</button>
                    </div>
                    <div className={cx('toggle-panel', 'toggle-right')}>
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className={cx('hidden')} onClick={handleRegisterClick} id="register">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;