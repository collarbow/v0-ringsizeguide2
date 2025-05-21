import { Scissors, CassetteTapeIcon as Tape, Circle } from "lucide-react"

export function MeasurementGuide() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-pink-100 p-2 rounded-full">
              <Tape className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">String Method</h3>
              <ol className="mt-2 space-y-2 text-gray-700 list-decimal pl-5">
                <li>Wrap a piece of string or paper strip around your finger</li>
                <li>Mark where the string meets</li>
                <li>Measure the length with a ruler in millimeters</li>
                <li>Divide by 3.14 to get the diameter</li>
                <li>Compare with the size chart</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Circle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Existing Ring Method</h3>
              <ol className="mt-2 space-y-2 text-gray-700 list-decimal pl-5">
                <li>Find a ring that fits the desired finger</li>
                <li>Place it on a ruler and measure the inside diameter</li>
                <li>Or trace the inside of the ring on paper</li>
                <li>Measure the traced circle's diameter</li>
                <li>Compare with the size chart</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <Scissors className="h-5 w-5 text-amber-600" />
          Printable Ring Sizer
        </h3>
        <p className="mt-2 text-gray-700">For the most accurate measurement, you can print a ring sizer at home:</p>
        <ol className="mt-2 space-y-2 text-gray-700 list-decimal pl-5">
          <li>Download a printable ring sizer (available on many jewelry websites)</li>
          <li>Print at 100% scale (no scaling or "fit to page")</li>
          <li>Verify the scale by measuring the printed ruler</li>
          <li>Cut out the sizer and follow the instructions</li>
        </ol>
      </div>
    </div>
  )
}
