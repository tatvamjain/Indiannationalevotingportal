import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Info, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { useLanguage } from '../utils/i18n/LanguageContext';

interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
  description: string;
}

interface VoiceVotingInterfaceProps {
  candidates: Candidate[];
  selectedCandidate: string;
  onSelectCandidate: (candidateId: string) => void;
  electionName: string;
}

export default function VoiceVotingInterface({
  candidates,
  selectedCandidate,
  onSelectCandidate,
  electionName
}: VoiceVotingInterfaceProps) {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [browserSupported, setBrowserSupported] = useState(true);
  const [currentStep, setCurrentStep] = useState<'intro' | 'listening' | 'confirmation'>('intro');
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Language code mapping for speech recognition
  const languageCodes: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    bn: 'bn-IN'
  };

  // Voice commands for different languages
  const voiceCommands: Record<string, { 
    start: string[];
    help: string[];
    repeat: string[];
    cancel: string[];
    confirm: string[];
    numbers: string[];
  }> = {
    en: {
      start: ['start', 'begin', 'begin voting', 'start voting'],
      help: ['help', 'instructions', 'how to vote'],
      repeat: ['repeat', 'say again', 'again'],
      cancel: ['cancel', 'stop', 'exit'],
      confirm: ['confirm', 'yes', 'confirm vote', 'cast vote'],
      numbers: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
    },
    hi: {
      start: ['शुरू', 'शुरू करें', 'मतदान शुरू'],
      help: ['मदद', 'निर्देश', 'कैसे वोट करें'],
      repeat: ['दोहराएं', 'फिर से कहें'],
      cancel: ['रद्द करें', 'बंद करें'],
      confirm: ['पुष्टि करें', 'हाँ', 'वोट डालें'],
      numbers: ['एक', 'दो', 'तीन', 'चार', 'पांच', 'छह', 'सात', 'आठ', 'नौ', 'दस']
    },
    ta: {
      start: ['தொடங்கு', 'ஆரம்பி', 'வாக்களிப்பு தொடங்கு'],
      help: ['உதவி', 'வழிமுறைகள்'],
      repeat: ['மீண்டும் சொல்லுங்கள்', 'மீண்டும்'],
      cancel: ['ரத்து செய்', 'நிறுத்து'],
      confirm: ['உறுதிப்படுத்து', 'ஆம்', 'வாக்களி'],
      numbers: ['ஒன்று', 'இரண்டு', 'மூன்று', 'நான்கு', 'ஐந்து', 'ஆறு', 'ஏழு', 'எட்டு', 'ஒன்பது', 'பத்து']
    },
    te: {
      start: ['ప్రారంభించు', 'ప్రారంభం', 'ఓటింగ్ ప్రారంభించు'],
      help: ['సహాయం', 'సూచనలు'],
      repeat: ['మళ్ళీ చెప్పండి', 'మళ్ళీ'],
      cancel: ['రద్దు చేయి', 'ఆపు'],
      confirm: ['నిర్ధారించు', 'అవును', 'ఓటు వేయి'],
      numbers: ['ఒకటి', 'రెండు', 'మూడు', 'నాలుగు', 'ఐదు', 'ఆరు', 'ఏడు', 'ఎనిమిది', 'తొమ్మిది', 'పది']
    },
    bn: {
      start: ['শুরু', 'শুরু করুন', 'ভোটদান শুরু'],
      help: ['সাহায্য', 'নির্দেশাবলী'],
      repeat: ['আবার বলুন', 'পুনরাবৃত্তি'],
      cancel: ['বাতিল', 'বন্ধ করুন'],
      confirm: ['নিশ্চিত করুন', 'হ্যাঁ', 'ভোট দিন'],
      numbers: ['এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ']
    }
  };

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (!SpeechRecognition || !speechSynthesis) {
      setBrowserSupported(false);
      return;
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = languageCodes[language] || 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(transcript);
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        speak(t.voiceNoSpeechDetected);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  const speak = (text: string, onEnd?: () => void) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCodes[language] || 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    synthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = (transcript: string) => {
    const commands = voiceCommands[language];
    const lowerTranscript = transcript.toLowerCase();

    console.log('Voice command received:', transcript);

    // Check for help command
    if (commands.help.some(cmd => lowerTranscript.includes(cmd))) {
      readInstructions();
      return;
    }

    // Check for cancel command
    if (commands.cancel.some(cmd => lowerTranscript.includes(cmd))) {
      speak(t.voiceVotingCancelled);
      setCurrentStep('intro');
      return;
    }

    // Check for repeat command
    if (commands.repeat.some(cmd => lowerTranscript.includes(cmd))) {
      if (currentStep === 'intro') {
        startVoiceVoting();
      } else if (currentStep === 'confirmation' && selectedCandidate) {
        readConfirmation();
      }
      return;
    }

    // Check for start command when in intro
    if (currentStep === 'intro' && commands.start.some(cmd => lowerTranscript.includes(cmd))) {
      readCandidateList();
      return;
    }

    // Check for confirmation
    if (currentStep === 'confirmation' && commands.confirm.some(cmd => lowerTranscript.includes(cmd))) {
      speak(t.voiceVoteConfirmed);
      return;
    }

    // Check for candidate selection by number
    for (let i = 0; i < commands.numbers.length && i < candidates.length; i++) {
      if (lowerTranscript.includes(commands.numbers[i]) || lowerTranscript.includes(String(i + 1))) {
        selectCandidateByVoice(i);
        return;
      }
    }

    // Check for candidate selection by name
    candidates.forEach((candidate, index) => {
      const candidateName = candidate.name.toLowerCase();
      const partyName = candidate.party.toLowerCase();
      
      if (lowerTranscript.includes(candidateName) || lowerTranscript.includes(partyName)) {
        selectCandidateByVoice(index);
      }
    });
  };

  const selectCandidateByVoice = (index: number) => {
    if (index >= 0 && index < candidates.length) {
      const candidate = candidates[index];
      onSelectCandidate(candidate.id);
      
      const message = t.voiceSelectedCandidate
        .replace('{name}', candidate.name)
        .replace('{party}', candidate.party);
      
      speak(message, () => {
        setCurrentStep('confirmation');
        setTimeout(() => readConfirmation(), 500);
      });
    }
  };

  const readConfirmation = () => {
    if (selectedCandidate) {
      const candidate = candidates.find(c => c.id === selectedCandidate);
      if (candidate) {
        const message = t.voiceConfirmSelection
          .replace('{name}', candidate.name)
          .replace('{party}', candidate.party);
        speak(message);
      }
    }
  };

  const readCandidateList = () => {
    setCurrentStep('listening');
    
    let message = t.voiceCandidateListIntro;
    candidates.forEach((candidate, index) => {
      const numberText = voiceCommands[language].numbers[index] || String(index + 1);
      message += ` ${numberText}, ${candidate.name}, ${candidate.party}.`;
    });
    message += ` ${t.voiceSelectInstructions}`;
    
    speak(message, () => {
      // Start listening after reading the list
      setTimeout(() => startListening(), 500);
    });
  };

  const readInstructions = () => {
    speak(t.voiceInstructions);
  };

  const startVoiceVoting = () => {
    if (!browserSupported) {
      alert(t.voiceBrowserNotSupported);
      return;
    }
    
    setVoiceEnabled(true);
    setCurrentStep('intro');
    
    const welcomeMessage = t.voiceWelcomeMessage.replace('{election}', electionName);
    speak(welcomeMessage, () => {
      setTimeout(() => readCandidateList(), 1000);
    });
  };

  const stopVoiceVoting = () => {
    setVoiceEnabled(false);
    setCurrentStep('intro');
    setIsListening(false);
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!browserSupported) {
    return (
      <Alert className="mb-6">
        <Info className="size-4" />
        <AlertDescription>
          {t.voiceBrowserNotSupported}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mb-6 border-2 border-purple-500">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Volume2 className="size-5 text-purple-600" />
            <h3 className="text-[#002B5B]">{t.voiceVotingTitle}</h3>
          </div>
          {voiceEnabled && (
            <Badge variant={isListening ? "default" : "secondary"} className={isListening ? "bg-red-500" : ""}>
              {isListening ? t.voiceListening : currentStep === 'confirmation' ? t.voiceConfirming : t.voiceActive}
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4">{t.voiceVotingDescription}</p>

        {!voiceEnabled ? (
          <div className="space-y-3">
            <Alert>
              <Info className="size-4" />
              <AlertDescription className="text-sm">
                {t.voiceInstructionsSummary}
              </AlertDescription>
            </Alert>
            
            <Button
              onClick={startVoiceVoting}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Mic className="size-4 mr-2" />
              {t.voiceStartVoting}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {transcript && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t.voiceYouSaid}:</p>
                <p className="text-sm text-[#002B5B]">"{transcript}"</p>
              </div>
            )}

            {selectedCandidate && currentStep === 'confirmation' && (
              <div className="bg-green-50 border-2 border-green-500 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <p className="text-sm text-green-800">{t.voiceSelected}:</p>
                </div>
                <p className="text-[#002B5B]">
                  {candidates.find(c => c.id === selectedCandidate)?.name}
                </p>
                <p className="text-sm text-gray-600">
                  {candidates.find(c => c.id === selectedCandidate)?.party}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={isListening ? stopListening : startListening}
                variant={isListening ? "destructive" : "default"}
                className="w-full"
              >
                {isListening ? <MicOff className="size-4 mr-2" /> : <Mic className="size-4 mr-2" />}
                {isListening ? t.voiceStopListening : t.voiceStartListening}
              </Button>

              <Button
                onClick={toggleMute}
                variant="outline"
                className="w-full"
                disabled={!isSpeaking}
              >
                {isSpeaking ? <VolumeX className="size-4 mr-2" /> : <Volume2 className="size-4 mr-2" />}
                {t.voiceMute}
              </Button>

              <Button
                onClick={readInstructions}
                variant="outline"
                className="w-full"
              >
                <Info className="size-4 mr-2" />
                {t.voiceHelp}
              </Button>

              <Button
                onClick={stopVoiceVoting}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                {t.voiceStopVoting}
              </Button>
            </div>

            <div className="text-xs text-gray-500 space-y-1 mt-4">
              <p>• {t.voiceTip1}</p>
              <p>• {t.voiceTip2}</p>
              <p>• {t.voiceTip3}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
