import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

interface VoiceAccessibilityContextType {
  isVoiceMode: boolean;
  toggleVoiceMode: () => void;
  speak: (text: string, onEnd?: () => void) => void;
  stopSpeaking: () => void;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  startListening: (onResult: (text: string) => void) => void;
  stopListening: () => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  addTranscript: (text: string, type: 'system' | 'user') => void;
  transcriptHistory: Array<{ text: string; type: 'system' | 'user'; timestamp: Date }>;
}

const VoiceAccessibilityContext = createContext<VoiceAccessibilityContextType | undefined>(undefined);

export const useVoiceAccessibility = () => {
  const context = useContext(VoiceAccessibilityContext);
  if (!context) {
    throw new Error('useVoiceAccessibility must be used within VoiceAccessibilityProvider');
  }
  return context;
};

export const VoiceAccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [transcriptHistory, setTranscriptHistory] = useState<Array<{ text: string; type: 'system' | 'user'; timestamp: Date }>>([]);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const onResultCallbackRef = useRef<((text: string) => void) | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      stopSpeaking();
      stopListening();
    };
  }, []);

  const speak = (text: string, onEnd?: () => void) => {
    if (!synthRef.current) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.85; // Slower for accessibility
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      addTranscript(text, 'system');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    };

    currentUtteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    }
  };

  const startListening = (onResult: (text: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error('Voice recognition not supported in this browser');
      return;
    }

    // Store callback
    onResultCallbackRef.current = onResult;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      addTranscript(result, 'user');
      
      if (onResultCallbackRef.current) {
        onResultCallbackRef.current(result);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        toast.error('Microphone permission denied. Please enable microphone access in your browser settings to use voice mode.');
      } else if (event.error === 'no-speech') {
        console.log('No speech detected, waiting...');
        // Don't show error for no-speech, it's normal
      } else if (event.error === 'network') {
        toast.error('Network error. Voice recognition may not be available.');
      } else {
        console.warn('Voice recognition error:', event.error);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start voice recognition:', error);
      setIsListening(false);
      toast.error('Failed to start voice recognition. Please check browser permissions.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleVoiceMode = () => {
    const newMode = !isVoiceMode;
    setIsVoiceMode(newMode);
    
    if (newMode) {
      setTranscriptHistory([]);
      setCurrentStep('welcome');
      toast.success('Voice Accessibility Mode Enabled');
      // Welcome message will be triggered by the page component
    } else {
      stopSpeaking();
      stopListening();
      setTranscriptHistory([]);
      toast.info('Voice Accessibility Mode Disabled');
    }
  };

  const addTranscript = (text: string, type: 'system' | 'user') => {
    setTranscriptHistory(prev => [...prev, { text, type, timestamp: new Date() }]);
  };

  return (
    <VoiceAccessibilityContext.Provider
      value={{
        isVoiceMode,
        toggleVoiceMode,
        speak,
        stopSpeaking,
        isListening,
        isSpeaking,
        transcript,
        startListening,
        stopListening,
        currentStep,
        setCurrentStep,
        addTranscript,
        transcriptHistory,
      }}
    >
      {children}
    </VoiceAccessibilityContext.Provider>
  );
};