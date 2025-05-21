"use client"

import { SizeFinder } from "@/components/size-finder"
import { SizeChart } from "@/components/size-chart"
import { GarmentSpecificFinder } from "@/components/garment-specific-finder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageProvider } from "@/components/language-provider"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { SocialShare } from "@/components/social-share"
import { Separator } from "@/components/ui/separator"
import { Ruler, Search, BarChart3 } from "lucide-react"

function SizeFinderContent() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-center sm:text-left w-full sm:flex-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">COLLAR & BOW</h1>
          <p className="text-xl md:text-2xl text-gray-600 mt-1">{t("sizeFinder")}</p>
        </div>
        <LanguageToggle />
      </div>

      <Tabs defaultValue="finder" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 gap-2 p-2 bg-gray-100 rounded-lg">
          <TabsTrigger
            value="finder"
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white hover:bg-pink-100 transition-colors border-2 border-pink-200 data-[state=active]:border-pink-500 rounded-md py-3 font-medium shadow-sm flex flex-col items-center justify-center"
          >
            <Ruler className="h-5 w-5 mb-1 md:mb-2" />
            <span className="text-xs md:text-sm">Quiz</span>
          </TabsTrigger>
          <TabsTrigger
            value="quick"
            className="data-[state=active]:bg-teal-500 data-[state=active]:text-white hover:bg-teal-100 transition-colors border-2 border-teal-200 data-[state=active]:border-teal-500 rounded-md py-3 font-medium shadow-sm flex flex-col items-center justify-center"
          >
            <Search className="h-5 w-5 mb-1 md:mb-2" />
            <span className="text-xs md:text-sm">Quick</span>
          </TabsTrigger>
          <TabsTrigger
            value="chart"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-100 transition-colors border-2 border-blue-200 data-[state=active]:border-blue-500 rounded-md py-3 font-medium shadow-sm flex flex-col items-center justify-center"
          >
            <BarChart3 className="h-5 w-5 mb-1 md:mb-2" />
            <span className="text-xs md:text-sm">Chart</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="finder" className="mt-0">
          <div className="bg-pink-50 p-3 rounded-lg mb-4 text-center">
            <h2 className="text-lg font-medium text-pink-800">{t("sizeFinderQuiz")}</h2>
          </div>
          <SizeFinder />
          <div className="mt-8 text-center">
            <a
              href="https://www.collarbow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {t("shopNow")}
            </a>
          </div>
        </TabsContent>

        <TabsContent value="quick" className="mt-0">
          <div className="bg-teal-50 p-3 rounded-lg mb-4 text-center">
            <h2 className="text-lg font-medium text-teal-800">{t("quickSizeFinder")}</h2>
          </div>
          <GarmentSpecificFinder />
          <div className="mt-8 text-center">
            <a
              href="https://www.collarbow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {t("shopNow")}
            </a>
          </div>
        </TabsContent>

        <TabsContent value="chart" className="mt-0">
          <div className="bg-blue-50 p-3 rounded-lg mb-4 text-center">
            <h2 className="text-lg font-medium text-blue-800">{t("sizeChart")}</h2>
          </div>
          <SizeChart />
          <div className="mt-8 text-center">
            <a
              href="https://www.collarbow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {t("shopNow")}
            </a>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Separator className="my-6" />
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
