import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./CircleButton.module.scss";

const cx = classNames.bind(styles);

const CircleButton = ({
    img = "",
    bck = "white",
    color = "#1c1d1f",
    hovBck = "rgba(0, 0, 0, 0.04)",
    onClick = () => { },
    imageCss = {},
    extraCss = {},
    classNames = {},
    link = false,
}) => {
    let [style, setStyle] = useState({ backgroundColor: bck, color: color });

    let mouseOverHandler = () => {
        return setStyle({ backgroundColor: hovBck, color: color });
    };
    let mouseLeaveHandler = () => {
        return setStyle({ backgroundColor: bck, color: color });
    };
    let btn = (
        <div
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}
            style={{ ...style, ...extraCss }}
            className={[cx('btn'), classNames]?.join(" ")}
            onClick={onClick}
        >
            <img src={img} alt="img1" className={cx('btnImg')} style={imageCss} />
        </div>
    );

    if (link) {
        btn = (
            <Link
                to={link}
                onMouseOver={mouseOverHandler}
                onMouseLeave={mouseLeaveHandler}
                style={{ ...style, ...extraCss }}
                className={cx('btn')}
                onClick={onClick}
            >
                <img src={img} alt="img2" className={cx('btnImg')} style={imageCss} />
            </Link>
        );
    }

    return btn;
};

export default CircleButton;