import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import React from 'react';

export default function VoiceAccessibilityButton() {
  const { isVoiceMode, toggleVoiceMode, isListening, isSpeaking } = useVoiceAccessibility();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleVoiceMode}
              size="lg"
              className={cn(
                "h-16 w-16 rounded-full shadow-2xl transition-all duration-300",
                isVoiceMode 
                  ? "bg-green-600 hover:bg-green-700 ring-4 ring-green-300" 
                  : "bg-[#002B5B] hover:bg-[#003875]",
                (isListening || isSpeaking) && "animate-pulse scale-110"
              )}
              aria-label={isVoiceMode ? "Disable Voice Accessibility Mode" : "Enable Voice Accessibility Mode"}
            >
              {isSpeaking ? (
                <Volume2 className="h-8 w-8 text-white" />
              ) : isListening ? (
                <Mic className="h-8 w-8 text-white animate-pulse" />
              ) : isVoiceMode ? (
                <MicOff className="h-8 w-8 text-white" />
              ) : (
                <Mic className="h-8 w-8 text-white" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-semibold">
                {isVoiceMode ? 'Voice Mode Active' : 'Voice Mode (Accessibility)'}
              </p>
              <p className="text-xs opacity-90">
                {isVoiceMode 
                  ? 'Click to disable voice guidance' 
                  : 'Enable voice guidance for visually impaired users'}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Status Indicator */}
      {isVoiceMode && (
        <div className="absolute -top-2 -right-2">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>
        </div>
      )}

      {/* Accessibility Label */}
      {!isVoiceMode && (
        <div className="mt-2 text-center">
          <p className="text-xs font-medium text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm">
            Voice Mode
          </p>
        </div>
      )}
    </div>
  );
}