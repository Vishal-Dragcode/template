import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Layers,
  Package,
  SlidersHorizontal,
  Palette,
  FileText,
  Bell,
  ChevronRight,
  ChevronLeft,
  X,
  Grid3x3,
  BarChart3,
  Menu,
} from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "../ui/Settings/themeUtils";

const Sidebar = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState({ Dashboard: true });
  const { theme, themeUtils } = useTheme();

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: LayoutDashboard,
      label: "Face Registration",
      path: "/face-registration",
    },
    {
      label: "Labour List",
      icon: Package,
      path: "/project-management",
    },
    {
      label: "Live Attendence",
      icon: Package,
      path: "/live-attendence",
    },
    {
      label: "Attendance Gallery",
      icon: Package,
      path: "/attendance-gallery",
    },
    {
      label: "Evidence Gallery",
      icon: Package,
      path: "/evidence-gallery",
    }
  ];

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleMenuClick = (item) => {
    if (isSidebarCollapsed && item.hasSub) {
      setIsSidebarCollapsed(false);
    }

    if (item.hasSub) {
      setExpanded((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
    }

    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleSubItemClick = () => {};

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <button
        onClick={toggleMobileSidebar}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md shadow-md`}
        style={{ backgroundColor: themeUtils.getBgColor("card") }}
      >
        <Menu
          className="w-5 h-5"
          style={{ color: themeUtils.getTextColor(false) }}
        />
      </button>

      {/* Toggle button for desktop - always visible, without shadow and rounded corners */}
      <button
        onClick={toggleSidebar}
        className={`hidden lg:flex fixed top-4 z-40 p-2 transition-all duration-300 ${
          isSidebarCollapsed ? "left-4" : "left-64"
        }`}
        style={{ backgroundColor: themeUtils.getBgColor("card") }}
      >
        <ChevronRight
          className={`w-5 h-5 transition-transform ${
            isSidebarCollapsed ? "" : "rotate-180"
          }`}
          style={{ color: themeUtils.getTextColor(false) }}
        />
      </button>

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen shadow-lg flex flex-col
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "w-16" : "w-64"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:z-auto
          min-w-0 flex-shrink-0
        `}
        style={{ backgroundColor: themeUtils.getBgColor("card") }}
      >
        <div
          className={`h-14 flex items-center justify-between px-3 border-b`}
          style={{ borderColor: themeUtils.getBorderColor() }}
        >
          <Logo isCollapsed={isSidebarCollapsed} />
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-md lg:hidden transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
            style={{ color: themeUtils.getTextColor(false) }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto hide-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.path);
            const isOpen = expanded[item.label];

            return (
              <div key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                    isItemActive ? "shadow-sm" : ""
                  }`}
                  style={{
                    backgroundColor: isItemActive
                      ? theme.headerBg
                      : "transparent",
                    color: isItemActive
                      ? themeUtils.getTextColor(theme.headerBg)
                      : themeUtils.getTextColor(false),
                  }}
                  title={isSidebarCollapsed ? item.label : ""}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span
                      className={`text-sm transition-opacity duration-300 ${
                        isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {item.hasSub && !isSidebarCollapsed && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </Link>

                {item.hasSub && isOpen && !isSidebarCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = location.pathname === sub.path;

                      return (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          onClick={handleSubItemClick}
                          className={`flex items-center gap-3 w-full text-left text-sm py-2 px-3 rounded transition ${
                            isSubActive ? "font-medium" : ""
                          }`}
                          style={{
                            backgroundColor: isSubActive
                              ? theme.navbarBg
                              : "transparent",
                            color: isSubActive
                              ? "#000"
                              : themeUtils.getTextColor(false),
                          }}
                        >
                          <SubIcon className="w-4 h-4" />
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;