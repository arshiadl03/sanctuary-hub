import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  ChevronRight,
  Save
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext.jsx";
import apiClient from "@/lib/apiClient.js";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";


export default function Attendance() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [mahfilId, setMahfilId] = useState("");
  const [attendance, setAttendance] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sessionDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Get mahfil for this teacher
      // Get mahfil for this teacher
      const mahfilRes = await apiClient.get('/mahfels', { params: { teacher_id: user?.id, limit: 1 } });
      const mahfel = (mahfilRes.data?.data || mahfilRes.data || [])[0];

      if (mahfel) {
        setMahfilId(mahfel.id);

        // Get students in this mahfil
        const studentsRes = await apiClient.get('/children', { params: { mahfil_id: mahfel.id } });
        const studentsData = studentsRes.data?.data || studentsRes.data || [];

        if (studentsData) {
          setStudents(studentsData);

          // Initialize all as present
          const initialAttendance = {};
          studentsData.forEach((s) => {
            initialAttendance[s.id] = true;
          });
          setAttendance(initialAttendance);

          // Check if attendance already recorded for today
          const existingRes = await apiClient.get('/attendance', { params: { mahfil_id: mahfel.id, session_date: sessionDate } });
          const existingAttendance = existingRes.data?.data || existingRes.data || [];

          if (existingAttendance && existingAttendance.length > 0) {
            const recorded = {};
            existingAttendance.forEach((a) => {
              recorded[a.child_id] = a.is_present;
            });
            setAttendance({ ...initialAttendance, ...recorded });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const saveAttendance = async () => {
    if (!mahfilId) return;

    setIsSaving(true);
    try {
      // Delete existing records for today
      await apiClient.delete('/attendance', { params: { mahfil_id: mahfilId, session_date: sessionDate } });

      // Insert new records
      const records = Object.entries(attendance).map(([childId, isPresent]) => ({
        child_id: childId,
        mahfil_id: mahfilId,
        session_date: sessionDate,
        is_present: isPresent,
        points_earned: isPresent ? 5 : 0,
        recorded_by: user?.id,
      }));

      await apiClient.post('/attendance', records);

      // Update points for present students
      for (const [childId, isPresent] of Object.entries(attendance)) {
        if (isPresent) {
          const childRes = await apiClient.get(`/children/${childId}`);
          const child = childRes.data?.data || childRes.data;

          if (child) {
            const newPoints = (child.total_points || 0) + 5;
            await apiClient.put(`/children/${childId}`, { total_points: newPoints });
          }
        }
      }

      toast.success("حضور و غیاب با موفقیت ثبت شد");
    } catch (error) {
      toast.error(error?.message || "خطا در ثبت حضور و غیاب");
    } finally {
      setIsSaving(false);
    }
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = students.length - presentCount;

  return (
    <>
      <Helmet>
        <title>حضور و غیاب | داشبورد استاد</title>
      </Helmet>
      <DashboardLayout
        title="ثبت حضور و غیاب"
        description={`جلسه ${new Date(sessionDate).toLocaleDateString("fa-IR")}`}
      >
        {/* آمار */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-muted-foreground">کل شاگردان</span>
              <span className="text-2xl font-bold">{students.length}</span>
            </CardContent>
          </Card>
          <Card className="border-green-500/30">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-green-600">حاضر</span>
              <span className="text-2xl font-bold text-green-600">{presentCount}</span>
            </CardContent>
          </Card>
          <Card className="border-red-500/30">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-red-600">غایب</span>
              <span className="text-2xl font-bold text-red-600">{absentCount}</span>
            </CardContent>
          </Card>
        </div>

        {/* لیست */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            در حال بارگذاری...
          </div>
        ) : students.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">شاگردی در محفل ثبت نشده است</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-2 mb-8">
              {students.map((student) => (
                <Card
                  key={student.id}
                  className={`cursor-pointer transition-colors ${
                    attendance[student.id]
                      ? "border-green-500/30 bg-green-500/5"
                      : "border-red-500/30 bg-red-500/5"
                  }`}
                  onClick={() => toggleAttendance(student.id)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <Checkbox
                      checked={attendance[student.id]}
                      onCheckedChange={() => toggleAttendance(student.id)}
                    />
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {student.first_name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium flex-1">
                      {student.first_name} {student.last_name}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        attendance[student.id] ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {attendance[student.id] ? "حاضر" : "غایب"}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
                <ChevronRight className="h-4 w-4 ml-2" />
                انصراف
              </Button>
              <Button
                onClick={saveAttendance}
                disabled={isSaving}
                className="flex-1 gap-2 gradient-primary border-0"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "در حال ثبت..." : "ذخیره حضور و غیاب"}
              </Button>
            </div>
          </>
        )}
      </DashboardLayout>
    </>
  );
}
