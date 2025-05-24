"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"

interface SimpleSizeFinderProps {
  onComplete?: (size: string) => void
}

export function SimpleSizeFinder({ onComplete }: SimpleSizeFinderProps) {
  const { t, isRtl } = useLanguage()
  const [garmentType, setGarmentType] = useState<string>("")
  const [bodySize, setBodySize] = useState<string>("")
  const [fitPreference, setFitPreference] = useState<string>("")
  const [result, setResult] = useState<string>("")

  const calculateSize = () => {
    let size = "M" // Default size

    // Size calculation based on garment type, body size and fit preference
    if (garmentType === "shirts") {
      // For shirts & blazers (bust-based)
      if (bodySize === "small") {
        size =
          fitPreference === "slim" ? "XS" : fitPreference === "regular" ? "S" : fitPreference === "relaxed" ? "M" : "L"
      } else if (bodySize === "medium") {
        size =
          fitPreference === "slim" ? "S" : fitPreference === "regular" ? "M" : fitPreference === "relaxed" ? "L" : "XL"
      } else if (bodySize === "large") {
        size =
          fitPreference === "slim"
            ? "M"
            : fitPreference === "regular"
              ? "L"
              : fitPreference === "relaxed"
                ? "XL"
                : "XXL"
      } else if (bodySize === "xlarge") {
        size =
          fitPreference === "slim"
            ? "L"
            : fitPreference === "regular"
              ? "XL"
              : fitPreference === "relaxed"
                ? "XXL"
                : "XXXL"
      }
    } else if (garmentType === "bottoms") {
      // For bottoms & pants (waist-based)
      if (bodySize === "small") {
        size =
          fitPreference === "slim" ? "XS" : fitPreference === "regular" ? "S" : fitPreference === "relaxed" ? "M" : "L"
      } else if (bodySize === "medium") {
        size =
          fitPreference === "slim" ? "S" : fitPreference === "regular" ? "M" : fitPreference === "relaxed" ? "L" : "XL"
      } else if (bodySize === "large") {
        size =
          fitPreference === "slim"
            ? "M"
            : fitPreference === "regular"
              ? "L"
              : fitPreference === "relaxed"
                ? "XL"
                : "XXL"
      } else if (bodySize === "xlarge") {
        size =
          fitPreference === "slim"
            ? "L"
            : fitPreference === "regular"
              ? "XL"
              : fitPreference === "relaxed"
                ? "XXL"
                : "XXXL"
      }
    }

    setResult(size)
    if (onComplete) {
      onComplete(size)
    }
  }

  const handleGetSize = () => {
    if (garmentType && bodySize && fitPreference) {
      calculateSize()
    }
  }

  const resetForm = () => {
    setResult("")
    setGarmentType("")
    setBodySize("")
    setFitPreference("")
  }

  if (result) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{t("Your Recommended Size")}</CardTitle>
          <CardDescription className="text-center">
            {garmentType === "shirts" ? t("For Shirts & Blazers") : t("For Bottoms & Pants")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-5xl font-bold mb-4 text-teal-600">{result}</div>
          <p className="text-sm text-gray-500 mb-4">
            {t("This recommendation is based on your measurements and fit preference.")}
          </p>
          <Button onClick={resetForm} variant="outline" className="w-full">
            {t("Start Over")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className={isRtl ? "text-right" : "text-left"}>{t("Quick Size Finder")}</CardTitle>
        <CardDescription className={isRtl ? "text-right" : "text-left"}>
          {t("Find your perfect size in just 2 questions")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question 1: Garment Type & Body Size */}
        <div className="space-y-3">
          <Label className={`text-sm font-medium ${isRtl ? "text-right" : "text-left"}`}>
            {t("1. Select garment type and your size:")}
          </Label>

          {/* Shirts & Blazers Section */}
          <div className="space-y-2">
            <h4 className={`text-sm font-medium text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>
              {t("Shirts & Blazers (Bust Size)")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`flex items-center p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                  garmentType === "shirts" && bodySize === "small" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
                onClick={() => {
                  setGarmentType("shirts")
                  setBodySize("small")
                }}
              >
                <input
                  type="radio"
                  name="garmentSize"
                  id="shirts-small"
                  checked={garmentType === "shirts" && bodySize === "small"}
                  onChange={() => {
                    setGarmentType("shirts")
                    setBodySize("small")
                  }}
                  className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-2" : "mr-2"}`}
                />
                <Label
                  htmlFor="shirts-small"
                  className={`cursor-pointer text-xs ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("Small (32A-34B)")}
                </Label>
              </div>
              <div
                className={`flex items-center p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                  garmentType === "shirts" && bodySize === "medium" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
                onClick={() => {
                  setGarmentType("shirts")
                  setBodySize("medium")
                }}
              >
                <input
                  type="radio"
                  name="garmentSize"
                  id="shirts-medium"
                  checked={garmentType === "shirts" && bodySize === "medium"}
                  onChange={() => {
                    setGarmentType("shirts")
                    setBodySize("medium")
                  }}
                  className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-2" : "mr-2"}`}
                />
                <Label
                  htmlFor="shirts-medium"
                  className={`cursor-pointer text-xs ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("Medium (34C-36D)")}
                </Label>
              </div>
              <div
                className={`flex items-center p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                  garmentType === "shirts" && bodySize === "large" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
                onClick={() => {
                  setGarmentType("shirts")
                  setBodySize("large")
                }}
              >
                <input
                  type="radio"
                  name="garmentSize"
                  id="shirts-large"
                  checked={garmentType === "shirts" && bodySize === "large"}
                  onChange={() => {
                    setGarmentType("shirts")
                    setBodySize("large")
                  }}
                  className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-2" : "mr-2"}`}
                />
                <Label
                  htmlFor="shirts-large"
                  className={`cursor-pointer text-xs ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("Large (36DD-38F)")}
                </Label>
              </div>
              <div
                className={`flex items-center p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                  garmentType === "shirts" && bodySize === "xlarge" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
                onClick={() => {
                  setGarmentType("shirts")
                  setBodySize("xlarge")
                }}
              >
                <input
                  type="radio"
                  name="garmentSize"
                  id="shirts-xlarge"
                  checked={garmentType === "shirts" && bodySize === "xlarge"}
                  onChange={() => {
                    setGarmentType("shirts")
                    setBodySize("xlarge")
                  }}
                  className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-2" : "mr-2"}`}
                />
                <Label
                  htmlFor="shirts-xlarge"
                  className={`cursor-pointer text-xs ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("XL (38G+)")}
                </Label>
              </div>
            </div>
          </div>

          {/* Bottoms & Pants Section */}
          <div className="space-y-2">
            <h4 className={`text-sm font-medium text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>
              {t("Bottoms & Pants (Waist Size)")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`flex items-center p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                  garmentType === "bottoms" && bodySize === "small" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
                onClick={() => {
                  setGarmentType("bottoms")
                  setBodySize("small")
                }}
              >
                <input
                  type="radio"
                  name="garmentSize"
                  id="bottoms-small"
                  checked={garmentType === "bottoms" && bodySize === "small"}
                  onChange={() => {
                    setGarmentType("bottoms")
                    setBodySize("small")
                  }}
                  className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-2" : "mr-2"}`}
                />
                <Label
                  htmlFor="bottoms-small"
                  className={`cursor-pointer text-xs ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("Small (24-26)")}
                </Label>
              </div>
              <div
                className={`flex items-center p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                  garmentType === "bottoms" && bodySize === "medium" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
                onClick={() => {
                  setGarmentType("bottoms")
                  setBodySize("medium")
                }}
              >
                <input
                  type="radio"
                  name="garmentSize"
                  id="bottoms-medium"
                  checked={garmentType === "bottoms" && bodySize === "medium"}
                  onChange={() => {
                    setGarmentType("bottoms")
                    setBodySize("medium")
                  }}
                  className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-2" : "mr-2"}`}
                />
                <Label
                  htmlFor="bottoms-medium"
                  className={`cursor-pointer text-xs ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("Medium (28-30)")}
                </Label>
              </div>
              <div
                className={`flex items-center p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                  garmentType === "bottoms" && bodySize === "large" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
                onClick={() => {
                  setGarmentType("bottoms")
                  setBodySize("large")
                }}
              >
                <input
                  type="radio"
                  name="garmentSize"
                  id="bottoms-large"
                  checked={garmentType === "bottoms" && bodySize === "large"}
                  onChange={() => {
                    setGarmentType("bottoms")
                    setBodySize("large")
                  }}
                  className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-2" : "mr-2"}`}
                />
                <Label
                  htmlFor="bottoms-large"
                  className={`cursor-pointer text-xs ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("Large (32-34)")}
                </Label>
              </div>
              <div
                className={`flex items-center p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                  garmentType === "bottoms" && bodySize === "xlarge" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
                onClick={() => {
                  setGarmentType("bottoms")
                  setBodySize("xlarge")
                }}
              >
                <input
                  type="radio"
                  name="garmentSize"
                  id="bottoms-xlarge"
                  checked={garmentType === "bottoms" && bodySize === "xlarge"}
                  onChange={() => {
                    setGarmentType("bottoms")
                    setBodySize("xlarge")
                  }}
                  className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-2" : "mr-2"}`}
                />
                <Label
                  htmlFor="bottoms-xlarge"
                  className={`cursor-pointer text-xs ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("XL (36+)")}
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Question 2: Fit Preference */}
        <div className="space-y-3">
          <Label className={`text-sm font-medium ${isRtl ? "text-right" : "text-left"}`}>
            {t("2. How do you prefer your clothes to fit?")}
          </Label>
          <div className="space-y-3">
            <div
              className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                fitPreference === "slim" ? "bg-blue-50 border-blue-200" : "border-gray-200"
              } ${isRtl ? "flex-row-reverse" : ""}`}
              onClick={() => setFitPreference("slim")}
            >
              <input
                type="radio"
                name="fitPreference"
                id="fit-1"
                value="slim"
                checked={fitPreference === "slim"}
                onChange={() => setFitPreference("slim")}
                className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-3" : "mr-3"}`}
              />
              <Label htmlFor="fit-1" className={`flex-1 cursor-pointer text-sm ${isRtl ? "text-right" : "text-left"}`}>
                {t("Slim - Fitted, close to body")}
              </Label>
            </div>
            <div
              className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                fitPreference === "regular" ? "bg-blue-50 border-blue-200" : "border-gray-200"
              } ${isRtl ? "flex-row-reverse" : ""}`}
              onClick={() => setFitPreference("regular")}
            >
              <input
                type="radio"
                name="fitPreference"
                id="fit-2"
                value="regular"
                checked={fitPreference === "regular"}
                onChange={() => setFitPreference("regular")}
                className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-3" : "mr-3"}`}
              />
              <Label htmlFor="fit-2" className={`flex-1 cursor-pointer text-sm ${isRtl ? "text-right" : "text-left"}`}>
                {t("Regular - Standard, comfortable fit")}
              </Label>
            </div>
            <div
              className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                fitPreference === "relaxed" ? "bg-blue-50 border-blue-200" : "border-gray-200"
              } ${isRtl ? "flex-row-reverse" : ""}`}
              onClick={() => setFitPreference("relaxed")}
            >
              <input
                type="radio"
                name="fitPreference"
                id="fit-3"
                value="relaxed"
                checked={fitPreference === "relaxed"}
                onChange={() => setFitPreference("relaxed")}
                className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-3" : "mr-3"}`}
              />
              <Label htmlFor="fit-3" className={`flex-1 cursor-pointer text-sm ${isRtl ? "text-right" : "text-left"}`}>
                {t("Relaxed - Loose, roomier fit")}
              </Label>
            </div>
            <div
              className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                fitPreference === "oversize" ? "bg-blue-50 border-blue-200" : "border-gray-200"
              } ${isRtl ? "flex-row-reverse" : ""}`}
              onClick={() => setFitPreference("oversize")}
            >
              <input
                type="radio"
                name="fitPreference"
                id="fit-4"
                value="oversize"
                checked={fitPreference === "oversize"}
                onChange={() => setFitPreference("oversize")}
                className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-3" : "mr-3"}`}
              />
              <Label htmlFor="fit-4" className={`flex-1 cursor-pointer text-sm ${isRtl ? "text-right" : "text-left"}`}>
                {t("Oversize - Very loose, trendy fit")}
              </Label>
            </div>
          </div>
        </div>

        <Button onClick={handleGetSize} disabled={!garmentType || !bodySize || !fitPreference} className="w-full">
          {t("Get My Size")}
        </Button>
      </CardContent>
    </Card>
  )
}

export default SimpleSizeFinder
