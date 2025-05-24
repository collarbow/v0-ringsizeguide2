"use client"

import SizeFinder from "@/components/size-finder"
import { SizeChart } from "@/components/size-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageProvider } from "@/components/language-provider"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { SocialShare } from "@/components/social-share"
import { Separator } from "@/components/ui/separator"
import { Ruler, BarChart3 } from "lucide-react"

function SizeFinderContent() {
  const { t, isRtl } = useLanguage()

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className={`text-center sm:text-left w-full sm:flex-1 ${isRtl ? "sm:text-right" : ""}`}>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight">COLLAR & BOW</h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 mt-1">{t("Size Finder")}</p>
        </div>
        <div className="flex-shrink-0">
          <LanguageToggle />
        </div>
      </div>

      <Tabs defaultValue="finder" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 md:mb-8 gap-1 sm:gap-2 p-1 sm:p-2 bg-gray-100 rounded-lg">
          <TabsTrigger
            value="finder"
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white hover:bg-pink-100 transition-colors border-2 border-pink-200 data-[state=active]:border-pink-500 rounded-md py-2 sm:py-3 font-medium shadow-sm flex flex-col items-center justify-center min-h-[3rem] sm:min-h-[4rem]"
          >
            <Ruler className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mb-1" />
            <span className="text-xs sm:text-sm leading-tight">{t("Quiz")}</span>
          </TabsTrigger>
          <TabsTrigger
            value="chart"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-100 transition-colors border-2 border-blue-200 data-[state=active]:border-blue-500 rounded-md py-2 sm:py-3 font-medium shadow-sm flex flex-col items-center justify-center min-h-[3rem] sm:min-h-[4rem]"
          >
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mb-1" />
            <span className="text-xs sm:text-sm leading-tight">{t("Chart")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="finder" className="mt-0">
          <div className="bg-pink-50 p-3 rounded-lg mb-4 text-center">
            <h2 className="text-base sm:text-lg font-medium text-pink-800">{t("Size Finder Quiz")}</h2>
          </div>
          <SizeFinder />
          <div className="mt-6 sm:mt-8 text-center">
            <a
              href="https://www.collarbow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 min-h-[44px]"
            >
              {t("Shop Now")}
            </a>
          </div>
        </TabsContent>

        <TabsContent value="chart" className="mt-0">
          <div className="bg-blue-50 p-3 rounded-lg mb-4 text-center">
            <h2 className="text-base sm:text-lg font-medium text-blue-800">{t("Size Chart")}</h2>
          </div>
          <SizeChart />
          <div className="mt-6 sm:mt-8 text-center">
            <a
              href="https://www.collarbow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 min-h-[44px]"
            >
              {t("Shop Now")}
            </a>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 sm:mt-8">
        <Separator className="my-4 sm:my-6" />
        <SocialShare />
      </div>
    </div>
  )
}

export default function SizeFinderPage() {
  return (
    <LanguageProvider>
      <SizeFinderContent />
    </LanguageProvider>
  )
}
