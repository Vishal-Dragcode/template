// pages/DashboardOverview.js
import { User, Activity, DollarSign, TrendingUp, ArrowUp, ArrowDown, Users, ShoppingCart, Target, Clock } from 'lucide-react';
import { useTheme } from '../components/Settings/themeUtils';

const DashboardOverview = () => {
  const { theme, themeUtils } = useTheme();

  // Function to determine trend direction icon and color
  const getTrendIcon = (value) => {
    if (value > 0) {
      return { icon: <ArrowUp className="w-4 h-4" />, color: '#10b981' };
    } else {
      return { icon: <ArrowDown className="w-4 h-4" />, color: '#ef4444' };
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: themeUtils.getTextColor(true) }}>
          Dashboard Overview
        </h1>
        <p style={{ color: themeUtils.getTextColor(false) }}>
          Welcome back! Here's what's happening with your project today.
          <span 
            className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm"
            style={{
              backgroundColor: theme.headerBg ? `${theme.headerBg}20` : '#e0e7ff',
              color: theme.headerBg || '#6366f1'
            }}
          >
            Admin Access
          </span>
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow" 
             style={{ 
               backgroundColor: themeUtils.getBgColor('card'),
               borderColor: themeUtils.getBorderColor()
             }}>
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.headerBg ? `${theme.headerBg}20` : '#e0e7ff' }}
            >
              <Users className="w-6 h-6" style={{ color: theme.headerBg || '#6366f1' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#10b981' }}>
              {getTrendIcon(12).icon} 12%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Total Users</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>8,549</p>
          <div className="mt-3 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: themeUtils.getBorderColor() }}>
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '75%', 
                backgroundColor: theme.headerBg || '#6366f1' 
              }}
            ></div>
          </div>
        </div>
        
        <div className="rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow" 
             style={{ 
               backgroundColor: themeUtils.getBgColor('card'),
               borderColor: themeUtils.getBorderColor()
             }}>
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#d1fae5' }}
            >
              <DollarSign className="w-6 h-6" style={{ color: '#10b981' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#10b981' }}>
              {getTrendIcon(8).icon} 8%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Revenue</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>$48,574</p>
          <div className="mt-3 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: themeUtils.getBorderColor() }}>
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '82%', 
                backgroundColor: '#10b981' 
              }}
            ></div>
          </div>
        </div>
        
        <div className="rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow" 
             style={{ 
               backgroundColor: themeUtils.getBgColor('card'),
               borderColor: themeUtils.getBorderColor()
             }}>
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#fef3c7' }}
            >
              <Target className="w-6 h-6" style={{ color: '#f59e0b' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#ef4444' }}>
              {getTrendIcon(-3).icon} 3%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Conversion Rate</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>3.24%</p>
          <div className="mt-3 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: themeUtils.getBorderColor() }}>
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '32%', 
                backgroundColor: '#f59e0b' 
              }}
            ></div>
          </div>
        </div>
        
        <div className="rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow" 
             style={{ 
               backgroundColor: themeUtils.getBgColor('card'),
               borderColor: themeUtils.getBorderColor()
             }}>
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#fee2e2' }}
            >
              <Activity className="w-6 h-6" style={{ color: '#ef4444' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#10b981' }}>
              {getTrendIcon(5).icon} 5%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Bounce Rate</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>42.8%</p>
          <div className="mt-3 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: themeUtils.getBorderColor() }}>
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '43%', 
                backgroundColor: '#ef4444' 
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Admin-specific content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl shadow-sm border p-6" 
             style={{ 
               backgroundColor: themeUtils.getBgColor('card'),
               borderColor: themeUtils.getBorderColor()
             }}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: themeUtils.getTextColor(true) }}>
            <Clock className="w-5 h-5" style={{ color: theme.headerBg || '#6366f1' }} />
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: theme.headerBg ? `${theme.headerBg}20` : '#e0e7ff' }}
              >
                <User className="w-4 h-4" style={{ color: theme.headerBg || '#6366f1' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: themeUtils.getTextColor(true) }}>New user registered</p>
                <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#d1fae5' }}
              >
                <ShoppingCart className="w-4 h-4" style={{ color: '#10b981' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: themeUtils.getTextColor(true) }}>New order #12345</p>
                <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#fef3c7' }}
              >
                <Activity className="w-4 h-4" style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: themeUtils.getTextColor(true) }}>System update completed</p>
                <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl shadow-sm border p-6" 
             style={{ 
               backgroundColor: themeUtils.getBgColor('card'),
               borderColor: themeUtils.getBorderColor()
             }}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: themeUtils.getTextColor(true) }}>
            <Target className="w-5 h-5" style={{ color: theme.headerBg || '#6366f1' }} />
            Admin Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="p-4 rounded-lg transition-colors text-center"
              style={{
                backgroundColor: theme.headerBg ? `${theme.headerBg}10` : '#e0e7ff'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.headerBg ? `${theme.headerBg}20` : '#c7d2fe';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = theme.headerBg ? `${theme.headerBg}10` : '#e0e7ff';
              }}
            >
              <Users className="w-6 h-6 mx-auto mb-2" style={{ color: theme.headerBg || '#6366f1' }} />
              <p className="text-sm font-medium" style={{ color: theme.headerBg || '#4f46e5' }}>Manage Users</p>
            </button>
            <button 
              className="p-4 rounded-lg transition-colors text-center"
              style={{
                backgroundColor: '#d1fae5'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#a7f3d0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#d1fae5';
              }}
            >
              <DollarSign className="w-6 h-6 mx-auto mb-2" style={{ color: '#10b981' }} />
              <p className="text-sm font-medium" style={{ color: '#047857' }}>View Reports</p>
            </button>
            <button 
              className="p-4 rounded-lg transition-colors text-center"
              style={{
                backgroundColor: '#fef3c7'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fde68a';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fef3c7';
              }}
            >
              <Activity className="w-6 h-6 mx-auto mb-2" style={{ color: '#f59e0b' }} />
              <p className="text-sm font-medium" style={{ color: '#d97706' }}>System Settings</p>
            </button>
            <button 
              className="p-4 rounded-lg transition-colors text-center"
              style={{
                backgroundColor: '#fee2e2'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fecaca';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fee2e2';
              }}
            >
              <Activity className="w-6 h-6 mx-auto mb-2" style={{ color: '#ef4444' }} />
              <p className="text-sm font-medium" style={{ color: '#dc2626' }}>Security</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;