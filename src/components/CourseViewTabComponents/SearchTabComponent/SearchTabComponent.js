import { useState } from "react";

import InputUtil from "~/utils/InputUtil";

import images from "~/assets/images";

import css from "./SearchTabComponent.module.scss";

const SearchTabComponent = () => {
    const [state, setState] = useState("What is love");
    const data = "";

    return (
        <div className={css.outerDiv}>
            <InputUtil
                type="text"
                state={state}
                onChange={(e) => setState(e.target?.value ?? "")}
                icon={images.searchIcon}
                iconPosition="right"
                placeholderTxt="Search course content"
            />
            <div className={css.searchContent}>
                {state ? (
                    data ? (
                        <></>
                    ) : (
                        <div className={css.noResult}>
                            <div className={css.txtB}>Sorry, no results for "{state}"</div>
                            <div className={css.txt}>
                                Your search did not match any captions, lectures or resources
                            </div>
                        </div>
                    )
                ) : (
                    <div className={css.noResult}>
                        <div className={css.txtB}>Start a new search</div>
                        <div className={css.txt}>
                            To find captions, lectures or resources
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchTabComponent;
