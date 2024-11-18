import { useState } from "react";

import css from "./ReviewsTabComponent.module.scss";

import images from "~/assets/images";

import InputUtil from "~/utils/InputUtil";
import SelectDropdownUtil from "~/utils/SelectDropdownUtil";
import CommentViewUtil from "~/utils/CommentViewUtil";
import RatingsViewUtil from "~/utils/RatingsViewUtil";
import Comments from "~/layouts/components/Comments";

const ReviewsTabComponent = () => {
    const imgC = "https://cdn-media.sforum.vn/storage/app/media/Trang/cosplay-anime-nu-32.jpg"
    const [filter, setFilter] = useState({
        searchFilter: "",
        drpFilter: {
            key: "All Ratings",
            value: "All Ratings",
        },
    });


    const drpFilterOptions = [
        {
            key: "All Ratings",
            value: "All Ratings",
        },
        {
            key: "Five Stars",
            value: "Five Stars",
        },
    ];

    const filterHandler = (e) => {
        setFilter((p) => {
            return {
                ...p,
                searchFilter: e.target.value,
            };
        });
    };

    const ratingsdata = {
        "5star": 65,
        "4star": 26,
        "3star": 6,
        "2star": 2,
        "1star": 1,
    };

    return (
        <div className={css.outerDiv}>
            <div className={css.ratingsBox}>
                <div className={css.ttl}>Student feedback</div>
                <RatingsViewUtil data={ratingsdata} />
            </div>
            <div className={css.reviewBox}>
                <div className={css.ttl}>Reviews</div>
                <div className={css.filters}>
                    <span className={css.inptFilter}>
                        <InputUtil
                            state={filter.searchFilter}
                            onChange={filterHandler}
                            placeholderTxt="Search reviews"
                            icon={images.searchIcon}
                            iconPosition="right"
                        />
                    </span>
                    <span className={css.drpFilter}>
                        <SelectDropdownUtil
                            id="drpFilter"
                            label="Filter ratings"
                            filterType="drpFilter"
                            defaultValue={filter.drpFilter}
                            value={filter.drpFilter}
                            setValue={setFilter}
                            options={drpFilterOptions}
                        />
                    </span>
                </div>
                <div className={css.comment} >
                    <Comments />
                </div>
            </div>
        </div>
    );
};

export default ReviewsTabComponent;
