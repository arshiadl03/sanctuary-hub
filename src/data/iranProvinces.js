// داده‌های استان‌ها و شهرهای ایران

// Plain JS data for provinces and cities
export const iranProvinces = [
  {
    id: "tehran",
    name: "تهران",
    cities: [
      { id: "tehran-city", name: "تهران" },
      { id: "rey", name: "ری" },
      { id: "shemiranat", name: "شمیرانات" },
      { id: "eslamshahr", name: "اسلامشهر" },
      { id: "pakdasht", name: "پاکدشت" },
    ],
  },
  {
    id: "isfahan",
    name: "اصفهان",
    cities: [
      { id: "isfahan-city", name: "اصفهان" },
      { id: "kashan", name: "کاشان" },
      { id: "najafabad", name: "نجف‌آباد" },
      { id: "khomeinishahr", name: "خمینی‌شهر" },
    ],
  },
  {
    id: "fars",
    name: "فارس",
    cities: [
      { id: "shiraz", name: "شیراز" },
      { id: "marvdasht", name: "مرودشت" },
      { id: "jahrom", name: "جهرم" },
      { id: "fasa", name: "فسا" },
    ],
  },
  {
    id: "khorasan-razavi",
    name: "خراسان رضوی",
    cities: [
      { id: "mashhad", name: "مشهد" },
      { id: "neyshabur", name: "نیشابور" },
      { id: "sabzevar", name: "سبزوار" },
      { id: "torbat-heydarieh", name: "تربت حیدریه" },
    ],
  },
  {
    id: "east-azerbaijan",
    name: "آذربایجان شرقی",
    cities: [
      { id: "tabriz", name: "تبریز" },
      { id: "maragheh", name: "مراغه" },
      { id: "marand", name: "مرند" },
      { id: "bonab", name: "بناب" },
    ],
  },
  {
    id: "west-azerbaijan",
    name: "آذربایجان غربی",
    cities: [
      { id: "urmia", name: "ارومیه" },
      { id: "khoy", name: "خوی" },
      { id: "miandoab", name: "میاندوآب" },
      { id: "mahabad", name: "مهاباد" },
    ],
  },
  {
    id: "khuzestan",
    name: "خوزستان",
    cities: [
      { id: "ahvaz", name: "اهواز" },
      { id: "abadan", name: "آبادان" },
      { id: "khorramshahr", name: "خرمشهر" },
      { id: "dezful", name: "دزفول" },
    ],
  },
  {
    id: "mazandaran",
    name: "مازندران",
    cities: [
      { id: "sari", name: "ساری" },
      { id: "babol", name: "بابل" },
      { id: "amol", name: "آمل" },
      { id: "qaemshahr", name: "قائم‌شهر" },
    ],
  },
  {
    id: "gilan",
    name: "گیلان",
    cities: [
      { id: "rasht", name: "رشت" },
      { id: "anzali", name: "بندر انزلی" },
      { id: "lahijan", name: "لاهیجان" },
      { id: "langarud", name: "لنگرود" },
    ],
  },
  {
    id: "kermanshah",
    name: "کرمانشاه",
    cities: [
      { id: "kermanshah-city", name: "کرمانشاه" },
      { id: "eslamabad-gharb", name: "اسلام‌آباد غرب" },
      { id: "kangavar", name: "کنگاور" },
    ],
  },
  {
    id: "kerman",
    name: "کرمان",
    cities: [
      { id: "kerman-city", name: "کرمان" },
      { id: "rafsanjan", name: "رفسنجان" },
      { id: "sirjan", name: "سیرجان" },
      { id: "bam", name: "بم" },
    ],
  },
  {
    id: "alborz",
    name: "البرز",
    cities: [
      { id: "karaj", name: "کرج" },
      { id: "fardis", name: "فردیس" },
      { id: "nazarabad", name: "نظرآباد" },
    ],
  },
  {
    id: "qom",
    name: "قم",
    cities: [{ id: "qom-city", name: "قم" }],
  },
  {
    id: "yazd",
    name: "یزد",
    cities: [
      { id: "yazd-city", name: "یزد" },
      { id: "meybod", name: "میبد" },
      { id: "ardakan", name: "اردکان" },
    ],
  },
  {
    id: "hormozgan",
    name: "هرمزگان",
    cities: [
      { id: "bandar-abbas", name: "بندرعباس" },
      { id: "qeshm", name: "قشم" },
      { id: "minab", name: "میناب" },
    ],
  },
  {
    id: "sistan-baluchestan",
    name: "سیستان و بلوچستان",
    cities: [
      { id: "zahedan", name: "زاهدان" },
      { id: "chabahar", name: "چابهار" },
      { id: "zabol", name: "زابل" },
    ],
  },
  {
    id: "lorestan",
    name: "لرستان",
    cities: [
      { id: "khorramabad", name: "خرم‌آباد" },
      { id: "borujerd", name: "بروجرد" },
      { id: "doroud", name: "دورود" },
    ],
  },
  {
    id: "hamedan",
    name: "همدان",
    cities: [
      { id: "hamedan-city", name: "همدان" },
      { id: "malayer", name: "ملایر" },
      { id: "nahavand", name: "نهاوند" },
    ],
  },
  {
    id: "kurdistan",
    name: "کردستان",
    cities: [
      { id: "sanandaj", name: "سنندج" },
      { id: "saghez", name: "سقز" },
      { id: "marivan", name: "مریوان" },
    ],
  },
  {
    id: "markazi",
    name: "مرکزی",
    cities: [
      { id: "arak", name: "اراک" },
      { id: "saveh", name: "ساوه" },
      { id: "khomein", name: "خمین" },
    ],
  },
  {
    id: "golestan",
    name: "گلستان",
    cities: [
      { id: "gorgan", name: "گرگان" },
      { id: "gonbad-kavus", name: "گنبد کاووس" },
      { id: "aliabad", name: "علی‌آباد" },
    ],
  },
  {
    id: "ardabil",
    name: "اردبیل",
    cities: [
      { id: "ardabil-city", name: "اردبیل" },
      { id: "meshginshahr", name: "مشگین‌شهر" },
      { id: "parsabad", name: "پارس‌آباد" },
    ],
  },
  {
    id: "zanjan",
    name: "زنجان",
    cities: [
      { id: "zanjan-city", name: "زنجان" },
      { id: "abhar", name: "ابهر" },
      { id: "khodabandeh", name: "خدابنده" },
    ],
  },
  {
    id: "semnan",
    name: "سمنان",
    cities: [
      { id: "semnan-city", name: "سمنان" },
      { id: "shahroud", name: "شاهرود" },
      { id: "damghan", name: "دامغان" },
    ],
  },
  {
    id: "qazvin",
    name: "قزوین",
    cities: [
      { id: "qazvin-city", name: "قزوین" },
      { id: "takestan", name: "تاکستان" },
      { id: "alborz-qazvin", name: "البرز" },
    ],
  },
  {
    id: "ilam",
    name: "ایلام",
    cities: [
      { id: "ilam-city", name: "ایلام" },
      { id: "mehran", name: "مهران" },
      { id: "dehloran", name: "دهلران" },
    ],
  },
  {
    id: "bushehr",
    name: "بوشهر",
    cities: [
      { id: "bushehr-city", name: "بوشهر" },
      { id: "borazjan", name: "برازجان" },
      { id: "kangan", name: "کنگان" },
    ],
  },
  {
    id: "chaharmahal",
    name: "چهارمحال و بختیاری",
    cities: [
      { id: "shahrekord", name: "شهرکرد" },
      { id: "borujen", name: "بروجن" },
      { id: "farsan", name: "فارسان" },
    ],
  },
  {
    id: "kohgiluyeh",
    name: "کهگیلویه و بویراحمد",
    cities: [
      { id: "yasuj", name: "یاسوج" },
      { id: "gachsaran", name: "گچساران" },
      { id: "dehdasht", name: "دهدشت" },
    ],
  },
  {
    id: "north-khorasan",
    name: "خراسان شمالی",
    cities: [
      { id: "bojnurd", name: "بجنورد" },
      { id: "shirvan", name: "شیروان" },
      { id: "esfarayen", name: "اسفراین" },
    ],
  },
  {
    id: "south-khorasan",
    name: "خراسان جنوبی",
    cities: [
      { id: "birjand", name: "بیرجند" },
      { id: "qaen", name: "قائن" },
      { id: "ferdows", name: "فردوس" },
    ],
  },
];

export const getProvinceCities = (provinceId) => {
  const province = iranProvinces.find((p) => p.id === provinceId);
  return province?.cities || [];
};

export const getProvinceName = (provinceId) => {
  const province = iranProvinces.find((p) => p.id === provinceId);
  return province?.name || "";
};

export const getCityName = (provinceId, cityId) => {
  const cities = getProvinceCities(provinceId);
  const city = cities.find((c) => c.id === cityId);
  return city?.name || "";
};
