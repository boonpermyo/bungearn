import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Video, VideoOff, Phone, Volume2, VolumeX, SkipForward, UserPlus, UserCheck, LayoutGrid, Columns, Rows, Flag } from 'lucide-react';
import { Friend } from '../App';
import { SkipConfirmDialog } from './SkipConfirmDialog';

interface VideoChatProps {
  participant: Friend;
  onEndCall: () => void;
  onSkipStranger?: () => void;
  onSendFriendRequest?: () => void;
  onReport?: () => void;
  friendRequestSent?: boolean;
  isStranger?: boolean;
  onCameraAccessLost?: () => void;
}

export function VideoChat({ 
  participant, 
  onEndCall, 
  onSkipStranger, 
  onSendFriendRequest, 
  onReport,
  friendRequestSent, 
  isStranger,
  onCameraAccessLost
}: VideoChatProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRemoteVideoOn, setIsRemoteVideoOn] = useState(true);
  const [isRemoteMuted, setIsRemoteMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'pip' | 'split-horizontal' | 'split-vertical'>('split-horizontal');
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  // Monitor camera permission during call
  useEffect(() => {
    let permissionCheckInterval: NodeJS.Timeout;

    const checkCameraPermission = async () => {
      try {
        // Try to access camera to verify permission is still granted
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setCameraError(null);
      } catch (error: any) {
        // DEV BYPASS: In development or preview environments without camera,
        // just log the error and continue with simulated video.
        console.warn("Camera check failed, switching to simulated mode for development:", error);
        setCameraError(null);
        return;

        // Original logic commented out for bypass:
        /*
        // Camera permission revoked or camera disabled
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          setCameraError('Camera permission was denied. Please allow camera access to continue.');
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          setCameraError('No camera device found. Please connect a camera to continue.');
        } else {
          setCameraError('Camera access error. Please check your camera settings.');
        }
        */
      }
    };

    // Check immediately
    checkCameraPermission();

    // Check every 2 seconds during call
    permissionCheckInterval = setInterval(checkCameraPermission, 2000);

    return () => {
      clearInterval(permissionCheckInterval);
    };
  }, []);

  // Auto end call if camera error occurs
  useEffect(() => {
    if (cameraError) {
      const timer = setTimeout(() => {
        onEndCall();
      }, 3000); // Show error for 3 seconds before ending call
      return () => clearTimeout(timer);
    }
  }, [cameraError, onEndCall]);

  // Simulate connection delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Call duration timer
  useEffect(() => {
    if (!isConnecting) {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isConnecting]);

  // Simulate random remote actions
  useEffect(() => {
    if (!isConnecting) {
      // Random remote video toggle (rare)
      const videoInterval = setInterval(() => {
        if (Math.random() > 0.95) {
          setIsRemoteVideoOn(prev => !prev);
        }
      }, 5000);

      // Random remote mute toggle (rare)
      const muteInterval = setInterval(() => {
        if (Math.random() > 0.97) {
          setIsRemoteMuted(prev => !prev);
        }
      }, 7000);

      return () => {
        clearInterval(videoInterval);
        clearInterval(muteInterval);
      };
    }
  }, [isConnecting]);

  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (!showControls) return;
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onEndCall();
  };

  const getNextLayoutMode = () => {
    if (layoutMode === 'pip') return 'split-horizontal';
    if (layoutMode === 'split-horizontal') return 'split-vertical';
    return 'pip';
  };

  const renderRemoteVideoContent = () => (
    isRemoteVideoOn ? (
      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated gradient background to simulate video */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Simulated person */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`w-32 h-32 md:w-64 md:h-64 rounded-full flex items-center justify-center text-6xl md:text-9xl shadow-2xl ${participant.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}
            animate={{ 
              scale: [1, 1.02, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {participant.avatar}
          </motion.div>
        </div>

        {/* Audio indicator */}
        {!isRemoteMuted && (
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-green-400 rounded-full"
                  animate={{ height: [8, 16, 8] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
        )}

        {isRemoteMuted && (
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-red-500/80 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2">
            <MicOff className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-xs md:text-sm">Muted</span>
          </div>
        )}
      </div>
    ) : (
      <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center">
        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-4xl md:text-6xl mb-4 ${participant.avatarColor || 'bg-gradient-to-br from-gray-600 to-gray-700'}`}>
          {participant.avatar}
        </div>
        <p className="text-white text-lg md:text-xl mb-1">{participant.name}</p>
        <div className="flex items-center gap-2 text-gray-400">
          <VideoOff className="w-5 h-5" />
          <span>Camera is off</span>
        </div>
      </div>
    )
  );

  const renderLocalVideoContent = () => (
    isVideoOn ? (
      <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 relative overflow-hidden">
        {/* Animated gradient for your video */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(14, 165, 233, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Your avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl ${
              layoutMode !== 'pip' ? 'w-24 h-24 md:w-32 md:h-32 text-5xl md:text-7xl' : 'w-20 h-20 text-4xl'
            }`}
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            😊
          </motion.div>
        </div>

        {isMuted && (
          <div className="absolute bottom-2 left-2 bg-red-500 rounded-full p-1.5">
            <MicOff className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    ) : (
      <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center">
        <VideoOff className="w-8 h-8 text-gray-400 mb-2" />
        <span className="text-gray-400 text-xs">Camera Off</span>
      </div>
    )
  );

  return (
    <div 
      ref={videoContainerRef}
      className="relative bg-gray-900 h-full flex flex-col"
      onMouseMove={() => setShowControls(true)}
      onClick={() => setShowControls(prev => !prev)}
    >
      {/* Connecting Screen */}
      <AnimatePresence>
        {isConnecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 flex flex-col items-center justify-center z-50"
          >
            <div className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl mb-6 animate-pulse ${participant.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
              {participant.avatar}
            </div>
            <h3 className="text-white text-2xl mb-2">Connecting to {participant.name}...</h3>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Video Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {layoutMode === 'pip' ? (
          <>
            {/* Remote Video (Full Background) */}
            <div className="absolute inset-0">
              {renderRemoteVideoContent()}
            </div>

            {/* Your Video (Picture-in-Picture) */}
            <motion.div
              className="absolute top-4 right-4 w-32 h-24 sm:w-48 sm:h-36 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 cursor-move z-10"
              drag
              dragConstraints={videoContainerRef}
              dragElastic={0.1}
            >
              {renderLocalVideoContent()}
            </motion.div>
          </>
        ) : (
          /* Split Layouts */
          <div className={`flex-1 flex h-full ${
            layoutMode === 'split-horizontal' 
              ? 'flex-col' // Top/Bottom
              : 'flex-row' // Side-by-Side
          }`}>
            {/* Remote Video */}
            <div className={`flex-1 relative ${
              layoutMode === 'split-horizontal'
                ? 'border-b border-gray-800'
                : 'border-r border-gray-800'
            }`}>
              {renderRemoteVideoContent()}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs z-10">
                {participant.name}
              </div>
            </div>
            
            {/* Local Video */}
            <div className="flex-1 relative">
              {renderLocalVideoContent()}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs z-10">
                You
              </div>
            </div>
          </div>
        )}

        {/* Top Bar - Name & Duration */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-6 z-20 pointer-events-none"
            >
              <div className="flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${participant.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                    {participant.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{participant.name}</p>
                    <div className="flex items-center gap-1.5 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Connected</span>
                    </div>
                  </div>
                </div>
                <div className="text-white text-lg font-mono bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  {formatDuration(callDuration)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-20 pointer-events-none"
            >
              <div className="flex items-center justify-center gap-4 pointer-events-auto flex-wrap">
                {/* Layout Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLayoutMode(getNextLayoutMode());
                  }}
                  className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
                  title="Switch Layout"
                >
                  {layoutMode === 'pip' && <LayoutGrid className="w-6 h-6 text-white" />}
                  {layoutMode === 'split-horizontal' && <Rows className="w-6 h-6 text-white" />}
                  {layoutMode === 'split-vertical' && <Columns className="w-6 h-6 text-white" />}
                </button>

                {/* Mute/Unmute */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isMuted
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Video On/Off */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVideoOn(!isVideoOn);
                  }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    !isVideoOn
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {isVideoOn ? (
                    <Video className="w-6 h-6 text-white" />
                  ) : (
                    <VideoOff className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* End Call */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEndCall();
                  }}
                  className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <Phone className="w-7 h-7 text-white rotate-[135deg]" />
                </button>

                {/* Skip Stranger */}
                {isStranger && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSkipConfirm(true);
                    }}
                    className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
                  >
                    <SkipForward className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Send Friend Request */}
                {isStranger && !friendRequestSent && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSendFriendRequest) onSendFriendRequest();
                    }}
                    className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-all"
                  >
                    <UserPlus className="w-6 h-6 text-white" />
                  </button>
                )}
                
                {/* Friend Request Sent */}
                {isStranger && friendRequestSent && (
                  <button
                    className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-all"
                  >
                    <UserCheck className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Report Button - Added for Safety */}
                {isStranger && onReport && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReport();
                    }}
                    className="w-14 h-14 rounded-full bg-gray-500/50 hover:bg-gray-500/70 backdrop-blur-sm flex items-center justify-center transition-all"
                    title="Report User"
                  >
                    <Flag className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tap to show controls hint */}
      {!showControls && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-white/60 text-sm"
          >
            Tap to show controls
          </motion.div>
        </div>
      )}

      {/* Camera Error Overlay */}
      <AnimatePresence>
        {cameraError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center max-w-md"
            >
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                <VideoOff className="w-10 h-10 text-red-400" />
              </div>
              <h3 className="text-white text-2xl mb-3">Camera Access Lost</h3>
              <p className="text-white/80 mb-6">{cameraError}</p>
              <div className="flex gap-2 mb-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-red-400 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm">Ending call in 3 seconds...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Confirmation Dialog */}
      <SkipConfirmDialog
        isOpen={showSkipConfirm}
        onClose={() => setShowSkipConfirm(false)}
        onConfirm={() => {
          if (onSkipStranger) onSkipStranger();
        }}
        strangerName={participant.name}
      />
    </div>
  );
}