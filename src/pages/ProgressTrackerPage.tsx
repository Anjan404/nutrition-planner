import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Calendar, Zap, Scale, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const ProgressTrackerPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for charts
  const weightData = [
    { date: 'Jan 1', weight: 75, target: 70 },
    { date: 'Jan 8', weight: 74.5, target: 70 },
    { date: 'Jan 15', weight: 74, target: 70 },
    { date: 'Jan 22', weight: 73.2, target: 70 },
    { date: 'Jan 29', weight: 72.8, target: 70 },
    { date: 'Feb 5', weight: 72.1, target: 70 },
    { date: 'Feb 12', weight: 71.5, target: 70 },
  ];

  const caloriesData = [
    { date: 'Mon', consumed: 1950, target: 2000 },
    { date: 'Tue', consumed: 2100, target: 2000 },
    { date: 'Wed', consumed: 1850, target: 2000 },
    { date: 'Thu', consumed: 2050, target: 2000 },
    { date: 'Fri', consumed: 1980, target: 2000 },
    { date: 'Sat', consumed: 2200, target: 2000 },
    { date: 'Sun', consumed: 1900, target: 2000 },
  ];

  const macrosData = [
    { name: 'Protein', value: 30, color: '#FF6B6B' },
    { name: 'Carbs', value: 45, color: '#FFD166' },
    { name: 'Fats', value: 25, color: '#00C9A7' },
  ];

  const badges = [
    { id: 1, name: '7-Day Streak', icon: '🔥', achieved: true, date: 'Feb 12' },
    { id: 2, name: 'Water Goal', icon: '💧', achieved: true, date: 'Feb 11' },
    { id: 3, name: 'Weight Milestone', icon: '⚖️', achieved: true, date: 'Feb 10' },
    { id: 4, name: 'Perfect Week', icon: '⭐', achieved: false, progress: 85 },
    { id: 5, name: 'Macro Balance', icon: '🎯', achieved: false, progress: 65 },
    { id: 6, name: 'Exercise Combo', icon: '💪', achieved: false, progress: 40 },
  ];

  const stats = [
    {
      label: 'Weight Progress',
      value: '-2.5 kg',
      change: '+0.3 kg this week',
      positive: true,
      icon: Scale,
      color: 'vital-mint'
    },
    {
      label: 'Avg Daily Calories',
      value: '1,978',
      change: '22 cal below target',
      positive: true,
      icon: Zap,
      color: 'citrus-glow'
    },
    {
      label: 'Workout Days',
      value: '5/7',
      change: '+1 day vs last week',
      positive: true,
      icon: Heart,
      color: 'coral-energy'
    },
    {
      label: 'Goal Progress',
      value: '78%',
      change: '+12% this month',
      positive: true,
      icon: Target,
      color: 'leaf-green'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-cloud to-white pt-20 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-graphite-ink mb-2"
            >
              Progress <span className="text-vital-mint">Tracker</span>
            </motion.h1>
            <p className="text-gray-600">Monitor your nutrition journey and celebrate your achievements</p>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            {['week', 'month', '3months'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedPeriod === period
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white text-graphite-ink hover:bg-gray-50'
                }`}
              >
                {period === '3months' ? '3 Months' : period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <TrendingUp className={`h-4 w-4 ${stat.positive ? 'text-leaf-green' : 'text-coral-energy'}`} />
              </div>
              
              <div className="text-2xl font-bold text-graphite-ink mb-1">{stat.value}</div>
              <div className={`text-sm ${stat.positive ? 'text-leaf-green' : 'text-coral-energy'}`}>
                {stat.change}
              </div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Weight Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-graphite-ink mb-6">Weight Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#00C9A7" 
                  strokeWidth={3}
                  dot={{ fill: '#00C9A7', strokeWidth: 2, r: 4 }}
                  name="Actual Weight"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#FFD166" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#FFD166', strokeWidth: 2, r: 3 }}
                  name="Target Weight"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Daily Calories Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-graphite-ink mb-6">Daily Calories</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={caloriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="consumed" 
                  stroke="#FF6B6B" 
                  strokeWidth={3}
                  dot={{ fill: '#FF6B6B', strokeWidth: 2, r: 4 }}
                  name="Consumed"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#FFD166" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#FFD166', strokeWidth: 2, r: 3 }}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Macros and Achievements */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Macro Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-graphite-ink mb-6">Macro Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={macrosData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {macrosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              {macrosData.map((macro) => (
                <div key={macro.name} className="text-center">
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: macro.color }}
                  ></div>
                  <div className="text-sm font-medium text-graphite-ink">{macro.name}</div>
                  <div className="text-xs text-gray-500">{macro.value}%</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-graphite-ink">Achievements</h3>
              <Award className="h-6 w-6 text-citrus-glow" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    badge.achieved
                      ? 'border-leaf-green bg-leaf-green/10'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-semibold text-graphite-ink mb-1">
                      {badge.name}
                    </div>
                    {badge.achieved ? (
                      <div className="text-xs text-leaf-green font-medium">
                        Earned {badge.date}
                      </div>
                    ) : (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-vital-mint h-1 rounded-full transition-all duration-300"
                            style={{ width: `${badge.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {badge.progress}% complete
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};