// pages/DashboardReports.js
import { FileText, Download, Filter, Calendar, TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Users, DollarSign, Eye, Clock, ChevronDown, Search } from 'lucide-react';
import { useTheme } from '../components/Settings/themeUtils';

const DashboardReports = () => {
  const { theme, themeUtils } = useTheme();

  // Sample report data
  const reports = [
    { id: 1, name: 'Monthly Sales Report', date: '2023-06-01', type: 'Sales', status: 'Completed', downloads: 142 },
    { id: 2, name: 'User Engagement Report', date: '2023-05-28', type: 'Analytics', status: 'Completed', downloads: 89 },
    { id: 3, name: 'Traffic Sources Q2', date: '2023-05-15', type: 'Marketing', status: 'Processing', downloads: 0 },
    { id: 4, name: 'Product Performance', date: '2023-05-10', type: 'Sales', status: 'Completed', downloads: 234 },
    { id: 5, name: 'Customer Satisfaction', date: '2023-04-30', type: 'Support', status: 'Completed', downloads: 67 },
  ];

  const getStatusColor = (status) => {
    if (status === 'Completed') return '#10b981';
    if (status === 'Processing') return '#f59e0b';
    return '#ef4444';
  };

  const getTypeIcon = (type) => {
    if (type === 'Sales') return <DollarSign className="w-4 h-4" />;
    if (type === 'Analytics') return <BarChart3 className="w-4 h-4" />;
    if (type === 'Marketing') return <TrendingUp className="w-4 h-4" />;
    if (type === 'Support') return <Users className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: themeUtils.getTextColor(true) }}>
          Dashboard Reports
        </h1>
        <p style={{ color: themeUtils.getTextColor(false) }}>
          Generate and download detailed reports about your business performance and metrics.
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
              <FileText className="w-6 h-6" style={{ color: theme.headerBg || '#6366f1' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#10b981' }}>
              <TrendingUp className="w-4 h-4 mr-1" /> 12%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Total Reports</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>532</p>
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
              <Download className="w-6 h-6" style={{ color: '#10b981' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#10b981' }}>
              <TrendingUp className="w-4 h-4 mr-1" /> 8%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Downloads</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>1,842</p>
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
              <Eye className="w-6 h-6" style={{ color: '#f59e0b' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#ef4444' }}>
              <TrendingDown className="w-4 h-4 mr-1" /> 3%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Views</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>12,847</p>
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
              <Clock className="w-6 h-6" style={{ color: '#ef4444' }} />
            </div>
            <span className="flex items-center text-sm font-medium" style={{ color: '#10b981' }}>
              <TrendingUp className="w-4 h-4 mr-1" /> 5%
            </span>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>Avg. Processing Time</h3>
          <p className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>2.4s</p>
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
      
      {/* Filters and Search */}
      <div className="rounded-xl shadow-sm border p-6 mb-6" 
           style={{ 
             backgroundColor: themeUtils.getBgColor('card'),
             borderColor: themeUtils.getBorderColor()
           }}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: themeUtils.getTextColor(false) }} />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: themeUtils.getBorderColor(),
                  backgroundColor: themeUtils.getBgColor('input'),
                  color: themeUtils.getTextColor(true),
                  focusRingColor: theme.headerBg ? `${theme.headerBg}40` : '#c7d2fe'
                }}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
              style={{ 
                borderColor: themeUtils.getBorderColor(),
                backgroundColor: themeUtils.getBgColor('hover'),
                color: themeUtils.getTextColor(false)
              }}
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
              style={{ 
                borderColor: themeUtils.getBorderColor(),
                backgroundColor: themeUtils.getBgColor('hover'),
                color: themeUtils.getTextColor(false)
              }}
            >
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-2">
          <button 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: theme.headerBg ? `${theme.headerBg}15` : '#e0e7ff',
              color: theme.headerBg || '#6366f1'
            }}
          >
            All Reports
          </button>
          <button 
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: themeUtils.getBgColor('hover'),
              color: themeUtils.getTextColor(false)
            }}
          >
            Sales
          </button>
          <button 
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: themeUtils.getBgColor('hover'),
              color: themeUtils.getTextColor(false)
            }}
          >
            Analytics
          </button>
          <button 
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: themeUtils.getBgColor('hover'),
              color: themeUtils.getTextColor(false)
            }}
          >
            Marketing
          </button>
          <button 
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: themeUtils.getBgColor('hover'),
              color: themeUtils.getTextColor(false)
            }}
          >
            Support
          </button>
        </div>
      </div>
      
      {/* Reports Table */}
      <div className="rounded-xl shadow-sm border overflow-hidden" 
           style={{ 
             backgroundColor: themeUtils.getBgColor('card'),
             borderColor: themeUtils.getBorderColor()
           }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${themeUtils.getBorderColor()}` }}>
                <th className="text-left p-4 font-medium" style={{ color: themeUtils.getTextColor(false) }}>Report Name</th>
                <th className="text-left p-4 font-medium" style={{ color: themeUtils.getTextColor(false) }}>Type</th>
                <th className="text-left p-4 font-medium" style={{ color: themeUtils.getTextColor(false) }}>Date</th>
                <th className="text-left p-4 font-medium" style={{ color: themeUtils.getTextColor(false) }}>Status</th>
                <th className="text-left p-4 font-medium" style={{ color: themeUtils.getTextColor(false) }}>Downloads</th>
                <th className="text-right p-4 font-medium" style={{ color: themeUtils.getTextColor(false) }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} style={{ borderBottom: `1px solid ${themeUtils.getBorderColor()}` }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: theme.headerBg ? `${theme.headerBg}15` : '#e0e7ff' }}
                      >
                        <FileText className="w-4 h-4" style={{ color: theme.headerBg || '#6366f1' }} />
                      </div>
                      <span style={{ color: themeUtils.getTextColor(true) }}>{report.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: theme.headerBg ? `${theme.headerBg}15` : '#e0e7ff' }}
                      >
                        {getTypeIcon(report.type)}
                      </div>
                      <span style={{ color: themeUtils.getTextColor(false) }}>{report.type}</span>
                    </div>
                  </td>
                  <td className="p-4" style={{ color: themeUtils.getTextColor(false) }}>{report.date}</td>
                  <td className="p-4">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getStatusColor(report.status)}15`,
                        color: getStatusColor(report.status)
                      }}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4" style={{ color: themeUtils.getTextColor(true) }}>{report.downloads}</td>
                  <td className="p-4 text-right">
                    <button 
                      className="p-2 rounded-lg transition-colors"
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
                      <Download className="w-4 h-4" style={{ color: theme.headerBg || '#6366f1' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardReports;