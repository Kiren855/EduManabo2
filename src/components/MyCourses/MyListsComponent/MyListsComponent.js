import { Link } from "react-router-dom";

import PlayListComponent from "~/components/PlayListComponent";
import CourseCardWithOptions from "~/components/Cards/CourseCardWithOptions";

import images from "~/assets/images";
import { courseDataWithOptions } from "~/assets/fakeData/fakedata";

import css from "./MyListsComponent.module.scss";

const MyListsComponent = () => {
    const optionsData = [
        <div className={css.opt}>
            <Link tp="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={images.plusIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Lưu khóa học vào danh sách</span>
            </Link>
            <Link tp="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={images.minusIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Xóa khóa học khỏi danh sách này</span>
            </Link>
        </div>,
    ];

    const elems = courseDataWithOptions?.map((item) => {
        return (
            <CourseCardWithOptions
                key={item.id}
                data={item}
                isOptions={true}
                options={optionsData}
            />
        );
    });

    const getMoreDataHandler = () => {
        console.log("Getting more data");
    };

    return (
        <div className={css.outerDiv}>
            <PlayListComponent
                title="Dynamics"
                desc="Cloud + DevOps Tools"
                seeMore={false}
                elements={elems}
            />
            <PlayListComponent
                title="NCloud"
                desc="Cloud + DevOps Tools"
                seeMore={true}
                getMoreDataHandler={getMoreDataHandler}
                elements={elems.slice(0, 3)}
            />
        </div>
    );
};

export default MyListsComponent;
