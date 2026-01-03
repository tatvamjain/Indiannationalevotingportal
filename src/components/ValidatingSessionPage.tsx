import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Shield } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';

export default function ValidatingSessionPage() {
  const navigate = useNavigate();
  const { isVoiceMode, speak } = useVoiceAccessibility();

  useEffect(() => {
    // Announce to voice users ONLY ONCE when page loads
    if (isVoiceMode) {
      speak('Validating your authentication. Please wait while we verify your credentials with Aadhaar.');
    }
    
    // Simulate sending to UIDAI and validating
    const timer = setTimeout(() => {
      navigate('/session-response');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]); // Removed isVoiceMode and speak from dependencies to prevent infinite loop

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />
      
      <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002B5B] flex items-center gap-2">
                  <Shield className="size-5" />
                  Validating Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="size-16 text-[#002B5B] animate-spin" />
                    <div className="text-center">
                      <p className="text-[#002B5B] mb-2">
                        Sending Aadhaar + OTP to UIDAI (Demo)
                      </p>
                      <p className="text-sm text-gray-600">
                        Please wait while we validate your credentials...
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <ul className="text-xs text-blue-900 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full"></div>
                        Verifying Aadhaar number
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full"></div>
                        Validating OTP
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full"></div>
                        Creating secure session
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