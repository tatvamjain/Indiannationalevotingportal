import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import OTPInput from './OTPInput';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { useVoiceGuide } from '../hooks/useVoiceGuide';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
import { useLanguage } from '../utils/i18n/LanguageContext';

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const { isVoiceMode } = useVoiceAccessibility();
  const { t } = useLanguage();
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState('');
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  
  // Use refs to always have the latest values in callbacks
  const otpRef = useRef(otp);
  const canResendRef = useRef(canResend);
  const timerRef = useRef(timer);
  
  // Keep refs in sync with state
  useEffect(() => {
    otpRef.current = otp;
  }, [otp]);
  
  useEffect(() => {
    canResendRef.current = canResend;
  }, [canResend]);
  
  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);

  // Handle voice input for OTP
  const handleVoiceInput = useCallback((voiceText: string) => {
    if (!isVoiceMode || isProcessingVoice) return;
    
    const currentOtp = otpRef.current; // Use ref for latest value
    const currentCanResend = canResendRef.current; // Use ref for latest value
    const currentTimer = timerRef.current; // Use ref for latest value
    const lowerText = voiceText.toLowerCase().trim();
    console.log('Processing voice input for OTP:', voiceText, 'Current OTP length:', currentOtp.length);
    
    // Ignore if the user is just repeating prompts
    const ignoredPhrases = [
      'ready',
      'otp',
      'otp code',
      'verification code',
      'please say',
      'say your',
      'digit',
      'digits',
      'six digit',
      'six-digit',
      '6 digit',
      '6-digit'
    ];
    
    // Check if input is just a field prompt being repeated
    const isJustPrompt = ignoredPhrases.some(phrase => 
      lowerText === phrase || lowerText.startsWith(phrase + ' ') || lowerText.endsWith(' ' + phrase)
    );
    
    if (isJustPrompt && lowerText.split(' ').length < 4) {
      console.log('Ignoring OTP prompt echo:', voiceText);
      voiceGuide.speak('Please say the actual digits of your OTP code, not the field name.', () => {
        setIsProcessingVoice(false);
        voiceGuide.listenForInput(handleVoiceInput);
      });
      return;
    }
    
    // Check for commands
    if (lowerText.includes('resend') || lowerText.includes('send again')) {
      if (currentCanResend) {
        handleResend();
        voiceGuide.speak('Demo OTP has been resent. Please say your 6-digit OTP code.', () => {
          setIsProcessingVoice(false);
          voiceGuide.listenForInput(handleVoiceInput);
        });
      } else {
        voiceGuide.speak(`Please wait ${currentTimer} seconds before requesting a new OTP.`, () => {
          setIsProcessingVoice(false);
          voiceGuide.listenForInput(handleVoiceInput);
        });
      }
      return;
    }

    if (lowerText.includes('verify') || lowerText.includes('submit') || lowerText.includes('continue')) {
      if (currentOtp.length === 6) {
        handleOTPComplete(currentOtp);
      } else {
        voiceGuide.speak(`You have entered ${currentOtp.length} digits. Please provide all 6 digits.`, () => {
          setIsProcessingVoice(false);
          voiceGuide.listenForInput(handleVoiceInput);
        });
      }
      return;
    }

    if (lowerText.includes('clear') || lowerText.includes('reset') || lowerText.includes('start over')) {
      setOtp('');
      voiceGuide.speak('OTP cleared. Please say your 6-digit OTP code.', () => {
        setIsProcessingVoice(false);
        voiceGuide.listenForInput(handleVoiceInput);
      });
      return;
    }

    setIsProcessingVoice(true);

    // Extract digits from voice input
    const digits = voiceText.replace(/\D/g, '');
    
    if (digits.length > 0) {
      const newOtp = (currentOtp + digits).slice(0, 6);
      setOtp(newOtp);
      
      if (newOtp.length === 6) {
        voiceGuide.speak(`Complete! OTP is ${newOtp.split('').join(' ')}. Verifying now.`, () => {
          setIsProcessingVoice(false);
          // Auto-submit when 6 digits are entered
          setTimeout(() => {
            handleOTPComplete(newOtp);
          }, 500);
        });
      } else {
        const remaining = 6 - newOtp.length;
        voiceGuide.speak(`${newOtp.length} digits entered. ${remaining} more ${remaining === 1 ? 'digit' : 'digits'} needed.`, () => {
          setIsProcessingVoice(false);
          voiceGuide.listenForInput(handleVoiceInput);
        });
      }
    } else {
      voiceGuide.speak('No digits detected. Please say the digits of your OTP code.', () => {
        setIsProcessingVoice(false);
        voiceGuide.listenForInput(handleVoiceInput);
      });
    }
  }, [isVoiceMode, isProcessingVoice]);

  const voiceGuide = useVoiceGuide({
    page: 'otp-verification',
    welcomeMessage: 'OTP verification page. Please say your 6-digit OTP code. You can say the digits one by one, or all together. Say "resend" to request a new OTP, or say "clear" to start over.',
    commands: {
      'ready': () => {
        voiceGuide.speak('Please say your 6-digit OTP code.', () => {
          voiceGuide.listenForInput(handleVoiceInput);
        });
      },
    },
    autoStart: true,
    onVoiceInput: handleVoiceInput,
  });

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

  const handleOTPComplete = (otpValue: string) => {
    // Demo: Accept any 6-digit OTP
    if (otpValue.length === 6) {
      toast.success('OTP entered successfully');
      
      if (voiceGuide.isVoiceMode) {
        voiceGuide.speak('OTP verified successfully. Proceeding to validate your session.', () => {
          navigate('/validating-session');
        });
      } else {
        setTimeout(() => {
          navigate('/validating-session');
        }, 500);
      }
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp('');
      toast.success('Demo OTP resent successfully');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto space-y-6">
            {/* Voice Mode Status Indicator */}
            {isVoiceMode && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-900">
                      Voice Mode Active - OTP Entry ({otp.length}/6)
                    </p>
                    {voiceGuide.isListening && (
                      <p className="text-xs text-green-700 mt-1">🎤 Listening...</p>
                    )}
                    {voiceGuide.isSpeaking && (
                      <p className="text-xs text-green-700 mt-1">🔊 Speaking...</p>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-10 w-10 rounded border-2 flex items-center justify-center ${
                        i < otp.length
                          ? 'bg-green-100 border-green-500 text-green-900'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {i < otp.length ? otp[i] : ''}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-[#002B5B]">{t.otpVerification}</CardTitle>
                <CardDescription>
                  {t.enterOTP}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <OTPInput 
                    onComplete={handleOTPComplete}
                    value={otp}
                    onChange={setOtp}
                  />

                  <div className="text-center">
                    {!canResend ? (
                      <p className="text-sm text-gray-600">
                        {t.resendOTP} in <span className="text-[#002B5B]">{timer}s</span>
                      </p>
                    ) : (
                      <Button
                        variant="link"
                        onClick={handleResend}
                        className="text-[#002B5B]"
                      >
                        {t.resendOTP}
                      </Button>
                    )}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-900 text-center">
                      {t.otpInstructions}
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