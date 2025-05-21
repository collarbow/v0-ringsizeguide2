"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "ar"

type Translations = {
  [key: string]: {
    en: string
    ar: string
  }
}

// Define all translations here
const translations: Translations = {
  // Page titles
  sizeFinderTitle: {
    en: "COLLAR & BOW Size Finder",
    ar: "محدد المقاس من كولار آند بو",
  },
  findPerfectSize: {
    en: "Find your perfect size by answering a few simple questions",
    ar: "اعثر على مقاسك المثالي من خلال الإجابة على بعض الأسئلة البسيطة",
  },

  // Tabs
  sizeFinderQuiz: {
    en: "Size Finder Quiz",
    ar: "اختبار تحديد المقاس",
  },
  quickSizeFinder: {
    en: "Quick Size Finder",
    ar: "محدد المقاس السريع",
  },
  sizeChart: {
    en: "Size Chart",
    ar: "جدول المقاسات",
  },

  // Social sharing
  shareThisTool: {
    en: "Share this tool",
    ar: "شارك هذه الأداة",
  },
  share: {
    en: "Share",
    ar: "مشاركة",
  },
  linkCopied: {
    en: "Link copied!",
    ar: "تم نسخ الرابط!",
  },
  linkCopiedDesc: {
    en: "Link has been copied to clipboard",
    ar: "تم نسخ الرابط إلى الحافظة",
  },
  copyFailed: {
    en: "Copy failed",
    ar: "فشل النسخ",
  },
  copyFailedDesc: {
    en: "Please try again or share directly",
    ar: "يرجى المحاولة مرة أخرى أو المشاركة مباشرة",
  },
  shareOnSocial: {
    en: "Share on social media",
    ar: "شارك على وسائل التواصل الاجتماعي",
  },

  // Steps
  garmentType: {
    en: "Garment Type",
    ar: "نوع الملابس",
  },
  garmentTypeDesc: {
    en: "Select the type of garment you're looking for",
    ar: "اختر نوع الملابس التي تبحث عنها",
  },
  garmentTypeQuestion: {
    en: "What type of garment are you looking for?",
    ar: "ما نوع الملابس التي تبحث عنها؟",
  },
  measurements: {
    en: "Measurements",
    ar: "القياسات",
  },
  measurementsDesc: {
    en: "Enter your body measurements for the most accurate sizing",
    ar: "أدخل قياسات جسمك للحصول على المقاس الأكثر دقة",
  },
  measurementsQuestion: {
    en: "Do you know your measurements?",
    ar: "هل تعرف قياساتك؟",
  },
  provideMeasurements: {
    en: "Provide Measurements",
    ar: "تقديم القياسات",
  },
  estimateMeasurements: {
    en: "Estimate for Me",
    ar: "تقدير القياسات لي",
  },
  estimateDescription: {
    en: "We'll ask you a few questions to help estimate your size",
    ar: "سنطرح عليك بعض الأسئلة للمساعدة في تقدير مقاسك",
  },
  continueToQuestions: {
    en: "Continue to Questions",
    ar: "متابعة إلى الأسئلة",
  },
  dontKnowMeasurements: {
    en: "I don't know my measurements",
    ar: "لا أعرف قياساتي",
  },
  forGarmentType: {
    en: "For",
    ar: "لـ",
  },
  heightWeight: {
    en: "Height & Weight",
    ar: "الطول والوزن",
  },
  heightWeightDesc: {
    en: "Let's start with your height and weight to get a baseline",
    ar: "لنبدأ بطولك ووزنك للحصول على خط أساسي",
  },
  age: {
    en: "Age",
    ar: "العمر",
  },
  ageDesc: {
    en: "Your age helps us determine the best fit for your body type",
    ar: "يساعدنا عمرك في تحديد أفضل مقاس لنوع جسمك",
  },
  bodyType: {
    en: "Body Type",
    ar: "نوع الجسم",
  },
  bodyTypeDesc: {
    en: "Your body shape helps determine the best fit",
    ar: "شكل جسمك يساعد في تحديد أفضل مقاس",
  },
  fitPreference: {
    en: "Fit Preference",
    ar: "تفضيل المقاس",
  },
  fitPreferenceDesc: {
    en: "How do you prefer your clothes to fit?",
    ar: "كيف تفضلين أن تكون ملابسك؟",
  },
  previousExperience: {
    en: "Previous Experience",
    ar: "التجربة السابقة",
  },
  previousExperienceDesc: {
    en: "Have you purchased from COLLAR & BOW before?",
    ar: "هل اشتريت من كولار آند بو من قبل؟",
  },
  bodyProportions: {
    en: "Body Proportions",
    ar: "تناسب الجسم",
  },
  bodyProportionsDesc: {
    en: "Let's get a bit more specific about your proportions",
    ar: "دعينا نكون أكثر تحديدًا بشأن تناسب جسمك",
  },

  // Form fields
  height: {
    en: "Height (cm)",
    ar: "الطول (سم)",
  },
  weight: {
    en: "Weight (kg)",
    ar: "الوزن (كجم)",
  },
  optional: {
    en: "Optional",
    ar: "اختياري",
  },
  optionalMeasurement: {
    en: "Providing your actual measurement will improve accuracy",
    ar: "توفير قياسك الفعلي سيحسن الدقة",
  },
  ageQuestion: {
    en: "What is your age range?",
    ar: "ما هي الفئة العمرية الخاصة بك؟",
  },
  ageRange1: {
    en: "18-24 years",
    ar: "18-24 سنة",
  },
  ageRange2: {
    en: "25-34 years",
    ar: "25-34 سنة",
  },
  ageRange3: {
    en: "35-44 years",
    ar: "35-44 سنة",
  },
  ageRange4: {
    en: "45-54 years",
    ar: "45-54 سنة",
  },
  ageRange5: {
    en: "55+ years",
    ar: "55+ سنة",
  },
  hourglass: {
    en: "Hourglass",
    ar: "الساعة الرملية",
  },
  hourglassDesc: {
    en: "Balanced bust and hips with a defined waist",
    ar: "صدر وأرداف متوازنة مع خصر محدد",
  },
  pear: {
    en: "Pear",
    ar: "الكمثرى",
  },
  pearDesc: {
    en: "Hips wider than shoulders",
    ar: "أرداف أوسع من الكتفين",
  },
  apple: {
    en: "Apple",
    ar: "التفاحة",
  },
  appleDesc: {
    en: "Fuller midsection, narrower hips",
    ar: "منتصف الجسم ممتلئ، أرداف أضيق",
  },
  athletic: {
    en: "Athletic",
    ar: "رياضي",
  },
  athleticDesc: {
    en: "Broader shoulders and narrower hips",
    ar: "أكتاف أعرض وأرداف أضيق",
  },
  rectangle: {
    en: "Rectangle",
    ar: "المستطيل",
  },
  rectangleDesc: {
    en: "Shoulders, waist and hips similar in width",
    ar: "الكتفين والخصر والأرداف متشابهة في العرض",
  },

  // Fit preferences
  tight: {
    en: "Tight - I prefer form-fitting clothes",
    ar: "ضيق - أفضل الملابس التي تناسب شكل الجسم",
  },
  regular: {
    en: "Regular - I prefer a standard fit",
    ar: "عادي - أفضل المقاس القياسي",
  },
  loose: {
    en: "Loose - I prefer roomier, more relaxed fits",
    ar: "فضفاض - أفضل المقاسات الأكثر راحة واتساعًا",
  },

  // Previous experience
  previousSizeQuestion: {
    en: "If you've purchased from COLLAR & BOW before, what size typically fits you best?",
    ar: "إذا كنت قد اشتريت من كولار آند بو من قبل، ما هو المقاس الذي يناسبك عادة؟",
  },
  selectSize: {
    en: "Select your usual COLLAR & BOW size",
    ar: "اختاري مقاسك المعتاد من كولار آند بو",
  },
  noPreviousPurchase: {
    en: "I haven't shopped at COLLAR & BOW before",
    ar: "لم أتسوق من كولار آند بو من قبل",
  },

  // Body proportions
  shoulderWidth: {
    en: "Shoulder Width",
    ar: "عرض الكتفين",
  },
  hipWidth: {
    en: "Hip Width",
    ar: "عرض الأرداف",
  },
  narrow: {
    en: "Narrow",
    ar: "ضيق",
  },
  average: {
    en: "Average",
    ar: "متوسط",
  },
  broad: {
    en: "Broad",
    ar: "عريض",
  },
  wide: {
    en: "Wide",
    ar: "واسع",
  },

  // Results
  yourRecommendedSize: {
    en: "Your Recommended Size",
    ar: "المقاس الموصى به لك",
  },
  collarAndBowSize: {
    en: "COLLAR & BOW Size",
    ar: "مقاس كولار آند بو",
  },
  usSize: {
    en: "US Size",
    ar: "المقاس الأمريكي",
  },
  ukSize: {
    en: "UK Size",
    ar: "المقاس البريطاني",
  },
  euSize: {
    en: "EU Size",
    ar: "المقاس الأوروبي",
  },
  sizingTip: {
    en: "Sizing Tip",
    ar: "نصيحة للمقاس",
  },
  sizingTipText: {
    en: "COLLAR & BOW tends to follow European sizing standards. If you're between sizes or prefer a more comfortable fit, consider sizing up.",
    ar: "تتبع كولار آند بو معايير المقاسات الأوروبية. إذا كنت بين مقاسين أو تفضلين مقاسًا أكثر راحة، فكري في اختيار المقاس الأكبر.",
  },
  startOver: {
    en: "Start Over",
    ar: "البدء من جديد",
  },
  popularChoice: {
    en: "Popular Choice",
    ar: "الاختيار الشائع",
  },
  ofCustomers: {
    en: "of customers with similar measurements choose this size",
    ar: "من العملاء ذوي القياسات المماثلة يختارون هذا المقاس",
  },
  alternativeSize: {
    en: "Alternative Size",
    ar: "مقاس بديل",
  },

  // Navigation
  back: {
    en: "Back",
    ar: "رجوع",
  },
  next: {
    en: "Next",
    ar: "التالي",
  },
  getMySize: {
    en: "Get My Size",
    ar: "احصل على مقاسي",
  },

  // Size chart
  selectGarmentType: {
    en: "Select garment type",
    ar: "اختر نوع الملابس",
  },
  shirtsBlazers: {
    en: "Shirts & Blazers",
    ar: "القمصان والبليزر",
  },
  bottomsPants: {
    en: "Bottoms & Pants",
    ar: "البناطيل والسراويل",
  },
  dressesJumpsuits: {
    en: "Dresses & Jumpsuits",
    ar: "الفساتين والأفرولات",
  },
  centimeters: {
    en: "Centimeters",
    ar: "سنتيمتر",
  },
  inches: {
    en: "Inches",
    ar: "إنش",
  },
  bust: {
    en: "Bust",
    ar: "الصدر",
  },
  waist: {
    en: "Waist",
    ar: "الخصر",
  },
  hips: {
    en: "Hips",
    ar: "الأرداف",
  },
  fitted: {
    en: "Fitted",
    ar: "ضيق",
  },
  regularFit: {
    en: "Regular",
    ar: "عادي",
  },
  oversize: {
    en: "Oversize",
    ar: "واسع",
  },

  // Size chart notes
  sizingNotes: {
    en: "COLLAR & BOW Sizing Notes",
    ar: "ملاحظات مقاسات كولار آند بو",
  },
  sizingNote1: {
    en: "Our sizing follows European standards",
    ar: "تتبع مقاساتنا المعايير الأوروبية",
  },
  sizingNote2: {
    en: "Measurements may vary slightly between different styles and collections",
    ar: "قد تختلف القياسات قليلاً بين الأنماط والمجموعات المختلفة",
  },
  sizingNote3: {
    en: "For fitted items, consider sizing up if you're between sizes",
    ar: "بالنسبة للقطع الضيقة، فكر في اختيار مقاس أكبر إذا كنت بين مقاسين",
  },
  sizingNote4: {
    en: "Our premium collection typically has a more tailored fit",
    ar: "عادة ما تتميز مجموعتنا الفاخرة بمقاس أكثر تفصيلاً",
  },
  sizingNote5: {
    en: "Temperature and time of day can affect your measurements",
    ar: "يمكن أن تؤثر درجة الحرارة ووقت اليوم على قياساتك",
  },
  fittedDesc: {
    en: "Clothes that hug the body closely",
    ar: "ملابس ضيقة تظهر تفاصيل الجسم",
  },
  regularFitDesc: {
    en: "Standard comfortable fit",
    ar: "ملابس بمقاس عادي مريح",
  },
  oversizeDesc: {
    en: "Loose, relaxed fit clothing",
    ar: "ملابس واسعة وفضفاضة",
  },

  // Language
  english: {
    en: "English",
    ar: "الإنجليزية",
  },
  arabic: {
    en: "العربية",
    ar: "العربية",
  },

  // Size descriptions
  xxsDescription: {
    en: "Best for petite frames with smaller bust measurements",
    ar: "الأفضل للأجسام الصغيرة مع قياسات صدر أصغر",
  },
  xsDescription: {
    en: "Ideal for slender builds with smaller proportions",
    ar: "مثالي للبنية النحيلة ذات النسب الأصغر",
  },
  sDescription: {
    en: "Perfect for smaller frames with proportional measurements",
    ar: "مثالي للأجسام الأصغر ذات القياسات المتناسبة",
  },
  mDescription: {
    en: "Our most common size, fits average body proportions",
    ar: "مقاسنا الأكثر شيوعًا، يناسب نسب الجسم المتوسطة",
  },
  lDescription: {
    en: "Designed for fuller figures with more generous proportions",
    ar: "مصمم للأجسام الممتلئة ذات النسب الأكثر سخاء",
  },
  xlDescription: {
    en: "Comfortable fit for larger frames with fuller bust",
    ar: "مقاس مريح للأجسام الأكبر مع صدر أكثر امتلاءً",
  },
  xxlDescription: {
    en: "Our most generous size for maximum comfort",
    ar: "مقاسنا الأكثر سخاءً لأقصى قدر من الراحة",
  },
  sizeFinder: {
    en: "Size Finder",
    ar: "محدد المقاس",
  },
  size: {
    en: "Size",
    ar: "المقاس",
  },
  // Add the shopNow translation
  shopNow: {
    en: "Shop Now",
    ar: "تسوق الآن",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRtl: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  const isRtl = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
