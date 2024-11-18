import CourseCard from "~/components/Cards/CourseCard";
import InputUtil from "~/utils/InputUtil";

import { coursesData } from "~/assets/fakeData/fakedata";
import images from "~/assets/images";

import css from "./WishListComponent.module.scss";

const WishListComponent = () => {
    return (
        <div className={css.outerDiv}>
            <div className={css.topBAR}>
                <div className={css.searchBar}>
                    <InputUtil
                        icon={images.searchIcon}
                        iconPosition="right"
                        placeholderTxt="Search my courses"
                        extraCss={{ padding: "0.3rem", fontSize: "1rem" }}
                    />
                </div>
            </div>
            <div className={css.courses}>
                {coursesData?.map((item, id) => {
                    return (
                        <CourseCard key={id} data={item} extraCss={{ margin: "1rem 0" }} />
                    );
                })}
            </div>
        </div>
    );
};

export default WishListComponent;
