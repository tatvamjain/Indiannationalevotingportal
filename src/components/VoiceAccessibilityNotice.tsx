import { Mic, AlertCircle } from 'lucide-react';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
import { Button } from './ui/button';

interface VoiceAccessibilityNoticeProps {
  compact?: boolean;
  className?: string;
}

export default function VoiceAccessibilityNotice({ compact = false, className = '' }: VoiceAccessibilityNoticeProps) {
  const { isVoiceMode, toggleVoiceMode } = useVoiceAccessibility();

  if (isVoiceMode) return null; // Don't show if voice mode is already active

  if (compact) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3 ${className}`}>
        <Mic className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-blue-900">
            <strong>Voice Accessibility:</strong> Enable voice guidance for visually impaired users.{' '}
            <button
              onClick={toggleVoiceMode}
              className="text-blue-700 underline hover:text-blue-800 font-semibold"
            >
              Enable Now
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
          <Mic className="size-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Voice Accessibility Mode Available
          </h3>
          <p className="text-blue-800 mb-4">
            This portal supports full voice guidance and voice commands for visually impaired users. 
            Complete the entire voting process hands-free with step-by-step voice instructions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={toggleVoiceMode}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Mic className="size-4 mr-2" />
              Enable Voice Mode
            </Button>
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <AlertCircle className="size-4" />
              <span>Demo feature - Local processing only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
