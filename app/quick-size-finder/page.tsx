import { SimpleSizeFinder } from "@/components/simple-size-finder"
import { LanguageProvider } from "@/components/language-provider"

export default function QuickSizeFinderPage() {
  return (
    <LanguageProvider>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Quick Size Finder</h1>
        <div className="max-w-md mx-auto">
          <SimpleSizeFinder />
        </div>
      </div>
    </LanguageProvider>
  )
}
