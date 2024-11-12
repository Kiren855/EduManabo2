import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import CourseDetail from '~/pages/CourseDetail';
import LearningScreen from '~/pages/LearningScreen';
import LearningScreenLayout from '~/layouts/LearningScreenLayout';
import SearchTabComponent from '~/components/CourseViewTabComponents/SearchTabComponent';
import OverViewTabComponent from '~/components/CourseViewTabComponents/OverViewTabComponent';
import QuestionsTabComponent from '~/components/CourseViewTabComponents/QuestionsTabComponent';
import NotesTabComponent from '~/components/CourseViewTabComponents/NotesTabComponent';
import AnnouncementsTabComponent from '~/components/CourseViewTabComponents/AnnouncementsTabComponent';
import ReviewsTabComponent from '~/components/CourseViewTabComponents/ReviewsTabComponent';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.courseDetail, component: CourseDetail },
    {
        path: config.routes.courseView,
        component: LearningScreen,
        layout: LearningScreenLayout,
        children: [
            { path: "", component: SearchTabComponent },
            { path: "search", component: SearchTabComponent },
            { path: "overview", component: OverViewTabComponent },
            { path: "questions", component: QuestionsTabComponent },
            { path: "notes", component: NotesTabComponent },
            { path: "announcements", component: AnnouncementsTabComponent },
            { path: "reviews", component: ReviewsTabComponent },
        ],
    },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
