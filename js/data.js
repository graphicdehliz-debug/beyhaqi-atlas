// ============================================================
// داده‌های پژوهشی تأییدشده اطلس جغرافیایی تاریخ بیهقی
// قاعده قطعی: هیچ نقل‌قول، شماره صفحه، تاریخ یا مختصاتی جعل نمی‌شود.
// ساختار به گونه‌ای طراحی شده که شهرهای آینده بدون بازنویسی کد افزوده شوند.
// ============================================================

const ATLAS_CONFIG = {
  // قاب تقریبی نقشه مرجع سیدی–یاحقی (۴۰ تا ۷۶ درجه شرقی، ۲۶ تا ۴۲ درجه شمالی)
  refMapBounds: [[26, 40], [42, 76]],
  refMapUrl: "assets/reference-map-cropped.jpg",
  refMapFallbackUrl: "assets/reference-map.jpg",
  osmUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  osmAttribution: "© OpenStreetMap",
  evidenceTypes: {
    text: { label: "شاهد مستقیم متن", badgeClass: "badge-text" },
    historical: { label: "منبع تاریخی تأییدشده", badgeClass: "badge-hist" },
    contemporary: { label: "داده جغرافیایی معاصر", badgeClass: "badge-geo" },
    review: { label: "نیازمند بررسی", badgeClass: "badge-review" },
    later: { label: "خارج از عصر بیهقی", badgeClass: "badge-later" }
  }
};

const ATLAS_SOURCES = [
  {
    id: "iranica",
    title: "Encyclopaedia Iranica، مدخل ḠAZNĪ",
    role: "داده‌های پایه تاریخی، موقعیت، مختصات و خط زمانی کلان غزنه"
  },
  {
    id: "fayyaz",
    title: "تاریخ بیهقی، تصحیح علی‌اکبر فیاض",
    role: "متن مبنای پژوهش برای استخراج و ارجاع شواهد مستقیم متنی (در دست کدگذاری)"
  },
  {
    id: "refmap",
    title: "نقشه «نام جاهای تاریخ بیهقی»، پیوست نسخه تصحیح‌شده به کوشش مهدی سیدی و محمدجعفر یاحقی؛ اطلاعات GIS: محمد امیر ابراهیمی؛ تهیه و نظارت علمی: مهدی سیدی",
    role: "نقشه مرجع تاریخی برای جانمایی مکانی"
  },
  {
    id: "osm",
    title: "OpenStreetMap",
    role: "لایه نقشه جغرافیایی معاصر برای تطبیق موقعیت امروزی"
  }
];

const PLACES = [
  {
    id: "ghazna",
    slug: "ghazna.html",
    name: "غزنه",
    alternativeNames: ["غزنین", "غزنی"],
    modernLocation: "شهر غزنی، مرکز ولایت غزنی در افغانستان",
    lat: 33.5667,
    lng: 68.45,
    coordsDisplay: "33.5667 N, 68.4500 E",
    elevation: "حدود ۲٬۲۰۰ متر",
    distanceFromKabul: "حدود ۱۳۶ کیلومتر به سمت جنوب",
    shortRole: "پایتخت غزنویان از ۹۷۷ میلادی؛ محل دربار غزنوی و دیوان رسالت",
    pageSubtitle: "صورت‌های دیگر نام: غزنین و غزنی — موقعیت امروزی: شهر غزنی، مرکز ولایت غزنی در افغانستان",
    statusSummary: "تمرکز پژوهشی فعلی اطلس",

    // ۱. شناسنامه دسته‌بندی‌شده با تفکیک نوع داده و وضعیت اعتبار
    identityRows: [
      {
        field: "نام تاریخی اصلی",
        value: "غزنه",
        evidenceType: "historical",
        certainty: "تأییدشده",
        source: "داده‌های پایه پژوهش / تاریخ بیهقی"
      },
      {
        field: "صورت‌های دیگر نام",
        value: "غزنین و غزنی",
        evidenceType: "historical",
        certainty: "تأییدشده",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      },
      {
        field: "موقعیت امروزی",
        value: "شهر غزنی، مرکز ولایت غزنی در افغانستان",
        evidenceType: "contemporary",
        certainty: "تأییدشده",
        source: "داده‌های جغرافیایی معاصر / OpenStreetMap"
      },
      {
        field: "مختصات جغرافیایی",
        value: "33.5667 N, 68.4500 E",
        evidenceType: "contemporary",
        certainty: "تأییدشده (مرجع اطلس)",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      },
      {
        field: "ارتفاع تقریبی",
        value: "حدود ۲٬۲۰۰ متر",
        evidenceType: "contemporary",
        certainty: "تأییدشده (تقریبی)",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      },
      {
        field: "فاصله از کابل",
        value: "حدود ۱۳۶ کیلومتر به سمت جنوب",
        evidenceType: "contemporary",
        certainty: "تأییدشده (تقریبی)",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      },
      {
        field: "جایگاه سیاسی",
        value: "پایتخت غزنویان از سال ۹۷۷ میلادی؛ مقر دربار غزنوی و دیوان رسالت",
        evidenceType: "historical",
        certainty: "تأییدشده",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      }
    ],

    // ۲. جایگاه در تاریخ بیهقی
    beyhaqiContext: [
      {
        title: "پایتخت و مرکز اداری",
        body: "غزنه از سال ۹۷۷ میلادی پایتخت غزنویان بوده است و دربار غزنوی و دیوان رسالت در این شهر قرار داشته‌اند.",
        evidenceType: "historical",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      },
      {
        title: "بازه روایی متن باقی‌مانده",
        body: "متن باقی‌مانده تاریخ بیهقی دوره سلطنت سلطان مسعود اول، از ۱۰۳۰ تا ۱۰۴۱ میلادی را پوشش می‌دهد.",
        evidenceType: "historical",
        source: "تاریخ بیهقی (تصحیح فیاض) / ایرانیکا"
      },
      {
        title: "پیوند مستقیم بیهقی با غزنه",
        body: "ابوالفضل بیهقی دبیر دیوان رسالت بوده و زیر نظر ابونصر مشکان، رئیس دیوان رسالت و استاد خود، در ساختار دیوانی غزنه فعالیت می‌کرده است.",
        evidenceType: "historical",
        source: "منابع پایه پژوهش"
      }
    ],

    textualEvidenceStatus: {
      badge: "نیازمند بررسی",
      text: "فهرست نقل‌قول‌های مستقیم، شماره‌صفحه‌های چاپ علی‌اکبر فیاض و فهرست کامل مکان‌های درون‌شهری غزنه (باغ‌ها، دشت‌ها، بازارها و دروازه‌ها) هنوز کدگذاری و مقابله نهایی نشده است. بر پایه اصل امانت پژوهشی، هیچ نقل‌قول یا شماره صفحه‌ای پیش از مقابله مستقیم با متن در این صفحه درج نمی‌شود."
    },

    // ۳. خط زمانی با تفکیک دقیق عصر بیهقی از دوره‌های پیشین و متأخر
    timeline: [
      {
        id: "t-977",
        yearSort: 977,
        yearLabel: "۹۷۷ میلادی",
        title: "غزنه پایتخت غزنویان می‌شود.",
        period: "pre",
        periodLabel: "پیش از دوره روایت باقی‌مانده",
        evidenceType: "historical",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      },
      {
        id: "t-998",
        yearSort: 998,
        yearLabel: "۹۹۸ تا ۱۰۳۰ میلادی",
        title: "سلطنت سلطان محمود غزنوی.",
        period: "pre",
        periodLabel: "پیش از دوره روایت باقی‌مانده",
        evidenceType: "historical",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      },
      {
        id: "t-1030",
        yearSort: 1030,
        yearLabel: "۱۰۳۰ تا ۱۰۴۱ میلادی",
        title: "سلطنت سلطان مسعود اول؛ دوره روایت متن باقی‌مانده تاریخ بیهقی.",
        period: "beyhaqi",
        periodLabel: "عصر بیهقی",
        evidenceType: "historical",
        source: "تاریخ بیهقی / Encyclopaedia Iranica"
      },
      {
        id: "t-1031",
        yearSort: 1031,
        yearLabel: "۱۰۳۱ میلادی",
        title: "سیل غزنه.",
        period: "beyhaqi",
        periodLabel: "عصر بیهقی",
        evidenceType: "historical",
        source: "داده‌های پایه پژوهش (ارجاع دقیق صفحه چاپ فیاض: نیازمند بررسی)"
      },
      {
        id: "t-1150",
        yearSort: 1150,
        yearLabel: "۱۱۵۰ تا ۱۱۵۱ میلادی",
        title: "ویرانی غزنه به دست علاءالدین حسین جهانسوز؛ خارج از عصر بیهقی.",
        period: "later",
        periodLabel: "خارج از عصر بیهقی",
        evidenceType: "later",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      },
      {
        id: "t-1221",
        yearSort: 1221,
        yearLabel: "۱۲۲۱ میلادی",
        title: "ویرانی غزنه در حمله مغول؛ خارج از عصر بیهقی.",
        period: "later",
        periodLabel: "خارج از عصر بیهقی",
        evidenceType: "later",
        source: "Encyclopaedia Iranica، مدخل ḠAZNĪ"
      }
    ],

    // ۴. شخصیت‌های مرتبط (۶ شخصیت تأییدشده)
    figures: [
      {
        name: "سلطان محمود غزنوی",
        role: "سلطان غزنوی (۹۹۸ تا ۱۰۳۰ میلادی)",
        relation: "دوره سلطنت او پیش‌زمینه تاریخی پایتختی غزنه در عصر بیهقی است.",
        evidenceType: "historical",
        textualNote: "شواهد مستقیم متنی: نیازمند بررسی"
      },
      {
        name: "سلطان مسعود اول",
        role: "سلطان غزنوی (۱۰۳۰ تا ۱۰۴۱ میلادی)",
        relation: "متن باقی‌مانده تاریخ بیهقی دوره سلطنت او را پوشش می‌دهد و دربار او در غزنه مستقر بوده است.",
        evidenceType: "historical",
        textualNote: "شواهد مستقیم متنی: نیازمند بررسی"
      },
      {
        name: "ابوالفضل بیهقی",
        role: "دبیر دیوان رسالت و مؤلف تاریخ بیهقی",
        relation: "دبیر دیوان رسالت در غزنه و راوی اصلی دوره سلطنت مسعود اول.",
        evidenceType: "historical",
        textualNote: "شواهد مستقیم متنی: نیازمند بررسی"
      },
      {
        name: "ابونصر مشکان",
        role: "رئیس دیوان رسالت و استاد بیهقی",
        relation: "رئیس دیوان رسالت دربار غزنوی در غزنه و استاد مستقیم ابوالفضل بیهقی.",
        evidenceType: "historical",
        textualNote: "شواهد مستقیم متنی: نیازمند بررسی"
      },
      {
        name: "احمد میمندی",
        role: "از شخصیت‌های مرتبط با دربار غزنه",
        relation: "از چهره‌های تأییدشده مرتبط با غزنه در ساختار پژوهش اطلس.",
        evidenceType: "historical",
        textualNote: "جزئیات و شواهد مستقیم متنی: نیازمند بررسی"
      },
      {
        name: "ابوریحان بیرونی",
        role: "از شخصیت‌های مرتبط با غزنه",
        relation: "از چهره‌های علمی تأییدشده مرتبط با غزنه در ساختار پژوهش اطلس.",
        evidenceType: "historical",
        textualNote: "جزئیات و شواهد مستقیم متنی: نیازمند بررسی"
      }
    ],

    // ۵. ملاحظات پژوهشی مهم (نباید به‌عنوان واقعیت عصر بیهقی معرفی شوند)
    caveats: [
      {
        title: "مناره‌های غزنه و کاخ مسعود سوم",
        detail: "این آثار بناهای متأخر دوره غزنوی هستند و نباید به‌عنوان بناهای عصر بیهقی معرفی شوند. کاخ مسعود سوم با کتیبه رمضان ۵۰۵ هجری / مارس ۱۱۱۲ میلادی شناخته می‌شود.",
        tag: "خارج از عصر بیهقی",
        badgeClass: "badge-later"
      },
      {
        title: "تپه سردار",
        detail: "محوطه تپه سردار پیشااسلامی است و به دوره غزنوی و عصر بیهقی تعلق ندارد.",
        tag: "پیشااسلامی / خارج از عصر بیهقی",
        badgeClass: "badge-later"
      },
      {
        title: "مسعود سعد سلمان و سنایی",
        detail: "مسعود سعد سلمان و سنایی معاصر ابوالفضل بیهقی نیستند و نباید در لایه شخصیت‌های عصر بیهقی قرار گیرند.",
        tag: "خارج از عصر بیهقی",
        badgeClass: "badge-later"
      },
      {
        title: "محل اعدام حسنک وزیر",
        detail: "وقوع اعدام حسنک وزیر به‌طور قطعی در غزنه تأیید نشده است؛ بنابراین روی نقشه غزنه ثبت نمی‌شود.",
        tag: "نیازمند بررسی",
        badgeClass: "badge-review"
      },
      {
        title: "ریشه‌شناسی نام و انطباق‌های پیشااسلامی",
        detail: "پیوند ریشه‌شناختی نام غزنه با «گنج/گنزک» و یکی دانستن آن با «اسکندریه اوپیانا» قطعی نیست و در سطح فرضیه پژوهشی باقی می‌ماند.",
        tag: "فرضیه پژوهشی / نیازمند بررسی",
        badgeClass: "badge-review"
      },
      {
        title: "وضعیت میراث جهانی یونسکو",
        detail: "غزنی در فهرست میراث جهانی یونسکو و همچنین در فهرست موقت افغانستان قرار ندارد.",
        tag: "تصحیح پژوهشی تأییدشده",
        badgeClass: "badge-hist"
      }
    ],

    // ۶. لایه آثار تاریخی عصر بیهقی روی نقشه (خالی نگه داشته می‌شود تا داده جعلی وارد نشود)
    verifiedMonumentsBeyhaqiEra: []
  }
];
