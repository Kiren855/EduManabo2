import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebookF, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { register, login } from "~/services/auth/authService";
import ToastMessage from "~/utils/ToastMessage";

import classNames from "classnames/bind";
import styles from "./Auth.module.scss";

const cx = classNames.bind(styles)

function Auth() {
    const [toast, setToast] = useState(null); // Quản lý thông báo

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signIn, setSignIn] = useState('Đăng nhập');
    const [signUp, setSignUp] = useState('Đăng ký');


    const handleLogin = async (e) => {
        setSignIn('Đăng nhập cho bạn');
        e.preventDefault(); // Ngăn chặn reload trang
        try {
            if (!email || !password) {
                setToast({ type: 'warning', message: 'Email và mật khẩu không được để trống!' });
            }

            await login(email, password);
            // Hiển thị thông báo thành công
            setToast({ type: 'success', message: 'Đăng nhập thành công!' });

            // Điều hướng sau khi đăng nhập thành công
            setTimeout(() => {
                window.location.href = '/';
            }, 100);
        } catch (error) {
            // Hiển thị thông báo lỗi
            setToast({ type: 'error', message: error.message || 'Đăng nhập thất bại!' });
        } finally {
            setSignIn('Đăng nhập');
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dob: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Tên người dùng không được để trống.'),
            email: Yup.string()
                .email('Email không hợp lệ.')
                .required('Email không được để trống.'),
            password: Yup.string()
                .min(6, 'Mật khẩu phải dài ít nhất 6 ký tự.')
                .required('Mật khẩu không được để trống.'),
            firstName: Yup.string().required('Họ không được để trống.'),
            lastName: Yup.string().required('Tên không được để trống.'),
            dob: Yup.date()
                .max(new Date(), 'Ngày sinh không hợp lệ.')
                .required('Ngày sinh không được để trống.'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
            setSignUp('Đang đăng ký')
            try {
                await register(values);
                // Hiển thị thông báo thành công
                setToast({ type: 'success', message: 'Đăng ký thành công!' });

                // Xóa toàn bộ giá trị form
                resetForm();

                handleLoginClick();
            } catch (error) {
                // setFieldError('general', error.message || 'Đăng ký thất bại');
                setToast({ type: 'error', message: error.message || 'Đăng ký thất bại' });
            } finally {
                setSignUp('Đăng ký')
                setSubmitting(false);
            }
        },
    });

    // Sử dụng useState để quản lý trạng thái 'active'
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true); // Thêm lớp "active"
    };

    const handleLoginClick = () => {
        setIsActive(false); // Gỡ lớp "active"
    };


    return (
        <div className={cx('container-learning')}>
            {/* Hiển thị ToastMessage */}
            {toast && (
                <ToastMessage
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
            <div className={cx('container', { active: isActive })}
                id="container">
                <div className={cx('form-container', 'sign-up')}>
                    <form onSubmit={formik.handleSubmit}>
                        <h1>Tạo tài khoản</h1>
                        <div className={cx('social-icons')}>
                            <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faGooglePlusG} /></Link>
                            <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faFacebookF} /></Link>
                            <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faLinkedin} /></Link>
                            <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faGithub} /></Link>
                        </div>
                        <span>hoặc sử dụng email của bạn để đăng ký</span>
                        <input
                            type="text"
                            name="username"
                            placeholder="Tên người dùng"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autocomplete="username"
                        />
                        {formik.touched.username && formik.errors.username && (
                            <span style={{ color: 'red' }}>{formik.errors.username}</span>
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autocomplete="email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span style={{ color: 'red' }}>{formik.errors.email}</span>
                        )}
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autocomplete="current-password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span style={{ color: 'red' }}>{formik.errors.password}</span>
                        )}
                        <div className={cx('df')}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Họ"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Tên"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <input
                                type="date"
                                name="dob"
                                placeholder="Ngày sinh"
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.firstName && formik.errors.firstName && (
                            <span style={{ color: 'red' }}>{formik.errors.firstName}</span>
                        )}
                        {formik.touched.lastName && formik.errors.lastName && (
                            <span style={{ color: 'red' }}>{formik.errors.lastName}</span>
                        )}
                        {formik.touched.dob && formik.errors.dob && (
                            <span style={{ color: 'red' }}>{formik.errors.dob}</span>
                        )}
                        <button type="submit" disabled={formik.isSubmitting}>
                            {signUp}
                        </button>
                        {formik.errors.general && (
                            <p style={{ color: 'red' }}>{formik.errors.general}</p>
                        )}
                    </form>
                </div>
                <div className={cx('form-container', 'sign-in')}>
                    <form onSubmit={handleLogin}>
                        <h1>Đăng nhập</h1>
                        <div className={cx('social-icons')}>
                            <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faGooglePlusG} /></Link>
                            <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faFacebookF} /></Link>
                            <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faLinkedin} /></Link>
                            <Link to="#" className={cx('icon')}><FontAwesomeIcon icon={faGithub} /></Link>
                        </div>
                        <span>hoặc sử dụng mật khẩu email của bạn</span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link to='/auth'>Quên mật khẩu?</Link>
                        <button type="submit">{signIn}</button>
                    </form>
                </div>
                <div className={cx('toggle-container')}>
                    <div className={cx('toggle')}>
                        <div className={cx('toggle-panel', 'toggle-left')}>
                            <h1>Welcome Back!</h1>
                            <p>Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                            <button className={cx('hidden')} onClick={handleLoginClick} id="login">Đăng nhập</button>
                        </div>
                        <div className={cx('toggle-panel', 'toggle-right')}>
                            <h1>Hello, Friend!</h1>
                            <p>Đăng ký thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                            <button className={cx('hidden')} onClick={handleRegisterClick} id="register">Đăng ký</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;