import { Layout } from "@/components/layout/Layout/Layout";
import { HeroSection } from "@/components/home/HeroSection/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection/CategoriesSection";
import { FeaturedMahafil } from "@/components/home/FeaturedMahafil/FeaturedMahafil";
import { HowItWorks } from "@/components/home/HowItWorks/HowItWorks";
import { CTASection } from "@/components/home/CTASection/CTASection";
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
