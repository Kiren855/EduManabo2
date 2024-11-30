import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import CustomCheckboxUtil from "~/utils/CustomCheckboxUtil";

import images from "~/assets/images";

import css from "./CourseContentComponent.module.scss";

const CourseContentComponent = (props) => {
    const { title = "", data = [], playerWidthSetter = () => { } } = props;
    const { selectLesson } = props;
    const [toggleBox, setToggleBox] = useState({});
    const [toggleDrpDwn, setToggleDrpDwn] = useState({});
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        console.log("Checked items updated effect:", checkedItems);
    }, [checkedItems]);

    // Hàm onChange callback được sử dụng để tránh tạo lại hàm trong mỗi lần render
    const handleCheckboxChange = useCallback((e) => {
        const { name } = e.target;
        setCheckedItems((prev) => {
            const updated = { ...prev, [name]: !prev[name] };
            console.log('Updated Checked Items:', updated);
            return updated;
        });
    }, []);

    const handleLessonClick = (lesson) => {
        selectLesson(lesson);  // Gửi lesson về component cha khi người dùng click
    };

    return (
        <div className={css.outterDiv}>
            <div className={css.innerDiv}>
                {title ? (
                    <div className={css.titleBox}>
                        <span className={css.ttl}>{title}</span>
                        <span
                            className={css.imgBox}
                            onClick={() => playerWidthSetter((p) => !p)}
                        >
                            <img src={images.closeIcon} alt="close icon" className={css.closeIcon} />
                        </span>
                    </div>
                ) : null}
                <div className={css.bdy}>
                    {data?.map((item, id) => {
                        return (
                            <div className={css.tab} key={`tab-${id}`}>
                                <div
                                    className={css.tabTitleBox}
                                    onClick={() =>
                                        setToggleBox((p) => {
                                            return { ...p, [id]: !p[id] };
                                        })
                                    }
                                >
                                    <div className={css.tabTitleLeft}>
                                        <div className={css.tabTtl}>
                                            {`Phần ${id + 1}: ${item.name}`}
                                        </div>
                                        <div className={css.tabDesc}>
                                            <span>{`0/${item.lessons.length}`}</span>
                                            <span></span>
                                            <span>{Math.floor(item.duration / 60)} phút {item.duration % 60} giây</span>
                                        </div>
                                    </div>
                                    <div className={css.tabTitleRight}>
                                        <img
                                            src={images.downArrowIcon}
                                            alt="down arrow"
                                            className={[
                                                css.icon,
                                                toggleBox[id] ? css.iconReverse : null,
                                            ].join(" ")}
                                        />
                                    </div>
                                </div>
                                {toggleBox[id] ? (
                                    <Link to="" className={css.tabBdy}>
                                        {item.lessons?.map((subItem) => {
                                            return (
                                                <div
                                                    className={css.descBdy}
                                                    key={`subItem-${subItem.id}`}
                                                    onClick={() => handleLessonClick(subItem)}
                                                >
                                                    <div className={css.descBdyLeft}>
                                                        <CustomCheckboxUtil
                                                            key={`${subItem.id}-${checkedItems[subItem.id]}`} // Thêm key duy nhất
                                                            checked={checkedItems[subItem.id] ?? false}
                                                            name={subItem.id}
                                                            id={subItem.id}
                                                            onChange={handleCheckboxChange}
                                                            extraCss={{
                                                                width: "40px",
                                                                gap: "0",
                                                                margin: "0.5rem",
                                                            }}
                                                        />

                                                    </div>
                                                    <div className={css.descBdyRight}>
                                                        <div className={css.sbTtl}>{subItem.name}</div>
                                                        <div className={css.sbBox}>
                                                            <span className={css.subDur}>
                                                                <img alt="Huynh Thanh Thao :<3" src={images.playIcon} className={css.plyIcon} />
                                                                <span className={css.subDurTxt}>
                                                                    {subItem.duration && (
                                                                        <>
                                                                            {Math.floor(subItem.duration / 60)} phút {subItem.duration % 60} giây
                                                                        </>
                                                                    )}
                                                                </span>
                                                            </span>
                                                            {subItem?.resources?.length > 0 ? (
                                                                <span className={css.subDrp}>
                                                                    <div
                                                                        className={css.subDrpBox}
                                                                        onClick={() => {
                                                                            setToggleDrpDwn((p) => {
                                                                                return {
                                                                                    [subItem.id]: p[subItem.id]
                                                                                        ? !p[subItem.id]
                                                                                        : true,
                                                                                };
                                                                            });
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={images.openFolderIcon}
                                                                            alt="icon"
                                                                            className={css.subIcon}
                                                                        />
                                                                        <div className={css.subDrpTxt}>
                                                                            Resources
                                                                        </div>
                                                                        <img
                                                                            alt="lmao"
                                                                            src={images.downArrowIcon}
                                                                            icon="dropdown icon"
                                                                            className={[
                                                                                css.drowDownIcon,
                                                                                toggleDrpDwn[subItem.id]
                                                                                    ? css.reverseDrowDownIcon
                                                                                    : null,
                                                                            ].join(" ")}
                                                                        />
                                                                    </div>
                                                                    {toggleDrpDwn[subItem.id] ? (
                                                                        <div className={css.subDrpItemsBox}>
                                                                            {subItem?.resources?.map((resItem) => {
                                                                                return (
                                                                                    <Link
                                                                                        key={`resItem-${resItem.id}`}
                                                                                        download={resItem.downloadable}
                                                                                        to={resItem.link}
                                                                                        className={css.resItem}
                                                                                    >
                                                                                        <span className={css.resItemTxt}>
                                                                                            {resItem.text}
                                                                                        </span>
                                                                                    </Link>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    ) : null}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </Link>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CourseContentComponent;
