"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"

export function SizeChartDisplay() {
  const { t } = useLanguage()
  const [fitType, setFitType] = useState("Regular Fit")
  const [unit, setUnit] = useState<"cm" | "inches">("cm")

  const convertToInches = (cm: number) => {
    return (cm / 2.54).toFixed(1)
  }

  const formatMeasurement = (value: number) => {
    return unit === "cm" ? `${value} cm` : `${convertToInches(value)}"`
  }

  const shirtsAndBlazersBodySizes = {
    XXS: { bust: 80, waist: 60, hip: 84 },
    XS: { bust: 84, waist: 64, hip: 88 },
    S: { bust: 88, waist: 68, hip: 92 },
    M: { bust: 92, waist: 72, hip: 96 },
    L: { bust: 96, waist: 76, hip: 100 },
    XL: { bust: 100, waist: 80, hip: 104 },
    XXL: { bust: 104, waist: 84, hip: 108 },
  }

  const shirtsAndBlazersFitSizes = {
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
  }

  const bottomsSizes = {
    XXS: { waist: 60, hip: 86, waistGarment: 66, hipGarment: 92 },
    XS: { waist: 64, hip: 90, waistGarment: 70, hipGarment: 96 },
    S: { waist: 68, hip: 94, waistGarment: 74, hipGarment: 100 },
    M: { waist: 72, hip: 98, waistGarment: 78, hipGarment: 104 },
    L: { waist: 76, hip: 102, waistGarment: 82, hipGarment: 108 },
    XL: { waist: 80, hip: 106, waistGarment: 86, hipGarment: 112 },
    XXL: { waist: 84, hip: 110, waistGarment: 90, hipGarment: 116 },
  }

  const dressesJumpsuitsSizes = {
    XXS: { bust: 78, waist: 60, hip: 86, bustGarment: 86, waistGarment: 66, hipGarment: 92 },
    XS: { bust: 82, waist: 64, hip: 90, bustGarment: 90, waistGarment: 70, hipGarment: 96 },
    S: { bust: 86, waist: 68, hip: 94, bustGarment: 94, waistGarment: 74, hipGarment: 100 },
    M: { bust: 90, waist: 72, hip: 98, bustGarment: 98, waistGarment: 78, hipGarment: 104 },
    L: { bust: 94, waist: 76, hip: 102, bustGarment: 102, waistGarment: 82, hipGarment: 108 },
    XL: { bust: 98, waist: 80, hip: 106, bustGarment: 106, waistGarment: 86, hipGarment: 112 },
    XXL: { bust: 102, waist: 84, hip: 110, bustGarment: 110, waistGarment: 90, hipGarment: 116 },
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("Size Chart")}</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{t("Unit")}:</span>
            <Select value={unit} onValueChange={(value) => setUnit(value as "cm" | "inches")}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={unit} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cm">cm</SelectItem>
                <SelectItem value="inches">inches</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="shirts_blazers">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shirts_blazers">{t("Shirts & Blazers")}</TabsTrigger>
            <TabsTrigger value="bottoms">{t("Bottoms")}</TabsTrigger>
            <TabsTrigger value="dresses_jumpsuits">{t("Dresses & Jumpsuits")}</TabsTrigger>
          </TabsList>

          <TabsContent value="shirts_blazers">
            <div className="mb-4 mt-2">
              <Select value={fitType} onValueChange={setFitType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("Select fit type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Slim Fit">{t("Slim Fit")}</SelectItem>
                  <SelectItem value="Regular Fit">{t("Regular Fit")}</SelectItem>
                  <SelectItem value="Relaxed Fit">{t("Relaxed Fit")}</SelectItem>
                  <SelectItem value="Oversized Fit">{t("Oversized Fit")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t("Size")}</TableHead>
                    <TableHead>{t("Body Bust")}</TableHead>
                    <TableHead>{t("Body Waist")}</TableHead>
                    <TableHead>{t("Body Hip")}</TableHead>
                    <TableHead className="bg-teal-50">
                      {t("Garment Bust")} ({fitType})
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(shirtsAndBlazersBodySizes).map(([size, measurements]) => (
                    <TableRow key={size}>
                      <TableCell className="font-medium">{size}</TableCell>
                      <TableCell>{formatMeasurement(measurements.bust)}</TableCell>
                      <TableCell>{formatMeasurement(measurements.waist)}</TableCell>
                      <TableCell>{formatMeasurement(measurements.hip)}</TableCell>
                      <TableCell className="bg-teal-50 font-medium">
                        {formatMeasurement(
                          shirtsAndBlazersFitSizes[fitType as keyof typeof shirtsAndBlazersFitSizes][
                            size as keyof typeof shirtsAndBlazersBodySizes
                          ],
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {t(
                "Body measurements are your actual body measurements. Garment measurements are the actual garment dimensions.",
              )}
            </p>
          </TabsContent>

          <TabsContent value="bottoms">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t("Size")}</TableHead>
                    <TableHead>{t("Body Waist")}</TableHead>
                    <TableHead>{t("Body Hip")}</TableHead>
                    <TableHead className="bg-teal-50">{t("Garment Waist")}</TableHead>
                    <TableHead className="bg-teal-50">{t("Garment Hip")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(bottomsSizes).map(([size, measurements]) => (
                    <TableRow key={size}>
                      <TableCell className="font-medium">{size}</TableCell>
                      <TableCell>{formatMeasurement(measurements.waist)}</TableCell>
                      <TableCell>{formatMeasurement(measurements.hip)}</TableCell>
                      <TableCell className="bg-teal-50">{formatMeasurement(measurements.waistGarment)}</TableCell>
                      <TableCell className="bg-teal-50">{formatMeasurement(measurements.hipGarment)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {t(
                "Body measurements are your actual body measurements. Garment measurements are the actual garment dimensions.",
              )}
            </p>
          </TabsContent>

          <TabsContent value="dresses_jumpsuits">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t("Size")}</TableHead>
                    <TableHead>{t("Body Bust")}</TableHead>
                    <TableHead>{t("Body Waist")}</TableHead>
                    <TableHead>{t("Body Hip")}</TableHead>
                    <TableHead className="bg-teal-50">{t("Garment Bust")}</TableHead>
                    <TableHead className="bg-teal-50">{t("Garment Waist")}</TableHead>
                    <TableHead className="bg-teal-50">{t("Garment Hip")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(dressesJumpsuitsSizes).map(([size, measurements]) => (
                    <TableRow key={size}>
                      <TableCell className="font-medium">{size}</TableCell>
                      <TableCell>{formatMeasurement(measurements.bust)}</TableCell>
                      <TableCell>{formatMeasurement(measurements.waist)}</TableCell>
                      <TableCell>{formatMeasurement(measurements.hip)}</TableCell>
                      <TableCell className="bg-teal-50">{formatMeasurement(measurements.bustGarment)}</TableCell>
                      <TableCell className="bg-teal-50">{formatMeasurement(measurements.waistGarment)}</TableCell>
                      <TableCell className="bg-teal-50">{formatMeasurement(measurements.hipGarment)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {t(
                "Body measurements are your actual body measurements. Garment measurements are the actual garment dimensions.",
              )}
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
