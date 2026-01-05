import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, Plus, X, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { iranProvinces, getProvinceCities } from "@/data/iranProvinces";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ChildForm {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: "male" | "female";
}

export default function Register() {
  const [searchParams] = useSearchParams();
  const mahfilId = searchParams.get("mahfil");
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // اطلاعات والد
  const [parentForm, setParentForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    provinceId: "",
    cityId: "",
  });

  // اطلاعات فرزندان
  const [children, setChildren] = useState<ChildForm[]>([
    { id: "1", firstName: "", lastName: "", age: "", gender: "male" },
  ]);

  const cities = parentForm.provinceId ? getProvinceCities(parentForm.provinceId) : [];

  const addChild = () => {
    setChildren([
      ...children,
      { id: Date.now().toString(), firstName: "", lastName: "", age: "", gender: "male" },
    ]);
  };

  const removeChild = (id: string) => {
    if (children.length > 1) {
      setChildren(children.filter((c) => c.id !== id));
    }
  };

  const updateChild = (id: string, field: keyof ChildForm, value: string) => {
    setChildren(
      children.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  const validateStep1 = () => {
    if (!parentForm.firstName || !parentForm.lastName) {
      toast.error("لطفاً نام و نام خانوادگی را وارد کنید");
      return false;
    }
    if (!parentForm.phone || parentForm.phone.length !== 11) {
      toast.error("لطفاً شماره موبایل ۱۱ رقمی وارد کنید");
      return false;
    }
    if (!parentForm.password || parentForm.password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return false;
    }
    if (parentForm.password !== parentForm.confirmPassword) {
      toast.error("رمز عبور و تکرار آن مطابقت ندارند");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!parentForm.provinceId || !parentForm.cityId) {
      toast.error("لطفاً استان و شهر را انتخاب کنید");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    for (const child of children) {
      if (!child.firstName || !child.lastName) {
        toast.error("لطفاً نام و نام خانوادگی فرزند را وارد کنید");
        return false;
      }
      if (!child.age || parseInt(child.age) < 3 || parseInt(child.age) > 18) {
        toast.error("سن فرزند باید بین ۳ تا ۱۸ سال باشد");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsLoading(true);
    try {
      // ایجاد ایمیل از شماره موبایل
      const email = `${parentForm.phone}@quran-kids.ir`;

      const { error } = await signUp(email, parentForm.password, {
        first_name: parentForm.firstName,
        last_name: parentForm.lastName,
        phone: parentForm.phone,
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error("این شماره موبایل قبلاً ثبت شده است");
        } else {
          toast.error("خطا در ثبت نام: " + error.message);
        }
        return;
      }

      // صبر برای ایجاد پروفایل
      await new Promise(resolve => setTimeout(resolve, 1000));

      // دریافت کاربر جدید
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // بروزرسانی پروفایل با اطلاعات مکانی
        await supabase
          .from("profiles")
          .update({
            province_id: parentForm.provinceId,
            city_id: parentForm.cityId,
          })
          .eq("id", user.id);

        // ثبت فرزندان
        for (const child of children) {
          await supabase.from("children").insert({
            parent_id: user.id,
            first_name: child.firstName,
            last_name: child.lastName,
            age: parseInt(child.age),
            gender: child.gender,
            mahfil_id: mahfilId || null,
          });
        }
      }

      toast.success("ثبت نام با موفقیت انجام شد!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("خطایی رخ داد");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <Helmet>
        <title>ثبت نام | محافل قرآنی کودکان</title>
        <meta name="description" content="ثبت نام در سامانه محافل قرآنی کودکان ایران" />
      </Helmet>
      <Layout showFooter={false}>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-lg">
            {/* مراحل */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      s === step
                        ? "bg-primary text-primary-foreground"
                        : s < step
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 rounded-full ${
                        s < step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* محفل لینک شده */}
            {mahfilId && (
              <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">ثبت نام در محفل:</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">محفل انتخابی</span>
                  <Badge variant="secondary">انتخاب شده</Badge>
                </div>
              </div>
            )}

            {/* فرم */}
            <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
              {/* مرحله ۱: اطلاعات والد */}
              {step === 1 && (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-6">اطلاعات والد</h2>
                  <div className="space-y-4">
                    <div className="grid gap-4 grid-cols-2">
                      <div>
                        <Label>نام</Label>
                        <Input
                          value={parentForm.firstName}
                          onChange={(e) =>
                            setParentForm({ ...parentForm, firstName: e.target.value })
                          }
                          placeholder="نام"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label>نام خانوادگی</Label>
                        <Input
                          value={parentForm.lastName}
                          onChange={(e) =>
                            setParentForm({ ...parentForm, lastName: e.target.value })
                          }
                          placeholder="نام خانوادگی"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>شماره موبایل</Label>
                      <div className="relative">
                        <Input
                          type="tel"
                          value={parentForm.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                            setParentForm({ ...parentForm, phone: val });
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
                      <Label>ایمیل (اختیاری)</Label>
                      <Input
                        type="email"
                        value={parentForm.email}
                        onChange={(e) =>
                          setParentForm({ ...parentForm, email: e.target.value })
                        }
                        placeholder="example@email.com"
                        dir="ltr"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label>رمز عبور</Label>
                      <Input
                        type="password"
                        value={parentForm.password}
                        onChange={(e) =>
                          setParentForm({ ...parentForm, password: e.target.value })
                        }
                        placeholder="حداقل ۶ کاراکتر"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label>تکرار رمز عبور</Label>
                      <Input
                        type="password"
                        value={parentForm.confirmPassword}
                        onChange={(e) =>
                          setParentForm({ ...parentForm, confirmPassword: e.target.value })
                        }
                        placeholder="تکرار رمز عبور"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* مرحله ۲: موقعیت مکانی */}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-6">موقعیت مکانی</h2>
                  <div className="space-y-4">
                    <div>
                      <Label>استان</Label>
                      <Select
                        value={parentForm.provinceId}
                        onValueChange={(val) =>
                          setParentForm({ ...parentForm, provinceId: val, cityId: "" })
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب استان" />
                        </SelectTrigger>
                        <SelectContent>
                          {iranProvinces.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>شهر</Label>
                      <Select
                        value={parentForm.cityId}
                        onValueChange={(val) =>
                          setParentForm({ ...parentForm, cityId: val })
                        }
                        disabled={!parentForm.provinceId || isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب شهر" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* مرحله ۳: اطلاعات فرزندان */}
              {step === 3 && (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-2">اطلاعات فرزندان</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    چند فرزند دارید؟ اطلاعات هر یک را وارد کنید
                  </p>
                  <div className="space-y-6">
                    {children.map((child, index) => (
                      <div
                        key={child.id}
                        className="p-4 rounded-xl bg-muted/50 border border-border"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-medium">فرزند {index + 1}</span>
                          {children.length > 1 && (
                            <button
                              onClick={() => removeChild(child.id)}
                              className="text-destructive hover:text-destructive/80"
                              disabled={isLoading}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div className="grid gap-4 grid-cols-2">
                            <div>
                              <Label>نام</Label>
                              <Input
                                value={child.firstName}
                                onChange={(e) =>
                                  updateChild(child.id, "firstName", e.target.value)
                                }
                                placeholder="نام فرزند"
                                disabled={isLoading}
                              />
                            </div>
                            <div>
                              <Label>نام خانوادگی</Label>
                              <Input
                                value={child.lastName}
                                onChange={(e) =>
                                  updateChild(child.id, "lastName", e.target.value)
                                }
                                placeholder="نام خانوادگی"
                                disabled={isLoading}
                              />
                            </div>
                          </div>
                          <div className="grid gap-4 grid-cols-2">
                            <div>
                              <Label>سن</Label>
                              <Input
                                type="number"
                                value={child.age}
                                onChange={(e) =>
                                  updateChild(child.id, "age", e.target.value)
                                }
                                placeholder="سال"
                                min={3}
                                max={18}
                                disabled={isLoading}
                              />
                            </div>
                            <div>
                              <Label>جنسیت</Label>
                              <RadioGroup
                                value={child.gender}
                                onValueChange={(val) =>
                                  updateChild(child.id, "gender", val)
                                }
                                className="flex gap-4 mt-2"
                                disabled={isLoading}
                              >
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="male" id={`male-${child.id}`} />
                                  <Label htmlFor={`male-${child.id}`}>پسر</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="female" id={`female-${child.id}`} />
                                  <Label htmlFor={`female-${child.id}`}>دختر</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addChild}
                      className="w-full gap-2"
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4" />
                      افزودن فرزند
                    </Button>
                  </div>
                </>
              )}

              {/* دکمه‌ها */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1 gap-2" disabled={isLoading}>
                    <ChevronRight className="h-4 w-4" />
                    قبلی
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 gap-2 gradient-primary border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      در حال ثبت نام...
                    </>
                  ) : step === 3 ? (
                    "ثبت نام"
                  ) : (
                    <>
                      بعدی
                      <ChevronLeft className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* لینک ورود */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                قبلاً ثبت نام کرده‌اید؟{" "}
                <Link to="/auth" className="text-primary hover:underline font-medium">
                  ورود به حساب
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
