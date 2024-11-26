import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TargetAudience from '../TargetAudience';
import CourseOverview from '../CourseOverview';
import CourseMessage from '../CourseMessage';
import Pricing from '../Pricing';
import Settings from '../Settings';
import Curriculum from '../Curriculum';

import styles from './ContentSection.module.scss';

const cx = classNames.bind(styles);

const data = {
    "objectives": ["Học cách lập trình cơ bản", "Hiểu về thuật toán", "Tạo ứng dụng web cơ bản", "Phát triển ứng dụng nâng cao"],
    "prerequisites": ["Máy tính có cài đặt Python", "Kiến thức cơ bản về máy tính"],
    "targetAudience": ["Người muốn học lập trình từ đầu"],
}

const ContentSection = ({ section }) => {

    const [targetAudienceData, setTargetAudienceData] = useState(data);

    const renderContent = () => {
        switch (section) {
            case 'target':
                return (
                    <div>
                        {targetAudienceData ? (
                            <TargetAudience data={targetAudienceData} />
                        ) : (
                            <p>Đang tải dữ liệu...</p>
                        )}
                    </div>
                );
            case 'planLearn':
                return <Curriculum />;
            case 'overview':
                return <CourseOverview />;
            case 'message':
                return <CourseMessage />;
            case 'pricing':
                return <Pricing />;
            case 'settings':
                return <Settings />;
            default:
                return <div>Chọn một mục từ thanh điều hướng bên trái.</div>;
        }
    };

    return <div className={cx('content')}>{renderContent()}</div>;
};

export default ContentSection;
