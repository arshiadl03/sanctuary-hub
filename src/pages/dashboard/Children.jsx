import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ChevronLeft, Users, Award } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext.jsx";
import childrenService from "@/services/childrenService.js";
import { Helmet } from "react-helmet-async";


export default function Children() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchChildren();
    }
  }, [user]);

  const fetchChildren = async () => {
    try {
      const data = await childrenService.getChildren({ parent_id: user?.id });
      setChildren(data || []);
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>فرزندان من | داشبورد</title>
      </Helmet>
      <DashboardLayout
        title="فرزندان من"
        description="مدیریت و پیگیری فرزندان خود"
      >
        <div className="flex justify-end mb-6">
          <Link to="/dashboard/children/add">
            <Button className="gap-2 gradient-primary border-0">
              <Plus className="h-4 w-4" />
              افزودن فرزند
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            در حال بارگذاری...
          </div>
        ) : children.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">هنوز فرزندی ثبت نشده</h3>
              <p className="text-muted-foreground mb-6">
                برای شروع استفاده از سامانه، فرزند خود را ثبت کنید
              </p>
              <Link to="/dashboard/children/add">
                <Button className="gap-2 gradient-primary border-0">
                  <Plus className="h-4 w-4" />
                  افزودن فرزند
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => (
              <Card key={child.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {child.first_name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">
                        {child.first_name} {child.last_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">
                          {child.age} ساله
                        </Badge>
                        <Badge variant="outline">
                          {child.gender === "male" ? "پسر" : "دختر"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">امتیاز کل</span>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-secondary" />
                        <span className="font-bold">{child.total_points}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link to={`/dashboard/children/${child.id}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-1">
                        جزئیات
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </Link>
                    {!child.mahfil_id && (
                      <Link to={`/mahafil?enroll=${child.id}`}>
                        <Button className="gap-1 gradient-primary border-0">
                          ثبت در محفل
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
