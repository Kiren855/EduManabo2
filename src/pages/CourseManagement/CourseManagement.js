import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { getSubmitCourses, approveCourse, rejectCourse } from '~/services/createCourse/courseService';
import styles from './CourseManagement.module.scss'; // Tập tin CSS cho bảng
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';

const cx = classNames.bind(styles);

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Trạng thái modal
    const [selectedCourse, setSelectedCourse] = useState(null); // Khóa học đã chọn để duyệt/từ chối
    const [toast, setToast] = useState(null); // Quản lý thông báo

    const [rejectionReason, setRejectionReason] = useState(''); // Lý do từ chối
    const [showRejectionReasonInput, setShowRejectionReasonInput] = useState(false);

    // Hàm xử lý thay đổi của lý do từ chối
    const handleRejectionReasonChange = (event) => {
        setRejectionReason(event.target.value);
    };
    // Lấy danh sách khóa học
    const getCourses = async () => {
        try {
            setIsLoading(true);
            const response = await getSubmitCourses(); // Gọi API
            setCourses(response.data.result); // Lưu danh sách khóa học từ response.result
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khóa học:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Duyệt khóa học
    const handleApprove = async (courseId) => {
        setIsLoading(true);

        try {
            await approveCourse(courseId); // Gọi API duyệt khóa học
            setToast({ type: 'success', message: 'Khóa học đã được duyệt!' });
            getCourses(); // Cập nhật lại danh sách khóa học sau khi duyệt
            setShowModal(false); // Đóng modal
        } catch (error) {
            console.error('Lỗi khi duyệt khóa học:', error);
            setToast({ type: 'error', message: 'Đã xảy ra lỗi!' });
        } finally {
            setIsLoading(false);
        }
    };

    // Từ chối khóa học
    const handleReject = async (courseId) => {
        setIsLoading(true);
        try {
            if (rejectionReason.trim() === '') {
                setToast({ type: 'warning', message: 'Vui lòng nhập lý do từ chối!' });
                return;
            }
            await rejectCourse(courseId, rejectionReason); // Gọi API từ chối khóa học
            setToast({ type: 'info', message: 'Khóa học đã bị từ chối!' });
            getCourses(); // Cập nhật lại danh sách khóa học sau khi từ chối
            setShowModal(false); // Đóng modal
            setShowRejectionReasonInput(false);
        } catch (error) {
            setToast({ type: 'error', message: 'Lỗi khi từ chối khóa học!' });
            console.error('Lỗi khi từ chối khóa học:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Mở modal để duyệt/từ chối khóa học
    const openModal = (course) => {
        setSelectedCourse(course);
        setShowModal(true); // Mở modal khi chọn khóa học
    };

    // Đóng modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedCourse(null);
    };

    useEffect(() => {
        getCourses(); // Lấy danh sách khóa học khi component mount
    }, []);

    if (isLoading) {
        return (
            <div className={cx('df')}>
                <Spinner message="Nhâm nhi cà phê trong khi chúng tôi thực hiện yêu cầu của bạn..." />
            </div>
        );
    }

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
            <div className={cx('course-management')}>
                <h2>Quản lý Khóa Học</h2>
                <div className={cx('course-table')}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID Khóa học</th>
                                <th>Tên khóa học</th>
                                <th>Giảng viên</th>
                                <th>Chấp nhận</th>
                                <th>Từ chối</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.courseId}>
                                    <td>{course.courseId}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.instructor}</td>
                                    <td>
                                        <button className={cx('button-approve')} onClick={() => openModal(course)}>
                                            Duyệt
                                        </button>
                                    </td>
                                    <td>
                                        <button className={cx('button-reject')} onClick={() => openModal(course)}>
                                            Từ chối
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className={cx('modal')}>
                        <div className={cx('modal-content')}>
                            <h3>{selectedCourse ? `Xác nhận ${selectedCourse.courseName}` : ''}</h3>
                            <div>
                                <button className={cx('modal-button-approve')} onClick={() => handleApprove(selectedCourse.courseId)}>
                                    Duyệt
                                </button>
                                <button className={cx('modal-button-reject')} onClick={() => setShowRejectionReasonInput(true)}>
                                    Từ chối
                                </button>
                                {/* Hiển thị textarea nhập lý do từ chối nếu showRejectionReasonInput là true */}
                                {showRejectionReasonInput && (
                                    <div className={cx('rejection-input')}>
                                        <textarea
                                            className={cx('textarea')}
                                            value={rejectionReason}
                                            onChange={handleRejectionReasonChange}
                                            placeholder="Nhập lý do từ chối..."
                                        />
                                        <button className={cx('modal-button-reject-submit')} onClick={() => handleReject(selectedCourse.courseId)}>
                                            Xác nhận từ chối
                                        </button>
                                    </div>
                                )}
                                <button className={cx('modal-button-close')} onClick={closeModal}>
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CourseManagement;
