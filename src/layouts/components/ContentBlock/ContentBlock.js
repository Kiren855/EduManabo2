import classNames from "classnames/bind";
import styles from "./ContentBlock.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function ContentBlock({ title, content, type }) {
    return (
        <>
            {type === "block" ? (
                <div className={cx('content-block')}>
                    <h2>{title}</h2>
                    <div className={cx('content')}>
                        {Array.isArray(content) && (
                            <>
                                <div className={cx('left-column')}>
                                    {content.slice(0, Math.ceil(content.length / 2)).map((item, index) => (
                                        <div className={cx('element-container')} key={index}>
                                            <span className={cx('icon')}><FontAwesomeIcon icon={faCheck} /></span>
                                            <p className={cx('element-title')}>{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('right-column')}>
                                    {content.slice(Math.ceil(content.length / 2)).map((item, index) => (
                                        <div className={cx('element-container')} key={index}>
                                            <span className={cx('icon')}><FontAwesomeIcon icon={faCheck} /></span>
                                            <p className={cx('element-title')}>{item}</p>
                                        </div>
                                    ))}
                                </div>

                            </>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className={cx('content-block')}>
                        <h2>{title}</h2>
                        <div className={cx('content')}>
                            {type === "text" && <p>{content}</p>}
                            {type === "list" && Array.isArray(content) && (
                                <ul>
                                    {content.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}
                            {/* Thêm các kiểu hiển thị khác nếu cần */}
                        </div>
                    </div>
                </>
            )}
        </>

    );
}

export default ContentBlock;