import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button1.module.scss"

const cx = classNames.bind(styles)


const Button1 = ({
    txt = null,
    img = "",
    bck = "white",
    color = "#1c1d1f",
    hovBck = "rgba(0, 0, 0, 0.04)",
    onClick = () => { },
    imageCss = {},
    imgDir = "left",
    extraCss = {},
    classNames = {},
    txtBoxCss = {},
    link = false,
    disableBtn = false,
}) => {
    const [style, setStyle] = useState({ backgroundColor: bck, color: color });

    const mouseOverHandler = () => {
        setStyle({ backgroundColor: hovBck, color: color });
    };

    const mouseLeaveHandler = () => {
        setStyle({ backgroundColor: bck, color: color });
    };

    const buttonContent = (
        <span className={cx('txtBox')} style={{ ...txtBoxCss }}>
            {img && imgDir === "left" && <img src={img} alt="img1" className={cx('btnImg')} style={imageCss} />}
            {txt && <span className={cx('txt')}>{txt}</span>}
            {img && imgDir === "right" && <img src={img} alt="img1" className={cx('btnImg')} style={imageCss} />}
        </span>
    );

    const buttonStyle = {
        ...style,
        ...extraCss,
        cursor: disableBtn ? "not-allowed" : "pointer",
    };

    return link ? (
        <Link
            to={link}
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}
            style={buttonStyle}
            className={cx('btn', classNames)}
            onClick={onClick}
        >
            {buttonContent}
        </Link>
    ) : (
        <button
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}
            style={buttonStyle}
            className={cx('btn', classNames)}
            onClick={onClick}
            disabled={disableBtn}
        >
            {buttonContent}
        </button>
    );
};
export default Button1;