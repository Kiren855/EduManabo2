import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faFilePen, faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import {
    getFullSections, createSection, updateSection, deleteSection, deleteLesson
} from '~/services/createCourse/sectionsService';
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';
import classNames from 'classnames/bind';
import styles from './SectionManager.module.scss'; // Giả sử bạn có file SCSS cho giao diện

const cx = classNames.bind(styles);

const SectionManager = () => {
    const navigate = useNavigate();
    const { courseID } = useParams();
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [sections, setSections] = useState([]);
    const [newSection, setNewSection] = useState({ name: '', partNumber: 0 });
    const [editingSection, setEditingSection] = useState(null); // Trạng thái lưu section đang sửa
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
    const [activeSectionId, setActiveSectionId] = useState(null); // Trạng thái để lưu ID của section đang được chọn
    const [showAddContentMenu, setShowAddContentMenu] = useState(false); // Trạng thái để hiển thị menu thêm nội dung

    const handleAddContentMenuToggle = (sectionId) => {
        // Kiểm tra nếu section hiện tại đang được chọn
        if (activeSectionId === sectionId) {
            setShowAddContentMenu(!showAddContentMenu); // Chuyển trạng thái hiển thị menu (hiện/ẩn)
        } else {
            setActiveSectionId(sectionId); // Nếu là section khác thì đổi sang section đó
            setShowAddContentMenu(true); // Hiển thị menu cho section đó
        }
    };

    const fetchSections = async () => {
        try {
            const sectionsData = await getFullSections(courseID);
            setSections(sectionsData);

            // Tự động tăng partNumber cho section mới
            const nextPartNumber = sectionsData.length > 0 ? Math.max(...sectionsData.map(section => section.partNumber)) + 1 : 1;
            setNewSection(prev => ({ ...prev, partNumber: nextPartNumber }));
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sections', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Lấy danh sách sections khi component được mount
    useEffect(() => {
        fetchSections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Xử lý thêm mới section
    const handleAddSection = async () => {
        // Reset dữ liệu của section đang sửa
        setEditingSection(null);
        setNewSection({ name: '', partNumber: sections.length + 1 });
        setShowModal(true); // Mở modal khi nhấn "Thêm Section"
    };

    // Xử lý lưu section mới
    const handleSaveNewSection = async () => {
        setIsLoading(true);
        try {
            const response = await createSection(courseID, newSection);
            const createdSection = response; // Server trả về chỉ có id

            // Thêm section mới vào danh sách
            setSections(prevSections => [
                ...prevSections,
                { ...newSection, id: createdSection.id }
            ]);

            setShowModal(false); // Đóng modal sau khi thêm thành công
            setNewSection({ name: '', partNumber: newSection.partNumber + 1 }); // Reset form
            fetchSections();
            setToast({ type: 'success', message: 'Thêm thành công!' });
        } catch (error) {
            console.error('Lỗi khi lưu section mới', error);
            setToast({ type: 'error', message: `Thêm phần mới thất bại ${error.response.data.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateSection = async (sectionID, updatedData) => {
        setIsLoading(true);
        try {
            // Khi sửa, chỉ gửi name, phần còn lại giữ nguyên
            const currentSection = sections.find(section => section.id === sectionID);
            const updatedSection = {
                name: updatedData.name,      // Cập nhật name
                partNumber: currentSection.partNumber // Giữ nguyên partNumber
            };

            // Gọi API để cập nhật section
            await updateSection(sectionID, updatedSection);

            // Cập nhật lại danh sách sections sau khi sửa
            setSections(prevSections =>
                prevSections.map(section =>
                    section.id === sectionID ? { ...section, name: updatedData.name } : section
                )
            );

            // Đóng modal sau khi cập nhật thành công
            setShowModal(false);

            // Reset lại giá trị của editingSection để tránh tình trạng giữ dữ liệu cũ
            setEditingSection(null); // Nếu bạn đang lưu giữ thông tin của section đang sửa
            setToast({ type: 'success', message: 'Sửa thành công!' });
        } catch (error) {
            console.error('Lỗi khi sửa section', error);
            setToast({ type: 'error', message: 'Sửa thất bại!' });
        } finally {
            setIsLoading(false);
        }
    };


    // Xử lý xóa section
    const handleDeleteSection = async (sectionID) => {
        setIsLoading(true);
        try {
            await deleteSection(courseID, sectionID);
            setSections(prevSections => prevSections.filter(section => section.id !== sectionID));
            fetchSections();
            setToast({ type: 'success', message: 'Xóa thành công!' });
        } catch (error) {
            console.error('Lỗi khi xóa section', error);
            setToast({ type: 'error', message: `${error.response.data.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    // Xử lý xóa section
    const handleDeleteLesson = async (sectionID, lessonID) => {
        setIsLoading(true);
        try {
            await deleteLesson(sectionID, lessonID);
            setToast({ type: 'success', message: 'Xóa thành công!' });
            fetchSections();
        } catch (error) {
            console.error('Lỗi khi xóa section', error);
            setToast({ type: 'error', message: `${error.response.data.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    // Xử lý di chuyển section lên
    const moveUp = async (index) => {
        setIsLoading(true);
        if (index === 0) return; // Không thể di chuyển lên nếu đã ở đầu danh sách

        const updatedSections = [...sections];
        // Hoán đổi vị trí giữa section hiện tại và phần tử đứng trước nó
        [updatedSections[index], updatedSections[index - 1]] = [updatedSections[index - 1], updatedSections[index]];

        const section1 = updatedSections[index]; // Section hiện tại
        const section2 = updatedSections[index - 1]; // Section trước đó

        try {
            // Hoán đổi giá trị partNumber giữa 2 phần tử
            await updateSection(section1.id, { name: section1.name, partNumber: section2.partNumber });
            await updateSection(section2.id, { name: section2.name, partNumber: section1.partNumber });

            setSections(updatedSections); // Cập nhật lại danh sách sau khi thay đổi
            setToast({ type: 'success', message: 'Cập nhật ví trị thành công!' });
        } catch (error) {
            setToast({ type: 'error', message: `Lỗi khi cập nhật vị trí!${error.response.data.message}` });
            console.error('Lỗi khi di chuyển section lên', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Xử lý di chuyển section xuống (tương tự logic di chuyển lên)
    const moveDown = async (index) => {
        setIsLoading(true);
        if (index === sections.length - 1) return; // Không thể di chuyển xuống nếu đã ở cuối danh sách

        const updatedSections = [...sections];
        // Hoán đổi vị trí giữa section hiện tại và phần tử đứng sau nó
        [updatedSections[index], updatedSections[index + 1]] = [updatedSections[index + 1], updatedSections[index]];

        const section1 = updatedSections[index]; // Section hiện tại
        const section2 = updatedSections[index + 1]; // Section sau đó

        try {
            // Hoán đổi giá trị partNumber giữa 2 phần tử
            await updateSection(section1.id, { name: section1.name, partNumber: section2.partNumber });
            await updateSection(section2.id, { name: section2.name, partNumber: section1.partNumber });

            setSections(updatedSections); // Cập nhật lại danh sách sau khi thay đổi
            setToast({ type: 'success', message: 'Cập nhật ví trị thành công!' });
        } catch (error) {
            setToast({ type: 'error', message: 'Lỗi khi cập nhật vị trí!' });
            console.error('Lỗi khi di chuyển section xuống', error);
        } finally {
            setIsLoading(false);
        }
    };


    // Xử lý thoát modal
    const handleCloseModal = () => {
        setShowModal(false);
        setEditingSection(null); // Reset section đang sửa khi thoát modal
    };

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
            <div className={cx('section-manager')}>
                <h2>Chương trình giảng dạy</h2>

                {isLoading ? (
                    <div className={cx('df')}>
                        <Spinner message="Nhâm nhi cà phê trong khi chúng tôi thực hiện yêu cầu của bạn..." />
                    </div>
                ) : (
                    <div>
                        <button className={cx('button', 'custom')} onClick={handleAddSection}><span><FontAwesomeIcon icon={faPlus} /></span> Phần</button>
                        <ul className={cx('section-list')}>
                            {sections.map((section, index) => (
                                <li key={section.id} className={cx('section-item')}>
                                    <div className={cx('container-lesson')}>
                                        <div className={cx('header-title')}>
                                            <p>{`Phần ${index + 1}: `}</p>
                                            <p className={cx('section-name')}>{section.name}</p>
                                        </div>
                                        {/* Các nút chức năng của section */}
                                        <div className={cx('section-actions')}>
                                            <button className={cx('button-icon')} onClick={() => handleDeleteSection(section.id)}><span><FontAwesomeIcon icon={faTrash} /></span></button>
                                            <button className={cx('button-icon')} onClick={() => moveUp(index)}><span><FontAwesomeIcon icon={faUpLong} /></span></button>
                                            <button className={cx('button-icon')} onClick={() => moveDown(index)}><span><FontAwesomeIcon icon={faDownLong} /></span></button>
                                            <button
                                                className={cx('button-icon')}
                                                onClick={() => {
                                                    setEditingSection(section); // Chỉnh sửa section khi nhấn "Sửa"
                                                    setShowModal(true); // Mở modal
                                                }}
                                            >
                                                <span><FontAwesomeIcon icon={faFilePen} /></span>
                                            </button>
                                            {/* Nút Thêm Nội Dung */}
                                            <button
                                                className={cx('button')}
                                                onClick={() => handleAddContentMenuToggle(section.id)} // Khi nhấn vào, toggle menu cho section này
                                            >
                                                <span><FontAwesomeIcon icon={faPlus} /> Mục trong khung chương trình</span>
                                            </button>
                                            {/* Menu thêm nội dung chỉ hiển thị cho section đang được chọn */}
                                            {activeSectionId === section.id && showAddContentMenu && (
                                                <div className={cx('add-content-menu')}>
                                                    <button
                                                        className={cx('button')}
                                                        onClick={() => navigate(`/create/video/${section.id}?courseId=${courseID}`)}
                                                    >
                                                        Bài Giảng
                                                    </button>
                                                    <button
                                                        className={cx('button')}
                                                        onClick={() => navigate(`/create/exam/${section.id}?courseId=${courseID}`)}
                                                    >
                                                        Trắc Nghiệm
                                                    </button>
                                                    <button
                                                        className={cx('button')}
                                                        onClick={() => navigate(`/create/article/${section.id}?courseId=${courseID}`)}
                                                    >
                                                        Bài Viết
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hiển thị lessons trong section */}
                                    {section.lessons?.length > 0 && (
                                        <div className={cx('lessons-container')}>
                                            {section.lessons.map((lesson, index) => (
                                                <div key={lesson.id} className={cx('lesson-item')}>
                                                    {/* Hiển thị nội dung tương ứng với loại lesson */}
                                                    {lesson.type === "VIDEO" && (
                                                        <>
                                                            <div className={cx('lesson-video')}>
                                                                <div className={cx('div-outer')}>
                                                                    <p className={cx('lesson-name')}>{`Bài giảng ${index + 1}: ${lesson.name}`}</p>
                                                                    <div className={cx('lesson-actions')}>
                                                                        <button className={cx('button')} onClick={() => handleDeleteLesson(section.id, lesson.id)}>Xóa</button>
                                                                        <button
                                                                            className={cx('button')}
                                                                            onClick={() => {
                                                                                const encodedName = encodeURIComponent(lesson.name); // Mã hóa tên lesson
                                                                                navigate(`/edit/video/${section.id}?lessonId=${lesson.id}&typeId=${lesson.type_id}&courseId=${courseID}&name=${encodedName}`);
                                                                            }}
                                                                        >
                                                                            Sửa
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p>Loại bài giảng: Video</p>
                                                                <p>Thời lượng: {lesson.video ? lesson.video.duration : 'N/A'} giây</p>
                                                                <a href={lesson.video ? lesson.video.videoUrl : '#'} target="_blank" rel="noopener noreferrer">
                                                                    {lesson.video ? 'Xem Video' : 'Chưa có video'}
                                                                </a>
                                                            </div>
                                                        </>
                                                    )}
                                                    {lesson.type === "ARTICLE" && (
                                                        <>
                                                            <div className={cx('lesson-video')}>
                                                                <div className={cx('div-outer')}>
                                                                    <p className={cx('lesson-name')}>{`Bài giảng ${index + 1}: ${lesson.name}`}</p>
                                                                    <div className={cx('lesson-actions')}>
                                                                        <button className={cx('button')} onClick={() => handleDeleteLesson(section.id, lesson.id)}>Xóa</button>
                                                                        <button
                                                                            className={cx('button')}
                                                                            onClick={() => {
                                                                                const encodedName = encodeURIComponent(lesson.name); // Mã hóa tên lesson
                                                                                navigate(`/edit/article/${section.id}?lessonId=${lesson.id}&typeId=${lesson.type_id}&courseId=${courseID}&name=${encodedName}`);
                                                                            }}
                                                                        >
                                                                            Sửa
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p>Loại bài giảng: Bài viết</p>
                                                            </div>
                                                        </>
                                                    )}
                                                    {lesson.type === "EXAM" && (
                                                        <>
                                                            <div className={cx('lesson-video')}>
                                                                <div className={cx('div-outer')}>
                                                                    <p className={cx('lesson-name')} dangerouslySetInnerHTML={{ __html: `Bài giảng ${index + 1}: ${lesson.name}` }} />
                                                                    <div className={cx('lesson-actions')}>
                                                                        <button className={cx('button')} onClick={() => handleDeleteLesson(section.id, lesson.id)}>Xóa</button>
                                                                        <button
                                                                            className={cx('button')}
                                                                            onClick={() => {
                                                                                const encodedName = encodeURIComponent(lesson.name); // Mã hóa tên lesson
                                                                                navigate(`/edit/exam/${section.id}?lessonId=${lesson.id}&typeId=${lesson.type_id}&courseId=${courseID}&name=${encodedName}`);
                                                                            }}
                                                                        >
                                                                            Sửa
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p>Loại bài giảng: Trắc nghiệm</p>
                                                                <p className={cx('lesson-title')} dangerouslySetInnerHTML={{ __html: `Tiêu đề: ${lesson.exam.title} ` }} />
                                                                <p className={cx('lesson-subtitle')} dangerouslySetInnerHTML={{ __html: `Tiêu đề phụ: ${lesson.exam.subTitle}` }} />

                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* // Modal tạo hoặc sửa section */}
                {showModal && (
                    <div className={cx('modal')}>
                        <div className={cx('modal-content')}>
                            <h3>{editingSection ? 'Sửa ' : 'Thêm '}</h3>
                            <input
                                className={cx('input-field')}
                                type="text"
                                placeholder="Nhập tên"
                                value={editingSection ? editingSection.name : newSection.name}
                                onChange={(e) => {
                                    if (editingSection) {
                                        setEditingSection({ ...editingSection, name: e.target.value });
                                    } else {
                                        setNewSection({ ...newSection, name: e.target.value });
                                    }
                                }}
                            />
                            <button
                                className={cx('button')}
                                onClick={editingSection ? () => handleUpdateSection(editingSection.id, { name: editingSection.name }) : handleSaveNewSection}
                            >
                                {editingSection ? 'Cập nhật' : 'Lưu'}
                            </button>
                            <button className={cx('button')} onClick={handleCloseModal}>Hủy</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SectionManager;
