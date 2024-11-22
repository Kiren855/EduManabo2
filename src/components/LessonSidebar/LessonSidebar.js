import React, { useState } from "react";
import { courseData } from "./courseData";
import classNames from "classnames/bind";
import styles from "./LessonSidebar.module.scss";
import DetailDPComponent from "../DetailDPComponent";
import CourseContentComponent from "../CourseContentComponent";

const cx = classNames.bind(styles)

function LessonSidebar({ currentLessonId, onChangeLesson }) {

    return (
        <div className={cx('course-content')}>
            <DetailDPComponent
                title="Take a Edumanabo Assessment to check your skills"
                desc="Made by Edumanabo, this generalized assessment is a great way to check in on your skills."
                btnTxt="Launch Assessment"
            />
            <CourseContentComponent
                title="Course Content"
                data={courseData}
            // playerWidthSetter={setPlayerFullWidth}
            />
        </div>
    );
}

export default LessonSidebar;