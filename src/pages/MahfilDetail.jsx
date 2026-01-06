import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  Users, 
  ChevronLeft, 
  Star, 
  Calendar,
  Phone,
  CheckCircle2 
} from "lucide-react";
import { Layout } from "@/components/layout/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMahfilById, dayOfWeekLabels } from "@/data/mahafil";
import { getProvinceName, getCityName } from "@/data/iranProvinces";
import { Helmet } from "react-helmet-async";

export default function MahfilDetail() {
  const { id } = useParams();
  const mahfil = getMahfilById(id || "");

  if (!mahfil) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">محفل یافت نشد</h1>
          <Link to="/mahafil">
            <Button>بازگشت به لیست محافل</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{mahfil.name} | محافل قرآنی</title>
        <meta name="description" content={mahfil.description} />
      </Helmet>
      <Layout>
        {/* بردکرامب */}
        <div className="bg-muted/30 py-4">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">صفحه اصلی</Link>
              <ChevronLeft className="h-4 w-4" />
              <Link to="/mahafil" className="hover:text-foreground transition-colors">محافل قرآنی</Link>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-foreground">{mahfil.name}</span>
            </nav>
          </div>
        </div>

        {/* محتوای اصلی */}
        <section className="py-12">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* اطلاعات محفل */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                        {mahfil.gender === "boys" ? "پسرانه" : mahfil.gender === "girls" ? "دخترانه" : "مختلط"}
                      </Badge>
                      <Badge variant="outline">
                        {mahfil.ageRange.min} تا {mahfil.ageRange.max} سال
                      </Badge>
                      <div className="flex items-center gap-1 text-secondary mr-auto">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">۴.۸</span>
                      </div>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      {mahfil.name}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {getProvinceName(mahfil.provinceId)}، {getCityName(mahfil.provinceId, mahfil.cityId)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* توضیحات */}
                <div className="prose prose-lg max-w-none mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">درباره محفل</h2>
                  <p className="text-muted-foreground leading-relaxed">{mahfil.description}</p>
                </div>

                {/* ویژگی‌ها */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">ویژگی‌های آموزشی</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {mahfil.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* استاد */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h2 className="text-xl font-bold text-foreground mb-4">استاد محفل</h2>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {mahfil.teacherName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{mahfil.teacherName}</h3>
                      <p className="text-muted-foreground">{mahfil.teacherTitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* کارت ثبت نام */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border shadow-card">
                  <h3 className="text-lg font-bold text-foreground mb-6">اطلاعات ثبت نام</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">روزهای برگزاری</p>
                        <p className="font-medium">
                          {mahfil.daysOfWeek.map((d) => dayOfWeekLabels[d]).join("، ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">ساعت برگزاری</p>
                        <p className="font-medium">{mahfil.startTime} - {mahfil.endTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">ظرفیت</p>
                        <p className="font-medium">
                          {mahfil.currentStudents} از {mahfil.capacity} نفر
                        </p>
                        <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(mahfil.currentStudents / mahfil.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">آدرس</p>
                        <p className="font-medium text-sm">{mahfil.address}</p>
                      </div>
                    </div>
                  </div>

                  <Link to={`/register?mahfil=${mahfil.id}`}>
                    <Button className="w-full h-12 gap-2 gradient-primary border-0 shadow-soft text-lg">
                      ثبت نام در محفل
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>برای اطلاعات بیشتر تماس بگیرید</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
