import classNames from "classnames/bind";
import styles from "./CourseDetail.module.scss";
import { Link } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faEarth,
    faCircleInfo,
    faMedal,
    faX,
    faUserGroup,
    faCirclePlay,
    faCircleQuestion,
    faFileLines,
    faFile,
    faCloudArrowDown,
    faMobileScreenButton,
    faInfinity,
    faAward
} from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import CourseContent from "~/components/CourseContent";
import Comments from "~/layouts/components/Comments";
// import CourseItem from "~/components/CourseItem";
import ContentBlock from "~/layouts/components/ContentBlock";
import { addToWishList, addToCart } from "~/services/payment/payment";
import { getPreview } from "~/services/createCourse/courseService";
import Spinner from "~/utils/Spinner";
import ToastMessage from "~/utils/ToastMessage";

import ScrollToTopButton from "~/components/ScrollToTopButton";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles)



function CourseDetail() {
    const { courseId } = useParams();
    const [course, setCourse] = useState();
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [isLoading, setIsLoading] = useState(true);


    const fetchData = async () => {
        try {
            // Lấy dữ liệu wishList và cart đồng thời
            const courseData = await getPreview(courseId);
            setCourse(courseData);
        } catch (err) {
            console.error(err); // Log lỗi nếu có
            setToast({ type: 'error', message: `${err.response.data.message}` });
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {

        fetchData(); // Gọi hàm lấy dữ liệu khi component mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (
            <div className={cx('df')}>
                <Spinner message="Nhâm nhi cà phê trong khi chúng tôi thực hiện yêu cầu của bạn..." />
            </div>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const formattedDate = moment(course.updatedAt).format('DD/MM/YYYY');

    const handleAddToWishList = async () => {
        setIsLoading(true);
        try {
            const data = {
                courseId: courseId,
                image: course.image,
                instructorName: course.instructorName,
                courseName: course.title,
                price: course.price
            };
            const response = await addToWishList(data); // Gọi API
            console.log(response); // Lưu danh sách khóa học từ response.result
            setToast({ type: 'success', message: `${response.message}` });
        } catch (error) {
            console.error('add to wish list error:', error);
            setToast({ type: 'error', message: `${error.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            const data = {
                courseId: courseId,
                image: course.image,
                instructorName: course.instructorName,
                courseName: course.title,
                price: course.price
            };
            const response = await addToCart(data); // Gọi API
            console.log(response); // Lưu danh sách khóa học từ response.result
            setToast({ type: 'success', message: `${response.message}` });
        } catch (error) {
            console.error('addtocart error:', error);
            setToast({ type: 'error', message: `${error.message}` });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <> {/* Hiển thị ToastMessage */}
            {toast && (
                <ToastMessage
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
            <ScrollToTopButton />
            <div className={cx('top-container', 'dark-bg')}>
                <div className={cx('bg-inner', 'position-container')}>
                    <div className={cx('child-content', 'mw-7')}>
                        <h1 className={cx('clp-lead')}>{course.title}</h1>

                        <div className={cx('mb-2', 'fs-18')}>
                            {course.subTitle}
                        </div>

                        <div className={cx('element-row', 'clp-lead')}>
                            <span className={cx('star')}>{course.rating}</span>
                            <span className={cx('star')}><FontAwesomeIcon icon={faStar} /></span>
                        </div>

                        <div className={cx('clp-lead')}>
                            <span>Được tạo bởi</span>
                            <Link className={cx('link-author')} to="/">{course.instructorName}</Link>
                        </div>

                        <div className={cx('element-row-spec')}>
                            <div className={cx('element-row')}>
                                <FontAwesomeIcon icon={faCircleInfo} />
                                <span>Lần cập nhật gần đây nhất {formattedDate}</span>
                            </div>
                            <div className={cx('element-row')}>
                                <FontAwesomeIcon icon={faEarth} />
                                <span> {course.language}</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('child-content', 'video-trailer')}>
                        <div className={cx('sidebar-container')}>
                            <img
                                src={course.image}
                                alt="Khóa học"
                                className={cx('course-image')}
                            />
                            <div className={cx('overlay')}></div>
                            <div className={cx('play-button')}>▶</div>
                        </div>


                        <div className={cx('sidebar-container-bottom', 'parent-container')}>
                            <div className={cx('child')}>
                                <span className={cx('price-title')}>{`Giá ${formatCurrency(course.price)}`}</span>
                            </div>

                            <div className={cx('child')}>
                                <div className={cx('wishList')}>
                                    <div className={cx('button-card')}>
                                        <button onClick={handleAddToCart} className={cx('btn-cd')}>Thêm vào giỏ hàng </button>
                                    </div>
                                    <div className={cx('heart')}>
                                        <button onClick={handleAddToWishList} className={cx('heart-btn')}><FontAwesomeIcon icon={faHeartRegular} /></button>
                                    </div>
                                </div>

                                <div className={cx('buy')}>
                                    <button className={cx('buy-btn')}>Mua ngay</button>
                                </div>

                                <div>
                                    <span className={cx('money-back')}>Đảm bảo hoàn tiền trong 30 ngày</span>
                                </div>
                            </div>

                            <div className={cx('child', 'course-content')}>
                                <h2>Khóa học này bao gồm:</h2>
                                <ul>
                                    <li><span className={cx('icon')}><FontAwesomeIcon icon={faCirclePlay} /></span>11 giờ video theo yêu cầu</li>
                                    <li><span className={cx('icon')}><FontAwesomeIcon icon={faCloudArrowDown} /></span>28 tài nguyên có thể tải xuống</li>
                                    <li><span className={cx('icon')}><FontAwesomeIcon icon={faCircleQuestion} /></span>1 bài kiểm tra thực hành</li>
                                    <li><span className={cx('icon')}><FontAwesomeIcon icon={faFileLines} /></span>Bài tập</li>
                                    <li><span className={cx('icon')}><FontAwesomeIcon icon={faFile} /></span>1 bài viết</li>
                                    <li><span className={cx('icon')}><FontAwesomeIcon icon={faMobileScreenButton} /></span>Truy cập trên thiết bị di động và TV</li>
                                    <li><span className={cx('icon')}><FontAwesomeIcon icon={faInfinity} /></span>Quyền truy cập đầy đủ suốt đời</li>
                                    <li><span className={cx('icon')}><FontAwesomeIcon icon={faAward} /></span>Giấy chứng nhận hoàn thành</li>
                                </ul>
                            </div>

                            <div className={cx('coupon-section', 'child')}>
                                <p className={cx('coupon-title')}>Áp dụng coupon</p>
                                <div className={cx('coupon-details')}>
                                    <div className={cx('coupon-info')}>
                                        <p>Đã áp dụng KEEPLEARNING</p>
                                        <p>Coupon của Edumanabo</p>
                                    </div>
                                    <div>
                                        <button className={cx('coupon-remove-btn')}>
                                            <FontAwesomeIcon icon={faX} />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <form className={cx('coupon-form')}>
                                        <input
                                            className={cx('coupon-input')}
                                            placeholder="Nhập coupon"
                                        />
                                        <button className={cx('coupon-apply-btn')}>
                                            Áp dụng
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('paid-course')}>
                <div className={cx('landing-page')}>
                    {/* <ContentBlock title="Nội dung bài học" content={courseContent} type="block" /> */}

                    <ContentBlock
                        title="Yêu cầu"
                        content={course.requirements}
                        type="list"
                    />
                    <div>
                        <CourseContent content={course.sections} />
                    </div>


                    <ContentBlock
                        title="Mô tả"
                        content={course.description}
                        type="text"
                    />

                    <ContentBlock
                        title="Đối tượng của khóa học này:"
                        content={course.targetAudiences}
                        type="list"
                    />

                    <div className={cx('instructor-container')}>
                        <h2>Giảng viên</h2>
                        <Link>{course.instructorName}</Link>
                        {/* <span>CCIE, CISSP, GCP-ACE, AWSx2, PCNSE, PCSAE, ZTX</span> */}
                        <div className={cx('instructor-profile')}>
                            <div>
                                <img alt="HTT" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrV4mhUxwx3r2YPSfhBG8875OUhID4ZBs9A&s"></img>
                            </div>

                            <div className={cx('instructor-stats')}>
                                <p><FontAwesomeIcon icon={faStar} />4,5 xếp hạng giảng viên</p>
                                <p><FontAwesomeIcon icon={faMedal} />314 đánh giá</p>
                                <p><FontAwesomeIcon icon={faUserGroup} />1138 học viên</p>
                                <p><FontAwesomeIcon icon={faCirclePlay} />2 khóa học</p>
                            </div>
                        </div>
                        {/* <div className={cx('instructor-description')}>
                            <p>CNG03 is an Australian based, enthusiasm, hands-on oriented Systems Engineer, who has been working for Network and Security vendors for more than 13 years. He has knowledge and experience in the Networking, Information Security, Public Cloud, SOC, IT Automation fields and contributes a lot to the Vietnamese IT community.</p>
                            <p>He is also an instructor who helped hundreds of students achieve their CCNA, CCNP, CISSP, AWS certifications.</p>
                        </div> */}
                    </div>

                    <div id="comments">
                        {/* comments */}
                        <Comments />
                    </div>

                    {/* <div className={cx('mb-2')}>
                        <h2>Các khóa học khác của <Link className={cx('author-related')}>CNG{':>'}03</Link></h2>
                        <div className={cx('course-related')}>
                            {courses.map(course => (
                                <CourseItem key={course.id} course={course} />
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default CourseDetail;