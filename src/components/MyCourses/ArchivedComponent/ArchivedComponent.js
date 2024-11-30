import CourseCardWithOptions from "~/components/Cards/CourseCardWithOptions";
import { courseDataWithOptions } from "~/assets/fakeData/fakedata";

import images from "~/assets/images";

import css from "./ArchivedComponent.module.scss";

const ArchivedComponent = () => {
    const optionsComps = [
        <div>
            <div className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={images.folderIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Unarchive</span>
            </div>
            <div className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={images.folderIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Unarchive</span>
            </div>
        </div>,
    ];
    return (
        <></>
    );
};

export default ArchivedComponent;
