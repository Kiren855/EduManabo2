import { createPortal } from "react-dom";

import InputUtil from "~/utils/InputUtil";
import CircleButton from "~/utils/CircleButton";
import classNames from "classnames/bind";
import styles from "./ShareCourseCard.module.scss";

import images from '~/assets/images';

const cx = classNames.bind(styles);

const ShareCourseCard = (props) => {
    const {
        ttl = "",
        txt = "",
        btnTxt = "",
        btnClick = () => { },
        closeModal = () => { },
    } = props;

    let shareHandler = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Copied!");
        return closeModal();
    };

    return createPortal(
        <div className={cx('outerDiv')}>
            <div className={cx('innerDiv')}>
                <div className={cx('box1')}>
                    <div className={cx('ttl')}>{ttl}</div>
                    <img src={images.closeIcon} alt="icon-btn" onClick={closeModal} className={cx('icon')} />
                </div>
                <div className={cx('box2')}>
                    <InputUtil
                        state={txt}
                        btnTxt={btnTxt}
                        btnClick={shareHandler}
                        btnCss={{ padding: "20px" }}
                    />
                </div>
                <div className={cx('box3')}>
                    <span className={cx('icons')}>
                        <CircleButton img={images.fbIcon} />
                    </span>
                    <span className={cx('icons')}>
                        <CircleButton img={images.twIcon} />
                    </span>
                    <span className={cx('icons')}>
                        <CircleButton img={images.mlIcon} />
                    </span>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default ShareCourseCard;