"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, Check, Ruler } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { GarmentIllustration } from "@/components/garment-illustrations"

type GarmentType = "tops" | "bottoms" | "dresses"

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

export function GarmentSpecificFinder() {
  const { t, isRtl } = useLanguage()
  const [garmentType, setGarmentType] = useState<GarmentType>("tops")
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
  })
  const [fitPreference, setFitPreference] = useState("regular")
  const [showResult, setShowResult] = useState(false)
  const [sizeResult, setSizeResult] = useState<SizeResult | null>(null)

  const handleMeasurementChange = (field: keyof typeof measurements, value: string) => {
    setMeasurements({
      ...measurements,
      [field]: value,
    })
  }

  const calculateSize = () => {
    let size = "M" // Default size

    if (garmentType === "tops") {
      // For tops, use bust measurement
      const bustMeasurement = Number.parseInt(measurements.bust)
      if (!isNaN(bustMeasurement)) {
        const fitCategory = fitPreference === "tight" ? "fitted" : fitPreference === "loose" ? "oversize" : "regular"
        size = findBestSizeMatchForBust(bustMeasurement, fitCategory)
      }
    } else if (garmentType === "bottoms") {
      // For bottoms, use waist measurement
      const waistMeasurement = Number.parseInt(measurements.waist)
      if (!isNaN(waistMeasurement)) {
        size = findBestSizeMatchForWaist(waistMeasurement)
      }
    } else if (garmentType === "dresses") {
      // For dresses, consider both bust and waist
      const bustMeasurement = Number.parseInt(measurements.bust)
      const waistMeasurement = Number.parseInt(measurements.waist)

      if (!isNaN(bustMeasurement) && !isNaN(waistMeasurement)) {
        const fitCategory = fitPreference === "tight" ? "fitted" : fitPreference === "loose" ? "oversize" : "regular"
        const bustSize = findBestSizeMatchForBust(bustMeasurement, fitCategory)
        const waistSize = findBestSizeMatchForWaist(waistMeasurement)

        // Take the larger of the two sizes to ensure comfort
        const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
        const bustIndex = sizes.indexOf(bustSize)
        const waistIndex = sizes.indexOf(waistSize)

        size = sizes[Math.max(bustIndex, waistIndex)]
      } else if (!isNaN(bustMeasurement)) {
        const fitCategory = fitPreference === "tight" ? "fitted" : fitPreference === "loose" ? "oversize" : "regular"
        size = findBestSizeMatchForBust(bustMeasurement, fitCategory)
      } else if (!isNaN(waistMeasurement)) {
        size = findBestSizeMatchForWaist(waistMeasurement)
      }
    }

    setSizeResult(getSizeEquivalents(size))
    setShowResult(true)
  }

  const findBestSizeMatchForBust = (bustMeasurement: number, fitCategory: string): string => {
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

  const findBestSizeMatchForWaist = (waistMeasurement: number): string => {
    // Find the size where the waist measurement falls within the range
    for (const [size, range] of Object.entries(sizeChartData.waist)) {
      if (waistMeasurement >= range[0] && waistMeasurement <= range[1]) {
        return size
      }
    }

    // If no exact match, find the closest size
    let closestSize = "M" // Default
    let minDifference = Number.MAX_VALUE

    for (const [size, range] of Object.entries(sizeChartData.waist)) {
      const midPoint = (range[0] + range[1]) / 2
      const difference = Math.abs(waistMeasurement - midPoint)

      if (difference < minDifference) {
        minDifference = difference
        closestSize = size
      }
    }

    return closestSize
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

  const renderMeasurementForm = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-teal-500 transition-colors cursor-pointer ${garmentType === "tops" ? "border-teal-500 bg-teal-50" : ""}`}
            onClick={() => setGarmentType("tops")}
          >
            <GarmentIllustration type="tops" selected={garmentType === "tops"} />
            <p className="font-medium text-center mt-2">{t("shirtsBlazers")}</p>
          </div>

          <div
            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-teal-500 transition-colors cursor-pointer ${garmentType === "bottoms" ? "border-teal-500 bg-teal-50" : ""}`}
            onClick={() => setGarmentType("bottoms")}
          >
            <GarmentIllustration type="bottoms" selected={garmentType === "bottoms"} />
            <p className="font-medium text-center mt-2">{t("bottomsPants")}</p>
          </div>

          <div
            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-teal-500 transition-colors cursor-pointer ${garmentType === "dresses" ? "border-teal-500 bg-teal-50" : ""}`}
            onClick={() => setGarmentType("dresses")}
          >
            <GarmentIllustration type="dresses" selected={garmentType === "dresses"} />
            <p className="font-medium text-center mt-2">{t("dressesJumpsuits")}</p>
          </div>
        </div>

        <div className="space-y-4">
          {(garmentType === "tops" || garmentType === "dresses") && (
            <div className="space-y-2">
              <Label htmlFor="bust-measurement">{t("bust")} (cm) *</Label>
              <Input
                id="bust-measurement"
                type="number"
                placeholder="e.g., 90"
                value={measurements.bust}
                onChange={(e) => handleMeasurementChange("bust", e.target.value)}
                required={garmentType === "tops"}
              />
            </div>
          )}

          {(garmentType === "bottoms" || garmentType === "dresses") && (
            <div className="space-y-2">
              <Label htmlFor="waist-measurement">{t("waist")} (cm) *</Label>
              <Input
                id="waist-measurement"
                type="number"
                placeholder="e.g., 72"
                value={measurements.waist}
                onChange={(e) => handleMeasurementChange("waist", e.target.value)}
                required={garmentType === "bottoms"}
              />
            </div>
          )}

          {(garmentType === "bottoms" || garmentType === "dresses") && (
            <div className="space-y-2">
              <Label htmlFor="hips-measurement">{t("hips")} (cm)</Label>
              <Input
                id="hips-measurement"
                type="number"
                placeholder="e.g., 98"
                value={measurements.hips}
                onChange={(e) => handleMeasurementChange("hips", e.target.value)}
              />
              <p className="text-xs text-gray-500">{t("optional")}</p>
            </div>
          )}
        </div>

        {(garmentType === "tops" || garmentType === "dresses") && (
          <div className="space-y-2">
            <Label>{t("fitPreference")}</Label>
            <RadioGroup value={fitPreference} onValueChange={setFitPreference} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tight" id="tight-fit" />
                <Label htmlFor="tight-fit">{t("tight")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular-fit" />
                <Label htmlFor="regular-fit">{t("regular")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="loose" id="loose-fit" />
                <Label htmlFor="loose-fit">{t("loose")}</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button
            onClick={calculateSize}
            className="bg-teal-600 hover:bg-teal-700"
            disabled={
              (garmentType === "tops" && !measurements.bust) ||
              (garmentType === "bottoms" && !measurements.waist) ||
              (garmentType === "dresses" && !measurements.bust && !measurements.waist)
            }
          >
            {t("getMySize")}
            {!isRtl && <ArrowRight className="ml-2 h-4 w-4" />}
            {isRtl && <ArrowLeft className="mr-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    )
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
            {garmentType === "tops"
              ? t("shirtsBlazers")
              : garmentType === "bottoms"
                ? t("bottomsPants")
                : t("dressesJumpsuits")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border-teal-100 shadow-md">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{t("popularChoice")}</h3>
                <Badge className="bg-teal-500">{sizeResult.popularity}%</Badge>
              </div>
              <Progress value={sizeResult.popularity} className="h-2 mb-4 bg-neutral-200" />

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-teal-50 rounded-lg">
                  <h3 className="text-3xl font-bold text-teal-600">{sizeResult.collarAndBowSize}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t("size")}</p>
                </div>
                <div className="text-center p-3 bg-neutral-100 rounded-lg">
                  <h3 className="text-xl font-bold">{sizeResult.usSize}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t("usSize")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-neutral-100 rounded-lg">
                  <h3 className="text-xl font-bold">{sizeResult.ukSize}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t("ukSize")}</p>
                </div>
                <div className="text-center p-3 bg-neutral-100 rounded-lg">
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
                <Progress value={sizeResult.alternativePopularity || 0} className="h-2 mb-4 bg-neutral-200" />

                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-3 bg-neutral-100 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-600">{sizeResult.alternativeSize}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t("size")}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4 text-center">
                  {sizeResult.alternativePopularity}% {t("ofCustomers")}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="bg-teal-50 p-4 rounded-lg mt-6">
          <div className="flex items-start gap-3">
            <Ruler className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
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
        <h2 className="text-xl font-semibold mb-4">{t("quickSizeFinder")}</h2>
        {!showResult ? renderMeasurementForm() : renderResult()}
      </CardContent>
    </Card>
  )
}
