import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';

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
    const currentUser = true;

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
                    Content="Explore"
                    hoverContent={category}
                    linkHover={config.routes.home}
                    titleLinkHover="Dùng thử Udemy Business"
                />

                <Search />

                <div>
                    <HoverDisplay
                        to={config.routes.home}
                        Content="EduManabo Business"
                        hoverContent="Cho phép nhóm của bạn truy cập vào hơn 27.000 khóa học hàng đầu của Udemy, ở mọi nơi và mọi lúc."
                        linkHover={config.routes.home}
                        titleLinkHover="Dùng thử Udemy Business"
                    />

                    <HoverDisplay
                        to={config.routes.home}
                        Content="Teaching on Edumanabo"
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
                            to={config.routes.home}
                            Content={<FontAwesomeIcon icon={faCartShopping} />}
                            isIcon={true}
                            hoverContent="Giỏ hàng của bạn đang trống."
                            linkHover={config.routes.home}
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
                                to={config.routes.home}
                                Content={<FontAwesomeIcon icon={faHeart} />}
                                isIcon={true}
                                hoverContent="Danh sách mong ước của bạn đang trống."
                                linkHover={config.routes.home}
                                titleLinkHover="Khám phá các khóa học"
                            />

                            <HoverDisplay
                                type="shopping"
                                to={config.routes.home}
                                Content={<FontAwesomeIcon icon={faCartShopping} />}
                                isIcon={true}
                                hoverContent="Giỏ hàng của bạn đang trống."
                                linkHover={config.routes.home}
                                titleLinkHover="Tiếp tục mua sắm"
                                itemCount={1000}
                            />

                            <HoverDisplay
                                type="notification"
                                to={config.routes.home}
                                Content={<FontAwesomeIcon icon={faBell} />}
                                isIcon={true}
                                hoverContent="Bạn chưa có thông báo mới."
                                linkHover={config.routes.home}
                                titleLinkHover="Đi đến cài đặt thông báo ngay"
                                notificationCount={1000}
                            />
                        </>
                    ) : (
                        <>
                            <Button primary >Đăng nhập</Button>
                            <Button subprimary >Đăng ký</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://sharedp.com/wp-content/uploads/2024/06/cute-girl-dp-new.jpg"
                                alt="Nguyen Van A"
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