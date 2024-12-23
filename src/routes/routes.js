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
import CoursePlanPage from '~/pages/CoursePlanPage';
import UploadLessonForm from '~/components/CreateCourse/UploadLessonForm';
import ExamLessonForm from '~/components/CreateCourse/ExamLessonForm';
import ArticleForm from '~/components/CreateCourse/ArticleForm';
import EditArticleForm from '~/components/CreateCourse/EditArticleForm';
import EditLessonForm from '~/components/CreateCourse/EditLessonForm';
import EditExamForm from '~/components/CreateCourse/EditExamForm';
import CourseManagement from '~/pages/CourseManagement';

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
    { path: config.routes.editCourse, component: CoursePlanPage, layout: NothingLayout },
    { path: config.routes.createVideoLesson, component: UploadLessonForm, layout: NothingLayout },
    { path: config.routes.createExamLesson, component: ExamLessonForm, layout: NothingLayout },
    { path: config.routes.createArticleLesson, component: ArticleForm, layout: NothingLayout },
    { path: config.routes.editArticleLesson, component: EditArticleForm, layout: NothingLayout },
    { path: config.routes.editVideoLesson, component: EditLessonForm, layout: NothingLayout },
    { path: config.routes.editExamLesson, component: EditExamForm, layout: NothingLayout },
    { path: config.routes.admin, component: CourseManagement },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
