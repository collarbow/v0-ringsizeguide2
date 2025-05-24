"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type MeasurementSystem = "cm" | "inches"

export function SizeChart() {
  const { t, isRtl } = useLanguage()
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>("cm")
  const [garmentType, setGarmentType] = useState("tops")

  // Format measurement to display a single value
  const formatMeasurement = (value: number): string => {
    if (measurementSystem === "inches") {
      return (value / 2.54).toFixed(1)
    }
    return value.toString()
  }

  // Get unit display
  const getUnitDisplay = (): string => {
    return measurementSystem === "cm" ? "cm" : "inches"
  }

  // Common cell classes for consistent styling with increased spacing
  const headerClass = "font-bold text-center px-3 py-3 text-xs sm:text-sm whitespace-nowrap"
  const coloredHeaderClass = "font-bold text-center px-3 py-3 text-xs sm:text-sm whitespace-nowrap"
  const cellClass = "text-center px-3 py-3 text-xs sm:text-sm whitespace-nowrap"
  const coloredCellClass = "text-center px-3 py-3 text-xs sm:text-sm whitespace-nowrap"

  // Update the tops chart with the new bust measurements and fit types
  const renderTopsChart = () => (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="min-w-[800px]">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className={`${headerClass} sticky left-0 bg-white z-10 border-r`}>{t("Size")}</TableHead>
                <TableHead className={headerClass}>{t("US Size")}</TableHead>
                <TableHead className={headerClass}>{t("UK Size")}</TableHead>
                <TableHead className={headerClass}>{t("EU Size")}</TableHead>
                <TableHead className={`${coloredHeaderClass} bg-pink-100`}>
                  {t("Body Bust")} ({getUnitDisplay()})
                </TableHead>
                <TableHead className={`${coloredHeaderClass} bg-teal-100`}>
                  {t("waist")} ({getUnitDisplay()})
                </TableHead>
                <TableHead className={`${coloredHeaderClass} bg-blue-100`}>
                  {t("Hips")} ({getUnitDisplay()})
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XS</TableCell>
                <TableCell className={cellClass}>0</TableCell>
                <TableCell className={cellClass}>6</TableCell>
                <TableCell className={cellClass}>34</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(84)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(66)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(90)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>S</TableCell>
                <TableCell className={cellClass}>2</TableCell>
                <TableCell className={cellClass}>8</TableCell>
                <TableCell className={cellClass}>36</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(88)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(70)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(94)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>M</TableCell>
                <TableCell className={cellClass}>4</TableCell>
                <TableCell className={cellClass}>10</TableCell>
                <TableCell className={cellClass}>38</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(92)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(74)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(98)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>L</TableCell>
                <TableCell className={cellClass}>6</TableCell>
                <TableCell className={cellClass}>12</TableCell>
                <TableCell className={cellClass}>40</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(96)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(78)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(102)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XL</TableCell>
                <TableCell className={cellClass}>8</TableCell>
                <TableCell className={cellClass}>14</TableCell>
                <TableCell className={cellClass}>42</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(100)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(82)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(106)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XXL</TableCell>
                <TableCell className={cellClass}>10</TableCell>
                <TableCell className={cellClass}>16</TableCell>
                <TableCell className={cellClass}>44</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(104)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(86)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(110)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
        <ChevronLeft className="h-3 w-3 mr-1" />
        <span>{t("Swipe To View")}</span>
        <ChevronRight className="h-3 w-3 ml-1" />
      </div>
    </div>
  )

  // Render the bottoms chart with updated hips measurements
  const renderBottomsChart = () => (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="min-w-[600px]">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className={`${headerClass} sticky left-0 bg-white z-10 border-r`}>{t("Size")}</TableHead>
                <TableHead className={headerClass}>{t("US Size")}</TableHead>
                <TableHead className={headerClass}>{t("UK Size")}</TableHead>
                <TableHead className={headerClass}>{t("EU Size")}</TableHead>
                <TableHead className={`${coloredHeaderClass} bg-teal-100`}>
                  {t("waist")} ({getUnitDisplay()})
                </TableHead>
                <TableHead className={`${coloredHeaderClass} bg-pink-100`}>
                  {t("Hips")} ({getUnitDisplay()})
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XS</TableCell>
                <TableCell className={cellClass}>0</TableCell>
                <TableCell className={cellClass}>6</TableCell>
                <TableCell className={cellClass}>34</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(62)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(88)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>S</TableCell>
                <TableCell className={cellClass}>2</TableCell>
                <TableCell className={cellClass}>8</TableCell>
                <TableCell className={cellClass}>36</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(66)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(92)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>M</TableCell>
                <TableCell className={cellClass}>4</TableCell>
                <TableCell className={cellClass}>10</TableCell>
                <TableCell className={cellClass}>38</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(70)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(96)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>L</TableCell>
                <TableCell className={cellClass}>6</TableCell>
                <TableCell className={cellClass}>12</TableCell>
                <TableCell className={cellClass}>40</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(74)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(100)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XL</TableCell>
                <TableCell className={cellClass}>8</TableCell>
                <TableCell className={cellClass}>14</TableCell>
                <TableCell className={cellClass}>42</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(78)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(104)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XXL</TableCell>
                <TableCell className={cellClass}>10</TableCell>
                <TableCell className={cellClass}>16</TableCell>
                <TableCell className={cellClass}>44</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(82)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(108)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
        <ChevronLeft className="h-3 w-3 mr-1" />
        <span>{t("Swipe To View")}</span>
        <ChevronRight className="h-3 w-3 ml-1" />
      </div>
    </div>
  )

  // Update the dresses chart to use the same body bust measurements as shirts & blazers
  const renderDressesChart = () => (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="min-w-[800px]">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className={`${headerClass} sticky left-0 bg-white z-10 border-r`}>{t("Size")}</TableHead>
                <TableHead className={headerClass}>{t("US Size")}</TableHead>
                <TableHead className={headerClass}>{t("UK Size")}</TableHead>
                <TableHead className={headerClass}>{t("EU Size")}</TableHead>
                <TableHead className={`${coloredHeaderClass} bg-pink-100`}>
                  {t("Body Bust")} ({getUnitDisplay()})
                </TableHead>
                <TableHead className={`${coloredHeaderClass} bg-teal-100`}>
                  {t("waist")} ({getUnitDisplay()})
                </TableHead>
                <TableHead className={`${coloredHeaderClass} bg-blue-100`}>
                  {t("Hips")} ({getUnitDisplay()})
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XS</TableCell>
                <TableCell className={cellClass}>0</TableCell>
                <TableCell className={cellClass}>6</TableCell>
                <TableCell className={cellClass}>34</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(84)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(66)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(90)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>S</TableCell>
                <TableCell className={cellClass}>2</TableCell>
                <TableCell className={cellClass}>8</TableCell>
                <TableCell className={cellClass}>36</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(88)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(70)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(94)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>M</TableCell>
                <TableCell className={cellClass}>4</TableCell>
                <TableCell className={cellClass}>10</TableCell>
                <TableCell className={cellClass}>38</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(92)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(74)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(98)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>L</TableCell>
                <TableCell className={cellClass}>6</TableCell>
                <TableCell className={cellClass}>12</TableCell>
                <TableCell className={cellClass}>40</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(96)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(78)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(102)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XL</TableCell>
                <TableCell className={cellClass}>8</TableCell>
                <TableCell className={cellClass}>14</TableCell>
                <TableCell className={cellClass}>42</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(100)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(82)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(106)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XXL</TableCell>
                <TableCell className={cellClass}>10</TableCell>
                <TableCell className={cellClass}>16</TableCell>
                <TableCell className={cellClass}>44</TableCell>
                <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(104)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(86)}</TableCell>
                <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(110)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
        <ChevronLeft className="h-3 w-3 mr-1" />
        <span>{t("Swipe To View")}</span>
        <ChevronRight className="h-3 w-3 ml-1" />
      </div>
    </div>
  )

  // Update the fit type chart with the new measurements for each fit type
  const renderFitTypeChart = () => {
    const unitSuffix = measurementSystem === "cm" ? " cm" : " in"

    return (
      <div className="relative">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="min-w-[900px]">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className={`${headerClass} sticky left-0 bg-white z-10 border-r`}>{t("Size")}</TableHead>
                  <TableHead className={`${coloredHeaderClass} bg-gray-100`}>{t("Body Bust")}</TableHead>
                  <TableHead className={`${coloredHeaderClass} bg-pink-100`} colSpan={1}>
                    {t("Slim Fit")} (+{measurementSystem === "cm" ? "2" : "0.8"}
                    {unitSuffix})
                  </TableHead>
                  <TableHead className={`${coloredHeaderClass} bg-teal-100`} colSpan={1}>
                    {t("Regular Fit")} (+{measurementSystem === "cm" ? "6" : "2.4"}
                    {unitSuffix})
                  </TableHead>
                  <TableHead className={`${coloredHeaderClass} bg-blue-100`} colSpan={1}>
                    {t("Relaxed Fit")} (+{measurementSystem === "cm" ? "8" : "3.1"}
                    {unitSuffix})
                  </TableHead>
                  <TableHead className={`${coloredHeaderClass} bg-purple-100`} colSpan={1}>
                    {t("Oversized Fit")} (+{measurementSystem === "cm" ? "10" : "3.9"}
                    {unitSuffix})
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XS</TableCell>
                  <TableCell className={`${coloredCellClass} bg-gray-50`}>{formatMeasurement(84)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(86)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(90)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(92)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-purple-50`}>{formatMeasurement(94)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>S</TableCell>
                  <TableCell className={`${coloredCellClass} bg-gray-50`}>{formatMeasurement(88)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(90)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(94)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(96)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-purple-50`}>{formatMeasurement(98)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>M</TableCell>
                  <TableCell className={`${coloredCellClass} bg-gray-50`}>{formatMeasurement(92)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(94)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(98)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(100)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-purple-50`}>{formatMeasurement(102)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>L</TableCell>
                  <TableCell className={`${coloredCellClass} bg-gray-50`}>{formatMeasurement(96)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(98)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(102)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(104)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-purple-50`}>{formatMeasurement(106)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XL</TableCell>
                  <TableCell className={`${coloredCellClass} bg-gray-50`}>{formatMeasurement(100)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(102)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(106)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(108)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-purple-50`}>{formatMeasurement(110)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={`font-medium ${cellClass} sticky left-0 bg-white z-10 border-r`}>XXL</TableCell>
                  <TableCell className={`${coloredCellClass} bg-gray-50`}>{formatMeasurement(104)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatMeasurement(106)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatMeasurement(110)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatMeasurement(112)}</TableCell>
                  <TableCell className={`${coloredCellClass} bg-purple-50`}>{formatMeasurement(114)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
          <ChevronLeft className="h-3 w-3 mr-1" />
          <span>{t("Swipe To View")}</span>
          <ChevronRight className="h-3 w-3 ml-1" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={garmentType} onValueChange={setGarmentType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t("Select Garment Type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tops">{t("Shirts & Blazers")}</SelectItem>
              <SelectItem value="bottoms">{t("Bottoms & Pants")}</SelectItem>
              <SelectItem value="dresses">{t("Dresses & Jumpsuits")}</SelectItem>
              <SelectItem value="fitType">{t("Fit Type")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant={measurementSystem === "cm" ? "default" : "outline"}
            size="sm"
            onClick={() => setMeasurementSystem("cm")}
            className={`flex-1 sm:flex-none ${measurementSystem === "cm" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
          >
            {t("Centimeters")}
          </Button>
          <Button
            variant={measurementSystem === "inches" ? "default" : "outline"}
            size="sm"
            onClick={() => setMeasurementSystem("inches")}
            className={`flex-1 sm:flex-none ${measurementSystem === "inches" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
          >
            {t("Inches")}
          </Button>
        </div>
      </div>

      {garmentType === "tops" && renderTopsChart()}
      {garmentType === "bottoms" && renderBottomsChart()}
      {garmentType === "dresses" && renderDressesChart()}
      {garmentType === "fitType" && renderFitTypeChart()}

      <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">{t("Sizing Notes")}</h3>
            <ul className="mt-2 space-y-1 text-sm text-neutral-700">
              <li>• {t("Sizing Note 1")}</li>
              <li>• {t("Sizing Note 2")}</li>
              <li>• {t("Sizing Note 3")}</li>
              <li>• {t("Sizing Note 4")}</li>
              <li>• {t("Sizing Note 5")}</li>
            </ul>
          </div>
        </div>
      </div>

      {garmentType === "fitType" && (
        <>
          <div className="bg-neutral-100 p-4 rounded-lg border border-neutral-200">
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">{t("Fit Type Explanation")}</h3>
              <ul className="space-y-1 text-sm text-neutral-700">
                <li className="flex items-center">
                  <Badge variant="outline" className="bg-pink-100 text-pink-800 hover:bg-pink-100 mr-2">
                    {t("Slim Fit")}
                  </Badge>
                  {t(
                    "Slim Fit garments are designed to follow the contours of your body closely. They provide a sleek, tailored appearance with minimal excess fabric. Ideal for a modern, streamlined silhouette.",
                  )}
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="bg-teal-100 text-teal-800 hover:bg-teal-100 mr-2">
                    {t("Regular Fit")}
                  </Badge>
                  {t(
                    "Regular Fit garments offer a balanced cut that's neither too tight nor too loose. They provide comfortable movement while maintaining a neat appearance. Suitable for most body types and occasions.",
                  )}
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 mr-2">
                    {t("Relaxed Fit")}
                  </Badge>
                  {t(
                    "Relaxed Fit garments provide extra room throughout for enhanced comfort and freedom of movement. They drape loosely on the body without being oversized. Perfect for casual, everyday wear.",
                  )}
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100 mr-2">
                    {t("Oversized Fit")}
                  </Badge>
                  {t(
                    "Oversized Fit garments are intentionally cut much larger than standard sizing. They create a bold, fashion-forward silhouette with maximum comfort. Ideal for creating layered looks or a contemporary street style aesthetic.",
                  )}
                </li>
              </ul>
              <div className="mt-4">
                <Link href="/fit-guide" className="text-teal-600 hover:text-teal-800 flex items-center gap-1 text-sm">
                  {t("View detailed fit guide")} <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
