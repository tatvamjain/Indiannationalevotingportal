import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { useVoiceGuide } from '../hooks/useVoiceGuide';
import VoiceAccessibilityNotice from './VoiceAccessibilityNotice';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
import { useLanguage } from '../utils/i18n/LanguageContext';

type FormField = 'name' | 'aadhaar' | 'phone' | 'review';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { isVoiceMode } = useVoiceAccessibility();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    aadhaar: '',
    phone: ''
  });
  const [currentField, setCurrentField] = useState<FormField>('name');
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  
  // Use refs to always have the latest values in callbacks
  const currentFieldRef = useRef<FormField>(currentField);
  const formDataRef = useRef(formData);
  
  // Keep refs in sync with state
  useEffect(() => {
    currentFieldRef.current = currentField;
  }, [currentField]);
  
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  // Handle voice input for current field
  const handleVoiceInput = useCallback((voiceText: string) => {
    if (!isVoiceMode || isProcessingVoice) return;
    
    const activeField = currentFieldRef.current; // Use ref for latest value
    const activeFormData = formDataRef.current; // Use ref for latest value
    const lowerText = voiceText.toLowerCase().trim();
    console.log('Processing voice input for field:', activeField, 'Input:', voiceText);
    
    // Ignore if the user is just repeating the field prompt
    const ignoredPhrases = [
      'ready',
      'name',
      'aadhaar number',
      'aadhar number', 
      'mobile number',
      'phone number',
      'full name',
      'please say',
      'say your',
      'enter your',
      'moving to',
      'digits needed'
    ];
    
    // Check if input is just a field prompt being repeated
    const isJustPrompt = ignoredPhrases.some(phrase => 
      lowerText === phrase || lowerText.startsWith(phrase + ' ') || lowerText.endsWith(' ' + phrase)
    );
    
    if (isJustPrompt && lowerText.split(' ').length < 3) {
      console.log('Ignoring field prompt echo:', voiceText);
      voiceGuide.speak('Please provide the actual information, not the field name.', () => {
        setIsProcessingVoice(false);
        voiceGuide.listenForInput(handleVoiceInput);
      });
      return;
    }
    
    // Check for navigation commands
    if (lowerText.includes('submit') || lowerText.includes('send otp') || lowerText.includes('continue')) {
      handleVoiceSubmit();
      return;
    }

    if (lowerText.includes('skip')) {
      moveToNextField();
      return;
    }

    setIsProcessingVoice(true);

    // Process based on current field
    switch (activeField) {
      case 'name':
        // Filter out command words and get clean name
        let cleanName = voiceText.trim();
        
        // Remove common voice command artifacts
        cleanName = cleanName.replace(/^(ready|name|full name|please|say)\s*/i, '');
        cleanName = cleanName.replace(/\s*(please|say|your|name)$/i, '');
        cleanName = cleanName.trim();
        
        if (cleanName.length < 2) {
          voiceGuide.speak('Name is too short. Please say your full name clearly.', () => {
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
          return;
        }
        
        setFormData(prev => ({ ...prev, name: cleanName }));
        voiceGuide.speak(`Name entered as ${cleanName}. Moving to Aadhaar number.`, () => {
          setCurrentField('aadhaar');
          voiceGuide.speak('Please say your 12-digit Aadhaar number. You can say the digits one by one, or in groups.', () => {
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
        });
        break;

      case 'aadhaar':
        // Extract digits from voice input
        const aadhaarDigits = voiceText.replace(/\D/g, '');
        if (aadhaarDigits.length > 0) {
          const currentAadhaar = activeFormData.aadhaar;
          const newAadhaar = (currentAadhaar + aadhaarDigits).slice(0, 12);
          setFormData(prev => ({ ...prev, aadhaar: newAadhaar }));
          
          if (newAadhaar.length === 12) {
            voiceGuide.speak(`Aadhaar number complete: ending in ${newAadhaar.slice(-4)}. Moving to mobile number.`, () => {
              setCurrentField('phone');
              voiceGuide.speak('Please say your 10-digit mobile number.', () => {
                setIsProcessingVoice(false);
                voiceGuide.listenForInput(handleVoiceInput);
              });
            });
          } else {
            const remaining = 12 - newAadhaar.length;
            voiceGuide.speak(`${newAadhaar.length} digits entered. ${remaining} more digits needed.`, () => {
              setIsProcessingVoice(false);
              voiceGuide.listenForInput(handleVoiceInput);
            });
          }
        } else {
          voiceGuide.speak('No digits detected. Please say the digits of your Aadhaar number.', () => {
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
        }
        break;

      case 'phone':
        // Extract digits from voice input
        const phoneDigits = voiceText.replace(/\D/g, '');
        if (phoneDigits.length > 0) {
          const currentPhone = activeFormData.phone;
          const newPhone = (currentPhone + phoneDigits).slice(0, 10);
          setFormData(prev => ({ ...prev, phone: newPhone }));
          
          if (newPhone.length === 10) {
            voiceGuide.speak(`Mobile number complete: ending in ${newPhone.slice(-4)}. All fields are filled.`, () => {
              setCurrentField('review');
              const reviewData = formDataRef.current;
              voiceGuide.speak(`Let me read your details. Name: ${reviewData.name}. Aadhaar number ending in ${reviewData.aadhaar.slice(-4)}. Mobile number ending in ${reviewData.phone.slice(-4)}. Say "send OTP" to proceed, or say "re-enter" to start over, or say a field name to edit it.`, () => {
                setIsProcessingVoice(false);
                voiceGuide.listenForInput(handleVoiceInput);
              });
            });
          } else {
            const remaining = 10 - newPhone.length;
            voiceGuide.speak(`${newPhone.length} digits entered. ${remaining} more digits needed.`, () => {
              setIsProcessingVoice(false);
              voiceGuide.listenForInput(handleVoiceInput);
            });
          }
        } else {
          voiceGuide.speak('No digits detected. Please say the digits of your mobile number.', () => {
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
        }
        break;

      case 'review':
        // Allow editing specific fields or re-entering all data
        if (lowerText.includes('re-enter') || lowerText.includes('restart') || lowerText.includes('start over')) {
          voiceGuide.speak('Starting over. Please say your full name.', () => {
            setCurrentField('name');
            setFormData({ name: '', aadhaar: '', phone: '' });
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
        } else if (lowerText.includes('name')) {
          voiceGuide.speak('Editing name. Please say your full name.', () => {
            setCurrentField('name');
            setFormData(prev => ({ ...prev, name: '' }));
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
        } else if (lowerText.includes('aadhaar')) {
          voiceGuide.speak('Editing Aadhaar. Please say your 12-digit Aadhaar number.', () => {
            setCurrentField('aadhaar');
            setFormData(prev => ({ ...prev, aadhaar: '' }));
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
        } else if (lowerText.includes('phone') || lowerText.includes('mobile')) {
          voiceGuide.speak('Editing mobile number. Please say your 10-digit mobile number.', () => {
            setCurrentField('phone');
            setFormData(prev => ({ ...prev, phone: '' }));
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
        } else {
          voiceGuide.speak('Say \"send OTP\" to proceed, \"re-enter\" to start over, or say a field name to edit it.', () => {
            setIsProcessingVoice(false);
            voiceGuide.listenForInput(handleVoiceInput);
          });
        }
        break;
    }
  }, [isVoiceMode, isProcessingVoice]);

  const voiceGuide = useVoiceGuide({
    page: 'registration',
    welcomeMessage: 'Welcome to voter registration. I will guide you through filling in your details. Say "ready" to begin, or say "cancel" to exit voice mode.',
    commands: {
      'ready': () => {
        setCurrentField('name');
        voiceGuide.speak('Please say your full name.', () => {
          voiceGuide.listenForInput(handleVoiceInput);
        });
      },
    },
    autoStart: true,
    onVoiceInput: handleVoiceInput,
  });

  const moveToNextField = () => {
    if (currentField === 'name') {
      setCurrentField('aadhaar');
      voiceGuide.speak('Moving to Aadhaar number. Please say your 12-digit Aadhaar number.', () => {
        voiceGuide.listenForInput(handleVoiceInput);
      });
    } else if (currentField === 'aadhaar') {
      setCurrentField('phone');
      voiceGuide.speak('Moving to mobile number. Please say your 10-digit mobile number.', () => {
        voiceGuide.listenForInput(handleVoiceInput);
      });
    } else if (currentField === 'phone') {
      setCurrentField('review');
      voiceGuide.speak('All fields completed. Say "submit" to proceed.', () => {
        voiceGuide.listenForInput(handleVoiceInput);
      });
    }
  };

  const handleVoiceSubmit = () => {
    const currentFormData = formDataRef.current; // Use ref for latest value
    
    console.log('🔍 handleVoiceSubmit called with data:', currentFormData);
    
    if (!currentFormData.name || !currentFormData.aadhaar || !currentFormData.phone) {
      console.log('❌ Missing fields detected');
      voiceGuide.speak('Some fields are still empty. Please complete all fields before submitting.', () => {
        // Go back to first empty field
        if (!currentFormData.name) {
          setCurrentField('name');
          voiceGuide.speak('Please say your full name.', () => {
            voiceGuide.listenForInput(handleVoiceInput);
          });
        } else if (!currentFormData.aadhaar || currentFormData.aadhaar.length !== 12) {
          setCurrentField('aadhaar');
          voiceGuide.speak('Please say your 12-digit Aadhaar number.', () => {
            voiceGuide.listenForInput(handleVoiceInput);
          });
        } else if (!currentFormData.phone || currentFormData.phone.length !== 10) {
          setCurrentField('phone');
          voiceGuide.speak('Please say your 10-digit mobile number.', () => {
            voiceGuide.listenForInput(handleVoiceInput);
          });
        }
      });
      return;
    }

    if (currentFormData.aadhaar.length !== 12) {
      console.log('❌ Aadhaar validation failed:', currentFormData.aadhaar.length);
      voiceGuide.speak('Aadhaar number must be exactly 12 digits. Please provide your complete 12-digit Aadhaar number.', () => {
        setCurrentField('aadhaar');
        setFormData(prev => ({ ...prev, aadhaar: '' }));
        voiceGuide.listenForInput(handleVoiceInput);
      });
      return;
    }

    if (currentFormData.phone.length !== 10) {
      console.log('❌ Phone validation failed:', currentFormData.phone.length);
      voiceGuide.speak('Mobile number must be exactly 10 digits. Please provide your complete 10-digit mobile number.', () => {
        setCurrentField('phone');
        setFormData(prev => ({ ...prev, phone: '' }));
        voiceGuide.listenForInput(handleVoiceInput);
      });
      return;
    }

    console.log('✅ All validations passed, showing confirmation');
    voiceGuide.confirmAction(
      `Please confirm your details. Name: ${currentFormData.name}. Aadhaar ending in ${currentFormData.aadhaar.slice(-4)}. Mobile ending in ${currentFormData.phone.slice(-4)}.`,
      () => {
        console.log('✅ Confirmed, navigating to OTP page');
        sessionStorage.setItem('registrationData', JSON.stringify(formDataRef.current));
        voiceGuide.speak('Registration validated. Sending OTP. Please wait.', () => {
          toast.success('Registration data validated');
          navigate('/verify-otp');
        });
      },
      () => {
        console.log('❌ User cancelled confirmation');
        setCurrentField('review');
        voiceGuide.speak('Registration cancelled. Say \"submit\" to try again, or say a field name to edit it.', () => {
          voiceGuide.listenForInput(handleVoiceInput);
        });
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.aadhaar || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    if (formData.aadhaar.length !== 12) {
      toast.error('Aadhaar number must be 12 digits');
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error('Mobile number must be 10 digits');
      return;
    }

    // Store registration data for later use
    sessionStorage.setItem('registrationData', JSON.stringify(formData));
    
    toast.success('Registration data validated');
    navigate('/verify-otp');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto space-y-6">
            {/* Voice Accessibility Notice */}
            <VoiceAccessibilityNotice compact />

            {/* Voice Mode Status Indicator */}
            {isVoiceMode && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-900">
                      Voice Mode Active - Current Field: <span className="uppercase">{currentField}</span>
                    </p>
                    {voiceGuide.isListening && (
                      <p className="text-xs text-green-700 mt-1">🎤 Listening...</p>
                    )}
                    {voiceGuide.isSpeaking && (
                      <p className="text-xs text-green-700 mt-1">🔊 Speaking...</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-[#002B5B]">{t.registerToVote}</CardTitle>
                <CardDescription>{t.landingSubtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-start gap-2">
                  <AlertCircle className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900">
                    {t.disclaimerText}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">{t.fullName}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t.fullNamePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`mt-1 ${isVoiceMode && currentField === 'name' ? 'ring-2 ring-green-500' : ''}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor="aadhaar">{t.aadhaarNumber} ({t.landingDescription})</Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder={t.aadhaarPlaceholder}
                      maxLength={12}
                      value={formData.aadhaar}
                      onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\\D/g, '') })}
                      className={`mt-1 ${isVoiceMode && currentField === 'aadhaar' ? 'ring-2 ring-green-500' : ''}`}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      12-digit number (any digits for demo) {formData.aadhaar.length > 0 && `- ${formData.aadhaar.length}/12`}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="mobile">{t.phoneNumber}</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder={t.phonePlaceholder}
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\\D/g, '') })}
                      className={`mt-1 ${isVoiceMode && currentField === 'phone' ? 'ring-2 ring-green-500' : ''}`}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.phone.length > 0 && `${formData.phone.length}/10`}
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-[#002B5B] hover:bg-[#003D7A]">
                    {t.registerNow}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}