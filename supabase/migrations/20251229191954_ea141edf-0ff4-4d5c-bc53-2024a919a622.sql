-- جداول اصلی سامانه محافل قرآنی کودکان

-- جدول پروفایل کاربران
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  province_id TEXT,
  city_id TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- جدول نقش‌های کاربران (مهم برای امنیت)
CREATE TYPE public.user_role AS ENUM ('admin', 'teacher', 'assistant', 'parent');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'parent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- تابع بررسی نقش کاربر
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- جدول محافل قرآنی
CREATE TYPE public.mahfil_status AS ENUM ('active', 'inactive', 'upcoming');
CREATE TYPE public.mahfil_gender AS ENUM ('boys', 'girls', 'mixed');

CREATE TABLE public.mahafil (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  province_id TEXT NOT NULL,
  city_id TEXT NOT NULL,
  address TEXT,
  teacher_id UUID REFERENCES auth.users(id),
  capacity INTEGER DEFAULT 30,
  status mahfil_status DEFAULT 'active',
  gender mahfil_gender DEFAULT 'mixed',
  age_min INTEGER DEFAULT 5,
  age_max INTEGER DEFAULT 15,
  days_of_week TEXT[] DEFAULT '{}',
  start_time TIME,
  end_time TIME,
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.mahafil ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active mahafil"
  ON public.mahafil FOR SELECT
  USING (status = 'active');

CREATE POLICY "Teachers can manage their mahafil"
  ON public.mahafil FOR ALL
  USING (auth.uid() = teacher_id OR public.has_role(auth.uid(), 'admin'));

-- جدول فرزندان
CREATE TYPE public.child_gender AS ENUM ('male', 'female');

CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 3 AND age <= 18),
  gender child_gender NOT NULL,
  avatar_url TEXT,
  mahfil_id UUID REFERENCES public.mahafil(id),
  total_points INTEGER DEFAULT 0,
  enrollment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can manage their children"
  ON public.children FOR ALL
  USING (auth.uid() = parent_id);

CREATE POLICY "Teachers can view children in their mahfil"
  ON public.children FOR SELECT
  USING (
    mahfil_id IN (SELECT id FROM public.mahafil WHERE teacher_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

-- جدول سوره‌های حفظ شده
CREATE TABLE public.memorized_surahs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  surah_number INTEGER NOT NULL CHECK (surah_number >= 1 AND surah_number <= 114),
  is_memorized BOOLEAN DEFAULT FALSE,
  points_earned INTEGER DEFAULT 0,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, surah_number)
);

ALTER TABLE public.memorized_surahs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view their children memorized surahs"
  ON public.memorized_surahs FOR SELECT
  USING (
    child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

CREATE POLICY "Teachers can manage memorized surahs"
  ON public.memorized_surahs FOR ALL
  USING (
    child_id IN (
      SELECT c.id FROM public.children c
      JOIN public.mahafil m ON c.mahfil_id = m.id
      WHERE m.teacher_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'admin')
  );

-- جدول ارزشیابی‌ها
CREATE TYPE public.evaluation_grade AS ENUM ('excellent', 'good', 'average', 'needs_practice');

CREATE TABLE public.evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  evaluator_id UUID NOT NULL REFERENCES auth.users(id),
  mahfil_id UUID REFERENCES public.mahafil(id),
  -- ارزشیابی قرآن
  quran_memorization evaluation_grade,
  quran_recitation evaluation_grade,
  quran_concepts evaluation_grade,
  quran_tajweed evaluation_grade,
  -- ارزشیابی حدیث و نهج‌البلاغه
  hadith_grade evaluation_grade,
  nahj_grade evaluation_grade,
  -- امتیاز کل
  total_score INTEGER DEFAULT 0,
  notes TEXT,
  evaluation_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view their children evaluations"
  ON public.evaluations FOR SELECT
  USING (
    child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

CREATE POLICY "Teachers can manage evaluations"
  ON public.evaluations FOR ALL
  USING (
    auth.uid() = evaluator_id
    OR public.has_role(auth.uid(), 'admin')
  );

-- جدول حضور و غیاب
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  mahfil_id UUID NOT NULL REFERENCES public.mahafil(id),
  session_date DATE NOT NULL,
  is_present BOOLEAN DEFAULT TRUE,
  points_earned INTEGER DEFAULT 0,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, mahfil_id, session_date)
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view their children attendance"
  ON public.attendance FOR SELECT
  USING (
    child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

CREATE POLICY "Teachers can manage attendance"
  ON public.attendance FOR ALL
  USING (
    mahfil_id IN (SELECT id FROM public.mahafil WHERE teacher_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

-- جدول جوایز
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active rewards"
  ON public.rewards FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage rewards"
  ON public.rewards FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- جدول جوایز دریافت شده
CREATE TABLE public.child_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES public.rewards(id),
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered BOOLEAN DEFAULT FALSE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.child_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view their children rewards"
  ON public.child_rewards FOR SELECT
  USING (
    child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

CREATE POLICY "Children can redeem rewards"
  ON public.child_rewards FOR INSERT
  WITH CHECK (
    child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

-- تریگر برای به‌روزرسانی updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mahafil_updated_at
  BEFORE UPDATE ON public.mahafil
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_children_updated_at
  BEFORE UPDATE ON public.children
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- تریگر برای ساخت پروفایل خودکار بعد از ثبت نام
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'phone', '')
  );
  
  -- نقش پیش‌فرض: والد
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'parent');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- داده‌های اولیه جوایز
INSERT INTO public.rewards (name, description, points_required) VALUES
  ('مداد رنگی', 'یک بسته مداد رنگی ۱۲ تایی', 100),
  ('دفتر نقاشی', 'دفتر نقاشی با طرح قرآنی', 150),
  ('کتاب داستان', 'کتاب داستان‌های قرآنی', 200),
  ('جایزه طلایی', 'یک سکه یادبود طلایی', 500),
  ('تبلت آموزشی', 'تبلت مخصوص آموزش قرآن', 1000);