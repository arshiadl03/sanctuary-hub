import { useEffect, useState } from "react";
import { Gift, Lock, CheckCircle, Award } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext.jsx";
import apiClient from "@/lib/apiClient.js";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

// Reward and Child shapes are plain objects returned by the API

export default function Rewards() {
  const { user } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [rewardsRes, childrenRes] = await Promise.all([
        apiClient.get('/rewards', { params: { is_active: true } }),
        apiClient.get('/children', { params: { parent_id: user?.id } }),
      ]);

      const rewardsData = rewardsRes.data?.data || rewardsRes.data || [];
      const childrenData = childrenRes.data?.data || childrenRes.data || [];

      setRewards(rewardsData);
      if (childrenData) {
        setChildren(childrenData);
        if (childrenData.length > 0) setSelectedChild(childrenData[0].id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedChildData = children.find((c) => c.id === selectedChild);
  const currentPoints = selectedChildData?.total_points || 0;

  const handleRedeem = async (reward) => {
    if (!selectedChild) {
      toast.error("لطفاً یک فرزند انتخاب کنید");
      return;
    }

    if (currentPoints < reward.points_required) {
      toast.error("امتیاز کافی نیست");
      return;
    }

    try {
      // ثبت جایزه
      await apiClient.post('/child_rewards', { child_id: selectedChild, reward_id: reward.id });

      // کاهش امتیاز
      await apiClient.put(`/children/${selectedChild}`, { total_points: currentPoints - reward.points_required });

      toast.success(`جایزه "${reward.name}" با موفقیت دریافت شد!`);
      fetchData();
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت جایزه");
    }
  };

  return (
    <>
      <Helmet>
        <title>جوایز | داشبورد</title>
      </Helmet>
      <DashboardLayout
        title="جوایز"
        description="جوایز قابل دریافت با امتیازات کسب شده"
      >
        {/* انتخاب فرزند */}
        {children.length > 0 && (
          <div className="mb-8 p-4 rounded-xl bg-muted/50 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">انتخاب فرزند:</span>
            <div className="flex flex-wrap gap-2">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChild === child.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  {child.first_name}
                </button>
              ))}
            </div>
            {selectedChildData && (
              <div className="flex items-center gap-2 mr-auto">
                <Award className="h-5 w-5 text-secondary" />
                <span className="font-bold text-lg">{currentPoints}</span>
                <span className="text-sm text-muted-foreground">امتیاز</span>
              </div>
            )}
          </div>
        )}

        {/* لیست جوایز */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            در حال بارگذاری...
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward) => {
              const canRedeem = currentPoints >= reward.points_required;
              const progressPercent = Math.min(
                (currentPoints / reward.points_required) * 100,
                100
              );

              return (
                <Card
                  key={reward.id}
                  className={`relative overflow-hidden ${!canRedeem ? "opacity-75" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                        <Gift className="h-6 w-6 text-secondary" />
                      </div>
                      {canRedeem ? (
                        <Badge className="bg-green-500 text-white">قابل دریافت</Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Lock className="h-3 w-3 ml-1" />
                          قفل
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-4">{reward.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {reward.description}
                    </p>

                    {/* نوار پیشرفت */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{currentPoints} امتیاز</span>
                        <span>{reward.points_required} امتیاز</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            canRedeem ? "bg-green-500" : "bg-primary"
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => handleRedeem(reward)}
                      disabled={!canRedeem || !selectedChild}
                      className={`w-full ${canRedeem ? "gradient-primary border-0" : ""}`}
                    >
                      {canRedeem ? (
                        <>
                          <CheckCircle className="h-4 w-4 ml-2" />
                          دریافت جایزه
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 ml-2" />
                          {reward.points_required - currentPoints} امتیاز دیگر
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
