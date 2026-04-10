import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialRole = location.state?.role || 'student';
  const [role, setRole] = useState(initialRole);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // --- NEW OTP STATES ---
  const [step, setStep] = useState('login'); // 'login' or 'otp'
  const [otpInput, setOtpInput] = useState('');
  const [pendingUser, setPendingUser] = useState(null); // Holds user data during OTP verification

  // --- HANDLE LOGIN (STEP 1) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email: email,
        password: password
      });

      if (response.data) {
        const userToSave = { ...response.data, role: role };

        if (role === 'student') {
          // Student: Direct Login
          localStorage.setItem('scholarHubUser', JSON.stringify(userToSave));
          navigate('/student/portal', { replace: true });
        } else {
          // Educator: Go to OTP Step
          setPendingUser(userToSave);
          setStep('otp');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please check credentials.');
    }
  };

  // --- HANDLE OTP VERIFY (STEP 2) ---
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    const STATIC_OTP = "8520";

    if (otpInput === STATIC_OTP) {
      // OTP Correct: Save to storage and Navigate
      localStorage.setItem('scholarHubUser', JSON.stringify(pendingUser));
      navigate('/educator/dashboard', { replace: true });
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  // --- BACK TO LOGIN ---
  const handleBack = () => {
    setStep('login');
    setOtpInput('');
    setError('');
    setPendingUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center items-center p-4">
      
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-800">ScholarHub</span>
      </div>

      {/* CARD CONTAINER */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
        
        {/* --- STEP 1: LOGIN FORM --- */}
        {step === 'login' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-1">Sign in to continue your journey</p>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
              <button 
                onClick={() => { setRole('student'); setError(''); }}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === 'student' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
              >
                Student
              </button>
              <button 
                onClick={() => { setRole('educator'); setError(''); }}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === 'educator' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
              >
                Educator
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Sign In as {role === 'educator' ? 'Educator' : 'Student'}
              </button>
            </form>

            {/* Links */}
            <div className="flex justify-between items-center text-sm mt-6 px-1 border-t border-gray-100 pt-4">
              <Link to="/reset-password" className="text-indigo-600 hover:underline font-medium">
                Forgot Password?
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-indigo-600 font-medium hover:underline">
                Create Account
              </Link>
            </div>
          </>
        )}

        {/* --- STEP 2: OTP VERIFICATION --- */}
        {step === 'otp' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Two-Factor Auth</h2>
              <p className="text-gray-500 mt-2 text-sm">
                Please enter the OTP sent to your registered email address.
              </p>
              <p className="text-xs text-gray-400 mt-1">(Simulated OTP: 8520)</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="relative">
                <input 
                  type="text"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="- - - -"
                  maxLength={4}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
              >
                Verify & Login
              </button>
            </form>

            <button 
              onClick={handleBack} 
              className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;