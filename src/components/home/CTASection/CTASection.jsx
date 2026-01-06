import { Link } from "react-router-dom";
import { ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 lg:p-16">
          {/* دکوراسیون */}
          <div className="absolute inset-0 bg-pattern-islamic opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-right max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 text-primary-foreground text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>ثبت نام رایگان و آسان</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                آماده‌اید فرزندتان قرآن‌آموز شود؟
              </h2>
              <p className="text-lg text-primary-foreground/80">
                همین امروز فرزند خود را در نزدیک‌ترین محفل قرآنی ثبت نام کنید و
                شاهد رشد معنوی و علمی او باشید
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="gap-2 bg-background text-primary hover:bg-background/90 shadow-lg"
                >
                  ثبت نام والدین
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/mahafil">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  مشاهده محافل
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
