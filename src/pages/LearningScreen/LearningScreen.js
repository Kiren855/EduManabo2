import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./LearningScreen.module.scss";

import VideoPlayer from "~/components/VideoPlayer";
import LessonSidebar from "~/components/LessonSidebar";
import CourseVideoNavbar from "~/components/CourseVideoNavbar";
import Footer from "~/layouts/components/Footer";
import CourseViewTabComponent from "~/components/CourseViewTabComponents/CourseViewTabComponent";
const cx = classNames.bind(styles)

function LearningScreen() {
    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
    // https://www.youtube.com/embed/ISb5jy5-N-I?si=t_anh6-BfrNVc1JB
    const lesson = {
        _id: "lesson123",
        Name: "Introduction to Web Development",
        Type: "video",
        Contents: {
            _id: "content123",
            Video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // URL YouTube hoặc URL S3
            Duration: 10, // Đơn vị phút
            Thumbnail_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQko0s7FTvRgN26lTufTX2E-SfPu7tC2AsA&s",
            Content_text: "In this lesson, we will explore the basics of web development and set up your environment."
        },
        Comments: []
    };

    const data = {
        title: "A Chill Day Playlist - CNG03",
    };

    const [isExpandedView, setIsExpandedView] = useState(true);

    const handleToggleExpandedView = () => {
        setIsExpandedView(!isExpandedView);
    };

    const [currentLessonId, setCurrentLessonId] = useState(1);

    const changeLesson = (lessonId) => {
        setCurrentLessonId(lessonId);
    };

    return (
        <div className={cx('video-learning-screen')}>
            <CourseVideoNavbar data={data} />
            <div className={cx('main-content')}>
                <VideoPlayer onToggleExpandedView={handleToggleExpandedView} lesson={lesson} />
                <CourseViewTabComponent />
                <Footer />
            </div>
            {isExpandedView && (
                <LessonSidebar currentLessonId={currentLessonId} onChangeLesson={changeLesson} />
            )}
        </div>
    );
}

export default LearningScreen;