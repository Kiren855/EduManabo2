import React from "react";

import css from "./TabLabel.module.scss";

const TagLabel = (props) => {
    const { txt = "Bestseller", extraCss = {} } = props;
    return (
        <div style={{ ...extraCss }} className={css.tag}>
            {txt}
        </div>
    );
};

export default TagLabel;
