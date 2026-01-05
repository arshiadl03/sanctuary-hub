import { Link } from "react-router-dom";
import { BookOpen, Phone, Mail, MapPin, Instagram, Send } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { href: "/", label: "صفحه اصلی" },
    { href: "/mahafil", label: "محافل قرآنی" },
    { href: "/courses", label: "آموزش‌ها" },
    { href: "/articles", label: "مقالات" },
  ],
  support: [
    { href: "/faq", label: "سوالات متداول" },
    { href: "/guide", label: "راهنمای استفاده" },
    { href: "/contact", label: "تماس با ما" },
    { href: "/about", label: "درباره ما" },
  ],
  legal: [
    { href: "/terms", label: "قوانین و مقررات" },
    { href: "/privacy", label: "حریم خصوصی" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* بخش اصلی */}
      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* معرفی */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">محافل قرآنی</span>
                <span className="text-xs text-background/70">کودکان ایران</span>
              </div>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed mb-6">
              سامانه مدیریت و ارزشیابی محافل قرآنی کودکان با هدف ترویج فرهنگ قرآنی
              و تشویق کودکان به حفظ قرآن کریم
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h4 className="font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* پشتیبانی */}
          <div>
            <h4 className="font-bold mb-4">پشتیبانی</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* تماس با ما */}
          <div>
            <h4 className="font-bold mb-4">ارتباط با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 text-secondary" />
                <div>
                  <p className="text-sm font-medium">تلفن تماس</p>
                  <p className="text-sm text-background/70 font-mono" dir="ltr">
                    +98 21 1234 5678
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 text-secondary" />
                <div>
                  <p className="text-sm font-medium">ایمیل</p>
                  <p className="text-sm text-background/70">info@quran-kids.ir</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-secondary" />
                <div>
                  <p className="text-sm font-medium">آدرس</p>
                  <p className="text-sm text-background/70">
                    تهران، خیابان ولیعصر
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="border-t border-background/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © ۱۴۰۳ محافل قرآنی کودکان ایران. تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-background/60 hover:text-background transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
