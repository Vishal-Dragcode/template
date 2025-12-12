// pages/Logins/OTPVerificationPage.js
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  return (
    // This is the main container that will handle the layout
    <div className="flex min-h-screen relative">
      {/* Background Image - Now visible on all screen sizes */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-800 opacity-80"></div>
      
      {/* Left Side Panel - Only visible on large screens, now 60% width */}
      <div className="hidden lg:flex lg:w-3/5 relative z-10">
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Verify Your Email</h1>
          <p className="text-lg mb-8">
            We've sent a 6-digit code to your email. Enter it below to verify your account.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <Mail className="w-5 h-5" />
              </div>
              <p className="text-lg">Email Verification</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-lg">Secure & Simple</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <ArrowRight className="w-5 h-5" />
              </div>
              <p className="text-lg">Quick Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - OTP Verification Form - Now 40% width */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 relative z-10 h-screen">
        {/* Form Container with attractive design - matching SignUpPage */}
        <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3">
              <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Verify Your Email</h2>
            <p className="text-sm text-slate-500">We've sent a 6-digit code to your email.</p>
          </div>

          <form className="space-y-4">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-xl font-semibold bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
            >
              Verify Account
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            Didn't receive a code?{' '}
            <button className="font-medium text-indigo-600 hover:text-indigo-500">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;