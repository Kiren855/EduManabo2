import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TargetAudience from '../TargetAudience';
import CourseOverview from '../CourseOverview';
import CourseMessage from '../CourseMessage';
import Pricing from '../Pricing';
import Settings from '../Settings';
import Curriculum from '../Curriculum';
import SectionManager from '../SectionManager';

import styles from './ContentSection.module.scss';

const cx = classNames.bind(styles);

const ContentSection = ({ section }) => {

    const renderContent = () => {
        switch (section) {
            case 'target':
                return <TargetAudience />;
            case 'planLearn':
                return <SectionManager />;
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
