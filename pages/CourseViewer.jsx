import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle, FileUp, ArrowLeft } from 'lucide-react';
import { courseData } from '../data/courseData';

const CourseViewer = () => {
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Get course data from imported courseData
  const course = courseData[courseId] || courseData['full-stack'];
  const currentLesson = course.lessons.find(l => l.id === activeLesson);
  const currentTopic = activeLesson ? course.topics.find(t => t.id === activeLesson) : null;

  const handleMarkComplete = () => {
    // Logic to mark lesson complete would go here
    alert("Lesson marked as complete! (Mock Action)");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Top Bar */}
      <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 shadow-lg">
        <div className="flex items-center gap-4">
          <Link to="/student/portal" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Portal</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
             <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">ScholarHub</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-y-auto flex-shrink-0`}>
          <div className="p-4">
            <h2 className="text-lg font-bold text-white mb-4">{course.title}</h2>
            <div className="space-y-2">
              {course.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveLesson(topic.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                    activeLesson === topic.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{topic.icon}</span>
                  <span className="font-medium truncate">{topic.title}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Toggle Sidebar Button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute left-auto top-1/2 z-10 bg-gray-800 p-1 rounded-r-lg border border-gray-700 border-l-0 text-gray-400 hover:text-white"
          style={{ left: sidebarOpen ? '288px' : '0px', transition: 'left 0.3s' }}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-900 p-8 overflow-y-auto relative">
          <div className="max-w-4xl mx-auto">
            {!activeLesson ? (
              // Curriculum Overview
              <>
                <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
                <p className="text-gray-400 mb-8">Click on a topic from the sidebar to explore the curriculum</p>
                
                <div className="grid gap-4">
                  {course.topics.map((topic) => (
                    <div 
                      key={topic.id}
                      onClick={() => setActiveLesson(topic.id)}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-indigo-500 hover:bg-gray-750 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{topic.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-gray-400 mt-2 text-sm">{topic.description}</p>
                          {topic.subtopics && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {topic.subtopics.slice(0, 3).map((subtopic, idx) => (
                                <span key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                  {subtopic}
                                </span>
                              ))}
                              {topic.subtopics.length > 3 && (
                                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                  +{topic.subtopics.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // Topic Detail View
              <>
                <div className="mb-6 flex items-start gap-3">
                  <span className="text-4xl">{currentTopic?.icon}</span>
                  <div>
                    <h1 className="text-3xl font-bold text-white">{currentTopic?.title}</h1>
                  </div>
                </div>

                {/* Description Section */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
                  <h2 className="text-lg font-semibold text-white mb-3">Overview</h2>
                  <p className="text-gray-300 leading-relaxed">{currentTopic?.description}</p>
                </div>

                {/* Topics Section */}
                {currentTopic?.subtopics && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Topics Covered</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentTopic.subtopics.map((subtopic, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-gray-700 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-200">{subtopic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Placeholder */}
                <div className="aspect-video bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center mb-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white flex items-center justify-center cursor-pointer group-hover:bg-white/20 transition-colors">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                  </div>
                  <span className="absolute bottom-4 right-4 text-sm text-gray-400">Video Content</span>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button 
                    onClick={() => setActiveLesson(null)}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back to Curriculum
                  </button>
                  <button 
                    onClick={handleMarkComplete}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Mark as Complete
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseViewer;