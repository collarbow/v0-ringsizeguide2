import { Badge } from "@/components/ui/badge"

export function CommonSizes() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((size) => (
          <Badge
            key={size}
            variant={size >= 6 && size <= 7 ? "default" : "outline"}
            className={`text-sm px-3 py-1 ${
              size >= 6 && size <= 7 ? "bg-pink-500 hover:bg-pink-600" : "border-gray-300"
            }`}
          >
            {size}
            {size >= 6 && size <= 7 && " (Average)"}
          </Badge>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Petite</span>
          <span className="text-sm text-gray-500">Sizes 3-5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-pink-300 h-2.5 rounded-full" style={{ width: "30%" }}></div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Average</span>
          <span className="text-sm text-gray-500">Sizes 6-7</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Larger</span>
          <span className="text-sm text-gray-500">Sizes 8-9</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-pink-300 h-2.5 rounded-full" style={{ width: "20%" }}></div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-medium mb-2">Factors Affecting Size</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Hand size and bone structure</li>
          <li>• Knuckle size (may need larger size)</li>
          <li>• Weight changes</li>
          <li>• Age (fingers may change size over time)</li>
          <li>• Pregnancy (temporary size increase)</li>
        </ul>
      </div>
    </div>
  )
}
