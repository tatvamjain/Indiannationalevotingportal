import { useEffect, useRef } from 'react';
import { Globe, Languages } from 'lucide-react';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
import { useLanguage } from '../utils/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function VoiceLanguageSelector() {
  const { 
    isVoiceMode, 
    isLanguageSelectionMode,
    setIsLanguageSelectionMode,
    voiceLanguage,
    setVoiceLanguage,
    speak,
    startListening,
    isListening,
    isSpeaking,
  } = useVoiceAccessibility();
  
  const { setLanguage } = useLanguage();
  const hasSpokenPromptRef = useRef(false);

  useEffect(() => {
    if (isVoiceMode && isLanguageSelectionMode && !hasSpokenPromptRef.current) {
      // Ask for language preference when voice mode is activated
      const promptTimer = setTimeout(() => {
        const englishPrompt = 'Welcome to voice mode. What language do you prefer? Say Hindi language for Hindi, or English language for English.';
        const hindiPrompt = 'वॉइस मोड में आपका स्वागत है। आप किस भाषा को पसंद करते हैं? हिंदी के लिए हिंदी भाषा कहें, या अंग्रेजी के लिए इंग्लिश लैंग्वेज कहें।';
        
        // Speak in English first, then Hindi
        speak(englishPrompt, () => {
          // Small pause between languages
          setTimeout(() => {
            speak(hindiPrompt, () => {
              // Start listening for language selection
              startListening(handleLanguageSelection);
            });
          }, 500);
        });
        
        hasSpokenPromptRef.current = true;
      }, 500);

      return () => clearTimeout(promptTimer);
    }

    if (!isVoiceMode || !isLanguageSelectionMode) {
      hasSpokenPromptRef.current = false;
    }
  }, [isVoiceMode, isLanguageSelectionMode]);

  const handleLanguageSelection = (result: string) => {
    const lowerResult = result.toLowerCase();
    console.log('🌐 Language selection received:', result);

    if (lowerResult.includes('hindi') || lowerResult.includes('हिंदी')) {
      selectLanguage('hi');
    } else if (lowerResult.includes('english') || lowerResult.includes('अंग्रेजी') || lowerResult.includes('इंग्लिश')) {
      selectLanguage('en');
    } else {
      // Try again if not understood - provide message in both languages
      const retryEnglish = 'I did not understand. Please say Hindi language or English language.';
      const retryHindi = 'मैं समझ नहीं पाया। कृपया हिंदी भाषा या इंग्लिश लैंग्वेज कहें।';
      
      speak(retryEnglish, () => {
        setTimeout(() => {
          speak(retryHindi, () => {
            startListening(handleLanguageSelection);
          });
        }, 500);
      });
    }
  };

  const selectLanguage = (lang: string) => {
    // Update voice language
    setVoiceLanguage(lang);
    // Update UI language
    setLanguage(lang);
    
    // Confirm selection in the chosen language
    const confirmMessage = lang === 'hi' 
      ? 'हिंदी भाषा चयनित। आगे बढ़ रहे हैं।'
      : 'English language selected. Proceeding.';
    
    speak(confirmMessage, () => {
      // Exit language selection mode
      setIsLanguageSelectionMode(false);
    });
  };

  const handleManualSelection = (lang: string) => {
    selectLanguage(lang);
  };

  if (!isVoiceMode || !isLanguageSelectionMode) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-4 border-green-500 bg-white">
        <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-blue-50 border-b-2 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500 p-2 rounded-full">
              <Languages className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Language Selection</CardTitle>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            भाषा चयन / Choose your preferred language for voice guidance
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {/* Status */}
          {(isListening || isSpeaking) && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Badge 
                variant="default"
                className={`${isSpeaking ? 'bg-blue-500' : 'bg-red-500'} animate-pulse`}
              >
                {isSpeaking ? 'Speaking...' : 'Listening...'}
              </Badge>
            </div>
          )}

          {/* Instructions */}
          <div className="mb-6 space-y-2">
            <h3 className="font-semibold text-gray-800">Voice Commands:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Say <strong>"Hindi language"</strong> or <strong>"हिंदी भाषा"</strong> for Hindi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Say <strong>"English language"</strong> or <strong>"अंग्रेजी भाषा"</strong> for English</span>
              </li>
            </ul>
          </div>

          {/* Manual Selection Buttons */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 text-center mb-3">Or click to select:</p>
            
            <Button
              onClick={() => handleManualSelection('en')}
              size="lg"
              className="w-full bg-[#002B5B] hover:bg-[#003875] text-white py-6 text-lg font-semibold"
            >
              <Globe className="h-5 w-5 mr-2" />
              English
            </Button>
            
            <Button
              onClick={() => handleManualSelection('hi')}
              size="lg"
              className="w-full bg-[#FF9933] hover:bg-[#E88A2E] text-white py-6 text-lg font-semibold"
            >
              <Globe className="h-5 w-5 mr-2" />
              हिंदी (Hindi)
            </Button>
          </div>

          {/* Current Selection */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600 mb-1">Current Language:</p>
            <p className="font-semibold text-[#002B5B]">
              {voiceLanguage === 'hi' ? 'हिंदी (Hindi)' : 'English'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}