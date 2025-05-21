"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, Check, Ruler } from "lucide-react"
import { BodyTypeImage } from "@/components/body-type-image"
import { GarmentIllustration } from "@/components/garment-illustrations"
import { useLanguage } from "@/components/language-provider"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Step = {
  id: string
  titleKey: string
  descriptionKey: string
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
}

// Size chart measurements for reference in the algorithm
const sizeChartData = {
  bust: {
    fitted: {
      XXS: [76, 79],
      XS: [80, 83],
      S: [84, 87],
      M: [88, 91],
      L: [92, 95],
      XL: [96, 99],
      XXL: [100, 103],
    },
    regular: {
      XXS: [82, 85],
      XS: [86, 89],
      S: [90, 93],
      M: [94, 97],
      L: [98, 101],
      XL: [102, 105],
      XXL: [106, 109],
    },
    oversize: {
      XXS: [88, 91],
      XS: [92, 95],
      S: [96, 99],
      M: [100, 103],
      L: [104, 107],
      XL: [108, 111],
      XXL: [112, 115],
    },
  },
  waist: {
    XXS: [60, 63],
    XS: [64, 67],
    S: [68, 71],
    M: [72, 75],
    L: [76, 79],
    XL: [80, 83],
    XXL: [84, 87],
  },
  hips: {
    XXS: [86, 89],
    XS: [90, 93],
    S: [94, 97],
    M: [98, 101],
    L: [102, 105],
    XL: [106, 109],
    XXL: [110, 113],
  },
}

export function SizeFinder() {
  const { t, isRtl } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [garmentType, setGarmentType] = useState("tops")
  const [answers, setAnswers] = useState({
    height: "",
    weight: "",
    age: "",
    bodyType: "",
    fitPreference: "regular",
    previousSize: "",
    shoulderWidth: 50,
    hipWidth: 50,
    bustSize: "", // Bust measurement
    waistSize: "", // Waist measurement
    hipSize: "", // Hip measurement
  })
  const [showResult, setShowResult] = useState(false)
  const [sizeResult, setSizeResult] = useState<SizeResult | null>(null)

  const steps: Step[] = [
    {
      id: "garment-type",
      titleKey: "garmentType",
      descriptionKey: "garmentTypeDesc",
    },
    {
      id: "measurements",
      titleKey: "measurements",
      descriptionKey: "measurementsDesc",
    },
    {
      id: "height-weight",
      titleKey: "heightWeight",
      descriptionKey: "heightWeightDesc",
    },
    {
      id: "age",
      titleKey: "age",
      descriptionKey: "ageDesc",
    },
    {
      id: "body-type",
      titleKey: "bodyType",
      descriptionKey: "bodyTypeDesc",
    },
    {
      id: "fit-preference",
      titleKey: "fitPreference",
      descriptionKey: "fitPreferenceDesc",
    },
    {
      id: "previous-experience",
      titleKey: "previousExperience",
      descriptionKey: "previousExperienceDesc",
    },
    {
      id: "body-proportions",
      titleKey: "bodyProportions",
      descriptionKey: "bodyProportionsDesc",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateSize()
      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChange = (field: string, value: string | number) => {
    setAnswers({
      ...answers,
      [field]: value,
    })
  }

  // Estimate bust size based on height and weight
  const estimateBustSize = (): number => {
    const height = Number.parseInt(answers.height) || 165
    const weight = Number.parseInt(answers.weight) || 60

    // Basic formula to estimate bust size based on height and weight
    // This is a simplified approach - in a real application, you would use more sophisticated calculations
    let estimatedBust = 0

    // Base calculation
    if (height < 155) {
      estimatedBust = 82 + (weight - 50) * 0.5
    } else if (height < 165) {
      estimatedBust = 86 + (weight - 55) * 0.5
    } else if (height < 175) {
      estimatedBust = 90 + (weight - 60) * 0.5
    } else {
      estimatedBust = 94 + (weight - 65) * 0.5
    }

    // Adjust based on body type
    if (answers.bodyType === "hourglass") {
      estimatedBust += 2
    } else if (answers.bodyType === "pear") {
      estimatedBust -= 1
    } else if (answers.bodyType === "apple") {
      estimatedBust += 3
    } else if (answers.bodyType === "athletic") {
      estimatedBust -= 1
    }

    // Adjust based on shoulder width
    estimatedBust += (answers.shoulderWidth - 50) * 0.1

    return Math.round(estimatedBust)
  }

  // Estimate waist size based on height and weight
  const estimateWaistSize = (): number => {
    const height = Number.parseInt(answers.height) || 165
    const weight = Number.parseInt(answers.weight) || 60

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

    // Adjust based on body type
    if (answers.bodyType === "hourglass") {
      estimatedWaist -= 2
    } else if (answers.bodyType === "pear") {
      estimatedWaist -= 1
    } else if (answers.bodyType === "apple") {
      estimatedWaist += 3
    } else if (answers.bodyType === "athletic") {
      estimatedWaist -= 1
    }

    return Math.round(estimatedWaist)
  }

  // Estimate hip size based on height and weight
  const estimateHipSize = (): number => {
    const height = Number.parseInt(answers.height) || 165
    const weight = Number.parseInt(answers.weight) || 60

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

    // Adjust based on body type
    if (answers.bodyType === "hourglass") {
      estimatedHip += 2
    } else if (answers.bodyType === "pear") {
      estimatedHip += 4
    } else if (answers.bodyType === "apple") {
      estimatedHip -= 1
    } else if (answers.bodyType === "athletic") {
      estimatedHip -= 2
    }

    // Adjust based on hip width slider
    estimatedHip += (answers.hipWidth - 50) * 0.15

    return Math.round(estimatedHip)
  }

  const calculateSize = () => {
    // Use provided measurements or estimate them
    const bustMeasurement = answers.bustSize ? Number.parseInt(answers.bustSize) : estimateBustSize()
    const waistMeasurement = answers.waistSize ? Number.parseInt(answers.waistSize) : estimateWaistSize()
    const hipMeasurement = answers.hipSize ? Number.parseInt(answers.hipSize) : estimateHipSize()

    // Determine which measurement to prioritize based on garment type
    let bestSize = ""
    if (garmentType === "tops") {
      // For tops, prioritize bust measurement
      const fitType = answers.fitPreference || "regular"
      bestSize = findBestSizeMatchByBust(bustMeasurement, fitType)
    } else if (garmentType === "bottoms") {
      // For bottoms, prioritize waist and hip measurements
      bestSize = findBestSizeMatchByWaistAndHips(waistMeasurement, hipMeasurement)
    } else if (garmentType === "dresses") {
      // For dresses, consider all measurements with emphasis on bust and waist
      const fitType = answers.fitPreference || "regular"
      const bustSize = findBestSizeMatchByBust(bustMeasurement, fitType)
      const waistSize = findBestSizeMatchByWaist(waistMeasurement)
      const hipSize = findBestSizeMatchByHips(hipMeasurement)

      // Take the largest size to ensure comfort
      const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
      const sizeIndices = [sizes.indexOf(bustSize), sizes.indexOf(waistSize), sizes.indexOf(hipSize)]
      const maxIndex = Math.max(...sizeIndices)
      bestSize = sizes[maxIndex]
    }

    // Consider previous size experience if available
    if (answers.previousSize && answers.previousSize !== "none") {
      bestSize = blendSizes(bestSize, answers.previousSize)
    }

    // Set the result with international equivalents and popularity data
    setSizeResult(getSizeEquivalents(bestSize))
  }

  // Find the best size match based on bust measurement and fit preference
  const findBestSizeMatchByBust = (bustMeasurement: number, fitType: string): string => {
    const fitCategory = fitType === "tight" ? "fitted" : fitType === "loose" ? "oversize" : "regular"

    const bustSizes = sizeChartData.bust[fitCategory as keyof typeof sizeChartData.bust]

    // Find the size where the bust measurement falls within the range
    for (const [size, range] of Object.entries(bustSizes)) {
      if (bustMeasurement >= range[0] && bustMeasurement <= range[1]) {
        return size
      }
    }

    // If no exact match, find the closest size
    let closestSize = "M" // Default
    let minDifference = Number.MAX_VALUE

    for (const [size, range] of Object.entries(bustSizes)) {
      const midPoint = (range[0] + range[1]) / 2
      const difference = Math.abs(bustMeasurement - midPoint)

      if (difference < minDifference) {
        minDifference = difference
        closestSize = size
      }
    }

    return closestSize
  }

  // Find the best size match based on waist measurement
  const findBestSizeMatchByWaist = (waistMeasurement: number): string => {
    const waistSizes = sizeChartData.waist

    // Find the size where the waist measurement falls within the range
    for (const [size, range] of Object.entries(waistSizes)) {
      if (waistMeasurement >= range[0] && waistMeasurement <= range[1]) {
        return size
      }
    }

    // If no exact match, find the closest size
    let closestSize = "M" // Default
    let minDifference = Number.MAX_VALUE

    for (const [size, range] of Object.entries(waistSizes)) {
      const midPoint = (range[0] + range[1]) / 2
      const difference = Math.abs(waistMeasurement - midPoint)

      if (difference < minDifference) {
        minDifference = difference
        closestSize = size
      }
    }

    return closestSize
  }

  // Find the best size match based on hip measurement
  const findBestSizeMatchByHips = (hipMeasurement: number): string => {
    const hipSizes = sizeChartData.hips

    // Find the size where the hip measurement falls within the range
    for (const [size, range] of Object.entries(hipSizes)) {
      if (hipMeasurement >= range[0] && hipMeasurement <= range[1]) {
        return size
      }
    }

    // If no exact match, find the closest size
    let closestSize = "M" // Default
    let minDifference = Number.MAX_VALUE

    for (const [size, range] of Object.entries(hipSizes)) {
      const midPoint = (range[0] + range[1]) / 2
      const difference = Math.abs(hipMeasurement - midPoint)

      if (difference < minDifference) {
        minDifference = difference
        closestSize = size
      }
    }

    return closestSize
  }

  // Find the best size match based on waist and hip measurements (for bottoms)
  const findBestSizeMatchByWaistAndHips = (waistMeasurement: number, hipMeasurement: number): string => {
    const waistSize = findBestSizeMatchByWaist(waistMeasurement)
    const hipSize = findBestSizeMatchByHips(hipMeasurement)

    // For bottoms, waist is typically the primary concern, but we need to consider hips too
    // Take the larger of the two sizes to ensure comfort
    const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
    const waistIndex = sizes.indexOf(waistSize)
    const hipIndex = sizes.indexOf(hipSize)

    return sizes[Math.max(waistIndex, hipIndex)]
  }

  // Helper functions for size calculation
  const blendSizes = (calculated: string, previous: string): string => {
    // Give weight to previous experience
    const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
    const calcIndex = sizes.indexOf(calculated)
    const prevIndex = sizes.indexOf(previous)

    // Weighted average, favoring previous experience
    const blendedIndex = Math.round((calcIndex + prevIndex * 2) / 3)
    return sizes[blendedIndex]
  }

  const getSizeEquivalents = (collarAndBowSize: string): SizeResult => {
    const sizeMap: Record<string, SizeResult> = {
      XXS: {
        collarAndBowSize: "XXS",
        usSize: "00-0",
        ukSize: "4-6",
        euSize: "32-34",
        descriptionKey: "xxsDescription",
        popularity: 65,
        alternativeSize: "XS",
        alternativePopularity: 35,
      },
      XS: {
        collarAndBowSize: "XS",
        usSize: "0-2",
        ukSize: "6-8",
        euSize: "34-36",
        descriptionKey: "xsDescription",
        popularity: 70,
        alternativeSize: "S",
        alternativePopularity: 30,
      },
      S: {
        collarAndBowSize: "S",
        usSize: "4-6",
        ukSize: "8-10",
        euSize: "36-38",
        descriptionKey: "sDescription",
        popularity: 75,
        alternativeSize: "M",
        alternativePopularity: 25,
      },
      M: {
        collarAndBowSize: "M",
        usSize: "8-10",
        ukSize: "12-14",
        euSize: "40-42",
        descriptionKey: "mDescription",
        popularity: 80,
        alternativeSize: "S",
        alternativePopularity: 20,
      },
      L: {
        collarAndBowSize: "L",
        usSize: "12-14",
        ukSize: "16-18",
        euSize: "44-46",
        descriptionKey: "lDescription",
        popularity: 75,
        alternativeSize: "M",
        alternativePopularity: 25,
      },
      XL: {
        collarAndBowSize: "XL",
        usSize: "16-18",
        ukSize: "20-22",
        euSize: "48-50",
        descriptionKey: "xlDescription",
        popularity: 70,
        alternativeSize: "L",
        alternativePopularity: 30,
      },
      XXL: {
        collarAndBowSize: "XXL",
        usSize: "20-22",
        ukSize: "24-26",
        euSize: "52-54",
        descriptionKey: "xxlDescription",
        popularity: 65,
        alternativeSize: "XL",
        alternativePopularity: 35,
      },
    }

    return sizeMap[collarAndBowSize] || sizeMap["M"]
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (step.id) {
      case "garment-type":
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">{t("garmentTypeQuestion")}</p>
            <RadioGroup
              value={garmentType}
              onValueChange={(value) => setGarmentType(value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-black transition-colors">
                <GarmentIllustration type="tops" selected={garmentType === "tops"} />
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="tops" id="tops" />
                  <Label htmlFor="tops">{t("shirtsBlazers")}</Label>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-black transition-colors">
                <GarmentIllustration type="bottoms" selected={garmentType === "bottoms"} />
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="bottoms" id="bottoms" />
                  <Label htmlFor="bottoms">{t("bottomsPants")}</Label>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-black transition-colors">
                <GarmentIllustration type="dresses" selected={garmentType === "dresses"} />
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="dresses" id="dresses" />
                  <Label htmlFor="dresses">{t("dressesJumpsuits")}</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )

      case "measurements":
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">{t("measurementsQuestion")}</p>

            <Tabs defaultValue="provide" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="provide">{t("provideMeasurements")}</TabsTrigger>
                <TabsTrigger value="estimate">{t("estimateMeasurements")}</TabsTrigger>
              </TabsList>

              <TabsContent value="provide" className="space-y-4">
                {(garmentType === "tops" || garmentType === "dresses") && (
                  <div className="space-y-2">
                    <Label htmlFor="bustSize">{t("bust")} (cm)</Label>
                    <Input
                      id="bustSize"
                      type="number"
                      placeholder="e.g., 90"
                      value={answers.bustSize}
                      onChange={(e) => handleChange("bustSize", e.target.value)}
                    />
                  </div>
                )}

                {(garmentType === "bottoms" || garmentType === "dresses") && (
                  <div className="space-y-2">
                    <Label htmlFor="waistSize">{t("waist")} (cm)</Label>
                    <Input
                      id="waistSize"
                      type="number"
                      placeholder="e.g., 72"
                      value={answers.waistSize}
                      onChange={(e) => handleChange("waistSize", e.target.value)}
                    />
                  </div>
                )}

                {(garmentType === "bottoms" || garmentType === "dresses") && (
                  <div className="space-y-2">
                    <Label htmlFor="hipSize">{t("hips")} (cm)</Label>
                    <Input
                      id="hipSize"
                      type="number"
                      placeholder="e.g., 98"
                      value={answers.hipSize}
                      onChange={(e) => handleChange("hipSize", e.target.value)}
                    />
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs flex items-center gap-1"
                    onClick={() => setCurrentStep(steps.findIndex((s) => s.id === "height-weight"))}
                  >
                    <Ruler className="h-3 w-3" />
                    {t("dontKnowMeasurements")}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="estimate">
                <p className="text-sm text-gray-600 mb-4">{t("estimateDescription")}</p>
                <Button
                  onClick={() => setCurrentStep(steps.findIndex((s) => s.id === "height-weight"))}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {t("continueToQuestions")}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        )

      case "height-weight":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="height">{t("height")}</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 165"
                value={answers.height}
                onChange={(e) => handleChange("height", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">{t("weight")}</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 60"
                value={answers.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
              />
            </div>
          </div>
        )

      case "age":
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">{t("ageQuestion")}</p>
            <RadioGroup value={answers.age} onValueChange={(value) => handleChange("age", value)} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="18-24" id="age-18-24" />
                <Label htmlFor="age-18-24">{t("ageRange1")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="25-34" id="age-25-34" />
                <Label htmlFor="age-25-34">{t("ageRange2")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="35-44" id="age-35-44" />
                <Label htmlFor="age-35-44">{t("ageRange3")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="45-54" id="age-45-54" />
                <Label htmlFor="age-45-54">{t("ageRange4")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="55+" id="age-55-plus" />
                <Label htmlFor="age-55-plus">{t("ageRange5")}</Label>
              </div>
            </RadioGroup>
          </div>
        )

      case "body-type":
        return (
          <div className="space-y-6">
            <RadioGroup
              value={answers.bodyType}
              onValueChange={(value) => handleChange("bodyType", value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-teal-500 transition-colors">
                <BodyTypeImage type="hourglass" selected={answers.bodyType === "hourglass"} />
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourglass" id="hourglass" />
                  <Label htmlFor="hourglass">{t("hourglass")}</Label>
                </div>
                <p className="text-xs text-center text-gray-500">{t("hourglassDesc")}</p>
              </div>

              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-teal-500 transition-colors">
                <BodyTypeImage type="pear" selected={answers.bodyType === "pear"} />
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pear" id="pear" />
                  <Label htmlFor="pear">{t("pear")}</Label>
                </div>
                <p className="text-xs text-center text-gray-500">{t("pearDesc")}</p>
              </div>

              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-teal-500 transition-colors">
                <BodyTypeImage type="apple" selected={answers.bodyType === "apple"} />
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="apple" id="apple" />
                  <Label htmlFor="apple">{t("apple")}</Label>
                </div>
                <p className="text-xs text-center text-gray-500">{t("appleDesc")}</p>
              </div>

              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-teal-500 transition-colors">
                <BodyTypeImage type="athletic" selected={answers.bodyType === "athletic"} />
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="athletic" id="athletic" />
                  <Label htmlFor="athletic">{t("athletic")}</Label>
                </div>
                <p className="text-xs text-center text-gray-500">{t("athleticDesc")}</p>
              </div>

              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-teal-500 transition-colors md:col-span-2 md:max-w-xs md:mx-auto">
                <BodyTypeImage type="rectangle" selected={answers.bodyType === "rectangle"} />
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rectangle" id="rectangle" />
                  <Label htmlFor="rectangle">{t("rectangle")}</Label>
                </div>
                <p className="text-xs text-center text-gray-500">{t("rectangleDesc")}</p>
              </div>
            </RadioGroup>
          </div>
        )

      case "fit-preference":
        return (
          <RadioGroup
            value={answers.fitPreference}
            onValueChange={(value) => handleChange("fitPreference", value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tight" id="tight" />
              <Label htmlFor="tight">{t("tight")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regular" id="regular" />
              <Label htmlFor="regular">{t("regular")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="loose" id="loose" />
              <Label htmlFor="loose">{t("loose")}</Label>
            </div>
          </RadioGroup>
        )

      case "previous-experience":
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">{t("previousSizeQuestion")}</p>
            <Select value={answers.previousSize} onValueChange={(value) => handleChange("previousSize", value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectSize")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t("noPreviousPurchase")}</SelectItem>
                <SelectItem value="XXS">XXS</SelectItem>
                <SelectItem value="XS">XS</SelectItem>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
                <SelectItem value="XXL">XXL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )

      case "body-proportions":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="shoulder-width">{t("shoulderWidth")}</Label>
                <span className="text-sm text-gray-500">
                  {answers.shoulderWidth < 40 ? t("narrow") : answers.shoulderWidth < 60 ? t("average") : t("broad")}
                </span>
              </div>
              <Slider
                id="shoulder-width"
                min={0}
                max={100}
                step={1}
                value={[answers.shoulderWidth]}
                onValueChange={(value) => handleChange("shoulderWidth", value[0])}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="hip-width">{t("hipWidth")}</Label>
                <span className="text-sm text-gray-500">
                  {answers.hipWidth < 40 ? t("narrow") : answers.hipWidth < 60 ? t("average") : t("wide")}
                </span>
              </div>
              <Slider
                id="hip-width"
                min={0}
                max={100}
                step={1}
                value={[answers.hipWidth]}
                onValueChange={(value) => handleChange("hipWidth", value[0])}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderResult = () => {
    if (!sizeResult) return null

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-100 mb-4">
            <Check className="h-10 w-10 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold">{t("yourRecommendedSize")}</h2>
          <p className="text-gray-600 mt-1">
            {t("forGarmentType")}{" "}
            {garmentType === "tops"
              ? t("topsBlouses")
              : garmentType === "bottoms"
                ? t("bottomsPants")
                : t("dressesJumpsuits")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border-teal-200 shadow-md">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{t("popularChoice")}</h3>
                <Badge className="bg-teal-500">{sizeResult.popularity}%</Badge>
              </div>
              <Progress value={sizeResult.popularity} className="h-2 mb-4" />

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-teal-50 rounded-lg">
                  <h3 className="text-3xl font-bold text-teal-600">{sizeResult.collarAndBowSize}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t("collarAndBowSize")}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold">{sizeResult.usSize}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t("usSize")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold">{sizeResult.ukSize}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t("ukSize")}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold">{sizeResult.euSize}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t("euSize")}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4 text-center">
                {sizeResult.popularity}% {t("ofCustomers")}
              </p>
            </CardContent>
          </Card>

          {sizeResult.alternativeSize && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{t("alternativeSize")}</h3>
                  <Badge variant="outline">{sizeResult.alternativePopularity}%</Badge>
                </div>
                <Progress value={sizeResult.alternativePopularity || 0} className="h-2 mb-4" />

                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-600">{sizeResult.alternativeSize}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t("collarAndBowSize")}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4 text-center">
                  {sizeResult.alternativePopularity}% {t("ofCustomers")}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-6">
          <div className="flex items-start gap-3">
            <Ruler className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium">{t("sizingTip")}</h3>
              <p className="text-sm text-gray-700 mt-1">{t("sizingTipText")}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentStep(0)
              setShowResult(false)
            }}
          >
            {t("startOver")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="border-teal-100">
      <CardContent className="pt-6">
        {!showResult ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{t(steps[currentStep].titleKey)}</h2>
                <span className="text-sm text-gray-500">
                  {currentStep + 1}/{steps.length}
                </span>
              </div>
              <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2 mb-2" />
              <p className="text-gray-600 text-sm">{t(steps[currentStep].descriptionKey)}</p>
            </div>

            {renderStepContent()}

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                {isRtl ? <ArrowRight className="ml-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />} {t("back")}
              </Button>

              <Button onClick={handleNext} className="bg-teal-600 hover:bg-teal-700">
                {currentStep === steps.length - 1 ? t("getMySize") : t("next")}
                {currentStep !== steps.length - 1 &&
                  (isRtl ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />)}
              </Button>
            </div>
          </>
        ) : (
          renderResult()
        )}
      </CardContent>
    </Card>
  )
}
