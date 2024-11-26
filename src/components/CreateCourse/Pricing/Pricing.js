import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Spinner from '~/utils/Spinner';
import ToastMessage from '~/utils/ToastMessage';
import styles from './Pricing.module.scss';
import { prices } from './priceData';
import { getPrice, updatePrice } from '~/services/createCourse/courseService';

const cx = classNames.bind(styles);

const Pricing = () => {
    const { courseID } = useParams(); // Lấy courseID từ URL
    const [selectedPrice, setSelectedPrice] = useState('');
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null); // Quản lý thông báo

    // Hàm xử lý thay đổi giá
    const handleChange = (field, value) => {
        if (field === 'price') {
            setSelectedPrice(value);
        }
    };

    // Hàm xử lý lưu dữ liệu
    const handleSave = async () => {
        try {
            await updatePrice(courseID, selectedPrice);
            setToast({ type: 'success', message: 'Cập nhật thành công!' });
        } catch (error) {
            setToast({ type: 'error', message: 'Cập nhật dữ liệu thất bại!' });
        }
    };

    // Fetch dữ liệu giá khi component được mount
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const data = await getPrice(courseID);
                const currentPrice = data.result?.price || null; // Giả sử API trả về result chứa giá
                setSelectedPrice(currentPrice);
                setLoading(false);
            } catch (error) {
                setToast({ type: 'error', message: 'Lấy dữ liệu thất bại! Vui lòng thử lại!' });
                setLoading(false);
            }
        };

        fetchPrice();
    }, [courseID]);

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
            {loading ? (
                <div className={cx('container')}>
                    <div className={cx('spinner')}>
                        <Spinner message="Đợi một chút..." />
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <h2 className={cx('title')}>Định giá</h2>
                    <p className={cx('description')}>
                        Đặt giá cho khóa học của bạn. Vui lòng chọn đơn vị tiền tệ và mức giá cho khóa học của bạn. Nếu bạn muốn cung cấp
                        miễn phí khóa học của mình thì khóa học đó phải có tổng thời lượng video dưới 2 giờ. Ngoài ra, các khóa học có bài kiểm tra
                        thực hành không thể miễn phí.
                    </p>

                    {/* Lựa chọn mức giá */}
                    <div className={cx('form-group')}>
                        <label>
                            Mức giá <span className={cx('tag')}><FontAwesomeIcon icon={faTag} /></span>
                        </label>
                        <select
                            value={selectedPrice || ''}
                            onChange={(e) => handleChange('price', e.target.value)}
                            className={cx('select')}
                            disabled={loading}
                        >
                            <option value="">Chọn mức giá</option>
                            {prices.map((price, index) => (
                                <option key={index} value={price.price}>
                                    {price.values}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nút lưu */}
                    <button className={cx('save-button')} onClick={handleSave} disabled={loading || !selectedPrice}>
                        Lưu
                    </button>
                </div>
            )}
        </>
    );
};

export default Pricing;
