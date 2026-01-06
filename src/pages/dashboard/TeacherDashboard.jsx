import { useEffect, useState } from "react";
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  TrendingUp,
  BookOpen,
  UserCheck,
  UserX
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext.jsx";
import apiClient from "@/lib/apiClient.js";
import { Helmet } from "react-helmet-async";


export default function TeacherDashboard() {
  const { user, profile } = useAuth();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, [user]);

  const fetchStudents = async () => {
    try {
      // Get mahfil IDs for this teacher
      const mahfilRes = await apiClient.get('/mahfels', { params: { teacher_id: user?.id } });
      const mahafil = mahfilRes.data?.data || mahfilRes.data || [];

      if (mahafil && mahafil.length > 0) {
        const mahfilIds = mahafil.map((m) => m.id);
        const studentsRes = await apiClient.get('/children', { params: { mahfil_id: mahfilIds } });
        const studentsData = studentsRes.data?.data || studentsRes.data || [];
        setStudents(studentsData || []);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPoints = students.reduce((sum, s) => sum + (s.total_points || 0), 0);

  return (
    <>
      <Helmet>
        <title>داشبورد استاد | محافل قرآنی</title>
      </Helmet>
      <DashboardLayout
        title={`سلام استاد ${profile?.first_name || ""}`}
        description="مدیریت محفل و شاگردان"
      >
        {/* کارت‌های آماری */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                تعداد شاگردان
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                حضور امروز
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۰</div>
              <p className="text-xs text-muted-foreground">ثبت نشده</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ارزشیابی این ماه
              </CardTitle>
              <ClipboardCheck className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۰</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                مجموع امتیازات
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPoints}</div>
            </CardContent>
          </Card>
        </div>

        {/* دسترسی سریع */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">ثبت حضور و غیاب</h3>
                <p className="text-sm text-muted-foreground">ثبت حضور جلسه امروز</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                <ClipboardCheck className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold">ارزشیابی</h3>
                <p className="text-sm text-muted-foreground">ثبت ارزشیابی شاگردان</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-green-500/10 flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold">ثبت حفظ سوره</h3>
                <p className="text-sm text-muted-foreground">تأیید حفظ سوره‌ها</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* لیست شاگردان */}
        <div>
          <h2 className="text-xl font-bold mb-4">شاگردان محفل</h2>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              در حال بارگذاری...
            </div>
          ) : students.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">هنوز شاگردی ثبت نشده</h3>
                <p className="text-muted-foreground">
                  والدین می‌توانند فرزندان خود را در محفل شما ثبت نام کنند
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                          {student.first_name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {student.first_name} {student.last_name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {student.age} ساله
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {student.total_points} امتیاز
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
