import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CheckoutCourseCard.module.scss';

const cx = classNames.bind(styles);

const CheckoutCourseCard = ({ originalPrice, discountPrice, }) => {
    const [coupon, setCoupon] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const handleApplyCoupon = () => {
        if (coupon) {
            setAppliedCoupon(coupon);
            setCoupon('');
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
    };

    return (
        <div className={cx('checkout')}>
            <div className={cx('total-section')}>
                <p className={cx('total-label')}>Tổng:</p>
                <p className={cx('total-price')}>đ {discountPrice.toLocaleString()}</p>
                <p className={cx('original-price')}>đ {originalPrice.toLocaleString()}</p>
                <p className={cx('discount-percent')}>
                    Giảm {Math.round((1 - discountPrice / originalPrice) * 100)}%
                </p>
                <button className={cx('checkout-button')}>Thanh toán</button>
            </div>

            <div className={cx('coupon-section')}>
                <p className={cx('coupon-label')}>Khuyến mại</p>
                {appliedCoupon ? (
                    <div className={cx('applied-coupon')}>
                        <p>Đã áp dụng <b>{appliedCoupon}</b></p>
                        <p>Coupon của Edumanabo</p>
                        <button className={cx('remove-coupon')} onClick={handleRemoveCoupon}>✕</button>
                    </div>
                ) : null}

                <div className={cx('coupon-input-section')}>
                    <input
                        type="text"
                        placeholder="Nhập coupon"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className={cx('coupon-input')}
                    />
                    <button className={cx('apply-button')} onClick={handleApplyCoupon}>Áp dụng</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCourseCard;
