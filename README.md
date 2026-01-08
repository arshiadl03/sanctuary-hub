# Sanctuary Hub - سامانه مدیریت محافل قرآنی کودکان

پلتفرم هوشمند برای ثبت‌نام، حضورگیری، ارزیابی و پاداش‌دهی در محافل قرآنی کودکان.

## ویژگی‌ها
- صفحه اصلی با هیرو، دسته‌بندی محافل، نحوه کار و کال تو اکشن
- داشبورد role-based (والدین، معلم، ادمین)
- مدیریت فرزندان، امتیازات، حضور و ارزیابی
- تم سبز/طلایی معنوی با دارک مود

## نصب و راه‌اندازی
```bash
git clone https://github.com/arshiadl03/sanctuary-hub.git
cd sanctuary-hub
npm install
npm run dev


فولدر docs رو پر کن:
- فایل جدید `docs/API.md`: endpoints مثل `/children`, auth و غیره.
- `docs/ROLES.md`: توضیح roles (parent, teacher, admin).

### بعدی چی؟
- تم toggle رو اضافه کن و تست کن.
- یک سکشن (مثل HeroSection) رو با انیمیشن‌ها پر کن اگر placeholder داره.
- اگر screenshot از صفحه فعلی یا error داری، بفرست.

پروژه‌ت داره حرفه‌ای می‌شه — با اینا UI/UX عالی می‌شه! 🌟