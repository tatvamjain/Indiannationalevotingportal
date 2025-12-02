import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import OTPInput from './OTPInput';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOTPComplete = (otp: string) => {
    // Demo: Accept any 6-digit OTP
    if (otp.length === 6) {
      toast.success('OTP entered successfully');
      
      setTimeout(() => {
        // Navigate to validation screen instead of directly to dashboard
        navigate('/validating-session');
      }, 500);
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      toast.success('Demo OTP resent successfully');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002B5B]">Verify OTP</CardTitle>
                <CardDescription>
                  Enter the 6-digit OTP sent to your mobile number (Demo: use any 6 digits)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <OTPInput onComplete={handleOTPComplete} />

                  <div className="text-center">
                    {!canResend ? (
                      <p className="text-sm text-gray-600">
                        Resend OTP in <span className="text-[#002B5B]">{timer}s</span>
                      </p>
                    ) : (
                      <Button
                        variant="link"
                        onClick={handleResend}
                        className="text-[#002B5B]"
                      >
                        Resend OTP (Demo)
                      </Button>
                    )}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-900 text-center">
                      Demo Mode: Enter any 6 digits to proceed
                    </p>
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
