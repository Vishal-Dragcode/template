import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { 
  Building2, 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Zap,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useTheme } from "../../ui/Settings/themeUtils";

const AdminDashboard = () => {
  const { theme, themeUtils } = useTheme();
  const [stats, setStats] = useState({
    projects: 0,
    customers: 0,
    gasMeters: 0,
    faultyMeters: 0,
    billsGenerated: 0,
    pendingBills: 0,
    paidBills: 0,
    overdueBills: 0,
  });
  const [consumptionData, setConsumptionData] = useState([]);
  const [towerConsumption, setTowerConsumption] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        
        // Parallel fetching for performance
        const [
          projectsRes, 
          customersRes, 
          metersRes, 
          faultyRes, 
          generatedRes, 
          pendingRes,
          paidRes,
          overdueRes,
          consumptionRes,
          towerRes
        ] = await Promise.all([
          fetch(`${baseUrl}/api/v1/Dashboard/count/projects`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/customers`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/gas-meters`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/faulty-gas-meters`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/bill-generated`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/pending-billings`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/paid-billings`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/Overdue-billings`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/Total-consumption`),
          fetch(`${baseUrl}/api/v1/Dashboard/count/TotalConsumptionByTower`)
        ]);

        const [
          projectsData,
          customersData,
          metersData,
          faultyData,
          generatedData,
          pendingData,
          paidData,
          overdueData,
          consumptionData,
          towerData
        ] = await Promise.all([
          projectsRes.json(),
          customersRes.json(),
          metersRes.json(),
          faultyRes.json(),
          generatedRes.json(),
          pendingRes.json(),
          paidRes.json(),
          overdueRes.json(),
          consumptionRes.json(),
          towerRes.json()
        ]);

        setStats({
          projects: projectsData.totalCount?.totalcount || 0,
          customers: customersData.totalCustomers?.total_customers || 0,
          gasMeters: metersData.totalcount?.totalcount || 0,
          faultyMeters: faultyData.totalcount?.totalcount || 0, // Backend query is same as gas meters, might be a bug in backend but I'll follow it
          billsGenerated: generatedData.totalbill?.total_billed || 0,
          pendingBills: pendingData.pendingBillCount || 0,
          paidBills: paidData.paidBillCount || 0,
          overdueBills: overdueData.overdueBillCount || 0,
        });

        if (consumptionData.success) {
          setConsumptionData(consumptionData.data.map(item => ({
            name: item.month,
            usage: item.totalUsage
          })));
        }

        if (towerData.success) {
          setTowerConsumption(towerData.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { 
      title: "Active Projects", 
      value: stats.projects, 
      icon: Building2, 
      color: "blue",
      trend: "+12%",
      trendUp: true
    },
    { 
      title: "Total Customers", 
      value: stats.customers, 
      icon: Users, 
      color: "purple",
      trend: "+5%",
      trendUp: true
    },
    { 
      title: "Gas Meters", 
      value: stats.gasMeters, 
      icon: Activity, 
      color: "indigo",
      trend: "+8%",
      trendUp: true
    },
    { 
      title: "Faulty Meters", 
      value: stats.faultyMeters, 
      icon: AlertTriangle, 
      color: "red",
      trend: "-2%",
      trendUp: false
    },
    { 
      title: "Bills Generated", 
      value: stats.billsGenerated, 
      icon: FileCheck, 
      color: "green",
      trend: "+24%",
      trendUp: true
    },
    { 
      title: "Pending Bills", 
      value: stats.pendingBills, 
      icon: Clock, 
      color: "yellow",
      trend: "+3%",
      trendUp: false
    },
    { 
      title: "Paid Invoices", 
      value: stats.paidBills, 
      icon: CheckCircle2, 
      color: "emerald",
      trend: "+15%",
      trendUp: true
    },
    { 
      title: "Overdue", 
      value: stats.overdueBills, 
      icon: Zap, 
      color: "orange",
      trend: "-10%",
      trendUp: true
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: theme.headerBg }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header Section */}
      <div 
        className="p-3 rounded-xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3"
        style={{ 
          backgroundColor: themeUtils.getBgColor('card'),
          borderColor: themeUtils.getBorderColor()
        }}
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: themeUtils.getTextColor(true) }}>
            Freesia Dashboard
          </h1>
          <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>
            Real-time analytics and gas consumption monitoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium bg-green-100/10 text-green-500 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            System Live
          </div>
          <button 
            className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
            style={{ backgroundColor: theme.headerBg }}
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="p-3 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
            style={{ 
              backgroundColor: themeUtils.getBgColor('card'),
              borderColor: themeUtils.getBorderColor()
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div 
                className={`p-3 rounded-xl bg-${card.color}-500/10 text-${card.color}-600 group-hover:scale-110 transition-transform`}
                style={{ color: card.color === 'blue' ? theme.headerBg : undefined }}
              >
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-sm font-medium mb-1" style={{ color: themeUtils.getTextColor(false) }}>{card.title}</h3>
            <div className="text-2xl font-bold" style={{ color: themeUtils.getTextColor(true) }}>
              {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Consumption Trend */}
        <div
          className="p-3 rounded-xl border shadow-sm"
          style={{ 
            backgroundColor: themeUtils.getBgColor('card'),
            borderColor: themeUtils.getBorderColor()
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg" style={{ color: themeUtils.getTextColor(true) }}>Consumption Trends</h3>
              <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>Monthly total gas usage (m³)</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border" style={{ borderColor: themeUtils.getBorderColor() }}>
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium" style={{ color: themeUtils.getTextColor(true) }}>Live Track</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.headerBg || "#6366f1"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={theme.headerBg || "#6366f1"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={themeUtils.getBorderColor()} opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: themeUtils.getTextColor(false), fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: themeUtils.getTextColor(false), fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: themeUtils.getBgColor('card'), 
                    borderColor: themeUtils.getBorderColor(),
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: themeUtils.getTextColor(true) }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke={theme.headerBg || "#6366f1"} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUsage)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tower Breakdown */}
        <div
          className="p-3 rounded-xl border shadow-sm"
          style={{ 
            backgroundColor: themeUtils.getBgColor('card'),
            borderColor: themeUtils.getBorderColor()
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg" style={{ color: themeUtils.getTextColor(true) }}>Tower Breakdown</h3>
              <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>Consumption across different towers</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border" style={{ borderColor: themeUtils.getBorderColor() }}>
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium" style={{ color: themeUtils.getTextColor(true) }}>By Region</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={towerConsumption}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={themeUtils.getBorderColor()} opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: themeUtils.getTextColor(false), fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: themeUtils.getTextColor(false), fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: themeUtils.getBgColor('card'), 
                    borderColor: themeUtils.getBorderColor(),
                    borderRadius: '12px'
                  }}
                />
                <Legend iconType="circle" />
                {towerConsumption.length > 0 && Object.keys(towerConsumption[0])
                  .filter(key => key !== 'month' && key !== 'year')
                  .map((tower, idx) => (
                    <Bar 
                      key={tower} 
                      dataKey={tower} 
                      stackId="a" 
                      fill={idx === 0 ? theme.headerBg : (idx === 1 ? '#10b981' : (idx === 2 ? '#f59e0b' : '#3b82f6'))}
                      radius={idx === Object.keys(towerConsumption[0]).length - 3 ? [4, 4, 0, 0] : [0, 0, 0, 0]} 
                    />
                  ))
                }
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
