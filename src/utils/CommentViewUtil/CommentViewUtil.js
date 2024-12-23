import { useState } from "react";

import images from "~/assets/images";

import css from "./CommentViewUtil.module.scss";

const CommentViewUtil = (props) => {
    const {
        id = "00",
        img = "",
        name = "",
        rating = 0,
        date = new Date(),
        comment = "",
        like = "",
    } = props.data;

    const [liked, setLiked] = useState(like || "");

    const likeHandler = (value) => {
        setLiked((prev) => {
            if (prev === value) {
                return "";
            }
            return value;
        });
    };

    return (
        <div className={css.outerDiv}>
            <div className={css.leftBar}>
                <img src={img} alt="profile pic" className={css.img} />
            </div>
            <div className={css.rightBar}>
                <div className={css.ttl}>{name}</div>
                <div className={css.ratingBox}>
                    <div className={css.rating}>
                        {Array.from(new Array(rating), (_, i) => (
                            <img
                                src={images.starIcon}
                                key={`star-${i}`}
                                alt="star"
                                className={css.starIcon}
                            />
                        ))}
                    </div>
                    <div className={css.time}>{date}</div>
                </div>
                <div className={css.cnt}>{comment}</div>
                <div className={css.fdbkBox}>
                    <div className={css.box1}>Was this review helpful?</div>
                    <div className={css.box2}>
                        <img
                            onClick={() => likeHandler("liked")}
                            src={liked === "liked" ? images.thumbsCircleIcon : images.thumbsCircleWhiteIcon}
                            alt="thumbs down"
                            className={css.fdbkIcon}
                        />
                        <img
                            onClick={() => likeHandler("disliked")}
                            src={
                                liked === "disliked" ? images.thumbsCircleIcon : images.thumbsCircleWhiteIcon
                            }
                            alt="thumbs up"
                            className={css.fdbkIconR}
                        />
                        <div className={css.fdbkRptTxt}>Report</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentViewUtil;
