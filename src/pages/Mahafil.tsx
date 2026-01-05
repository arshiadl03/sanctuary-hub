import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, MapPin, ChevronLeft, X, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
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
import { iranProvinces, getProvinceName, getCityName } from "@/data/iranProvinces";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Mahfil = Tables<"mahafil">;

export default function Mahafil() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [mahafil, setMahafil] = useState<Mahfil[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMahafil();
  }, []);

  const fetchMahafil = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("mahafil")
      .select("*")
      .eq("status", "active");

    if (!error && data) {
      setMahafil(data);
    }
    setIsLoading(false);
  };

  const filters = useMemo(() => {
    const active: { key: string; label: string }[] = [];
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
      if (searchQuery && !m.name.includes(searchQuery) && !(m.description?.includes(searchQuery))) {
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

  const clearFilter = (key: string) => {
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
        <meta name="description" content="جستجو و یافتن محافل قرآنی در سراسر ایران. فیلتر بر اساس استان، شهر و نوع محفل." />
      </Helmet>
      <Layout>
        {/* هدر */}
        <section className="bg-muted/30 py-12">
          <div className="container">
            <h1 className="text-headline text-foreground mb-4">
              محافل <span className="text-primary">قرآنی</span>
            </h1>
            <p className="text-body text-muted-foreground mb-8 max-w-2xl">
              محفل قرآنی مناسب برای فرزند خود را پیدا کنید و او را در مسیر حفظ قرآن کریم همراهی کنید
            </p>

            {/* فیلترها */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="جستجو در محافل..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-12 rounded-xl bg-card"
                />
              </div>
              <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl bg-card">
                  <SelectValue placeholder="انتخاب استان" />
                </SelectTrigger>
                <SelectContent>
                  {iranProvinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-full lg:w-40 h-12 rounded-xl bg-card">
                  <SelectValue placeholder="جنسیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boys">پسرانه</SelectItem>
                  <SelectItem value="girls">دخترانه</SelectItem>
                  <SelectItem value="mixed">مختلط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* برچسب‌های فیلتر */}
            {filters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
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
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  پاک کردن همه
                </button>
              </div>
            )}
          </div>
        </section>

        {/* لیست محافل */}
        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {filteredMahafil.length} محفل یافت شد
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMahafil.map((mahfil) => (
                    <article
                      key={mahfil.id}
                      className="group rounded-2xl bg-card border border-border/50 overflow-hidden hover:shadow-card-hover transition-all"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                            {mahfil.gender === "boys" ? "پسرانه" : mahfil.gender === "girls" ? "دخترانه" : "مختلط"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {mahfil.age_min}-{mahfil.age_max} سال
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {mahfil.name}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {mahfil.description}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {getProvinceName(mahfil.province_id)}، {getCityName(mahfil.province_id, mahfil.city_id)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {mahfil.features?.slice(0, 3).map((feature) => (
                            <span key={feature} className="px-2 py-1 text-xs bg-muted rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground">
                            ظرفیت: {mahfil.capacity} نفر
                          </span>
                          <Link to={`/mahafil/${mahfil.id}`}>
                            <Button size="sm" className="gap-1 gradient-primary border-0">
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
                    <p className="text-muted-foreground mb-4">محفلی با این مشخصات یافت نشد</p>
                    <Button variant="outline" onClick={clearAllFilters}>
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
