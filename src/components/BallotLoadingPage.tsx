import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, FileText } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';

export default function BallotLoadingPage() {
  const navigate = useNavigate();
  const { isVoiceMode, speak } = useVoiceAccessibility();
  const hasSpoken = useRef(false);

  useEffect(() => {
    // Announce to voice users (only once)
    if (isVoiceMode && !hasSpoken.current) {
      speak('Loading your ballot. Please wait while we prepare the election details and candidate list.');
      hasSpoken.current = true;
    }
    
    // Simulate loading ballot configuration
    const timer = setTimeout(() => {
      navigate('/ballot');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, isVoiceMode]); // Removed 'speak' from dependencies

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />
      
      <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002B5B] flex items-center gap-2">
                  <FileText className="size-5" />
                  Loading Ballot Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="size-16 text-[#002B5B] animate-spin" />
                    <div className="text-center">
                      <p className="text-[#002B5B] mb-2">
                        Preparing Your Ballot
                      </p>
                      <p className="text-sm text-gray-600">
                        Loading election details and candidate list...
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <ul className="text-xs text-blue-900 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full"></div>
                        Loading election: Mock Lok Sabha 2025
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full"></div>
                        Constituency: Demo Constituency 001
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full"></div>
                        Fetching candidate information
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}