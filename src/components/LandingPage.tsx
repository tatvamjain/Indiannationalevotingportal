import { Link } from 'react-router-dom';
import { Vote, Shield, Clock, CheckCircle, BarChart, Sparkles } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { useLanguage } from '../utils/i18n/LanguageContext';
import { useVoiceGuide } from '../hooks/useVoiceGuide';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const voiceGuide = useVoiceGuide({
    page: 'welcome',
    welcomeMessage: 'Welcome to the National E-Voting Portal. This is a demonstration system. Say "Start Voting" to begin the registration process, or say "View Results" to see election results.',
    commands: {
      'start voting': () => {
        voiceGuide.speak('Navigating to voter registration.', () => {
          navigate('/register');
        });
      },
      'register': () => {
        voiceGuide.speak('Navigating to voter registration.', () => {
          navigate('/register');
        });
      },
      'view results': () => {
        voiceGuide.speak('Navigating to election results.', () => {
          navigate('/results');
        });
      },
      'results': () => {
        voiceGuide.speak('Navigating to election results.', () => {
          navigate('/results');
        });
      },
    },
    autoStart: true,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#001a3d] via-[#002B5B] to-[#003d73] text-white py-24 md:py-32 overflow-hidden">
          {/* Decorative spotlight */}
          <div className="absolute inset-0 opacity-[0.15]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-white rounded-full blur-[120px]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-green-400/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <div className="size-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-sm tracking-wider font-medium text-green-100">Demo System {t.active}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {t.landingTitle}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100/95 mb-10 max-w-3xl mx-auto leading-relaxed tracking-wide font-light">
                {t.landingSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-[#FF9933] hover:bg-[#E88A2E] text-white border-0 px-8 py-6 text-lg shadow-[0_8px_24px_rgba(255,153,51,0.35)] hover:shadow-[0_12px_32px_rgba(255,153,51,0.45)] transition-all font-semibold tracking-wide">
                    <Sparkles className="size-5 mr-2" />
                    {t.registerToVote}
                  </Button>
                </Link>
                <Link to="/results">
                  <Button size="lg" variant="outline" className="bg-white text-[#002B5B] border-white hover:bg-gray-50 px-8 py-6 text-lg shadow-[0_8px_24px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.35)] transition-all font-semibold tracking-wide">
                    <BarChart className="size-5 mr-2" />
                    {t.viewElectionResults}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#002B5B] mb-4 tracking-tight">
                {t.features}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
                {t.landingDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-8 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,43,91,0.08)] hover:shadow-[0_8px_32px_rgba(0,43,91,0.12)] transition-all border border-gray-100/50 backdrop-blur-sm">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 size-20 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_4px_16px_rgba(59,130,246,0.15)]">
                  <Shield className="size-10 text-[#002B5B]" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3 tracking-wide">{t.secureVoting}</h3>
                <p className="text-gray-600 leading-relaxed tracking-wide">
                  {t.secureVotingDesc}
                </p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,43,91,0.08)] hover:shadow-[0_8px_32px_rgba(0,43,91,0.12)] transition-all border border-gray-100/50 backdrop-blur-sm">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 size-20 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_4px_16px_rgba(255,153,51,0.15)]">
                  <Clock className="size-10 text-[#FF9933]" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3 tracking-wide">{t.aadhaarVerification}</h3>
                <p className="text-gray-600 leading-relaxed tracking-wide">
                  {t.aadhaarVerificationDesc}
                </p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,43,91,0.08)] hover:shadow-[0_8px_32px_rgba(0,43,91,0.12)] transition-all border border-gray-100/50 backdrop-blur-sm">
                <div className="bg-gradient-to-br from-green-50 to-green-100 size-20 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_4px_16px_rgba(34,197,94,0.15)]">
                  <CheckCircle className="size-10 text-green-600" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3 tracking-wide">{t.instantResults}</h3>
                <p className="text-gray-600 leading-relaxed tracking-wide">
                  {t.instantResultsDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#002B5B] mb-4 tracking-tight">
                {t.howItWorks}
              </h2>
              <p className="text-lg text-gray-600 tracking-wide">
                {t.howItWorksSubtitle}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,43,91,0.1)] border border-gray-100/50">
              <div className="space-y-6">
                {[
                  { step: '1', title: t.step1Title, desc: t.step1Description },
                  { step: '2', title: t.step2Title, desc: t.step2Description },
                  { step: '3', title: t.step3Title, desc: t.step3Description },
                  { step: '4', title: t.step4Title, desc: t.step4Description }
                ].map((item, index) => (
                  <div key={item.step} className="flex gap-6 items-start p-6 bg-gradient-to-r from-gray-50/80 to-transparent rounded-xl hover:from-gray-50 transition-colors border-l-4 border-[#FF9933]">
                    <div className="bg-gradient-to-br from-[#FF9933] to-[#E88A2E] text-white size-14 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold shadow-[0_4px_16px_rgba(255,153,51,0.3)]">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-semibold text-[#002B5B] mb-2 tracking-wide">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed tracking-wide">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}