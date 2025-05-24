"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { SocialShare } from "@/components/social-share"
import { BodyShapeImage } from "@/components/body-shape-images"

interface GarmentSpecificFinderProps {
  onComplete?: (size: string) => void
}

export function GarmentSpecificFinder({ onComplete }: GarmentSpecificFinderProps) {
  const { t, language, isRtl } = useLanguage()
  const [step, setStep] = useState(1)
  const [garmentType, setGarmentType] = useState<string>("")
  const [bust, setBust] = useState<string>("")
  const [waist, setWaist] = useState<string>("")
  const [hips, setHips] = useState<string>("")
  const [bodyShape, setBodyShape] = useState<string>("")
  const [fitPreference, setFitPreference] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [resultDetails, setResultDetails] = useState<string[]>([])

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1)
    } else {
      // Calculate size based on inputs
      calculateSize()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const calculateSize = () => {
    // More sophisticated algorithm based on garment type, measurements, body shape, and fit preference
    let size = "M" // Default size
    const details: string[] = []

    // Convert measurements to numbers
    const bustNum = Number.parseInt(bust)
    const waistNum = Number.parseInt(waist)
    const hipsNum = Number.parseInt(hips)

    // Determine base size based on primary measurement for the garment type
    if (garmentType === "tops" || garmentType === "dresses") {
      // For tops and dresses, bust is the primary measurement
      if (bustNum < 86) size = "XS"
      else if (bustNum < 90) size = "S"
      else if (bustNum < 94) size = "M"
      else if (bustNum < 98) size = "L"
      else if (bustNum < 102) size = "XL"
      else size = "XXL"

      details.push(t("Your bust measurement is the primary factor for this garment."))
    } else if (garmentType === "bottoms") {
      // For bottoms, hips or waist might be the primary measurement
      // Let's use hips as primary for this example
      if (hipsNum < 90) size = "XS"
      else if (hipsNum < 94) size = "S"
      else if (hipsNum < 98) size = "M"
      else if (hipsNum < 102) size = "L"
      else if (hipsNum < 106) size = "XL"
      else size = "XXL"

      details.push(t("Your hip measurement is the primary factor for this garment."))
    }

    // Adjust for body shape
    if (bodyShape === "curvier") {
      if (garmentType === "tops" && waistNum < bustNum - 10) {
        details.push(t("Your curvier shape may mean a more fitted waist in tops."))
      } else if (garmentType === "bottoms" && hipsNum > waistNum + 12) {
        // If there's a significant difference between hips and waist, might need to size up
        details.push(t("With your curvier shape, consider sizing up for a better fit in the hips."))
        if (size !== "XXL") {
          const sizeIndex = ["XS", "S", "M", "L", "XL", "XXL"].indexOf(size)
          size = ["XS", "S", "M", "L", "XL", "XXL"][sizeIndex + 1]
        }
      }
    } else if (bodyShape === "straighter") {
      if (garmentType === "tops" && Math.abs(bustNum - waistNum) < 6) {
        details.push(t("Your straighter shape may mean a looser fit in the waist for tops."))
      }
    }

    // Adjust for fit preference
    if (fitPreference === "slim") {
      details.push(t("For your preferred slim fit, we recommend this size."))
      // If someone wants slim fit, they might want to size down
      if (size !== "XS" && garmentType !== "bottoms") {
        const sizeIndex = ["XS", "S", "M", "L", "XL", "XXL"].indexOf(size)
        size = ["XS", "S", "M", "L", "XL", "XXL"][sizeIndex - 1]
      }
    } else if (fitPreference === "loose") {
      details.push(t("For your preferred loose fit, we recommend sizing up."))
      // If someone wants loose fit, they might want to size up
      if (size !== "XXL") {
        const sizeIndex = ["XS", "S", "M", "L", "XL", "XXL"].indexOf(size)
        size = ["XS", "S", "M", "L", "XL", "XXL"][sizeIndex + 1]
      }
    } else {
      details.push(t("This regular fit should provide a comfortable, standard fit."))
    }

    setResult(size)
    setResultDetails(details)
    if (onComplete) {
      onComplete(size)
    }
  }

  const renderGarmentTypeStep = () => (
    <>
      <CardHeader>
        <CardTitle className={`text-center ${isRtl ? "text-right" : "text-left"}`}>
          {t("Garment Type Question")}
        </CardTitle>
        <CardDescription className={`text-center ${isRtl ? "text-right" : "text-left"}`}>
          {t("Choose the type of garment you're looking to size")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Tops Option */}
          <Button
            variant={garmentType === "tops" ? "default" : "outline"}
            className={`w-full h-auto p-4 ${isRtl ? "text-right" : "text-left"}`}
            onClick={() => setGarmentType("tops")}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="font-semibold text-base">{t("Shirts & Blazers")}</span>
              <span className="text-sm opacity-80">{t("Shirts, Blouses, T-shirts")}</span>
            </div>
          </Button>

          {/* Bottoms Option */}
          <Button
            variant={garmentType === "bottoms" ? "default" : "outline"}
            className={`w-full h-auto p-4 ${isRtl ? "text-right" : "text-left"}`}
            onClick={() => setGarmentType("bottoms")}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="font-semibold text-base">{t("Bottoms & Pants")}</span>
              <span className="text-sm opacity-80">{t("Pants, Skirts, Shorts")}</span>
            </div>
          </Button>

          {/* Dresses Option */}
          <Button
            variant={garmentType === "dresses" ? "default" : "outline"}
            className={`w-full h-auto p-4 ${isRtl ? "text-right" : "text-left"}`}
            onClick={() => setGarmentType("dresses")}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="font-semibold text-base">{t("Dresses & Jumpsuits")}</span>
              <span className="text-sm opacity-80">{t("Dresses, Jumpsuits")}</span>
            </div>
          </Button>
        </div>
      </CardContent>
    </>
  )

  const renderBustStep = () => (
    <>
      <CardHeader>
        <CardTitle className={isRtl ? "text-right" : "text-left"}>{t("Bust Measurement")}</CardTitle>
        <CardDescription className={isRtl ? "text-right" : "text-left"}>
          {t("Select your bust measurement in centimeters")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={bust} onValueChange={setBust}>
          <SelectTrigger>
            <SelectValue placeholder={t("Select bust measurement")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="82">&lt; 84 cm</SelectItem>
            <SelectItem value="84">84-86 cm</SelectItem>
            <SelectItem value="88">87-90 cm</SelectItem>
            <SelectItem value="92">91-94 cm</SelectItem>
            <SelectItem value="96">95-98 cm</SelectItem>
            <SelectItem value="100">99-102 cm</SelectItem>
            <SelectItem value="104">103-106 cm</SelectItem>
            <SelectItem value="108">&gt; 106 cm</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-4 text-sm text-gray-500">
          <p className={isRtl ? "text-right" : "text-left"}>
            {t("Measure around the fullest part of your bust, keeping the tape measure parallel to the floor.")}
          </p>
        </div>
      </CardContent>
    </>
  )

  const renderWaistStep = () => (
    <>
      <CardHeader>
        <CardTitle className={isRtl ? "text-right" : "text-left"}>{t("Waist Measurement")}</CardTitle>
        <CardDescription className={isRtl ? "text-right" : "text-left"}>
          {t("Select your waist measurement in centimeters")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={waist} onValueChange={setWaist}>
          <SelectTrigger>
            <SelectValue placeholder={t("Select waist measurement")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="62">&lt; 64 cm</SelectItem>
            <SelectItem value="64">64-68 cm</SelectItem>
            <SelectItem value="70">69-72 cm</SelectItem>
            <SelectItem value="74">73-76 cm</SelectItem>
            <SelectItem value="78">77-80 cm</SelectItem>
            <SelectItem value="82">81-84 cm</SelectItem>
            <SelectItem value="86">85-88 cm</SelectItem>
            <SelectItem value="90">&gt; 88 cm</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-4 text-sm text-gray-500">
          <p className={isRtl ? "text-right" : "text-left"}>
            {t(
              "Measure around your natural waistline, which is the narrowest part of your torso, usually just above your belly button.",
            )}
          </p>
        </div>
      </CardContent>
    </>
  )

  const renderHipsStep = () => (
    <>
      <CardHeader>
        <CardTitle className={isRtl ? "text-right" : "text-left"}>{t("Hips Measurement")}</CardTitle>
        <CardDescription className={isRtl ? "text-right" : "text-left"}>
          {t("Select your hips measurement in centimeters")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={hips} onValueChange={setHips}>
          <SelectTrigger>
            <SelectValue placeholder={t("Select hips measurement")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="88">&lt; 90 cm</SelectItem>
            <SelectItem value="90">90-94 cm</SelectItem>
            <SelectItem value="94">95-98 cm</SelectItem>
            <SelectItem value="98">99-102 cm</SelectItem>
            <SelectItem value="102">103-106 cm</SelectItem>
            <SelectItem value="106">107-110 cm</SelectItem>
            <SelectItem value="110">111-114 cm</SelectItem>
            <SelectItem value="114">&gt; 114 cm</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-4 text-sm text-gray-500">
          <p className={isRtl ? "text-right" : "text-left"}>
            {t("Measure around the fullest part of your hips, usually about 8 inches below your waistline.")}
          </p>
        </div>
      </CardContent>
    </>
  )

  const renderBodyShapeStep = () => (
    <>
      <CardHeader>
        <CardTitle className={isRtl ? "text-right" : "text-left"}>{t("Body Shape")}</CardTitle>
        <CardDescription className={isRtl ? "text-right" : "text-left"}>
          {t("Select the option that best describes your body shape")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div
            className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
              bodyShape === "straighter" ? "bg-blue-50 border-blue-200" : "border-gray-200"
            } ${isRtl ? "flex-row-reverse" : ""}`}
            onClick={() => setBodyShape("straighter")}
          >
            <input
              type="radio"
              name="bodyShape"
              id="body-shape-1"
              value="straighter"
              checked={bodyShape === "straighter"}
              onChange={() => setBodyShape("straighter")}
              className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-3" : "mr-3"}`}
            />
            <div
              className={`flex items-center flex-1 ${isRtl ? "flex-row-reverse space-x-reverse space-x-3" : "space-x-3"}`}
            >
              <BodyShapeImage type="straighter" selected={bodyShape === "straighter"} bodyPart="hip" />
              <Label htmlFor="body-shape-1" className={`cursor-pointer text-sm ${isRtl ? "text-right" : "text-left"}`}>
                {t("Straighter Hips")} - {t("Less defined curves, more athletic build")}
              </Label>
            </div>
          </div>
          <div
            className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
              bodyShape === "average" ? "bg-blue-50 border-blue-200" : "border-gray-200"
            } ${isRtl ? "flex-row-reverse" : ""}`}
            onClick={() => setBodyShape("average")}
          >
            <input
              type="radio"
              name="bodyShape"
              id="body-shape-2"
              value="average"
              checked={bodyShape === "average"}
              onChange={() => setBodyShape("average")}
              className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-3" : "mr-3"}`}
            />
            <div
              className={`flex items-center flex-1 ${isRtl ? "flex-row-reverse space-x-reverse space-x-3" : "space-x-3"}`}
            >
              <BodyShapeImage type="average" selected={bodyShape === "average"} bodyPart="hip" />
              <Label htmlFor="body-shape-2" className={`cursor-pointer text-sm ${isRtl ? "text-right" : "text-left"}`}>
                {t("Average Hips")} - {t("Balanced proportions")}
              </Label>
            </div>
          </div>
          <div
            className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
              bodyShape === "wider" ? "bg-blue-50 border-blue-200" : "border-gray-200"
            } ${isRtl ? "flex-row-reverse" : ""}`}
            onClick={() => setBodyShape("wider")}
          >
            <input
              type="radio"
              name="bodyShape"
              id="body-shape-3"
              value="wider"
              checked={bodyShape === "wider"}
              onChange={() => setBodyShape("wider")}
              className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-3" : "mr-3"}`}
            />
            <div
              className={`flex items-center flex-1 ${isRtl ? "flex-row-reverse space-x-reverse space-x-3" : "space-x-3"}`}
            >
              <BodyShapeImage type="wider" selected={bodyShape === "wider"} bodyPart="hip" />
              <Label htmlFor="body-shape-3" className={`cursor-pointer text-sm ${isRtl ? "text-right" : "text-left"}`}>
                {t("Wider Hips")} - {t("More defined waist-to-hip ratio")}
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )

  const renderFitPreferenceStep = () => (
    <>
      <CardHeader>
        <CardTitle className={isRtl ? "text-right" : "text-left"}>{t("Fit Preference")}</CardTitle>
        <CardDescription className={isRtl ? "text-right" : "text-left"}>
          {t("How do you prefer your clothes to fit?")}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              {t("Slim Fit")} - {t("Fitted, close to body")}
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
              {t("Regular Fit")} - {t("Standard, not too tight or loose")}
            </Label>
          </div>
          <div
            className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
              fitPreference === "loose" ? "bg-blue-50 border-blue-200" : "border-gray-200"
            } ${isRtl ? "flex-row-reverse" : ""}`}
            onClick={() => setFitPreference("loose")}
          >
            <input
              type="radio"
              name="fitPreference"
              id="fit-3"
              value="loose"
              checked={fitPreference === "loose"}
              onChange={() => setFitPreference("loose")}
              className={`form-radio w-4 h-4 accent-black ${isRtl ? "ml-3" : "mr-3"}`}
            />
            <Label htmlFor="fit-3" className={`flex-1 cursor-pointer text-sm ${isRtl ? "text-right" : "text-left"}`}>
              {t("Loose Fit")} - {t("Relaxed, roomier")}
            </Label>
          </div>
        </div>
      </CardContent>
    </>
  )

  const renderResult = () => (
    <>
      <CardHeader>
        <CardTitle className={isRtl ? "text-center" : "text-center"}>{t("Your Recommended Size")}</CardTitle>
        <CardDescription className={isRtl ? "text-center" : "text-center"}>
          {t("Based on your measurements and preferences")}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-5xl font-bold mb-4">{result}</div>
        <div className="text-sm text-gray-600 mb-6 space-y-2">
          {resultDetails.map((detail, index) => (
            <p key={index} className={isRtl ? "text-center" : "text-center"}>
              {detail}
            </p>
          ))}
        </div>
        <div className="mt-6">
          <SocialShare />
        </div>
      </CardContent>
    </>
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      {step === 1 && renderGarmentTypeStep()}
      {step === 2 && renderBustStep()}
      {step === 3 && renderWaistStep()}
      {step === 4 && renderHipsStep()}
      {step === 5 && renderBodyShapeStep()}
      {step === 6 && renderFitPreferenceStep()}
      {result && renderResult()}

      {!result && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            {t("Back")}
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !garmentType) ||
              (step === 2 && !bust) ||
              (step === 3 && !waist) ||
              (step === 4 && !hips) ||
              (step === 5 && !bodyShape) ||
              (step === 6 && !fitPreference)
            }
          >
            {step === 6 ? t("Find My Size") : t("Next")}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default GarmentSpecificFinder
