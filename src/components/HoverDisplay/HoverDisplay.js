import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './HoverDisplay.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import PopUp from '~/components/PopUp';



const cx = classNames.bind(styles);

// Component chung cho hiển thị khi di chuột
const HoverDisplay = ({ to, Content, hoverContent, children, linkHover, titleLinkHover, isIcon = false, itemCount = 0, notificationCount = 0, type = null }) => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null); // Sử dụng useRef để lưu trữ timeout
    const displayCount = itemCount > 99 ? "99+" : itemCount;
    const notifiCount = notificationCount > 99 ? "99+" : notificationCount;

    const handleMouseEnter = () => {
        // Xóa bất kỳ timeout nào trước đó khi di chuột vào
        clearTimeout(timeoutRef.current);
        setIsHovered(true); // Hiển thị ngay lập tức khi di chuột vào
    };

    const handleMouseLeave = () => {
        // Đặt timeout để trì hoãn việc ẩn khối
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 200); // Delay 200ms trước khi ẩn
    };

    // Xóa timeout khi component unmount
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className={cx('title-hover')}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Link to={to}>
                    <span className={isIcon ? cx('icon-hover-content') : cx('title-hover-content')}>{Content}</span>
                    {itemCount > 0 && (
                        <span className={cx('badge')}>
                            {displayCount}
                        </span>
                    )}
                    {notificationCount > 0 && (
                        <span className={cx('badge')}>
                            {notifiCount}
                        </span>
                    )}
                </Link>
                {children} {/* Nội dung bên trong thành phần */}
            </div>

            {isHovered && (
                <div
                    onMouseEnter={handleMouseEnter} // Khi di chuột vào khối hiển thị
                    onMouseLeave={handleMouseLeave} // Khi bỏ chuột ra khỏi khối hiển thị
                    className={cx('hover-content', { 'extra-class': Content === 'Explore' })}
                >
                    {Array.isArray(hoverContent) ? (
                        <div className={cx('pd-1')}>
                            {hoverContent.map((item, index) => (
                                <div key={index} className={cx('category-title')}>
                                    <Link className={cx('category-link-title')} to={item.toLink}>
                                        <span className={null}>
                                            {item.title}
                                        </span>
                                        <FontAwesomeIcon className={cx('fs1')} icon={faChevronRight} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {isIcon ? (
                                <>
                                    <PopUp tileLink={titleLinkHover} to={linkHover} type={type} Content={hoverContent}>
                                    </PopUp>
                                </>
                            ) : (
                                <div className={cx('pd-1')}>
                                    <span className={cx('span-in')}>{hoverContent} {/* Nội dung khi di chuột */}</span>
                                    <Link className={cx('title-link-hover')} to={linkHover}>
                                        <span >{titleLinkHover}</span>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

HoverDisplay.propTypes = {
    to: PropTypes.string.isRequired, // 'to' là một đường dẫn link (bắt buộc)
    Content: PropTypes.oneOfType([ // 'Content' có thể là chuỗi hoặc một node (như FontAwesomeIcon)
        PropTypes.string,
        PropTypes.node,
    ]).isRequired,
    hoverContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                toLink: PropTypes.string.isRequired,
            })
        ),
    ]).isRequired,
    children: PropTypes.node, // 'children' là các phần tử con
    linkHover: PropTypes.string.isRequired, // 'linkHover' là link cho hover (bắt buộc)
    titleLinkHover: PropTypes.string, // 'titleLinkHover' là tiêu đề cho link hover
    isIcon: PropTypes.bool, // 'isIcon' là boolean để xác định có icon hay không
    itemCount: PropTypes.number, // 'itemCount' là số lượng item (không bắt buộc)
    notificationCount: PropTypes.number, // 'notificationCount' là số lượng thông báo (không bắt buộc)
    type: PropTypes.oneOf(['shopping', 'wishList', 'notification']), // 'type' là một trong các giá trị đã định trước (không bắt buộc)
};

export default HoverDisplay;