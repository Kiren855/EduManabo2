import { Outlet } from "react-router-dom";

import css from "./ProfilePage.module.scss";

import InstructorLayout from "~/layouts/InstructorLayout";

const ProfilePage = () => {
    return (
        <InstructorLayout>
            <div className={css.outerDiv}>
                <Outlet />
            </div>
        </InstructorLayout>
    );
};

export default ProfilePage;
