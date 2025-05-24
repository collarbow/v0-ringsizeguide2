"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import Link from "next/link"

type MeasurementSystem = "cm" | "inches"

// Replace the entire component structure with better mobile alignment
export function FitExplanation() {
  const { t, language, isRtl } = useLanguage()
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>("cm")

  // Format measurement to display a single value
  const formatMeasurement = (value: number): string => {
    if (measurementSystem === "inches") {
      return (value / 2.54).toFixed(1)
    }
    return value.toString()
  }

  // Get unit display
  const getUnitDisplay = (): string => {
    return measurementSystem === "cm" ? t("cm") : t("inches")
  }

  // Fit type data for rendering
  const fitTypes = [
    {
      type: "Slim Fit",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      badgeColor: "bg-pink-100 text-pink-800 hover:bg-pink-100",
      ease: measurementSystem === "cm" ? "2" : "0.8",
    },
    {
      type: "Regular Fit",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      badgeColor: "bg-teal-100 text-teal-800 hover:bg-teal-100",
      ease: measurementSystem === "cm" ? "6" : "2.4",
    },
    {
      type: "Relaxed Fit",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      badgeColor: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      ease: measurementSystem === "cm" ? "8" : "3.1",
    },
    {
      type: "Oversized Fit",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      badgeColor: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      ease: measurementSystem === "cm" ? "10" : "3.9",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className={`text-lg sm:text-xl ${isRtl ? "text-right" : "text-left"}`}>
          {t("Fit Type Guide")}
        </CardTitle>
        <CardDescription className={`text-sm sm:text-base ${isRtl ? "text-right" : "text-left"}`}>
          {t("Understanding different fit types and how they affect garment measurements")}
        </CardDescription>
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setMeasurementSystem("cm")}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              measurementSystem === "cm" ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {t("Centimeters")}
          </button>
          <button
            onClick={() => setMeasurementSystem("inches")}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              measurementSystem === "inches"
                ? "bg-teal-100 text-teal-800"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {t("Inches")}
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="description" className="text-xs sm:text-sm">
              {t("Fit Descriptions")}
            </TabsTrigger>
            <TabsTrigger value="measurements" className="text-xs sm:text-sm">
              {t("Bust Measurements")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-3">
            <div className="space-y-3">
              {fitTypes.map((fit) => (
                <div key={fit.type} className={`p-3 sm:p-4 border rounded-lg ${fit.bgColor} ${fit.borderColor}`}>
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center mb-2 ${isRtl ? "sm:flex-row-reverse" : ""}`}
                  >
                    <Badge
                      variant="outline"
                      className={`${fit.badgeColor} mb-2 sm:mb-0 ${isRtl ? "sm:ml-2" : "sm:mr-2"} text-xs`}
                    >
                      {t(fit.type)}
                    </Badge>
                  </div>
                  <p
                    className={`text-xs sm:text-sm text-gray-700 leading-relaxed ${isRtl ? "text-right" : "text-left"}`}
                  >
                    {language === "ar" ? t(`${fit.type} Description Arabic`) : t(`${fit.type} Description`)}
                  </p>
                  <p className={`text-xs sm:text-sm text-gray-700 mt-2 ${isRtl ? "text-right" : "text-left"}`}>
                    <strong>{t("Ease")}:</strong> {fit.type === "Slim Fit" ? t("Only") : ""} +{fit.ease}{" "}
                    {getUnitDisplay()} {t("added to your body bust measurement")}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/fit-guide" className="text-teal-600 hover:text-teal-800 text-sm font-medium underline">
                {language === "ar" ? "عرض دليل المقاسات التفصيلي" : "View detailed fit guide"}
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="measurements">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <Table className="w-full text-xs">
                  <TableHeader>
                    <TableRow>
                      <TableHead className={`font-bold text-center ${isRtl ? "text-right" : "text-left"}`}>
                        {t("Size")}
                      </TableHead>
                      <TableHead className="font-bold text-center bg-gray-100">{t("Body Bust")}</TableHead>
                      <TableHead className="font-bold text-center bg-pink-100">
                        <div className="text-center">
                          <div className="text-xs font-semibold">{t("Slim Fit")}</div>
                          <div className="text-xs opacity-75">
                            (+{measurementSystem === "cm" ? "2" : "0.8"} {getUnitDisplay()})
                          </div>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-center bg-teal-100">
                        <div className="text-center">
                          <div className="text-xs font-semibold">{t("Regular Fit")}</div>
                          <div className="text-xs opacity-75">
                            (+{measurementSystem === "cm" ? "6" : "2.4"} {getUnitDisplay()})
                          </div>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-center bg-blue-100">
                        <div className="text-center">
                          <div className="text-xs font-semibold">{t("Relaxed Fit")}</div>
                          <div className="text-xs opacity-75">
                            (+{measurementSystem === "cm" ? "8" : "3.1"} {getUnitDisplay()})
                          </div>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-center bg-purple-100">
                        <div className="text-center">
                          <div className="text-xs font-semibold">{t("Oversized Fit")}</div>
                          <div className="text-xs opacity-75">
                            (+{measurementSystem === "cm" ? "10" : "3.9"} {getUnitDisplay()})
                          </div>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size, index) => {
                      const baseBust = 84 + index * 4
                      return (
                        <TableRow key={size}>
                          <TableCell className="font-medium text-center text-xs">{size}</TableCell>
                          <TableCell className="text-center bg-gray-50 text-xs">
                            {formatMeasurement(baseBust)}
                          </TableCell>
                          <TableCell className="text-center bg-pink-50 text-xs">
                            {formatMeasurement(baseBust + 2)}
                          </TableCell>
                          <TableCell className="text-center bg-teal-50 text-xs">
                            {formatMeasurement(baseBust + 6)}
                          </TableCell>
                          <TableCell className="text-center bg-blue-50 text-xs">
                            {formatMeasurement(baseBust + 8)}
                          </TableCell>
                          <TableCell className="text-center bg-purple-50 text-xs">
                            {formatMeasurement(baseBust + 10)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className={`font-medium mb-2 text-sm ${isRtl ? "text-right" : "text-left"}`}>
                {t("How to Use This Chart")}
              </h4>
              <ol
                className={`space-y-1 text-xs text-gray-700 ${isRtl ? "list-decimal list-inside text-right" : "list-decimal list-inside text-left"}`}
              >
                <li>{t("Measure your bust at the fullest point")}</li>
                <li>{t("Find your body bust measurement in the second column")}</li>
                <li>{t("Choose your preferred fit type based on how you want the garment to feel")}</li>
                <li>{t("The number in the corresponding column shows how large the garment will be")}</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
