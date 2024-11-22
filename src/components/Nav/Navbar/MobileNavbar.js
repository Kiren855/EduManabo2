import React from "react";
import { Link } from "react-router-dom";
import css from "./Navbar.module.scss";

import SearchBar from "~/utils/SearchBar";
import Button1 from "~/components/Button1";

import images from "~/assets/images";

const MobileNavbar = () => {
    return (
        <>
            <div className={css.sidebarMenu}>
                <div className={css.searchBoxM}>
                    <SearchBar />
                </div>
                <div className={css.catDropdownM}>Categories</div>
                <Link to="/" target="_blank" className={css.hovBoxM}>Teach on Edumanabo</Link>
                <div className={css.btnsM}>
                    <Button1 txt="Cart" img={images.cartIcon} link="/cart" />
                    <Button1 txt="Login" link="/join/login" />
                    <Button1
                        txt="Sign up"
                        bck="#1c1d1f"
                        link="/join/signup"
                        color="#fff"
                        hovBck="#000"
                    />
                </div>
            </div>
        </>
    );
};

export default MobileNavbar;
