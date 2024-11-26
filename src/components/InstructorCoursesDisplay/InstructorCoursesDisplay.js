import React from "react";

import TextWithButtonCard from "../Cards/TextWithButtonCard";

const InstructorCoursesDisplay = () => {
    return (
        <div>
            <TextWithButtonCard
                txt="Nhảy vào Tạo khóa học"
                btnTxt="Tạo khóa học của bạn"
                btnLink="/courses/create"
            />
        </div>
    );
};

export default InstructorCoursesDisplay;
