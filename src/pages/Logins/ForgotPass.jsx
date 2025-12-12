// pages/Logins/ForgotPasswordPage.js
import { Link } from 'react-router-dom';
import { Layers, Mail, ArrowRight } from 'lucide-react';

const ForgotPasswordPage = () => {
  return (
    // This is the main container that will handle the layout
    <div className="flex min-h-screen relative">
      {/* Background Image - Now visible on all screen sizes */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-700 to-cyan-800 opacity-80"></div>
      
      {/* Left Side Panel - Only visible on large screens, now 60% width */}
      <div className="hidden lg:flex lg:w-3/5 relative z-10">
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Forgot Your Password?</h1>
          <p className="text-lg mb-8">
            No worries, we'll send you reset instructions to your registered email address.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <Mail className="w-5 h-5" />
              </div>
              <p className="text-lg">Email Instructions</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <Layers className="w-5 h-5" />
              </div>
              <p className="text-lg">Secure & Simple</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <ArrowRight className="w-5 h-5" />
              </div>
              <p className="text-lg">Quick Recovery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form - Now 40% width */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 relative z-10 h-screen">
        {/* Form Container with attractive design - matching SignUpPage */}
        <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3">
              <Layers className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Forgot Password?</h2>
            <p className="text-sm text-slate-500">No worries, we'll send you reset instructions.</p>
          </div>

          <form className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email address</label>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
            >
              Send Reset Link
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

export default ForgotPasswordPage;