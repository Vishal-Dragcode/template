import React, { useState, useMemo } from "react";
import { Search, Download, Calendar } from "lucide-react";
import { useTheme } from "../../ui/Settings/themeUtils";

const AttendanceGallery = () => {
  const { theme, themeUtils } = useTheme();
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const attendanceData = [
    { id: 1, labour_name: "Amit P", department: "Electrical", labour_code: "RJ01", date: "2025-12-12", check_in: "1:32:27 PM", check_out: "-", work_hours: "-", status: "present" },
    { id: 2, labour_name: "Shubham B", department: "Civil", labour_code: "RJ03", date: "2025-12-12", check_in: "1:32:24 PM", check_out: "-", work_hours: "-", status: "present" },
    { id: 3, labour_name: "Sangram G", department: "Mechanical", labour_code: "RJ02", date: "2025-12-12", check_in: "1:32:18 PM", check_out: "-", work_hours: "-", status: "present" },
    { id: 4, labour_name: "Amit P", department: "Electrical", labour_code: "RJ01", date: "2025-12-11", check_in: "4:34:49 AM", check_out: "-", work_hours: "-", status: "present" },
    { id: 5, labour_name: "Shubham B", department: "Civil", labour_code: "RJ03", date: "2025-12-11", check_in: "4:34:41 AM", check_out: "5:25:23 AM", work_hours: "0h 50m", status: "present" },
    { id: 6, labour_name: "Shubham B", department: "Civil", labour_code: "RJ03", date: "2025-12-10", check_in: "1:38:44 PM", check_out: "-", work_hours: "-", status: "present" },
    { id: 7, labour_name: "Amit P", department: "Electrical", labour_code: "RJ01", date: "2025-12-10", check_in: "1:38:41 PM", check_out: "-", work_hours: "-", status: "present" },
    { id: 8, labour_name: "Sangram G", department: "Mechanical", labour_code: "RJ02", date: "2025-12-10", check_in: "1:38:40 PM", check_out: "-", work_hours: "-", status: "present" },
  ];

  const filteredData = useMemo(() => {
    let filtered = attendanceData;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.labour_name.toLowerCase().includes(term) ||
        r.labour_code.toLowerCase().includes(term) ||
        r.department.toLowerCase().includes(term)
      );
    }
    if (fromDate || toDate) {
      filtered = filtered.filter(r => {
        if (fromDate && r.date < fromDate) return false;
        if (toDate && r.date > toDate) return false;
        return true;
      });
    }
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchTerm, fromDate, toDate]);

  const currentRecords = filteredData.slice(0, recordsPerPage);

  const exportToCSV = () => {
    const headers = ['Sr. No', 'Labour Code', 'Labour Name', 'Department', 'Date', 'Check In', 'Check Out', 'Work Hours', 'Status'];
    const csvData = filteredData.map((record, index) => [
      index + 1,
      record.labour_code,
      record.labour_name,
      record.department,
      new Date(record.date).toLocaleDateString("en-GB"),
      record.check_in,
      record.check_out,
      record.work_hours,
      record.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_gallery.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Dynamic styles based on theme
  const headerGradientStyle = {
    background: `linear-gradient(to right, ${theme.headerBg || '#3b82f6'}, ${theme.navbarBg || '#8b5cf6'})`,
  };

  const getButtonStyle = (type) => {
    if (type === 'success') {
      return {
        background: 'linear-gradient(to right, #10b981, #059669)',
        color: '#ffffff'
      };
    }
    return {};
  };

  const tableTextColor = themeUtils.getTextColor();
  const tableMutedTextColor = themeUtils.getTextColor(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeUtils.getBgColor("default") }}>
      <div className="max-w-7xl mx-auto ">
        {/* Header Card */}
        <div className="rounded-xl shadow-lg p-4 mb-4" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Attendance Gallery
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Records Per Page */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium" style={{ color: tableMutedTextColor }}>Show:</label>
                <select
                  value={recordsPerPage}
                  onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                  className="rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none border"
                  style={{
                    borderColor: themeUtils.getBorderColor(),
                    backgroundColor: themeUtils.getBgColor("input"),
                    color: tableTextColor
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              
              {/* Search */}
              <div className="relative flex-1 lg:flex-none lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: tableMutedTextColor }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none border"
                  style={{
                    borderColor: themeUtils.getBorderColor(),
                    backgroundColor: themeUtils.getBgColor("input"),
                    color: tableTextColor
                  }}
                />
              </div>
              
              {/* Date Filters */}
              <div className="flex items-center gap-2">
                <Calendar size={16} style={{ color: tableMutedTextColor }} />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="px-3 py-1.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none border"
                  style={{
                    borderColor: themeUtils.getBorderColor(),
                    backgroundColor: themeUtils.getBgColor("input"),
                    color: tableTextColor
                  }}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar size={16} style={{ color: tableMutedTextColor }} />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="px-3 py-1.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none border"
                  style={{
                    borderColor: themeUtils.getBorderColor(),
                    backgroundColor: themeUtils.getBgColor("input"),
                    color: tableTextColor
                  }}
                />
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

        {/* Table Card */}
        <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={headerGradientStyle} className="text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Sr.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Labour Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Labour Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Check In</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Check Out</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Work Hours</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: themeUtils.getBorderColor() }}>
                {currentRecords.map((record, index) => (
                  <tr key={record.id} className="hover:bg-opacity-10 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: tableTextColor }}>{index + 1}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: tableMutedTextColor }}>{record.labour_code}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: tableTextColor }}>{record.labour_name}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: tableMutedTextColor }}>{record.department}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: tableMutedTextColor }}>
                      {new Date(record.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: tableMutedTextColor }}>{record.check_in}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: tableMutedTextColor }}>{record.check_out}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: tableTextColor }}>{record.work_hours}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg" style={{ color: tableMutedTextColor }}>No attendance records found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceGallery;