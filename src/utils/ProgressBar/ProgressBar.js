import css from "./ProgressBar.module.scss";

const ProgressBar = (prop) => {
    return (
        <div className={css.outerPBar}>
            <div className={css.innerPBar}></div>
        </div>
    );
};

export default ProgressBar;
