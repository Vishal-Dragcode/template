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
import axios from "axios";
import { API_URL } from "../api_config";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as GoIcons from "react-icons/go";
import * as TbIcons from "react-icons/tb";
import * as grIcons from "react-icons/gr";
import * as bsIcons from "react-icons/bs";
import * as io5Icon from "react-icons/io5";
import * as fiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";

const Sidebar = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState({});
  const { theme, themeUtils } = useTheme();
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("LPGUser"));
    const userRole = user ? user.role_id : null;

    if (userRole) {
      axios
        .get(`${API_URL}/api/v1/sidemenuRouter/get-menu`, {
          params: { role_id: userRole },
        })
        .then((response) => {
          setMenuData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching menu data:", error);
        });
    }
  }, []);

  const getIcon = (iconName) => {
    if (!iconName) return Package;
    const IconComponent =
      FaIcons[iconName] ||
      MdIcons[iconName] ||
      IoIcons[iconName] ||
      TbIcons[iconName] ||
      GoIcons[iconName] ||
      bsIcons[iconName] ||
      GiIcons[iconName] ||
      AiIcons[iconName] ||
      grIcons[iconName] ||
      io5Icon[iconName] ||
      fiIcons[iconName];
    
    return IconComponent || Package;
  };

  const isActive = (path) => {
    return (
      location.pathname === path || (path !== "/" && location.pathname.startsWith(path + "/"))
    );
  };

  const handleMenuClick = (item, label) => {
    if (isSidebarCollapsed && item.sub_menus) {
      setIsSidebarCollapsed(false);
    }

    if (item.sub_menus) {
      setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
    }

    if (window.innerWidth < 1024 && !item.sub_menus) {
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
          {menuData.map((item, index) => {
            const Icon = getIcon(item.menu_icon);
            const label = item.menu;
            const hasSub = item.sub_menus && item.sub_menus.length > 0 && item.sub_menus.some(sub => sub.sub_menu && sub.sub_menu.trim() !== "");
            const isOpen = expanded[label];
            
            // If it doesn't have submenus, it might be a direct link or we take the first item's URL
            const path = hasSub ? "#" : (item.sub_menus && item.sub_menus[0] ? item.sub_menus[0].page_url : (item.page_url || "/"));
            const isItemActive = isActive(path);

            return (
              <div key={label + index}>
                <Link
                  to={path}
                  onClick={() => handleMenuClick(item, label)}
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
                  title={isSidebarCollapsed ? label : ""}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span
                      className={`text-sm transition-opacity duration-300 ${
                        isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {hasSub && !isSidebarCollapsed && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </Link>

                {hasSub && isOpen && !isSidebarCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.sub_menus.map((sub, subIndex) => {
                      if (!sub.sub_menu || sub.sub_menu.trim() === "") return null;
                      const SubIcon = getIcon(sub.sub_icon || sub.icon);
                      const isSubActive = location.pathname === sub.page_url;
                      const hasLevel1 = sub.level1s && sub.level1s.length > 0 && sub.level1s.some(l1 => l1.level1 && l1.level1.trim() !== "");
                      const isSubOpen = expanded[sub.sub_menu];

                      return (
                        <div key={sub.sub_menu + subIndex}>
                          <Link
                            to={hasLevel1 ? "#" : sub.page_url}
                            onClick={() => {
                              if (hasLevel1) {
                                setExpanded(prev => ({ ...prev, [sub.sub_menu]: !prev[sub.sub_menu] }));
                              } else if (window.innerWidth < 1024) {
                                setSidebarOpen(false);
                              }
                            }}
                            className={`flex items-center justify-between w-full text-left text-sm py-2 px-3 rounded transition ${
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
                            <div className="flex items-center gap-3">
                              <SubIcon className="w-4 h-4" />
                              {sub.sub_menu}
                            </div>
                            {hasLevel1 && (
                              <ChevronRight
                                className={`w-3.5 h-3.5 transition-transform ${
                                  isSubOpen ? "rotate-90" : ""
                                }`}
                              />
                            )}
                          </Link>

                          {hasLevel1 && isSubOpen && (
                            <div className="ml-4 mt-1 space-y-1">
                              {sub.level1s.map((l1, l1Index) => {
                                if (!l1.level1 || l1.level1.trim() === "") return null;
                                const isL1Active = location.pathname === l1.page_url;
                                return (
                                  <Link
                                    key={l1.level1 + l1Index}
                                    to={l1.page_url}
                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                    className={`flex items-center gap-3 w-full text-left text-xs py-1.5 px-3 rounded transition ${
                                      isL1Active ? "font-medium" : ""
                                    }`}
                                    style={{
                                      backgroundColor: isL1Active
                                        ? theme.navbarBg
                                        : "transparent",
                                      color: isL1Active
                                        ? "#000"
                                        : themeUtils.getTextColor(false),
                                    }}
                                  >
                                    {l1.level1}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
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