import { Video, VideoOff, Phone, Mic, MicOff, Monitor, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoCallDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  callerName: string;
  callerAvatar: string;
  isIncoming: boolean; // true if receiving call, false if calling
  callStatus: 'calling' | 'ringing' | 'connected' | 'ended';
}

export function VideoCallDialog({
  isOpen,
  onClose,
  onAccept,
  onDecline,
  callerName,
  callerAvatar,
  isIncoming,
  callStatus,
}: VideoCallDialogProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
      
      // Start timer when connected
      if (callStatus === 'connected') {
        const interval = setInterval(() => {
          setElapsedTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    } else {
      setIsVisible(false);
      setElapsedTime(0);
    }
  }, [isOpen, callStatus]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={callStatus === 'connected' ? undefined : onDecline}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video Preview Area */}
          <div className="relative h-96 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-t-2xl overflow-hidden">
            {callStatus === 'connected' ? (
              <>
                {/* Simulated Video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl animate-pulse">{callerAvatar}</div>
                </div>
                
                {/* Small self-view in corner */}
                <div className="absolute bottom-4 right-4 w-24 h-32 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>

                {/* Call timer */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-white text-sm font-medium">{formatTime(elapsedTime)}</span>
                </div>
              </>
            ) : (
              <>
                {/* Caller Avatar */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-9xl mb-4 animate-pulse">{callerAvatar}</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{callerName}</h3>
                  <p className="text-gray-300">
                    {isIncoming ? (
                      callStatus === 'ringing' ? 'Incoming video call...' : 'Calling...'
                    ) : (
                      callStatus === 'calling' ? 'Calling...' : 'Ringing...'
                    )}
                  </p>
                </div>

                {/* Ringing animation */}
                {callStatus === 'ringing' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 border-4 border-purple-500 rounded-full animate-ping opacity-20" />
                    <div className="absolute w-48 h-48 border-4 border-pink-500 rounded-full animate-ping opacity-30 animation-delay-200" />
                    <div className="absolute w-32 h-32 border-4 border-purple-400 rounded-full animate-ping opacity-40 animation-delay-400" />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Controls */}
          <div className="p-6">
            {callStatus === 'connected' ? (
              <div className="flex items-center justify-center gap-4">
                {/* Mute button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isMuted
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Video toggle */}
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isVideoOff
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title={isVideoOff ? 'Turn on video' : 'Turn off video'}
                >
                  {isVideoOff ? (
                    <VideoOff className="w-6 h-6 text-white" />
                  ) : (
                    <Video className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* End call button */}
                <button
                  onClick={() => {
                    onDecline();
                    onClose();
                  }}
                  className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all transform hover:scale-110"
                  title="End call"
                >
                  <Phone className="w-6 h-6 text-white rotate-[135deg]" />
                </button>

                {/* Screen share (optional) */}
                <button
                  className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all"
                  title="Share screen"
                >
                  <Monitor className="w-6 h-6 text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                {isIncoming ? (
                  <>
                    {/* Decline button */}
                    <button
                      onClick={onDecline}
                      className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                    >
                      <Phone className="w-7 h-7 text-white rotate-[135deg]" />
                    </button>

                    {/* Accept button */}
                    <button
                      onClick={onAccept}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg animate-pulse"
                    >
                      <Phone className="w-7 h-7 text-white" />
                    </button>
                  </>
                ) : (
                  <>
                    {/* Cancel call button */}
                    <button
                      onClick={onDecline}
                      className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                    >
                      <Phone className="w-7 h-7 text-white rotate-[135deg]" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </>
  );
}
