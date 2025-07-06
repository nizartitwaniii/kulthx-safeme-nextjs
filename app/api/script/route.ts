import { NextRequest, NextResponse } from 'next/server'

// محاكاة قاعدة بيانات مؤقتة للسكريبتات المحمية
const protectedScripts: { [key: string]: string } = {
  // أمثلة على سكريبتات محمية
  'demo001': `
-- KULTHX SAFEME Protected Script
-- Script ID: demo001
print("🛡️ تم تحميل السكريبت من KULTHX SAFEME")
print("مرحباً بك في منصة الحماية المتقدمة!")

-- مثال على سكريبت محمي
game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = 100
game.Players.LocalPlayer.Character.Humanoid.JumpPower = 100
print("تم تطبيق التحسينات بنجاح!")
  `,
  'demo002': `
-- KULTHX SAFEME Protected Script  
-- Script ID: demo002
print("⚡ تحميل سكريبت محمي...")

-- إعدادات اللاعب
local player = game.Players.LocalPlayer
if player and player.Character then
    local humanoid = player.Character:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.WalkSpeed = 50
        print("✅ تم تحديد سرعة المشي")
    end
end
  `
}

export async function GET(request: NextRequest) {
  try {
    // التحقق من User-Agent للتأكد من أن الطلب من Roblox
    const userAgent = request.headers.get('user-agent') || ''
    const isRobloxRequest = userAgent.includes('Roblox') || 
                           userAgent.includes('rbx') || 
                           userAgent.includes('roblox') ||
                           request.headers.get('roblox-id') // للاختبار

    // استخراج معرف السكريبت من URL
    const { searchParams } = new URL(request.url)
    const scriptId = searchParams.get('id')

    if (!scriptId) {
      return new NextResponse('Script ID is required', { 
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // البحث عن السكريبت في قاعدة البيانات المؤقتة
    let script = protectedScripts[scriptId]
    
    // إذا لم يوجد في البيانات المؤقتة، البحث في localStorage (للتطوير)
    if (!script && typeof window !== 'undefined') {
      try {
        const savedScripts = JSON.parse(localStorage.getItem('kulthx_scripts') || '[]')
        const foundScript = savedScripts.find((s: any) => s.id === scriptId)
        if (foundScript) {
          script = foundScript.script
        }
      } catch (e) {
        // في بيئة الخادم، localStorage غير متاح
      }
    }

    if (!script) {
      return new NextResponse('Script not found', { 
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // تسجيل الوصول للمراقبة
    console.log(`Script accessed: ${scriptId} from ${userAgent}`)

    // إرجاع السكريبت مع headers مناسبة
    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Error serving script:', error)
    return new NextResponse('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// دعم CORS للطلبات من Roblox
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Roblox-Id',
    },
  })
}