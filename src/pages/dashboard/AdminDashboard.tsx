import { useEffect, useState } from "react";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  Settings,
  BarChart3
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMahafil: 0,
    totalChildren: 0,
    totalRewards: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [profilesRes, mahafilRes, childrenRes, rewardsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("mahafil").select("id", { count: "exact", head: true }),
        supabase.from("children").select("id", { count: "exact", head: true }),
        supabase.from("rewards").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        totalUsers: profilesRes.count || 0,
        totalMahafil: mahafilRes.count || 0,
        totalChildren: childrenRes.count || 0,
        totalRewards: rewardsRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>پنل مدیریت | محافل قرآنی</title>
      </Helmet>
      <DashboardLayout
        title={`پنل مدیریت`}
        description="مدیریت کل سامانه محافل قرآنی"
      >
        {/* کارت‌های آماری */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                کاربران
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : stats.totalUsers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                محافل فعال
              </CardTitle>
              <BookOpen className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : stats.totalMahafil}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                کودکان ثبت‌شده
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : stats.totalChildren}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                جوایز تعریف‌شده
              </CardTitle>
              <Award className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : stats.totalRewards}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* دسترسی سریع */}
        <h2 className="text-xl font-bold mb-4">دسترسی سریع</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/dashboard/mahafil">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">مدیریت محافل</h3>
                  <p className="text-sm text-muted-foreground">افزودن و ویرایش محافل</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/users">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold">مدیریت کاربران</h3>
                  <p className="text-sm text-muted-foreground">مدیریت نقش‌ها و دسترسی‌ها</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/rewards-manage">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Award className="h-7 w-7 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold">مدیریت جوایز</h3>
                  <p className="text-sm text-muted-foreground">تعریف و ویرایش جوایز</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/reports">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <BarChart3 className="h-7 w-7 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold">گزارش‌ها</h3>
                  <p className="text-sm text-muted-foreground">آمار و تحلیل عملکرد</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/settings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gray-500/10 flex items-center justify-center">
                  <Settings className="h-7 w-7 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-bold">تنظیمات</h3>
                  <p className="text-sm text-muted-foreground">تنظیمات سامانه</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DashboardLayout>
    </>
  );
}
