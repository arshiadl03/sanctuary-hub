import { Link } from "react-router-dom";
import { Play, Search, BookOpen, Users, Award, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden">
      {/* پس‌زمینه */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="container relative z-10 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* محتوای متنی */}
          <div className="max-w-xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-6">
              <Award className="h-4 w-4 text-secondary" />
              <span>بیش از ۵۰۰ محفل فعال در سراسر کشور</span>
            </div>

            <h1 className="text-display text-foreground mb-6">
              سامانه{" "}
              <span className="text-primary">محافل قرآنی</span>
              <br />
              کودکان ایران
            </h1>

            <p className="text-body-lg text-muted-foreground mb-8">
              بستری هوشمند و تعاملی برای مدیریت، پایش و ارزشیابی کودکان در مسیر حفظ
              قرآن کریم با امکانات ویژه برای استاد، والدین و کودکان
            </p>

            {/* جستجو */}
            <div className="flex gap-2 mb-8">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="جستجوی محفل قرآنی در شهر خود..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-12 rounded-xl bg-card border-border"
                />
              </div>
              <Link to={`/mahafil${searchQuery ? `?search=${searchQuery}` : ""}`}>
                <Button size="lg" className="h-12 px-6 rounded-xl gradient-primary border-0 shadow-soft hover:shadow-lg transition-shadow">
                  جستجو
                </Button>
              </Link>
            </div>

            {/* آمار */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: BookOpen, label: "محفل فعال", value: "۵۰۰+" },
                { icon: Users, label: "کودک قرآنی", value: "۱۵,۰۰۰+" },
                { icon: Award, label: "استاد مجرب", value: "۳۰۰+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center p-4 rounded-xl bg-card/80 backdrop-blur border border-border/50"
                >
                  <stat.icon className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ویدیوی معرفی */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card-hover bg-card">
              <img
                src={heroBanner}
                alt="معرفی محافل قرآنی کودکان"
                className="w-full h-full object-cover"
              />
              {/* دکمه پخش ویدیو */}
              <button className="absolute inset-0 flex items-center justify-center bg-foreground/30 hover:bg-foreground/40 transition-colors group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-glow-primary animate-pulse-glow group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-primary-foreground mr-[-4px]" />
                </div>
              </button>
              {/* برچسب */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-background/90 backdrop-blur">
                <span className="text-sm font-medium">ویدیوی معرفی سامانه</span>
                <ChevronLeft className="h-4 w-4" />
              </div>
            </div>

            {/* دکوراسیون */}
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-secondary/30 blur-2xl" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
