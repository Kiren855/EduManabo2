import InstructorMenuBar from "~/components/Nav/InstructorMenuBar";
import InstructorNavbar from "~/components/Nav/InstructorNavbar";
import Footer from "../components/Footer";

import css from "./InstructorLayout.module.scss";

const InstructorLayout = ({ children }) => {
    return (
        <div className={css.outerDiv}>
            <InstructorMenuBar />
            <InstructorNavbar />
            <div className={css.innerDiv}>
                <div className={css.dummy}>d</div>
                <div className={css.outletBdy}>{children}</div>
            </div>
            <div className={css.mgr}>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default InstructorLayout;
