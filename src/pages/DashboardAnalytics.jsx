// pages/DashboardAnalytics.js
import { TrendingUp, BarChart3, PieChart, Activity, Users, Eye, DollarSign, Calendar, Filter } from 'lucide-react';
import { useTheme } from '../components/Settings/themeUtils';

const DashboardAnalytics = () => {
  const { theme, themeUtils } = useTheme();

  // Sample data for charts
  const chartData = [
    { month: 'Jan', users: 4000, revenue: 2400 },
    { month: 'Feb', users: 3000, revenue: 1398 },
    { month: 'Mar', users: 2000, revenue: 9800 },
    { month: 'Apr', users: 2780, revenue: 3908 },
    { month: 'May', users: 1890, revenue: 4800 },
    { month: 'Jun', users: 2390, revenue: 3800 },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: themeUtils.getTextColor(true) }}>
          Dashboard Analytics
        </h1>
        <p style={{ color: themeUtils.getTextColor(false) }}>
          Track your performance metrics and gain insights into user behavior and engagement.
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
              <TrendingUp className="w-4 h-4 mr-1" /> 12%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Total Users</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>24,573</p>
          <div className="mt-3 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: themeUtils.getBorderColor() }}>
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '65%', 
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
              <Eye className="w-6 h-6" style={{ color: '#10b981' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#10b981' }}>
              <TrendingUp className="w-4 h-4 mr-1" /> 8%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Page Views</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>142,876</p>
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
              <BarChart3 className="w-6 h-6" style={{ color: '#f59e0b' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#ef4444' }}>
              <TrendingUp className="w-4 h-4 mr-1 rotate-180" /> 3%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Bounce Rate</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>38.2%</p>
          <div className="mt-3 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: themeUtils.getBorderColor() }}>
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '38%', 
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
              <DollarSign className="w-6 h-6" style={{ color: '#ef4444' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#10b981' }}>
              <TrendingUp className="w-4 h-4 mr-1" /> 15%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Revenue</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>$124,563</p>
          <div className="mt-3 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: themeUtils.getBorderColor() }}>
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '75%', 
                backgroundColor: '#ef4444' 
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl shadow-sm border p-6" 
             style={{ 
               backgroundColor: themeUtils.getBgColor('card'),
               borderColor: themeUtils.getBorderColor()
             }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: themeUtils.getTextColor(true) }}>User Growth</h2>
            <button 
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: themeUtils.getBgColor('hover') }}
            >
              <Filter className="w-4 h-4" style={{ color: themeUtils.getTextColor(false) }} />
            </button>
          </div>
          
          {/* Simple chart visualization */}
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t"
                  style={{ 
                    height: `${(data.users / 4000) * 100}%`,
                    backgroundColor: theme.headerBg ? `${theme.headerBg}80` : '#6366f1'
                  }}
                ></div>
                <span className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>{data.month}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.headerBg || '#6366f1' }}
              ></div>
              <span className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>Users</span>
            </div>
            <span className="text-sm font-medium" style={{ color: themeUtils.getTextColor(true) }}>+12% from last month</span>
          </div>
        </div>
        
        <div className="rounded-xl shadow-sm border p-6" 
             style={{ 
               backgroundColor: themeUtils.getBgColor('card'),
               borderColor: themeUtils.getBorderColor()
             }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: themeUtils.getTextColor(true) }}>Revenue Analytics</h2>
            <button 
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: themeUtils.getBgColor('hover') }}
            >
              <Calendar className="w-4 h-4" style={{ color: themeUtils.getTextColor(false) }} />
            </button>
          </div>
          
          {/* Simple chart visualization */}
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t"
                  style={{ 
                    height: `${(data.revenue / 9800) * 100}%`,
                    backgroundColor: '#10b98180'
                  }}
                ></div>
                <span className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>{data.month}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#10b981' }}
              ></div>
              <span className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>Revenue</span>
            </div>
            <span className="text-sm font-medium" style={{ color: themeUtils.getTextColor(true) }}>+8% from last month</span>
          </div>
        </div>
      </div>
      
      {/* Traffic Sources */}
      <div className="rounded-xl shadow-sm border p-6" 
           style={{ 
             backgroundColor: themeUtils.getBgColor('card'),
             borderColor: themeUtils.getBorderColor()
           }}>
        <h2 className="text-lg font-semibold mb-6" style={{ color: themeUtils.getTextColor(true) }}>Traffic Sources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.headerBg ? `${theme.headerBg}20` : '#e0e7ff' }}
            >
              <Activity className="w-6 h-6" style={{ color: theme.headerBg || '#6366f1' }} />
            </div>
            <div>
              <h3 className="text-sm font-medium" style={{ color: themeUtils.getTextColor(false) }}>Direct</h3>
              <p className="text-xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>42.5%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#d1fae5' }}
            >
              <TrendingUp className="w-6 h-6" style={{ color: '#10b981' }} />
            </div>
            <div>
              <h3 className="text-sm font-medium" style={{ color: themeUtils.getTextColor(false) }}>Organic</h3>
              <p className="text-xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>35.2%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#fef3c7' }}
            >
              <PieChart className="w-6 h-6" style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <h3 className="text-sm font-medium" style={{ color: themeUtils.getTextColor(false) }}>Referral</h3>
              <p className="text-xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>22.3%</p>
            </div>
          </div>
        </div>
        
        {/* Simple pie chart visualization */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: theme.headerBg || '#6366f1',
                  clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)'
                }}
              ></div>
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: '#10b981',
                  clipPath: 'polygon(50% 50%, 0% 50%, 50% 0%, 50% 100%, 0% 100%)'
                }}
              ></div>
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: '#f59e0b',
                  clipPath: 'polygon(50% 50%, 50% 0%, 0% 0%, 0% 50%)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;