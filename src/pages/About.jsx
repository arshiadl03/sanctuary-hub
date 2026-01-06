import { Layout } from "@/components/layout/Layout/Layout";
import { Helmet } from "react-helmet-async";
import { Target, Heart, Users, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "هدف ما",
    description: "ترویج فرهنگ قرآنی و تشویق کودکان به حفظ قرآن کریم در محیطی شاد و امن",
  },
  {
    icon: Heart,
    title: "ارزش‌های ما",
    description: "احترام به کرامت انسانی، صداقت، تعهد به کیفیت و نوآوری در آموزش",
  },
  {
    icon: Users,
    title: "جامعه ما",
    description: "بیش از ۱۵,۰۰۰ کودک قرآن‌آموز و ۳۰۰ استاد مجرب در سراسر کشور",
  },
  {
    icon: Award,
    title: "دستاوردها",
    description: "کسب رتبه‌های برتر کشوری توسط شاگردان محافل در مسابقات قرآنی",
  },
];

const team = [
  { name: "استاد محمدی", role: "مدیر آموزش", image: "" },
  { name: "خانم کریمی", role: "مسئول پشتیبانی", image: "" },
  { name: "آقای رضایی", role: "مدیر فنی", image: "" },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>درباره ما | محافل قرآنی کودکان</title>
        <meta
          name="description"
          content="آشنایی با سامانه محافل قرآنی کودکان ایران، اهداف، ارزش‌ها و تیم ما"
        />
      </Helmet>
      <Layout>
        {/* هدر */}
        <section className="bg-muted/30 py-16">
          <div className="container text-center">
            <h1 className="text-headline text-foreground mb-4">
              درباره <span className="text-primary">ما</span>
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              سامانه مدیریت و ارزشیابی محافل قرآنی کودکان با هدف ایجاد بستری هوشمند
              برای آموزش و پایش پیشرفت کودکان در مسیر حفظ قرآن کریم
            </p>
          </div>
        </section>

        {/* داستان ما */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-title text-foreground mb-6">داستان ما</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    سامانه محافل قرآنی کودکان از ایده‌ای ساده آغاز شد: ایجاد پلی بین
                    والدین، استادان و کودکان برای پایش و تشویق در مسیر حفظ قرآن کریم.
                  </p>
                  <p>
                    با الهام از محفل قرآنی موسی بن جعفر (علیه‌السلام)، این سامانه
                    توسعه یافت تا امکان گسترش به تمام محافل قرآنی کشور را داشته باشد.
                  </p>
                  <p>
                    امروز، ما به بیش از ۵۰۰ محفل فعال در سراسر ایران خدمات ارائه
                    می‌دهیم و هدف بزرگ‌تر ما تحول دیجیتال در آموزش قرآن با حفظ روح
                    معنوی و تربیتی محافل سنتی است.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">۱۴۰۲</div>
                    <p className="text-muted-foreground">سال تأسیس</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary/30 blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* ارزش‌ها */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-title text-foreground text-center mb-12">
              ارزش‌ها و اهداف
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="p-6 rounded-2xl bg-card border border-border hover:shadow-card-hover transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* آمار */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {[
                { value: "۵۰۰+", label: "محفل فعال" },
                { value: "۱۵,۰۰۰+", label: "کودک قرآن‌آموز" },
                { value: "۳۰۰+", label: "استاد مجرب" },
                { value: "۳۱", label: "استان کشور" },
              ].map((stat) => (
                <div key={stat.label} className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
