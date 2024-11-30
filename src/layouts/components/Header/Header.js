import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import { getAccessToken, getRefreshToken } from '~/services/auth/authHelper';
import { getProfile } from '~/services/auth/userService';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';
import HoverDisplay from '~/components/HoverDisplay';
import { MENU_ITEMS } from './MenuItem';
import { userMenu } from './MenuItem';
import { category } from './MenuItem';

const cx = classNames.bind(styles);



function Header() {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const currentUser = accessToken && refreshToken ? true : false;

    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const { avatar } = await getProfile();
                setAvatarUrl(avatar);
            } catch (error) {
                console.log(error.response.data.message)
            }
        };

        if (currentUser) {
            fetchPrice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };



    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Edu Manabo" />
                    <span>duManabo</span>
                </Link>

                <HoverDisplay
                    to={config.routes.home}
                    Content="Khám phá"
                    hoverContent={category}
                    linkHover={config.routes.home}
                    titleLinkHover="Dùng thử Manabo Business"
                />

                <Search />

                <div>
                    <HoverDisplay
                        to={config.routes.home}
                        Content="EM Business"
                        hoverContent="Cho phép nhóm của bạn truy cập vào hơn 27.000 khóa học hàng đầu của Edumanabo, ở mọi nơi và mọi lúc."
                        linkHover={config.routes.home}
                        titleLinkHover="Dùng thử Manabo Business"
                    />

                    <HoverDisplay
                        to={config.routes.home}
                        Content="Teaching on EM"
                        hoverContent="Biến kiến thức của bạn thành cơ hội và tiếp cận với hàng triệu người trên thế giới."
                        linkHover={config.routes.home}
                        titleLinkHover="Tìm hiểu thêm"
                    />

                    {currentUser && (
                        <HoverDisplay
                            to={config.routes.home}
                            Content="Học tập"
                            hoverContent="Bắt đầu chọn trong số hơn 250.000 khóa học để học ngay hôm nay."
                            linkHover={config.routes.home}
                            titleLinkHover="Duyệt qua ngay"
                        />
                    )}
                </div>



                {currentUser ? (
                    <></>
                ) : (
                    <>
                        <HoverDisplay
                            type="shopping"
                            to={config.routes.cart}
                            Content={<FontAwesomeIcon icon={faCartShopping} />}
                            isIcon={true}
                            hoverContent="Giỏ hàng của bạn đang trống."
                            linkHover={config.routes.cart}
                            titleLinkHover="Tiếp tục mua sắm"
                        >
                        </HoverDisplay>
                    </>
                )}

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <HoverDisplay
                                type="wishList"
                                to={`${config.routes.userMyCourse}/wishlist`}
                                Content={<FontAwesomeIcon icon={faHeart} />}
                                isIcon={true}
                                hoverContent="Danh sách mong ước của bạn đang trống."
                                linkHover={config.routes.home}
                                titleLinkHover="Khám phá các khóa học"
                            />

                            <HoverDisplay
                                type="shopping"
                                to={config.routes.cart}
                                Content={<FontAwesomeIcon icon={faCartShopping} />}
                                isIcon={true}
                                hoverContent="Giỏ hàng của bạn đang trống."
                                linkHover={config.routes.cart}
                                titleLinkHover="Tiếp tục mua sắm"
                                itemCount={1}
                            />

                            <HoverDisplay
                                type="notification"
                                to={config.routes.home}
                                Content={<FontAwesomeIcon icon={faBell} />}
                                isIcon={true}
                                hoverContent="Bạn chưa có thông báo mới."
                                linkHover={config.routes.home}
                                titleLinkHover="Đi đến cài đặt thông báo ngay"
                                notificationCount={1}
                            />
                        </>
                    ) : (
                        <>
                            <Button href="/auth" primary >Đăng nhập</Button>
                            <Button href="/auth" subprimary >Đăng ký</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src={avatarUrl}
                                alt="HTT"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;