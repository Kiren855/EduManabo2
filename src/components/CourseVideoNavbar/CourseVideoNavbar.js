import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./CourseVideoNavbar.module.scss"
import Button1 from "../Button1";
import ShareCourseCard from "../ShareCourseCard";
import CourseRatingsCard from "../Cards/CourseRatingsCard";
import CircularProgress from "../CircularProgress";

import images from "~/assets/images";

const cx = classNames.bind(styles)

const CourseVideoNavbar = (props) => {
    const [leaveRatingModal, setLeaveRatingModal] = useState(false);
    const [showShareCourseDialog, setShowShareCourseDialog] = useState(false);
    const { data = {} } = props;
    const { title = "" } = data;

    const shareCourseDialogHandler = () => {
        setShowShareCourseDialog((p) => !p);
    };

    return (
        <div className={cx('outerDiv')}>
            <div className={cx('left')}>
                <div className={cx('logo-container')}>
                    <Link to="/" className={cx('logo-link')}>
                        <img src={images.logo_black} alt="Edu Manabo" />
                        <span>duManabo</span>
                    </Link>
                </div>
                <hr className={cx('vhr')} />
                <div className={cx('ttl')}>{title}</div>
            </div>
            <div className={cx('right')}>
                <div className={cx('item')}>
                    <img src={images.starIcon} alt="star" className={cx('icon')} />
                    <span className={cx('txt')} onClick={() => setLeaveRatingModal(true)}>
                        Leave a rating
                    </span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('txt')}>Your Progress</span>
                    <CircularProgress progress={22} size={28} strokeWidth={2} color="#5022c3" />
                </div>
                <Button1
                    txt="Share"
                    color="var(--white)"
                    img={images.shareIcon}
                    imgDir="right"
                    onClick={shareCourseDialogHandler}
                    bck="var(--gray)"
                    hovBck="var(--blackish2)"
                    extraCss={{ border: "1px solid var(--white)" }}
                    imageCss={{
                        width: "10px",
                        height: "10px",
                        filter: "invert(1)",
                    }}
                />
            </div>
            {showShareCourseDialog ? (
                <ShareCourseCard
                    ttl="Share this course"
                    txt=""
                    btnTxt="Copy"
                    btnClick={shareCourseDialogHandler}
                    closeModal={shareCourseDialogHandler}
                />
            ) : null}
            {leaveRatingModal ? (
                <CourseRatingsCard
                    ttl="How would you rate this course?"
                    closeModal={() => setLeaveRatingModal(false)}
                />
            ) : null}
        </div>
    );
};

export default CourseVideoNavbar;