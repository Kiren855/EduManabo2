import { useState } from "react";
import classNames from "classnames/bind";

import Button1 from "~/components/Button1";
import styles from "./InputUtil.module.scss"

const cx = classNames.bind(styles)

const InputUtil = (props) => {
    const [countNumber, setCountNumber] = useState(0);
    const {
        type = "text",
        label = null,
        inptTxt = null,
        name = "",
        icon = "",
        iconPosition = "left",
        placeholderTxt = "",
        state = "",
        btnTxt = "",
        btnClick = () => { },
        onChange = () => { },
        inptBoxCss = {},
        imgCss = {},
        extraCss = {},
        btnCss = {},
        count = false,
        countLimit = null,
        showCount = true,
        disabledInpt = false,
        disabledBtn = false,
    } = props;

    const changeHandler = (e) => {
        onChange(e);
        if (countLimit && e.currentTarget.value.length > countLimit) {
            return;
        }
        setCountNumber(e.currentTarget.value.length || 0);
    };

    return (
        <div className={cx('outerDiv')}>
            {label ? <label className={cx('label')}>{label}</label> : null}
            <div className={cx('inptBoxDiv')}>
                <div className={cx('inptBox')} style={inptBoxCss}>
                    {inptTxt ? <div className={cx('inptTxt')}>{inptTxt}</div> : null}
                    {icon && iconPosition === "left" ? (
                        <img src={icon} alt="img1" className={cx('icon')} style={imgCss} />
                    ) : (
                        ""
                    )}
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholderTxt}
                        className={cx('inpt')}
                        style={extraCss}
                        defaultValue={state}
                        onChange={changeHandler}
                        maxLength={countLimit}
                        disabled={disabledInpt}
                    />
                    {count ? (
                        <div className={cx('count')}>
                            {showCount ? countNumber : countLimit - state?.length}
                        </div>
                    ) : null}
                    {icon && iconPosition === "right" ? (
                        <img alt="img2" src={icon} className={cx('icon')} style={imgCss} />
                    ) : (
                        ""
                    )}
                </div>
                {btnTxt ? (
                    <Button1
                        txt={btnTxt}
                        onClick={btnClick}
                        bck="var(--purple)"
                        hovBck="var(--purple-dark)"
                        color="var(--white)"
                        disableBtn={disabledBtn}
                        extraCss={{
                            margin: "0",
                            padding: "1.3rem",
                            width: "30%",
                            height: "100%",
                            borderLeft: "none",
                            ...btnCss,
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default InputUtil;