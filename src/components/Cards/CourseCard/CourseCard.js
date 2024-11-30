import React from "react";
import { Link } from "react-router-dom";

import css from "./CourseCard.module.scss";

const CourseCard = (props) => {
    const {
        path = "/cart",
        image = "",
        courseName = "",
        instructorName = "",
        price = 0,
    } = props?.data;

    const extraCss = props.extraCss;

    return (
        <>
            <div className={css.outerDiv} id={props.id} style={extraCss}>
                <Link className={css.innerDiv} to={path}>
                    <div className={css.imgBox}>
                        <img src={image} alt="course thumbnail" className={css.courseImg} />
                    </div>
                    <div className={css.cardBdy}>
                        <div className={css.ttl}>{courseName}</div>
                        <div className={css.authDet}>{instructorName}</div>
                        <div className={css.prc}>
                            <span className={css.newPrc}>
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(price)}
                            </span>

                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default CourseCard;
