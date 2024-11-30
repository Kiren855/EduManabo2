import classNames from 'classnames/bind';
import styles from './home.module.scss';

import { useState } from 'react';
import WelcomeBack from '~/components/WelcomeBack';
import AdCarousel from '~/components/AdCarousel';
import RecommendedVideos from '~/components/RecommendedVideos';
import CoursesCarousel from '~/components/CoursesCarousel';
import RecommendedTopic from '~/components/RecommendedTopic';
import ToastMessage from '~/utils/ToastMessage';
import Spinner from '~/utils/Spinner';

const cx = classNames.bind(styles);


function Home() {

    const isLogin = true;
    const [toast, setToast] = useState(null); // Quản lý thông báo
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return (
            <div className={cx('df')}>
                <Spinner message="Nhâm nhi cà phê trong khi chúng tôi thực hiện yêu cầu của bạn..." />
            </div>
        );
    }


    return (
        <>
            {/* Hiển thị ToastMessage */}
            {toast && (
                <ToastMessage
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
            <div className={cx('wrapper-home')}>
                {isLogin ? (
                    <>
                        <WelcomeBack />
                        <AdCarousel isLogin={true} />
                    </>
                ) : (
                    <AdCarousel isLogin={false} />
                )}
                <div className={cx('component-margin')}>
                    <h2>Lĩnh vực sẽ học tiếp theo</h2>
                    <RecommendedVideos setIsLoading={setIsLoading} setToast={setToast} title="Được đề xuất cho bạn" type="recommend" />
                    <RecommendedVideos setIsLoading={setIsLoading} setToast={setToast} title="Được đề xuất cho bạn dựa trên xếp hạng" type="recommend" />
                    <CoursesCarousel setIsLoading={setIsLoading} setToast={setToast} title="Các khóa học hằng đầu về tiếng việt" />
                    <RecommendedVideos setIsLoading={setIsLoading} setToast={setToast} title="Học viên đang xem" type="recommend" />
                    <RecommendedVideos setIsLoading={setIsLoading} setToast={setToast} title="Các khóa học ngắn và ngọt ngào dành cho bạn" type="recommend" />
                    <RecommendedVideos setIsLoading={setIsLoading} setToast={setToast} title="Đề xuất được cá nhân hóa" type="recommend" />
                    <RecommendedTopic setIsLoading={setIsLoading} setToast={setToast} title="Các chủ đề đề xuất dành cho bạn" type="recommend" />
                </div>
            </div>
        </>
    );;
}

export default Home;
