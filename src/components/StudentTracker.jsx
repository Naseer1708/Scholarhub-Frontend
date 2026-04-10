import React from 'react';
import { UserCircle } from 'lucide-react';

const StudentTracker = ({ students }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Student Name</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Course Progress</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-green-600">Graded</th>
            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map(student => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800">{student.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">{student.progress}% Completed</span>
              </td>
              <td className="px-6 py-4 font-medium text-green-600">{student.grade}</td>
              <td className="px-6 py-4 text-right">
                <button className="px-3 py-1.5 text-sm bg-green-100 text-green-600 hover:bg-green-200 rounded-md transition-colors">
                  Graded
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTracker;
