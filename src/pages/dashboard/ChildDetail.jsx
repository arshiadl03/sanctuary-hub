import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight, Award, Calendar, TrendingUp, Edit, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import childrenService from "@/services/childrenService.js";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

export default function ChildDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchChild();
    }
  }, [id]);

  const fetchChild = async () => {
    try {
      const data = await childrenService.getChildById(id);
      setChild(data);
    } catch (error) {
      toast.error("خطا در دریافت اطلاعات فرزند");
      console.error('Error fetching child:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="در حال بارگذاری...">
        <div className="text-center py-12 text-muted-foreground">
          در حال بارگذاری...
        </div>
      </DashboardLayout>
    );
  }

  if (!child) {
    return (
      <DashboardLayout title="فرزند یافت نشد">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">فرزند مورد نظر یافت نشد</p>
            <Button onClick={() => navigate('/dashboard/children')} variant="outline">
              بازگشت به لیست فرزندان
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{child.first_name} {child.last_name} | جزئیات فرزند</title>
      </Helmet>
      <DashboardLayout
        title={`${child.first_name} ${child.last_name}`}
        description={`${child.age} ساله • ${child.gender === "male" ? "پسر" : "دختر"}`}
      >
        {/* اطلاعات کلی */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                امتیازات کل
              </CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{child.total_points || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                سن
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{child.age}</div>
              <p className="text-xs text-muted-foreground mt-1">سال</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                جنسیت
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="mt-2">
                {child.gender === "male" ? "پسر" : "دختر"}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                وضعیت
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <Badge variant="default" className="mt-2">
                فعال
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* اطلاعات بیشتر */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات شخصی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام:</span>
                <span className="font-medium">{child.first_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام خانوادگی:</span>
                <span className="font-medium">{child.last_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">سن:</span>
                <span className="font-medium">{child.age} سال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">جنسیت:</span>
                <span className="font-medium">{child.gender === "male" ? "پسر" : "دختر"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>آمار و عملکرد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">امتیازات کل:</span>
                <span className="font-medium text-primary">{child.total_points || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">جوایز دریافت شده:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">حضور در جلسات:</span>
                <span className="font-medium">-</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* دکمه‌های عملیات */}
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={() => navigate('/dashboard/children')}>
            <ChevronRight className="h-4 w-4 ml-2" />
            بازگشت به لیست
          </Button>
          <Link to="/dashboard/rewards">
            <Button className="gap-2 gradient-primary border-0">
              <Award className="h-4 w-4" />
              مشاهده جوایز
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    </>
  );
}
