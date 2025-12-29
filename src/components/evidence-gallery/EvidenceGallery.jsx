import React, { useState, useMemo } from "react";
import { Search, Calendar, Video, Download, X, Star } from "lucide-react";
import { useTheme } from "../../ui/Settings/themeUtils";

function EvidenceGallery() {
  const { theme, themeUtils } = useTheme();
  const [showVideo, setShowVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const alerts = [
    { 
      id: 1, 
      date: "24 Dec 2025", 
      time: "14:35",
      video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    { 
      id: 2, 
      date: "25 Dec 2025", 
      time: "10:12",
      video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    { 
      id: 3, 
      date: "26 Dec 2025", 
      time: "18:45",
      video: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ];

  // Function to parse date string from "DD Mon YYYY" format to Date object
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split(' ');
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return new Date(parseInt(year), monthMap[month], parseInt(day));
  };

  // Function to format Date object to YYYY-MM-DD for input comparison
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to format Date object to display format
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Filter alerts based on search term and date range
  const filteredAlerts = useMemo(() => {
    let result = alerts;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(alert => 
        alert.id.toString().includes(searchTerm) ||
        alert.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.time.includes(searchTerm)
      );
    }
    
    // Filter by date range
    if (fromDate || toDate) {
      result = result.filter(alert => {
        const alertDate = parseDate(alert.date);
        const formattedAlertDate = formatDateForInput(alertDate);
        
        // Check if alert date is within the selected range
        if (fromDate && toDate) {
          return formattedAlertDate >= fromDate && formattedAlertDate <= toDate;
        } else if (fromDate) {
          return formattedAlertDate >= fromDate;
        } else if (toDate) {
          return formattedAlertDate <= toDate;
        }
        return true;
      });
    }
    
    return result;
  }, [alerts, searchTerm, fromDate, toDate]);

  const handleViewVideo = (alert) => {
    setSelectedVideo(alert);
    setShowVideo(true);
  };

  const exportToCSV = () => {
    const headers = ['Sr. No', 'Date', 'Time'];
    const csvData = filteredAlerts.map((alert, index) => [
      index + 1,
      alert.date,
      alert.time
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evidence_gallery.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearDateFilter = () => {
    setFromDate("");
    setToDate("");
  };

  const headerGradientStyle = {
    background: `linear-gradient(to right, ${theme.headerBg || '#3b82f6'}, ${theme.navbarBg || '#8b5cf6'})`,
  };

  const getButtonStyle = (type) => {
    if (type === 'primary') {
      return {
        background: `linear-gradient(to right, ${theme.headerBg || '#3b82f6'}, ${theme.headerBg || '#2563eb'})`,
        color: '#ffffff'
      };
    } else if (type === 'success') {
      return {
        background: 'linear-gradient(to right, #10b981, #059669)',
        color: '#ffffff'
      };
    }
    return {};
  };

  return (
    <div
      className="min-h-screen transition-all duration-300"
      style={{ backgroundColor: themeUtils.getBgColor("default") }}
    >
      <div className="max-w-7xl mx-auto ">
        {/* Header Section */}
        <div 
          className="rounded-xl shadow-lg p-4 mb-4" 
          style={{ backgroundColor: themeUtils.getBgColor("card") }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Evidence Gallery
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Records Per Page */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium" style={{ color: themeUtils.getTextColor(false) }}>
                  Show:
                </label>
                <select
                  value={recordsPerPage}
                  onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                  className="rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none border"
                  style={{
                    borderColor: themeUtils.getBorderColor(),
                    backgroundColor: themeUtils.getBgColor("input"),
                    color: themeUtils.getTextColor(true)
                  }}
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>
              
              {/* Search */}
              <div className="relative flex-1 lg:flex-none lg:w-64">
                <Search 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                  style={{ color: themeUtils.getTextColor(false) }}
                />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none border"
                  style={{
                    borderColor: themeUtils.getBorderColor(),
                    backgroundColor: themeUtils.getBgColor("input"),
                    color: themeUtils.getTextColor(true)
                  }}
                />
              </div>
              
              {/* Date Range Filter */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="relative">
                    <Calendar 
                      size={16} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                      style={{ color: themeUtils.getTextColor(false) }}
                    />
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="pl-9 pr-3 py-1.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none border"
                      style={{
                        borderColor: themeUtils.getBorderColor(),
                        backgroundColor: themeUtils.getBgColor("input"),
                        color: themeUtils.getTextColor(true)
                      }}
                    />
                  </div>
                  <span style={{ color: themeUtils.getTextColor(false) }}>to</span>
                  <div className="relative">
                    <Calendar 
                      size={16} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                      style={{ color: themeUtils.getTextColor(false) }}
                    />
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="pl-9 pr-3 py-1.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none border"
                      style={{
                        borderColor: themeUtils.getBorderColor(),
                        backgroundColor: themeUtils.getBgColor("input"),
                        color: themeUtils.getTextColor(true)
                      }}
                    />
                  </div>
                </div>
                {(fromDate || toDate) && (
                  <button
                    onClick={clearDateFilter}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    style={{ color: themeUtils.getTextColor(false) }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              
              {/* Export Button */}
              <button
                onClick={exportToCSV}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                style={getButtonStyle('success')}
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Filter Info */}
        {(fromDate || toDate) && (
          <div className="mb-4 p-3 rounded-lg flex items-center justify-between" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
            <div className="flex items-center gap-2">
              <Calendar size={16} style={{ color: themeUtils.getTextColor(false) }} />
              <span className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>
                Showing alerts for: 
                {fromDate && (
                  <span className="font-medium ml-1" style={{ color: themeUtils.getTextColor(true) }}>
                    From: {formatDateForDisplay(fromDate)}
                  </span>
                )}
                {fromDate && toDate && <span style={{ color: themeUtils.getTextColor(false) }}>, </span>}
                {toDate && (
                  <span className="font-medium ml-1" style={{ color: themeUtils.getTextColor(true) }}>
                    To: {formatDateForDisplay(toDate)}
                  </span>
                )}
              </span>
            </div>
            <button
              onClick={clearDateFilter}
              className="text-sm px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{ color: themeUtils.getTextColor(false) }}
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Alert Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.slice(0, recordsPerPage).map((alert) => (
            <div
              key={alert.id}
              className="group relative rounded-xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{ 
                borderColor: themeUtils.getBorderColor(),
                backgroundColor: themeUtils.getBgColor("card")
              }}
            >
              {/* Card Header with gradient */}
              <div
                className="relative px-6 py-2 overflow-hidden"
                style={headerGradientStyle}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-opacity-20 rounded-lg">
                      <Star className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg font-bold text-white">
                      Evidence {alert.id}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-white opacity-90 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{alert.date}</span>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="px-6 py-5 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
                      <svg className="w-4 h-4" style={{ color: themeUtils.getTextColor(false) }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium" style={{ color: themeUtils.getTextColor(false) }}>
                      Time:
                    </span>
                  </div>
                  <span className="text-sm font-semibold px-2 py-1 rounded-md" style={{ 
                    color: themeUtils.getTextColor(true),
                    backgroundColor: themeUtils.getBgColor("secondary")
                  }}>
                    {alert.time}
                  </span>
                </div>
                
                {alert.location && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
                        <svg className="w-4 h-4" style={{ color: themeUtils.getTextColor(false) }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: themeUtils.getTextColor(false) }}>
                        Location:
                      </span>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: themeUtils.getTextColor(true) }}>
                      {alert.location}
                    </span>
                  </div>
                )}
                
                <button
                  onClick={() => handleViewVideo(alert)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg group"
                  style={{ backgroundColor: themeUtils.getBgColor("primary"), color: themeUtils.getTextColor(true) }}
                >
                  <Video size={18} className="group-hover:scale-110 transition-transform" />
                  View Video Evidence
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
              <Calendar size={40} style={{ color: themeUtils.getTextColor(false) }} />
            </div>
            <p className="text-lg mb-2" style={{ color: themeUtils.getTextColor(false) }}>
              No evidence records found for the selected filters.
            </p>
            {(fromDate || toDate) && (
              <button
                onClick={clearDateFilter}
                className="text-sm px-4 py-2 rounded-lg mt-2 transition-colors"
                style={{
                  backgroundColor: themeUtils.getBgColor("secondary"),
                  color: themeUtils.getTextColor(true)
                }}
              >
                Clear Date Filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showVideo && selectedVideo && (
        <div className="fixed inset-0  bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: themeUtils.getBgColor("card") }}
          >
            {/* Modal Header */}
            <div
              className="flex justify-between items-center px-4 py-3"
              style={headerGradientStyle}
            >
              <div className="text-white">
                <h2 className="text-lg font-bold">
                  Evidence {selectedVideo.id} - Video Evidence
                </h2>
                <p className="text-sm opacity-90">
                  {selectedVideo.date} at {selectedVideo.time}
                </p>
              </div>
              <button
                onClick={() => setShowVideo(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-4">
              <video 
                controls 
                autoPlay 
                className="w-full rounded-lg shadow-lg"
                style={{ maxHeight: '70vh' }}
              >
                <source src={selectedVideo.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EvidenceGallery;