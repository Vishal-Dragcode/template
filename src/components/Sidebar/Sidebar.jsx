// Sidebar.js
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, LayoutDashboard, Layers, Package, SlidersHorizontal,
  Palette, FileText, Bell, ChevronRight, ChevronLeft, X,
  Grid3x3, BarChart3, Menu
} from 'lucide-react';
import Logo from '../Header/Logo';
import { useTheme } from '../Settings/themeUtils';

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState({ Dashboard: true });
  const { theme, themeUtils } = useTheme();

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      hasSub: true, 
      path: '/dashboard',
      subItems: [
        { label: 'Overview', icon: Grid3x3, path: '/dashboard/overview' }, 
        { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' }, 
        { label: 'Reports', icon: FileText, path: '/dashboard/reports' }
      ] 
    },
    { icon: LayoutDashboard, label: 'Page Layouts', path: '/page-layouts' },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleMenuClick = (item) => {
    if (item.hasSub) {
      setExpanded(prev => ({ ...prev, [item.label]: !prev[item.label] }));
    }
    // Close mobile sidebar after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // New function for handling sub-item clicks without closing sidebar
  const handleSubItemClick = () => {
    // Don't close the sidebar when clicking on sub-items
    // Just navigate to the sub-item route
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On desktop, always show the sidebar
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Mobile Menu Button - Always visible on mobile */}
      <button
        onClick={toggleMobileSidebar}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md shadow-md`}
        style={{ backgroundColor: themeUtils.getBgColor('card') }}
      >
        <Menu className="w-5 h-5" style={{ color: themeUtils.getTextColor(false) }} />
      </button>
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-screen shadow-lg flex-col transform transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-16' : 'w-64'} lg:relative lg:translate-x-0 lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex`} style={{ backgroundColor: themeUtils.getBgColor('card') }}>
        <div className={`h-16 flex items-center justify-between px-3 border-b`} style={{ borderColor: themeUtils.getBorderColor() }}>
          <Logo isCollapsed={isSidebarCollapsed} />
          <div className="flex items-center gap-2">
            {/* Collapse/Expand button - Visible on all screens */}
            <button 
              onClick={toggleSidebar} 
              className="p-1.5 rounded-md transition-colors"
              style={{ color: themeUtils.getTextColor(false) }}
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
            {/* Close button - Only visible on mobile */}
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="p-1.5 rounded-md lg:hidden transition-colors"
              style={{ color: themeUtils.getTextColor(false) }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
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
                    isItemActive 
                      ? 'shadow-sm' 
                      : ""
                  }`}
                  style={{
                    backgroundColor: isItemActive ? theme.headerBg : 'transparent',
                    color: isItemActive ? themeUtils.getTextColor(theme.headerBg) : themeUtils.getTextColor(false)
                  }}
                  title={isSidebarCollapsed ? item.label : ''}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`text-sm transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>{item.label}</span>
                  </div>
                  {item.hasSub && !isSidebarCollapsed && (
                    <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
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
                          onClick={handleSubItemClick}  // Use the new function here
                          className={`flex items-center gap-3 w-full text-left text-sm py-2 px-3 rounded transition ${
                            isSubActive 
                              ? 'font-medium' 
                              : ""
                          }`}
                          style={{
                            backgroundColor: isSubActive ? theme.navbarBg : 'transparent',
                            color: isSubActive ? themeUtils.getTextColor(theme.navbarBg) : themeUtils.getTextColor(false)
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