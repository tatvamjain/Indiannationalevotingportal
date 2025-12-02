import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegistrationPage from './components/RegistrationPage';
import OTPVerificationPage from './components/OTPVerificationPage';
import ValidatingSessionPage from './components/ValidatingSessionPage';
import SessionResponsePage from './components/SessionResponsePage';
import DashboardPage from './components/DashboardPage';
import BallotLoadingPage from './components/BallotLoadingPage';
import BallotPage from './components/BallotPage';
import ValidatingVotePage from './components/ValidatingVotePage';
import ConfirmationPage from './components/ConfirmationPage';
import ReceiptHistoryPage from './components/ReceiptHistoryPage';
import ResultsPage from './components/ResultsPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ElectionSetupPage from './components/admin/ElectionSetupPage';
import CandidateManagementPage from './components/admin/CandidateManagementPage';
import AdminReportsPage from './components/admin/AdminReportsPage';
import SupabaseIntegrationPage from './components/admin/SupabaseIntegrationPage';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/validating-session" element={<ValidatingSessionPage />} />
          <Route path="/session-response" element={<SessionResponsePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ballot-loading" element={<BallotLoadingPage />} />
          <Route path="/ballot" element={<BallotPage />} />
          <Route path="/validating-vote" element={<ValidatingVotePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/receipt-history" element={<ReceiptHistoryPage />} />
          <Route path="/results" element={<ResultsPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/election-setup" element={<ElectionSetupPage />} />
          <Route path="/admin/candidates" element={<CandidateManagementPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/supabase" element={<SupabaseIntegrationPage />} />
        </Routes>
      </div>
    </Router>
  );
}
