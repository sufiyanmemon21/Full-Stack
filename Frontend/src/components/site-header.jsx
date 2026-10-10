import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext"; // Apne path ke mutabiq check karlein
import { useContext, useState } from "react";
import { Moon, Sun, Globe, ChevronDown } from "lucide-react"; 

export function SiteHeader() {
  const { Theme, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage } = useContext(LanguageContext);
  
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'UR', name: 'اردو' },
    { code: 'ES', name: 'Español' },
  ];

  const handleSelect = (langName) => {
    changeLanguage(langName);
    setIsOpen(false);
  };

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Documents</h1>

        {/* Right Section: Language Dropdown & Theme Toggle */}
        <div className="ml-auto flex items-center gap-4">
          
          {/* Language Dropdown Container */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors border border-input bg-background"
              aria-label="Select language"
            >
              <Globe className="h-4 w-4" />
              <span>{language}</span> {/* Selected language yahan show hogi */}
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu List */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-popover text-popover-foreground border rounded-md shadow-lg py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.name)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                      language === lang.name ? 'font-bold text-primary bg-accent/50' : ''
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Section (Waisa hi jaisa pehle tha) */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground hidden sm:block">Current: {Theme}</p>
            
            <button 
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {Theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}