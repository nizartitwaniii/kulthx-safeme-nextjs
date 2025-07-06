'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Code, Lock, Zap, ArrowRight, Copy, CheckCircle } from 'lucide-react'
import ScriptProtector from './components/ScriptProtector'
import StatsSection from './components/StatsSection'

export default function Home() {
  const [activeSection, setActiveSection] = useState<'home' | 'protect' | 'stats'>('home')

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <Shield className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-bold gradient-text">KULTHX SAFEME</span>
        </motion.div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveSection('home')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeSection === 'home' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => setActiveSection('protect')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeSection === 'protect' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            حماية السكريبت
          </button>
          <button
            onClick={() => setActiveSection('stats')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeSection === 'stats' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            الإحصائيات
          </button>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="relative z-10">
        {activeSection === 'home' && <HomeSection setActiveSection={setActiveSection} />}
        {activeSection === 'protect' && <ScriptProtector />}
        {activeSection === 'stats' && <StatsSection />}
      </div>
    </main>
  )
}

function HomeSection({ setActiveSection }: { setActiveSection: (section: 'protect') => void }) {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-bold mb-6">
          <span className="gradient-text">KULTHX SAFEME</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          منصة حماية وتشفير سكريبتات Roblox المتقدمة 🛡️<br />
          احمِ سكريبتاتك من السرقة والاختراق مع أحدث تقنيات التشفير
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveSection('protect')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl flex items-center mx-auto space-x-2 neon-glow"
        >
          <Shield className="w-5 h-5" />
          <span>ابدأ حماية السكريبت</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass-card p-6 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <feature.icon className="w-8 h-8 text-blue-400 ml-3" />
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
            </div>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-8 gradient-text">كيف يعمل؟</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const features = [
  {
    icon: Shield,
    title: "حماية متقدمة",
    description: "تشفير قوي يحمي سكريبتاتك من السرقة والتعديل غير المصرح به"
  },
  {
    icon: Code,
    title: "سهولة الاستخدام",
    description: "واجهة بسيطة وسهلة لحماية سكريبتاتك في ثوانٍ معدودة"
  },
  {
    icon: Zap,
    title: "أداء سريع",
    description: "تنفيذ فوري للسكريبتات المحمية دون تأثير على الأداء"
  }
]

const steps = [
  {
    title: "ألصق السكريبت",
    description: "ألصق كود Lua الخاص بك في المنطقة المخصصة"
  },
  {
    title: "احصل على Loadstring",
    description: "النظام ينشئ loadstring محمي ومشفر"
  },
  {
    title: "استخدم في Roblox",
    description: "انسخ والصق الـ loadstring في أي executor"
  }
]