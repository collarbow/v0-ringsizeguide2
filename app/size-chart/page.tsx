import { SizeChartDisplay } from "@/components/size-chart-display"
import { LanguageProvider } from "@/components/language-provider"

export default function SizeChartPage() {
  return (
    <LanguageProvider>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Size Chart</h1>
        <SizeChartDisplay />
      </div>
    </LanguageProvider>
  )
}
