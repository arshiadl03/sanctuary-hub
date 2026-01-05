import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedMahafil } from "@/components/home/FeaturedMahafil";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTASection } from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>محافل قرآنی کودکان ایران | سامانه مدیریت و ارزشیابی</title>
        <meta
          name="description"
          content="سامانه هوشمند مدیریت و ارزشیابی محافل قرآنی کودکان. ثبت نام فرزند خود در نزدیک‌ترین محفل قرآنی، پیگیری پیشرفت حفظ و دریافت جوایز ویژه."
        />
      </Helmet>
      <Layout>
        <HeroSection />
        <CategoriesSection />
        <FeaturedMahafil />
        <HowItWorks />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
