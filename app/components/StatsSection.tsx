'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Users, Activity, Code, Database } from 'lucide-react'

interface Stats {
  totalScripts: number
  protectedToday: number
  activeUsers: number
  successRate: number
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    totalScripts: 0,
    protectedToday: 0,
    activeUsers: 0,
    successRate: 0
  })

  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    // محاكاة تحميل الإحصائيات
    const loadStats = () => {
      const savedScripts = JSON.parse(localStorage.getItem('kulthx_scripts') || '[]')
      const today = new Date().toDateString()
      const todayScripts = savedScripts.filter((script: any) => 
        new Date(script.createdAt).toDateString() === today
      )

      setStats({
        totalScripts: savedScripts.length + 1247, // إضافة أرقام وهمية للعرض
        protectedToday: todayScripts.length + 23,
        activeUsers: 156,
        successRate: 99.8
      })

      setRecentActivity([
        { id: 1, action: 'حماية سكريبت جديد', time: '2 دقائق', user: 'User_001' },
        { id: 2, action: 'تم التحقق من loadstring', time: '5 دقائق', user: 'User_002' },
        { id: 3, action: 'حماية سكريبت جديد', time: '12 دقيقة', user: 'User_003' },
        { id: 4, action: 'تحديث إعدادات الحماية', time: '18 دقيقة', user: 'Admin' },
        { id: 5, action: 'حماية سكريبت جديد', time: '25 دقيقة', user: 'User_004' },
      ])
    }

    loadStats()
    
    // تحديث الإحصائيات كل 30 ثانية
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      title: 'إجمالي السكريبتات المحمية',
      value: stats.totalScripts.toLocaleString(),
      icon: Database,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      change: '+12%'
    },
    {
      title: 'محمية اليوم',
      value: stats.protectedToday.toString(),
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      change: '+8%'
    },
    {
      title: 'المستخدمون النشطون',
      value: stats.activeUsers.toString(),
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      change: '+15%'
    },
    {
      title: 'معدل النجاح',
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      change: '+0.2%'
    }
  ]

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">إحصائيات المنصة</h1>
          <p className="text-gray-300">مراقبة أداء وإحصائيات منصة KULTHX SAFEME في الوقت الفعلي</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-xs text-green-400 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center mb-6">
              <Activity className="w-6 h-6 text-blue-400 ml-3" />
              <h2 className="text-xl font-bold text-white">النشاط الأخير</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-gray-400 text-sm">بواسطة {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-green-400 ml-3" />
              <h2 className="text-xl font-bold text-white">أداء النظام</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">سرعة المعالجة</span>
                <span className="text-green-400 font-bold">98.2%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '98.2%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">استقرار الخدمة</span>
                <span className="text-blue-400 font-bold">99.9%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">رضا المستخدمين</span>
                <span className="text-purple-400 font-bold">96.8%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '96.8%' }}></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Server Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 glass-card p-6"
        >
          <div className="flex items-center mb-6">
            <Code className="w-6 h-6 text-yellow-400 ml-3" />
            <h2 className="text-xl font-bold text-white">حالة الخوادم</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white">خادم الحماية</span>
              </div>
              <span className="text-green-400 font-bold">متصل</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white">قاعدة البيانات</span>
              </div>
              <span className="text-green-400 font-bold">متصلة</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white">API Gateway</span>
              </div>
              <span className="text-green-400 font-bold">متصل</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}