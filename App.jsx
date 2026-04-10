import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import EducatorDashboard from './pages/EducatorDashboard';
import StudentPortal from './pages/StudentPortal';
import CourseViewer from './pages/CourseViewer';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/educator/dashboard" element={<EducatorDashboard />} />
          <Route path="/student/portal" element={<StudentPortal />} />
          <Route path="/student/course/:courseId" element={<CourseViewer />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;