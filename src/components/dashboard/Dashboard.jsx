import React, { useState, useMemo } from 'react';
import { Users, UserCheck, UserX, Calendar, ArrowUp, ArrowDown, Building2 } from 'lucide-react';
import { useTheme } from '../../ui/Settings/themeUtils';

const departmentData = {
  'HR': {
    totalLabours: 12,
    monthlyAttendance: [
      { date: '2025-12-01', present: 10, absent: 2 },
      { date: '2025-12-02', present: 11, absent: 1 },
      { date: '2025-12-03', present: 9, absent: 3 },
      { date: '2025-12-04', present: 12, absent: 0 },
      { date: '2025-12-05', present: 10, absent: 2 },
      { date: '2025-12-08', present: 11, absent: 1 },
      { date: '2025-12-09', present: 10, absent: 2 },
      { date: '2025-12-10', present: 12, absent: 0 },
      { date: '2025-12-11', present: 9, absent: 3 },
      { date: '2025-12-12', present: 11, absent: 1 },
      { date: '2025-12-15', present: 10, absent: 2 },
      { date: '2025-12-16', present: 12, absent: 0 },
      { date: '2025-12-17', present: 11, absent: 1 },
      { date: '2025-12-18', present: 10, absent: 2 },
      { date: '2025-12-19', present: 11, absent: 1 },
      { date: '2025-12-22', present: 9, absent: 3 },
      { date: '2025-12-23', present: 10, absent: 2 },
      { date: '2025-12-24', present: 8, absent: 4 },
    ]
  },
  'Engineering': {
    totalLabours: 25,
    monthlyAttendance: [
      { date: '2025-12-01', present: 20, absent: 5 },
      { date: '2025-12-02', present: 22, absent: 3 },
      { date: '2025-12-03', present: 19, absent: 6 },
      { date: '2025-12-04', present: 23, absent: 2 },
      { date: '2025-12-05', present: 21, absent: 4 },
      { date: '2025-12-08', present: 22, absent: 3 },
      { date: '2025-12-09', present: 20, absent: 5 },
      { date: '2025-12-10', present: 24, absent: 1 },
      { date: '2025-12-11', present: 21, absent: 4 },
      { date: '2025-12-12', present: 23, absent: 2 },
      { date: '2025-12-15', present: 20, absent: 5 },
      { date: '2025-12-16', present: 22, absent: 3 },
      { date: '2025-12-17', present: 23, absent: 2 },
      { date: '2025-12-18', present: 21, absent: 4 },
      { date: '2025-12-19', present: 22, absent: 3 },
      { date: '2025-12-22', present: 19, absent: 6 },
      { date: '2025-12-23', present: 20, absent: 5 },
      { date: '2025-12-24', present: 15, absent: 10 },
    ]
  },
  'Sales': {
    totalLabours: 18,
    monthlyAttendance: [
      { date: '2025-12-01', present: 15, absent: 3 },
      { date: '2025-12-02', present: 16, absent: 2 },
      { date: '2025-12-03', present: 14, absent: 4 },
      { date: '2025-12-04', present: 17, absent: 1 },
      { date: '2025-12-05', present: 15, absent: 3 },
      { date: '2025-12-08', present: 16, absent: 2 },
      { date: '2025-12-09', present: 15, absent: 3 },
      { date: '2025-12-10', present: 17, absent: 1 },
      { date: '2025-12-11', present: 14, absent: 4 },
      { date: '2025-12-12', present: 16, absent: 2 },
      { date: '2025-12-15', present: 15, absent: 3 },
      { date: '2025-12-16', present: 17, absent: 1 },
      { date: '2025-12-17', present: 16, absent: 2 },
      { date: '2025-12-18', present: 15, absent: 3 },
      { date: '2025-12-19', present: 16, absent: 2 },
      { date: '2025-12-22', present: 14, absent: 4 },
      { date: '2025-12-23', present: 15, absent: 3 },
      { date: '2025-12-24', present: 10, absent: 8 },
    ]
  },
  'Marketing': {
    totalLabours: 15,
    monthlyAttendance: [
      { date: '2025-12-01', present: 12, absent: 3 },
      { date: '2025-12-02', present: 13, absent: 2 },
      { date: '2025-12-03', present: 11, absent: 4 },
      { date: '2025-12-04', present: 14, absent: 1 },
      { date: '2025-12-05', present: 12, absent: 3 },
      { date: '2025-12-08', present: 13, absent: 2 },
      { date: '2025-12-09', present: 12, absent: 3 },
      { date: '2025-12-10', present: 14, absent: 1 },
      { date: '2025-12-11', present: 11, absent: 4 },
      { date: '2025-12-12', present: 13, absent: 2 },
      { date: '2025-12-15', present: 12, absent: 3 },
      { date: '2025-12-16', present: 14, absent: 1 },
      { date: '2025-12-17', present: 13, absent: 2 },
      { date: '2025-12-18', present: 12, absent: 3 },
      { date: '2025-12-19', present: 13, absent: 2 },
      { date: '2025-12-22', present: 11, absent: 4 },
      { date: '2025-12-23', present: 12, absent: 3 },
      { date: '2025-12-24', present: 9, absent: 6 },
    ]
  },
  'Operations': {
    totalLabours: 30,
    monthlyAttendance: [
      { date: '2025-12-01', present: 25, absent: 5 },
      { date: '2025-12-02', present: 27, absent: 3 },
      { date: '2025-12-03', present: 24, absent: 6 },
      { date: '2025-12-04', present: 28, absent: 2 },
      { date: '2025-12-05', present: 26, absent: 4 },
      { date: '2025-12-08', present: 27, absent: 3 },
      { date: '2025-12-09', present: 25, absent: 5 },
      { date: '2025-12-10', present: 29, absent: 1 },
      { date: '2025-12-11', present: 26, absent: 4 },
      { date: '2025-12-12', present: 28, absent: 2 },
      { date: '2025-12-15', present: 25, absent: 5 },
      { date: '2025-12-16', present: 27, absent: 3 },
      { date: '2025-12-17', present: 28, absent: 2 },
      { date: '2025-12-18', present: 26, absent: 4 },
      { date: '2025-12-19', present: 27, absent: 3 },
      { date: '2025-12-22', present: 24, absent: 6 },
      { date: '2025-12-23', present: 25, absent: 5 },
      { date: '2025-12-24', present: 18, absent: 12 },
    ]
  }
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('December');
  const [selectedDay, setSelectedDay] = useState('24');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

  // Get theme and theme utilities
  const { theme, themeUtils } = useTheme();

  const departments = ['All Departments', ...Object.keys(departmentData)];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = ['2023', '2024', '2025', '2026'];

  // Calculate filtered data based on selected department
  const filteredData = useMemo(() => {
    if (selectedDepartment === 'All Departments') {
      const allDepts = Object.values(departmentData);
      const totalLabours = allDepts.reduce((sum, dept) => sum + dept.totalLabours, 0);
      
      const dateMap = new Map();
      allDepts.forEach(dept => {
        dept.monthlyAttendance.forEach(record => {
          if (!dateMap.has(record.date)) {
            dateMap.set(record.date, { date: record.date, present: 0, absent: 0 });
          }
          const existing = dateMap.get(record.date);
          existing.present += record.present;
          existing.absent += record.absent;
        });
      });
      
      return {
        totalLabours,
        monthlyAttendance: Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date))
      };
    } else {
      return departmentData[selectedDepartment];
    }
  }, [selectedDepartment]);

  const selectedDate = `${selectedYear}-${String(months.indexOf(selectedMonth) + 1).padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
  const todayData = filteredData.monthlyAttendance.find(d => d.date === selectedDate) || { present: 0, absent: filteredData.totalLabours };

  const monthlyPresent = filteredData.monthlyAttendance.reduce((sum, d) => sum + d.present, 0);
  const monthlyAbsent = filteredData.monthlyAttendance.reduce((sum, d) => sum + d.absent, 0);
  const monthlyTotal = monthlyPresent + monthlyAbsent;
  const monthlyAttendanceRate = monthlyTotal > 0 ? Math.round((monthlyPresent / monthlyTotal) * 100) : 0;

  const prevMonthRate = 85;
  const rateChange = monthlyAttendanceRate - prevMonthRate;

  const stats = [
    { 
      title: 'Total Labours', 
      value: filteredData.totalLabours.toString(), 
      icon: Users, 
      color: 'bg-blue-500',
      trend: 'up',
      change: selectedDepartment === 'All Departments' ? '100' : filteredData.totalLabours.toString()
    },
    { 
      title: "Today's Present", 
      value: todayData.present.toString(), 
      icon: UserCheck, 
      color: 'bg-green-500',
      trend: todayData.present >= filteredData.totalLabours * 0.7 ? 'up' : 'down',
      change: `${Math.round((todayData.present / filteredData.totalLabours) * 100)}%`
    },
    { 
      title: "Today's Absent", 
      value: todayData.absent.toString(), 
      icon: UserX, 
      color: 'bg-red-500',
      trend: todayData.absent <= filteredData.totalLabours * 0.3 ? 'down' : 'up',
      change: `${Math.round((todayData.absent / filteredData.totalLabours) * 100)}%`
    },
    { 
      title: 'Monthly Attendance', 
      value: `${monthlyAttendanceRate}%`, 
      icon: Calendar, 
      color: 'bg-purple-500',
      trend: rateChange >= 0 ? 'up' : 'down',
      change: `${rateChange > 0 ? '+' : ''}${rateChange}%`
    },
  ];

  const maxMonthlyValue = Math.max(...filteredData.monthlyAttendance.map(d => d.absent + d.present), 1);

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeUtils.getBgColor("default") }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-xl shadow-lg p-4 mb-6" style={{ backgroundColor: themeUtils.getBgColor("card"), borderColor: themeUtils.getBorderColor(), borderWidth: '1px', borderStyle: 'solid' }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              {/* <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <Building2 className="text-white" size={32} />
              </div> */}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Workforce Attendance Dashboard
                </h1> 
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border rounded-lg font-semibold focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all cursor-pointer"
                style={{ 
                  borderColor: themeUtils.getBorderColor(),
                  backgroundColor: themeUtils.getBgColor("input"),
                  color: themeUtils.getTextColor()
                }}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
                style={{ 
                  borderColor: themeUtils.getBorderColor(),
                  backgroundColor: themeUtils.getBgColor("input"),
                  color: themeUtils.getTextColor()
                }}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
                style={{ 
                  borderColor: themeUtils.getBorderColor(),
                  backgroundColor: themeUtils.getBgColor("input"),
                  color: themeUtils.getTextColor()
                }}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              
              <select 
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="px-4 py-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
                style={{ 
                  borderColor: themeUtils.getBorderColor(),
                  backgroundColor: themeUtils.getBgColor("input"),
                  color: themeUtils.getTextColor()
                }}
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="rounded-xl p-6 border shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105"
              style={{ 
                backgroundColor: themeUtils.getBgColor("card"),
                borderColor: themeUtils.getBorderColor()
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg shadow-md`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-sm mb-1" style={{ color: themeUtils.getTextColor(false) }}>{stat.title}</h3>
              <p className="text-3xl font-bold" style={{ color: themeUtils.getTextColor() }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section - Monthly (Left) and Daily (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Attendance Chart - LEFT SIDE */}
          <div className="rounded-xl p-6 border shadow-lg" style={{ backgroundColor: themeUtils.getBgColor("card"), borderColor: themeUtils.getBorderColor() }}>
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: themeUtils.getTextColor() }}>
                Monthly Attendance Overview
              </h2>
              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-semibold shadow-md">
                {selectedMonth} {selectedYear}
              </div>
            </div>
            
            <div className="h-80 flex items-end justify-start gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {filteredData.monthlyAttendance.map((data, index) => {
                const total = data.present + data.absent;
                const totalHeight = total > 0 ? (total / maxMonthlyValue) * 100 : 0;
                const presentHeight = total > 0 ? (data.present / total) * totalHeight : 0;
                const absentHeight = total > 0 ? (data.absent / total) * totalHeight : 0;
                const dayNum = data.date.split('-')[2];
                
                return (
                  <div key={index} className="flex flex-col items-center" style={{ minWidth: '40px' }}>
                    <div className="w-full flex flex-col-reverse justify-start h-64 group relative">
                      {data.present > 0 && (
                        <div 
                          className="w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-300 hover:from-green-600 hover:to-green-500 rounded-t relative cursor-pointer"
                          style={{ height: `${presentHeight}%` }}
                          title={`Present: ${data.present}`}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold bg-black bg-opacity-50 px-1 rounded">{data.present}</span>
                          </div>
                        </div>
                      )}
                      {data.absent > 0 && (
                        <div 
                          className="w-full bg-gradient-to-t from-red-500 to-red-400 transition-all duration-300 hover:from-red-600 hover:to-red-500 rounded-t relative cursor-pointer"
                          style={{ height: `${absentHeight}%` }}
                          title={`Absent: ${data.absent}`}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold bg-black bg-opacity-50 px-1 rounded">{data.absent}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="font-semibold mt-2 text-xs" style={{ color: themeUtils.getTextColor(false) }}>{dayNum}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center gap-8 pt-4" style={{ borderTop: `1px solid ${themeUtils.getBorderColor()}` }}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-400 rounded shadow-sm"></div>
                <span className="font-semibold text-sm" style={{ color: themeUtils.getTextColor(false) }}>Present: {monthlyPresent}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-400 rounded shadow-sm"></div>
                <span className="font-semibold text-sm" style={{ color: themeUtils.getTextColor(false) }}>Absent: {monthlyAbsent}</span>
              </div>
            </div>
          </div>

          {/* Daily Status Distribution - RIGHT SIDE */}
          <div className="rounded-xl p-6 border shadow-lg" style={{ backgroundColor: themeUtils.getBgColor("card"), borderColor: themeUtils.getBorderColor() }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: themeUtils.getTextColor() }}>
                Daily Status Distribution
              </h2>
              <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-semibold shadow-md">
                {selectedMonth} {selectedDay}, {selectedYear}
              </div>
            </div>
            
            <div className="flex items-center justify-center h-80">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 200 200" className="transform -rotate-90">
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke={themeUtils.getBorderColor()}
                    strokeWidth="35"
                  />
                  {todayData.present > 0 && (
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="35"
                      strokeDasharray={`${2 * Math.PI * 70 * (todayData.present / filteredData.totalLabours)} ${2 * Math.PI * 70}`}
                      strokeDashoffset="0"
                      className="transition-all duration-1000"
                    />
                  )}
                  {todayData.absent > 0 && (
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="35"
                      strokeDasharray={`${2 * Math.PI * 70 * (todayData.absent / filteredData.totalLabours)} ${2 * Math.PI * 70}`}
                      strokeDashoffset={`${-2 * Math.PI * 70 * (todayData.present / filteredData.totalLabours)}`}
                      className="transition-all duration-1000"
                    />
                  )}
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold" style={{ color: themeUtils.getTextColor() }}>
                      {Math.round((todayData.present / filteredData.totalLabours) * 100)}%
                    </p>
                    <p className="font-semibold mt-1 text-sm" style={{ color: themeUtils.getTextColor(false) }}>Attendance</p>
                    <p className="text-xs mt-1" style={{ color: themeUtils.getTextColor(false) }}>
                      {todayData.present}/{filteredData.totalLabours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-8 mt-6 pt-4" style={{ borderTop: `1px solid ${themeUtils.getBorderColor()}` }}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                <span className="font-semibold text-sm" style={{ color: themeUtils.getTextColor(false) }}>
                  Present: {todayData.present} ({Math.round((todayData.present / filteredData.totalLabours) * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                <span className="font-semibold text-sm" style={{ color: themeUtils.getTextColor(false) }}>
                  Absent: {todayData.absent} ({Math.round((todayData.absent / filteredData.totalLabours) * 100)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;