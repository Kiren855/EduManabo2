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
                            <div className={css.txtB}>Xin lỗi, không có kết quả nào cho "{state}"</div>
                            <div className={css.txt}>
                                Tìm kiếm của bạn không khớp với bất kỳ chú thích, bài giảng hoặc tài nguyên nào
                            </div>
                        </div>
                    )
                ) : (
                    <div className={css.noResult}>
                        <div className={css.txtB}>Bắt đầu tìm kiếm mới</div>
                        <div className={css.txt}>
                            Để tìm phụ đề, bài giảng hoặc tài nguyên
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchTabComponent;
