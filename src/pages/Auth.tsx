import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || form.phone.length !== 11) {
      toast.error("لطفاً شماره موبایل ۱۱ رقمی وارد کنید");
      return;
    }
    if (!form.password || form.password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(form.phone, form.password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("شماره موبایل یا رمز عبور اشتباه است");
        } else {
          toast.error("خطا در ورود: " + error.message);
        }
      } else {
        toast.success("ورود موفقیت‌آمیز!");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("خطایی رخ داد");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>ورود | محافل قرآنی کودکان</title>
        <meta name="description" content="ورود به سامانه محافل قرآنی کودکان ایران" />
      </Helmet>
      <Layout showFooter={false}>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">
            {/* لوگو */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary shadow-soft mb-4">
                <BookOpen className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">خوش آمدید</h1>
              <p className="text-muted-foreground mt-2">
                برای ادامه وارد حساب کاربری خود شوید
              </p>
            </div>

            {/* فرم */}
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
                      className="pl-16"
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
                      className="pl-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-input" />
                    <span>مرا به خاطر بسپار</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    فراموشی رمز عبور
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 mt-6 gradient-primary border-0 shadow-soft text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin ml-2" />
                    در حال ورود...
                  </>
                ) : (
                  "ورود"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6">
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
