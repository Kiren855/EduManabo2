import classNames from "classnames/bind";
import styles from "./Layout1.module.scss"
import Header from "../components/Header";
import Footer from "../components/Footer";

const cx = classNames.bind(styles)

function Layout1({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Layout1;