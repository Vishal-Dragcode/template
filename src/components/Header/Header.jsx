// Header.js
import { Menu, Search } from 'lucide-react';
import ProfileDropdown from '../Profile/ProfileDropdown';
import { useTheme } from '../Settings/themeUtils';

const Header = ({ sidebarOpen, setSidebarOpen, user, onLogout }) => {
  const { theme, themeUtils } = useTheme();

  return (
    <header 
      className={`shadow-sm border-b z-30 transition-colors duration-300`}
      style={{ 
        backgroundColor: themeUtils.getBgColor('card'),
        borderColor: themeUtils.getBorderColor()
      }}
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Mobile menu button - Only visible when sidebar is closed */}
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="p-2 rounded-md lg:hidden transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: theme.headerBg ? `${theme.headerBg}10` : 'transparent',
                color: themeUtils.getTextColor(false)
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.headerBg ? `${theme.headerBg}20` : '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.headerBg ? `${theme.headerBg}10` : 'transparent';
              }}
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200"
              style={{ color: themeUtils.getTextColor(false) }}
            />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-12 pr-6 py-3 rounded-full focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-medium"
              style={{ 
                backgroundColor: themeUtils.getBgColor('input'),
                color: themeUtils.getTextColor(true),
                borderColor: themeUtils.getBorderColor()
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 2px ${theme.headerBg ? `${theme.headerBg}40` : '#c7d2fe'}`;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
        <ProfileDropdown user={user} onLogout={onLogout} />
      </div>
    </header>
  );
};

export default Header;