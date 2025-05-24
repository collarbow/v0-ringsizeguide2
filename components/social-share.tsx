"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Link2, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"

export function SocialShare() {
  const { toast } = useToast()
  const { t, language } = useLanguage()
  const url = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = (platform: string) => {
    let shareUrl = ""
    const shareText =
      language === "ar"
        ? "تحقق من أداة مكتشف المقاسات من COLLAR & BOW!"
        : "Check out this size finder tool from COLLAR & BOW!"

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "direct":
        // Use Web Share API for direct sharing if available
        if (navigator.share) {
          navigator
            .share({
              title: "COLLAR & BOW Size Finder",
              text: shareText,
              url: url,
            })
            .catch((err) => {
              console.error("Error sharing:", err)
              // Fallback to copying to clipboard
              copyToClipboard()
            })
        } else {
          // Fallback to copying to clipboard
          copyToClipboard()
        }
        return
      case "copy":
        copyToClipboard()
        return
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: language === "ar" ? "تم نسخ الرابط!" : "Link copied!",
      description:
        language === "ar" ? "تم نسخ الرابط إلى الحافظة الخاصة بك." : "The link has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-4 social-share-container">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium mb-2 rtl-center">{t("Share This Size Finder")}</h3>
        <div className="flex flex-wrap justify-center gap-2 social-share-buttons">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-blue-100 hover:text-blue-600"
            onClick={() => handleShare("facebook")}
            aria-label={t("shareOnFacebook")}
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">{t("shareOnFacebook")}</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-sky-100 hover:text-sky-600"
            onClick={() => handleShare("twitter")}
            aria-label={t("shareOnTwitter")}
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">{t("shareOnTwitter")}</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-blue-100 hover:text-blue-800"
            onClick={() => handleShare("linkedin")}
            aria-label={t("shareOnLinkedIn")}
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">{t("shareOnLinkedIn")}</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-green-100 hover:text-green-600"
            onClick={() => handleShare("direct")}
            aria-label={t("directShare")}
          >
            <Share2 className="h-5 w-5" />
            <span className="sr-only">{t("directShare")}</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-gray-100"
            onClick={() => handleShare("copy")}
            aria-label={t("copyLink")}
          >
            <Link2 className="h-5 w-5" />
            <span className="sr-only">{t("copyLink")}</span>
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-4 rtl-center">
        <p>© 2025 COLLAR & BOW. {t("allRightsReserved")}</p>
      </div>

      <div className="text-center text-xs text-gray-400 mt-2 border-t pt-2 rtl-center">
        <p>{t("sizeTechPoweredBy")}</p>
        <a
          href="https://www.fitanalytics.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:underline"
        >
          {t("privacyPolicy")}
        </a>
      </div>
    </div>
  )
}
