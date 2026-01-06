import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Award, Calendar, TrendingUp, Plus, ChevronLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext.jsx";
import apiClient from "@/lib/apiClient.js";
import { Helmet } from "react-helmet-async";


export default function Dashboard() {
  const { user, profile, roles } = useAuth();
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isTeacher = (roles || []).includes("teacher") || (roles || []).includes("assistant");
  const isAdmin = (roles || []).includes("admin");

  useEffect(() => {
    if (user && !isTeacher && !isAdmin) {
      fetchChildren();
    } else {
      setIsLoading(false);
    }
  }, [user, isTeacher, isAdmin]);

  const fetchChildren = async () => {
    try {
      const res = await apiClient.get('/children', { params: { parent_id: user?.id } });
      const data = res.data?.data || res.data || [];
      setChildren(data || []);
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPoints = children.reduce((sum, child) => sum + (child.total_points || 0), 0);

  return (
    <>
      <Helmet>
        <title>داشبورد | محافل قرآنی کودکان</title>
      </Helmet>
      <DashboardLayout
        title={`سلام ${profile?.first_name || "کاربر"} عزیز`}
        description="به داشبورد محافل قرآنی خوش آمدید"
      >
        {/* کارت‌های آماری */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                تعداد فرزندان
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{children.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                مجموع امتیازات
              </CardTitle>
              <Award className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPoints}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                جلسات این ماه
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۱۲</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                پیشرفت کلی
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۷۵٪</div>
            </CardContent>
          </Card>
        </div>

        {/* لیست فرزندان */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">فرزندان من</h2>
            <Link to="/dashboard/children/add">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                افزودن فرزند
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              در حال بارگذاری...
            </div>
          ) : children.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">هنوز فرزندی ثبت نشده</h3>
                <p className="text-muted-foreground mb-4">
                  برای شروع، اولین فرزند خود را ثبت کنید
                </p>
                <Link to="/dashboard/children/add">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    افزودن فرزند
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child) => (
                <Card key={child.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {child.first_name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">
                          {child.first_name} {child.last_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {child.age} ساله • {child.gender === "male" ? "پسر" : "دختر"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Award className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-medium">
                            {child.total_points} امتیاز
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-end">
                      <Link to={`/dashboard/children/${child.id}`}>
                        <Button size="sm" variant="ghost" className="gap-1">
                          مشاهده جزئیات
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                      </Link>
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
