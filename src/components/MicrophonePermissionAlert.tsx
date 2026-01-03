import { AlertCircle, Mic } from 'lucide-react';
import { Button } from './ui/button';

interface MicrophonePermissionAlertProps {
  onDismiss?: () => void;
}

export default function MicrophonePermissionAlert({ onDismiss }: MicrophonePermissionAlertProps) {
  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Permission granted, stop the stream
      stream.getTracks().forEach(track => track.stop());
      if (onDismiss) onDismiss();
    } catch (error) {
      console.error('Microphone permission error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <Mic className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Microphone Permission Required
            </h3>
            <p className="text-sm text-gray-600">
              Voice Accessibility Mode needs access to your microphone to recognize voice commands. 
              Your audio is processed locally in your browser and is never transmitted to external servers.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900">
            <strong>Privacy:</strong> All voice processing happens in your browser. 
            No audio is recorded or sent to any server.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={requestPermission}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Mic className="h-4 w-4 mr-2" />
            Grant Microphone Access
          </Button>
          {onDismiss && (
            <Button
              onClick={onDismiss}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center">
          You can also enable microphone access in your browser settings
        </p>
      </div>
    </div>
  );
}
