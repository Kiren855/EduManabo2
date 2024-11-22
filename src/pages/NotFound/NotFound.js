import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles)

function NotFound() {
    return (
        <>
            <div className={cx('pd')}></div>
            <div className={cx('container')}>
                <div className={cx('snow')}></div>
                <div className={cx('tree1')}></div>
                <div className={cx('tree2')}></div>
                <div className={cx('house')}>
                    <div className={cx('roof1')}>
                        <div className={cx('b1')}></div>
                        <div className={cx('b2')}></div>
                    </div>
                    <div className={cx('wall1')}>
                        <div className={cx('w3')}>
                            <div className={cx('window1')}>
                                <div className={cx('glass1')}></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wall2')}>
                        <div className={cx('light')}>
                            <div className={cx('w1')}>
                                <div className={cx('window')}>
                                    <div className={cx('glass')}></div>
                                </div>
                            </div>
                            <div className={cx('w2')}>
                                <div className={cx('window')}>
                                    <div className={cx('glass')}></div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('door')}>
                            <div className={cx('handle')}></div>
                        </div>
                        <div className={cx('snw1')}></div>
                        <div className={cx('snw2')}></div>
                    </div>
                    <div className={cx('wall3')}>
                        <div className={cx('b3')}></div>
                        <div className={cx('b4')}></div>
                        <div className={cx('chimney')}>
                            <div className={cx('top')}>
                                <div className={cx('smoke')}>
                                    <div className={cx('s1')}></div>
                                    <div className={cx('s2')}></div>
                                    <div className={cx('s3')}></div>
                                </div>
                                <div className={cx('shne1')}></div>
                                <div className={cx('shne2')}></div>
                            </div>
                        </div>
                        <div className={cx('sn')}>
                            <div className={cx('dr1')}></div>
                            <div className={cx('dr2')}></div>
                            <div className={cx('dr3')}></div>
                        </div>
                        <div className={cx('sn1')}>
                            <div className={cx('dr4')}></div>
                        </div>
                        <div className={cx('sh1')}></div>
                        <div className={cx('sh2')}></div>
                        <div className={cx('sh3')}></div>
                        <div className={cx('sh4')}></div>
                        <div className={cx('sh5')}></div>
                    </div>
                </div>
                <div className={cx('snowfall')}></div>
                <div className={cx('cover')}></div>
                <div className={cx('bottom')}>
                    <div className={cx('bt1')}></div>
                    <div className={cx('bt2')}></div>
                </div>
                <div className={cx('fence')}>
                    <div className={cx('fn1')}>
                        <div className={cx('screw')}></div>
                    </div>
                    <div className={cx('fn2')}>
                        <div className={cx('screw')}></div>
                    </div>
                    <div className={cx('fn3')}>
                        <div className={cx('screw')}></div>
                    </div>
                    <div className={cx('stck')}></div>
                </div>
            </div>
            <div className={cx('title')}>
                <span>Chúc bạn có một giáng sinh vui vẻ và một năm mới an lành!</span>
                <strong>Chúng tôi không tìm được trang mà bạn đang tìm kiếm</strong>
                <Link to='/'>Quay về trang chủ</Link>
            </div>
        </>
    );
}

export default NotFound;