import React, { useState, useMemo } from 'react';
import { Users, UserCheck, UserX, Calendar } from 'lucide-react';
import { useTheme } from '../../ui/Settings/themeUtils';
import DashboardHeader from './DashboardHeader';
import StatsCard from './StatsCard';
import MonthlyAttendanceChart from './MonthlyAttendanceChart';
import DailyStatusChart from './DailyStatusChart';

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
  
  const { themeUtils } = useTheme();
  
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
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: themeUtils.getBgColor("default") }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader
          departments={departments}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          months={months}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          days={days}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        
        {/* Stats Cards */}
        <StatsCard stats={stats} />
        
        {/* Charts Section - Monthly (Left) and Daily (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Attendance Chart - LEFT SIDE */}
          <MonthlyAttendanceChart
            monthlyAttendance={filteredData.monthlyAttendance}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            monthlyPresent={monthlyPresent}
            monthlyAbsent={monthlyAbsent}
          />
          
          {/* Daily Status Distribution - RIGHT SIDE */}
          <DailyStatusChart
            todayData={todayData}
            totalLabours={filteredData.totalLabours}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            selectedYear={selectedYear}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;