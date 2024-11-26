import classNames from "classnames/bind";
import styles from "./Spinner.module.scss"

const cx = classNames.bind(styles)

function Spinner({ message }) {
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('spinner')}>
                    <div className={cx('sq1')}></div>
                    <div className={cx('sq2')}></div>
                    <div className={cx('sq3')}></div>
                    <div className={cx('sq4')}></div>
                    <div className={cx('sq5')}></div>
                </div>
                <p className={cx('spinner-text', 'below')}>{message}</p>
            </div>
        </>
    );
}

export default Spinner;