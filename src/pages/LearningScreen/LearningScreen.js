import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import styles from "./LearningScreen.module.scss";

import VideoPlayer from "~/components/VideoPlayer";
import Spinner from "~/utils/Spinner";
import ToastMessage from "~/utils/ToastMessage";
import { getDetailCourseOfLearningService } from "~/services/learning/learningService";
import { useParams } from "react-router-dom";
import LessonSidebar from "~/components/LessonSidebar";
import CourseVideoNavbar from "~/components/CourseVideoNavbar";
import Footer from "~/layouts/components/Footer";
import { getVideoLessonByTypeId, getExamLessonById, getContentArticleLesson } from "~/services/createCourse/sectionsService";
import CourseViewTabComponent from "~/components/CourseViewTabComponents/CourseViewTabComponent";
import QuizComponent from "~/components/Cards/QuizComponent";


const cx = classNames.bind(styles)
const questions = [
    {
        id: 1,
        text: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin', 'Madrid'],
        isMultiple: false
    },
    {
        id: 2,
        text: 'Select the colors in the French flag.',
        answers: ['Red', 'Green', 'Blue', 'White', 'Red', 'Green', 'Blue', 'White'],
        isMultiple: true
    },
    {
        id: 3,
        text: 'Select the colors in the French flag.',
        answers: ['Red', 'Green', 'Blue', 'White'],
        isMultiple: false
    },
    {
        id: 4,
        text: 'Select the colors in the French flag.',
        answers: ['Red', 'Green', 'Blue', 'White'],
        isMultiple: false
    },
    {
        id: 5,
        text: 'Select the colors in the French flag.',
        answers: ['Red', 'Green', 'Blue', 'White'],
        isMultiple: false
    },
    {
        id: 6,
        text: 'Select the colors in the French flag.',
        answers: ['Red', 'Green', 'Blue', 'White'],
        isMultiple: false
    },
    {
        id: 7,
        text: 'Select the colors in the French flag.',
        answers: ['Red', 'Green', 'Blue', 'White'],
        isMultiple: false
    },
    {
        id: 8,
        text: 'Select the colors in the French flag.',
        answers: ['Red', 'Green', 'Blue', 'White'],
        isMultiple: false
    }
];

function LearningScreen() {
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourses] = useState([]);
    const { courseId } = useParams();
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [lessonData, setLessonData] = useState(null);

    // Hàm xử lý khi lesson được chọn
    const handleSelectLesson = async (lesson) => {
        setSelectedLesson(lesson); // Lưu lại lesson đã chọn

        try {
            // Kiểm tra type của lesson và gọi API tương ứng
            if (lesson.type === 'VIDEO') {
                // Gọi API để lấy dữ liệu video
                const videoData = await getVideoLessonByTypeId(lesson.type_id);
                setLessonData(videoData); // Cập nhật lessonData với dữ liệu video
            } else if (lesson.type === 'EXAM') {
                // Gọi API để lấy dữ liệu exam
                const examData = await getExamLessonById(lesson.type_id);
                setLessonData(examData); // Cập nhật lessonData với dữ liệu exam
            } else if (lesson.type === 'ARTICLE') {
                // Gọi API để lấy dữ liệu article
                const articleData = await getContentArticleLesson(lesson.type_id);
                setLessonData(articleData); // Cập nhật lessonData với dữ liệu article
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lesson:', error);
        }
    };

    const fetchData = async () => {
        try {
            // Lấy dữ liệu wishList và cart đồng thời
            const courseData = await getDetailCourseOfLearningService(courseId);
            setCourses(courseData.result);
        } catch (err) {
            console.error(err); // Log lỗi nếu có
            setToast({ type: 'error', message: `${err.response.data.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        fetchData(); // Gọi hàm lấy dữ liệu khi component mount
        if (course && course.sections && course.sections.length > 0) {
            const firstLesson = course.sections[0].lessons[0]; // Chọn lesson đầu tiên trong sections
            setSelectedLesson(firstLesson);
        }
    }, [courseId]);

    const [isExpandedView, setIsExpandedView] = useState(true);

    const handleToggleExpandedView = () => {
        setIsExpandedView(!isExpandedView);
    };

    const [currentLessonId, setCurrentLessonId] = useState(1);

    const changeLesson = (lessonId) => {
        setCurrentLessonId(lessonId);
    };

    if (isLoading) {
        return (
            <div className={cx('df')}>
                <Spinner message="Nhâm nhi cà phê trong khi chúng tôi thực hiện yêu cầu của bạn..." />
            </div>
        );
    }

    console.log(course)
    console.log('lessson selected', selectedLesson)

    return (
        <>
            {/* Hiển thị ToastMessage */}
            {toast && (
                <ToastMessage
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
            <div className={cx('video-learning-screen')}>
                <CourseVideoNavbar data={course.title} />
                <div className={cx('main-content')}>
                    {/* VideoPlayer, QuizComponent, hoặc ArticleComponent */}
                    {lessonData && selectedLesson.type === 'VIDEO' && (
                        <VideoPlayer onToggleExpandedView={handleToggleExpandedView} lesson={lessonData} />
                    )}
                    {lessonData && selectedLesson.type === 'EXAM' && (
                        <QuizComponent exam={lessonData} />
                    )}
                    {/* {lessonData && lessonData.type === 'ARTICLE' && (
                        <ArticleComponent article={lessonData} />
                    )} */}
                    {/* <VideoPlayer onToggleExpandedView={handleToggleExpandedView} lesson={lesson} />
                    <QuizComponent questions={questions} /> */}
                    <CourseViewTabComponent />
                    <Footer />
                </div>
                {isExpandedView && (
                    <LessonSidebar onLessonSelect={handleSelectLesson} data={course.sections} currentLessonId={currentLessonId} onChangeLesson={changeLesson} />
                )}
            </div>
        </>
    );
}

export default LearningScreen;