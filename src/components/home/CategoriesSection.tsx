import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Mic, 
  GraduationCap, 
  Lightbulb, 
  Scroll, 
  Quote,
  ChevronLeft 
} from "lucide-react";
import { mahfilCategories } from "@/data/mahafil";

const iconMap: Record<string, React.ElementType> = {
  "book-open": BookOpen,
  "mic": Mic,
  "graduation-cap": GraduationCap,
  "lightbulb": Lightbulb,
  "scroll": Scroll,
  "quote": Quote,
};

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container">
        {/* عنوان */}
        <div className="text-center mb-12">
          <h2 className="text-headline text-foreground mb-4">
            دسته‌بندی <span className="text-primary">محافل قرآنی</span>
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            محفل مناسب فرزند خود را بر اساس نوع آموزش و سطح مورد نظر انتخاب کنید
          </p>
        </div>

        {/* کارت‌های دسته‌بندی */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mahfilCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || BookOpen;
            return (
              <Link
                key={category.id}
                to={`/mahafil?category=${category.id}`}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {category.count} محفل
                      </span>
                      <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
