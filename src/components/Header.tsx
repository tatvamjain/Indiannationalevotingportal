import { Vote } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  showNav?: boolean;
  isAdmin?: boolean;
}

export default function Header({ showNav = true, isAdmin = false }: HeaderProps) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="bg-[#002B5B] text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={isAdminRoute ? "/admin" : "/"} className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Vote className="size-8 text-[#002B5B]" />
            </div>
            <div>
              <h1 className="text-white">National E-Voting Portal</h1>
              <p className="text-xs text-blue-200">
                {isAdminRoute ? 'Admin Panel - Demo System' : 'Demo System - For Educational Purposes Only'}
              </p>
            </div>
          </Link>
          {showNav && (
            <nav className="hidden md:flex gap-6">
              {isAdminRoute ? (
                <>
                  <Link to="/admin" className="text-white hover:text-blue-200 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/admin/election-setup" className="text-white hover:text-blue-200 transition-colors">
                    Election Setup
                  </Link>
                  <Link to="/admin/candidates" className="text-white hover:text-blue-200 transition-colors">
                    Candidates
                  </Link>
                  <Link to="/admin/reports" className="text-white hover:text-blue-200 transition-colors">
                    Results & Reports
                  </Link>
                  <Link to="/admin/supabase" className="text-white hover:text-blue-200 transition-colors">
                    Supabase
                  </Link>
                  <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                    Voter Portal
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                    Home
                  </Link>
                  <Link to="/register" className="text-white hover:text-blue-200 transition-colors">
                    Register
                  </Link>
                  <Link to="/results" className="text-white hover:text-blue-200 transition-colors">
                    View Results
                  </Link>
                  <Link to="/admin" className="text-white hover:text-blue-200 transition-colors">
                    Admin Panel
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}