import React from "react";
import { Link } from "react-router-dom";

import images from "~/assets/images";

import css from "./VerticalCourseDraftCard.module.scss";

const VerticalCourseDraftCard = (props) => {
    const courses = props.courses;
    return (
        // <Link to={link} className={css.outerDiv}>
        //     <div className={css.left}>
        //         <img alt="HTT" src={images.placeHolderImg} className={css.img} />
        //     </div>
        //     <div className={css.right}>
        //         <div className={css.hoveredBox}>Chỉnh sửa / Quản lý khóa học</div>
        //         <div className={css.rLeftBox}>
        //             <div className={css.txt}>{courseName}</div>
        //             <div className={css.txt}>
        //                 {courseType} <span className={css.lightTxt}>{courseVisible}</span>
        //             </div>
        //         </div>
        //         <div className={css.rrightBox}>
        //             <span className={css.txt}>Kết thúc khóa học của bạn</span>
        //             <progress value={courseFillP} className={css.progressBar} />
        //         </div>
        //     </div>
        // </Link>

        <>
            {courses.map((course) => {
                const link = `/courses/edit/${course.id}`;
                const imageSrc = course.image || images.placeHolderImg;
                const courseName = course.title;
                const isDraft = course.isDraft;
                const courseType = isDraft === null || isDraft === false ? "Bản nháp" : "";
                const courseVisible = isDraft === true ? "Công khai" : "Riêng tư";
                const courseFillP = isDraft === true ? 1 : 0.1;

                return (
                    <Link to={link} className={css.outerDiv} key={course.id}>
                        <div className={css.left}>
                            <img alt={courseName} src={imageSrc} className={css.img} />
                        </div>
                        <div className={css.right}>
                            <div className={css.hoveredBox}>Chỉnh sửa / Quản lý khóa học</div>
                            <div className={css.rLeftBox}>
                                <div className={css.txt}>{courseName}</div>
                                {isDraft === null || isDraft === false ? (
                                    <div className={css.txt}>
                                        {courseType} <span className={css.lightTxt}>{courseVisible}</span>
                                    </div>
                                ) : (
                                    <div className={css.txt}>{courseVisible}</div>
                                )}
                            </div>
                            <div className={css.rrightBox}>
                                <span className={css.txt}>Kết thúc khóa học của bạn</span>
                                <progress value={courseFillP} max={1} className={css.progressBar} />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
};

export default VerticalCourseDraftCard;
