import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, MapPin, ChevronLeft, X, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
import apiClient from "@/lib/apiClient.js";

// داده‌های کمکی برای استان‌ها (اگر از API نمی‌آیند)
const iranProvinces = [
  { id: "tehran", name: "تهران" },
  { id: "razavi", name: "خراسان رضوی" },
  { id: "isfahan", name: "اصفهان" },
  { id: "fars", name: "فارس" },
  // سایر استان‌ها را می‌توانید اینجا اضافه کنید
];

const getProvinceName = (id) => iranProvinces.find(p => p.id === id)?.name || id;

export default function Mahafil() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [mahafil, setMahafil] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMahafil();
  }, []);

  const fetchMahafil = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/mahfels', { params: { status: 'active' } });
      const data = res.data?.data || res.data || [];
      setMahafil(data);
    } catch (err) {
      console.error('Error fetching mahfels:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filters = useMemo(() => {
    // اصلاح شده: حذف تایپ‌اسکریپت (Array Type)
    const active = [];
    if (selectedProvince) {
      active.push({ key: "province", label: getProvinceName(selectedProvince) });
    }
    if (selectedGender) {
      active.push({
        key: "gender",
        label: selectedGender === "boys" ? "پسرانه" : selectedGender === "girls" ? "دخترانه" : "مختلط",
      });
    }
    return active;
  }, [selectedProvince, selectedGender]);

  const filteredMahafil = useMemo(() => {
    return mahafil.filter((m) => {
      const nameMatch = m.name?.includes(searchQuery);
      const descMatch = m.description?.includes(searchQuery);
      
      if (searchQuery && !nameMatch && !descMatch) {
        return false;
      }
      if (selectedProvince && m.province_id !== selectedProvince) {
        return false;
      }
      if (selectedGender && m.gender !== selectedGender) {
        return false;
      }
      return true;
    });
  }, [mahafil, searchQuery, selectedProvince, selectedGender]);

  // اصلاح شده: حذف تایپ : string
  const clearFilter = (key) => {
    if (key === "province") setSelectedProvince("");
    if (key === "gender") setSelectedGender("");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedProvince("");
    setSelectedGender("");
  };

  return (
    <>
      <Helmet>
        <title>محافل قرآنی | جستجو و ثبت نام</title>
      </Helmet>
      <Layout>
        <section className="bg-muted/30 py-12">
          <div className="container">
            <h1 className="text-headline text-foreground mb-4 font-vazir">
              محافل <span className="text-primary">قرآنی</span>
            </h1>
            <p className="text-body text-muted-foreground mb-8 max-w-2xl font-vazir">
              محفل قرآنی مناسب برای فرزند خود را پیدا کنید و او را در مسیر حفظ قرآن کریم همراهی کنید
            </p>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="جستجو در محافل..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-12 rounded-xl bg-card font-vazir"
                />
              </div>
              <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl bg-card font-vazir">
                  <SelectValue placeholder="انتخاب استان" />
                </SelectTrigger>
                <SelectContent className="font-vazir">
                  {iranProvinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-full lg:w-40 h-12 rounded-xl bg-card font-vazir">
                  <SelectValue placeholder="جنسیت" />
                </SelectTrigger>
                <SelectContent className="font-vazir">
                  <SelectItem value="boys">پسرانه</SelectItem>
                  <SelectItem value="girls">دخترانه</SelectItem>
                  <SelectItem value="mixed">مختلط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4 font-vazir">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {filters.map((filter) => (
                  <Badge
                    key={filter.key}
                    variant="secondary"
                    className="gap-1 pl-1 cursor-pointer hover:bg-destructive/10"
                    onClick={() => clearFilter(filter.key)}
                  >
                    {filter.label}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors mr-2"
                >
                  پاک کردن همه
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6 font-vazir">
                  {filteredMahafil.length} محفل یافت شد
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMahafil.map((mahfil) => (
                    <article
                      key={mahfil.id}
                      className="group rounded-2xl bg-card border border-border/50 overflow-hidden hover-lift shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-vazir">
                            {mahfil.gender === "boys" ? "پسرانه" : mahfil.gender === "girls" ? "دخترانه" : "مختلط"}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-mono">
                            {mahfil.age_min}-{mahfil.age_max} سال
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-vazir">
                          {mahfil.name}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-vazir">
                          {mahfil.description}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-vazir">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {getProvinceName(mahfil.province_id)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground font-vazir">
                            ظرفیت: {mahfil.capacity} نفر
                          </span>
                          <Link to={`/mahafil/${mahfil.id}`}>
                            <Button size="sm" className="gap-1 gradient-primary border-0 font-vazir">
                              مشاهده
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {filteredMahafil.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4 font-vazir">محفلی با این مشخصات یافت نشد</p>
                    <Button variant="outline" onClick={clearAllFilters} className="font-vazir">
                      پاک کردن فیلترها
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
