import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import CoursesPage from './pages/CoursePage/CoursePage';
import CourseDetailPage from './pages/CourseDetails/CourseDetails';
import EnrollmentsPage from './pages/EnrollmentPage/EnrollmentsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import InstructorPage from './pages/InstructorPage/InstructorPage';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import InstructorDetails from './pages/InstructorDetails/InstructorDetails';
import PrivateRoute from './components/Auth/PrivateRoute';
import "./index.css";
import CourseVideoPage from './pages/CourseVideos/CourseVideos';
import UpdateCoursePage from './pages/UpdateCoursePage/UpdateCoursePage';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Header />
        <main className="app-main">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/instructors" element={<InstructorPage />} />
            <Route path="/instructor/:instructorId" element={<InstructorDetails />} />
            <Route element={<PrivateRoute />}>
              <Route path="/course/:courseId/video" element={<CourseVideoPage />} />
              <Route path="/profile/:id" element={ <ProfilePage /> } />
              <Route path="/enrollments" element={<EnrollmentsPage />} />
              <Route path="/updatecourse/:courseId" element={<UpdateCoursePage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
