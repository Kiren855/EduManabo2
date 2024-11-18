import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InputUtil from "~/utils/InputUtil";
import SelectDropdownUtil from "~/utils/SelectDropdownUtil";
import CourseCardWithOptions from "~/components/Cards/CourseCardWithOptions";

import { courseDataWithOptions } from "~/assets/fakeData/fakedata";
import images from "~/assets/images";
import css from "./AllCoursesComponent.module.scss";

const AllCoursesComponent = () => {
    const [filters, setFilers] = useState({
        sortBy: {},
        filterByCategory: {},
        filterByState: {},
        filterByInstructor: {},
    });

    const [resetBtn, setRestBtn] = useState(false);

    const sortByOptions = [
        {
            key: "Recently Accessed",
            value: "recently accessed",
        },
        {
            key: "Recently Enrolled",
            value: "recently enrolled",
        },
        {
            key: "Title: A-to-Z",
            value: "a-z",
        },
        {
            key: "Title: Z-to-A",
            value: "z-a",
        },
    ];

    const filterByCategoryOptions = [
        [
            {
                key: "Favourites",
                value: "favorites",
            },
        ],
        [
            {
                key: "All Categories",
                value: "all categories",
            },
            {
                key: "Development",
                value: "development",
            },
            {
                key: "IT & Software",
                value: "it software",
            },
            {
                key: "Business",
                value: "business",
            },
            {
                key: "Marketing",
                value: "marketing",
            },
        ],
        [
            {
                key: "Archived",
                value: "archived",
            },
        ],
    ];

    const filterByStateOptions = [
        {
            key: "Completed",
            value: "completed",
        },
        {
            key: "In Progress",
            value: "in progress",
        },
        {
            key: "Not Started",
            value: "not started",
        },
    ];

    useEffect(() => {
        if (
            Object.keys(filters.sortBy).length ||
            Object.keys(filters.filterByCategory).length ||
            Object.keys(filters.filterByState).length ||
            Object.keys(filters.filterByInstructor).length
        ) {
            return setRestBtn(true);
        }
        setRestBtn(false);
    }, [filters]);

    const resetFiltersHandler = () => {
        setFilers({
            sortBy: {},
            filterByCategory: {},
            filterByState: {},
            filterByInstructor: {},
        });
    };

    const optionsComps = [
        <div className={css.opt}>
            <div className={css.httl}>Danh sách</div>
            <Link to="/" className={css.ctxt}>
                Dynamics
            </Link>
            <Link to="/" className={css.ctxt}>
                NCloud
            </Link>
        </div>,
        <div className={css.opt}>
            <Link to="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={images.shareIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Chia sẻ</span>
            </Link>
            <Link to="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={images.plusIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Tạo danh sách mới </span>
            </Link>
            <Link to="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={images.starIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Yêu thích</span>
            </Link>
            <Link to="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={images.folderIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Lưu trữ</span>
            </Link>
        </div>,
    ];

    return (
        <div className={css.outerDiv}>
            <div className={css.topBar}>
                <div className={css.filters}>
                    <SelectDropdownUtil
                        id="filter1"
                        label="Sắp xếp theo"
                        filterType="sortBy"
                        defaultValue={sortByOptions[0]}
                        value={filters.sortBy}
                        setValue={setFilers}
                        multipleOptions={false}
                        options={sortByOptions}
                    />
                    <SelectDropdownUtil
                        id="filter2"
                        label="Bộ lọc"
                        filterType="filterByCategory"
                        defaultValue={filterByCategoryOptions[0][0]}
                        value={filters.filterByCategory}
                        setValue={setFilers}
                        multipleOptions={true}
                        options={filterByCategoryOptions}
                    />
                    <SelectDropdownUtil
                        id="filter3"
                        filterType="filterByState"
                        defaultValue={filterByStateOptions[0]}
                        value={filters.filterByState}
                        setValue={setFilers}
                        multipleOptions={false}
                        options={filterByStateOptions}
                    />
                    <div
                        className={[css.rstBtn, resetBtn ? css.activeRstBtn : ""].join(" ")}
                        onClick={resetFiltersHandler}
                    >
                        Đặt lại
                    </div>
                </div>

                <div className={css.searchBar}>
                    <InputUtil
                        icon={images.searchIcon}
                        iconPosition="right"
                        placeholderTxt="Tìm kiếm khóa học của tôi"
                        extraCss={{ padding: "0.3rem", fontSize: "1rem" }}
                    />
                </div>
            </div>
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

export default AllCoursesComponent;
