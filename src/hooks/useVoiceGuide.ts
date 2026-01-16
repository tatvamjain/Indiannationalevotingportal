import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
import { useLanguage } from '../utils/i18n/LanguageContext';
import { getVoiceMessage } from '../utils/voiceTranslations';
import { toast } from 'sonner@2.0.3';

export interface VoiceGuideConfig {
  page: string;
  welcomeMessage?: string;
  commands?: {
    [key: string]: () => void;
  };
  autoStart?: boolean;
  onVoiceInput?: (input: string) => void;
}

export const useVoiceGuide = (config: VoiceGuideConfig) => {
  const { 
    isVoiceMode, 
    speak, 
    startListening, 
    stopListening, 
    isListening,
    isSpeaking,
    setCurrentStep,
    toggleVoiceMode,
    voiceLanguage,
    isLanguageSelectionMode,
  } = useVoiceAccessibility();
  
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  const hasSpokenWelcome = useRef(false);
  const currentCommandsRef = useRef(config.commands || {});
  const onVoiceInputRef = useRef(config.onVoiceInput);

  // Update refs when config changes
  useEffect(() => {
    currentCommandsRef.current = config.commands || {};
    onVoiceInputRef.current = config.onVoiceInput;
  }, [config.commands, config.onVoiceInput]);

  // Speak welcome message when voice mode is activated and language is selected
  useEffect(() => {
    if (isVoiceMode && !isLanguageSelectionMode && config.welcomeMessage && !hasSpokenWelcome.current) {
      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        setCurrentStep(config.page);
        speak(config.welcomeMessage!, () => {
          setIsReady(true);
          if (config.autoStart) {
            startListeningForCommand();
          }
        });
        hasSpokenWelcome.current = true;
      }, 500);

      return () => clearTimeout(timer);
    }

    if (!isVoiceMode || isLanguageSelectionMode) {
      hasSpokenWelcome.current = false;
      setIsReady(false);
    }
  }, [isVoiceMode, isLanguageSelectionMode, config.page, config.welcomeMessage, config.autoStart]);

  const startListeningForCommand = useCallback(() => {
    if (!isVoiceMode || isListening || isSpeaking || isLanguageSelectionMode) return;

    startListening((result) => {
      handleVoiceCommand(result);
    });
  }, [isVoiceMode, isListening, isSpeaking, isLanguageSelectionMode, startListening]);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('🎤 Voice command received:', lowerCommand);

    // Global commands with language support
    if (lowerCommand.includes('repeat') || lowerCommand.includes('again') || lowerCommand.includes('दोहराएं') || lowerCommand.includes('फिर से')) {
      if (config.welcomeMessage) {
        speak(config.welcomeMessage, () => {
          startListeningForCommand();
        });
      }
      return;
    }

    if (lowerCommand.includes('cancel') || lowerCommand.includes('exit') || lowerCommand.includes('रद्द') || lowerCommand.includes('बाहर')) {
      const exitMessage = getVoiceMessage('exitingVoiceMode', voiceLanguage);
      speak(exitMessage);
      setTimeout(() => {
        toggleVoiceMode();
      }, 1000);
      return;
    }

    if (lowerCommand.includes('back') || lowerCommand.includes('previous') || lowerCommand.includes('वापस') || lowerCommand.includes('पिछला')) {
      const backMessage = getVoiceMessage('goingBack', voiceLanguage);
      speak(backMessage);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
      return;
    }

    // Page-specific commands - check these BEFORE onVoiceInput
    const commands = currentCommandsRef.current;
    let commandExecuted = false;

    for (const [keyword, action] of Object.entries(commands)) {
      if (lowerCommand.includes(keyword.toLowerCase())) {
        action();
        commandExecuted = true;
        break;
      }
    }

    // If a command was executed, don't pass to onVoiceInput
    if (commandExecuted) {
      return;
    }

    // If there's a voice input handler, pass the input to it
    if (onVoiceInputRef.current) {
      onVoiceInputRef.current(command);
      return;
    }

    if (!commandExecuted) {
      const notUnderstoodMessage = getVoiceMessage('commandNotUnderstood', voiceLanguage);
      speak(notUnderstoodMessage, () => {
        startListeningForCommand();
      });
    }
  };

  const speakAndListen = useCallback((message: string, onComplete?: () => void) => {
    speak(message, () => {
      if (onComplete) {
        onComplete();
      } else {
        startListeningForCommand();
      }
    });
  }, [speak, startListeningForCommand]);

  const confirmAction = useCallback((message: string, onConfirm: () => void, onCancel?: () => void) => {
    const confirmPrompt = voiceLanguage === 'hi' 
      ? `${message} आगे बढ़ने के लिए पुष्टि करें कहें, या वापस जाने के लिए रद्द करें कहें।`
      : `${message} Say confirm to proceed, or cancel to go back.`;
    
    speak(confirmPrompt, () => {
      startListening((result) => {
        const lowerResult = result.toLowerCase();
        // Check both English and Hindi commands
        if (lowerResult.includes('confirm') || lowerResult.includes('yes') || 
            lowerResult.includes('पुष्टि') || lowerResult.includes('हां')) {
          onConfirm();
        } else if (lowerResult.includes('cancel') || lowerResult.includes('no') || 
                   lowerResult.includes('रद्द') || lowerResult.includes('नहीं')) {
          if (onCancel) {
            onCancel();
          } else {
            const cancelledMessage = voiceLanguage === 'hi' ? 'कार्रवाई रद्द की गई।' : 'Action cancelled.';
            speakAndListen(cancelledMessage);
          }
        } else {
          confirmAction(message, onConfirm, onCancel);
        }
      });
    });
  }, [speak, startListening, speakAndListen, voiceLanguage]);

  const listenForInput = useCallback((onResult: (text: string) => void) => {
    if (!isVoiceMode) return;
    startListening(onResult);
  }, [isVoiceMode, startListening]);

  return {
    isVoiceMode,
    isReady,
    isListening,
    isSpeaking,
    speak: speakAndListen,
    startListening: startListeningForCommand,
    listenForInput,
    confirmAction,
    handleVoiceCommand,
  };
};