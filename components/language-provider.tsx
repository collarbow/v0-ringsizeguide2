"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string
  isRtl: boolean
}

const translations = {
  en: {
    // General
    English: "English",
    Arabic: "Arabic",
    Size: "Size",
    "US Size": "US Size",
    "UK Size": "UK Size",
    "EU Size": "EU Size",
    "FR Size": "FR Size",
    "IT Size": "IT Size",
    "AU Size": "AU Size",
    "JP Size": "JP Size",
    "KR Size": "KR Size",
    "CN Size": "CN Size",
    "INT Size": "INT Size",
    "Collar And Bow Size": "Collar And Bow Size",
    "All Rights Reserved": "All Rights Reserved",

    // Size Chart
    "Size Chart": "Size Chart",
    Tops: "Tops",
    Bottoms: "Bottoms",
    Dresses: "Dresses",
    Outerwear: "Outerwear",
    Swimwear: "Swimwear",
    Lingerie: "Lingerie",
    Accessories: "Accessories",
    Shoes: "Shoes",
    "Select Garment Type": "Select Garment Type",
    Centimeters: "Centimeters",
    Inches: "Inches",
    "Sizing Notes": "Sizing Notes",
    "Sizing Note 1": "Measurements are body measurements, not garment measurements.",
    "Sizing Note 2": "If you are between sizes, we recommend sizing up.",
    "Sizing Note 3": "Our models typically wear size S or M.",
    "Sizing Note 4": "Measurements may vary slightly between styles.",
    "Sizing Note 5": "For a more relaxed fit, consider sizing up.",
    "Fit Type Explanation": "Fit Type Explanation",
    "Fitted Desc": "Close to the body with minimal room for layering.",
    "Regular Fit Desc": "Standard fit with moderate room for comfort.",
    "Oversize Desc": "Loose fit with extra room for a relaxed silhouette.",

    // Measurements
    Bust: "Bust",
    "Body Bust": "Body Bust",
    Waist: "Waist",
    Hips: "Hips",
    Inseam: "Inseam",
    Shoulder: "Shoulder",
    Sleeve: "Sleeve",

    // Size Finder
    "Size Finder": "Size Finder",
    "Size Finder Quiz": "Size Finder Quiz",
    "Quick Size Finder": "Quick Size Finder",
    "Find Your Size": "Find Your Size",
    "Your Measurements": "Your Measurements",
    "Your Recommended Size": "Your Recommended Size",
    "Start Over": "Start Over",
    "Share This Size Finder": "Share This Size Finder",
    "Size Tech Powered By": "Size Finder Technology Powered By Fit Analytics Innovation GmbH",

    // Gender & Age
    "Gender & Age": "Gender & Age",
    Women: "Women",
    Men: "Men",
    Kids: "Kids",

    // Body Shape
    "Body Shape": "Body Shape",
    "Body Type": "Body Type",
    "Belly Shape": "Belly Shape",
    "Belly Shape Desc": "Select the shape that most closely resembles your belly",
    "Hip Shape": "Hip Shape",
    "Hip Shape Desc": "Select the shape that most closely resembles your hips",

    // Height & Weight
    "Height & Weight": "Height & Weight",
    "Height & Weight Desc": "Enter your height and weight for a more accurate recommendation",
    Height: "Height",
    Weight: "Weight",

    // Waist & Hips
    "Waist & Hips": "Waist & Hips",
    "Waist & Hips Desc": "Enter your waist and hip measurements for a more accurate recommendation",

    // Bra Size
    "Bra Size": "Bra Size",
    "Bra Size Desc": "Select your bra size for a more accurate top size recommendation",
    "Band Size": "Band Size",
    "Cup Size": "Cup Size",

    // Fit Preference
    "Fit Preference": "Fit Preference",
    "Fit Preference Desc": "Select your preferred fit for this type of garment",
    Tight: "Tight",
    Regular: "Regular",
    Loose: "Loose",

    // Garment Types
    "Garment Type": "Garment Type",
    "Garment Type Desc": "Select the type of garment you're shopping for",
    "Garment Type Question": "What type of garment are you shopping for?",
    "Shirts & Blazers": "Shirts & Blazers",
    "Bottoms & Pants": "Bottoms & Pants",
    "Dresses & Jumpsuits": "Dresses & Jumpsuits",
    "Choose the type of garment you're looking to size": "Choose the type of garment you're looking to size",
    "Shirts, Blouses, T-shirts": "Shirts, Blouses, T-shirts",
    "Pants, Skirts, Shorts": "Pants, Skirts, Shorts",
    "Dresses, Jumpsuits": "Dresses, Jumpsuits",

    // Results
    "Popular Choice": "Popular Choice",
    "Alternative Size": "Alternative Size",
    "of Customers": "of customers with similar measurements choose this size",
    "For Garment Type": "For",

    // Tips
    "Sizing Tip": "Sizing Tip",
    "Sizing Tip Text": "If you're between sizes or prefer a looser fit, we recommend sizing up.",

    // Actions
    "Get My Size": "Get My Size",
    "Skip This Step": "Skip This Step",
    Next: "Next",
    Back: "Back",
    Skip: "Skip",

    // Misc
    Optional: "Optional",
    cm: "cm",
    inches: "inches",
    kg: "kg",
    lbs: "lbs",

    // Fit Types
    Fitted: "Fitted",
    "Regular Fit": "Regular Fit",
    Oversize: "Oversize",
    "Slim Fit": "Slim Fit",
    "Relaxed Fit": "Relaxed Fit",
    "Oversized Fit": "Oversized Fit",

    // Fit Preference Brief Descriptions
    "Slim Fit Brief": "Slim Fit",
    "Regular Fit Brief": "Regular Fit",
    "Relaxed Fit Brief": "Relaxed Fit",
    "Oversized Fit Brief": "Oversized Fit",

    // Social Share
    "Share Your Size": "Share Your Size",
    "Copy Link": "Copy Link",
    "Link Copied": "Link Copied!",
    "Link Copied Desc": "The link has been copied to your clipboard.",
    "Share On Facebook": "Share on Facebook",
    "Share On Twitter": "Share on Twitter",
    "Share On Instagram": "Share on Instagram",
    "Share On LinkedIn": "Share on LinkedIn",
    "Share Text": "Check out this size finder tool from COLLAR & BOW!",

    // Privacy
    "Powered By": "Size Finder Technology Powered By",
    "Privacy Policy": "Privacy Policy",

    // Hip Shapes
    Straighter: "Straighter",
    Average: "Average",
    Wider: "Wider",

    // Belly Shapes
    Flatter: "Flatter",
    Curvier: "Curvier",

    // Bra Size
    "Select Sizing System": "Select Sizing System",
    "Select Band": "Select Band",
    "Select Cup": "Select Cup",
    "Selected Size": "Selected Size",
    Clear: "Clear",
    "Bra Size Note": "Bra sizes can vary between brands. This is an estimate based on your measurements.",

    // Fit Type
    "Fit Type": "Fit Type",
    "Shop Now": "Shop Now",

    // For garment specific finder
    "Waist Measurement": "Waist Measurement",
    "Hip Measurement": "Hip Measurement",
    "Enter Waist": "Enter your waist measurement",
    "Enter Hips": "Enter your hip measurement",
    "Waist Instructions": "Measure around the narrowest part of your waist",
    "Hip Instructions": "Measure around the fullest part of your hips",
    "Based On Measurements": "Based on your measurements",
    Recalculate: "Recalculate",
    "Your Size Is": "Your size is",
    "Enter bust measurement": "Enter your bust measurement",
    "Bust Measurement": "Bust Measurement",
    "Measurement Unit": "Measurement Unit",
    "Find your perfect size in just a few steps": "Find your perfect size in just a few steps",
    "Please provide your bust measurement and fit preference.":
      "Please provide your bust measurement and fit preference.",
    "Please provide your waist measurement.": "Please provide your waist measurement.",
    "Calculating...": "Calculating...",
    confidence: "confidence",
    Selected: "Selected",
    "Failed to calculate size. Please try again.": "Failed to calculate size. Please try again.",

    // Size descriptions
    "XXS Description": "Extra Extra Small",
    "XS Description": "Extra Small",
    "S Description": "Small",
    "M Description": "Medium",
    "L Description": "Large",
    "XL Description": "Extra Large",
    "XXL Description": "Extra Extra Large",

    // Fit preference questions and detailed descriptions
    "Fit Preference Question": "How do you prefer your clothes to fit?",
    "Very Tight": "Slim Fit",
    "Slightly Tight": "Regular Fit",
    "Average Fit": "Relaxed Fit",
    "Slightly Loose": "Oversized Fit",
    "Very Loose": "Oversized Fit",

    // Body shape questions
    "Belly Shape Question": "Which shape most closely resembles your belly?",
    "Hip Shape Question": "Which shape most closely resembles your hips?",

    // Guide
    "Size Finder Guide": "Size Finder Guide",
    "Guide Text":
      "Find your perfect fit by answering a few simple questions about your body shape and preferences. The more information you provide, the more accurate our recommendation will be. You can skip any question if you're unsure.",

    // Swipe instructions
    "Swipe To View": "Swipe to view all sizes",

    // Additional translations
    "Please select your age range": "Please select your age range",
    years: "years",
    "Please provide your bra size or height and weight to get an accurate recommendation":
      "Please provide your bra size or height and weight to get an accurate recommendation",
    "Please provide your waist/hip measurements or body shape information":
      "Please provide your waist/hip measurements or body shape information",
    "Please provide your measurements or body shape information for an accurate dress size":
      "Please provide your measurements or body shape information for an accurate dress size",
    "Looks like you are size": "Looks like you are size",
    "A few more questions to be sure": "A few more questions to be sure",
    "Primary measurement used for your size recommendation": "Primary measurement used for your size recommendation",
    "Body Measurements": "Body Measurements",
    "Garment Measurements": "Garment Measurements",
    "Your Body Measurements": "Your Body Measurements",
    "These are the actual measurements of the garment in size":
      "These are the actual measurements of the garment in size",
    "Combined Measurements": "Combined Measurements",
    "Fitted garments are designed to be close to the body": "Fitted garments are designed to be close to the body",
    "Regular fit provides a comfortable balance between fitted and loose":
      "Regular fit provides a comfortable balance between fitted and loose",
    "Oversized garments provide a looser, more relaxed fit": "Oversized garments provide a looser, more relaxed fit",
    "Age Selection Desc": "Please select your age range for better size recommendations",
    "Share Text": "Check out this amazing size finder tool!",
    "Link Copied": "Link Copied!",
    "Link Copied Desc": "The link has been copied to your clipboard.",
    "Get Size": "Get Size",
    Step: "Step",
    of: "of",

    // Fit Type Guide translations
    "Fit Type Guide": "Fit Type Guide",
    "Understanding different fit types and how they affect garment measurements":
      "Understanding different fit types and how they affect garment measurements",
    "Fit Descriptions": "Fit Descriptions",
    "Bust Measurements": "Bust Measurements",
    Ease: "Ease",
    Only: "Only",
    "added to your body bust measurement": "added to your body bust measurement",
    "Slim Fit Description":
      "Slim Fit garments are designed to follow the contours of your body closely. They provide a sleek, tailored appearance with minimal excess fabric. Ideal for a modern, streamlined silhouette.",
    "Regular Fit Description":
      "Regular Fit garments offer a balanced cut that's neither too tight nor too loose. They provide comfortable movement while maintaining a neat appearance. Suitable for most body types and occasions.",
    "Relaxed Fit Description":
      "Relaxed Fit garments provide extra room throughout for enhanced comfort and freedom of movement. They drape loosely on the body without being oversized. Perfect for casual, everyday wear.",
    "Oversized Fit Description":
      "Oversized Fit garments are intentionally cut much larger than standard sizing. They create a bold, fashion-forward silhouette with maximum comfort. Ideal for creating layered looks or a contemporary street style aesthetic.",
    "How to Use This Chart": "How to Use This Chart",
    "Measure your bust at the fullest point": "Measure your bust at the fullest point",
    "Find your body bust measurement in the second column": "Find your body bust measurement in the second column",
    "Choose your preferred fit type based on how you want the garment to feel":
      "Choose your preferred fit type based on how you want the garment to feel",
    "The number in the corresponding column shows how large the garment will be":
      "The number in the corresponding column shows how large the garment will be",
    "view detailed fit guide": "View detailed fit guide",
    "Fit Guide": "Fit Guide",

    // Body shape translations
    "Flatter Belly": "Flatter Belly",
    "Average Belly": "Average Belly",
    "Curvier Belly": "Curvier Belly",
    "Straighter Hips": "Straighter Hips",
    "Average Hips": "Average Hips",
    "Wider Hips": "Wider Hips",
    "Less defined curves, more athletic build": "Less defined curves, more athletic build",
    "Balanced proportions": "Balanced proportions",
    "More defined waist-to-hip ratio": "More defined waist-to-hip ratio",
    "Fitted, close to body": "Fitted, close to body",
    "Standard, not too tight or loose": "Standard, not too tight or loose",
    "Relaxed, roomier": "Relaxed, roomier",
    "Select the option that best describes your body shape": "Select the option that best describes your body shape",
  },
  ar: {
    // General
    English: "الإنجليزية",
    Arabic: "العربية",
    Size: "المقاس",
    "US Size": "المقاس الأمريكي",
    "UK Size": "المقاس البريطاني",
    "EU Size": "المقاس الأوروبي",
    "FR Size": "المقاس الفرنسي",
    "IT Size": "المقاس الإيطالي",
    "AU Size": "المقاس الأسترالي",
    "JP Size": "المقاس الياباني",
    "KR Size": "المقاس الكوري",
    "CN Size": "المقاس الصيني",
    "INT Size": "المقاس العالمي",
    "Collar And Bow Size": "مقاس كولار آند بو",
    "All Rights Reserved": "جميع الحقوق محفوظة",
    Unit: "الوحدة",

    // Size Chart
    "Size Chart": "جدول المقاسات",
    Tops: "الملابس العلوية",
    Bottoms: "الملابس السفلية",
    Dresses: "الفساتين",
    Outerwear: "الملابس الخارجية",
    Swimwear: "ملابس السباحة",
    Lingerie: "الملابس الداخلية",
    Accessories: "الإكسسوارات",
    Shoes: "الأحذية",
    "Select Garment Type": "اختر نوع الملابس",
    Centimeters: "سنتيمترات",
    Inches: "بوصات",
    "Sizing Notes": "ملاحظات المقاسات",
    "Sizing Note 1": "القياسات هي قياسات الجسم، وليست قياسات الملابس.",
    "Sizing Note 2": "إذا كنت بين مقاسين، نوصي باختيار المقاس الأكبر.",
    "Sizing Note 3": "عارضاتنا عادة ما يرتدين مقاس S أو M.",
    "Sizing Note 4": "قد تختلف القياسات قليلاً بين الأنماط المختلفة.",
    "Sizing Note 5": "للحصول على مقاس أكثر راحة، يمكنك اختيار مقاس أكبر.",
    "Fit Type Explanation": "شرح أنواع المقاسات",
    "Fitted Desc": "قريب من الجسم مع مساحة قليلة للطبقات.",
    "Regular Fit Desc": "مقاس قياسي مع مساحة معتدلة للراحة.",
    "Oversize Desc": "مقاس فضفاض مع مساحة إضافية لمظهر مريح.",
    "Body measurements are your actual body measurements. Garment measurements are the actual garment dimensions.":
      "قياسات الجسم هي قياساتك الفعلية. قياسات الملابس هي الأبعاد الفعلية للملابس.",
    "Garment Bust": "صدر الملابس",
    "Garment Waist": "خصر الملابس",
    "Garment Hip": "ورك الملابس",
    "Body Waist": "خصر الجسم",
    "Body Hip": "ورك الجسم",

    // Measurements
    Bust: "محيط الصدر",
    "Body Bust": "محيط صدر الجسم",
    Waist: "محيط الخصر",
    waist: "الخصر",
    Hips: "محيط الورك",
    Hip: "الورك",
    Inseam: "طول الساق الداخلي",
    Shoulder: "عرض الكتف",
    Sleeve: "طول الكم",

    // Size Finder
    "Size Finder": "محدد المقاس",
    "Size Finder Quiz": "اختبار تحديد المقاس",
    "Quick Size Finder": "محدد المقاس السريع",
    "Find Your Size": "اعثر على مقاسك",
    "Your Measurements": "قياساتك",
    "Your Recommended Size": "المقاس الموصى به",
    "Start Over": "البدء من جديد",
    "Share This Size Finder": "شارك محدد المقاس هذا",
    "Size Tech Powered By": "تقنية تحديد المقاس مدعومة من فيت أناليتكس إنوفيشن",

    // Gender & Age
    "Gender & Age": "الجنس والعمر",
    Women: "نساء",
    Men: "رجال",
    Kids: "أطفال",
    Age: "العمر",

    // Body Shape
    "Body Shape": "شكل الجسم",
    "Body Type": "نوع الجسم",
    "Belly Shape": "شكل البطن",
    "Belly Shape Desc": "اختر الشكل الذي يشبه بطنك أكثر",
    "Hip Shape": "شكل الورك",
    "Hip Shape Desc": "اختر الشكل الذي يشبه وركيك أكثر",

    // Height & Weight
    "Height & Weight": "الطول والوزن",
    "Height & Weight Desc": "أدخل طولك ووزنك للحصول على توصية أكثر دقة",
    Height: "الطول",
    Weight: "الوزن",

    // Waist & Hips
    "Waist & Hips": "الخصر والورك",
    "Waist & Hips Desc": "أدخل قياسات خصرك ووركك للحصول على توصية أكثر دقة",

    // Bra Size
    "Bra Size": "مقاس حمالة الصدر",
    "Bra Size Desc": "اختر مقاس حمالة الصدر للحصول على توصية أكثر دقة للملابس العلوية",
    "Band Size": "مقاس الحزام",
    "Cup Size": "مقاس الكأس",

    // Fit Preference
    "Fit Preference": "تفضيل المقاس",
    "Fit Preference Desc": "اختر المقاس المفضل لديك لهذا النوع من الملابس",
    Tight: "ضيق",
    Regular: "عادي",
    Loose: "فضفاض",
    fit: "مقاس",

    // Garment Types
    "Garment Type": "نوع الملابس",
    "Garment Type Desc": "اختر نوع الملابس التي تتسوق من أجلها",
    "Garment Type Question": "ما نوع الملابس التي تتسوق من أجلها؟",
    "Shirts & Blazers": "القمصان والبليزرات",
    "Bottoms & Pants": "البناطيل والسراويل",
    "Dresses & Jumpsuits": "الفساتين والأفرولات",
    "Choose the type of garment you're looking to size": "اختر نوع الملابس التي تريد تحديد مقاسها",
    "Shirts, Blouses, T-shirts": "القمصان، البلوزات، التيشيرتات",
    "Pants, Skirts, Shorts": "البناطيل، التنانير، الشورتات",
    "Dresses, Jumpsuits": "الفساتين، الجمبسوت",

    // Results
    "Popular Choice": "الاختيار الشائع",
    "Alternative Size": "المقاس البديل",
    "of Customers": "من العملاء ذوي القياسات المماثلة يختارون هذا المقاس",
    "For Garment Type": "لـ",
    For: "لـ",

    // Tips
    "Sizing Tip": "نصيحة المقاس",
    "Sizing Tip Text": "إذا كنت بين مقاسين أو تفضل مقاسًا أكثر راحة، نوصي باختيار المقاس الأكبر.",

    // Actions
    "Get My Size": "احصل على مقاسي",
    "Skip This Step": "تخطي هذه الخطوة",
    Next: "التالي",
    Back: "السابق",
    Skip: "تخطي",
    "Get Recommended Size": "احصل على المقاس الموصى به",

    // Misc
    Optional: "اختياري",
    cm: "سم",
    inches: "بوصة",
    kg: "كجم",
    lbs: "رطل",

    // Fit Types
    Fitted: "ضيق",
    "Regular Fit": "مقاس عادي",
    Oversize: "واسع",
    "Slim Fit": "مقاس ضيق",
    "Relaxed Fit": "مقاس مريح",
    "Oversized Fit": "مقاس واسع",

    // Fit Preference Brief Descriptions - Arabic
    "Slim Fit Brief": "مقاس ضيق",
    "Regular Fit Brief": "مقاس عادي",
    "Relaxed Fit Brief": "مقاس مريح",
    "Oversized Fit Brief": "مقاس واسع",

    // Detailed Fit Descriptions
    "Slim Fit garments are designed to follow the contours of your body closely. They provide a sleek, tailored appearance with minimal excess fabric. Ideal for a modern, streamlined silhouette.":
      "الملابس ذات المقاس الضيق مصممة لتتبع خطوط جسمك بشكل وثيق. توفر مظهراً أنيقاً ومفصلاً مع الحد الأدنى من القماش الزائد. مثالية للحصول على مظهر عصري ومبسط.",
    "Regular Fit garments offer a balanced cut that's neither too tight nor too loose. They provide comfortable movement while maintaining a neat appearance. Suitable for most body types and occasions.":
      "الملابس ذات المقاس العادي توفر قصة متوازنة ليست ضيقة جداً ولا فضفاضة جداً. توفر حركة مريحة مع الحفاظ على مظهر أنيق. مناسبة لمعظم أنواع الجسم والمناسبات.",
    "Relaxed Fit garments provide extra room throughout for enhanced comfort and freedom of movement. They drape loosely on the body without being oversized. Perfect for casual, everyday wear.":
      "الملابس ذات المقاس المريح توفر مساحة إضافية في جميع الأنحاء لتعزيز الراحة وحرية الحركة. تتدلى بشكل فضفاض على الجسم دون أن تكون واسعة جداً. مثالية للارتداء اليومي غير الرسمي.",
    "Oversized Fit garments are intentionally cut much larger than standard sizing. They create a bold, fashion-forward silhouette with maximum comfort. Ideal for creating layered looks or a contemporary street style aesthetic.":
      "الملابس ذات المقاس الواسع مقطوعة عمداً بحجم أكبر بكثير من المقاسات القياسية. تخلق مظهراً جريئاً وعصرياً مع أقصى درجات الراحة. مثالية لإنشاء إطلالات متعددة الطبقات أو مظهر الشارع المعاصر.",

    // Fit Descriptions for Size Chart
    "Slim Fit Desc": "مقاس ضيق - يتبع خطوط الجسم بشكل وثيق مع الحد الأدنى من القماش الزائد",
    "Regular Fit Desc": "مقاس عادي - توازن مريح بين الضيق والفضفاض مع حرية حركة جيدة",
    "Relaxed Fit Desc": "مقاس مريح - مساحة إضافية للراحة وحرية الحركة مع مظهر فضفاض",
    "Oversized Fit Desc": "مقاس واسع - مقطوع بحجم أكبر من المعتاد لمظهر عصري وراحة قصوى",

    // Social Share
    "Share Your Size": "شارك مقاسك",
    "Copy Link": "نسخ الرابط",
    "Link Copied": "تم نسخ الرابط!",
    "Link Copied Desc": "تم نسخ الرابط إلى الحافظة الخاصة بك.",
    "Share On Facebook": "مشاركة على فيسبوك",
    "Share On Twitter": "مشاركة على تويتر",
    "Share On Instagram": "مشاركة على انستغرام",
    "Share On LinkedIn": "مشاركة على لينكد إن",
    "Share Text": "تحقق من أداة مكتشف المقاسات من كولار آند بو!",

    // Privacy
    "Powered By": "تقنية محدد المقاس مدعومة من",
    "Privacy Policy": "سياسة الخصوصية",

    // Hip Shapes
    Straighter: "مستقيم",
    Average: "متوسط",
    Wider: "أوسع",

    // Belly Shapes
    Flatter: "مسطح",
    Curvier: "مستدير",

    // Bra Size
    "Select Sizing System": "اختر نظام المقاسات",
    "Select Band": "اختر مقاس الحزام",
    "Select Cup": "اختر مقاس الكأس",
    "Selected Size": "المقاس المختار",
    Clear: "مسح",
    "Bra Size Note": "قد تختلف مقاسات حمالة الصدر بين العلامات التجارية. هذا تقدير بناءً على قياساتك.",

    // Fit Type
    "Fit Type": "نوع المقاس",
    "Shop Now": "تسوق الآن",

    // For garment specific finder
    "Waist Measurement": "قياس الخصر",
    "Hip Measurement": "قياس الورك",
    "Enter Waist": "أدخل قياس خصرك",
    "Enter Hips": "أدخل قياس وركك",
    "Waist Instructions": "قم بالقياس حول أضيق جزء من خصرك",
    "Hip Instructions": "قم بالقياس حول أكمل جزء من وركك",
    "Based On Measurements": "بناءً على قياساتك",
    Recalculate: "إعادة الحساب",
    "Your Size Is": "مقاسك هو",
    "Enter bust measurement": "أدخل قياس صدرك",
    "Bust Measurement": "قياس الصدر",
    "Measurement Unit": "وحدة القياس",
    "Find your perfect size in just a few steps": "اعثر على مقاسك المثالي في خطوات بسيطة",
    "Please provide your bust measurement and fit preference.": "يرجى تقديم قياس صدرك وتفضيل المقاس.",
    "Please provide your waist measurement.": "يرجى تقديم قياس خصرك.",
    "Calculating...": "جاري الحساب...",
    confidence: "نسبة الثقة",
    Selected: "مختار",
    "Failed to calculate size. Please try again.": "فشل في حساب المقاس. يرجى المحاولة مرة أخرى.",
    "API error": "خطأ في النظام",
    "An unknown error occurred": "حدث خطأ غير معروف",
    Category: "الفئة",
    "Select category": "اختر الفئة",

    // Size descriptions
    "XXS Description": "صغير جداً جداً",
    "XS Description": "صغير جداً",
    "S Description": "صغير",
    "M Description": "متوسط",
    "L Description": "كبير",
    "XL Description": "كبير جداً",
    "XXL Description": "كبير جداً جداً",

    // Fit preference questions and detailed descriptions - Arabic
    "Fit Preference Question": "كيف تفضل أن تكون ملابسك؟",
    "Very Tight": "مقاس ضيق",
    "Slightly Tight": "مقاس عادي",
    "Average Fit": "مقاس مريح",
    "Slightly Loose": "مقاس واسع",
    "Very Loose": "مقاس واسع",

    // Body shape questions
    "Belly Shape Question": "أي شكل يشبه بطنك أكثر؟",
    "Hip Shape Question": "أي شكل يشبه وركيك أكثر؟",

    // Guide
    "Size Finder Guide": "دليل محدد المقاس",
    "Guide Text":
      "اعثر على مقاسك المثالي من خلال الإجابة على بعض الأسئلة البسيطة حول شكل جسمك وتفضيلاتك. كلما قدمت معلومات أكثر، كانت توصيتنا أكثر دقة. يمكنك تخطي أي سؤال إذا كنت غير متأكد.",

    // Swipe instructions
    "Swipe To View": "اسحب لعرض جميع المقاسات",

    // Additional translations
    "Please select your age range": "يرجى اختيار الفئة العمرية",
    years: "سنة",
    "Please provide your bra size or height and weight to get an accurate recommendation":
      "يرجى تقديم مقاس حمالة الصدر أو الطول والوزن للحصول على توصية دقيقة",
    "Please provide your waist/hip measurements or body shape information":
      "يرجى تقديم قياسات الخصر/الورك أو معلومات شكل الجسم",
    "Please provide your measurements or body shape information for an accurate dress size":
      "يرجى تقديم قياساتك أو معلومات شكل الجسم للحصول على مقاس فستان دقيق",
    "Looks like you are size": "يبدو أن مقاسك هو",
    "A few more questions to be sure": "بعض الأسئلة الإضافية للتأكد",
    "Primary measurement used for your size recommendation": "القياس الأساسي المستخدم لتوصية مقاسك",
    "Body Measurements": "قياسات الجسم",
    "Garment Measurements": "قياسات الملابس",
    "Your Body Measurements": "قياسات جسمك",
    "These are the actual measurements of the garment in size": "هذه هي القياسات الفعلية للملابس بمقاس",
    "Combined Measurements": "القياسات المجمعة",
    "Fitted garments are designed to be close to the body": "الملابس الضيقة مصممة لتكون قريبة من الجسم",
    "Regular fit provides a comfortable balance between fitted and loose":
      "المقاس العادي يوفر توازناً مريحاً بين الضيق والفضفاض",
    "Oversized garments provide a looser, more relaxed fit": "الملابس الواسعة توفر مقاساً أكثر فضفاضة ومريحة",
    "Age Selection Desc": "يرجى اختيار الفئة العمرية للحصول على توصيات مقاس أفضل",
    "Share Text": "تحقق من أداة محدد المقاسات الرائعة هذه!",
    "Link Copied": "تم نسخ الرابط!",
    "Link Copied Desc": "تم نسخ الرابط إلى الحافظة الخاصة بك.",
    "Get Size": "احصل على المقاس",
    Step: "الخطوة",
    of: "من",

    // Fit Type Guide translations - Arabic
    "Fit Type Guide": "دليل أنواع المقاسات",
    "Understanding different fit types and how they affect garment measurements":
      "فهم أنواع المقاسات المختلفة وكيف تؤثر على قياسات الملابس",
    "Fit Descriptions": "وصف المقاسات",
    "Bust Measurements": "قياسات الصدر",
    Ease: "المساحة الإضافية",
    Only: "فقط",
    "added to your body bust measurement": "مضاف إلى قياس صدرك",
    "Slim Fit Description":
      "الملابس ذات المقاس الضيق مصممة لتتبع خطوط جسمك بشكل وثيق. توفر مظهراً أنيقاً ومفصلاً مع الحد الأدنى من القماش الزائد. مثالية للحصول على مظهر عصري ومبسط.",
    "Regular Fit Description":
      "الملابس ذات المقاس العادي توفر قصة متوازنة ليست ضيقة جداً ولا فضفاضة جداً. توفر حركة مريحة مع الحفاظ على مظهر أنيق. مناسبة لمعظم أنواع الجسم والمناسبات.",
    "Relaxed Fit Description":
      "الملابس ذات المقاس المريح توفر مساحة إضافية في جميع الأنحاء لتعزيز الراحة وحرية الحركة. تتدلى بشكل فضفاض على الجسم دون أن تكون واسعة جداً. مثالية للارتداء اليومي غير الرسمي.",
    "Oversized Fit Description":
      "الملابس ذات المقاس الواسع مقطوعة عمداً بحجم أكبر بكثير من المقاسات القياسية. تخلق مظهراً جريئاً وعصرياً مع أقصى درجات الراحة. مثالية لإنشاء إطلالات متعددة الطبقات أو مظهر الشارع المعاصر.",
    "How to Use This Chart": "كيفية استخدام هذا الجدول",
    "Measure your bust at the fullest point": "قم بقياس صدرك في أكمل نقطة",
    "Find your body bust measurement in the second column": "ابحث عن قياس صدرك في العمود الثاني",
    "Choose your preferred fit type based on how you want the garment to feel":
      "اختر نوع المقاس المفضل بناءً على كيف تريد أن تشعر بالملابس",
    "The number in the corresponding column shows how large the garment will be":
      "الرقم في العمود المقابل يوضح حجم الملابس",
    "view detailed fit guide": "عرض دليل المقاسات التفصيلي",
    "Fit Guide": "دليل المقاسات",

    // Additional missing translations
    "Recommended Size": "المقاس الموصى به",
    "Based On Your Measurements": "بناءً على قياساتك",
    Quiz: "الاختبار",
    Quick: "السريع",
    Chart: "الجدول",
    "Please provide your bust measurement.": "يرجى تقديم قياس صدرك.",
    "Select fit": "اختر المقاس",
    "Select fit type": "اختر نوع المقاس",

    // Body shape translations
    "Flatter Belly": "بطن مسطح",
    "Average Belly": "بطن متوسط",
    "Curvier Belly": "بطن منحني",
    "Straighter Hips": "ورك مستقيم",
    "Average Hips": "ورك متوسط",
    "Wider Hips": "ورك عريض",
    "Less defined curves, more athletic build": "منحنيات أقل وضوحاً، بنية رياضية أكثر",
    "Balanced proportions": "نسب متوازنة",
    "More defined waist-to-hip ratio": "نسبة خصر إلى ورك أكثر وضوحاً",
    "Fitted, close to body": "ملتصقة، قريبة من الجسم",
    "Standard, not too tight or loose": "عادية، ليست ضيقة جداً أو واسعة",
    "Relaxed, roomier": "مريحة، أوسع",
    "Select the option that best describes your body shape": "اختر الخيار الذي يصف شكل جسمك بشكل أفضل",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>("en")

  const t = (key: string): string => {
    // First check if the key exists with spaces
    if (translations[language as keyof typeof translations]?.[key]) {
      return translations[language as keyof typeof translations][key]
    }

    // If not found, try to convert camelCase to spaced format
    const spacedKey = key.replace(/([A-Z])/g, " $1").trim()
    if (translations[language as keyof typeof translations]?.[spacedKey]) {
      return translations[language as keyof typeof translations][spacedKey]
    }

    // For backward compatibility, check if the key exists in lowercase with spaces
    const lowerSpacedKey = spacedKey.toLowerCase()
    const matchingKey = Object.keys(translations[language as keyof typeof translations]).find(
      (k) => k.toLowerCase() === lowerSpacedKey,
    )
    if (matchingKey) {
      return translations[language as keyof typeof translations][matchingKey]
    }

    // If still not found, return the key itself with proper spacing and capitalization
    return key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
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
