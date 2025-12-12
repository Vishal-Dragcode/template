// App.js - Main App Component
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useTheme, ThemeProvider } from "./components/Settings/themeUtils";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import DashboardReports from "./pages/DashboardReports";
import PageLayouts from "./pages/PageLayouts";
import LoginPage from "./pages/Logins/Login";
import ForgotPasswordPage from "./pages/Logins/ForgotPass";
import OTPVerificationPage from "./pages/Logins/OtpVerification";
import ResetPasswordPage from "./pages/Logins/ResetPassword";
import SignUpPage from "./pages/Logins/SignUp";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Setting from "./components/Settings/Settings";

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { theme, themeUtils } = useTheme();

  // Check if user is logged in on app start
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simple mock authentication with admin role only
      if (email === "admin@example.com" && password === "password") {
        const userData = {
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);

        return { success: true, role: "admin" };
      } else {
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeUtils.getBgColor('default') }}>
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: theme.headerBg || '#6366f1' }}
          ></div>
        </div>
      );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Public Route Component (redirects to dashboard if authenticated)
  const PublicRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeUtils.getBgColor('default') }}>
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: theme.headerBg || '#6366f1' }}
          ></div>
        </div>
      );
    }

    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
  };

  return (
    <div className="font-sans" style={{ backgroundColor: themeUtils.getBgColor('default') }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage onLogin={login} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen overflow-hidden" style={{ backgroundColor: themeUtils.getBgGradient() }}>
                {sidebarOpen && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                  ></div>
                )}

                <Sidebar
                  isSidebarCollapsed={isSidebarCollapsed}
                  setIsSidebarCollapsed={setIsSidebarCollapsed}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                    onLogout={logout}
                  />

                  <main 
                    className="flex-1 overflow-y-auto hide-scrollbar"
                    style={{ backgroundColor: themeUtils.getBgColor('default') }}
                  >
                    <div className="p-6">
                      <Routes>
                        <Route path="/" element={<DashboardOverview />} />
                        <Route
                          path="/dashboard"
                          element={<DashboardOverview />}
                        />
                        <Route
                          path="/dashboard/overview"
                          element={<DashboardOverview />}
                        />
                        <Route
                          path="/dashboard/analytics"
                          element={<DashboardAnalytics />}
                        />
                        <Route
                          path="/dashboard/reports"
                          element={<DashboardReports />}
                        />
                        <Route path="/page-layouts" element={<PageLayouts />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Setting />} />
                      </Routes>
                    </div>
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* --- Custom CSS for Font and Scrollbar --- */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
        body {
          font-family: "Inter", sans-serif;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        html,
        body,
        #root {
          height: 100%;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;