# نکسین — استودیوی نرم‌افزار

سایت چندصفحه‌ای استاتیک (HTML / CSS / JS) بدون وابستگی به فریم‌ورک.

## ساختار پوشه‌ها

```
nexin/
├── index.html              ← صفحه اصلی
├── about.html              ← درباره ما
├── contact.html            ← تماس با ما
├── portfolio.html          ← نمونه‌کارها
├── services.html           ← فهرست خدمات
│
├── css/
│   ├── style.css           ← سیستم طراحی و استایل اصلی
│   ├── animations.css      ← انیمیشن‌ها
│   └── responsive.css      ← واکنش‌گرایی
│
├── js/
│   ├── data.js             ← تمام محتوا و داده‌های سایت (ویرایش اصلی اینجا)
│   ├── navigation.js       ← هدر، فوتر و منوی موبایل
│   └── main.js             ← رندر صفحات و تعاملات
│
├── assets/
│   └── icons/
│       └── favicon.svg
│
├── services/               ← صفحات جزئیات هر خدمت
│   ├── web-development.html
│   ├── mobile-app.html
│   ├── ui-ux.html
│   ├── custom-software.html
│   ├── maintenance.html
│   ├── backend-api.html
│   └── wordpress.html
│
└── projects/               ← صفحات جزئیات هر پروژه
    ├── project-1.html
    ├── project-2.html
    ├── project-3.html
    └── project-4.html
```

## نحوه اجرا

فقط فایل‌ها را با یک سرور محلی ساده باز کنید:

```bash
# با Python
python -m http.server 8080

# یا با Node (اگر npx دارید)
npx serve .
```

سپس به آدرس `http://localhost:8080` بروید.

## ویرایش محتوا

تقریباً همه متن‌ها، خدمات، پروژه‌ها و اطلاعات تماس داخل فایل `js/data.js` قرار دارند.
برای تغییر محتوا فقط همان فایل را ویرایش کنید؛ نیازی به دست زدن به HTML نیست.

## نکات

- سایت کاملاً RTL و فارسی است.
- فونت‌ها از Google Fonts بارگذاری می‌شوند (Vazirmatn + JetBrains Mono).
- تصاویر پروژه‌ها فعلاً از لینک‌های خارجی استفاده می‌کنند؛ در صورت نیاز می‌توانید آن‌ها را محلی کنید.
