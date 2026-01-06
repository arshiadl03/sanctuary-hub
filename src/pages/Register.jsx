import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { Check, ChevronLeft, ChevronRight, Plus, X, Loader2 } from "lucide-react";
import authService from '@/services/authService.js';
import cityService from '@/services/cityService.js';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { iranProvinces } from "@/data/iranProvinces.js";

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mahfilId = searchParams.get("mahfilId");

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [cities, setCities] = useState([]);

  // ۱. اطلاعات والد
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

  // ۲. اطلاعات فرزندان
  const [children, setChildren] = useState([
    { id: Date.now().toString(), firstName: "", lastName: "", age: "", gender: "male" },
  ]);

  // دریافت شهرها بر اساس استان انتخاب شده
  useEffect(() => {
    if (parentForm.provinceId) {
      cityService.getCitiesByProvince(parentForm.provinceId)
        .then(setCities)
        .catch(() => setCities([]));
    }
  }, [parentForm.provinceId]);

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) handleSubmit();
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const validateStep1 = () => {
    if (!parentForm.firstName || !parentForm.lastName) {
      toast.error("لطفاً نام و نام خانوادگی را وارد کنید");
      return false;
    }
    if (!/^09\d{9}$/.test(parentForm.phone)) {
      toast.error("شماره موبایل ۱۱ رقمی معتبر وارد کنید");
      return false;
    }
    if (parentForm.password.length < 6) {
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
      if (!child.firstName || !child.lastName || !child.age) {
        toast.error("اطلاعات تمام فرزندان را کامل کنید");
        return false;
      }
    }
    return true;
  };

  const addChild = () => {
    setChildren([...children, { id: Date.now().toString(), firstName: "", lastName: "", age: "", gender: "male" }]);
  };

  const removeChild = (id) => {
    if (children.length > 1) setChildren(children.filter(c => c.id !== id));
  };

  const updateChild = (id, field, value) => {
    setChildren(children.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name: parentForm.firstName,
        family: parentForm.lastName,
        mobile: parentForm.phone,
        email: parentForm.email,
        password: parentForm.password,
        city_id: parentForm.cityId,
        gender: parentForm.gender || "male",
        children: children.map(child => ({
          first_name: child.firstName,
          last_name: child.lastName,
          age: parseInt(child.age),
          gender: child.gender
        })),
        mahfil_id: mahfilId || null
      };
      const result = await authService.register(payload);
      if (result?.error) {
        toast.error(result.error.message || 'ثبت‌نام ناموفق بود');
      } else {
        toast.success('ثبت‌نام با موفقیت انجام شد');
        navigate('/auth');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'خطا در برقراری ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showFooter={false}>
      <Helmet><title>ثبت نام | محافل قرآنی</title></Helmet>
      
      <div className="min-h-screen flex items-center justify-center py-12 px-4 font-vazir">
        <div className="w-full max-w-lg">
          
          {/* نمایش مراحل (Stepper) */}
          <div className="flex items-center justify-center gap-2 mb-8" dir="rtl">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  s <= step ? "bg-primary border-primary text-white" : "bg-muted border-muted text-muted-foreground"
                }`}>
                  {s < step ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-1 ${s < step ? "bg-primary" : "bg-muted"}`} />}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-xl font-bold mb-6">اطلاعات والد</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>نام</Label>
                    <Input value={parentForm.firstName} onChange={e => setParentForm({...parentForm, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>نام خانوادگی</Label>
                    <Input value={parentForm.lastName} onChange={e => setParentForm({...parentForm, lastName: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>شماره موبایل</Label>
                  <Input type="tel" placeholder="09123456789" value={parentForm.phone} onChange={e => setParentForm({...parentForm, phone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>رمز عبور</Label>
                  <Input type="password" value={parentForm.password} onChange={e => setParentForm({...parentForm, password: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>تکرار رمز عبور</Label>
                  <Input type="password" value={parentForm.confirmPassword} onChange={e => setParentForm({...parentForm, confirmPassword: e.target.value})} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl font-bold">موقعیت مکانی</h2>
                <div className="space-y-2">
                  <Label>استان</Label>
                  <Select onValueChange={(val) => setParentForm({...parentForm, provinceId: val, cityId: ""})}>
                    <SelectTrigger><SelectValue placeholder="انتخاب استان" /></SelectTrigger>
                    <SelectContent>
                      {iranProvinces.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>شهر</Label>
                  <Select onValueChange={(val) => setParentForm({...parentForm, cityId: val})} disabled={!parentForm.provinceId}>
                    <SelectTrigger><SelectValue placeholder="انتخاب شهر" /></SelectTrigger>
                    <SelectContent>
                      {cities.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl font-bold">اطلاعات فرزندان</h2>
                {children.map((child, index) => (
                  <div key={child.id} className="p-4 bg-muted/30 rounded-lg border relative">
                    {children.length > 1 && (
                      <Button variant="ghost" size="icon" className="absolute left-2 top-2 text-destructive" onClick={() => removeChild(child.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <p className="text-sm font-bold mb-4">فرزند {index + 1}</p>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Input placeholder="نام" value={child.firstName} onChange={e => updateChild(child.id, 'firstName', e.target.value)} />
                      <Input placeholder="نام خانوادگی" value={child.lastName} onChange={e => updateChild(child.id, 'lastName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input type="number" placeholder="سن" value={child.age} onChange={e => updateChild(child.id, 'age', e.target.value)} />
                      <RadioGroup value={child.gender} onValueChange={val => updateChild(child.id, 'gender', val)} className="flex gap-2">
                        <div className="flex items-center space-x-1 space-x-reverse"><RadioGroupItem value="male" id={`m-${child.id}`} /><Label htmlFor={`m-${child.id}`}>پسر</Label></div>
                        <div className="flex items-center space-x-1 space-x-reverse"><RadioGroupItem value="female" id={`f-${child.id}`} /><Label htmlFor={`f-${child.id}`}>دختر</Label></div>
                      </RadioGroup>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-dashed" onClick={addChild}><Plus className="ml-2 h-4 w-4" /> افزودن فرزند دیگر</Button>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button variant="outline" className="flex-1" onClick={handleBack} disabled={isLoading}>
                  <ChevronRight className="ml-2 h-4 w-4" /> قبلی
                </Button>
              )}
              <Button className="flex-1 gradient-primary" onClick={handleNext} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : (step === 3 ? "تایید نهایی" : "بعدی")}
                {step < 3 && <ChevronLeft className="mr-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}