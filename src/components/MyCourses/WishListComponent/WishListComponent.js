import CourseCard from "~/components/Cards/CourseCard";
import InputUtil from "~/utils/InputUtil";
import { getWishList } from "~/services/payment/payment";
import Spinner from "~/utils/Spinner";
import ToastMessage from "~/utils/ToastMessage";
import { useState, useEffect } from "react";
import images from "~/assets/images";

import css from "./WishListComponent.module.scss";

const WishListComponent = () => {
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    const fetchData = async () => {
        try {

            // Lấy dữ liệu wishList và cart đồng thời
            const courseData = await getWishList();
            console.log(courseData.result.wishList)
            setCourses(courseData.result.wishList);
            setToast({ type: 'success', message: `Lấy dữ liệu thành công!` });
        } catch (err) {
            console.error(err); // Log lỗi nếu có
            setToast({ type: 'error', message: `${err.response.data.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        fetchData(); // Gọi hàm lấy dữ liệu khi component mount
    }, []);

    if (isLoading) {
        return (
            <div className={css.df}>
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
            <div className={css.outerDiv}>
                <div className={css.topBAR}>
                    <div className={css.searchBar}>
                        <InputUtil
                            icon={images.searchIcon}
                            iconPosition="right"
                            placeholderTxt="Search my courses"
                            extraCss={{ padding: "0.3rem", fontSize: "1rem" }}
                        />
                    </div>
                </div>
                <div className={css.courses}>
                    {courses?.map((item, id) => {
                        return (
                            <CourseCard key={id} data={item} extraCss={{ margin: "1rem 0" }} />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default WishListComponent;
