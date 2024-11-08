import classNames from "classnames/bind";
import styles from "./CourseDetail.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faEarth,
    faCircleInfo,
    faMedal,
    faHeart,
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
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import CourseContent from "~/components/CourseContent";
import Comments from "~/layouts/components/Comments";
import CourseItem from "~/components/CourseItem";
import ContentBlock from "~/layouts/components/ContentBlock";
import ScrollToTopButton from "~/components/ScrollToTopButton";

const cx = classNames.bind(styles)

const courses = [
    {
        id: 1,
        name: "C++ Cơ bản dành cho người mới học lập trình",
        author: "CNG_03",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "https://9anime.vn/wp-content/uploads/2024/08/1722760791_326_101-Hinh-anh-gai-xinh-Trung-Quoc-dep-nhat-hien.jpg",
    },
    {
        id: 1,
        name: "Tán gái sao cho đúng cách👉",
        author: "CNG_03",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "https://i.pinimg.com/736x/a2/6b/10/a26b1015d12d2198fe8a1fdc036c7396.jpg",
    },
    {
        id: 1,
        name: "Cách đấm thằng Huân vỡ mồm👊",
        author: "CNG_03",
        rate: 4.2,
        count: 852,
        price: "1.299.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMH2WvBZyFYl1PahUDgamQWXJ3Z1_oE_eOu9i41KZC64IVpd00OlbWYsqq8jKoqtH1ptc&usqp=CAU",
    }
]

const listContent = [
    "System Admin or Systems Engineer who wants to understand the basic infrastructure of the modern micro-services architecture. Container based infrastructure is complicated but with a good foundation, the journey will be shortened and so much interesting.",
    "System Admin",
    "Systems Engineer",
    "Security Engineer",
    "Developer who wants to understand the infrastructure stuff"
];

const requiredContent = [
    "Basic Linux",
    "Basic Networking",
    "Passion in IT in general",
];

const courseContent = ["Docker Engine", "Docker Engine", "Docker objects like Network, Volume, Image", "Container Management", "Image Management", "Docker Swarm", "Kubernetes", "Networking in Docker", "Volume Management"];


function CourseDetail() {
    return (
        <>
            <ScrollToTopButton />
            <div className={cx('top-container', 'dark-bg')}>
                <div className={cx('bg-inner', 'position-container')}>
                    <div className={cx('child-content', 'mw-7')}>
                        <h1 className={cx('clp-lead')}>Thành thạo Docker - Kubernetes trong 8 giờ - 2024</h1>

                        <div className={cx('mb-2', 'fs-18')}>
                            8 giờ học hiệu quả với 9 bài tập, 45 video thực hành và 50 video bài giảng
                        </div>

                        <div className={cx('element-row', 'clp-lead')}>
                            <span className={cx('star')}>4.6</span>
                            <span className={cx('star')}><FontAwesomeIcon icon={faStar} /></span>
                            <a href="#comments">
                                <span>(222 xếp hạng)</span>
                            </a>
                            <span>961 học viên</span>
                        </div>

                        <div className={cx('clp-lead')}>
                            <span>Được tạo bởi</span>
                            <Link className={cx('link-author')} to="/">CNG 03</Link>
                        </div>

                        <div className={cx('element-row-spec')}>
                            <div className={cx('element-row')}>
                                <FontAwesomeIcon icon={faCircleInfo} />
                                <span>Lần cập nhật gần đây nhất 1/2024</span>
                            </div>
                            <div className={cx('element-row')}>
                                <FontAwesomeIcon icon={faEarth} />
                                <span> Vietnamese</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('child-content', 'video-trailer')}>
                        <div className={cx('sidebar-container')}>
                            <img
                                src="https://pxdar.com/wp-content/uploads/2024/05/cute-girl-wallpaper-680x1024.jpg"
                                alt="Khóa học"
                                className={cx('course-image')}
                            />
                            <div className={cx('overlay')}></div>
                            <div className={cx('play-button')}>▶</div>
                        </div>


                        <div className={cx('sidebar-container-bottom', 'parent-container')}>
                            <div className={cx('child')}>
                                <span className={cx('price-title')}>₫ 2.199.000</span>
                            </div>

                            <div className={cx('child')}>
                                <div className={cx('wishList')}>
                                    <div className={cx('button-card')}>
                                        <button className={cx('btn-cd')}>Thêm vào giỏ hàng </button>
                                    </div>
                                    <div className={cx('heart')}>
                                        <button className={cx('heart-btn')}><FontAwesomeIcon icon={faHeartRegular} /></button>
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
                    <ContentBlock title="Nội dung bài học" content={courseContent} type="block" />

                    <div>
                        <CourseContent />
                    </div>

                    <ContentBlock
                        title="Yêu cầu"
                        content={requiredContent}
                        type="list"
                    />

                    <ContentBlock
                        title="Mô tả"
                        content="Hiện nay, xu hướng phát triển và đóng gói ứng dụng đang chuyển sang dạng containerized hay micro-service đang ngày càng phổ biến hơn nhờ khả năng linh hoạt và triển khai dễ dàng trên multi-cloud. Trong đó, thành phần nền tảng cho container là Docker với rất nhiều cấu phần và đối tượng quản lý từ container, network, volume, image trên một node cho đến những mô hình triển khai phức tạp hơn như cluster. Bên cạnh đó, với nhu cầu vận hành container trong môi trường production và multi-cloud, sự ra đời của các orchestrator như Swarm, Kubernetes (K8S) làm hoàn thiện hơn quá trình ứng dụng Container, nhưng cũng mang lại thêm nhiều kiến thức và quy trình phức tạp khác mà các SysAdmin và Systems Engineer cần học. Khóa học Docker trong 8 giờ sẽ giúp các bạn làm SysAdmin, Developers và Systems Engineer đã có background IT và muốn nhanh chóng nắm bắt được công nghệ ứng dụng của Docker và Kubernetes. Khóa học với 9 bài tập về nhà, hàng chục bài thực hành, cùng các video bài giảng sẽ giúp các bạn nắm vững kiến thức nhanh chóng và thành thạo bộ CLI điều khiển Docker và Kubernetes."
                        type="text"
                    />

                    <ContentBlock
                        title="Đối tượng của khóa học này:"
                        content={listContent}
                        type="list"
                    />

                    <div className={cx('instructor-container')}>
                        <h2>Giảng viên</h2>
                        <Link>CNG 03</Link>
                        <span>CCIE, CISSP, GCP-ACE, AWSx2, PCNSE, PCSAE, ZTX</span>
                        <div className={cx('instructor-profile')}>
                            <div>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrV4mhUxwx3r2YPSfhBG8875OUhID4ZBs9A&s"></img>
                            </div>

                            <div className={cx('instructor-stats')}>
                                <p><FontAwesomeIcon icon={faStar} />4,5 xếp hạng giảng viên</p>
                                <p><FontAwesomeIcon icon={faMedal} />314 đánh giá</p>
                                <p><FontAwesomeIcon icon={faUserGroup} />1138 học viên</p>
                                <p><FontAwesomeIcon icon={faCirclePlay} />2 khóa học</p>
                            </div>
                        </div>
                        <div className={cx('instructor-description')}>
                            <p>CNG03 is an Australian based, enthusiasm, hands-on oriented Systems Engineer, who has been working for Network and Security vendors for more than 13 years. He has knowledge and experience in the Networking, Information Security, Public Cloud, SOC, IT Automation fields and contributes a lot to the Vietnamese IT community.</p>
                            <p>He is also an instructor who helped hundreds of students achieve their CCNA, CCNP, CISSP, AWS certifications.</p>
                        </div>
                    </div>

                    <div id="comments">
                        {/* comments */}
                        <Comments />
                    </div>

                    <div className={cx('mb-2')}>
                        <h2>Các khóa học khác của <Link className={cx('author-related')}>CNG{':>'}03</Link></h2>
                        <div className={cx('course-related')}>
                            {courses.map(course => (
                                <CourseItem key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseDetail;