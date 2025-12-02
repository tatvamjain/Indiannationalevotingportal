import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner';

export default function SessionResponsePage() {
  const navigate = useNavigate();
  const [isGranted, setIsGranted] = useState<boolean | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createVoterSession();
  }, []);

  const createVoterSession = async () => {
    try {
      const supabase = createClient();
      
      // Get registration data from sessionStorage
      const registrationData = JSON.parse(sessionStorage.getItem('registrationData') || '{}');
      const { name, aadhaar, phone } = registrationData;

      if (!aadhaar || !phone) {
        setIsGranted(false);
        setLoading(false);
        return;
      }

      // Check if voter already exists
      const { data: existingVoter, error: checkError } = await supabase
        .from('voters')
        .select('*')
        .eq('aadhaar_number', aadhaar)
        .single();

      let voterRecord;

      if (existingVoter) {
        // Voter exists, update session status
        const { data: updatedVoter, error: updateError } = await supabase
          .from('voters')
          .update({ session_status: true })
          .eq('id', existingVoter.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating voter:', updateError);
          toast.error('Failed to create session');
          setIsGranted(false);
          setLoading(false);
          return;
        }

        voterRecord = updatedVoter;
      } else {
        // Create new voter
        const { data: newVoter, error: insertError } = await supabase
          .from('voters')
          .insert({
            aadhaar_number: aadhaar,
            phone_number: phone,
            has_voted: false,
            session_status: true,
            receipt_id: null
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating voter:', insertError);
          toast.error('Failed to create voter account');
          setIsGranted(false);
          setLoading(false);
          return;
        }

        voterRecord = newVoter;
      }

      // Store voter ID and session data
      const session = {
        voterID: voterRecord.id,
        userID: `USER-${voterRecord.id.slice(0, 8)}`,
        sessionID: `SESSION-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        timestamp: new Date().toLocaleString('en-IN'),
        aadhaar,
        phone,
        name
      };

      sessionStorage.setItem('sessionData', JSON.stringify(session));
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('voterID', voterRecord.id);
      
      setSessionData(session);
      setIsGranted(true);
      setLoading(false);
      
    } catch (err) {
      console.error('Session creation error:', err);
      setIsGranted(false);
      setLoading(false);
      toast.error('Failed to create session');
    }
  };

  const handleContinue = () => {
    if (isGranted) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showNav={false} />
        <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin size-12 border-4 border-[#002B5B] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#002B5B]">Creating session...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />
      
      <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className={`border-2 ${isGranted ? 'border-green-500' : 'border-red-500'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isGranted ? 'text-green-600' : 'text-red-600'}`}>
                  {isGranted ? (
                    <>
                      <CheckCircle className="size-6" />
                      Authentication Granted
                    </>
                  ) : (
                    <>
                      <XCircle className="size-6" />
                      Authentication Denied
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {isGranted && sessionData ? (
                    <>
                      <div className={`bg-green-50 border border-green-200 rounded-lg p-4`}>
                        <p className="text-sm text-green-900 mb-4">
                          Your identity has been successfully verified. Session created.
                        </p>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">User ID:</span>
                            <span className="text-green-900 font-mono">{sessionData.userID}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Session ID:</span>
                            <span className="text-green-900 font-mono">{sessionData.sessionID}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span className="text-green-900">{sessionData.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={handleContinue}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Continue to Dashboard
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-900">
                          Authentication failed. Please verify your information and try again.
                        </p>
                      </div>

                      <Button 
                        onClick={handleContinue}
                        variant="outline"
                        className="w-full border-red-500 text-red-600 hover:bg-red-50"
                      >
                        Try Again
                      </Button>
                    </>
                  )}
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