import HelpCard from "../Cards/HelpCard";

import css from "./ResourcesComponent.module.scss";
import images from "~/assets/images";

const helpResources = [
    {
        id: "hr-1",
        icon: images.teachIcon,
        ttl: "Teaching Center",
        txt: "Find articles on Edumanbo teaching — from course creation to marketing.",
    },
    {
        id: "hr-2",
        icon: images.groupUsersIcon,
        ttl: "Instructor Community",
        txt: "Share your progress and ask other instructors questions in our community.",
    },
    {
        id: "hr-3",
        icon: images.askIcon,
        ttl: "Help and Support",
        txt: "Can’t find what you need? Our support team is happy to help.",
    },
];

const ResourcesComponent = () => {
    return (
        <div className={css.outerDiv}>
            <div className={css.ttl}>Resources</div>
            <div className={css.cards}>
                {helpResources?.map((item) => {
                    return <HelpCard key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
};

export default ResourcesComponent;
