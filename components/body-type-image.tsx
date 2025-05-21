interface BodyTypeImageProps {
  type: "hourglass" | "pear" | "apple" | "athletic" | "rectangle"
  selected: boolean
}

export function BodyTypeImage({ type, selected }: BodyTypeImageProps) {
  // Revert the color scheme back to teal/pink
  const baseColor = selected ? "#0d9488" : "#94a3b8" // teal-600 : slate-400
  const highlightColor = selected ? "#14b8a6" : "#cbd5e1" // teal-500 : slate-300
  const bgColor = selected ? "#e6fffa" : "#f1f5f9" // teal-50 : slate-100
  const fillColor = selected ? "#ccfbf1" : "#e2e8f0" // teal-100 : slate-200

  // More realistic and professional SVG illustrations
  const renderBodyTypeImage = () => {
    switch (type) {
      case "hourglass":
        return (
          <svg width="140" height="240" viewBox="0 0 140 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="140" height="240" fill={bgColor} rx="8" />
            {/* Head */}
            <circle cx="70" cy="40" r="20" fill={highlightColor} />

            {/* Body */}
            <path
              d="M50 70 C40 90 35 110 35 130 C35 150 45 170 70 190 C95 170 105 150 105 130 C105 110 100 90 90 70 Z"
              stroke={baseColor}
              strokeWidth="2"
              fill={fillColor}
              fillOpacity="0.6"
            />

            {/* Shoulders */}
            <path d="M50 70 C50 70 40 75 30 80" stroke={baseColor} strokeWidth="2" />
            <path d="M90 70 C90 70 100 75 110 80" stroke={baseColor} strokeWidth="2" />

            {/* Arms */}
            <path d="M30 80 C30 80 25 110 30 140" stroke={baseColor} strokeWidth="2" />
            <path d="M110 80 C110 80 115 110 110 140" stroke={baseColor} strokeWidth="2" />

            {/* Bust line */}
            <path d="M50 90 C60 95 80 95 90 90" stroke={baseColor} strokeWidth="2" strokeDasharray="0" fill="none" />

            {/* Waist line */}
            <path
              d="M45 130 C55 135 85 135 95 130"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Hip line */}
            <path
              d="M45 160 C55 170 85 170 95 160"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Legs */}
            <path d="M60 190 L55 220" stroke={baseColor} strokeWidth="2" />
            <path d="M80 190 L85 220" stroke={baseColor} strokeWidth="2" />

            {/* Measurement lines */}
            <line x1="35" y1="90" x2="45" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="95" y1="90" x2="105" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="35" y1="130" x2="45" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="95" y1="130" x2="105" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="35" y1="160" x2="45" y2="160" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="95" y1="160" x2="105" y2="160" stroke={highlightColor} strokeWidth="1.5" />

            {/* Labels */}
            <text x="70" y="20" textAnchor="middle" fill={baseColor} fontSize="12" fontWeight="500">
              Hourglass
            </text>
          </svg>
        )

      case "pear":
        return (
          <svg width="140" height="240" viewBox="0 0 140 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="140" height="240" fill={bgColor} rx="8" />
            {/* Head */}
            <circle cx="70" cy="40" r="20" fill={highlightColor} />

            {/* Body */}
            <path
              d="M55 70 C45 90 45 110 45 130 C40 150 35 170 70 190 C105 170 100 150 95 130 C95 110 95 90 85 70 Z"
              stroke={baseColor}
              strokeWidth="2"
              fill={fillColor}
              fillOpacity="0.6"
            />

            {/* Shoulders - narrower than hourglass */}
            <path d="M55 70 C55 70 45 75 40 80" stroke={baseColor} strokeWidth="2" />
            <path d="M85 70 C85 70 95 75 100 80" stroke={baseColor} strokeWidth="2" />

            {/* Arms */}
            <path d="M40 80 C40 80 35 110 40 140" stroke={baseColor} strokeWidth="2" />
            <path d="M100 80 C100 80 105 110 100 140" stroke={baseColor} strokeWidth="2" />

            {/* Bust line - smaller than hourglass */}
            <path d="M55 90 C62 93 78 93 85 90" stroke={baseColor} strokeWidth="2" strokeDasharray="0" fill="none" />

            {/* Waist line */}
            <path
              d="M50 130 C60 133 80 133 90 130"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Hip line - wider than hourglass */}
            <path
              d="M35 160 C50 175 90 175 105 160"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Legs */}
            <path d="M60 190 L55 220" stroke={baseColor} strokeWidth="2" />
            <path d="M80 190 L85 220" stroke={baseColor} strokeWidth="2" />

            {/* Measurement lines */}
            <line x1="40" y1="90" x2="55" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="85" y1="90" x2="100" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="40" y1="130" x2="50" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="90" y1="130" x2="100" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="30" y1="160" x2="35" y2="160" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="105" y1="160" x2="110" y2="160" stroke={highlightColor} strokeWidth="1.5" />

            {/* Labels */}
            <text x="70" y="20" textAnchor="middle" fill={baseColor} fontSize="12" fontWeight="500">
              Pear
            </text>
          </svg>
        )

      case "apple":
        return (
          <svg width="140" height="240" viewBox="0 0 140 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="140" height="240" fill={bgColor} rx="8" />
            {/* Head */}
            <circle cx="70" cy="40" r="20" fill={highlightColor} />

            {/* Body */}
            <path
              d="M50 70 C40 90 30 110 30 130 C30 150 40 170 70 190 C100 170 110 150 110 130 C110 110 100 90 90 70 Z"
              stroke={baseColor}
              strokeWidth="2"
              fill={fillColor}
              fillOpacity="0.6"
            />

            {/* Shoulders */}
            <path d="M50 70 C50 70 40 75 30 80" stroke={baseColor} strokeWidth="2" />
            <path d="M90 70 C90 70 100 75 110 80" stroke={baseColor} strokeWidth="2" />

            {/* Arms */}
            <path d="M30 80 C30 80 25 110 30 140" stroke={baseColor} strokeWidth="2" />
            <path d="M110 80 C110 80 115 110 110 140" stroke={baseColor} strokeWidth="2" />

            {/* Bust line */}
            <path d="M50 90 C60 95 80 95 90 90" stroke={baseColor} strokeWidth="2" strokeDasharray="0" fill="none" />

            {/* Waist line - fuller than hourglass */}
            <path
              d="M35 130 C50 140 90 140 105 130"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Hip line - narrower than waist */}
            <path
              d="M45 160 C55 165 85 165 95 160"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Legs */}
            <path d="M60 190 L55 220" stroke={baseColor} strokeWidth="2" />
            <path d="M80 190 L85 220" stroke={baseColor} strokeWidth="2" />

            {/* Measurement lines */}
            <line x1="30" y1="90" x2="50" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="90" y1="90" x2="110" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="25" y1="130" x2="35" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="105" y1="130" x2="115" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="35" y1="160" x2="45" y2="160" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="95" y1="160" x2="105" y2="160" stroke={highlightColor} strokeWidth="1.5" />

            {/* Labels */}
            <text x="70" y="20" textAnchor="middle" fill={baseColor} fontSize="12" fontWeight="500">
              Apple
            </text>
          </svg>
        )

      case "athletic":
        return (
          <svg width="140" height="240" viewBox="0 0 140 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="140" height="240" fill={bgColor} rx="8" />
            {/* Head */}
            <circle cx="70" cy="40" r="20" fill={highlightColor} />

            {/* Body */}
            <path
              d="M45 70 C35 90 30 110 35 130 C35 150 45 170 70 190 C95 170 105 150 105 130 C110 110 105 90 95 70 Z"
              stroke={baseColor}
              strokeWidth="2"
              fill={fillColor}
              fillOpacity="0.6"
            />

            {/* Shoulders - wider than other types */}
            <path d="M45 70 C45 70 30 75 20 80" stroke={baseColor} strokeWidth="2" />
            <path d="M95 70 C95 70 110 75 120 80" stroke={baseColor} strokeWidth="2" />

            {/* Arms - more muscular */}
            <path d="M20 80 C20 80 15 110 20 140" stroke={baseColor} strokeWidth="2" />
            <path d="M120 80 C120 80 125 110 120 140" stroke={baseColor} strokeWidth="2" />

            {/* Bust line */}
            <path d="M50 90 C60 93 80 93 90 90" stroke={baseColor} strokeWidth="2" strokeDasharray="0" fill="none" />

            {/* Waist line - less defined */}
            <path
              d="M45 130 C55 133 85 133 95 130"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Hip line - narrower */}
            <path
              d="M50 160 C60 163 80 163 90 160"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Legs - more muscular */}
            <path d="M60 190 L55 220" stroke={baseColor} strokeWidth="2" />
            <path d="M80 190 L85 220" stroke={baseColor} strokeWidth="2" />

            {/* Measurement lines */}
            <line x1="15" y1="90" x2="50" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="90" y1="90" x2="125" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="35" y1="130" x2="45" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="95" y1="130" x2="105" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="40" y1="160" x2="50" y2="160" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="90" y1="160" x2="100" y2="160" stroke={highlightColor} strokeWidth="1.5" />

            {/* Labels */}
            <text x="70" y="20" textAnchor="middle" fill={baseColor} fontSize="12" fontWeight="500">
              Athletic
            </text>
          </svg>
        )

      case "rectangle":
        return (
          <svg width="140" height="240" viewBox="0 0 140 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="140" height="240" fill={bgColor} rx="8" />
            {/* Head */}
            <circle cx="70" cy="40" r="20" fill={highlightColor} />

            {/* Body - straighter than other types */}
            <path
              d="M50 70 C40 90 40 110 40 130 C40 150 45 170 70 190 C95 170 100 150 100 130 C100 110 100 90 90 70 Z"
              stroke={baseColor}
              strokeWidth="2"
              fill={fillColor}
              fillOpacity="0.6"
            />

            {/* Shoulders */}
            <path d="M50 70 C50 70 40 75 30 80" stroke={baseColor} strokeWidth="2" />
            <path d="M90 70 C90 70 100 75 110 80" stroke={baseColor} strokeWidth="2" />

            {/* Arms */}
            <path d="M30 80 C30 80 25 110 30 140" stroke={baseColor} strokeWidth="2" />
            <path d="M110 80 C110 80 115 110 110 140" stroke={baseColor} strokeWidth="2" />

            {/* Bust line */}
            <path d="M50 90 C60 93 80 93 90 90" stroke={baseColor} strokeWidth="2" strokeDasharray="0" fill="none" />

            {/* Waist line - similar width to bust and hips */}
            <path
              d="M50 130 C60 133 80 133 90 130"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Hip line - similar width to bust and waist */}
            <path
              d="M50 160 C60 163 80 163 90 160"
              stroke={baseColor}
              strokeWidth="2"
              strokeDasharray="0"
              fill="none"
            />

            {/* Legs */}
            <path d="M60 190 L55 220" stroke={baseColor} strokeWidth="2" />
            <path d="M80 190 L85 220" stroke={baseColor} strokeWidth="2" />

            {/* Measurement lines - straight to emphasize rectangle shape */}
            <line x1="40" y1="90" x2="50" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="90" y1="90" x2="100" y2="90" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="40" y1="130" x2="50" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="90" y1="130" x2="100" y2="130" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="40" y1="160" x2="50" y2="160" stroke={highlightColor} strokeWidth="1.5" />
            <line x1="90" y1="160" x2="100" y2="160" stroke={highlightColor} strokeWidth="1.5" />

            {/* Vertical lines to emphasize straight shape */}
            <line x1="50" y1="90" x2="50" y2="160" stroke={highlightColor} strokeWidth="1" strokeDasharray="3,3" />
            <line x1="90" y1="90" x2="90" y2="160" stroke={highlightColor} strokeWidth="1" strokeDasharray="3,3" />

            {/* Labels */}
            <text x="70" y="20" textAnchor="middle" fill={baseColor} fontSize="12" fontWeight="500">
              Rectangle
            </text>
          </svg>
        )

      default:
        return null
    }
  }

  return <div className="flex justify-center items-center">{renderBodyTypeImage()}</div>
}
