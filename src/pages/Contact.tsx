import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("لطفاً فیلدهای الزامی را پر کنید");
      return;
    }
    toast.success("پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.");
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
            <h1 className="text-headline text-foreground mb-4">
              تماس با <span className="text-primary">ما</span>
            </h1>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              سوالی دارید؟ ما اینجاییم تا کمک کنیم. از طریق فرم زیر یا اطلاعات تماس با ما در ارتباط باشید.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* اطلاعات تماس */}
              <div>
                <h2 className="text-title text-foreground mb-6">اطلاعات تماس</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">تلفن تماس</h3>
                      <p className="text-muted-foreground font-mono" dir="ltr">
                        +98 21 1234 5678
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">ایمیل</h3>
                      <p className="text-muted-foreground">info@quran-kids.ir</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        پاسخگویی در کمتر از ۲۴ ساعت
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">آدرس</h3>
                      <p className="text-muted-foreground">
                        تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲۳
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">ساعات کاری</h3>
                      <p className="text-muted-foreground">
                        شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر
                      </p>
                      <p className="text-muted-foreground">
                        پنجشنبه: ۹ صبح تا ۱ بعدازظهر
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* فرم تماس */}
              <div>
                <h2 className="text-title text-foreground mb-6">ارسال پیام</h2>
                <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">نام و نام خانوادگی *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="نام شما"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">شماره تماس *</Label>
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
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">ایمیل</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="example@email.com"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">موضوع</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="موضوع پیام"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">پیام *</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="پیام خود را بنویسید..."
                        rows={5}
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2 gradient-primary border-0 h-12">
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
