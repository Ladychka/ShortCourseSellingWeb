import { Route, Routes, BrowserRouter } from "react-router-dom";

import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";

// auth views
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import Logout from './views/auth/Logout';
import ForgotPassword from './views/auth/ForgotPassword';
import CreateNewPassword from './views/auth/CreateNewPassword';

// base views
import Index from './views/base/Index';
import CourseDetail from './views/base/CourseDetail';
import Cart from './views/base/Cart';
import Checkout from './views/base/Checkout';
import Success from './views/base/Success';
import Search from './views/base/Search';

// student views
import StudentCourses from './views/student/Courses';
import StudentProfile from './views/student/Profile';
import StudentDashboard from './views/student/Dashboard';
import StudentQA from './views/student/QA';
import Wishlist from './views/student/Wishlist';
import StudentCourseLectureDetail from './views/student/StudentCourseLectureDetail';

// instructor views
import InstructorCourses from "./views/instructor/Courses";
import InstructorDashboard from "./views/instructor/Dashboard";
import InstructorProfile from "./views/instructor/Profile";
import InstructorQA from "./views/instructor/QA";
import Orders from "./views/instructor/Orders";
import Review from "./views/instructor/Review";
import Earning from "./views/instructor/Earning";
import Students from "./views/instructor/Students";
import TeacherNotification from "./views/instructor/TeacherNotification";
import CourseCreate from "./views/instructor/CourseCreate";
import CourseEdit from "./views/instructor/CourseEdit";

import AboutUs from "./views/pages/AboutUs";
import Contact from "./views/pages/ContactUs";


function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          {/* auth */}
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/logout/" element={<Logout />} />
          <Route path="/forgot-password/" element={<ForgotPassword />} />
          <Route path="/create-new-password/" element={<CreateNewPassword />} />

          {/* base */}
          <Route path="/" element={<Index />} />
          <Route path="/course-detail/:slug" element={<CourseDetail />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/checkout/" element={<Checkout />} />
          <Route path="/success/" element={<Success />} />
          <Route path="/search/" element={<Search />} />

          {/* student */}
          <Route path="student/courses/" element={<StudentCourses />} />
          <Route path="student/courses/:slug/" element={<PrivateRoute><StudentCourseLectureDetail /></PrivateRoute>} />
          <Route path="student/profile/" element={<PrivateRoute><StudentProfile /></PrivateRoute>} />
          <Route path="student/dashboard/" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
          <Route path="student/question-answer/" element={<PrivateRoute><StudentQA /></PrivateRoute>} />
          <Route path="student/wishlist/" element={<PrivateRoute><Wishlist /></PrivateRoute>} />


          {/* Page */}
          
          <Route path="pages/about-us/" element={<AboutUs />} />
          <Route path="pages/contact-us/" element={<Contact />} />

          {/* instructor */}
          <Route path="instructor/courses/" element={<PrivateRoute><InstructorCourses /></PrivateRoute>} />
          <Route path="instructor/profile/" element={<PrivateRoute><InstructorProfile /></PrivateRoute>} />
          <Route path="instructor/dashboard/" element={<PrivateRoute><InstructorDashboard /></PrivateRoute>} />
          <Route path="instructor/question-answer/" element={<PrivateRoute><InstructorQA /></PrivateRoute>} />
          <Route path="instructor/orders/" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="instructor/reviews/" element={<PrivateRoute><Review /></PrivateRoute>} />
          <Route path="instructor/earning/" element={<PrivateRoute><Earning /></PrivateRoute>} />
          <Route path="instructor/students/" element={<PrivateRoute><Students /></PrivateRoute>} />
          <Route path="instructor/teacher-notification/" element={<PrivateRoute><TeacherNotification /></PrivateRoute>} />
          <Route path="instructor/create-course/" element={<PrivateRoute><CourseCreate /></PrivateRoute>} />
          <Route path="instructor/course-edit/:slug" element={<PrivateRoute><CourseEdit /></PrivateRoute>} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
