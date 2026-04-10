import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Mail, Lock, User, Phone, AlertCircle, Info } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // We don't send 'role' anymore; backend decides based on email
      await axios.post('http://localhost:8080/api/users/register', formData);
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      setError("Registration failed. Email might already exist.");
    }
  };

  // Simple check to show user what role they will get
  const predictedRole = formData.email.endsWith('@scholarhub.com') ? 'Educator' : 'Student';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-800">ScholarHub</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-1">Join us today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4" /><span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border rounded-lg" required />
          </div>
          <div className="relative">
            <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border rounded-lg" required />
          </div>
          
          {/* Dynamic Role Hint */}
          {formData.email.length > 0 && (
            <div className={`flex items-center gap-2 text-xs p-2 rounded-lg ${predictedRole === 'Educator' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
              <Info className="w-4 h-4" />
              <span>Registering as: <strong>{predictedRole}</strong></span>
            </div>
          )}

          <div className="relative">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border rounded-lg" required />
          </div>
          <div className="relative">
            <Phone className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border rounded-lg" required />
          </div>
          
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all">
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Use an email ending in <code className="bg-gray-100 px-1 rounded">@scholarhub.com</code> to register as an Educator.</p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;