import React from 'react';
import { Building2 } from 'lucide-react';
import { useTheme } from '../../ui/Settings/themeUtils';

const DashboardHeader = ({
  departments,
  selectedDepartment,
  setSelectedDepartment,
  years,
  selectedYear,
  setSelectedYear,
  months,
  selectedMonth,
  setSelectedMonth,
  days,
  selectedDay,
  setSelectedDay
}) => {
  const { themeUtils } = useTheme();

  return (
    <div className="rounded-xl shadow-lg p-4 mb-6" style={{ backgroundColor: themeUtils.getBgColor("card"), borderColor: themeUtils.getBorderColor(), borderWidth: '1px', borderStyle: 'solid' }}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
            <Building2 className="text-white" size={30} />
          </div>
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
  );
};

export default DashboardHeader;