// pages/Logins/SignUp.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Mock registration - in a real app, this would be an API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful registration, redirect to login
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    // This is the main container that will handle the layout
    <div className="flex min-h-screen relative">
      {/* Background Image - Now visible on all screen sizes */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop')" }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800 opacity-80"></div>
      
      {/* Left Side Panel - Only visible on large screens, now 60% width */}
      <div className="hidden lg:flex lg:w-3/5 relative z-10">
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Start Your Journey With Us</h1>
          <p className="text-lg mb-8">
            Create an account to access exclusive features and personalized content.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <User className="w-5 h-5" />
              </div>
              <p className="text-lg">Personalized Dashboard</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-lg">Secure & Private</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <ArrowRight className="w-5 h-5" />
              </div>
              <p className="text-lg">Easy to Use</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form - Now 40% width */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 relative z-10 h-screen">
        {/* Form Container with attractive design - matching ResetPasswordPage */}
        <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3">
              <User className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
            <p className="text-sm text-slate-500">Sign up to get started</p>
          </div>

          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="sr-only">Email Address</label>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
                placeholder="Password"
                required
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
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <span className="ml-2 text-sm text-slate-600">
                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;