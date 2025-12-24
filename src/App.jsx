import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme, ThemeProvider } from "./ui/Settings/themeUtils";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Dashboard from "./components/dashboard/Dashboard";
import FaceRegistration from "./components/face-registration/FaceRegistration";
import ProjectManagement from "./components/labour-list/ProjectManagement";
import LiveAttendence from "./components/live-attendence/LiveAttendence";
import LoginPage from "./(auth)/Login";
import ForgotPasswordPage from "./(auth)/ForgotPass";
import OTPVerificationPage from "./(auth)/OtpVerification";
import ResetPasswordPage from "./(auth)/ResetPassword";
import SignUpPage from "./(auth)/SignUp";
import Profile from "./ui/Profile/Profile";
import Footer from "./layout/Footer";
import Setting from "./ui/Settings/Settings";
import EvidenceGallery from "./components/evidence-gallery/EvidenceGallery";

// Create a CSS string for the hide-scrollbar class
const scrollbarStyles = `
  .hide-scrollbar {
    /* For IE and Edge */
    -ms-overflow-style: none;
    /* For Firefox */
    scrollbar-width: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    /* For Chrome, Safari, and Opera */
    display: none;
  }
`;

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { theme, themeUtils } = useTheme();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
    
    // Inject the scrollbar styles into the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyles;
    document.head.appendChild(styleElement);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const login = async (email, password) => {
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
      return { success: true };
    }
    return { success: false };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: themeUtils.getBgColor("default") }}
        >
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: theme.headerBg || "#6366f1" }}
          />
        </div>
      );
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div
      className="font-sans"
      style={{ backgroundColor: themeUtils.getBgColor("default") }}
    >
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
              <div
                className="flex h-screen overflow-hidden"
                style={{ backgroundColor: themeUtils.getBgGradient() }}
              >
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
                    style={{
                      backgroundColor: themeUtils.getBgColor("default"),
                    }}
                  >
                    <div className="p-4">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                          path="/face-registration"
                          element={<FaceRegistration />}
                        />

                        <Route
                          path="/project-management"
                          element={<ProjectManagement />}
                        />
                        <Route path="/live-attendence" element={<LiveAttendence/>} />
                        <Route path="/evidence-gallery" element={<EvidenceGallery/>} />

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