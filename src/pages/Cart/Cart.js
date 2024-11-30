import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./Cart.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import CheckoutCourseCard from "~/components/Cards/CheckoutCourseCard";
import { getCart, getWishList, moveToWishList as mtl, moveToCart as mtc, deleteCart, deleteWishList } from "~/services/payment/payment";
import Spinner from "~/utils/Spinner";
import ToastMessage from "~/utils/ToastMessage";
import images from "~/assets/images";

const cx = classNames.bind(styles)

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [isLoading, setIsLoading] = useState(true);

    const [wishlistItems, setWishlistItems] = useState([]);
    // Hàm lấy dữ liệu khi component được mount
    const fetchData = async () => {
        try {

            // Lấy dữ liệu wishList và cart đồng thời
            const wishListData = await getWishList();
            const cartData = await getCart();
            setWishlistItems(wishListData.result.wishList); // Lưu dữ liệu wishlist vào state
            setCartItems(cartData.result.cart); // Lưu dữ liệu cart vào state
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

    const navigate = useNavigate();

    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    // Các hàm xử lý hành động
    const removeFromCart = async (id) => {
        setIsLoading(true);
        try {
            // setCartItems(cartItems.filter((item) => item.id !== id));
            // Call API để xóa khóa học khỏi giỏ hàng
            // API call: DELETE /cart/{id}
            const response = await deleteCart(id); // Gọi API
            console.log(response); // Lưu danh sách khóa học từ response.result
        } catch (error) {
            console.error('Lỗi khi xóa:', error);
            setToast({ type: 'error', message: `${error.message}` });
        } finally {
            fetchData();
            setIsLoading(false);
        }
    };

    const moveToWishlist = async (id) => {
        setIsLoading(true);
        try {
            const response = await mtl(id); // Gọi API
            // const itemToMove = cartItems.find((item) => item.id === id);
            // if (itemToMove) {
            //     setCartItems(cartItems.filter((item) => item.id !== id));
            //     setWishlistItems([...wishlistItems, itemToMove]);

            // }
            console.log(response); // Lưu danh sách khóa học từ response.result
        } catch (error) {
            console.error('Lỗi khi di chuyển:', error);
            setToast({ type: 'error', message: `${error.message}` });
        } finally {
            fetchData();
            setIsLoading(false);
        }
    };

    const moveToCart = async (id) => {
        setIsLoading(true);
        try {
            // const itemToMove = wishlistItems.find((item) => item.id === id);
            // if (itemToMove) {
            //     setWishlistItems(wishlistItems.filter((item) => item.id !== id));
            //     setCartItems([...cartItems, itemToMove]);
            //     // Call API để chuyển khóa học từ danh sách mong ước vào giỏ hàng
            //     // API call: POST /cart { itemToMove }
            // }
            const response = await mtc(id); // Gọi API
            console.log(response); // Lưu danh sách khóa học từ response.result
        } catch (error) {
            console.error('Lỗi khi di chuyển:', error);
            setToast({ type: 'error', message: `${error.message}` });
        } finally {
            fetchData();
            setIsLoading(false);
        }
    };

    const removeFromWishlist = async (id) => {
        setIsLoading(true);
        try {
            // setWishlistItems(wishlistItems.filter((item) => item.id !== id));
            // Call API để xóa khóa học khỏi danh sách mong ước
            // API call: DELETE /wishlist/{id}
            const response = await deleteWishList(id); // Gọi API
            console.log(response); // Lưu danh sách khóa học từ response.result
        } catch (error) {
            console.error('Lỗi khi xóa:', error);
            setToast({ type: 'error', message: `${error.message}` });
        } finally {
            fetchData();
            setIsLoading(false);
        }
    };

    const totalOriginalPrice = cartItems.reduce((total, item) => total + item.price, 0);

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
            <div className={cx('cart-container')}>
                <div className={cx('cart-content')}>
                    <h2 className={cx('cart-title')}>Giỏ hàng</h2>
                    {cartItems.length > 0 ? (
                        <>
                            <p className={cx('cart-subtitle')}>{cartItems.length} khóa học trong giỏ hàng</p>
                            {cartItems.map((course) => (
                                <div key={course.id} className={cx('course-item')}>
                                    <img src={course.image} alt={course.title} className={cx('course-image')} />
                                    <div className={cx('course-info')}
                                        onClick={() => handleCourseClick(course.courseId)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <h3 className={cx('course-title')}>{course.courseName}</h3>
                                        <p className={cx('course-author')}>Bởi {course.instructorName}</p>
                                    </div>
                                    <div className={cx('course-price')}>
                                        <p className={cx('discounted-price')}>đ {course.price.toLocaleString()} <span><FontAwesomeIcon icon={faTag} /></span></p>
                                        <button className={cx('remove-button')} onClick={() => removeFromCart(course.courseId)}>Xóa</button>
                                        <button className={cx('move-to-wishlist')} onClick={() => moveToWishlist(course.courseId)}>Chuyển về danh sách mong ước</button>
                                    </div>
                                </div>
                            ))}

                            {wishlistItems.map((course) => (
                                <>
                                    <h3 className={cx('wishlist-title')}>Gần đây được thêm vào danh sách mong ước</h3>
                                    <div key={course.id} className={cx('wishlist-item')}>
                                        <img src={course.image} alt={course.title} className={cx('course-image')} />
                                        <div className={cx('course-info')}
                                            onClick={() => handleCourseClick(course.courseId)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <h3 className={cx('course-title')}>{course.courseName}</h3>
                                            <p className={cx('course-author')}>Bởi {course.instructorName}</p>

                                        </div>
                                        <div className={cx('course-price')}>
                                            <p className={cx('discounted-price')}>đ {course.price.toLocaleString()} <span><FontAwesomeIcon icon={faTag} /></span></p>
                                            <button className={cx('move-to-cart-button')} onClick={() => moveToCart(course.courseId)}>Chuyển vào giỏ hàng</button>
                                            <button className={cx('remove-wishlist-button')} onClick={() => removeFromWishlist(course.courseId)}>Xóa</button>
                                        </div>
                                    </div>
                                </>

                            ))}
                        </>
                    ) : (
                        <>
                            <p className={cx('empty-cart-message')}>0 khóa học trong giỏ hàng</p>
                            <div className={cx('img-emptyCart')}>
                                <img src={images.emptyCartImg} alt="Huynh Thanh Thao anh yeu em" />
                                <p className={cx('empty-cart-message1')}>Giỏ hàng của bạn đang trống. Hãy tiếp tục mua sắm để tìm một khóa học!</p>
                                <button className={cx('checkout-button')}>Tiếp tục mua sắm</button>
                            </div>
                            <h3 className={cx('wishlist-title')}>Gần đây được thêm vào danh sách mong ước</h3>
                            {wishlistItems.map((course) => (
                                <div key={course.id} className={cx('wishlist-item')}>
                                    <img src={course.image} alt={course.title} className={cx('course-image')} />
                                    <div className={cx('course-info')}>
                                        <h3 className={cx('course-title')}>{course.courseName}</h3>
                                        <p className={cx('course-author')}>Bởi {course.instructorName}</p>
                                    </div>
                                    <div className={cx('course-price')}>
                                        <p className={cx('discounted-price')}>đ {course.price.toLocaleString()}</p>
                                        <button className={cx('move-to-cart-button')} onClick={() => moveToCart(course.courseId)}>Chuyển vào giỏ hàng</button>
                                        <button className={cx('remove-wishlist-button')} onClick={() => removeFromWishlist(course.courseId)}>Xóa</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <CheckoutCourseCard
                        price={totalOriginalPrice}
                        setIsLoading={setIsLoading}
                        setToast={setToast}
                    />
                )}
            </div>
        </>
    );
};

export default Cart;