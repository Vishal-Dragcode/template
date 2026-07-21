
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  User as UserIcon,
  Lock as LockIcon,
  LayoutDashboard,
  Shield,
  Zap,
} from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate network delay for a smooth UI experience
    setTimeout(() => {
      // Mock Login Validation
      if (formData.password === "Pass@123") {
        let role_id = null;
        let name = "";
        
        if (formData.email === "superadmin@test.com") {
          role_id = "1"; // Super Admin role
          name = "Super Admin";
        } else if (formData.email === "admin@test.com") {
          role_id = "2"; // Admin role
          name = "Admin";
        } else if (formData.email === "employee@test.com") {
          role_id = "3"; // Employee role
          name = "Employee";
        }

        if (role_id) {
          const mockUser = {
            id: role_id,
            name: name,
            email: formData.email,
            role_id: role_id,
            token: "mock-demo-token-" + role_id
          };
          onLogin(mockUser);
          navigate("/dashboard");
          setIsSubmitting(false);
          return;
        }
      }
      
      // Fallback error if credentials don't match
      setError("Invalid email or password. Please use the demo credentials.");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/authbg_new.png')",
        }}
      ></div>

      {/* Centered Login Form */}
      <div className="w-full flex items-center justify-center p-4 relative z-10 min-h-screen">
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
          <form className="text-center">
            <h2 className="text-white text-3xl font-bold mb-8">Sign In</h2>

            {error && (
              <p className="text-red-500 font-bold text-sm mb-4">{error}</p>
            )}

            {/* Email */}
            <div className="relative mb-8">
              <Mail className="absolute top-1/2 left-0 -translate-y-1/2 w-5 h-5 text-[#7875B5]" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-white focus:border-gray-300 text-white font-medium placeholder-gray-300 focus:outline-none"
                placeholder="Email Address"
                required
              />
            </div>

            {/* Password */}
            <div className="relative mb-8">
              <LockIcon className="absolute top-1/2 left-0 -translate-y-1/2 w-5 h-5 text-[#7875B5]" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-8 pr-12 py-3 bg-transparent border-b-2 border-white focus:border-gray-300 text-white font-medium placeholder-gray-300 focus:outline-none"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#7875B5] hover:text-white focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-2">
              <a
                href="/forgot-password"
                className="text-sm text-white hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="w-fit px-8 py-2 mt-4 text-[#2E4A7B] bg-white font-bold rounded-full shadow-lg hover:bg-gray-100 hover:text-blue-950 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <p className="mt-6 text-center text-sm text-white">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-white hover:underline"
              >
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
