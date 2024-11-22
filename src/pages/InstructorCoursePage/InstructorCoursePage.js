import { useState } from "react";
import css from "./InstructorCoursePage.module.scss";

import images from "~/assets/images";

import InstructorCoursesDisplay from "~/components/InstructorCoursesDisplay";
import ParaCard from "~/components/Cards/ParaCard";
import SmallNaviCard from "~/components/Cards/SmallNaviCard";
import SearchBar2 from "~/components/Nav/SearchBar2";
import VerticalCourseDraftCard from "~/components/Cards/VerticalCourseDraftCard";
import SelectDropdownUtil from "~/utils/SelectDropdownUtil";
import Button1 from "~/components/Button1";

const InstructorCoursePage = () => {
    const [courses, setCourses] = useState([{}]);
    const [searchBar, setSearchBar] = useState("");
    const [dropdownFilter, setDropdownFilter] = useState({
        filter1: "",
    });

    const filterOptions = [
        {
            key: "Newest",
            value: "newest",
        },
        {
            key: "Oldest",
            value: "oldest",
        },
        {
            key: "A-Z",
            value: "a-z",
        },
        {
            key: "Z-A",
            value: "z-a",
        },
    ];

    let commonContent = (
        <>
            <div className={css.plainTxt}>
                Based on your experience, we think these resources will be helpful.
            </div>
            <div className={css.box1}>
                <ParaCard
                    imgSrc={images.showcase1}
                    ttl="Create an Engaging Course"
                    cnt="Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting."
                    btnTxt="Get Started"
                    btnLink="#"
                />
            </div>

            <div className={css.box1}>
                <ParaCard
                    imgSrc={images.showcase2}
                    ttl="Get Started with Video"
                    cnt="Quality video lectures can set your course apart. Use our resources to learn the basics."
                    btnTxt="Get Started"
                    btnLink="#"
                />
                <ParaCard
                    imgSrc={images.showcase3}
                    ttl="Build Your Audience"
                    cnt="Set your course up for success by building your audience."
                    btnTxt="Get Started"
                    btnLink="#"
                />
            </div>
            <div className={css.plainTxt}>
                Have questions? Here are our most popular instructor resources.
            </div>
            <div className={css.box2}>
                <SmallNaviCard
                    icon={images.tvIcon}
                    ttl="Test Video"
                    desc="Send us a sample video and get expert feedback."
                    link="#"
                />
                <SmallNaviCard
                    icon={images.chatIcon}
                    ttl="Instructor Community"
                    desc="Connect with experienced instructors. Ask questions, browse discussions, and more."
                    link="#"
                />
                <SmallNaviCard
                    icon={images.teachIcon}
                    ttl="Testing Center"
                    desc="Learn about best practices for teaching on Edumanabo."
                    link="#"
                />
                <SmallNaviCard
                    icon={images.analyticsIcon}
                    ttl="Marketplace Insights"
                    desc="Validate your course topic by exploring our marketplace supply and demand."
                    link="#"
                />
                <SmallNaviCard
                    icon={images.helpWebIcon}
                    ttl="Help and Support"
                    desc="Browse our Help Center or contact our support team."
                    link="#"
                />
            </div>
            <div className={css.box3}>
                <p className={css.txt}>Are You Ready to Begin?</p>
                <Button1
                    txt="Create your Course"
                    link="/courses/create/1"
                    color="var(--white)"
                    bck="var(--purple)"
                    hovBck="var(--purple-dark)"
                    extraCss={{
                        border: "none",
                        padding: "0.5rem 2rem",
                    }}
                />
            </div>
        </>
    );
    let topContent = <InstructorCoursesDisplay />;

    const setSearchBarHandler = (e) => {
        setSearchBar(e.target.value || "");
    };
    const searchHandler = () => { };

    if (courses?.length > 0) {
        topContent = (
            <>
                <h2 className={css.ttl}>Courses</h2>
                <div className={css.topNav}>
                    <div className={css.left}>
                        <SearchBar2
                            searchBar={searchBar}
                            setSearchBar={setSearchBarHandler}
                            searchHandler={searchHandler}
                            placeholder="Search your courses"
                        />
                        <SelectDropdownUtil
                            id="filter1"
                            filterType="filter1"
                            defaultValue={filterOptions[0]}
                            value={dropdownFilter.filter1}
                            setValue={setDropdownFilter}
                            multipleOptions={false}
                            options={filterOptions}
                            selectBoxCss={{ height: "auto" }}
                        />
                    </div>
                    <div className={css.right}>
                        <Button1
                            txt="New Course"
                            link="/courses/create/1"
                            color="var(--white)"
                            bck="var(--purple)"
                            hovBck="var(--purple-dark)"
                            extraCss={{
                                border: "none",
                                padding: "0.5rem 1rem",
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {topContent}
            <div className={css.coursesBox}>
                <VerticalCourseDraftCard />
            </div>
            {commonContent}
        </>
    );
};

export default InstructorCoursePage;
