import { useState } from "react";

import { Link } from "react-router-dom";

import InputUtil from "~/utils/InputUtil";
import Button1 from "../Button1";

import images from "~/assets/images";

import css from "./LoginModal.module.scss";

const LoginModal = (props) => {
    const { setModal = () => { } } = props;
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const oauth = [
        { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png", txt: "Continue with Facebook", link: "/facebook-auth" },
        { img: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png", txt: "Continue with Google", link: "/google-auth" },
        { img: "https://banner2.cleanpng.com/20180714/ycl/aav2d20ra.webp", txt: "Continue with Apple", link: "/apple-auth" },
    ];

    let changeHanlder = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    let submitHandler = () => {
        if (!state.email.includes("@") || state.password.length < 10) {
            console.log("Error", state);
            return;
        }
        console.log(state, "Form Values");
    };

    return (
        <>
            <div className={css.outerDiv}>
                <div className={css.loginBox}>
                    <div className={css.ttl}>
                        <span>Log in to your Edumanabo account</span>
                        <img
                            src={images.closeIcon}
                            alt="close icon"
                            className={css.cicon}
                            onClick={() => setModal(false)}
                        />
                    </div>
                    <hr />
                    <div className={css.boxBdy}>
                        {oauth?.map((item, id) => {
                            return (
                                <div className={css.oauth} key={id}>
                                    <img src={item?.img} alt="login img" className={css.icon} />
                                    <span className={css.txt}>{item?.txt}</span>
                                </div>
                            );
                        })}
                        <InputUtil
                            type="email"
                            name="email"
                            state={state.email}
                            icon={images.email}
                            placeholderTxt="Email"
                            onChange={changeHanlder}
                        />
                        <InputUtil
                            type="password"
                            name="password"
                            state={state.password}
                            icon={images.lock}
                            placeholderTxt="Password"
                            onChange={changeHanlder}
                        />
                        <Button1
                            txt="Login"
                            color="var(--white)"
                            bck="var(--purple)"
                            hovBck="var(--purple-dark)"
                            extraCss={{
                                width: "100%",
                                margin: "0",
                                border: "none",
                                padding: "1rem",
                            }}
                            onClick={submitHandler}
                        />
                        <div className={css.blck}>
                            <span className={css.blckTxt}>or</span>
                            <Link to="/join/forgot-password" className={css.anchor}>
                                Forgot password
                            </Link>
                        </div>
                        <div className={css.blck}>
                            <Link to="/join/login" className={css.anchor}>
                                Log in to a different account
                            </Link>
                        </div>
                        <div className={css.blck}>
                            <span className={css.blckTxt}>Dont have an account?</span>
                            <Link to="/join/signup" className={css.anchor}>
                                <b>Signup</b>
                            </Link>
                        </div>
                        <div className={css.blck}>
                            <Link to="/join/login" className={css.anchor}>
                                <b>Login with your organization</b>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;
