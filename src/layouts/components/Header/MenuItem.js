import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faMessage,
    faChalkboardUser,
    faBookBookmark,
    faCreditCard,
    faUserPen,
    faQuestion,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBell } from '@fortawesome/free-regular-svg-icons';

//Menu hiển thị khi người dùng chưa đăng nhập 
export const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'es',
                    title: 'Español', // Tiếng Tây Ban Nha
                },
                {
                    type: 'language',
                    code: 'fr',
                    title: 'Français', // Tiếng Pháp
                },
                {
                    type: 'language',
                    code: 'de',
                    title: 'Deutsch', // Tiếng Đức
                },
                {
                    type: 'language',
                    code: 'zh',
                    title: '中文', // Tiếng Trung
                },
                {
                    type: 'language',
                    code: 'ja',
                    title: '日本語', // Tiếng Nhật
                },
                {
                    type: 'language',
                    code: 'ko',
                    title: '한국어', // Tiếng Hàn
                },
                {
                    type: 'language',
                    code: 'it',
                    title: 'Italiano', // Tiếng Ý
                },
                {
                    type: 'language',
                    code: 'ru',
                    title: 'Русский', // Tiếng Nga
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

//Menu hiển thị khi người dùng đã đăng nhập
export const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faBookBookmark} />,
        title: 'Học tập',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Giỏ hàng của tôi',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faHeart} />,
        title: 'Mong muốn',
        to: '/settings',
    },
    {
        icon: <FontAwesomeIcon icon={faChalkboardUser} />,
        title: 'Giảng dạy trên Edumanabo',
        to: '/logout',
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faBell} />,
        title: 'Thông báo',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faMessage} />,
        title: 'Tin nhắn',
        to: '/logout',
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt tài khoản',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faCreditCard} />,
        title: 'Phương thức thanh toán',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Lịch sử mua',
        to: '/logout',
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Ngôn ngữ : English',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'es',
                    title: 'Español', // Tiếng Tây Ban Nha
                },
                {
                    type: 'language',
                    code: 'fr',
                    title: 'Français', // Tiếng Pháp
                },
                {
                    type: 'language',
                    code: 'de',
                    title: 'Deutsch', // Tiếng Đức
                },
                {
                    type: 'language',
                    code: 'zh',
                    title: '中文', // Tiếng Trung
                },
                {
                    type: 'language',
                    code: 'ja',
                    title: '日本語', // Tiếng Nhật
                },
                {
                    type: 'language',
                    code: 'ko',
                    title: '한국어', // Tiếng Hàn
                },
                {
                    type: 'language',
                    code: 'it',
                    title: 'Italiano', // Tiếng Ý
                },
                {
                    type: 'language',
                    code: 'ru',
                    title: 'Русский', // Tiếng Nga
                },
            ],
        },
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Hồ sơ công khai',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faUserPen} />,
        title: 'Chỉnh sửa hồ sơ',
        to: '/logout',
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faQuestion} />,
        title: 'Trợ giúp và hỗ trợ',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        to: '/logout',
    },
];

//Menu hiển thị khi di chuột vào chỗ thể loại(explore)
export const category = [
    {
        title: 'Phát triển',
        toLink: '/',
    },
    {
        title: 'Kinh doanh',
        toLink: '/',
    },
    {
        title: 'Tài chính & Kế toán',
        toLink: '/',
    },
    {
        title: 'CNTT & Phần mềm',
        toLink: '/',
    },
    {
        title: 'Thiết kế',
        toLink: '/',
    },
    {
        title: 'Marketing',
        toLink: '/',
    },
];