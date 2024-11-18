import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import css from "./MyCoursesPage.module.scss";

const MyCoursesPage = () => {
    const tabs = [
        { name: "Tất cả khóa học", link: "learning" },
        { name: "Danh sách của tôi", link: "lists" },
        { name: "Mong muốn", link: "wishlist" },
        { name: "Đã lưu trữ", link: "archived" },
    ];
    return (
        <div className={css.outerDiv}>
            <div className={css.topBar}>
                <div className={css.topBarTtl}>Học tập</div>
            </div>
            <div className={css.menuBar}>
                <div className={css.links}>
                    {tabs?.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.link}
                            className={({ isActive }) =>
                                isActive ? [css.link, css.linkActive].join(" ") : css.link
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className={css.outletBdy}>
                <Outlet />
            </div>
        </div>
    );
};

export default MyCoursesPage;
