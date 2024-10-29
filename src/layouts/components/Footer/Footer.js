import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarth
} from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import images from '~/assets/images';


const cx = classNames.bind(styles)

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-section')}>
                <div>
                    <div className={cx('ud-heading-lg')}>Giảng dạy online cho cả thế giới</div>
                    <div className={cx('ud-text-md1')}>Tạo một khóa học video online, tiếp cận học viên trên toàn cầu và kiếm tiền</div>
                </div>
                <div className={cx('teach-on-udemy-banner')}>
                    <Link to="/teaching/?ref=bai-sub-footer" className={cx("ud-btn", "ud-btn-large", "ud-btn-white-outline", "ud-heading-md")}>
                        <span className={cx('ud-btn-label')}>Giảng dạy trên Edumanabo</span>
                    </Link>
                </div>
            </div>

            <div className={cx('footer-section', 'fs-main')}>
                <ul className={cx('ud-unstyled-list', 'link-column')}>
                    <li><Link to="/" className={cx('link', 'white-link', 'ud-text-sm')} target="_blank">Edumanabo Business</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="/teaching/?ref=teach_footer">Giảng dạy trên Edumanabo</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="/mobile/" target="_blank">Tải ứng dụng</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="">Giới thiệu</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="">Hãy liên hệ với chúng tôi</Link></li>
                </ul>

                <ul className={cx('ud-unstyled-list', 'link-column')}>
                    <li><Link to="/" className={cx('link', 'white-link', 'ud-text-sm')} target="_blank">Nghề nghiệp</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="/teaching/?ref=teach_footer">Blog</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="/mobile/" target="_blank">Trợ giúp và hỗ trợ</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="">Đơn vị liên kết</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="">Nhà đầu tư</Link></li>
                </ul>

                <ul className={cx('ud-unstyled-list', 'link-column')}>
                    <li><Link to="/" className={cx('link', 'white-link', 'ud-text-sm')} target="_blank">Điều khoản</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="/teaching/?ref=teach_footer">Chính sách về quyền riêng tư</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="/mobile/" target="_blank">Cài đặt cookie</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="">Sơ đồ trang web</Link></li>
                    <li><Link className={cx('link', 'white-link', 'ud-text-sm')} to="">Tuyên bố về khả năng tiếp cận</Link></li>
                </ul>

                <div className={cx('links-and-language-selector')}>
                    <div className={cx('language-selector-container')}>
                        <button type="button" className={cx('ud-btn', 'ud-btn-medium', 'ud-btn-secondary', 'ud-text-md', 'language-selector-button-module--button--iLcUV')}>
                            <FontAwesomeIcon icon={faEarth} /><span>Tiếng Việt</span>
                        </button>
                    </div>
                </div>

            </div>

            <div className={cx('logo-and-copyright')}>
                <div className={cx('logo-container')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo_black} alt="Edu Manabo" />
                        <span>duManabo</span>
                    </Link>
                </div>
                <div className={cx('copyright-container', 'ud-text-xs')}>© 2024 Edumanabo, Inc.</div>
            </div>


        </footer>
    );
}

export default Footer;