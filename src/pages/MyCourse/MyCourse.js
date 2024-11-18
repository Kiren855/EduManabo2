import classNames from "classnames/bind";
import styles from "./MyCourse.module.scss"
import MyCoursesPage from "~/components/User/MyCoursesPage";

const cx = classNames.bind(styles)

function MyCourse() {
    return (
        <div className={cx('my-course-container')}>
            <MyCoursesPage />
        </div>
    );
}

export default MyCourse;