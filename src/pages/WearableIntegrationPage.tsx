import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Watch, Smartphone, Activity, Heart, Zap, Wifi, CheckCircle, AlertCircle, Plus } from 'lucide-react';

export const WearableIntegrationPage: React.FC = () => {
  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: 1,
      name: 'Apple Watch Series 8',
      type: 'watch',
      brand: 'Apple',
      connected: true,
      lastSync: '2 minutes ago',
      batteryLevel: 78,
      syncData: ['Steps', 'Heart Rate', 'Calories', 'Workouts'],
      image: 'https://images.pexels.com/photos/1796194/pexels-photo-1796194.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ]);

  const [availableDevices] = useState([
    {
      id: 2,
      name: 'Fitbit Charge 5',
      type: 'fitness',
      brand: 'Fitbit',
      connected: false,
      features: ['Heart Rate', 'Sleep Tracking', 'Steps', 'GPS'],
      image: 'https://images.pexels.com/photos/4498481/pexels-photo-4498481.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Samsung Galaxy Watch',
      type: 'watch',
      brand: 'Samsung',
      connected: false,
      features: ['Heart Rate', 'Blood Oxygen', 'Steps', 'Workouts'],
      image: 'https://images.pexels.com/photos/1796194/pexels-photo-1796194.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Garmin Forerunner',
      type: 'fitness',
      brand: 'Garmin',
      connected: false,
      features: ['GPS', 'Running Metrics', 'Heart Rate', 'Training Load'],
      image: 'https://images.pexels.com/photos/4498481/pexels-photo-4498481.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ]);

  const syncStats = [
    {
      label: 'Steps Today',
      value: '8,432',
      target: '10,000',
      progress: 84,
      icon: Activity,
      color: 'vital-mint'
    },
    {
      label: 'Calories Burned',
      value: '2,156',
      target: '2,300',
      progress: 94,
      icon: Zap,
      color: 'citrus-glow'
    },
    {
      label: 'Heart Rate Avg',
      value: '72 bpm',
      target: 'Normal',
      progress: 100,
      icon: Heart,
      color: 'coral-energy'
    },
    {
      label: 'Active Minutes',
      value: '45 min',
      target: '60 min',
      progress: 75,
      icon: Watch,
      color: 'leaf-green'
    }
  ];

  const handleConnect = (deviceId: number) => {
    const device = availableDevices.find(d => d.id === deviceId);
    if (device) {
      setConnectedDevices(prev => [...prev, {
        ...device,
        connected: true,
        lastSync: 'Just now',
        batteryLevel: Math.floor(Math.random() * 30) + 70,
        syncData: device.features
      }]);
    }
  };

  const handleDisconnect = (deviceId: number) => {
    setConnectedDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-cloud to-white pt-20 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Watch className="h-16 w-16 text-vital-mint mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-graphite-ink mb-4">
              Smart Wearable <span className="text-vital-mint">Integration</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect your fitness trackers and smartwatches to automatically adjust your nutrition plan based on your activity levels
            </p>
          </motion.div>
        </div>

        {/* Sync Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {syncStats.map((stat, index) => (
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
                <Wifi className="h-4 w-4 text-leaf-green" />
              </div>
              
              <div className="text-2xl font-bold text-graphite-ink mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-3">Target: {stat.target}</div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`bg-${stat.color} h-2 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
              
              <div className="text-xs text-gray-500 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Connected Devices */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-graphite-ink">Connected Devices</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-leaf-green rounded-full animate-pulse"></div>
                <span className="text-sm text-leaf-green font-medium">Live Sync</span>
              </div>
            </div>

            <div className="space-y-4">
              {connectedDevices.map((device) => (
                <motion.div
                  key={device.id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={device.image}
                        alt={device.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-graphite-ink">{device.name}</h3>
                        <p className="text-sm text-gray-600">{device.brand}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-leaf-green" />
                      <span className="text-sm font-medium text-leaf-green">Connected</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Sync</p>
                      <p className="text-sm font-medium text-graphite-ink">{device.lastSync}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Battery</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-leaf-green rounded-full"
                            style={{ width: `${device.batteryLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{device.batteryLevel}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Syncing Data</p>
                    <div className="flex flex-wrap gap-1">
                      {device.syncData?.map((data) => (
                        <span
                          key={data}
                          className="bg-vital-mint/10 text-vital-mint px-2 py-1 rounded text-xs"
                        >
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-soft-cloud text-graphite-ink py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                      Settings
                    </button>
                    <button
                      onClick={() => handleDisconnect(device.id)}
                      className="flex-1 bg-coral-energy/10 text-coral-energy py-2 px-3 rounded-lg text-sm font-medium hover:bg-coral-energy/20 transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </motion.div>
              ))}

              {connectedDevices.length === 0 && (
                <div className="text-center py-8">
                  <Watch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No devices connected yet</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Available Devices */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-graphite-ink">Add New Device</h2>
              <Plus className="h-6 w-6 text-vital-mint" />
            </div>

            <div className="space-y-4">
              {availableDevices
                .filter(device => !connectedDevices.some(cd => cd.id === device.id))
                .map((device) => (
                  <motion.div
                    key={device.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={device.image}
                          alt={device.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-graphite-ink">{device.name}</h3>
                          <p className="text-sm text-gray-600">{device.brand}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Not Connected</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Available Features</p>
                      <div className="flex flex-wrap gap-1">
                        {device.features.map((feature) => (
                          <span
                            key={feature}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleConnect(device.id)}
                      className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Connect Device
                    </motion.button>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Integration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-vital-mint/10 to-citrus-glow/10 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-graphite-ink mb-4">
              Smart Integration Benefits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              When you connect your wearable devices, HOMH12 automatically adjusts your nutrition plan based on your real-time activity data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-vital-mint p-4 rounded-full w-fit mx-auto mb-4">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-graphite-ink mb-2">Auto-Adjust Calories</h3>
              <p className="text-gray-600">
                Your daily calorie targets automatically adjust based on your activity level and workouts
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coral-energy p-4 rounded-full w-fit mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-graphite-ink mb-2">Heart Rate Insights</h3>
              <p className="text-gray-600">
                Get nutrition recommendations based on your heart rate patterns and recovery needs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-citrus-glow p-4 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-graphite-ink mb-2">Real-Time Optimization</h3>
              <p className="text-gray-600">
                Your meal suggestions adapt in real-time to match your energy expenditure and goals
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};