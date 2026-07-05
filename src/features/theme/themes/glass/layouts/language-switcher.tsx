import { ChevronDown, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { m } from "@/paraglide/messages";
import { getLocale, setLocale } from "@/paraglide/runtime";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = getLocale();

  const handleLanguageChange = (locale: "zh" | "en") => {
    setLocale(locale);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-full h-full text-muted-foreground hover:text-foreground transition-colors group"
        aria-label={m.common_switch_language()}
      >
        <Languages
          size={16}
          strokeWidth={1.5}
          className="group-hover:scale-110 transition-transform"
        />
        <ChevronDown
          size={10}
          className={`ml-0.5 opacity-70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 z-50 py-1 animate-in fade-in zoom-in-95 duration-200 rounded-xl overflow-hidden glass-card">
          <button
            onClick={() => handleLanguageChange("zh")}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
              currentLocale === "zh"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            中文
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
              currentLocale === "en"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
