import { useState } from "react";
import { Layout } from "@/components/layout/Layout/Layout";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  // اصلاح شده: حذف تایپ React.FormEvent برای سازگاری با فایل .jsx
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // اعتبارسنجی اولیه
    if (!form.name || !form.phone || !form.message) {
      toast.error("لطفاً فیلدهای الزامی (نام، شماره تماس و پیام) را پر کنید");
      return;
    }

    if (!/^09\d{9}$/.test(form.phone)) {
      toast.error("لطفاً یک شماره موبایل معتبر وارد کنید");
      return;
    }

    // در اینجا می‌توانید متد ارسال به API لاراول را فراخوانی کنید
    toast.success("پیام شما با موفقیت دریافت شد. تیم پشتیبانی به زودی با شما تماس می‌گیرند.");
    
    // پاکسازی فرم
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>تماس با ما | محافل قرآنی کودکان</title>
        <meta
          name="description"
          content="تماس با تیم پشتیبانی سامانه محافل قرآنی کودکان ایران"
        />
      </Helmet>
      <Layout>
        {/* هدر */}
        <section className="bg-muted/30 py-12">
          <div className="container text-center">
            <h1 className="text-headline text-foreground mb-4 font-vazir">
              تماس با <span className="text-primary">ما</span>
            </h1>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto font-vazir">
              سوالی دارید؟ ما اینجاییم تا کمک کنیم. از طریق فرم زیر یا اطلاعات تماس با ما در ارتباط باشید.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* اطلاعات تماس */}
              <div className="animate-fade-in-up">
                <h2 className="text-title text-foreground mb-6 font-vazir">اطلاعات تماس</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover-lift">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground font-vazir">تلفن تماس</h3>
                      <p className="text-muted-foreground font-mono" dir="ltr">
                        +98 21 1234 5678
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 font-vazir">
                        شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover-lift">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground font-vazir">ایمیل</h3>
                      <p className="text-muted-foreground">info@quran-kids.ir</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover-lift">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground font-vazir">آدرس</h3>
                      <p className="text-muted-foreground font-vazir">
                        تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲۳
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* فرم تماس */}
              <div className="animate-fade-in-up delay-200">
                <h2 className="text-title text-foreground mb-6 font-vazir">ارسال پیام</h2>
                <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name" className="font-vazir">نام و نام خانوادگی *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="نام شما"
                          className="font-vazir"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="font-vazir">شماره تماس *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                            setForm({ ...form, phone: val });
                          }}
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          dir="ltr"
                          className="text-right"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-vazir">ایمیل</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="example@email.com"
                        dir="ltr"
                        className="text-left"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="font-vazir">پیام شما *</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="پیام خود را بنویسید..."
                        rows={5}
                        className="font-vazir"
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2 gradient-primary border-0 h-12 font-vazir text-lg">
                      <Send className="h-4 w-4" />
                      ارسال پیام
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}