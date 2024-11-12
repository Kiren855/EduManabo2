import { useState } from "react";
import { Link } from "react-router-dom";

import AnnouncementCommentUtil from "~/utils/AnnouncementCommentUtil";
import CommentInput from "~/utils/CommentInput";
import css from "./AnnouncementsTabComponent.module.scss"
import images from "~/assets/images";

const AnnouncementsTabComponent = () => {
    const imgC = "https://i.pinimg.com/736x/f8/d0/a2/f8d0a28f230f2f0bfa84452e5c36efd8.jpg"
    const [flagState, setFlagState] = useState(false);
    const [displayCommentsCount, setDisplayCommnetsCount] = useState(3);
    const data = [
        {
            id: "u-1",
            name: "CNG 03",
            img: imgC,
            date: "12-12-2022",
            ttl: "NextJS 13",
            desc: `Hi Everyone!
        A couple of hours ago, NextJS 13 was released.
        Whilst it is a major new version, it does NOT impact the way you write NextJS code and build NextJS applications. What you learn in my NextJS course still applies!
        However, NextJS 13 allows us to play around with some unstable (!), not finished and not production-ready new features that will become important in future releases (maybe NextJS 14).`,
            comments: [
                {
                    id: 1,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 2,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 3,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 4,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 5,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 6,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 7,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 8,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 9,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
                {
                    id: 10,
                    name: "CNG 03",
                    img: imgC,
                    date: "12-12-2022",
                    comment: "This is a comment!",
                },
            ],
        },
        {
            id: "u-2",
            name: "nani",
            img: imgC,
            date: "12-12-2022",
            ttl: "NextJS 13",
            desc: `Hi Everyone!
        A couple of hours ago, NextJS 13 was released.
        Whilst it is a major new version, it does NOT impact the way you write NextJS code and build NextJS applications. What you learn in my NextJS course still applies!
        However, NextJS 13 allows us to play around with some unstable (!), not finished and not production-ready new features that will become important in future releases (maybe NextJS 14).`,
            comments: [
                {
                    id: 1,
                    name: "nani",
                    img: imgC,
                    date: "03-03-2022",
                    comment: "This is a comment too!",
                },
            ],
        },
    ];
    return (
        <>
            <div className={css.outerDiv}>
                {data?.map((userData) => {
                    return (
                        <div className={css.innerDiv} key={userData.id}>
                            <div className={css.profileBox}>
                                <div className={css.imgBox}>
                                    <img
                                        src={userData.img}
                                        alt="profile pic"
                                        className={css.img}
                                    />
                                </div>
                                <div className={css.proLeftBox}>
                                    <Link to={userData.id} className={css.ttl}>
                                        {userData.name}
                                    </Link>
                                    <div className={css.tagBox}>
                                        <div>posted an announcement</div>
                                        <div className={css.date}>
                                            {new Date(userData.date)?.toLocaleDateString()}
                                        </div>
                                        <div
                                            className={css.flag}
                                            onClick={() => setFlagState((p) => !p)}
                                        >
                                            <img
                                                src={flagState ? images.flagReportFilledIcon : images.flagReportIcon}
                                                alt="flag"
                                                className={css.icon}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={css.descBox}>
                                <div className={css.descTtl}>{userData.ttl}</div>
                                <div className={css.descCont}>{userData.desc}</div>
                            </div>
                            <div className={css.profileBox}>
                                {/* <div className={css.imgBox}>
                                    <img
                                        src={userData.img}
                                        alt="profile pic"
                                        className={css.img}
                                    />
                                </div>
                                <div className={css.commentBox}>
                                    <textarea
                                        placeholder="Enter your comment"
                                        className={css.textarea}
                                        name="comment"
                                        cols="30"
                                        rows="2"
                                    ></textarea>
                                </div> */}
                                <CommentInput
                                    userAvatar="https://cdn-media.sforum.vn/storage/app/media/Trang/cosplay-anime-nu-31.jpg"  // Đường dẫn đến ảnh avatar của người dùng
                                    onSubmit={() => { }}
                                    onCancel={() => { }}
                                    showCancelButton={true}
                                    submitButtonText="Gửi"
                                    cancelButtonText="Hủy"
                                    avatarSize="50px" // Kích thước avatar
                                    maxCommentLength={500} // Giới hạn độ dài bình luận
                                />
                            </div>
                            <div className={css.cntBox}>
                                <div className={css.rightBox}>
                                    {userData.comments?.map((item, id) => {
                                        if (id < displayCommentsCount) {
                                            return (
                                                <AnnouncementCommentUtil key={item.id} data={item} />
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                            <div
                                className={css.showMoreBtn}
                                onClick={() =>
                                    setDisplayCommnetsCount((p) => {
                                        if (userData.comments.length > p) {
                                            return p + 3;
                                        }
                                        return p;
                                    })
                                }
                            >
                                {userData.comments.length - displayCommentsCount < 0
                                    ? null
                                    : displayCommentsCount === 3
                                        ? `Show Comments (${userData.comments.length || 0})`
                                        : `Load More (${userData.comments.length - displayCommentsCount
                                        })`}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AnnouncementsTabComponent;