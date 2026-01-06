// داده‌های محافل قرآنی

// Categories of mahfil (plain JS)
export const mahfilCategories = [
  {
    id: "quran-memorization",
    name: "حفظ قرآن کریم",
    description: "محافل ویژه حفظ قرآن کریم",
    icon: "book-open",
    count: 45,
  },
  {
    id: "quran-recitation",
    name: "روخوانی و روانخوانی",
    description: "آموزش صحیح خواندن قرآن",
    icon: "mic",
    count: 32,
  },
  {
    id: "tajweed",
    name: "تجوید",
    description: "آموزش قواعد تجوید",
    icon: "graduation-cap",
    count: 28,
  },
  {
    id: "concepts",
    name: "مفاهیم قرآنی",
    description: "آموزش مفاهیم و تفسیر",
    icon: "lightbulb",
    count: 21,
  },
  {
    id: "nahj-al-balagha",
    name: "نهج‌البلاغه",
    description: "آموزش نهج‌البلاغه",
    icon: "scroll",
    count: 15,
  },
  {
    id: "hadith",
    name: "احادیث",
    description: "آموزش احادیث معصومین",
    icon: "quote",
    count: 18,
  },
];

export const dayOfWeekLabels = {
  saturday: "شنبه",
  sunday: "یکشنبه",
  monday: "دوشنبه",
  tuesday: "سه‌شنبه",
  wednesday: "چهارشنبه",
  thursday: "پنجشنبه",
  friday: "جمعه",
};
export const sampleMahafil = [
  {
    id: "mahfil-1",
    name: "محفل قرآنی موسی بن جعفر (ع)",
    description: "محفل قرآنی ویژه کودکان با هدف حفظ قرآن کریم و آموزش مفاهیم قرآنی در محیطی شاد و صمیمی",
    provinceId: "tehran",
    cityId: "tehran-city",
    address: "تهران، خیابان ولیعصر، کوچه فردوس، پلاک ۱۲",
    teacherName: "استاد محمدی",
    teacherTitle: "حافظ کل قرآن کریم",
    capacity: 30,
    currentStudents: 24,
    status: "active",
    daysOfWeek: ["saturday", "tuesday", "thursday"],
    startTime: "16:00",
    endTime: "18:00",
    ageRange: { min: 6, max: 14 },
    gender: "mixed",
    features: ["حفظ قرآن", "روانخوانی", "مفاهیم", "جوایز ویژه"],
    createdAt: "2024-01-15",
  },
  {
    id: "mahfil-2",
    name: "محفل نور هدایت",
    description: "آموزش تخصصی تجوید و قرائت صحیح قرآن کریم برای دختران",
    provinceId: "isfahan",
    cityId: "isfahan-city",
    address: "اصفهان، میدان نقش جهان، کوچه علامه مجلسی",
    teacherName: "خانم کریمی",
    teacherTitle: "قاری بین‌المللی",
    capacity: 25,
    currentStudents: 20,
    status: "active",
    daysOfWeek: ["sunday", "wednesday"],
    startTime: "15:30",
    endTime: "17:30",
    ageRange: { min: 7, max: 15 },
    gender: "girls",
    features: ["تجوید", "قرائت", "مسابقات"],
    createdAt: "2024-02-20",
  },
  {
    id: "mahfil-3",
    name: "محفل الزهرا (س)",
    description: "محفل ویژه حفظ جزء ۳۰ و آموزش نماز برای خردسالان",
    provinceId: "mashhad",
    cityId: "mashhad",
    address: "مشهد، بلوار وکیل‌آباد، کوچه ۲۵",
    teacherName: "خانم احمدی",
    teacherTitle: "مربی قرآن کودک",
    capacity: 20,
    currentStudents: 18,
    status: "active",
    daysOfWeek: ["saturday", "monday", "wednesday"],
    startTime: "10:00",
    endTime: "12:00",
    ageRange: { min: 4, max: 8 },
    gender: "mixed",
    features: ["جزء ۳۰", "آموزش نماز", "بازی و سرگرمی"],
    createdAt: "2024-03-10",
  },
  {
    id: "mahfil-4",
    name: "محفل امام رضا (ع)",
    description: "حفظ قرآن کریم با روش‌های نوین و استفاده از فناوری",
    provinceId: "khorasan-razavi",
    cityId: "mashhad",
    address: "مشهد، خیابان امام رضا، نبش کوچه ۱۵",
    teacherName: "استاد رضایی",
    teacherTitle: "حافظ و مدرس قرآن",
    capacity: 35,
    currentStudents: 30,
    status: "active",
    daysOfWeek: ["sunday", "tuesday", "friday"],
    startTime: "17:00",
    endTime: "19:00",
    ageRange: { min: 8, max: 16 },
    gender: "boys",
    features: ["حفظ قرآن", "آموزش آنلاین", "مسابقات ملی"],
    createdAt: "2024-01-05",
  },
  {
    id: "mahfil-5",
    name: "محفل فاطمیون",
    description: "آموزش مفاهیم قرآنی و نهج‌البلاغه برای نوجوانان",
    provinceId: "fars",
    cityId: "shiraz",
    address: "شیراز، خیابان زند، کوچه حافظ",
    teacherName: "حجت‌الاسلام موسوی",
    teacherTitle: "مدرس حوزه علمیه",
    capacity: 40,
    currentStudents: 35,
    status: "active",
    daysOfWeek: ["thursday", "friday"],
    startTime: "09:00",
    endTime: "11:00",
    ageRange: { min: 12, max: 18 },
    gender: "mixed",
    features: ["مفاهیم قرآنی", "نهج‌البلاغه", "مناظره"],
    createdAt: "2024-02-01",
  },
];

export const getMahfilById = (id) => sampleMahafil.find((m) => m.id === id);

export const getMahfilsByProvince = (provinceId) => sampleMahafil.filter((m) => m.provinceId === provinceId);

export const getMahfilsByCity = (cityId) => sampleMahafil.filter((m) => m.cityId === cityId);

export const searchMahafil = (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return sampleMahafil.filter(
    (m) =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery) ||
      (m.teacherName || "").toLowerCase().includes(lowerQuery) ||
      (m.features || []).some((f) => f.toLowerCase().includes(lowerQuery)),
  );
};
