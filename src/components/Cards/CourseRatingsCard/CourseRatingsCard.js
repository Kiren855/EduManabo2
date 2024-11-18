import { useState } from "react";
import { createPortal } from "react-dom";

import classNames from "classnames/bind";
import styles from "./CourseRatingsCard.module.scss";
import Button1 from "~/components/Button1";
import images from '~/assets/images';

const cx = classNames.bind(styles)

const CourseRatingsCard = (props) => {
    const { ttl = "", closeModal = () => { } } = props;

    const [selectedRatingNumber, setSelectedRatingNumber] = useState(0);
    const [hoverStarNum, setHoverStarNum] = useState(0);
    const [selectedRating, setSelectedRating] = useState("Select Rating");

    const ratings = [
        "Select Rating",
        "One Star",
        "Two Star",
        "Three Star",
        "Four Star",
        "Five Star",
    ];

    const mouseOverHandler = (currentStarNum) => {
        if (selectedRatingNumber <= 0) {
            setSelectedRating(ratings[currentStarNum]);
        }
        setHoverStarNum(currentStarNum);
    };

    const mouseLeaveHandler = () => {
        if (selectedRatingNumber <= 0) {
            setSelectedRating(ratings[0]);
        }
        setHoverStarNum(0);
    };

    const clickHandler = (currentStarNum) => {
        setSelectedRatingNumber(currentStarNum);
        setSelectedRating(ratings[currentStarNum]);
    };

    const submitHandler = () => {
        console.log("selectedRatingNumber", ratings[selectedRatingNumber]);
        closeModal();
    };

    return createPortal(
        <div className={cx('outerDiv')}>
            <div className={cx('innerDiv')}>
                <div className={cx('box1')}>
                    <div className={cx('ttl')}>{ttl}</div>
                    <img src={images.closeIcon} alt="icon" onClick={closeModal} className={cx('crossIcon')} />
                </div>
                <div className={cx('box2')}>{selectedRating}</div>
                <div className={cx('box3')}>
                    <img
                        src={
                            selectedRatingNumber >= 1 || hoverStarNum > 0
                                ? images.filledStar
                                : images.outLineStar
                        }
                        alt="star icon"
                        onClick={() => clickHandler(1)}
                        className={cx('icon')}
                        onMouseOver={() => mouseOverHandler(1)}
                        onMouseLeave={mouseLeaveHandler}
                    />
                    <img
                        src={
                            selectedRatingNumber >= 2 || hoverStarNum > 1
                                ? images.filledStar
                                : images.outLineStar
                        }
                        alt="star icon"
                        onClick={() => clickHandler(2)}
                        className={cx('icon')}
                        onMouseOver={() => mouseOverHandler(2)}
                        onMouseLeave={mouseLeaveHandler}
                    />
                    <img
                        src={
                            selectedRatingNumber >= 3 || hoverStarNum > 2
                                ? images.filledStar
                                : images.outLineStar
                        }
                        alt="star icon"
                        onClick={() => clickHandler(3)}
                        className={cx('icon')}
                        onMouseOver={() => mouseOverHandler(3)}
                        onMouseLeave={mouseLeaveHandler}
                    />
                    <img
                        src={
                            selectedRatingNumber >= 4 || hoverStarNum > 3
                                ? images.filledStar
                                : images.outLineStar
                        }
                        alt="star icon"
                        onClick={() => clickHandler(4)}
                        className={cx('icon')}
                        onMouseOver={() => mouseOverHandler(4)}
                        onMouseLeave={mouseLeaveHandler}
                    />
                    <img
                        src={
                            selectedRatingNumber >= 5 || hoverStarNum > 4
                                ? images.filledStar
                                : images.outLineStar
                        }
                        alt="star icon"
                        onClick={() => clickHandler(5)}
                        className={cx('icon')}
                        onMouseOver={() => mouseOverHandler(5)}
                        onMouseLeave={mouseLeaveHandler}
                    />
                </div>
                <div className={cx('box4')}>
                    <Button1
                        onClick={submitHandler}
                        txt="Save and continue"
                        bck="var(--gray)"
                        hovBck="var(--light-gray2)"
                        color="var(--white)"
                    />
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default CourseRatingsCard;