import React from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, color: 'bg-blue-500', trend: 'up' },
    { title: 'Total Users', value: '2,345', change: '+15.3%', icon: Users, color: 'bg-purple-500', trend: 'up' },
    { title: 'Active Orders', value: '342', change: '-5.2%', icon: ShoppingCart, color: 'bg-green-500', trend: 'down' },
    { title: 'Conversion Rate', value: '3.24%', change: '+8.7%', icon: TrendingUp, color: 'bg-orange-500', trend: 'up' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Made a purchase', time: '2 min ago', amount: '$120' },
    { user: 'Sarah Smith', action: 'Signed up', time: '15 min ago', amount: '-' },
    { user: 'Mike Johnson', action: 'Made a purchase', time: '1 hour ago', amount: '$85' },
    { user: 'Emma Wilson', action: 'Left a review', time: '2 hours ago', amount: '-' },
  ];

  const topProducts = [
    { name: 'Premium Plan', sales: 234, revenue: '$23,400', growth: 12 },
    { name: 'Basic Plan', sales: 189, revenue: '$9,450', growth: 8 },
    { name: 'Enterprise Plan', sales: 67, revenue: '$33,500', growth: 25 },
    { name: 'Starter Pack', sales: 432, revenue: '$12,960', growth: -3 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 ">
      <h1 className="text-white text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all hover:transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-white text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-white text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0 hover:bg-gray-750 transition-colors rounded px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.user}</p>
                    <p className="text-gray-400 text-sm">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{activity.amount}</p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-white text-xl font-bold mb-6">Top Products</h2>
          <div className="space-y-5">
            {topProducts.map((product, index) => (
              <div key={index} className="py-3 border-b border-gray-700 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-medium">{product.name}</p>
                  <span className={`text-sm font-semibold ${product.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-400">{product.sales} sales</span>
                  <span className="text-white font-semibold">{product.revenue}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${(product.sales / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Average Order Value</h3>
          <p className="text-white text-2xl font-bold mb-1">$132.45</p>
          <span className="text-green-400 text-sm font-semibold">+12.5% from last month</span>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Customer Satisfaction</h3>
          <p className="text-white text-2xl font-bold mb-1">4.8/5.0</p>
          <span className="text-green-400 text-sm font-semibold">+0.3 from last month</span>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Response Time</h3>
          <p className="text-white text-2xl font-bold mb-1">2.4 hrs</p>
          <span className="text-red-400 text-sm font-semibold">-8% from last month</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;