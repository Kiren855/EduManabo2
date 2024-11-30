import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CheckoutCourseCard.module.scss';
import { orderPayment } from '~/services/payment/payment';

const cx = classNames.bind(styles);

const CheckoutCourseCard = ({ price, setIsLoading, setToast }) => {
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

    const payment = async () => {
        setIsLoading(true)
        try {
            const response = await orderPayment(); // Gọi API
            window.location.href = response.data.payload.payment.vnp_url;
        } catch (error) {
            console.error('Lỗi khi thanh toan:', error);
            setToast({ type: 'error', message: `${error.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cx('checkout')}>
            <div className={cx('total-section')}>
                <p className={cx('total-label')}>Tổng:</p>
                <p className={cx('total-price')}>đ {price.toLocaleString()}</p>
                <button onClick={payment} className={cx('checkout-button')}>Thanh toán</button>
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
