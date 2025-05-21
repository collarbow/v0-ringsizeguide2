"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import type { JSX } from "react"

type MeasurementSystem = "cm" | "inches"

export function SizeChart() {
  const { t, isRtl } = useLanguage()
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>("cm")
  const [garmentType, setGarmentType] = useState("tops")

  const convertMeasurement = (cm: number): string => {
    if (measurementSystem === "inches") {
      return (cm / 2.54).toFixed(1)
    }
    return cm.toString()
  }

  // Common cell classes for consistent styling with increased spacing
  const headerClass = "font-bold text-center px-6 py-4"
  const coloredHeaderClass = "font-bold text-center px-6 py-4"
  const cellClass = "text-center px-6 py-4"
  const coloredCellClass = "text-center px-6 py-4"

  // Format measurement range with proper spacing
  const formatRange = (min: number, max: number): JSX.Element => {
    return (
      <span>
        {convertMeasurement(min)}
        <span className="mx-2">-</span>
        {convertMeasurement(max)}
      </span>
    )
  }

  const renderTopsChart = () => (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("size")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("usSize")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("ukSize")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("euSize")}</TableHead>
            <TableHead className={`${coloredHeaderClass} bg-teal-100 w-[150px] min-w-[150px]`} colSpan={3}>
              {t("bust")} ({measurementSystem})
            </TableHead>
            <TableHead className={`${headerClass} w-[150px] min-w-[150px]`}>
              {t("hips")} ({measurementSystem})
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead className={`${coloredHeaderClass} bg-pink-100 w-[150px] min-w-[150px]`}>
              <Badge variant="outline" className="bg-pink-100 text-pink-800 hover:bg-pink-100">
                {t("fitted")}
              </Badge>
            </TableHead>
            <TableHead className={`${coloredHeaderClass} bg-teal-100 w-[150px] min-w-[150px]`}>
              <Badge variant="outline" className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                {t("regularFit")}
              </Badge>
            </TableHead>
            <TableHead className={`${coloredHeaderClass} bg-blue-100 w-[150px] min-w-[150px]`}>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {t("oversize")}
              </Badge>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XS</TableCell>
            <TableCell className={cellClass}>0-2</TableCell>
            <TableCell className={cellClass}>6-8</TableCell>
            <TableCell className={cellClass}>34-36</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(80, 83)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(86, 89)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(92, 95)}</TableCell>
            <TableCell className={cellClass}>{formatRange(90, 93)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>S</TableCell>
            <TableCell className={cellClass}>4-6</TableCell>
            <TableCell className={cellClass}>8-10</TableCell>
            <TableCell className={cellClass}>36-38</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(84, 87)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(90, 93)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(96, 99)}</TableCell>
            <TableCell className={cellClass}>{formatRange(94, 97)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>M</TableCell>
            <TableCell className={cellClass}>8-10</TableCell>
            <TableCell className={cellClass}>12-14</TableCell>
            <TableCell className={cellClass}>40-42</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(88, 91)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(94, 97)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(100, 103)}</TableCell>
            <TableCell className={cellClass}>{formatRange(98, 101)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>L</TableCell>
            <TableCell className={cellClass}>12-14</TableCell>
            <TableCell className={cellClass}>16-18</TableCell>
            <TableCell className={cellClass}>44-46</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(92, 95)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(98, 101)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(104, 107)}</TableCell>
            <TableCell className={cellClass}>{formatRange(102, 105)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XL</TableCell>
            <TableCell className={cellClass}>16-18</TableCell>
            <TableCell className={cellClass}>20-22</TableCell>
            <TableCell className={cellClass}>48-50</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(96, 99)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(102, 105)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(108, 111)}</TableCell>
            <TableCell className={cellClass}>{formatRange(106, 109)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XXL</TableCell>
            <TableCell className={cellClass}>20-22</TableCell>
            <TableCell className={cellClass}>24-26</TableCell>
            <TableCell className={cellClass}>52-54</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(100, 103)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(106, 109)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(112, 115)}</TableCell>
            <TableCell className={cellClass}>{formatRange(110, 113)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )

  const renderBottomsChart = () => (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("size")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("usSize")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("ukSize")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("euSize")}</TableHead>
            <TableHead className={`${coloredHeaderClass} w-[150px] min-w-[150px] bg-teal-100`}>
              {t("waist")} ({measurementSystem})
            </TableHead>
            <TableHead className={`${coloredHeaderClass} w-[150px] min-w-[150px] bg-pink-100`}>
              {t("hips")} ({measurementSystem})
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XS</TableCell>
            <TableCell className={cellClass}>0-2</TableCell>
            <TableCell className={cellClass}>6-8</TableCell>
            <TableCell className={cellClass}>34-36</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(64, 67)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(90, 93)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>S</TableCell>
            <TableCell className={cellClass}>4-6</TableCell>
            <TableCell className={cellClass}>8-10</TableCell>
            <TableCell className={cellClass}>36-38</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(68, 71)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(94, 97)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>M</TableCell>
            <TableCell className={cellClass}>8-10</TableCell>
            <TableCell className={cellClass}>12-14</TableCell>
            <TableCell className={cellClass}>40-42</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(72, 75)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(98, 101)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>L</TableCell>
            <TableCell className={cellClass}>12-14</TableCell>
            <TableCell className={cellClass}>16-18</TableCell>
            <TableCell className={cellClass}>44-46</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(76, 79)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(102, 105)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XL</TableCell>
            <TableCell className={cellClass}>16-18</TableCell>
            <TableCell className={cellClass}>20-22</TableCell>
            <TableCell className={cellClass}>48-50</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(80, 83)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(106, 109)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XXL</TableCell>
            <TableCell className={cellClass}>20-22</TableCell>
            <TableCell className={cellClass}>24-26</TableCell>
            <TableCell className={cellClass}>52-54</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(84, 87)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(110, 113)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )

  const renderDressesChart = () => (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("size")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("usSize")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("ukSize")}</TableHead>
            <TableHead className={`${headerClass} w-[100px] min-w-[100px]`}>{t("euSize")}</TableHead>
            <TableHead className={`${coloredHeaderClass} bg-pink-100 w-[150px] min-w-[150px]`}>
              {t("bust")} ({measurementSystem})
            </TableHead>
            <TableHead className={`${coloredHeaderClass} w-[150px] min-w-[150px] bg-teal-100`}>
              {t("waist")} ({measurementSystem})
            </TableHead>
            <TableHead className={`${coloredHeaderClass} w-[150px] min-w-[150px] bg-blue-100`}>
              {t("hips")} ({measurementSystem})
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XS</TableCell>
            <TableCell className={cellClass}>0-2</TableCell>
            <TableCell className={cellClass}>6-8</TableCell>
            <TableCell className={cellClass}>34-36</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(86, 89)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(64, 67)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(90, 93)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>S</TableCell>
            <TableCell className={cellClass}>4-6</TableCell>
            <TableCell className={cellClass}>8-10</TableCell>
            <TableCell className={cellClass}>36-38</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(90, 93)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(68, 71)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(94, 97)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>M</TableCell>
            <TableCell className={cellClass}>8-10</TableCell>
            <TableCell className={cellClass}>12-14</TableCell>
            <TableCell className={cellClass}>40-42</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(94, 97)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(72, 75)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(98, 101)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>L</TableCell>
            <TableCell className={cellClass}>12-14</TableCell>
            <TableCell className={cellClass}>16-18</TableCell>
            <TableCell className={cellClass}>44-46</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(98, 101)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(76, 79)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(102, 105)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XL</TableCell>
            <TableCell className={cellClass}>16-18</TableCell>
            <TableCell className={cellClass}>20-22</TableCell>
            <TableCell className={cellClass}>48-50</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(102, 105)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(80, 83)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(106, 109)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`font-medium ${cellClass}`}>XXL</TableCell>
            <TableCell className={cellClass}>20-22</TableCell>
            <TableCell className={cellClass}>24-26</TableCell>
            <TableCell className={cellClass}>52-54</TableCell>
            <TableCell className={`${coloredCellClass} bg-pink-50`}>{formatRange(106, 109)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-teal-50`}>{formatRange(84, 87)}</TableCell>
            <TableCell className={`${coloredCellClass} bg-blue-50`}>{formatRange(110, 113)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={garmentType} onValueChange={setGarmentType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t("selectGarmentType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tops">{t("shirtsBlazers")}</SelectItem>
              <SelectItem value="bottoms">{t("bottomsPants")}</SelectItem>
              <SelectItem value="dresses">{t("dressesJumpsuits")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={measurementSystem === "cm" ? "default" : "outline"}
            size="sm"
            onClick={() => setMeasurementSystem("cm")}
            className={measurementSystem === "cm" ? "bg-teal-600 hover:bg-teal-700" : ""}
          >
            {t("centimeters")}
          </Button>
          <Button
            variant={measurementSystem === "inches" ? "default" : "outline"}
            size="sm"
            onClick={() => setMeasurementSystem("inches")}
            className={measurementSystem === "inches" ? "bg-teal-600 hover:bg-teal-700" : ""}
          >
            {t("inches")}
          </Button>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        <p>Swipe left/right to view all measurements</p>
      </div>

      {garmentType === "tops" && renderTopsChart()}
      {garmentType === "bottoms" && renderBottomsChart()}
      {garmentType === "dresses" && renderDressesChart()}

      <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">{t("sizingNotes")}</h3>
            <ul className="mt-2 space-y-1 text-sm text-neutral-700">
              <li>• {t("sizingNote1")}</li>
              <li>• {t("sizingNote2")}</li>
              <li>• {t("sizingNote3")}</li>
              <li>• {t("sizingNote4")}</li>
              <li>• {t("sizingNote5")}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 p-4 rounded-lg border border-neutral-200">
        <div className="flex flex-col space-y-2">
          <h3 className="font-medium">
            {t("bust")} {t("fitted")} / {t("regularFit")} / {t("oversize")}
          </h3>
          <ul className="space-y-1 text-sm text-neutral-700">
            <li className="flex items-center">
              <Badge variant="outline" className="bg-pink-100 text-pink-800 hover:bg-pink-100 mr-2">
                {t("fitted")}
              </Badge>
              {isRtl ? "ملابس ضيقة تظهر تفاصيل الجسم" : "Clothes that hug the body closely (like Zara fitted tops)"}
            </li>
            <li className="flex items-center">
              <Badge variant="outline" className="bg-teal-100 text-teal-800 hover:bg-teal-100 mr-2">
                {t("regularFit")}
              </Badge>
              {isRtl ? "ملابس بمقاس عادي مريح" : "Standard comfortable fit (like H&M regular fit)"}
            </li>
            <li className="flex items-center">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 mr-2">
                {t("oversize")}
              </Badge>
              {isRtl ? "ملابس واسعة وفضفاضة" : "Loose, relaxed fit clothing (like Uniqlo oversize styles)"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
