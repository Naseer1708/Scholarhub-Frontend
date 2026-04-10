import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Star, Play } from 'lucide-react';

const LandingPage = () => {
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleEnter = () => {
    // Navigate to login and pass the selected role
    navigate('/login', { state: { role: role } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">ScholarHub</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
          <button 
            onClick={() => setRole('student')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${role === 'student' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setRole('educator')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${role === 'educator' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
          >
            Educator
          </button>
        </div>
      </nav>

      {/* Hero Section - Added flex-grow to push footer down */}
      <div className="flex-grow max-w-7xl mx-auto px-6 pt-20 pb-12 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Empower Education.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Simplify Learning.
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            The all-in-one platform for educators to create courses and students to master new skills. 
            Seamless content management, tracking, and delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={handleEnter}
              className="px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Hero Graphic - Redesigned Professional Card */}
        <div className="flex-1 relative w-full max-w-lg">
          {/* Background Blobs */}
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          
          {/* Main Card */}
          <div className="relative bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Featured Course</span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> Bestseller
              </span>
            </div>

            {/* Course Image Area */}
            <div className="h-36 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="w-14 h-14 rounded-full bg-white/25 border-2 border-white flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors z-10">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>

            {/* Course Info */}
            <h3 className="font-bold text-xl text-gray-800 mb-1">Full Stack Web Development</h3>
            <p className="text-sm text-gray-500 mb-4">By Prof. Sarah Johnson</p>

            {/* Stats Row */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-medium">2,540 Students</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER STRIP --- */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="font-medium">© 2026 ScholarHub. All Rights Reserved.</p>
          <p className="font-medium mt-2 md:mt-0">
            Developed by <span className="text-indigo-100">Karthik Tottanapudi</span> | <span className="text-indigo-100">Mohammad Naseeruddin</span> | <span className="text-indigo-100">Mohan Krishna</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;