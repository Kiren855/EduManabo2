import images from "~/assets/images";

import css from "./SearchBar2.module.scss";

const SearchBar2 = (props) => {
    const {
        searchBar = "",
        setSearchBar = () => { },
        searchHandler = () => { },
        placeholder = "Search...",
        extraCss = {},
    } = props;
    return (
        <div className={css.searchBar} style={extraCss}>
            <input
                type="text"
                name="searchbar"
                value={searchBar}
                onChange={(e) => setSearchBar(e)}
                className={css.inpt}
                placeholder={placeholder}
            />
            <div className={css.iconBox} onClick={searchHandler}>
                <img src={images.searchIcon} alt="searchbar" className={css.imgIcon} />
            </div>
        </div>
    );
};

export default SearchBar2;
