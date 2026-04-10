import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, PlusCircle, Users, LogOut, X, UserCircle, Trash2, Edit, Save, AlertTriangle, Mail, Phone, Award } from 'lucide-react';

const EducatorDashboard = () => {
  // Get logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem('scholarHubUser') || '{}');

  // States
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]); 
  const [activeTab, setActiveTab] = useState('courses');
  
  // Form State
  const [currentCourse, setCurrentCourse] = useState({ id: null, title: '', description: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

  // Fetch Data on Load
  useEffect(() => {
    if (loggedInUser.id) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [loggedInUser.id]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/courses/educator/${loggedInUser.id}`);
      setCourses(res.data);
    } catch (err) { console.error("Error fetching courses", err); }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/enrollments/educator/${loggedInUser.id}`);
      setEnrollments(res.data);
    } catch (err) { console.error("Error fetching enrollments", err); }
  };

  // Form Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/courses/${currentCourse.id}`, currentCourse);
        alert("Course Updated!");
      } else {
        const newCourse = { ...currentCourse, educator: { id: loggedInUser.id } };
        await axios.post('http://localhost:8080/api/courses', newCourse);
        alert("Course Created!");
      }
      resetForm();
      fetchCourses();
      setActiveTab('courses');
    } catch (err) { console.error("Error saving course", err); }
  };

  const handleEditClick = (course) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setActiveTab('create');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      fetchCourses();
      closeModal();
    } catch (err) { console.error("Error deleting", err); }
  };

  const resetForm = () => {
    setCurrentCourse({ id: null, title: '', description: '', image: '' });
    setIsEditing(false);
  };

  const openDeleteModal = (course) => {
    setCurrentCourse(course);
    setModalAction('delete');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction('');
  };

  // Extract unique students from enrollments for the "Student Info" tab
  const uniqueStudents = [];
  const studentMap = new Map();
  enrollments.forEach(en => {
    if (!studentMap.has(en.student.id)) {
      studentMap.set(en.student.id, true);
      uniqueStudents.push(en.student);
    }
  });

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
          <button onClick={() => { setActiveTab('courses'); resetForm(); }} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'courses' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <BookOpen className="w-5 h-5" /> My Courses
          </button>
          <button onClick={() => setActiveTab('create')} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'create' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <PlusCircle className="w-5 h-5" /> {isEditing ? 'Edit Course' : 'Create Course'}
          </button>
          <button onClick={() => setActiveTab('students')} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'students' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users className="w-5 h-5" /> Student Tracker
          </button>
          <button onClick={() => setActiveTab('student-info')} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'student-info' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <UserCircle className="w-5 h-5" /> Student Info
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
            {activeTab === 'courses' ? 'My Courses' : activeTab === 'create' ? (isEditing ? 'Edit Course' : 'Create Course') : activeTab === 'students' ? 'Student Tracker' : 'Student Information'}
          </h1>
          <p className="text-gray-500 mt-1">
            {activeTab === 'courses' ? 'Manage your course content.' : activeTab === 'create' ? 'Create or update course details.' : activeTab === 'students' ? 'Track progress and grades.' : 'View detailed profiles of enrolled students.'}
          </p>
        </div>

        {/* --- MY COURSES TAB --- */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">You haven't created any courses yet.</p>
                <button onClick={() => { resetForm(); setActiveTab('create'); }} className="text-indigo-600 text-sm font-medium mt-2 hover:underline">
                  Create your first course
                </button>
              </div>
            ) : (
              courses.map(course => (
                <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                  <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center text-white overflow-hidden">
                    {course.image ? <img src={course.image} alt="course" className="w-full h-full object-cover" /> : <BookOpen className="w-10 h-10 opacity-50" />}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-grow">{course.description?.substring(0, 60)}...</p>
                  
                  <div className="flex gap-2 border-t border-gray-100 pt-4 mt-2">
                    <button onClick={() => handleEditClick(course)} className="flex-1 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 text-sm flex items-center justify-center gap-1">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button onClick={() => openDeleteModal(course)} className="flex-1 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 text-sm flex items-center justify-center gap-1">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* --- CREATE / EDIT COURSE TAB --- */}
        {activeTab === 'create' && (
          <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">{isEditing ? 'Update Course Details' : 'Create New Course'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input type="text" value={currentCourse.title} onChange={(e) => setCurrentCourse({...currentCourse, title: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" placeholder="e.g. Advanced React Patterns" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="4" value={currentCourse.description} onChange={(e) => setCurrentCourse({...currentCourse, description: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" placeholder="Brief description..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                <input type="text" value={currentCourse.image || ''} onChange={(e) => setCurrentCourse({...currentCourse, image: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" placeholder="https://example.com/image.jpg" />
              </div>
              
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
                   <Save className="w-5 h-5" /> {isEditing ? 'Update Course' : 'Create Course'}
                </button>
                {isEditing && (
                   <button type="button" onClick={() => { resetForm(); setActiveTab('courses'); }} className="px-5 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">
                     Cancel
                   </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* --- STUDENT TRACKER TAB --- */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Course Enrolled</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enrollments.length === 0 ? (
                  <tr><td colSpan="3" className="text-center py-12 text-gray-400">No students enrolled yet.</td></tr>
                ) : (
                  enrollments.map((en) => (
                    <tr key={en.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                            {en.student?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <span className="font-medium text-gray-800 block">{en.student?.name}</span>
                            <span className="text-xs text-gray-400">{en.student?.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{en.course?.title}</td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${en.progress || 0}%` }}></div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* --- STUDENT INFO TAB (NEW) --- */}
        {activeTab === 'student-info' && (
          <div>
            {uniqueStudents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No student profiles to show yet.</p>
                <p className="text-xs text-gray-400 mt-1">Students will appear here once they enroll in your courses.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uniqueStudents.map((student) => (
                  <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-lg font-bold">
                        {student.name?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{student.name}</h3>
                        <p className="text-indigo-100 text-sm">Student Profile</p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      {/* Full Name */}
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="text-xs font-semibold text-gray-600 uppercase">Full Name</p>
                        <p className="text-lg font-bold text-gray-800">{student.name}</p>
                      </div>

                      {/* Student ID */}
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-indigo-600" />
                          <p className="text-xs font-semibold text-gray-600 uppercase">Student ID</p>
                        </div>
                        <p className="text-lg font-bold text-gray-700 ml-6">{student.id}</p>
                      </div>

                      {/* Phone Number */}
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Phone className="w-4 h-4 text-indigo-600" />
                          <p className="text-xs font-semibold text-gray-600 uppercase">Phone</p>
                        </div>
                        <p className="text-lg font-bold text-gray-700 ml-6">{student.phone || 'Not Provided'}</p>
                      </div>

                      {/* Email */}
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-indigo-600" />
                          <p className="text-xs font-semibold text-gray-600 uppercase">Email</p>
                        </div>
                        <p className="text-sm font-mono text-blue-600 ml-6 break-all">{student.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* DELETE CONFIRMATION MODAL */}
      {isModalOpen && modalAction === 'delete' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Delete Course?</h3>
              <p className="text-gray-500 mb-4">This will permanently delete "{currentCourse.title}".</p>
              <div className="flex gap-3">
                <button onClick={closeModal} className="flex-1 px-5 py-2 bg-gray-200 rounded-lg font-medium hover:bg-gray-300">Cancel</button>
                <button onClick={() => handleDelete(currentCourse.id)} className="flex-1 px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducatorDashboard;