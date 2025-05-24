"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Ruler, Info } from "lucide-react"
import { GarmentIllustration } from "@/components/garment-illustrations"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"

type Step = {
  id: string
  titleKey: string
  descriptionKey: string
  optional?: boolean
}

type SizeResult = {
  collarAndBowSize: string
  usSize: string
  ukSize: string
  euSize: string
  descriptionKey: string
  popularity: number
  alternativeSize?: string
  alternativePopularity?: number
  measurements?: {
    bust: number
    waist: number
    hips: number
  }
  garmentMeasurements?: {
    bust: number
    waist: number
    hips: number
  }
  sizeDetails?: {
    primaryMeasurement: string
    measurementValue: number
    chartReference: any
    fitType: string
  }
}

// Size chart data with both body and garment measurements
const sizeChartData = {
  bottoms: {
    XXS: { waistBody: 60, hipBody: 86, waistGarment: 66, hipGarment: 92 },
    XS: { waistBody: 64, hipBody: 90, waistGarment: 70, hipGarment: 96 },
    S: { waistBody: 68, hipBody: 94, waistGarment: 74, hipGarment: 100 },
    M: { waistBody: 72, hipBody: 98, waistGarment: 78, hipGarment: 104 },
    L: { waistBody: 76, hipBody: 102, waistGarment: 82, hipGarment: 108 },
    XL: { waistBody: 80, hipBody: 106, waistGarment: 86, hipGarment: 112 },
    XXL: { waistBody: 84, hipBody: 110, waistGarment: 90, hipGarment: 116 },
  },
  tops: {
    XXS: { bustBody: 80, waistBody: 60, hipBody: 84, bustGarment: 86, waistGarment: 66, hipGarment: 90 },
    XS: { bustBody: 84, waistBody: 64, hipBody: 88, bustGarment: 90, waistGarment: 70, hipGarment: 94 },
    S: { bustBody: 88, waistBody: 68, hipBody: 92, bustGarment: 94, waistGarment: 74, hipGarment: 98 },
    M: { bustBody: 92, waistBody: 72, hipBody: 96, bustGarment: 98, waistGarment: 78, hipGarment: 102 },
    L: { bustBody: 96, waistBody: 76, hipBody: 100, bustGarment: 102, waistGarment: 82, hipGarment: 106 },
    XL: { bustBody: 100, waistBody: 80, hipBody: 104, bustGarment: 106, waistGarment: 86, hipGarment: 110 },
    XXL: { bustBody: 104, waistBody: 84, hipBody: 108, bustGarment: 110, waistGarment: 90, hipGarment: 114 },
  },
  dresses: {
    XXS: { bustBody: 80, waistBody: 62, hipBody: 86, bustGarment: 86, waistGarment: 64, hipGarment: 88 },
    XS: { bustBody: 84, waistBody: 66, hipBody: 90, bustGarment: 90, waistGarment: 68, hipGarment: 92 },
    S: { bustBody: 88, waistBody: 70, hipBody: 94, bustGarment: 94, waistGarment: 72, hipGarment: 96 },
    M: { bustBody: 92, waistBody: 74, hipBody: 98, bustGarment: 98, waistGarment: 76, hipGarment: 100 },
    L: { bustBody: 96, waistBody: 78, hipBody: 102, bustGarment: 102, waistGarment: 80, hipGarment: 104 },
    XL: { bustBody: 100, waistBody: 82, hipBody: 106, bustGarment: 106, waistGarment: 84, hipGarment: 108 },
    XXL: { bustBody: 104, waistBody: 86, hipBody: 110, bustGarment: 110, waistGarment: 88, hipGarment: 112 },
  },
  bust_fits: {
    "Slim Fit": {
      XXS: 82,
      XS: 86,
      S: 90,
      M: 94,
      L: 98,
      XL: 102,
      XXL: 106,
    },
    "Regular Fit": {
      XXS: 86,
      XS: 90,
      S: 94,
      M: 98,
      L: 102,
      XL: 106,
      XXL: 110,
    },
    "Relaxed Fit": {
      XXS: 88,
      XS: 92,
      S: 96,
      M: 100,
      L: 104,
      XL: 108,
      XXL: 112,
    },
    "Oversized Fit": {
      XXS: 90,
      XS: 94,
      S: 98,
      M: 102,
      L: 106,
      XL: 110,
      XXL: 114,
    },
  },
}

// Bra size conversion chart
const braSizeChart = {
  us: [
    "28A",
    "28B",
    "28C",
    "28D",
    "28DD",
    "28DDD",
    "30A",
    "30B",
    "30C",
    "30D",
    "30DD",
    "30DDD",
    "32A",
    "32B",
    "32C",
    "32D",
    "32DD",
    "32DDD",
    "34A",
    "34B",
    "34C",
    "34D",
    "34DD",
    "34DDD",
    "36A",
    "36B",
    "36C",
    "36D",
    "36DD",
    "36DDD",
    "38A",
    "38B",
    "38C",
    "38D",
    "38DD",
    "38DDD",
    "40A",
    "40B",
    "40C",
    "40D",
    "40DD",
    "40DDD",
    "42A",
    "42B",
    "42C",
    "42D",
    "42DD",
    "42DDD",
    "44A",
    "44B",
    "44C",
    "44D",
    "44DD",
    "44DDD",
    "46A",
    "46B",
    "46C",
    "46D",
    "46DD",
    "46DDD",
  ],
  uk: [
    "28A",
    "28B",
    "28C",
    "28D",
    "28DD",
    "28E",
    "30A",
    "30B",
    "30C",
    "30D",
    "30DD",
    "30E",
    "32A",
    "32B",
    "32C",
    "32D",
    "32DD",
    "32E",
    "34A",
    "34B",
    "34C",
    "34D",
    "34DD",
    "34E",
    "36A",
    "36B",
    "36C",
    "36D",
    "36DD",
    "36E",
    "38A",
    "38B",
    "38C",
    "38D",
    "38DD",
    "38E",
    "40A",
    "40B",
    "40C",
    "40D",
    "40DD",
    "40E",
    "42A",
    "42B",
    "42C",
    "42D",
    "42DD",
    "42E",
    "44A",
    "44B",
    "44C",
    "44D",
    "44DD",
    "44E",
    "46A",
    "46B",
    "46C",
    "46D",
    "46DD",
    "46E",
  ],
  eu: [
    "60A",
    "60B",
    "60C",
    "60D",
    "60E",
    "60F",
    "65A",
    "65B",
    "65C",
    "65D",
    "65E",
    "65F",
    "70A",
    "70B",
    "70C",
    "70D",
    "70E",
    "70F",
    "75A",
    "75B",
    "75C",
    "75D",
    "75E",
    "75F",
    "80A",
    "80B",
    "80C",
    "80D",
    "80E",
    "80F",
    "85A",
    "85B",
    "85C",
    "85D",
    "85E",
    "85F",
    "90A",
    "90B",
    "90C",
    "90D",
    "90E",
    "90F",
    "95A",
    "95B",
    "95C",
    "95D",
    "95E",
    "95F",
    "100A",
    "100B",
    "100C",
    "100D",
    "100E",
    "100F",
    "105A",
    "105B",
    "105C",
    "105D",
    "105E",
    "105F",
  ],
}

// Country flags for bra size systems
const countryFlags = {
  US: "🇺🇸",
  UK: "🇬🇧",
  EU: "🇪🇺",
  FR: "🇫🇷",
  IT: "🇮🇹",
}

// Age ranges for age selection
const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]

// Bra size translation keys with proper spacing
const braSizeTranslations = {
  en: {
    "Band Size": "Band Size",
    "Cup Size": "Cup Size",
    "Select Band": "Select Band",
    "Selected Size": "Selected Size",
    "Bra Size Note": "Bra Sizes Can Vary Between Brands. This Is An Estimate Based On Standard Sizing.",
    "Select Sizing System": "Select Sizing System",
    clear: "Clear",
  },
  ar: {
    "Band Size": "مقاس الصدر",
    "Cup Size": "مقاس الكأس",
    "Select Band": "اختر المقاس",
    "Selected Size": "المقاس المختار",
    "Bra Size Note": "قد تختلف مقاسات حمالة الصدر بين العلامات التجارية. هذا تقدير بناءً على المقاسات القياسية.",
    "Select Sizing System": "اختر نظام المقاسات",
    clear: "مسح",
  },
}

// Simplified version for demonstration
export default function SizeFinder() {
  const { t: baseT, isRtl, language } = useLanguage()
  const { toast } = useToast()

  // Custom translation function that handles bra size specific translations
  const t = (key: string) => {
    // Check if it's a bra size related key with spaces
    if (braSizeTranslations[language as keyof typeof braSizeTranslations]?.[key]) {
      return braSizeTranslations[language as keyof typeof braSizeTranslations][key]
    }
    // Otherwise use the base translation
    return baseT(key)
  }

  const [activeTab, setActiveTab] = useState("step1")
  const [currentStep, setCurrentStep] = useState(0)
  const [garmentType, setGarmentType] = useState("tops")
  const [measurementUnit, setMeasurementUnit] = useState<"cm" | "inches">("cm")
  const [answers, setAnswers] = useState({
    age: "",
    height: "",
    weight: "",
    bellyShape: "",
    hipShape: "",
    braSizeSystem: "US",
    braSize: "",
    waistSize: "", // Waist measurement
    hipSize: "", // Hip measurement
    fitPreference: "Regular Fit",
  })
  const [showResult, setShowResult] = useState(false)
  const [sizeResult, setSizeResult] = useState<any | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [preliminarySizeEstimate, setPreliminarySizeEstimate] = useState<string | null>(null)
  const [showPreliminarySize, setShowPreliminarySize] = useState(false)
  const [measurementTab, setMeasurementTab] = useState<"body" | "garment">("body")

  // Define steps based on garment type
  const getSteps = (): Step[] => {
    const commonSteps: Step[] = [
      {
        id: "garment-type",
        titleKey: "Garment Type",
        descriptionKey: "Garment Type Desc",
      },
      {
        id: "age",
        titleKey: "Age",
        descriptionKey: "Age Selection Desc",
      },
      {
        id: "height-weight",
        titleKey: "Height & Weight",
        descriptionKey: "Height & Weight Desc",
        optional: true,
      },
      {
        id: "belly-shape",
        titleKey: "Belly Shape",
        descriptionKey: "Belly Shape Desc",
        optional: true,
      },
      {
        id: "hip-shape",
        titleKey: "Hip Shape",
        descriptionKey: "Hip Shape Desc",
        optional: true,
      },
    ]

    // Add garment-specific steps
    if (garmentType === "tops" || garmentType === "dresses") {
      return [
        ...commonSteps,
        {
          id: "bra-size",
          titleKey: "Bra Size",
          descriptionKey: "Bra Size Desc",
          optional: true,
        },
        {
          id: "fit-preference",
          titleKey: "Fit Preference",
          descriptionKey: "Fit Preference Desc",
          optional: true,
        },
      ]
    } else {
      // For bottoms
      return [
        ...commonSteps,
        {
          id: "waist-hips",
          titleKey: "Waist & Hips",
          descriptionKey: "Waist & Hips Desc",
          optional: true,
        },
        {
          id: "fit-preference",
          titleKey: "Fit Preference",
          descriptionKey: "Fit Preference Desc",
          optional: true,
        },
      ]
    }
  }

  const steps = getSteps()

  // Calculate preliminary size after the first 3 questions
  const calculatePreliminarySize = () => {
    // Only calculate if we have height and weight
    if (answers.height && answers.weight) {
      const height = getHeightInCm()
      const weight = getWeightInKg()

      // Simple BMI-based calculation for preliminary size
      const bmi = weight / ((height / 100) * (height / 100))

      let prelimSize = "M" // Default to M

      // Adjust based on BMI and age
      if (bmi < 18.5) {
        prelimSize = "XS"
      } else if (bmi < 20) {
        prelimSize = "S"
      } else if (bmi < 25) {
        prelimSize = "M"
      } else if (bmi < 30) {
        prelimSize = "L"
      } else {
        prelimSize = "XL"
      }

      // Adjust based on age
      if (answers.age === "18-24") {
        // Younger people often prefer smaller sizes
        if (prelimSize === "M") prelimSize = "S"
        else if (prelimSize === "L") prelimSize = "M"
      } else if (answers.age === "55-64" || answers.age === "65+") {
        // Older people often prefer more comfortable fits
        if (prelimSize === "S") prelimSize = "M"
        else if (prelimSize === "M") prelimSize = "L"
      }

      setPreliminarySizeEstimate(prelimSize)
      setShowPreliminarySize(true)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // If we're moving to the 4th question and have height/weight data, calculate preliminary size
      if (currentStep === 2 && answers.height && answers.weight) {
        calculatePreliminarySize()
      }

      setCurrentStep(currentStep + 1)
    } else {
      // Validate that user has provided enough information before calculating size
      const hasEnoughInfo = validateUserInput()
      if (hasEnoughInfo) {
        setValidationError(null)
        calculateSize()
        setShowResult(true)
      }
      // If validation fails, the error message is already set and will be displayed
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)

      // Hide preliminary size estimate if going back to earlier questions
      if (currentStep <= 3) {
        setShowPreliminarySize(false)
      }
    }
  }

  const validateUserInput = (): boolean => {
    // Reset any previous validation errors
    setValidationError(null)

    // Check if user has provided any meaningful information
    let hasProvidedInfo = false

    // Age is required for all garment types
    if (!answers.age) {
      setValidationError(t("Please select your age range"))
      return false
    }

    if (garmentType === "tops") {
      // For tops, require either bust measurement (via bra size) or body shape info
      if (answers.braSize) {
        hasProvidedInfo = true
      } else if ((answers.height && answers.weight) || answers.bellyShape) {
        hasProvidedInfo = true
      } else {
        setValidationError(t("Please provide your bra size or height and weight to get an accurate recommendation"))
        return false
      }
    } else if (garmentType === "bottoms") {
      // For bottoms, require either waist/hip measurements or body shape info
      if (answers.waistSize || answers.hipSize) {
        hasProvidedInfo = true
      } else if ((answers.height && answers.weight) || answers.hipShape) {
        hasProvidedInfo = true
      } else {
        setValidationError(t("Please provide your waist/hip measurements or body shape information"))
        return false
      }
    } else if (garmentType === "dresses") {
      // For dresses, require more comprehensive information
      if (answers.braSize || (answers.waistSize && answers.hipSize)) {
        hasProvidedInfo = true
      } else if (answers.height && answers.weight && (answers.bellyShape || answers.hipShape)) {
        hasProvidedInfo = true
      } else {
        setValidationError(t("Please provide your measurements or body shape information for an accurate dress size"))
        return false
      }
    }

    return hasProvidedInfo
  }

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      // If we're skipping the 3rd question and have height/weight data, calculate preliminary size
      if (currentStep === 2 && answers.height && answers.weight) {
        calculatePreliminarySize()
      }

      setCurrentStep(currentStep + 1)
    } else {
      // Validate that user has provided enough information before calculating size
      const hasEnoughInfo = validateUserInput()
      if (hasEnoughInfo) {
        setValidationError(null)
        calculateSize()
        setShowResult(true)
      }
    }
  }

  const handleChange = (field: string, value: string | number) => {
    setAnswers({
      ...answers,
      [field]: value,
    })
  }

  const getHeightInCm = (): number => {
    const height = Number.parseFloat(answers.height) || 165
    if (measurementUnit === "inches") {
      return height * 2.54
    }
    return height
  }

  const getWeightInKg = (): number => {
    const weight = Number.parseFloat(answers.weight) || 60
    if (measurementUnit === "inches") {
      return weight * 0.453592
    }
    return weight
  }

  const estimateBustSize = (): number => {
    const height = getHeightInCm()
    const weight = getWeightInKg()

    // Base calculation
    let estimatedBust = 0

    // Use bra size if available
    if (answers.braSize) {
      // Extract band and cup size
      const bandSize = Number.parseInt(answers.braSize.match(/\d+/)?.[0] || "34")
      const cupSize = answers.braSize.slice(-1)

      // Adjust based on band and cup size
      const cupSizeValue = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, DD: 5, DDD: 6 }[cupSize] || 2

      // Formula based on band and cup size
      estimatedBust = bandSize + cupSizeValue * 2.5

      // Convert from inches to cm if using US/UK sizing
      if (answers.braSizeSystem === "us" || answers.braSizeSystem === "uk") {
        estimatedBust = estimatedBust * 2.54
      }
    } else {
      // If no bra size, estimate based on height and weight
      if (height < 155) {
        estimatedBust = 82 + (weight - 50) * 0.5
      } else if (height < 165) {
        estimatedBust = 86 + (weight - 55) * 0.5
      } else if (height < 175) {
        estimatedBust = 90 + (weight - 60) * 0.5
      } else {
        estimatedBust = 94 + (weight - 65) * 0.5
      }
    }

    // Adjust based on belly shape
    if (answers.bellyShape === "flatter") {
      estimatedBust -= 1
    } else if (answers.bellyShape === "curvier") {
      estimatedBust += 2
    }

    // Adjust based on age
    if (answers.age === "18-24") {
      // No adjustment for younger age group
    } else if (answers.age === "25-34") {
      estimatedBust += 1
    } else if (answers.age === "35-44") {
      estimatedBust += 2
    } else if (answers.age === "45-54") {
      estimatedBust += 2
    } else if (answers.age === "55-64" || answers.age === "65+") {
      estimatedBust += 3
    }

    return Math.round(estimatedBust)
  }

  const estimateWaistSize = (): number => {
    // If waist size is provided, use it
    if (answers.waistSize && Number.parseFloat(answers.waistSize) > 0) {
      return Number.parseFloat(answers.waistSize)
    }

    const height = getHeightInCm()
    const weight = getWeightInKg()

    // Basic formula to estimate waist size
    let estimatedWaist = 0

    // Base calculation
    if (height < 155) {
      estimatedWaist = 64 + (weight - 50) * 0.4
    } else if (height < 165) {
      estimatedWaist = 68 + (weight - 55) * 0.4
    } else if (height < 175) {
      estimatedWaist = 72 + (weight - 60) * 0.4
    } else {
      estimatedWaist = 76 + (weight - 65) * 0.4
    }

    // Adjust based on belly shape
    if (answers.bellyShape === "flatter") {
      estimatedWaist -= 3
    } else if (answers.bellyShape === "curvier") {
      estimatedWaist += 3
    }

    // Adjust based on age
    if (answers.age === "18-24") {
      // No adjustment for younger age group
    } else if (answers.age === "25-34") {
      estimatedWaist += 1
    } else if (answers.age === "35-44") {
      estimatedWaist += 2
    } else if (answers.age === "45-54") {
      estimatedWaist += 3
    } else if (answers.age === "55-64" || answers.age === "65+") {
      estimatedWaist += 4
    }

    return Math.round(estimatedWaist)
  }

  const estimateHipSize = (): number => {
    // If hip size is provided, use it
    if (answers.hipSize && Number.parseFloat(answers.hipSize) > 0) {
      return Number.parseFloat(answers.hipSize)
    }

    const height = getHeightInCm()
    const weight = getWeightInKg()

    // Basic formula to estimate hip size
    let estimatedHip = 0

    // Base calculation
    if (height < 155) {
      estimatedHip = 88 + (weight - 50) * 0.5
    } else if (height < 165) {
      estimatedHip = 92 + (weight - 55) * 0.5
    } else if (height < 175) {
      estimatedHip = 96 + (weight - 60) * 0.5
    } else {
      estimatedHip = 100 + (weight - 65) * 0.5
    }

    // Adjust based on hip shape
    if (answers.hipShape === "straighter") {
      estimatedHip -= 3
    } else if (answers.hipShape === "wider") {
      estimatedHip += 3
    }

    // Adjust based on age
    if (answers.age === "18-24") {
      // No adjustment for younger age group
    } else if (answers.age === "25-34") {
      estimatedHip += 1
    } else if (answers.age === "35-44") {
      estimatedHip += 2
    } else if (answers.age === "45-54") {
      estimatedHip += 2
    } else if (answers.age === "55-64" || answers.age === "65+") {
      estimatedHip += 3
    }

    return Math.round(estimatedHip)
  }

  // Find recommended size using the integrated size chart data
  const findRecommendedSize = (category: string, measurements: any, fit = "Regular Fit") => {
    const chart = sizeChartData[category as keyof typeof sizeChartData]
    if (!chart) {
      throw new Error("Invalid category")
    }

    const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]

    // Primary measurement that determined the size
    let primaryMeasurement = ""
    let limitingMeasurement = ""

    for (const size of sizes) {
      const sizeData = chart[size as keyof typeof chart]

      if (category === "tops" || category === "dresses") {
        // Check if all measurements fit this size
        const bustFits = measurements.bust <= sizeData.bustBody
        const waistFits = measurements.waist <= sizeData.waistBody
        const hipFits = measurements.hips <= sizeData.hipBody

        if (bustFits && waistFits && hipFits) {
          // All measurements fit, determine which one is closest to the limit
          const bustRatio = measurements.bust / sizeData.bustBody
          const waistRatio = measurements.waist / sizeData.waistBody
          const hipRatio = measurements.hips / sizeData.hipBody

          // The measurement with the highest ratio is the limiting factor
          if (bustRatio >= waistRatio && bustRatio >= hipRatio) {
            primaryMeasurement = "bust"
          } else if (waistRatio >= bustRatio && waistRatio >= hipRatio) {
            primaryMeasurement = "waist"
          } else {
            primaryMeasurement = "hips"
          }

          // Get the garment bust measurement based on fit type
          const bustFitChart = sizeChartData.bust_fits[fit as keyof typeof sizeChartData.bust_fits]
          const bustGarment = bustFitChart ? bustFitChart[size as keyof typeof bustFitChart] : sizeData.bustGarment

          return {
            size,
            primaryMeasurement,
            garmentMeasurements: {
              bust: bustGarment,
              waist: sizeData.waistGarment,
              hips: sizeData.hipGarment,
            },
            chartReference: sizeData,
          }
        } else {
          // Determine which measurement is preventing this size
          if (!bustFits) limitingMeasurement = "bust"
          else if (!waistFits) limitingMeasurement = "waist"
          else if (!hipFits) limitingMeasurement = "hips"
        }
      } else if (category === "bottoms") {
        const waistFits = measurements.waist <= sizeData.waistBody
        const hipFits = measurements.hips <= sizeData.hipBody

        if (waistFits && hipFits) {
          // Determine which measurement is closer to the limit
          const waistRatio = measurements.waist / sizeData.waistBody
          const hipRatio = measurements.hips / sizeData.hipBody

          primaryMeasurement = waistRatio >= hipRatio ? "waist" : "hips"

          return {
            size,
            primaryMeasurement,
            garmentMeasurements: {
              waist: sizeData.waistGarment,
              hips: sizeData.hipGarment,
            },
            chartReference: sizeData,
          }
        } else {
          // Determine which measurement is preventing this size
          if (!waistFits) limitingMeasurement = "waist"
          else if (!hipFits) limitingMeasurement = "hips"
        }
      }
    }

    // If we get here, we need to use the largest size
    const largest = sizes[sizes.length - 1]
    const largestData = chart[largest as keyof typeof chart]

    // Get the garment bust measurement based on fit type for tops/dresses
    let bustGarment
    if (category === "tops" || category === "dresses") {
      const bustFitChart = sizeChartData.bust_fits[fit as keyof typeof sizeChartData.bust_fits]
      bustGarment = bustFitChart ? bustFitChart[largest as keyof typeof bustFitChart] : largestData.bustGarment
    }

    return {
      size: largest,
      primaryMeasurement: limitingMeasurement || "combined",
      garmentMeasurements:
        category === "bottoms"
          ? {
              waist: largestData.waistGarment,
              hips: largestData.hipGarment,
            }
          : {
              bust: bustGarment || largestData.bustGarment,
              waist: largestData.waistGarment,
              hips: largestData.hipGarment,
            },
      chartReference: largestData,
    }
  }

  const calculateSize = () => {
    // Use provided measurements or estimate them
    const bustMeasurement = estimateBustSize()
    const waistMeasurement = estimateWaistSize()
    const hipMeasurement = estimateHipSize()

    // Store measurements for display in results
    const measurements = {
      bust: bustMeasurement,
      waist: waistMeasurement,
      hips: hipMeasurement,
    }

    // Map garment type to category
    const categoryMap: Record<string, string> = {
      tops: "tops",
      bottoms: "bottoms",
      dresses: "dresses",
    }
    const category = categoryMap[garmentType]

    // Get fit preference
    const fitType = getFitTypeFromPreference(answers.fitPreference)

    // Find recommended size using the integrated size chart data
    const result = findRecommendedSize(
      category,
      {
        bust: bustMeasurement,
        waist: waistMeasurement,
        hips: hipMeasurement,
      },
      fitType,
    )

    // Set the result with international equivalents, popularity data, and measurement details
    const sizeEquivalents = getSizeEquivalents(result.size)
    setSizeResult({
      ...sizeEquivalents,
      measurements,
      garmentMeasurements: result.garmentMeasurements,
      sizeDetails: {
        primaryMeasurement: result.primaryMeasurement,
        measurementValue: measurements[result.primaryMeasurement as keyof typeof measurements] || 0,
        chartReference: result.chartReference,
        fitType,
      },
    })
  }

  const getFitTypeFromPreference = (preference: string): string => {
    switch (preference) {
      case "Slim Fit":
        return "Slim Fit"
      case "Regular Fit":
        return "Regular Fit"
      case "Relaxed Fit":
        return "Relaxed Fit"
      case "Oversized Fit":
        return "Oversized Fit"
      default:
        return "Regular Fit"
    }
  }

  const getSizeEquivalents = (collarAndBowSize: string): SizeResult => {
    const sizeMap: Record<string, SizeResult> = {
      XXS: {
        collarAndBowSize: "XXS",
        usSize: "00",
        ukSize: "4",
        euSize: "32",
        descriptionKey: "XXS Description",
        popularity: 65,
        alternativeSize: "XS",
        alternativePopularity: 35,
      },
      XS: {
        collarAndBowSize: "XS",
        usSize: "0",
        ukSize: "6",
        euSize: "34",
        descriptionKey: "XS Description",
        popularity: 70,
        alternativeSize: "S",
        alternativePopularity: 30,
      },
      S: {
        collarAndBowSize: "S",
        usSize: "2",
        ukSize: "8",
        euSize: "36",
        descriptionKey: "S Description",
        popularity: 75,
        alternativeSize: "M",
        alternativePopularity: 25,
      },
      M: {
        collarAndBowSize: "M",
        usSize: "4",
        ukSize: "10",
        euSize: "38",
        descriptionKey: "M Description",
        popularity: 80,
        alternativeSize: "S",
        alternativePopularity: 20,
      },
      L: {
        collarAndBowSize: "L",
        usSize: "6",
        ukSize: "12",
        euSize: "40",
        descriptionKey: "L Description",
        popularity: 75,
        alternativeSize: "M",
        alternativePopularity: 25,
      },
      XL: {
        collarAndBowSize: "XL",
        usSize: "8",
        ukSize: "14",
        euSize: "42",
        descriptionKey: "XL Description",
        popularity: 70,
        alternativeSize: "L",
        alternativePopularity: 30,
      },
      XXL: {
        collarAndBowSize: "XXL",
        usSize: "10",
        ukSize: "16",
        euSize: "44",
        descriptionKey: "XXL Description",
        popularity: 65,
        alternativeSize: "XL",
        alternativePopularity: 35,
      },
    }

    return sizeMap[collarAndBowSize] || sizeMap["M"]
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = t("Share Text")

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank",
        )
        break
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: t("Link Copied"),
            description: t("Link Copied Desc"),
          })
        })
        break
      case "direct":
        if (navigator.share) {
          navigator
            .share({
              title: t("Size Finder"),
              text: text,
              url: url,
            })
            .catch(() => {
              // Fallback to copying to clipboard if sharing fails
              navigator.clipboard.writeText(url).then(() => {
                toast({
                  title: t("Link Copied"),
                  description: t("Link Copied Desc"),
                })
              })
            })
        } else {
          // Fallback to copying to clipboard if Web Share API is not available
          navigator.clipboard.writeText(url).then(() => {
            toast({
              title: t("Link Copied"),
              description: t("Link Copied Desc"),
            })
          })
        }
        break
      default:
        if (navigator.share) {
          navigator
            .share({
              title: t("Size Finder"),
              text: text,
              url: url,
            })
            .catch(() => {
              // Silent fail
            })
        }
    }
  }

  const renderGuide = () => {
    return (
      <div className="bg-teal-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-teal-200">
        <div className="flex items-start gap-2 sm:gap-3">
          <Info className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm sm:text-base">{t("Size Finder Guide")}</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-700">{t("Guide Text")}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderPreliminarySizeBanner = () => {
    if (!showPreliminarySize || !preliminarySizeEstimate) return null

    return (
      <div className="bg-teal-100 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-teal-300 animate-pulse">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-teal-200 rounded-full p-1.5 sm:p-2">
            <Ruler className="h-4 w-4 sm:h-5 sm:w-5 text-teal-700" />
          </div>
          <div>
            <p className="font-medium text-teal-800 text-sm sm:text-base">
              {t("Looks like you are size")}{" "}
              <span className="font-bold text-base sm:text-lg">{preliminarySizeEstimate}</span>
            </p>
            <p className="text-xs sm:text-sm text-teal-700 mt-0.5 sm:mt-1">{t("A few more questions to be sure")}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (step.id) {
      case "garment-type":
        return (
          <div className="space-y-4 sm:space-y-6">
            {currentStep === 0 && renderGuide()}
            <p className="text-xs sm:text-sm text-gray-600">{t("Garment Type Question")}</p>
            <RadioGroup
              value={garmentType}
              onValueChange={(value) => {
                setGarmentType(value)
                // Reset current step to 0 when changing garment type
                setCurrentStep(0)
              }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4"
            >
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-3 sm:p-4 hover:border-black transition-colors">
                <GarmentIllustration type="tops" selected={garmentType === "tops"} />
                <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                  <RadioGroupItem value="tops" id="tops" />
                  <Label htmlFor="tops" className="text-sm sm:text-base">
                    {t("Shirts & Blazers")}
                  </Label>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2 border rounded-lg p-3 sm:p-4 hover:border-black transition-colors">
                <GarmentIllustration type="bottoms" selected={garmentType === "bottoms"} />
                <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                  <RadioGroupItem value="bottoms" id="bottoms" />
                  <Label htmlFor="bottoms" className="text-sm sm:text-base">
                    {t("Bottoms & Pants")}
                  </Label>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2 border rounded-lg p-3 sm:p-4 hover:border-black transition-colors">
                <GarmentIllustration type="dresses" selected={garmentType === "dresses"} />
                <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                  <RadioGroupItem value="dresses" id="dresses" />
                  <Label htmlFor="dresses" className="text-sm sm:text-base">
                    {t("Dresses & Jumpsuits")}
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )

      case "age":
        return (
          <div className="space-y-4 sm:space-y-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">{t("Please select your age range")}</p>
            <RadioGroup
              value={answers.age}
              onValueChange={(value) => handleChange("age", value)}
              className="space-y-2 sm:space-y-3"
            >
              {ageRanges.map((range) => (
                <div
                  key={range}
                  className={`border rounded-lg p-3 sm:p-4 hover:border-teal-500 transition-colors cursor-pointer ${
                    answers.age === range ? "border-teal-500 bg-teal-50" : ""
                  }`}
                  onClick={() => handleChange("age", range)}
                >
                  <div className={`flex items-center ${isRtl ? "flex-row-reverse" : ""}`}>
                    <input
                      type="radio"
                      value={range}
                      checked={answers.age === range}
                      onChange={() => handleChange("age", range)}
                      className="w-4 h-4 accent-teal-600 focus:ring-0 focus:outline-none border-gray-300"
                      id={`age-${range}`}
                    />
                    <Label
                      htmlFor={`age-${range}`}
                      className={`font-medium cursor-pointer text-sm sm:text-base ${
                        isRtl ? "mr-3 text-right" : "ml-3 text-left"
                      }`}
                    >
                      {range} {t("years")}
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case "height-weight":
        return (
          <div className="space-y-4 sm:space-y-6">
            {showPreliminarySize && renderPreliminarySizeBanner()}

            <div className="flex justify-end mb-2 sm:mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Button
                  variant={measurementUnit === "cm" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMeasurementUnit("cm")}
                  className={`rounded-r-none ${measurementUnit === "cm" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                >
                  {t("cm")}
                </Button>
                <Button
                  variant={measurementUnit === "inches" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMeasurementUnit("inches")}
                  className={`rounded-l-none ${measurementUnit === "inches" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                >
                  {t("inches")}
                </Button>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label htmlFor="height" className="text-sm sm:text-base">
                {t("Height")}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="height"
                  type="number"
                  placeholder={measurementUnit === "cm" ? "165" : "65"}
                  value={answers.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className="text-sm sm:text-base"
                />
                <div className="flex items-center justify-center bg-gray-100 rounded px-3 text-sm sm:text-base">
                  {measurementUnit === "cm" ? t("cm") : t("in")}
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label htmlFor="weight" className="text-sm sm:text-base">
                {t("Weight")}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="weight"
                  type="number"
                  placeholder={measurementUnit === "cm" ? "60" : "132"}
                  value={answers.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className="text-sm sm:text-base"
                />
                <div className="flex items-center justify-center bg-gray-100 rounded px-3 text-sm sm:text-base">
                  {measurementUnit === "cm" ? t("kg") : t("lb")}
                </div>
              </div>
            </div>
          </div>
        )

      case "belly-shape":
        return (
          <div className="space-y-4 sm:space-y-6">
            {showPreliminarySize && renderPreliminarySizeBanner()}

            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">{t("Belly Shape Question")}</p>
            <RadioGroup
              value={answers.bellyShape}
              onValueChange={(value) => handleChange("bellyShape", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4"
            >
              {[
                { value: "flatter", label: "Flatter Belly", image: "/images/belly-flatter.png" },
                { value: "average", label: "Average Belly", image: "/images/belly-average.png" },
                { value: "curvier", label: "Curvier Belly", image: "/images/belly-curvier.png" },
              ].map((shape) => (
                <div
                  key={shape.value}
                  className={`border rounded-lg p-3 sm:p-4 hover:border-teal-500 transition-colors cursor-pointer ${
                    answers.bellyShape === shape.value ? "border-teal-500 bg-teal-50" : ""
                  }`}
                  onClick={() => handleChange("bellyShape", shape.value)}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mb-2 sm:mb-3">
                      <img
                        src={shape.image || "/placeholder.svg"}
                        alt={t(shape.label)}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className={`flex items-center ${isRtl ? "flex-row-reverse" : ""}`}>
                      <input
                        type="radio"
                        value={shape.value}
                        checked={answers.bellyShape === shape.value}
                        onChange={() => handleChange("bellyShape", shape.value)}
                        className="w-4 h-4 accent-teal-600 focus:ring-0 focus:outline-none border-gray-300"
                        id={`belly-${shape.value}`}
                      />
                      <Label
                        htmlFor={`belly-${shape.value}`}
                        className={`font-medium cursor-pointer text-sm sm:text-base text-center ${
                          isRtl ? "mr-2" : "ml-2"
                        }`}
                      >
                        {t(shape.label)}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case "hip-shape":
        return (
          <div className="space-y-4 sm:space-y-6">
            {showPreliminarySize && renderPreliminarySizeBanner()}

            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">{t("Hip Shape Question")}</p>
            <RadioGroup
              value={answers.hipShape}
              onValueChange={(value) => handleChange("hipShape", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4"
            >
              {[
                { value: "straighter", label: "Straighter Hips", image: "/images/hip-straighter.png" },
                { value: "average", label: "Average Hips", image: "/images/hip-average.png" },
                { value: "wider", label: "Wider Hips", image: "/images/hip-wider.png" },
              ].map((shape) => (
                <div
                  key={shape.value}
                  className={`border rounded-lg p-3 sm:p-4 hover:border-teal-500 transition-colors cursor-pointer ${
                    answers.hipShape === shape.value ? "border-teal-500 bg-teal-50" : ""
                  }`}
                  onClick={() => handleChange("hipShape", shape.value)}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mb-2 sm:mb-3">
                      <img
                        src={shape.image || "/placeholder.svg"}
                        alt={t(shape.label)}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className={`flex items-center ${isRtl ? "flex-row-reverse" : ""}`}>
                      <input
                        type="radio"
                        value={shape.value}
                        checked={answers.hipShape === shape.value}
                        onChange={() => handleChange("hipShape", shape.value)}
                        className="w-4 h-4 accent-teal-600 focus:ring-0 focus:outline-none border-gray-300"
                        id={`hip-${shape.value}`}
                      />
                      <Label
                        htmlFor={`hip-${shape.value}`}
                        className={`font-medium cursor-pointer text-sm sm:text-base text-center ${
                          isRtl ? "mr-2" : "ml-2"
                        }`}
                      >
                        {t(shape.label)}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case "bra-size":
        return (
          <div className="space-y-4 sm:space-y-6">
            {showPreliminarySize && renderPreliminarySizeBanner()}

            <div className="flex justify-end mb-2 sm:mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                {["US", "UK", "EU"].map((system) => (
                  <Button
                    key={system}
                    variant={answers.braSizeSystem === system ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleChange("braSizeSystem", system)}
                    className={`${
                      system === "US" ? "rounded-r-none" : system === "EU" ? "rounded-l-none" : "rounded-none"
                    } ${answers.braSizeSystem === system ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                  >
                    {countryFlags[system as keyof typeof countryFlags]} {system}
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">{t("Bra Size Question")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="band-size" className="text-sm sm:text-base">
                  {t("Band Size")}
                </Label>
                <div className="grid grid-cols-4 gap-1">
                  {["28", "30", "32", "34", "36", "38", "40", "42", "44", "46"].map((band) => {
                    const isSelected = answers.braSize?.startsWith(band)
                    return (
                      <Button
                        key={band}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className={`text-xs sm:text-sm ${isSelected ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                        onClick={() => {
                          const cup = answers.braSize?.replace(/\d+/, "") || "B"
                          handleChange("braSize", `${band}${cup}`)
                        }}
                      >
                        {band}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cup-size" className="text-sm sm:text-base">
                  {t("Cup Size")}
                </Label>
                <div className="grid grid-cols-4 gap-1">
                  {["A", "B", "C", "D", "DD", "DDD"].map((cup) => {
                    const band = answers.braSize?.match(/\d+/)?.[0] || "34"
                    const isSelected = answers.braSize === `${band}${cup}`
                    return (
                      <Button
                        key={cup}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className={`text-xs sm:text-sm ${isSelected ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                        onClick={() => handleChange("braSize", `${band}${cup}`)}
                      >
                        {cup}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>

            {answers.braSize && (
              <div className="mt-4 p-3 sm:p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="font-medium text-sm sm:text-base">
                  {t("Selected Size")}: {answers.braSize} ({answers.braSizeSystem})
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">{t("Bra Size Note")}</p>
              </div>
            )}
          </div>
        )

      case "waist-hips":
        return (
          <div className="space-y-4 sm:space-y-6">
            {showPreliminarySize && renderPreliminarySizeBanner()}

            <div className="flex justify-end mb-2 sm:mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Button
                  variant={measurementUnit === "cm" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMeasurementUnit("cm")}
                  className={`rounded-r-none ${measurementUnit === "cm" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                >
                  {t("cm")}
                </Button>
                <Button
                  variant={measurementUnit === "inches" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMeasurementUnit("inches")}
                  className={`rounded-l-none ${measurementUnit === "inches" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                >
                  {t("inches")}
                </Button>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label htmlFor="waist-size" className="text-sm sm:text-base">
                {t("Waist")}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="waist-size"
                  type="number"
                  placeholder={measurementUnit === "cm" ? "70" : "28"}
                  value={answers.waistSize}
                  onChange={(e) => handleChange("waistSize", e.target.value)}
                  className="text-sm sm:text-base"
                />
                <div className="flex items-center justify-center bg-gray-100 rounded px-3 text-sm sm:text-base">
                  {measurementUnit === "cm" ? t("cm") : t("in")}
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label htmlFor="hip-size" className="text-sm sm:text-base">
                {t("Hips")}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="hip-size"
                  type="number"
                  placeholder={measurementUnit === "cm" ? "95" : "37"}
                  value={answers.hipSize}
                  onChange={(e) => handleChange("hipSize", e.target.value)}
                  className="text-sm sm:text-base"
                />
                <div className="flex items-center justify-center bg-gray-100 rounded px-3 text-sm sm:text-base">
                  {measurementUnit === "cm" ? t("cm") : t("in")}
                </div>
              </div>
            </div>
          </div>
        )

      case "fit-preference":
        return (
          <div className="space-y-4 sm:space-y-6">
            {showPreliminarySize && renderPreliminarySizeBanner()}

            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">{t("Fit Preference Question")}</p>
            <RadioGroup
              value={answers.fitPreference}
              onValueChange={(value) => handleChange("fitPreference", value)}
              className="space-y-2 sm:space-y-3"
            >
              {["Slim Fit", "Regular Fit", "Relaxed Fit", "Oversized Fit"].map((fit) => (
                <div
                  key={fit}
                  className={`border rounded-lg p-3 sm:p-4 hover:border-teal-500 transition-colors cursor-pointer ${
                    answers.fitPreference === fit ? "border-teal-500 bg-teal-50" : ""
                  }`}
                  onClick={() => handleChange("fitPreference", fit)}
                >
                  <div className={`flex items-start ${isRtl ? "flex-row-reverse" : ""}`}>
                    <input
                      type="radio"
                      value={fit}
                      checked={answers.fitPreference === fit}
                      onChange={() => handleChange("fitPreference", fit)}
                      className="w-4 h-4 accent-teal-600 focus:ring-0 focus:outline-none border-gray-300 mt-0.5"
                      id={`fit-${fit}`}
                    />
                    <div className={`${isRtl ? "mr-3 text-right" : "ml-3 text-left"}`}>
                      <Label htmlFor={`fit-${fit}`} className="font-medium cursor-pointer text-sm sm:text-base block">
                        {t(fit)}
                      </Label>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{t(`${fit} Description`)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      default:
        return null
    }
  }

  const renderResult = () => {
    if (!sizeResult) return null

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-teal-100 p-4 sm:p-6 rounded-lg border border-teal-300">
          <h3 className="text-lg sm:text-xl font-bold text-teal-800 mb-2 sm:mb-3">{t("Your Recommended Size")}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold">{sizeResult.collarAndBowSize}</span>
                <span className="text-sm sm:text-base text-gray-600">
                  {t("Size Popularity")}: {sizeResult.popularity}%
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mt-1 sm:mt-2">{t(sizeResult.descriptionKey)}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <div className="bg-white rounded-lg px-3 py-2 border">
                <span className="text-xs text-gray-500">{t("US")}</span>
                <p className="font-medium">{sizeResult.usSize}</p>
              </div>
              <div className="bg-white rounded-lg px-3 py-2 border">
                <span className="text-xs text-gray-500">{t("UK")}</span>
                <p className="font-medium">{sizeResult.ukSize}</p>
              </div>
              <div className="bg-white rounded-lg px-3 py-2 border">
                <span className="text-xs text-gray-500">{t("EU")}</span>
                <p className="font-medium">{sizeResult.euSize}</p>
              </div>
            </div>
          </div>

          {sizeResult.alternativeSize && (
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-teal-200">
              <p className="text-sm sm:text-base text-gray-700">
                {t("Alternative Size")}: <span className="font-medium">{sizeResult.alternativeSize}</span> (
                {sizeResult.alternativePopularity}% {t("fit")})
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg border">
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">{t("Measurement Details")}</h3>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">{t("Your Measurements")}</h4>
              <ul className="space-y-2">
                {sizeResult.measurements?.bust && (
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>{t("Bust")}:</span>
                    <span className="font-medium">
                      {sizeResult.measurements.bust} {measurementUnit === "cm" ? t("cm") : t("in")}
                    </span>
                  </li>
                )}
                {sizeResult.measurements?.waist && (
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>{t("Waist")}:</span>
                    <span className="font-medium">
                      {sizeResult.measurements.waist} {measurementUnit === "cm" ? t("cm") : t("in")}
                    </span>
                  </li>
                )}
                {sizeResult.measurements?.hips && (
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>{t("Hips")}:</span>
                    <span className="font-medium">
                      {sizeResult.measurements.hips} {measurementUnit === "cm" ? t("cm") : t("in")}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex-1">
              <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">
                {t("Garment Measurements")} ({sizeResult.collarAndBowSize})
              </h4>
              <ul className="space-y-2">
                {sizeResult.garmentMeasurements?.bust && (
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>{t("Bust")}:</span>
                    <span className="font-medium">
                      {sizeResult.garmentMeasurements.bust} {measurementUnit === "cm" ? t("cm") : t("in")}
                    </span>
                  </li>
                )}
                {sizeResult.garmentMeasurements?.waist && (
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>{t("Waist")}:</span>
                    <span className="font-medium">
                      {sizeResult.garmentMeasurements.waist} {measurementUnit === "cm" ? t("cm") : t("in")}
                    </span>
                  </li>
                )}
                {sizeResult.garmentMeasurements?.hips && (
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>{t("Hips")}:</span>
                    <span className="font-medium">
                      {sizeResult.garmentMeasurements.hips} {measurementUnit === "cm" ? t("cm") : t("in")}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {sizeResult.sizeDetails && (
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t">
              <p className="text-sm sm:text-base">
                <span className="font-medium">{t("Fit Type")}:</span> {t(sizeResult.sizeDetails.fitType)}
              </p>
              {sizeResult.sizeDetails.primaryMeasurement && (
                <p className="text-sm sm:text-base mt-1 sm:mt-2">
                  <span className="font-medium">{t("Primary Measurement")}:</span>{" "}
                  {t(sizeResult.sizeDetails.primaryMeasurement)}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowResult(false)
              setCurrentStep(0)
            }}
            className="text-sm sm:text-base"
          >
            {t("Start Over")}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => handleShare("direct")}
            className="bg-teal-600 hover:bg-teal-700 text-sm sm:text-base"
          >
            {t("Share Result")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {showResult ? (
        renderResult()
      ) : (
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold">{t(steps[currentStep].titleKey)}</h2>
            <div className="text-sm text-gray-500">
              {t("Step")} {currentStep + 1} / {steps.length}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4 sm:p-6">
            {renderStepContent()}

            {validationError && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm sm:text-base">
                {validationError}
              </div>
            )}

            <div className="flex justify-between mt-6 sm:mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="text-sm sm:text-base"
              >
                {t("Back")}
              </Button>
              <div className="space-x-2 sm:space-x-3">
                {steps[currentStep].optional && (
                  <Button variant="ghost" onClick={handleSkip} className="text-sm sm:text-base">
                    {t("Skip")}
                  </Button>
                )}
                <Button onClick={handleNext} className="bg-teal-600 hover:bg-teal-700 text-sm sm:text-base">
                  {currentStep < steps.length - 1 ? t("Next") : t("Calculate Size")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
