import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
]

export function LanguageSelector() {
  const [selectedLang, setSelectedLang] = useState(languages[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-1 text-primary hover:text-primary/90 dark:text-white dark:hover:text-white/90"
        >
          <span className="text-lg">{selectedLang.flag}</span>
          <span className="hidden sm:inline">{selectedLang.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 dark:border-white/10"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setSelectedLang(lang)}
          >
            <span>
              {lang.flag} {lang.name}
            </span>
            {selectedLang.code === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

