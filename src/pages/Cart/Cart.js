import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import RecommendedVideos from "~/components/RecommendedVideos";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import CheckoutCourseCard from "~/components/Cards/CheckoutCourseCard";
import images from "~/assets/images";

const cx = classNames.bind(styles)

const Cart = () => {
    // Dữ liệu giả cho giỏ hàng và danh sách mong ước
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Algorithmic trading from A to Z using Python",
            author: "Bui Van Cong - CNG03 - System Admin",
            rating: 4.5,
            reviews: 92,
            hours: 6.5,
            lectures: 81,
            originalPrice: 949000,
            discountPrice: 299000,
            image: "https://i.pinimg.com/564x/87/48/57/87485702ad0035b0c98e799f4e2da041.jpg",
        },
        {
            id: 2,
            title: "Mastering Backtesting for Algorithmic Trading",
            author: "Bui Van Cong - CNG03 - System Admin",
            rating: 4.3,
            reviews: 49,
            hours: 10.5,
            lectures: 61,
            originalPrice: 1099000,
            discountPrice: 249000,
            image: "https://i.pinimg.com/564x/34/3d/e3/343de34c6fba1bfbdde82c9c5444b4d8.jpg",
        },
    ]);

    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 3,
            title: "Viết ứng dụng bán hàng với Java Springboot/API và Angular",
            author: "Bui Van Cong - CNG03 - System Admin",
            rating: 4.5,
            reviews: 325,
            hours: 24,
            lectures: 80,
            originalPrice: 1699000,
            discountPrice: 249000,
            image: "https://i.pinimg.com/564x/99/d2/89/99d28904112263382ef89537c11a0583.jpg",
        },
    ]);

    const navigate = useNavigate();

    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    // Các hàm xử lý hành động
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
        // Call API để xóa khóa học khỏi giỏ hàng
        // API call: DELETE /cart/{id}
    };

    const moveToWishlist = (id) => {
        const itemToMove = cartItems.find((item) => item.id === id);
        if (itemToMove) {
            setCartItems(cartItems.filter((item) => item.id !== id));
            setWishlistItems([...wishlistItems, itemToMove]);
            // Call API để chuyển khóa học từ giỏ hàng sang danh sách mong ước
            // API call: POST /wishlist { itemToMove }
        }
    };

    const moveToCart = (id) => {
        const itemToMove = wishlistItems.find((item) => item.id === id);
        if (itemToMove) {
            setWishlistItems(wishlistItems.filter((item) => item.id !== id));
            setCartItems([...cartItems, itemToMove]);
            // Call API để chuyển khóa học từ danh sách mong ước vào giỏ hàng
            // API call: POST /cart { itemToMove }
        }
    };

    const saveForLater = (id) => {
        const itemToSave = cartItems.find((item) => item.id === id);
        if (itemToSave) {
            setCartItems(cartItems.filter((item) => item.id !== id));
            setWishlistItems([...wishlistItems, itemToSave]);
            // Call API để lưu khóa học để mua sau
            // API call: PATCH /cart/{id} { savedForLater: true }
        }
    };

    const removeFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
        // Call API để xóa khóa học khỏi danh sách mong ước
        // API call: DELETE /wishlist/{id}
    };

    const totalOriginalPrice = cartItems.reduce((total, item) => total + item.originalPrice, 0);
    const totalDiscountPrice = cartItems.reduce((total, item) => total + item.discountPrice, 0);

    return (
        <>
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
                                        onClick={() => handleCourseClick(course.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <h3 className={cx('course-title')}>{course.title}</h3>
                                        <p className={cx('course-author')}>Bởi {course.author}</p>
                                        <p className={cx('course-rating')}>
                                            {course.rating} ★ ({course.reviews} xếp hạng)
                                        </p>
                                        <p className={cx('course-details')}>
                                            Tổng số {course.hours} giờ • {course.lectures} bài giảng
                                        </p>
                                    </div>
                                    <div className={cx('course-price')}>
                                        <p className={cx('discounted-price')}>đ {course.discountPrice.toLocaleString()} <span><FontAwesomeIcon icon={faTag} /></span></p>
                                        <p className={cx('original-price')}>đ {course.originalPrice.toLocaleString()}</p>
                                        <button className={cx('wishlist-button')} onClick={() => saveForLater(course.id)}>Lưu để mua sau</button>
                                        <button className={cx('remove-button')} onClick={() => removeFromCart(course.id)}>Xóa</button>
                                        <button className={cx('move-to-wishlist')} onClick={() => moveToWishlist(course.id)}>Chuyển về danh sách mong ước</button>
                                    </div>
                                </div>
                            ))}

                            {wishlistItems.map((course) => (
                                <>
                                    <h3 className={cx('wishlist-title')}>Gần đây được thêm vào danh sách mong ước</h3>
                                    <div key={course.id} className={cx('wishlist-item')}>
                                        <img src={course.image} alt={course.title} className={cx('course-image')} />
                                        <div className={cx('course-info')}
                                            onClick={() => handleCourseClick(course.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <h3 className={cx('course-title')}>{course.title}</h3>
                                            <p className={cx('course-author')}>Bởi {course.author}</p>
                                            <p className={cx('course-rating')}>
                                                {course.rating} ★ ({course.reviews} xếp hạng)
                                            </p>
                                            <p className={cx('course-details')}>
                                                Tổng số {course.hours} giờ • {course.lectures} bài giảng
                                            </p>

                                        </div>
                                        <div className={cx('course-price')}>
                                            <p className={cx('discounted-price')}>đ {course.discountPrice.toLocaleString()} <span><FontAwesomeIcon icon={faTag} /></span></p>
                                            <p className={cx('original-price')}>đ {course.originalPrice.toLocaleString()}</p>
                                            <button className={cx('move-to-cart-button')} onClick={() => moveToCart(course.id)}>Chuyển vào giỏ hàng</button>
                                            <button className={cx('remove-wishlist-button')} onClick={() => removeFromWishlist(course.id)}>Xóa</button>
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
                                        <h3 className={cx('course-title')}>{course.title}</h3>
                                        <p className={cx('course-author')}>Bởi {course.author}</p>
                                        <p className={cx('course-rating')}>
                                            {course.rating} ★ ({course.reviews} xếp hạng)
                                        </p>
                                        <p className={cx('course-details')}>
                                            Tổng số {course.hours} giờ • {course.lectures} bài giảng
                                        </p>
                                    </div>
                                    <div className={cx('course-price')}>
                                        <p className={cx('discounted-price')}>đ {course.discountPrice.toLocaleString()}</p>
                                        <p className={cx('original-price')}>đ {course.originalPrice.toLocaleString()}</p>
                                        <button className={cx('move-to-cart-button')} onClick={() => moveToCart(course.id)}>Chuyển vào giỏ hàng</button>
                                        <button className={cx('remove-wishlist-button')} onClick={() => removeFromWishlist(course.id)}>Xóa</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <CheckoutCourseCard
                        originalPrice={totalOriginalPrice}
                        discountPrice={totalDiscountPrice}
                    />
                )}
            </div>
            <div className={cx('cart-container-v1')}>
                <RecommendedVideos title="Bạn cũng có thể thích" type="recommend" />
            </div>
        </>
    );
};

export default Cart;