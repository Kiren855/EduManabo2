import classNames from 'classnames/bind';
import styles from './home.module.scss';


import WelcomeBack from '~/components/WelcomeBack';
import AdCarousel from '~/components/AdCarousel';
import RecommendedVideos from '~/components/RecommendedVideos';
import CoursesCarousel from '~/components/CoursesCarousel';
import RecommendedTopic from '~/components/RecommendedTopic';

const cx = classNames.bind(styles);


function Home() {

    const isLogin = false;

    return (
        <>
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
                    <RecommendedVideos title="Được đề xuất cho bạn" type="recommend" />
                    <RecommendedVideos title="Được đề xuất cho bạn dựa trên xếp hạng" type="recommend" />
                    <CoursesCarousel title="Các khóa học hằng đầu về tiếng việt" />
                    <RecommendedVideos title="Học viên đang xem" type="recommend" />
                    <RecommendedVideos title="Các khóa học ngắn và ngọt ngào dành cho bạn" type="recommend" />
                    <RecommendedVideos title="Đề xuất được cá nhân hóa" type="recommend" />
                    <RecommendedTopic title="Các chủ đề đề xuất dành cho bạn" type="recommend" />
                </div>
            </div>
        </>
    );;
}

export default Home;
