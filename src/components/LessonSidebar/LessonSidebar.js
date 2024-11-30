import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./LessonSidebar.module.scss";
import DetailDPComponent from "../DetailDPComponent";
import CourseContentComponent from "../CourseContentComponent";

const cx = classNames.bind(styles)

function LessonSidebar({ currentLessonId, onChangeLesson, data, onLessonSelect }) {
    console.log(data)
    return (
        <div className={cx('course-content')}>
            <DetailDPComponent
                title="Hãy làm bài đánh giá Edumanabo để kiểm tra kỹ năng của bạn"
                desc="Được thực hiện bởi Edumanabo, bài đánh giá tổng quát này là một cách tuyệt vời để kiểm tra kỹ năng của bạn."
                btnTxt="Làm bài tập"
            />
            <CourseContentComponent
                title="Nội dung bài học "
                data={data}
                selectLesson={onLessonSelect}
            // playerWidthSetter={setPlayerFullWidth}
            />
        </div>
    );
}

export default LessonSidebar;