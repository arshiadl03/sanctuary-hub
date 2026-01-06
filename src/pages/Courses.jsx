import { Layout } from "@/components/layout/Layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Play, Clock, Users, Star, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: "1",
    title: "آموزش حفظ جزء ۳۰ قرآن کریم",
    description: "دوره جامع حفظ جزء سی‌ام قرآن کریم با روش‌های نوین و جذاب برای کودکان",
    instructor: "استاد محمدی",
    duration: "۲۰ جلسه",
    students: 450,
    rating: 4.9,
    level: "مبتدی",
    price: "رایگان",
    image: "",
  },
  {
    id: "2",
    title: "آموزش روانخوانی قرآن",
    description: "یادگیری خواندن روان و صحیح قرآن کریم با تمرین‌های عملی",
    instructor: "خانم کریمی",
    duration: "۱۵ جلسه",
    students: 380,
    rating: 4.8,
    level: "مبتدی",
    price: "رایگان",
    image: "",
  },
  {
    id: "3",
    title: "آموزش تجوید مقدماتی",
    description: "قواعد پایه‌ای تجوید برای خواندن صحیح قرآن کریم",
    instructor: "استاد رضایی",
    duration: "۱۲ جلسه",
    students: 290,
    rating: 4.7,
    level: "متوسط",
    price: "رایگان",
    image: "",
  },
  {
    id: "4",
    title: "آموزش مفاهیم قرآنی برای کودکان",
    description: "آشنایی با معانی و مفاهیم آیات قرآن به زبان ساده",
    instructor: "حجت‌الاسلام موسوی",
    duration: "۱۸ جلسه",
    students: 210,
    rating: 4.9,
    level: "مبتدی",
    price: "رایگان",
    image: "",
  },
];

export default function Courses() {
  return (
    <>
      <Helmet>
        <title>آموزش‌ها | محافل قرآنی کودکان</title>
        <meta
          name="description"
          content="دوره‌های آموزشی رایگان حفظ قرآن، روانخوانی، تجوید و مفاهیم قرآنی برای کودکان"
        />
      </Helmet>
      <Layout>
        {/* هدر */}
        <section className="bg-muted/30 py-12">
          <div className="container">
            <h1 className="text-headline text-foreground mb-4">
              <span className="text-primary">آموزش‌های</span> قرآنی
            </h1>
            <p className="text-body text-muted-foreground max-w-2xl">
              دوره‌های آموزشی رایگان برای یادگیری قرآن کریم با بهترین اساتید
            </p>
          </div>
        </section>

        {/* لیست دوره‌ها */}
        <section className="py-12">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((course, index) => (
                <article
                  key={course.id}
                  className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-card-hover transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow-primary group-hover:scale-110 transition-transform">
                      <Play className="h-7 w-7 mr-[-2px]" />
                    </button>
                    <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground border-0">
                      {course.price}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{course.level}</Badge>
                      <div className="flex items-center gap-1 text-secondary mr-auto">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students} شاگرد
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm font-medium">{course.instructor}</span>
                      <Link to={`/courses/${course.id}`}>
                        <Button size="sm" className="gap-1 gradient-primary border-0">
                          مشاهده دوره
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
