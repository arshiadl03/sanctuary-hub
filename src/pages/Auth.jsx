import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext.jsx";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // اصلاح شده: حذف React.FormEvent (تایپ‌اسکریپت)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.phone) {
      toast.error("لطفاً شماره موبایل وارد کنید");
      return;
    }
    
    if (!/^09\d{9}$/.test(form.phone)) {
      toast.error("لطفاً شماره موبایل معتبر وارد کنید");
      return;
    }
    
    if (!form.password) {
      toast.error("لطفاً رمز عبور وارد کنید");
      return;
    }

    setIsLoading(true);
    try {
      // این بخش با apiClient.js شما و لاراول هماهنگ است
      const response = await signIn(form.phone, form.password);
      
      // اگر در پاسخ خطایی بود (هماهنگ با لاجیک apiClient)
      if (response?.error) {
        toast.error(response.error.message || "اطلاعات ورود صحیح نیست");
      } else {
        toast.success("ورود موفقیت‌آمیز!");
        navigate("/dashboard");
      }
    } catch (err) {
      // مدیریت خطاهای اعتبارسنجی لاراول (422)
      if (err.validation) {
        const firstError = Object.values(err.validation)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : "خطا در ورود");
      } else {
        toast.error("شماره موبایل یا رمز عبور اشتباه است");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>ورود | محافل قرآنی کودکان</title>
      </Helmet>
      <Layout showFooter={false}>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary shadow-soft mb-4">
                <BookOpen className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground font-vazir">خوش آمدید</h1>
              <p className="text-muted-foreground mt-2 font-vazir">
                برای ادامه وارد حساب کاربری خود شوید
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card border border-border shadow-card"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">شماره موبایل</Label>
                  <div className="relative mt-1">
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                        setForm({ ...form, phone: val });
                      }}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="pl-16 text-right"
                      dir="ltr"
                      disabled={isLoading}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      +98
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">رمز عبور</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="رمز عبور"
                      className="pl-10 text-right"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 mt-6 gradient-primary border-0 shadow-soft text-lg font-vazir"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin ml-2" />
                ) : (
                  "ورود به حساب"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6 font-vazir">
                حساب کاربری ندارید؟{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  ثبت نام کنید
                </Link>
              </p>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}