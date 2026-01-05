import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Star, Save } from "lucide-react";
import type { Tables, Enums } from "@/integrations/supabase/types";

type Child = Tables<"children">;
type EvaluationGrade = Enums<"evaluation_grade">;

const gradeLabels: Record<EvaluationGrade, string> = {
  excellent: "عالی",
  good: "خوب",
  average: "متوسط",
  needs_practice: "نیاز به تمرین",
};

const gradeColors: Record<EvaluationGrade, string> = {
  excellent: "text-green-600",
  good: "text-blue-600",
  average: "text-yellow-600",
  needs_practice: "text-red-600",
};

export default function Evaluations() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [evaluation, setEvaluation] = useState({
    quran_recitation: "" as EvaluationGrade | "",
    quran_memorization: "" as EvaluationGrade | "",
    quran_tajweed: "" as EvaluationGrade | "",
    quran_concepts: "" as EvaluationGrade | "",
    hadith_grade: "" as EvaluationGrade | "",
    nahj_grade: "" as EvaluationGrade | "",
    notes: "",
  });

  useEffect(() => {
    fetchChildren();
  }, [user]);

  const fetchChildren = async () => {
    if (!user) return;

    setIsLoading(true);
    // دریافت کودکان محفل‌هایی که این معلم مسئول آنهاست
    const { data: mahafil } = await supabase
      .from("mahafil")
      .select("id")
      .eq("teacher_id", user.id);

    if (mahafil && mahafil.length > 0) {
      const mahfilIds = mahafil.map((m) => m.id);
      const { data } = await supabase
        .from("children")
        .select("*")
        .in("mahfil_id", mahfilIds);

      if (data) {
        setChildren(data);
      }
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!selectedChild || !user) {
      toast.error("لطفاً یک دانش‌آموز انتخاب کنید");
      return;
    }

    setIsSaving(true);
    try {
      const child = children.find((c) => c.id === selectedChild);
      
      const { error } = await supabase.from("evaluations").insert({
        child_id: selectedChild,
        evaluator_id: user.id,
        mahfil_id: child?.mahfil_id || null,
        quran_recitation: evaluation.quran_recitation || null,
        quran_memorization: evaluation.quran_memorization || null,
        quran_tajweed: evaluation.quran_tajweed || null,
        quran_concepts: evaluation.quran_concepts || null,
        hadith_grade: evaluation.hadith_grade || null,
        nahj_grade: evaluation.nahj_grade || null,
        notes: evaluation.notes || null,
      });

      if (error) throw error;

      toast.success("ارزیابی با موفقیت ثبت شد");
      setEvaluation({
        quran_recitation: "",
        quran_memorization: "",
        quran_tajweed: "",
        quran_concepts: "",
        hadith_grade: "",
        nahj_grade: "",
        notes: "",
      });
    } catch (error) {
      toast.error("خطا در ثبت ارزیابی");
    } finally {
      setIsSaving(false);
    }
  };

  const GradeSelect = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: EvaluationGrade | "";
    onChange: (val: EvaluationGrade) => void;
  }) => (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="انتخاب نمره" />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(gradeLabels) as EvaluationGrade[]).map((grade) => (
            <SelectItem key={grade} value={grade}>
              <span className={gradeColors[grade]}>{gradeLabels[grade]}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>ارزیابی دانش‌آموزان | داشبورد</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ارزیابی دانش‌آموزان</h1>
            <p className="text-muted-foreground mt-1">
              ثبت ارزیابی عملکرد قرآنی دانش‌آموزان
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : children.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  هیچ دانش‌آموزی در محفل شما ثبت نشده است
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* انتخاب دانش‌آموز */}
              <Card>
                <CardHeader>
                  <CardTitle>انتخاب دانش‌آموز</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedChild} onValueChange={setSelectedChild}>
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue placeholder="انتخاب دانش‌آموز" />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.first_name} {child.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* فرم ارزیابی */}
              {selectedChild && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      ثبت ارزیابی
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <GradeSelect
                        label="روخوانی قرآن"
                        value={evaluation.quran_recitation}
                        onChange={(val) =>
                          setEvaluation({ ...evaluation, quran_recitation: val })
                        }
                      />
                      <GradeSelect
                        label="حفظ قرآن"
                        value={evaluation.quran_memorization}
                        onChange={(val) =>
                          setEvaluation({ ...evaluation, quran_memorization: val })
                        }
                      />
                      <GradeSelect
                        label="تجوید"
                        value={evaluation.quran_tajweed}
                        onChange={(val) =>
                          setEvaluation({ ...evaluation, quran_tajweed: val })
                        }
                      />
                      <GradeSelect
                        label="مفاهیم قرآنی"
                        value={evaluation.quran_concepts}
                        onChange={(val) =>
                          setEvaluation({ ...evaluation, quran_concepts: val })
                        }
                      />
                      <GradeSelect
                        label="احادیث"
                        value={evaluation.hadith_grade}
                        onChange={(val) =>
                          setEvaluation({ ...evaluation, hadith_grade: val })
                        }
                      />
                      <GradeSelect
                        label="نهج‌البلاغه"
                        value={evaluation.nahj_grade}
                        onChange={(val) =>
                          setEvaluation({ ...evaluation, nahj_grade: val })
                        }
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">یادداشت</Label>
                      <Textarea
                        value={evaluation.notes}
                        onChange={(e) =>
                          setEvaluation({ ...evaluation, notes: e.target.value })
                        }
                        placeholder="توضیحات اضافی..."
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="gap-2"
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      ثبت ارزیابی
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
