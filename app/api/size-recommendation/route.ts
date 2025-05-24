import { type NextRequest, NextResponse } from "next/server"

const sizeCharts = {
  bottoms: {
    XXS: { waistBody: 60, hipBody: 86, waistGarment: 66, hipGarment: 92 },
    XS: { waistBody: 64, hipBody: 90, waistGarment: 70, hipGarment: 96 },
    S: { waistBody: 68, hipBody: 94, waistGarment: 74, hipGarment: 100 },
    M: { waistBody: 72, hipBody: 98, waistGarment: 78, hipGarment: 104 },
    L: { waistBody: 76, hipBody: 102, waistGarment: 82, hipGarment: 108 },
    XL: { waistBody: 80, hipBody: 106, waistGarment: 86, hipGarment: 112 },
    XXL: { waistBody: 84, hipBody: 110, waistGarment: 90, hipGarment: 116 },
  },
  shirts_blazers: {
    XXS: { bustBody: 80, waistBody: 60, hipBody: 84, waistGarment: 66, hipGarment: 90 },
    XS: { bustBody: 84, waistBody: 64, hipBody: 88, waistGarment: 70, hipGarment: 94 },
    S: { bustBody: 88, waistBody: 68, hipBody: 92, waistGarment: 74, hipGarment: 98 },
    M: { bustBody: 92, waistBody: 72, hipBody: 96, waistGarment: 78, hipGarment: 102 },
    L: { bustBody: 96, waistBody: 76, hipBody: 100, waistGarment: 82, hipGarment: 106 },
    XL: { bustBody: 100, waistBody: 80, hipBody: 104, waistGarment: 86, hipGarment: 110 },
    XXL: { bustBody: 104, waistBody: 84, hipBody: 108, waistGarment: 90, hipGarment: 114 },
  },
  // Dresses and jumpsuits use the same body bust measurements as shirts & blazers
  // with garment measurements adjusted based on fit type:
  // Slim Fit: +2cm, Regular Fit: +6cm, Relaxed Fit: +8cm, Oversized Fit: +10cm
  dresses_jumpsuits: {
    XXS: { bustBody: 80, waistBody: 62, hipBody: 86, bustGarment: 86, waistGarment: 64, hipGarment: 88 },
    XS: { bustBody: 84, waistBody: 66, hipBody: 90, bustGarment: 90, waistGarment: 68, hipGarment: 92 },
    S: { bustBody: 88, waistBody: 70, hipBody: 94, bustGarment: 94, waistGarment: 72, hipGarment: 96 },
    M: { bustBody: 92, waistBody: 74, hipBody: 98, bustGarment: 98, waistGarment: 76, hipGarment: 100 },
    L: { bustBody: 96, waistBody: 78, hipBody: 102, bustGarment: 102, waistGarment: 80, hipGarment: 104 },
    XL: { bustBody: 100, waistBody: 82, hipBody: 106, bustGarment: 106, waistGarment: 84, hipGarment: 108 },
    XXL: { bustBody: 104, waistBody: 86, hipBody: 110, bustGarment: 110, waistGarment: 88, hipGarment: 112 },
  },
  bust_fits: {
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
  },
}

function findRecommendedSize(category: string, measurements: any, fit = "Regular Fit") {
  const chart = sizeCharts[category as keyof typeof sizeCharts]
  if (!chart) throw new Error("Invalid category")

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]

  // For shirts and blazers with the new fit system
  if (category === "shirts_blazers") {
    const fitChart = sizeCharts.bust_fits[fit as keyof typeof sizeCharts.bust_fits]

    if (!fitChart) {
      throw new Error("Invalid fit type")
    }

    for (const size of sizes) {
      const sizeData = chart[size as keyof typeof chart]
      const bustGarment = fitChart[size as keyof typeof fitChart]

      if (
        measurements.bust <= sizeData.bustBody &&
        measurements.waist <= sizeData.waistBody &&
        measurements.hip <= sizeData.hipBody
      ) {
        return {
          size,
          garmentMeasurements: {
            bustGarment,
            waistGarment: sizeData.waistGarment,
            hipGarment: sizeData.hipGarment,
          },
        }
      }
    }

    // Fallback to largest size
    const largest = sizes[sizes.length - 1]
    const largestData = chart[largest as keyof typeof chart]
    const bustGarment = fitChart[largest as keyof typeof fitChart]

    return {
      size: largest,
      garmentMeasurements: {
        bustGarment,
        waistGarment: largestData.waistGarment,
        hipGarment: largestData.hipGarment,
      },
    }
  }
  // For dresses and jumpsuits, keep the old logic but with updated ease values
  else if (category === "dresses_jumpsuits") {
    // Map the new fit names to ease values
    const easeMap: Record<string, number> = {
      "Slim Fit": 2,
      "Regular Fit": 6,
      "Relaxed Fit": 8,
      "Oversized Fit": 10,
    }

    const ease = easeMap[fit] ?? 6

    for (const size of sizes) {
      const sizeData = chart[size as keyof typeof chart]

      if (
        measurements.bust <= sizeData.bustBody &&
        measurements.waist <= sizeData.waistBody &&
        measurements.hip <= sizeData.hipBody
      ) {
        return {
          size,
          garmentMeasurements: {
            bustGarment: sizeData.bustGarment,
            waistGarment: sizeData.waistGarment,
            hipGarment: sizeData.hipGarment,
          },
        }
      }
    }

    // Fallback to largest size
    const largest = sizes[sizes.length - 1]
    const largestData = chart[largest as keyof typeof chart]

    return {
      size: largest,
      garmentMeasurements: {
        bustGarment: largestData.bustGarment,
        waistGarment: largestData.waistGarment,
        hipGarment: largestData.hipGarment,
      },
    }
  }
  // For bottoms, keep the existing logic
  else if (category === "bottoms") {
    for (const size of sizes) {
      const sizeData = chart[size as keyof typeof chart]

      if (measurements.waist <= sizeData.waistBody && measurements.hip <= sizeData.hipBody) {
        return {
          size,
          garmentMeasurements: {
            waistGarment: sizeData.waistGarment,
            hipGarment: sizeData.hipGarment,
          },
        }
      }
    }

    // Fallback to largest size
    const largest = sizes[sizes.length - 1]
    const largestData = chart[largest as keyof typeof chart]

    return {
      size: largest,
      garmentMeasurements: {
        waistGarment: largestData.waistGarment,
        hipGarment: largestData.hipGarment,
      },
    }
  }

  throw new Error("Invalid category")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const category = body.category
    const measurements = body.measurements
    const fit = body.fit || "Regular Fit"

    if (
      !category ||
      !measurements ||
      typeof measurements !== "object" ||
      (category === "bottoms" && (!measurements.waist || !measurements.hip)) ||
      ((category === "shirts_blazers" || category === "dresses_jumpsuits") &&
        (!measurements.bust || !measurements.waist || !measurements.hip))
    ) {
      return NextResponse.json({ message: "Missing or invalid parameters" }, { status: 400 })
    }

    const result = findRecommendedSize(category, measurements, fit)

    return NextResponse.json({
      recommendedSize: result.size,
      garmentMeasurements: result.garmentMeasurements,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ message: errorMessage }, { status: 400 })
  }
}
