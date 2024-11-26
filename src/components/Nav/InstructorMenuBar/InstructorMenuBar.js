import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import images from "~/assets/images";

import css from "./InstructorMenuBar.module.scss";

const InstructorMenuBar = () => {
    return (
        <div className={css.outerDiv}>
            <div className={css.menuItem}>
                <Link to="/user/profile/courses" className={css.iconBox}>
                    <img className={css.icon} src={images.smallLogoIcon} alt="icon" />
                </Link>
            </div>
            <div className={css.menuBox}>
                <NavLink
                    to="/user/profile/courses"
                    className={({ isActive }) =>
                        isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
                    }
                >
                    <div className={css.iconBox}>
                        <img className={css.icon} src={images.playTvIcon} alt="icon" />
                    </div>
                    <div className={css.menuTxt}>Khóa học</div>
                </NavLink>
                <NavLink
                    to="/user/profile/communication"
                    className={({ isActive }) =>
                        isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
                    }
                >
                    <div className={css.iconBox}>
                        <img className={css.icon} src={images.captionIcon} alt="icon" />
                    </div>
                    <div className={css.menuTxt}>Giao tiếp</div>
                </NavLink>
                <NavLink
                    to="/user/profile/performance"
                    className={({ isActive }) =>
                        isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
                    }
                >
                    <div className={css.iconBox}>
                        <img className={css.icon} src={images.analyticsIcon} alt="icon" />
                    </div>
                    <div className={css.menuTxt}>Hiệu suất</div>
                </NavLink>
                <NavLink
                    to="/user/profile/tools"
                    className={({ isActive }) =>
                        isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
                    }
                >
                    <div className={css.iconBox}>
                        <img className={css.icon} src={images.settingsIcon} alt="icon" />
                    </div>
                    <div className={css.menuTxt}>Công cụ  </div>
                </NavLink>
                <NavLink
                    to="/user/profile/resources"
                    className={({ isActive }) =>
                        isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
                    }
                >
                    <div className={css.iconBox}>
                        <img className={css.icon} src={images.queryIcon} alt="icon" />
                    </div>
                    <div className={css.menuTxt}>Tài nguyên</div>
                </NavLink>
            </div>
        </div>
    );
};

export default InstructorMenuBar;
