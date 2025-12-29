


import React, { useState } from 'react';
import { useTheme } from '../../ui/Settings/themeUtils';

const MonthlyAttendanceChart = ({ monthlyAttendance, selectedMonth, selectedYear, monthlyPresent, monthlyAbsent }) => {
  const { themeUtils } = useTheme();
  
  const recentData = monthlyAttendance.slice(-10);
  const maxMonthlyValue = Math.max(...recentData.map(d => d.absent + d.present), 1);

  // Tooltip state - now per day (index), shows both present & absent
  const [tooltip, setTooltip] = useState(null); // { index, x, y } or null

  const handleMouseMove = (index, e) => {
    const container = e.currentTarget.closest('.bars-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Keep tooltip nicely positioned
    x = Math.max(80, Math.min(x, rect.width - 80));
    y = Math.max(30, y - 120); // position above the bar

    setTooltip({ index, x, y });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div
      className="rounded-xl p-6 border shadow-lg relative overflow-hidden"
      style={{
        backgroundColor: themeUtils.getBgColor("card"),
        borderColor: themeUtils.getBorderColor(),
      }}
    >
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

      <div
        className="h-80 flex items-end justify-start gap-2 mb-6 overflow-x-auto hide-scrollbar relative bars-container"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: '40px',
          paddingBottom: '50px',
          position: 'relative'
        }}
      >
        {/* Y-axis labels */}
        <div className="absolute left-0 bottom-16 h-64 flex flex-col justify-between" style={{ width: '35px' }}>
          <span className="text-xs font-semibold" style={{ color: themeUtils.getTextColor(false) }}>{maxMonthlyValue}</span>
          <span className="text-xs font-semibold" style={{ color: themeUtils.getTextColor(false) }}>{Math.round(maxMonthlyValue * 0.75)}</span>
          <span className="text-xs font-semibold" style={{ color: themeUtils.getTextColor(false) }}>{Math.round(maxMonthlyValue * 0.5)}</span>
          <span className="text-xs font-semibold" style={{ color: themeUtils.getTextColor(false) }}>{Math.round(maxMonthlyValue * 0.25)}</span>
          <span className="text-xs font-semibold" style={{ color: themeUtils.getTextColor(false) }}>0</span>
        </div>

        {/* Y-axis line */}
        <div
          className="absolute left-7 bottom-20"
          style={{ height: '290px', width: '2px', backgroundColor: '#ffffff' }}
        />

        {recentData.map((data, index) => {
          const total = data.present + data.absent;
          const totalHeight = total > 0 ? (total / maxMonthlyValue) * 100 : 0;
          const presentHeight = total > 0 ? (data.present / total) * totalHeight : 0;
          const absentHeight = total > 0 ? (data.absent / total) * totalHeight : 0;
          const dayNum = data.date.split('-')[2];

          return (
            <div key={index} className="flex flex-col items-center" style={{ minWidth: '40px' }}>
              <div 
                className="w-full flex flex-col-reverse justify-start h-64 relative"
                onMouseEnter={(e) => handleMouseMove(index, e)}
                onMouseMove={(e) => handleMouseMove(index, e)}
                onMouseLeave={handleMouseLeave}
              >
                {/* PRESENT BAR */}
                {data.present > 0 && (
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t relative
                               transition-all duration-300 cursor-pointer"
                    style={{ height: `${presentHeight}%` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="text-white text-xs font-bold bg-black bg-opacity-50 px-1 rounded">
                        {data.present}
                      </span>
                    </div>
                  </div>
                )}

                {/* ABSENT BAR */}
                {data.absent > 0 && (
                  <div
                    className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t relative
                               transition-all duration-300 cursor-pointer"
                    style={{ height: `${absentHeight}%` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="text-white text-xs font-bold bg-black bg-opacity-50 px-1 rounded">
                        {data.absent}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Day label */}
              <p className="font-semibold text-xs mt-3" style={{ color: themeUtils.getTextColor(false) }}>
                {dayNum}
              </p>
            </div>
          );
        })}

        {/* X-axis line */}
        <div
          className="absolute bottom-16 left-7 right-0"
          style={{ height: '2px', backgroundColor: '#ffffff' }}
        />

        {/* Glassmorphism Floating Tooltip */}
        {tooltip && recentData[tooltip.index] && (
          <div
            className={`
              absolute pointer-events-none z-50 px-6 py-4 rounded-2xl
              backdrop-blur-xl bg-white/10 border border-white/30
              shadow-2xl transition-all duration-150
            `}
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transform: 'translate(-50%, 0)',
              minWidth: '200px',
              color: 'black', // All text white by default
            }}
          >
            <div className="font-bold text-base mb-2">
              Day {recentData[tooltip.index].date.split('-')[2]}
            </div>

            <div className="flex items-center font-bold
             justify-between gap-4 mb-1">
              <span>Present</span>
              <span className="font-bold text-lg">
                {recentData[tooltip.index].present}
              </span>
            </div>

            <div className="flex items-center font-bold justify-between gap-4">
              <span>Absent</span>
              <span className="font-bold text-lg">
                {recentData[tooltip.index].absent}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 pt-4" style={{ borderTop: `1px solid ${themeUtils.getBorderColor()}` }}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-400 rounded shadow-sm"></div>
          <span className="font-semibold text-sm" style={{ color: themeUtils.getTextColor(false) }}>
            Present: {monthlyPresent}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-400 rounded shadow-sm"></div>
          <span className="font-semibold text-sm" style={{ color: themeUtils.getTextColor(false) }}>
            Absent: {monthlyAbsent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendanceChart;