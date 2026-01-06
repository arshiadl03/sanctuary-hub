import { Link } from "react-router-dom";
import { MapPin, Clock, Users, ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleMahafil, dayOfWeekLabels } from "@/data/mahafil";
import { getProvinceName, getCityName } from "@/data/iranProvinces";

export function FeaturedMahafil() {
  const featuredMahafil = sampleMahafil.slice(0, 4);

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        {/* عنوان */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-headline text-foreground mb-4">
              محافل <span className="text-primary">برتر</span>
            </h2>
            <p className="text-body text-muted-foreground max-w-xl">
              محافل قرآنی منتخب با بیشترین رضایتمندی والدین و کودکان
            </p>
          </div>
          <Link to="/mahafil" className="hidden sm:block">
            <Button variant="outline" className="gap-2">
              مشاهده همه
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* کارت‌های محفل */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredMahafil.map((mahfil, index) => (
            <article
              key={mahfil.id}
              className="group relative rounded-2xl bg-card border border-border/50 overflow-hidden hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                {/* هدر */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                        {mahfil.gender === "boys" ? "پسرانه" : mahfil.gender === "girls" ? "دخترانه" : "مختلط"}
                      </Badge>
                      <Badge variant="outline" className="border-secondary/50 text-secondary-foreground">
                        {mahfil.ageRange.min} تا {mahfil.ageRange.max} سال
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {mahfil.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-secondary">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">۴.۸</span>
                  </div>
                </div>

                {/* توضیحات */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {mahfil.description}
                </p>

                {/* اطلاعات */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {getProvinceName(mahfil.provinceId)}، {getCityName(mahfil.provinceId, mahfil.cityId)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {mahfil.daysOfWeek.map((d) => dayOfWeekLabels[d]).join("، ")} | {mahfil.startTime} - {mahfil.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {mahfil.currentStudents} از {mahfil.capacity} نفر
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(mahfil.currentStudents / mahfil.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* ویژگی‌ها */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mahfil.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* استاد و دکمه */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">{mahfil.teacherName}</p>
                    <p className="text-xs text-muted-foreground">{mahfil.teacherTitle}</p>
                  </div>
                  <Link to={`/mahafil/${mahfil.id}`}>
                    <Button size="sm" className="gap-2 gradient-primary border-0">
                      ثبت نام
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* دکمه موبایل */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/mahafil">
            <Button variant="outline" className="gap-2">
              مشاهده همه محافل
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
