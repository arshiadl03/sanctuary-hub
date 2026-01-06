import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient.js";
import { Loader2, Plus, Pencil, Trash2, MapPin, Users } from "lucide-react";
const statusLabels = {
  active: "فعال",
  inactive: "غیرفعال",
  upcoming: "در انتظار",
};

const genderLabels = {
  boys: "پسرانه",
  girls: "دخترانه",
  mixed: "مختلط",
};

export default function ManageMahafil() {
  const [mahafil, setMahafil] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingMahfil, setEditingMahfil] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    province_id: "",
    city_id: "",
    address: "",
    gender: "mixed",
    age_min: "5",
    age_max: "15",
    capacity: "30",
    status: "active",
  });

  const cities = form.province_id ? getProvinceCities(form.province_id) : [];

  useEffect(() => {
    fetchMahafil();
  }, []);

  const fetchMahafil = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/mahfels');
      const data = res.data?.data || res.data || [];
      setMahafil(data);
    } catch (err) {
      console.error('Error fetching mahfels:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      province_id: "",
      city_id: "",
      address: "",
      gender: "mixed",
      age_min: "5",
      age_max: "15",
      capacity: "30",
      status: "active",
    });
    setEditingMahfil(null);
  };

  const openEditDialog = (mahfil: Mahfil) => {
    setEditingMahfil(mahfil);
    setForm({
      name: mahfil.name,
      description: mahfil.description || "",
      province_id: mahfil.province_id,
      city_id: mahfil.city_id,
      address: mahfil.address || "",
      gender: mahfil.gender || "mixed",
      age_min: String(mahfil.age_min || 5),
      age_max: String(mahfil.age_max || 15),
      capacity: String(mahfil.capacity || 30),
      status: mahfil.status || "active",
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.province_id || !form.city_id) {
      toast.error("لطفاً نام، استان و شهر را وارد کنید");
      return;
    }

    setIsSaving(true);
    try {
      const mahfilData = {
        name: form.name,
        description: form.description || null,
        province_id: form.province_id,
        city_id: form.city_id,
        address: form.address || null,
        gender: form.gender,
        age_min: parseInt(form.age_min),
        age_max: parseInt(form.age_max),
        capacity: parseInt(form.capacity),
        status: form.status,
      };

      if (editingMahfil) {
        await apiClient.put(`/mahfels/${editingMahfil.id}`, mahfilData);
        toast.success("محفل با موفقیت ویرایش شد");
      } else {
        await apiClient.post('/mahfels', mahfilData);
        toast.success("محفل با موفقیت ایجاد شد");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchMahafil();
    } catch (error) {
      toast.error("خطا در ذخیره محفل");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف این محفل اطمینان دارید؟")) return;
    try {
      await apiClient.delete(`/mahfels/${id}`);
      toast.success('محفل حذف شد');
      fetchMahafil();
    } catch (err) {
      toast.error('خطا در حذف محفل');
    }
  };

  return (
    <>
      <Helmet>
        <title>مدیریت محافل | داشبورد ادمین</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">مدیریت محافل</h1>
              <p className="text-muted-foreground mt-1">
                ایجاد، ویرایش و مدیریت محافل قرآنی
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  محفل جدید
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingMahfil ? "ویرایش محفل" : "ایجاد محفل جدید"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>نام محفل</Label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="نام محفل"
                    />
                  </div>
                  <div>
                    <Label>توضیحات</Label>
                    <Textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="توضیحات محفل..."
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>استان</Label>
                      <Select
                        value={form.province_id}
                        onValueChange={(val) => setForm({ ...form, province_id: val, city_id: "" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب استان" />
                        </SelectTrigger>
                        <SelectContent>
                          {iranProvinces.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>شهر</Label>
                      <Select
                        value={form.city_id}
                        onValueChange={(val) => setForm({ ...form, city_id: val })}
                        disabled={!form.province_id}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب شهر" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>آدرس</Label>
                    <Input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="آدرس کامل"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>جنسیت</Label>
                      <Select
                        value={form.gender}
                        onValueChange={(val) => setForm({ ...form, gender: val as MahfilGender })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="boys">پسرانه</SelectItem>
                          <SelectItem value="girls">دخترانه</SelectItem>
                          <SelectItem value="mixed">مختلط</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>حداقل سن</Label>
                      <Input
                        type="number"
                        value={form.age_min}
                        onChange={(e) => setForm({ ...form, age_min: e.target.value })}
                        min={3}
                        max={18}
                      />
                    </div>
                    <div>
                      <Label>حداکثر سن</Label>
                      <Input
                        type="number"
                        value={form.age_max}
                        onChange={(e) => setForm({ ...form, age_max: e.target.value })}
                        min={3}
                        max={18}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>ظرفیت</Label>
                      <Input
                        type="number"
                        value={form.capacity}
                        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                        min={1}
                      />
                    </div>
                    <div>
                      <Label>وضعیت</Label>
                      <Select
                        value={form.status}
                        onValueChange={(val) => setForm({ ...form, status: val as MahfilStatus })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">فعال</SelectItem>
                          <SelectItem value="inactive">غیرفعال</SelectItem>
                          <SelectItem value="upcoming">در انتظار</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      انصراف
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
                      {editingMahfil ? "ذخیره تغییرات" : "ایجاد محفل"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : mahafil.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">هنوز محفلی ایجاد نشده است</p>
                <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  ایجاد اولین محفل
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mahafil.map((mahfil) => (
                <Card key={mahfil.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{mahfil.name}</CardTitle>
                      <Badge
                        variant={mahfil.status === "active" ? "default" : "secondary"}
                      >
                        {statusLabels[mahfil.status || "active"]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {mahfil.description || "بدون توضیحات"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {getProvinceName(mahfil.province_id)}، {getCityName(mahfil.province_id, mahfil.city_id)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        ظرفیت: {mahfil.capacity}
                      </span>
                      <span>{genderLabels[mahfil.gender || "mixed"]}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(mahfil)}
                        className="flex-1 gap-1"
                      >
                        <Pencil className="h-3 w-3" />
                        ویرایش
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(mahfil.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
