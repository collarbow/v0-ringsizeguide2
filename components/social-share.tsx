"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Link, Check, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
}

export function SocialShare({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "COLLAR & BOW Size Finder",
  description = "Find your perfect size with our interactive size finder tool",
}: SocialShareProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const shareData = {
    url,
    title,
    text: description,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: t("linkCopied"),
        description: t("linkCopiedDesc"),
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: t("copyFailed"),
        description: t("copyFailedDesc"),
        variant: "destructive",
      })
    }
  }

  const handleShare = async (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "native":
        if (navigator.share) {
          try {
            await navigator.share(shareData)
            return
          } catch (err) {
            console.error("Error sharing:", err)
          }
        }
        // Fallback to copy link if native sharing fails or isn't available
        handleCopyLink()
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{t("shareThisTool")}</h3>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("native")}>
          <Share2 className="h-4 w-4" />
          {t("share")}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-neutral-100 hover:bg-neutral-200 border-neutral-300"
          onClick={() => handleShare("facebook")}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5 text-black" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-neutral-100 hover:bg-neutral-200 border-neutral-300"
          onClick={() => handleShare("twitter")}
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5 text-black" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-neutral-100 hover:bg-neutral-200 border-neutral-300"
          onClick={() => handleCopyLink}
          aria-label="Share on Instagram"
        >
          <Instagram className="h-5 w-5 text-black" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-neutral-100 hover:bg-neutral-200 border-neutral-300"
          onClick={() => handleShare("linkedin")}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-5 w-5 text-black" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${copied ? "bg-neutral-200 border-neutral-400" : "bg-neutral-100 hover:bg-neutral-200 border-neutral-300"}`}
          onClick={handleCopyLink}
          aria-label="Copy link"
        >
          {copied ? <Check className="h-5 w-5 text-black" /> : <Link className="h-5 w-5 text-black" />}
        </Button>
      </div>
    </div>
  )
}
