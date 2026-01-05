import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

export default function AddChild() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "male" as "male" | "female",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.first_name || !form.last_name || !form.age) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    const age = parseInt(form.age);
    if (age < 3 || age > 18) {
      toast.error("سن باید بین ۳ تا ۱۸ سال باشد");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("children").insert({
        parent_id: user?.id,
        first_name: form.first_name,
        last_name: form.last_name,
        age: age,
        gender: form.gender,
      });

      if (error) throw error;

      toast.success("فرزند با موفقیت اضافه شد");
      navigate("/dashboard/children");
    } catch (error: any) {
      toast.error(error.message || "خطا در افزودن فرزند");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>افزودن فرزند | داشبورد</title>
      </Helmet>
      <DashboardLayout title="افزودن فرزند جدید">
        <div className="max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="first_name">نام</Label>
                <Input
                  id="first_name"
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  placeholder="نام فرزند"
                />
              </div>
              <div>
                <Label htmlFor="last_name">نام خانوادگی</Label>
                <Input
                  id="last_name"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  placeholder="نام خانوادگی"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="age">سن</Label>
              <Input
                id="age"
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="سال"
                min={3}
                max={18}
              />
            </div>

            <div>
              <Label>جنسیت</Label>
              <RadioGroup
                value={form.gender}
                onValueChange={(val) => setForm({ ...form, gender: val as "male" | "female" })}
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="font-normal">پسر</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="font-normal">دختر</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                انصراف
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 gap-2 gradient-primary border-0"
              >
                {isSubmitting ? "در حال ثبت..." : "ثبت فرزند"}
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
}
