import { Layout } from "@/components/layout/Layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, User, ChevronLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: "1",
    title: "راهنمای جامع حفظ قرآن برای کودکان",
    excerpt: "در این مقاله با روش‌های علمی و کاربردی برای حفظ قرآن در کودکان آشنا می‌شوید...",
    author: "استاد محمدی",
    date: "۱۴۰۳/۰۹/۱۵",
    readTime: "۱۰ دقیقه",
    category: "آموزشی",
    image: "",
  },
  {
    id: "2",
    title: "نقش والدین در تشویق کودکان به حفظ قرآن",
    excerpt: "والدین نقش کلیدی در ایجاد انگیزه و پشتیبانی از کودکان در مسیر حفظ قرآن دارند...",
    author: "خانم کریمی",
    date: "۱۴۰۳/۰۹/۱۰",
    readTime: "۸ دقیقه",
    category: "تربیتی",
    image: "",
  },
  {
    id: "3",
    title: "فضایل و برکات حفظ قرآن کریم",
    excerpt: "حفظ قرآن کریم دارای فضایل و برکات فراوانی است که در روایات به آنها اشاره شده...",
    author: "حجت‌الاسلام موسوی",
    date: "۱۴۰۳/۰۹/۰۵",
    readTime: "۱۲ دقیقه",
    category: "معنوی",
    image: "",
  },
  {
    id: "4",
    title: "روش‌های نوین آموزش تجوید به کودکان",
    excerpt: "با استفاده از بازی و فناوری، آموزش تجوید به کودکان را جذاب‌تر کنید...",
    author: "استاد رضایی",
    date: "۱۴۰۳/۰۸/۲۸",
    readTime: "۷ دقیقه",
    category: "آموزشی",
    image: "",
  },
];

const categories = ["همه", "آموزشی", "تربیتی", "معنوی", "اخبار"];

export default function Articles() {
  return (
    <>
      <Helmet>
        <title>مقالات | محافل قرآنی کودکان</title>
        <meta
          name="description"
          content="مقالات آموزشی و تربیتی درباره حفظ قرآن کریم برای کودکان"
        />
      </Helmet>
      <Layout>
        {/* هدر */}
        <section className="bg-muted/30 py-12">
          <div className="container">
            <h1 className="text-headline text-foreground mb-4">
              <span className="text-primary">مقالات</span> آموزشی
            </h1>
            <p className="text-body text-muted-foreground max-w-2xl">
              مجموعه مقالات مفید درباره آموزش و تربیت قرآنی کودکان
            </p>
          </div>
        </section>

        {/* دسته‌بندی‌ها */}
        <section className="py-6 border-b border-border">
          <div className="container">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, index) => (
                <Button
                  key={cat}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "gradient-primary border-0" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* لیست مقالات */}
        <section className="py-12">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-card-hover transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-muted/50 flex items-center justify-center">
                    <span className="text-4xl">📖</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                        <span>•</span>
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <Link to={`/articles/${article.id}`}>
                        <Button size="sm" variant="ghost" className="gap-1">
                          ادامه
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
