import classNames from "classnames/bind";
import styles from "./NothingLayout.module.scss"

const cx = classNames.bind(styles)

function NothingLayout({ children }) {
    return (
        <div className={cx('container-learning')}>
            {children}
        </div>
    );
}

export default NothingLayout;