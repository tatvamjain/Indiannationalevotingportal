import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
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
    toggleVoiceMode
  } = useVoiceAccessibility();
  
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

  // Speak welcome message when voice mode is activated
  useEffect(() => {
    if (isVoiceMode && config.welcomeMessage && !hasSpokenWelcome.current) {
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

    if (!isVoiceMode) {
      hasSpokenWelcome.current = false;
      setIsReady(false);
    }
  }, [isVoiceMode, config.page, config.welcomeMessage, config.autoStart]);

  const startListeningForCommand = useCallback(() => {
    if (!isVoiceMode || isListening || isSpeaking) return;

    startListening((result) => {
      handleVoiceCommand(result);
    });
  }, [isVoiceMode, isListening, isSpeaking, startListening]);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('🎤 Voice command received:', lowerCommand);

    // Global commands
    if (lowerCommand.includes('repeat') || lowerCommand.includes('again')) {
      if (config.welcomeMessage) {
        speak(config.welcomeMessage, () => {
          startListeningForCommand();
        });
      }
      return;
    }

    if (lowerCommand.includes('cancel') || lowerCommand.includes('exit')) {
      speak('Exiting voice mode.');
      setTimeout(() => {
        toggleVoiceMode();
      }, 1000);
      return;
    }

    if (lowerCommand.includes('back') || lowerCommand.includes('previous')) {
      speak('Going back.');
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
      speak('Sorry, I did not understand that command. Please try again.', () => {
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
    speak(`${message} Say confirm to proceed, or cancel to go back.`, () => {
      startListening((result) => {
        const lowerResult = result.toLowerCase();
        if (lowerResult.includes('confirm') || lowerResult.includes('yes')) {
          onConfirm();
        } else if (lowerResult.includes('cancel') || lowerResult.includes('no')) {
          if (onCancel) {
            onCancel();
          } else {
            speakAndListen('Action cancelled.');
          }
        } else {
          confirmAction(message, onConfirm, onCancel);
        }
      });
    });
  }, [speak, startListening, speakAndListen]);

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