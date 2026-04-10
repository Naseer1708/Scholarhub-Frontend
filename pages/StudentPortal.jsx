import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, GraduationCap, LayoutDashboard, LogOut, Play, AlertTriangle, X, Upload, FileText, Trash2, Mail, Phone, Award, User } from 'lucide-react';

const StudentPortal = () => {
  // 1. Get logged-in user info (REAL DATA)
  const loggedInUser = JSON.parse(localStorage.getItem('scholarHubUser') || '{}');
  
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]); 
  const [activeView, setActiveView] = useState('catalog');
  
  // Use the real logged-in user info directly
  const studentInfo = loggedInUser;
  
  // Assessment State
  const [assessments, setAssessments] = useState({});
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch Courses AND Enrollments on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch All Courses
        const coursesRes = await axios.get('http://localhost:8080/api/courses');
        setCourses(coursesRes.data);

        // 2. Fetch User's Enrollments (if logged in)
        if (loggedInUser.id) {
          const enrollRes = await axios.get(`http://localhost:8080/api/enrollments/student/${loggedInUser.id}`);
          const courseIds = enrollRes.data.map(en => en.course.id);
          setEnrolledCourseIds(courseIds);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [loggedInUser.id]);

  const myCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const openModal = (action, course) => {
    setModalAction(action);
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setSelectedCourse(null);
  };

  const handleConfirmAction = async () => {
    if (!selectedCourse || !loggedInUser.id) {
      alert("Please login first to enroll.");
      closeModal();
      return;
    }

    try {
      if (modalAction === 'enroll') {
        await axios.post('http://localhost:8080/api/enrollments', {
          studentId: loggedInUser.id,
          courseId: selectedCourse.id
        });
        setEnrolledCourseIds([...enrolledCourseIds, selectedCourse.id]);
      } else if (modalAction === 'cancel') {
        await axios.delete('http://localhost:8080/api/enrollments', {
          params: {
            studentId: loggedInUser.id,
            courseId: selectedCourse.id
          }
        });
        setEnrolledCourseIds(enrolledCourseIds.filter(id => id !== selectedCourse.id));
      }
    } catch (err) {
      console.error("Action failed", err);
      alert("Action failed. Check console.");
    }
    
    closeModal();
  };

  const handleFileUpload = (courseId, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const mockMarks = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    setAssessments(prev => ({
      ...prev,
      [courseId]: { submitted: true, fileName: file.name, marks: mockMarks }
    }));
  };
  
  const handleRemoveFile = (courseId) => {
    setAssessments(prev => ({ ...prev, [courseId]: { submitted: false, fileName: null, marks: 0 } }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">ScholarHub</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveView('catalog')} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${activeView === 'catalog' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard className="w-5 h-5" /> Course Catalog
          </button>
          <button onClick={() => setActiveView('my-courses')} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${activeView === 'my-courses' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <GraduationCap className="w-5 h-5" /> My Courses
          </button>
          <button onClick={() => setActiveView('assessments')} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${activeView === 'assessments' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Upload className="w-5 h-5" /> Assessments
          </button>
          <button onClick={() => setActiveView('profile')} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${activeView === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <User className="w-5 h-5" /> Student Profile
          </button>
        </nav>

        <Link to="/" onClick={() => localStorage.removeItem('scholarHubUser')} className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-2.5 rounded-lg mt-auto">
          <LogOut className="w-5 h-5" /> Logout
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeView === 'catalog' ? 'Explore Courses' : activeView === 'my-courses' ? 'My Learning' : activeView === 'assessments' ? 'Assessments' : 'Student Profile'}
          </h1>
          <p className="text-gray-500">
            {activeView === 'catalog' ? 'Find your next skill from our catalog.' : activeView === 'my-courses' ? 'Continue where you left off.' : activeView === 'assessments' ? 'Submit your assignments for evaluation.' : 'View your personal information.'}
          </p>
        </div>

        {activeView === 'catalog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No courses available.</p>
              </div>
            ) : (
              courses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-40 overflow-hidden">
                    <img src={course.image || `https://placehold.co/300x200/4F46E5/FFFFFF?text=${course.title}`} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 text-gray-800">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">By {course.educator?.name || 'Unknown'}</p>
                    
                    {enrolledCourseIds.includes(course.id) ? (
                      <div className="flex items-center justify-between">
                         <span className="flex items-center gap-2 text-green-600 font-medium text-sm">
                          <Play className="w-4 h-4" /> Enrolled
                         </span>
                         <button onClick={() => openModal('cancel', course)} className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => openModal('enroll', course)} className="w-full py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 transition-colors text-sm">
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeView === 'my-courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <GraduationCap className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No courses enrolled yet.</p>
                <button onClick={() => setActiveView('catalog')} className="text-indigo-600 text-sm font-medium mt-2 hover:underline">
                  Browse Catalog
                </button>
              </div>
            ) : (
              myCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                   <div className="h-32 bg-gradient-to-br from-green-400 to-indigo-500 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white/50" />
                   </div>
                   <div className="p-5 flex-1 flex flex-col justify-between">
                     <div>
                       <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                       <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                       </div>
                       <p className="text-xs text-gray-500 mt-1">30% Complete</p>
                     </div>
                     <div className="flex gap-2 mt-4">
                       <Link to={`/student/course/${course.id}`} className="flex-1 text-center py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                         Continue
                       </Link>
                       <button onClick={() => openModal('cancel', course)} className="px-3 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors text-sm border border-red-100">
                         Cancel
                       </button>
                     </div>
                   </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeView === 'assessments' && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {myCourses.length === 0 ? (
             <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
               <Upload className="w-12 h-12 mx-auto text-gray-300 mb-3" />
               <p className="text-gray-500 font-medium">Enroll in a course to see assessments.</p>
             </div>
           ) : (
             myCourses.map((course) => {
               const assessment = assessments[course.id] || { submitted: false, fileName: null, marks: 0 };
               return (
                 <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                   <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white">
                     <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                   </div>
                   <div className="p-6">
                     {!assessment.submitted ? (
                       <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 cursor-pointer block">
                         <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                         <p className="text-gray-600 font-medium text-sm">Click to upload file</p>
                         <input type="file" className="hidden" onChange={(e) => handleFileUpload(course.id, e)} />
                       </label>
                     ) : (
                       <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                         <div className="flex items-center gap-3">
                           <FileText className="w-5 h-5 text-green-600" />
                           <div className="flex-1">
                             <p className="text-sm font-medium">{assessment.fileName}</p>
                           </div>
                           <button onClick={() => handleRemoveFile(course.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                         </div>
                         <p className="text-sm text-indigo-600 font-bold mt-2">Score: {assessment.marks}/100</p>
                       </div>
                     )}
                   </div>
                 </div>
               );
             })
           )}
         </div>
        )}

        {/* Student Profile Section - Now Dynamic */}
        {activeView === 'profile' && studentInfo && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Student Profile</h2>
                </div>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Full Name</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800">{studentInfo.name || 'Not Available'}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Student ID</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800">{studentInfo.id || 'N/A'}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-indigo-600" />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Phone Number</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800">{studentInfo.phone || 'Not Provided'}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Email</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800">{studentInfo.email || 'Not Available'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                {modalAction === 'enroll' ? 'Confirm Enrollment' : 'Cancel Enrollment'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-2">Are you sure you want to {modalAction === 'enroll' ? 'enroll in' : 'cancel'}:</p>
              <p className="font-bold text-gray-800 text-lg">{selectedCourse.title}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={closeModal} className="px-5 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-200">No, Go Back</button>
              <button onClick={handleConfirmAction} className={`px-5 py-2 text-white font-semibold rounded-lg ${modalAction === 'enroll' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'}`}>
                Yes, {modalAction === 'enroll' ? 'Enroll' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;