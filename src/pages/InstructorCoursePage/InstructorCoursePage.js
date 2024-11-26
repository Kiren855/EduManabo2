import { useState, useEffect } from "react";
import css from "./InstructorCoursePage.module.scss";
import Spinner from "~/utils/Spinner";
import { getListCourses } from "~/services/createCourse/courseService";

import images from "~/assets/images";

import InstructorCoursesDisplay from "~/components/InstructorCoursesDisplay";
import ParaCard from "~/components/Cards/ParaCard";
import SmallNaviCard from "~/components/Cards/SmallNaviCard";
import SearchBar2 from "~/components/Nav/SearchBar2";
import VerticalCourseDraftCard from "~/components/Cards/VerticalCourseDraftCard";
import SelectDropdownUtil from "~/utils/SelectDropdownUtil";
import Button1 from "~/components/Button1";
import ToastMessage from "~/utils/ToastMessage";

const InstructorCoursePage = () => {
    const [courses, setCourses] = useState([]); // Dữ liệu danh sách khóa học
    const [loading, setLoading] = useState(true); // Trạng thái đang tải dữ liệu
    const [error, setError] = useState(null); // Trạng thái lỗi
    const [toast, setToast] = useState(null); // Quản lý thông báo

    // const [courses, setCourses] = useState([{}]);
    const [searchBar, setSearchBar] = useState("");
    const [dropdownFilter, setDropdownFilter] = useState({
        filter1: "",
    });

    useEffect(() => {
        // Hàm gọi API và xử lý kết quả
        const fetchCourses = async () => {
            setLoading(true); // Hiển thị spinner khi bắt đầu load
            setError(null); // Reset lỗi
            try {
                const result = await getListCourses(); // Gọi API để lấy danh sách khóa học
                console.log(result)
                setCourses(result); // Lưu kết quả vào state
                setToast({ type: 'success', message: 'Tải dữ liệu thành công' });
            } catch (err) {
                setToast({ type: 'error', message: err.message || 'Lỗi không xác định' });
                setError(err.message || 'Đã xảy ra lỗi'); // Lưu thông tin lỗi vào state
            } finally {
                setLoading(false); // Tắt spinner
            }
        };

        fetchCourses(); // Gọi hàm lấy dữ liệu khi component mount
    }, []);

    const filterOptions = [
        {
            key: "Mới nhất",
            value: "newest",
        },
        {
            key: "Cũ nhất",
            value: "oldest",
        },
        {
            key: "A-Z",
            value: "a-z",
        },
        {
            key: "Z-A",
            value: "z-a",
        },
    ];

    let commonContent = (
        <>
            <div className={css.plainTxt}>
                Dựa trên trải nghiệm của bạn, chúng tôi nghĩ rằng những tài nguyên này sẽ hữu ích.
            </div>
            <div className={css.box1}>
                <ParaCard
                    imgSrc={images.showcase1}
                    ttl="Tạo khóa học thu hút"
                    cnt="Dù đã giảng dạy nhiều năm hay mới dạy lần đầu, bạn vẫn có thể tạo nên một khóa học hấp dẫn. Chúng tôi đã biên soạn các tài nguyên và phương pháp hay nhất để giúp bạn tiến bộ, bất kể vạch xuất phát của bạn ở đâu."
                    btnTxt="Bắt đầu"
                    btnLink="#"
                />
            </div>

            <div className={css.box1}>
                <ParaCard
                    imgSrc={images.showcase2}
                    ttl="Bắt đầu tạo video"
                    cnt="Bài giảng video chất lượng có thể giúp khóa học của bạn trở nên khác biệt. Hãy sử dụng tài nguyên của chúng tôi để tìm hiểu thông tin cơ bản."
                    btnTxt="Bắt đầu"
                    btnLink="#"
                />
                <ParaCard
                    imgSrc={images.showcase3}
                    ttl="Xây dựng đội ngũ học viên của bạn"
                    cnt="Mang lại thành công cho khóa học của bạn bằng cách xây dựng đội ngũ học viên."
                    btnTxt="Bắt đầu"
                    btnLink="#"
                />
            </div>
            <div className={css.plainTxt}>
                Bạn có câu hỏi? Sau đây là các tài nguyên hướng dẫn phổ biến nhất của chúng tôi.
            </div>
            <div className={css.box2}>
                <SmallNaviCard
                    icon={images.tvIcon}
                    ttl="Video thử nghiệm"
                    desc="Gửi cho chúng tôi video mẫu và nhận ý kiến phản hồi từ chuyên gia."
                    link="#"
                />
                <SmallNaviCard
                    icon={images.chatIcon}
                    ttl="Cộng đồng giảng viên"
                    desc="Kết nối với những giảng viên giàu kinh nghiệm. Đặt câu hỏi, duyệt qua thảo luận và hơn thế nữa."
                    link="#"
                />
                <SmallNaviCard
                    icon={images.teachIcon}
                    ttl="Teaching Center"
                    desc="Tìm hiểu về các phương pháp giảng dạy hay nhất trên Udemy."
                    link="#"
                />
                <SmallNaviCard
                    icon={images.analyticsIcon}
                    ttl="Thông tin chi tiết về thị trường"
                    desc="Xác định chủ đề khóa học của bạn bằng cách khám phá lượng cung và cầu trên thị trường Udemy."
                    link="#"
                />
                <SmallNaviCard
                    icon={images.helpWebIcon}
                    ttl="Trợ giúp và Hỗ trợ"
                    desc="Duyệt qua Trung tâm trợ giúp hoặc liên hệ với nhóm Hỗ trợ của chúng tôi."
                    link="#"
                />
            </div>
            <div className={css.box3}>
                <p className={css.txt}>Bạn đã sẵn sàng để bắt đầu chưa?</p>
                <Button1
                    txt="Tạo khóa học của bạn"
                    link="/courses/create"
                    color="var(--white)"
                    bck="var(--purple)"
                    hovBck="var(--purple-dark)"
                    extraCss={{
                        border: "none",
                        padding: "0.5rem 2rem",
                    }}
                />
            </div>
        </>
    );
    let topContent = <InstructorCoursesDisplay />;

    const setSearchBarHandler = (e) => {
        setSearchBar(e.target.value || "");
    };
    const searchHandler = () => { };

    if (courses?.length > 0) {
        topContent = (
            <>
                <h2 className={css.ttl}>Khóa học</h2>
                <div className={css.topNav}>
                    <div className={css.left}>
                        <SearchBar2
                            searchBar={searchBar}
                            setSearchBar={setSearchBarHandler}
                            searchHandler={searchHandler}
                            placeholder="Tìm kiếm khóa học của bạn"
                        />
                        <SelectDropdownUtil
                            id="filter1"
                            filterType="filter1"
                            defaultValue={filterOptions[0]}
                            value={dropdownFilter.filter1}
                            setValue={setDropdownFilter}
                            multipleOptions={false}
                            options={filterOptions}
                            selectBoxCss={{ height: "auto" }}
                        />
                    </div>
                    <div className={css.right}>
                        <Button1
                            txt="Khóa học mới"
                            link="/courses/create"
                            color="var(--white)"
                            bck="var(--purple)"
                            hovBck="var(--purple-dark)"
                            extraCss={{
                                border: "none",
                                padding: "0.5rem 1rem",
                            }}
                        />
                    </div>
                </div>
            </>
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

            {/* Hiển thị spinner khi đang load */}
            {loading &&
                (
                    <div className={css.container}>
                        <div className={css.spinner}>
                            <Spinner message="Đang lấy danh sách khóa học của bạn..." />
                        </div>
                    </div>
                )
            }
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
            {!loading && !error && (
                <>
                    {topContent}
                    <div className={css.coursesBox}>
                        <VerticalCourseDraftCard courses={courses} />
                    </div>
                    {commonContent}
                    {/* Hiển thị ToastMessage */}
                    {toast && (
                        <ToastMessage
                            type={toast.type}
                            message={toast.message}
                            onClose={() => setToast(null)}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default InstructorCoursePage;
