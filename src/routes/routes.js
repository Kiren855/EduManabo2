import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import CourseDetail from '~/pages/CourseDetail';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.courseDetail, component: CourseDetail },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
