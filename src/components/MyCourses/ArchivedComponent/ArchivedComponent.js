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
        <div className={css.outerDiv}>
            <div className={css.bdy}>
                {courseDataWithOptions.map((item) => {
                    return (
                        <CourseCardWithOptions
                            key={item.id}
                            data={item}
                            isOptions={true}
                            options={optionsComps}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ArchivedComponent;
