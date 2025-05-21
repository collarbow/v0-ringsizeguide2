"use client"

import { useLanguage } from "@/components/language-provider"

interface GarmentIllustrationProps {
  type: "tops" | "bottoms" | "dresses"
  selected: boolean
}

export function GarmentIllustration({ type, selected }: GarmentIllustrationProps) {
  const { isRtl } = useLanguage()
  const baseColor = selected ? "#000000" : "#94a3b8" // black : slate-400
  const fillColor = selected ? "#e5e5e5" : "#e2e8f0" // neutral-200 : slate-200
  const bgColor = selected ? "#f5f5f5" : "#f1f5f9" // neutral-100 : slate-100

  const renderIllustration = () => {
    switch (type) {
      case "tops":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="8" fill={bgColor} />
            {/* Blazer */}
            <path
              d="M50 20 L35 25 L30 40 L30 75 L70 75 L70 40 L65 25 L50 20Z"
              stroke={baseColor}
              strokeWidth="2"
              fill={fillColor}
            />
            {/* Collar */}
            <path d="M50 20 L40 30 L50 45 L60 30 L50 20Z" stroke={baseColor} strokeWidth="2" fill={fillColor} />
            {/* Lapels */}
            <path d="M40 30 L45 45 L50 45" stroke={baseColor} strokeWidth="2" />
            <path d="M60 30 L55 45 L50 45" stroke={baseColor} strokeWidth="2" />
            {/* Buttons */}
            <circle cx="50" cy="50" r="2" fill={baseColor} />
            <circle cx="50" cy="60" r="2" fill={baseColor} />
            {/* Pocket outlines */}
            <path d="M35 55 L45 55 L45 65 L35 65 Z" stroke={baseColor} strokeWidth="1.5" fill="none" />
            <path d="M55 55 L65 55 L65 65 L55 65 Z" stroke={baseColor} strokeWidth="1.5" fill="none" />
          </svg>
        )
      case "bottoms":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="8" fill={bgColor} />
            {/* Pants waistband */}
            <path d="M30 25 L70 25 L70 35 L30 35 Z" stroke={baseColor} strokeWidth="2" fill={fillColor} />
            {/* Pants legs */}
            <path d="M30 35 L40 80 L45 80 L50 35" stroke={baseColor} strokeWidth="2" fill={fillColor} />
            <path d="M70 35 L60 80 L55 80 L50 35" stroke={baseColor} strokeWidth="2" fill={fillColor} />
            {/* Details */}
            <circle cx="50" cy="30" r="2" fill={baseColor} />
            <path d="M45 45 L55 45" stroke={baseColor} strokeWidth="1.5" strokeDasharray="2,2" />
            <path d="M43 60 L57 60" stroke={baseColor} strokeWidth="1.5" strokeDasharray="2,2" />
            <path d="M40 75 L45 75" stroke={baseColor} strokeWidth="1.5" />
            <path d="M55 75 L60 75" stroke={baseColor} strokeWidth="1.5" />
          </svg>
        )
      case "dresses":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="8" fill={bgColor} />
            {/* Dress top */}
            <path
              d="M50 20 L35 25 L30 40 L35 50 L30 80 L70 80 L65 50 L70 40 L65 25 L50 20Z"
              stroke={baseColor}
              strokeWidth="2"
              fill={fillColor}
            />
            {/* Collar/Neckline */}
            <path d="M50 20 L45 28 L50 32 L55 28 L50 20Z" stroke={baseColor} strokeWidth="2" fill={fillColor} />
            {/* Sleeves */}
            <path d="M35 25 L25 35 L30 40" stroke={baseColor} strokeWidth="2" fill={fillColor} />
            <path d="M65 25 L75 35 L70 40" stroke={baseColor} strokeWidth="2" fill={fillColor} />
            {/* Waistline */}
            <path d="M35 50 L65 50" stroke={baseColor} strokeWidth="1.5" />
            {/* Details */}
            <path d="M40 40 L60 40" stroke={baseColor} strokeWidth="1.5" strokeDasharray="2,2" />
            <path d="M38 60 L62 60" stroke={baseColor} strokeWidth="1.5" strokeDasharray="2,2" />
            <path d="M35 70 L65 70" stroke={baseColor} strokeWidth="1.5" strokeDasharray="2,2" />
          </svg>
        )
      default:
        return null
    }
  }

  return <div className="flex justify-center items-center">{renderIllustration()}</div>
}
