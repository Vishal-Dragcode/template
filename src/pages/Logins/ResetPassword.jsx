// pages/Logins/ResetPasswordPage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    // This is the main container that will handle the layout
    <div className="flex min-h-screen relative">
      {/* Background Image - Now visible on all screen sizes */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-orange-700 to-red-800 opacity-80"></div>
      
      {/* Left Side Panel - Only visible on large screens, now 60% width */}
      <div className="hidden lg:flex lg:w-3/5 relative z-10">
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Set New Password</h1>
          <p className="text-lg mb-8">
            Your new password must be different from previous used passwords.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-lg">Secure Password</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <Layers className="w-5 h-5" />
              </div>
              <p className="text-lg">Easy to Remember</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <ArrowRight className="w-5 h-5" />
              </div>
              <p className="text-lg">Quick & Simple</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Password Form - Now 40% width */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 relative z-10 h-screen">
        {/* Form Container with attractive design */}
        <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3">
              <Layers className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Set New Password</h2>
            <p className="text-sm text-slate-500">Your new password must be different from previous used passwords.</p>
          </div>

          <form className="space-y-4">
            <div className="relative">
              <label htmlFor="new-password" className="sr-only">New Password</label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="new-password"
                name="new-password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full pl-10 pr-10 py-2 bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
                placeholder="New Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                className="w-full pl-10 pr-10 py-2 bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
            >
              Reset Password
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              ← Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;