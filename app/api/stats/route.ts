import { NextRequest, NextResponse } from 'next/server'

interface StatsResponse {
  totalScripts: number
  protectedToday: number
  activeUsers: number
  successRate: number
  serverStatus: {
    protection: string
    database: string
    api: string
  }
  recentActivity: Array<{
    id: number
    action: string
    time: string
    user: string
  }>
}

export async function GET(request: NextRequest) {
  try {
    // محاكاة إحصائيات حقيقية مع بيانات متغيرة
    const now = new Date()
    const baseStats = {
      totalScripts: 1247 + Math.floor(Math.random() * 100),
      protectedToday: 23 + Math.floor(Math.random() * 20),
      activeUsers: 156 + Math.floor(Math.random() * 50),
      successRate: 99.8 + (Math.random() * 0.2 - 0.1), // بين 99.7 و 99.9
    }

    const stats: StatsResponse = {
      ...baseStats,
      serverStatus: {
        protection: 'online',
        database: 'online', 
        api: 'online'
      },
      recentActivity: [
        {
          id: 1,
          action: 'حماية سكريبت جديد',
          time: `${Math.floor(Math.random() * 10) + 1} دقائق`,
          user: `User_${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`
        },
        {
          id: 2,
          action: 'تم التحقق من loadstring',
          time: `${Math.floor(Math.random() * 20) + 5} دقيقة`,
          user: `User_${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`
        },
        {
          id: 3,
          action: 'حماية سكريبت جديد',
          time: `${Math.floor(Math.random() * 30) + 10} دقيقة`,
          user: `User_${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`
        },
        {
          id: 4,
          action: 'تحديث إعدادات الحماية',
          time: `${Math.floor(Math.random() * 60) + 15} دقيقة`,
          user: 'Admin'
        },
        {
          id: 5,
          action: 'حماية سكريبت جديد',
          time: `${Math.floor(Math.random() * 90) + 20} دقيقة`,
          user: `User_${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`
        }
      ]
    }

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { error: 'خطأ في استرجاع الإحصائيات' },
      { status: 500 }
    )
  }
}