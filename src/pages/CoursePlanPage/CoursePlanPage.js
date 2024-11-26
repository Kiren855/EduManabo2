import React, { useState } from 'react';
import classNames from 'classnames/bind';
import TopBar from '~/components/Nav/TopBar';
import NavBarInstructor from '~/components/Nav/NavBarInstructor';
import ContentSection from '~/components/CreateCourse/ContentSection';
import Footer from '~/layouts/components/Footer';

import styles from './CoursePlanPage.module.scss';

const cx = classNames.bind(styles);

const CoursePlanPage = () => {
    const [selectedSection, setSelectedSection] = useState('target');

    return (
        <>
            <div className={cx('page')}>
                <TopBar />
                <div className={cx('main')}>
                    <NavBarInstructor onSelectSection={setSelectedSection} />
                    <ContentSection section={selectedSection} />
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default CoursePlanPage;
