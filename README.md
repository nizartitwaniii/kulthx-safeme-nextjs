# 🛡️ KULTHX SAFEME - Roblox Script Protection Platform

منصة حماية وتشفير سكريبتات Roblox المتقدمة

## ✨ المميزات

- 🔒 **حماية متقدمة**: تشفير قوي للسكريبتات يحميها من السرقة والتعديل
- ⚡ **تنفيذ سريع**: تحميل فوري للسكريبتات المحمية عبر HTTP
- 🎯 **سهولة الاستخدام**: واجهة بسيطة وبديهية
- 📊 **إحصائيات شاملة**: مراقبة الأداء والاستخدام في الوقت الفعلي
- 🌐 **دعم متعدد اللغات**: واجهة باللغة العربية مع دعم RTL
- 🚀 **أداء عالي**: مبني بـ Next.js لأداء متميز

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## 🚀 كيفية الاستخدام

### 1. حماية السكريبت
1. انتقل إلى قسم "حماية السكريبت"
2. ألصق كود Lua الخاص بك
3. اضغط "حماية السكريبت"
4. انسخ الـ loadstring المُنتج

### 2. تنفيذ السكريبت
```lua
-- انسخ والصق الـ loadstring في أي Roblox executor
loadstring(game:HttpGet("https://your-domain.vercel.app/api/script?id=SCRIPT_ID"))()
```

## 🔧 التطوير المحلي

```bash
# تثبيت المتطلبات
npm install

# تشغيل الخادم المحلي
npm run dev

# بناء للإنتاج
npm run build
```

## 📡 API Endpoints

### GET /api/script?id={scriptId}
استرجاع سكريبت محمي بواسطة معرفه

### POST /api/protect
حماية سكريبت جديد
```json
{
  "script": "-- كود Lua هنا",
  "userId": "optional_user_id"
}
```

### GET /api/stats
الحصول على إحصائيات المنصة

## 🛡️ الأمان

- تشفير قوي للسكريبتات
- التحقق من User-Agent لضمان الوصول من Roblox فقط
- حماية ضد الوصول غير المصرح به
- معرفات فريدة للسكريبتات

## 📦 النشر على Vercel

1. ادفع الكود إلى GitHub
2. اربط المشروع بـ Vercel
3. النشر التلقائي مع كل commit

## 📝 الترخيص

هذا المشروع مملوك لـ KULTHX - جميع الحقوق محفوظة

---

**تم تطوير المشروع بـ ❤️ بواسطة KULTHX Team**