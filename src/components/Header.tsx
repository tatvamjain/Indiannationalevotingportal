import { Vote } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../utils/i18n/LanguageContext';

interface HeaderProps {
  showNav?: boolean;
  isAdmin?: boolean;
}

export default function Header({ showNav = true, isAdmin = false }: HeaderProps) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { t } = useLanguage();

  return (
    <header className="bg-[#002B5B]/95 backdrop-blur-md text-white shadow-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link to={isAdminRoute ? "/admin" : "/"} className="flex items-center gap-3 group">
            <div className="bg-white p-2.5 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
              <Vote className="size-8 text-[#002B5B]" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-xl tracking-wide">{t.appTitle}</h1>
              <p className="text-xs text-blue-200/90 tracking-wide">
                {isAdminRoute ? `${t.adminPortal} - Demo System` : t.disclaimerText.split('.')[0]}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {showNav && (
              <nav className="hidden md:flex gap-6">
                {isAdminRoute ? (
                  <>
                    <Link to="/admin" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      {t.dashboard}
                    </Link>
                    <Link to="/admin/election-setup" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      {t.electionManagement}
                    </Link>
                    <Link to="/admin/candidates" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      {t.candidateManagement}
                    </Link>
                    <Link to="/admin/reports" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      {t.results} & {t.reports}
                    </Link>
                    <Link to="/admin/supabase" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      Supabase
                    </Link>
                    <Link to="/" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      Voter Portal
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      {t.home}
                    </Link>
                    <Link to="/register" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      {t.registration}
                    </Link>
                    <Link to="/results" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      {t.viewElectionResults}
                    </Link>
                    <Link to="/admin" className="text-white/90 hover:text-white font-medium transition-colors tracking-wide">
                      {t.adminPortal}
                    </Link>
                  </>
                )}
              </nav>
            )}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}