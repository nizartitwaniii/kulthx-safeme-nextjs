import { NextRequest, NextResponse } from 'next/server'

interface ProtectRequest {
  script: string
  userId?: string
}

interface ProtectResponse {
  success: boolean
  id?: string
  loadstring?: string
  error?: string
}

// محاكاة قاعدة بيانات مؤقتة
const scripts: { [key: string]: { script: string, createdAt: string, userId?: string } } = {}

export async function POST(request: NextRequest) {
  try {
    const body: ProtectRequest = await request.json()
    
    if (!body.script || !body.script.trim()) {
      return NextResponse.json({
        success: false,
        error: 'يجب إدخال سكريبت صالح'
      } as ProtectResponse, { status: 400 })
    }

    // إنشاء معرف فريد للسكريبت
    const scriptId = generateUniqueId()
    
    // حفظ السكريبت
    scripts[scriptId] = {
      script: body.script.trim(),
      createdAt: new Date().toISOString(),
      userId: body.userId || 'anonymous'
    }

    // إنشاء loadstring
    const baseUrl = request.headers.get('host')?.includes('localhost') 
      ? `http://${request.headers.get('host')}` 
      : `https://${request.headers.get('host')}`
    
    const loadstring = `loadstring(game:HttpGet("${baseUrl}/api/script?id=${scriptId}"))()`

    return NextResponse.json({
      success: true,
      id: scriptId,
      loadstring
    } as ProtectResponse)

  } catch (error) {
    console.error('Error protecting script:', error)
    return NextResponse.json({
      success: false,
      error: 'خطأ في معالجة السكريبت'
    } as ProtectResponse, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scriptId = searchParams.get('id')

    if (!scriptId || !scripts[scriptId]) {
      return NextResponse.json({
        success: false,
        error: 'السكريبت غير موجود'
      } as ProtectResponse, { status: 404 })
    }

    const script = scripts[scriptId]
    return NextResponse.json({
      success: true,
      id: scriptId,
      script: script.script,
      createdAt: script.createdAt
    })

  } catch (error) {
    console.error('Error retrieving script:', error)
    return NextResponse.json({
      success: false,
      error: 'خطأ في استرجاع السكريبت'
    } as ProtectResponse, { status: 500 })
  }
}

function generateUniqueId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}