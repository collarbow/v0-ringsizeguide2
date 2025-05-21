"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
        className="text-sm whitespace-nowrap"
      >
        {language === "en" ? t("arabic") : t("english")}
      </Button>
    </div>
  )
}
