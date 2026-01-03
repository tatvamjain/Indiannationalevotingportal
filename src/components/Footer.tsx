import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200/80 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-300/60 rounded-xl p-5 mb-8 flex items-start gap-3 shadow-[0_2px_12px_rgba(245,158,11,0.1)]">
          <AlertCircle className="size-5 text-amber-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <p className="text-sm text-amber-900 leading-relaxed tracking-wide">
              <span className="font-bold">{t.disclaimer}:</span> {t.disclaimerText}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-6 text-sm">
          <button onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-[#002B5B] transition-colors font-medium tracking-wide">
            {t.about}
          </button>
          <button onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-[#002B5B] transition-colors font-medium tracking-wide">
            {t.privacyPolicy}
          </button>
          <Link to="/contact" className="text-gray-600 hover:text-[#002B5B] transition-colors font-medium tracking-wide">
            {t.contactUs}
          </Link>
          <button onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-[#002B5B] transition-colors font-medium tracking-wide">
            {t.termsOfService}
          </button>
        </div>
        
        <p className="text-center text-sm text-gray-600 tracking-wide">
          © 2025 {t.appTitle}. {t.copyrightText}
        </p>
      </div>
    </footer>
  );
}