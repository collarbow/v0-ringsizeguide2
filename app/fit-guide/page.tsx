import { FitExplanation } from "@/components/fit-explanation"

export default function FitGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Fit Guide</h1>
      <div className="max-w-4xl mx-auto">
        <FitExplanation />
      </div>
    </div>
  )
}
