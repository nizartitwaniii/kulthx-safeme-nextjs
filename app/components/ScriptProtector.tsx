'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Copy, CheckCircle, AlertCircle, Code, Loader2 } from 'lucide-react'

interface ScriptResult {
  id: string
  loadstring: string
  success: boolean
  error?: string
}

export default function ScriptProtector() {
  const [script, setScript] = useState('')
  const [result, setResult] = useState<ScriptResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const protectScript = async () => {
    if (!script.trim()) {
      setResult({
        id: '',
        loadstring: '',
        success: false,
        error: 'يرجى إدخال سكريبت صالح'
      })
      return
    }

    setLoading(true)
    
    // محاكاة معالجة السكريبت
    setTimeout(() => {
      const scriptId = generateScriptId()
      const loadstring = `loadstring(game:HttpGet("${window.location.origin}/api/script?id=${scriptId}"))()`
      
      setResult({
        id: scriptId,
        loadstring,
        success: true
      })
      setLoading(false)
      
      // حفظ السكريبت في localStorage للاختبار
      const savedScripts = JSON.parse(localStorage.getItem('kulthx_scripts') || '[]')
      savedScripts.push({
        id: scriptId,
        script: script.trim(),
        loadstring,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('kulthx_scripts', JSON.stringify(savedScripts))
    }, 2000)
  }

  const copyToClipboard = async () => {
    if (result?.loadstring) {
      await navigator.clipboard.writeText(result.loadstring)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const generateScriptId = () => {
    return Math.random().toString(36).substr(2, 16)
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">حماية السكريبت</h1>
          <p className="text-gray-300">أدخل سكريبت Lua الخاص بك للحصول على loadstring محمي</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Script Input */}
          <div className="glass-card p-6">
            <div className="flex items-center mb-4">
              <Code className="w-6 h-6 text-blue-400 ml-3" />
              <h2 className="text-xl font-bold text-white">سكريبت Lua</h2>
            </div>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="-- ألصق سكريبت Roblox هنا
print('مرحباً من KULTHX SAFEME!')
game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = 100"
              className="w-full h-64 bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="ltr"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={protectScript}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Shield className="w-5 h-5" />
              )}
              <span>{loading ? 'جاري الحماية...' : 'حماية السكريبت'}</span>
            </motion.button>
          </div>

          {/* Result */}
          <div className="glass-card p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-400 ml-3" />
              <h2 className="text-xl font-bold text-white">النتيجة المحمية</h2>
            </div>
            
            {!result && (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>أدخل سكريبت واضغط حماية للحصول على النتيجة</p>
                </div>
              </div>
            )}

            {result && result.success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>تم إنشاء الحماية بنجاح!</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    معرف السكريبت:
                  </label>
                  <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-3 font-mono text-sm text-blue-400">
                    {result.id}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Loadstring المحمي:
                  </label>
                  <div className="relative">
                    <textarea
                      value={result.loadstring}
                      readOnly
                      className="w-full h-20 bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white font-mono text-sm resize-none"
                      dir="ltr"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-300 mb-2">كيفية الاستخدام:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-blue-200">
                    <li>انسخ الـ loadstring أعلاه</li>
                    <li>ألصقه في أي Roblox executor</li>
                    <li>شغل السكريبت المحمي</li>
                  </ol>
                </div>
              </motion.div>
            )}

            {result && !result.success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{result.error}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="glass-card p-4 text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-bold text-white mb-1">تشفير متقدم</h3>
            <p className="text-sm text-gray-300">حماية قوية ضد فك التشفير</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Code className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-bold text-white mb-1">تنفيذ سريع</h3>
            <p className="text-sm text-gray-300">تحميل فوري للسكريبتات</p>
          </div>
          <div className="glass-card p-4 text-center">
            <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h3 className="font-bold text-white mb-1">موثوق 100%</h3>
            <p className="text-sm text-gray-300">يعمل مع جميع executors</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}