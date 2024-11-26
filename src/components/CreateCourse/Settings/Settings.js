import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';

const cx = classNames.bind(styles);

const Settings = () => {
    const [enrollmentStatus, setEnrollmentStatus] = useState('Công khai'); // Mặc định là "Công khai"
    const [instructors, setInstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

    // Giả lập gọi API để lấy dữ liệu từ server
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Giả lập dữ liệu server trả về
                const mockResponse = {
                    enrollmentStatus: "Không công khai(Được bảo vệ bằng mật khẩu)",
                    instructors: [
                        {
                            name: 'Cng03',
                            role: 'Chủ sở hữu',
                            permissions: {
                                main: true,
                                manage: true,
                                support: false,
                                performance: false,
                                questions: false,
                                assignments: false,
                            },
                        },
                    ],
                };

                // Nếu không có dữ liệu (trường hợp dữ liệu trống)
                // const mockResponse = {
                //     enrollmentStatus: '',
                //     instructors: [],
                // };

                setEnrollmentStatus(mockResponse.enrollmentStatus || 'Công khai');
                setInstructors(mockResponse.instructors || []);
                setIsLoading(false);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Hàm xử lý thay đổi trạng thái ghi danh
    const handleEnrollmentChange = (e) => {
        setEnrollmentStatus(e.target.value);
    };

    // Hàm xử lý thay đổi quyền của giảng viên
    const handlePermissionChange = (index, permission) => {
        const updatedInstructors = [...instructors];
        updatedInstructors[index].permissions[permission] =
            !updatedInstructors[index].permissions[permission];
        setInstructors(updatedInstructors);
    };

    // Hàm xử lý lưu dữ liệu
    const handleSave = () => {
        const payload = {
            enrollmentStatus,
            instructors,
        };
        console.log('Dữ liệu gửi lên server:', payload);
        alert('Dữ liệu đã được lưu (xem console).');
    };

    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Cài đặt</h2>
            <div className={cx('divider')} />

            {/* Trạng thái khóa học */}
            <div className={cx('section')}>
                <h3>Trạng thái khóa học</h3>
                <div className={cx('div-button')}>
                    <button className={cx('status-button')}>Hủy xuất bản</button>
                    <span>Học viên mới không thể tìm thấy khóa học của bạn thông qua tính năng tìm kiếm. Tuy nhiên, các học viên hiện tại vẫn có thể truy cập vào nội dung khóa học.</span>
                </div>
                <div className={cx('div-button')}>
                    <button className={cx('delete-button')}>Xóa</button>
                    <span>Chúng tôi cam kết học viên có quyền truy cập suốt đời. Vì vậy, bạn không thể xóa khóa học sau khi học viên đã ghi danh.</span>
                </div>
            </div>

            <div className={cx('divider')} />

            {/* Ghi danh */}
            <div className={cx('section')}>
                <h3>Ghi danh</h3>
                <select
                    className={cx('dropdown')}
                    value={enrollmentStatus}
                    onChange={handleEnrollmentChange}
                >
                    <option value="Công khai">Công khai</option>
                    <option value="Không công khai">
                        Không công khai(Chỉ người được mời)
                    </option>
                    <option value="Không công khai(Được bảo vệ bằng mật khẩu)">
                        Không công khai(Được bảo vệ bằng mật khẩu)
                    </option>
                </select>
                <p>
                    Các khóa học công khai xuất hiện trong kết quả tìm kiếm và được cung cấp
                    cho bất kỳ người dùng nào trên Udemy.
                </p>
                <button className={cx('save-button')} onClick={handleSave}>
                    Lưu
                </button>
            </div>

            <div className={cx('divider')} />

            {/* Quản lý các quyền của giảng viên */}
            <div className={cx('section')}>
                <h3>Quản lý các quyền của giảng viên</h3>
                <div className={cx('divider')} />
                <table className={cx('instructor-table')}>
                    <thead>
                        <tr>
                            <th>Giảng viên</th>
                            <th>Thường trực</th>
                            <th>Quản lý</th>
                            <th>Phụ đề</th>
                            <th>Hiệu suất</th>
                            <th>Hỏi đáp</th>
                            <th>Bài tập</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructors.map((instructor, index) => (
                            <tr key={index}>
                                <td>
                                    <span className={cx('instructor-name')}>
                                        {instructor.name}
                                    </span>
                                    <span className={cx('role')}>{instructor.role}</span>
                                </td>
                                {Object.keys(instructor.permissions).map((permission) => (
                                    <td key={permission}>
                                        <input
                                            type="checkbox"
                                            checked={instructor.permissions[permission]}
                                            onChange={() =>
                                                handlePermissionChange(index, permission)
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className={cx('save-button')} onClick={handleSave}>
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default Settings;
