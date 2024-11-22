import { useState } from "react";
import { createPortal } from "react-dom";

import Navbar from "~/components/Nav/Navbar";
import LoggedInNavbar from "~/components/Nav/LoggedInNavbar";
import Footer from "../components/Footer";
import LoginModal from "~/components/LoginModal";

const Layout2 = ({ modal = false, setModal = () => { }, children }) => {
    const [auth, setAuth] = useState(true);
    let comp = <Navbar />;

    if (auth) {
        comp = <LoggedInNavbar />;
    }

    return (
        <>
            {modal
                ? createPortal(
                    <LoginModal setModal={setModal} />,
                    document.getElementById("modal")
                )
                : ""}
            {comp}
            {children}
            <Footer />
        </>
    );
};

export default Layout2;
