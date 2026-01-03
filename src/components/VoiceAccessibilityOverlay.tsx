import { useEffect, useRef } from 'react';
import { X, Volume2, Mic, AlertCircle } from 'lucide-react';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { cn } from './ui/utils';

export default function VoiceAccessibilityOverlay() {
  const { 
    isVoiceMode, 
    toggleVoiceMode, 
    isListening, 
    isSpeaking,
    transcriptHistory,
    currentStep 
  } = useVoiceAccessibility();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new transcript is added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcriptHistory]);

  if (!isVoiceMode) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none z-40" />

      {/* Main Overlay Panel */}
      <div className="fixed top-4 right-4 w-96 max-w-[calc(100vw-2rem)] z-50">
        <Card className="shadow-2xl border-2 border-green-500 bg-white">
          <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Volume2 className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Voice Accessibility Mode</CardTitle>
                </div>
                <p className="text-xs text-gray-600">
                  Demo feature for visually impaired users
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleVoiceMode}
                className="h-8 w-8 -mt-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Status Indicators */}
            <div className="flex gap-2 mt-3">
              <Badge 
                variant={isSpeaking ? "default" : "outline"}
                className={cn(
                  "text-xs",
                  isSpeaking && "bg-blue-500 animate-pulse"
                )}
              >
                <Volume2 className="h-3 w-3 mr-1" />
                {isSpeaking ? 'Speaking...' : 'Ready'}
              </Badge>
              <Badge 
                variant={isListening ? "default" : "outline"}
                className={cn(
                  "text-xs",
                  isListening && "bg-red-500 animate-pulse"
                )}
              >
                <Mic className="h-3 w-3 mr-1" />
                {isListening ? 'Listening...' : 'Idle'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Current Step */}
            <div className="px-4 py-2 bg-gray-50 border-b">
              <p className="text-xs font-medium text-gray-700">
                Current Step: <span className="text-[#002B5B] capitalize">{currentStep.replace(/-/g, ' ')}</span>
              </p>
            </div>

            {/* Transcript History */}
            <div className="p-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-700">Live Transcript</h4>
              <ScrollArea className="h-64 rounded-md border bg-gray-50">
                <div className="p-3 space-y-3" ref={scrollRef}>
                  {transcriptHistory.length === 0 ? (
                    <p className="text-xs text-gray-500 italic text-center py-8">
                      Transcript will appear here...
                    </p>
                  ) : (
                    transcriptHistory.map((entry, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-2 rounded-lg text-sm",
                          entry.type === 'system' 
                            ? "bg-blue-100 text-blue-900 border border-blue-200" 
                            : "bg-green-100 text-green-900 border border-green-200"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {entry.type === 'system' ? (
                            <Volume2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Mic className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium mb-0.5">
                              {entry.type === 'system' ? 'System' : 'You'}
                            </p>
                            <p className="text-sm break-words">{entry.text}</p>
                            <p className="text-xs opacity-60 mt-1">
                              {entry.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Voice Commands Reference */}
            <div className="px-4 pb-4">
              <details className="text-xs">
                <summary className="font-semibold text-gray-700 cursor-pointer hover:text-[#002B5B]">
                  Voice Commands
                </summary>
                <div className="mt-2 space-y-1 text-gray-600 pl-4">
                  <p>• "Start Voting" - Begin the voting process</p>
                  <p>• "Repeat" - Repeat the current instruction</p>
                  <p>• "Back" - Go to previous step</p>
                  <p>• "Select" - Choose highlighted option</p>
                  <p>• "Confirm" - Confirm your action</p>
                  <p>• "Change" - Change your selection</p>
                  <p>• "Cancel" - Exit voice mode</p>
                </div>
              </details>
            </div>

            {/* Disclaimer */}
            <div className="px-4 pb-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900">
                  <strong>Demo Mode:</strong> No audio is transmitted to external services. 
                  Voice processing uses your browser's built-in capabilities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listening Pulse Indicator */}
      {isListening && (
        <div className="fixed inset-0 pointer-events-none z-45 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping" style={{ width: '200px', height: '200px' }}></div>
            <div className="relative bg-red-500 rounded-full opacity-40" style={{ width: '200px', height: '200px' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Mic className="h-20 w-20 text-white" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
