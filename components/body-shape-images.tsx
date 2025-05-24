import { cn } from "@/lib/utils"
import Image from "next/image"

type BodyShapeType = "flatter" | "average" | "curvier" | "straighter" | "wider"

interface BodyShapeImageProps {
  type: BodyShapeType
  selected: boolean
  bodyPart: "belly" | "hip"
}

export function BodyShapeImage({ type, selected, bodyPart }: BodyShapeImageProps) {
  const baseClasses = "w-full h-auto object-contain transition-all rounded-lg"
  const selectedClasses = selected ? "border-4 border-teal-500 shadow-md" : ""

  // Return the appropriate image based on the type and body part
  return (
    <div className={cn("relative", selectedClasses)}>
      {bodyPart === "belly" ? renderBellyShape(type, baseClasses) : renderHipShape(type, baseClasses)}
      {selected && (
        <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  )
}

function renderBellyShape(type: BodyShapeType, className: string) {
  switch (type) {
    case "flatter":
      return (
        <div className="relative aspect-square w-28 h-28 md:w-36 md:h-36 mx-auto">
          <Image
            src="/images/belly-flatter.png"
            alt="Flatter Belly Shape"
            className={className}
            fill
            sizes="(max-width: 768px) 112px, 144px"
            style={{ objectFit: "contain" }}
          />
        </div>
      )
    case "average":
      return (
        <div className="relative aspect-square w-28 h-28 md:w-36 md:h-36 mx-auto">
          <Image
            src="/images/belly-average.png"
            alt="Average Belly Shape"
            className={className}
            fill
            sizes="(max-width: 768px) 112px, 144px"
            style={{ objectFit: "contain" }}
          />
        </div>
      )
    case "curvier":
      return (
        <div className="relative aspect-square w-28 h-28 md:w-36 md:h-36 mx-auto">
          <Image
            src="/images/belly-curvier.png"
            alt="Curvier Belly Shape"
            className={className}
            fill
            sizes="(max-width: 768px) 112px, 144px"
            style={{ objectFit: "contain" }}
          />
        </div>
      )
    default:
      return null
  }
}

function renderHipShape(type: BodyShapeType, className: string) {
  switch (type) {
    case "straighter":
      return (
        <div className="relative aspect-square w-28 h-28 md:w-36 md:h-36 mx-auto">
          <Image
            src="/images/hip-straighter.png"
            alt="Straighter Hips Shape"
            className={className}
            fill
            sizes="(max-width: 768px) 112px, 144px"
            style={{ objectFit: "contain" }}
          />
        </div>
      )
    case "average":
      return (
        <div className="relative aspect-square w-28 h-28 md:w-36 md:h-36 mx-auto">
          <Image
            src="/images/hip-average.png"
            alt="Average Hips Shape"
            className={className}
            fill
            sizes="(max-width: 768px) 112px, 144px"
            style={{ objectFit: "contain" }}
          />
        </div>
      )
    case "wider":
      return (
        <div className="relative aspect-square w-28 h-28 md:w-36 md:h-36 mx-auto">
          <Image
            src="/images/hip-wider.png"
            alt="Wider Hips Shape"
            className={className}
            fill
            sizes="(max-width: 768px) 112px, 144px"
            style={{ objectFit: "contain" }}
          />
        </div>
      )
    default:
      return null
  }
}
