import { Link } from "react-router-dom";
import { 
  UserPlus, 
  Search, 
  ClipboardCheck, 
  Award,
  ChevronLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "۱",
    icon: UserPlus,
    title: "ثبت نام",
    description: "اطلاعات خود و فرزندتان را ثبت کنید و وارد سامانه شوید",
    color: "primary",
  },
  {
    number: "۲",
    icon: Search,
    title: "جستجوی محفل",
    description: "محفل قرآنی مناسب را در شهر خود پیدا کنید",
    color: "secondary",
  },
  {
    number: "۳",
    icon: ClipboardCheck,
    title: "ثبت نام در محفل",
    description: "فرزند خود را در محفل مورد نظر ثبت نام کنید",
    color: "primary",
  },
  {
    number: "۴",
    icon: Award,
    title: "پیگیری پیشرفت",
    description: "روند حفظ و ارزشیابی فرزند خود را پیگیری کنید",
    color: "secondary",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container">
        {/* عنوان */}
        <div className="text-center mb-12">
          <h2 className="text-headline text-foreground mb-4">
            چگونه <span className="text-primary">شروع کنیم؟</span>
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            در چهار مرحله ساده، فرزند خود را در محفل قرآنی ثبت نام کنید
          </p>
        </div>

        {/* مراحل */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative p-6 rounded-2xl bg-card border border-border/50 hover:shadow-card-hover transition-all duration-300 h-full">
                {/* شماره */}
                <div className={`absolute -top-4 right-6 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  step.color === "primary" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {step.number}
                </div>

                {/* آیکون */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl mb-4 ${
                  step.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary/10 text-secondary"
                }`}>
                  <step.icon className="h-7 w-7" />
                </div>

                {/* محتوا */}
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* خط اتصال */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -left-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </div>
          ))}
        </div>

        {/* دکمه */}
        <div className="text-center">
          <Link to="/register">
            <Button size="lg" className="gap-2 gradient-primary border-0 shadow-soft hover:shadow-lg transition-shadow">
              همین الان شروع کنید
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
