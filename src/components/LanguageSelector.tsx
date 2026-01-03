import { Languages } from 'lucide-react';
import { useLanguage } from '../utils/i18n/LanguageContext';
import { languages } from '../utils/i18n/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 border border-white/30 bg-white/10 text-white shadow-sm hover:bg-white/20 hover:border-white/50 h-9 px-4 py-2 backdrop-blur-sm">
        <Languages className="size-4" />
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${
              language === lang.code ? 'bg-blue-50 text-[#002B5B]' : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{lang.nativeName}</span>
              {language === lang.code && (
                <span className="text-[#FF9933]">✓</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}