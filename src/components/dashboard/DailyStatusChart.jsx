import React, { useState } from 'react';
import { useTheme } from '../../ui/Settings/themeUtils';

const DailyStatusChart = ({ todayData, totalLabours, selectedMonth, selectedDay, selectedYear }) => {
  const { themeUtils } = useTheme();
  const [tooltip, setTooltip] = useState(null); // { status, x, y } or null

  const presentPercentage = Math.round((todayData.present / totalLabours) * 100);
  const absentPercentage = Math.round((todayData.absent / totalLabours) * 100);

  const circumference = 2 * Math.PI * 70;
  const presentLength = circumference * (todayData.present / totalLabours);
  const absentLength = circumference * (todayData.absent / totalLabours);

  const handleMouseMove = (e, status) => {
    const svgRect = e.currentTarget.closest('svg').getBoundingClientRect();
    const chartRect = e.currentTarget.closest('div.relative').getBoundingClientRect();

    let x = e.clientX - chartRect.left;
    let y = e.clientY - chartRect.top;

    // Keep tooltip within chart bounds + nice offset
    x = Math.max(80, Math.min(x, chartRect.width - 80));
    y = Math.max(40, y - 100); // always try to show above

    setTooltip({
      status,
      x,
      y,
    });
  };

  const handleMouseEnter = (status, e) => {
    handleMouseMove(e, status);
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: themeUtils.getTextColor() }}>
          Daily Status Distribution
        </h2>
        <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-semibold shadow-md">
          {selectedMonth} {selectedDay}, {selectedYear}
        </div>
      </div>

      <div className="flex items-center justify-center h-80 relative">
        <div
          className={`relative w-64 h-64 transition-transform duration-300 ease-out ${
            tooltip ? 'scale-110' : 'scale-100 hover:scale-105'
          }`}
        >
          <svg
            viewBox="0 0 200 200"
            className="transform -rotate-90 w-full h-full"
          >
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke={themeUtils.getBorderColor()}
              strokeWidth="38"
              strokeLinecap="round"
            />

            {/* Present arc */}
            {todayData.present > 0 && (
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#22c55e"
                strokeWidth={tooltip?.status === 'present' ? "42" : "38"}
                strokeDasharray={`${presentLength} ${circumference}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
                onMouseEnter={(e) => handleMouseEnter('present', e)}
                onMouseMove={(e) => handleMouseMove(e, 'present')}
                onMouseLeave={handleMouseLeave}
                style={{ pointerEvents: 'all', cursor: 'pointer' }}
              />
            )}

            {/* Absent arc */}
            {todayData.absent > 0 && (
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#ef4444"
                strokeWidth={tooltip?.status === 'absent' ? "42" : "38"}
                strokeDasharray={`${absentLength} ${circumference}`}
                strokeDashoffset={-presentLength}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
                onMouseEnter={(e) => handleMouseEnter('absent', e)}
                onMouseMove={(e) => handleMouseMove(e, 'absent')}
                onMouseLeave={handleMouseLeave}
                style={{ pointerEvents: 'all', cursor: 'pointer' }}
              />
            )}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-4xl font-bold" style={{ color: themeUtils.getTextColor() }}>
                {presentPercentage}%
              </p>
              <p className="font-semibold mt-1 text-sm" style={{ color: themeUtils.getTextColor(false) }}>
                Attendance
              </p>
              <p className="text-xs mt-1" style={{ color: themeUtils.getTextColor(false) }}>
                {todayData.present} / {totalLabours}
              </p>
            </div>
          </div>

          {/* Glassmorphism Tooltip */}
          {tooltip && (
            <div
              className={`
                absolute pointer-events-none z-50 px-5 py-4 rounded-2xl
                backdrop-blur-xl bg-white/10 border border-white/25
                shadow-2xl transition-all duration-150
              `}
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                transform: 'translate(-50%, 0)',
                background: tooltip.status === 'present'
                  ? 'rgba(34, 197, 94, 0.14)'
                  : 'rgba(239, 68, 68, 0.14)',
                border: `1px solid ${tooltip.status === 'present' 
                  ? 'rgba(34, 197, 94, 0.4)' 
                  : 'rgba(239, 68, 68, 0.4)'}`,
                boxShadow: `0 10px 40px rgba(0, 0, 0, 0.2), 
                           0 4px 15px ${tooltip.status === 'present' 
                             ? 'rgba(34, 197, 94, 0.35)' 
                             : 'rgba(239, 68, 68, 0.35)'}`,
              }}
            >
              <div className="font-bold text-base tracking-tight" 
                   style={{ color: themeUtils.getTextColor() }}>
                {tooltip.status === 'present' ? 'Present' : 'Absent'}
              </div>
              <div className="text-2xl font-extrabold mt-1"
                   style={{ color: themeUtils.getTextColor() }}>
                {tooltip.status === 'present' ? presentPercentage : absentPercentage}%
              </div>
              <div className="text-xs mt-1 opacity-85" 
                   style={{ color: themeUtils.getTextColor(false) }}>
                {tooltip.status === 'present'
                  ? `${todayData.present} of ${totalLabours}`
                  : `${todayData.absent} of ${totalLabours}`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div
        className="flex justify-center gap-8 mt-10 pt-4"
        style={{ borderTop: `1px solid ${themeUtils.getBorderColor()}` }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
          <span className="font-semibold text-sm" style={{ color: themeUtils.getTextColor(false) }}>
            Present: {todayData.present} ({presentPercentage}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
          <span className="font-semibold text-sm" style={{ color: themeUtils.getTextColor(false) }}>
            Absent: {todayData.absent} ({absentPercentage}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default DailyStatusChart;