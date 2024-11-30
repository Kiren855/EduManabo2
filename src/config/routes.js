const routes = {
    home: '/',
    profile: '/@:nickname',
    courseDetail: '/course/:courseId',
    courseView: '/course/view/:courseId',
    courseViewSearch: '/course/view/:courseId',
    cart: '/cart',
    userMyCourse: '/user/my-courses',
    auth: '/auth',
    instructorPage: '/user/profile',
    createCourse: '/courses/create',
    editCourse: '/courses/edit/:courseID',
    createVideoLesson: '/create/video/:sectionId',
    createExamLesson: '/create/exam/:sectionId',
    createArticleLesson: '/create/article/:sectionId',
    editArticleLesson: '/edit/article/:sectionId',
    editVideoLesson: '/edit/video/:sectionId',
    editExamLesson: '/edit/exam/:sectionId',
    admin: '/admin',
};

export default routes;
