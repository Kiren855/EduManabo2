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
import Cart from '~/pages/Cart';
import Layout1 from '~/layouts/Layout1';
import MyCourse from '~/pages/MyCourse';
import AllCoursesComponent from '~/components/MyCourses/AllCoursesComponent';
import MyListsComponent from '~/components/MyCourses/MyListsComponent';
import WishListComponent from '~/components/MyCourses/WishListComponent';
import ArchivedComponent from '~/components/MyCourses/ArchivedComponent';
import Auth from '~/pages/Auth';
import NothingLayout from '~/layouts/NothingLayout';
import ProfilePage from '~/pages/ProfilePage';
import InstructorCoursePage from '~/pages/InstructorCoursePage';
import ResourcesComponent from '~/components/ResourcesComponent';
import ProfileSettings from '~/components/User/ProfileSettings';
import AccountSettings from '~/components/User/AccountSettings';
import NotFound from '~/pages/NotFound';
import CreateCourse from '~/components/InstructorComponents';
import { HeaderOnly } from '~/layouts';

// Public routes
const publicRoutes = [
    { path: config.routes.auth, component: Auth, layout: NothingLayout },
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
    { path: config.routes.cart, component: Cart },
    {
        path: config.routes.userMyCourse,
        component: MyCourse,
        layout: Layout1,
        children: [
            { path: "", component: AllCoursesComponent },
            { path: "learning", component: AllCoursesComponent },
            { path: "lists", component: MyListsComponent },
            { path: "wishlist", component: WishListComponent },
            { path: "archived", component: ArchivedComponent },
        ],
    },
    {
        path: config.routes.instructorPage,
        component: ProfilePage,
        layout: NothingLayout,
        children: [
            { path: "", component: InstructorCoursePage },
            { path: "courses", component: InstructorCoursePage },
            { path: "communication", component: ResourcesComponent },
            { path: "performance", component: ResourcesComponent },
            { path: "settings", component: ProfileSettings },
            { path: "account", component: AccountSettings },
            { path: "tools", component: ResourcesComponent },
            { path: "resources", component: ResourcesComponent },
        ],
    },
    { path: "*", component: NotFound },
    { path: config.routes.createCourse, component: CreateCourse, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
