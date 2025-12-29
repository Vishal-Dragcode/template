import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '../../ui/Settings/themeUtils';

const StatsCard = ({ stats }) => {
  const { themeUtils } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl p-6 border shadow-lg hover:shadow-xl transition-all hover:scale-105 flex flex-col"
          style={{
            backgroundColor: themeUtils.getBgColor("card"),
            borderColor: themeUtils.getBorderColor()
          }}
        >
          {/* Top section (ONLY trend – icon removed from here) */}
          <div className="flex justify-end">
            <div
              className={`flex items-center gap-1 text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}
            >
             
            </div>
          </div>

          {/* CENTER DATA */}
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            {/* ICON ABOVE TEXT */}
            <div className={`${stat.color} p-3 rounded-lg shadow-md mb-3`}>
              <stat.icon className="text-white" size={28} />
            </div>

            <p
              className="text-3xl font-bold"
              style={{ color: themeUtils.getTextColor() }}
            >
              {stat.value}
            </p>

            <h3
              className="text-sm mt-1"
              style={{ color: themeUtils.getTextColor(false) }}
            >
              {stat.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;

