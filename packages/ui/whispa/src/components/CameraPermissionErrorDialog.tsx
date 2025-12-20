import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Video, Mic, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface CameraPermissionErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPermissionGranted: () => void;
  errorMessage?: string;
}

type PermissionStatus = 'checking' | 'granted' | 'denied' | 'prompt' | 'unknown';

export function CameraPermissionErrorDialog({
  isOpen,
  onClose,
  onPermissionGranted,
  errorMessage,
}: CameraPermissionErrorDialogProps) {
  const [cameraStatus, setCameraStatus] = useState<PermissionStatus>('checking');
  const [microphoneStatus, setMicrophoneStatus] = useState<PermissionStatus>('checking');
  const [isRequesting, setIsRequesting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check current permission status
  const checkPermissions = async () => {
    setCameraStatus('prompt');
    setMicrophoneStatus('prompt');
    setErrorMsg(null);

    // Try to check permissions without triggering a prompt
    try {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
          setCameraStatus(cameraPermission.state as PermissionStatus);
          
          // Listen for permission changes
          cameraPermission.addEventListener('change', () => {
            setCameraStatus(cameraPermission.state as PermissionStatus);
          });
        } catch (e) {
          // Some browsers don't support querying camera permission
          // This is fine, we'll show as "prompt" status
          setCameraStatus('prompt');
        }

        try {
          const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          setMicrophoneStatus(micPermission.state as PermissionStatus);
          
          // Listen for permission changes
          micPermission.addEventListener('change', () => {
            setMicrophoneStatus(micPermission.state as PermissionStatus);
          });
        } catch (e) {
          // Some browsers don't support querying microphone permission
          setMicrophoneStatus('prompt');
        }
      } else {
        // Fallback for browsers that don't support permissions API
        setCameraStatus('prompt');
        setMicrophoneStatus('prompt');
      }
    } catch (error) {
      // Silent fail - just show as prompt required
      console.log('Permissions API not available, will request on button click');
      setCameraStatus('prompt');
      setMicrophoneStatus('prompt');
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkPermissions();
    }
  }, [isOpen]);

  const handleRequestAccess = async () => {
    setIsRequesting(true);
    setErrorMsg(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Permission granted! Stop the stream
      stream.getTracks().forEach(track => track.stop());

      setCameraStatus('granted');
      setMicrophoneStatus('granted');
      setIsRequesting(false);

      // Notify parent that permission is granted
      setTimeout(() => {
        onPermissionGranted();
        onClose();
      }, 500);
    } catch (error: any) {
      console.error('Permission denied:', error);
      
      // Handle different error scenarios
      if (error.name === 'NotAllowedError') {
        setErrorMsg('Access denied. Please allow camera and microphone access.');
        setCameraStatus('denied');
        setMicrophoneStatus('denied');
      } else if (error.name === 'NotFoundError') {
        setErrorMsg('No camera or microphone found on this device.');
        setCameraStatus('denied');
        setMicrophoneStatus('denied');
      } else if (error.name === 'NotReadableError') {
        setErrorMsg('Camera or microphone is already in use by another application.');
        setCameraStatus('denied');
        setMicrophoneStatus('denied');
      } else {
        setErrorMsg('Failed to access camera/microphone. Please check your browser settings.');
        setCameraStatus('denied');
        setMicrophoneStatus('denied');
      }
      
      setIsRequesting(false);
    }
  };

  const getStatusIcon = (status: PermissionStatus) => {
    switch (status) {
      case 'checking':
        return <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />;
      case 'granted':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'denied':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'prompt':
      case 'unknown':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: PermissionStatus) => {
    switch (status) {
      case 'checking':
        return 'Checking...';
      case 'granted':
        return 'Allowed';
      case 'denied':
        return 'Blocked';
      case 'prompt':
        return 'Permission Required';
      case 'unknown':
        return 'Unknown Status';
    }
  };

  const getStatusColor = (status: PermissionStatus) => {
    switch (status) {
      case 'granted':
        return 'text-green-600 dark:text-green-400';
      case 'denied':
        return 'text-red-600 dark:text-red-400';
      case 'checking':
        return 'text-gray-500 dark:text-gray-400';
      case 'prompt':
      case 'unknown':
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const allGranted = cameraStatus === 'granted' && microphoneStatus === 'granted';
  const anyDenied = cameraStatus === 'denied' || microphoneStatus === 'denied';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle>Camera & Microphone Access</DialogTitle>
              <DialogDescription className="mt-1">
                Video chat requires device permissions
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Permission Status Cards */}
        <div className="space-y-3">
          {/* Camera Permission */}
          <div className={`rounded-xl border-2 p-4 transition-all ${
            cameraStatus === 'granted' 
              ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
              : cameraStatus === 'denied'
              ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
              : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  cameraStatus === 'granted'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : cameraStatus === 'denied'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <Video className={`w-5 h-5 ${
                    cameraStatus === 'granted'
                      ? 'text-green-600 dark:text-green-400'
                      : cameraStatus === 'denied'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-sm">Camera Permission</div>
                  <div className={`text-xs font-medium ${getStatusColor(cameraStatus)}`}>
                    {getStatusText(cameraStatus)}
                  </div>
                </div>
              </div>
              {getStatusIcon(cameraStatus)}
            </div>
          </div>

          {/* Microphone Permission */}
          <div className={`rounded-xl border-2 p-4 transition-all ${
            microphoneStatus === 'granted' 
              ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
              : microphoneStatus === 'denied'
              ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
              : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  microphoneStatus === 'granted'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : microphoneStatus === 'denied'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <Mic className={`w-5 h-5 ${
                    microphoneStatus === 'granted'
                      ? 'text-green-600 dark:text-green-400'
                      : microphoneStatus === 'denied'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-sm">Microphone Permission</div>
                  <div className={`text-xs font-medium ${getStatusColor(microphoneStatus)}`}>
                    {getStatusText(microphoneStatus)}
                  </div>
                </div>
              </div>
              {getStatusIcon(microphoneStatus)}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {(errorMsg || errorMessage) && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-900 dark:text-red-100">
              {errorMsg || errorMessage}
            </p>
          </div>
        )}

        {/* Help Text for Denied Permissions */}
        {anyDenied && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              How to enable permissions:
            </p>
            <ol className="text-xs text-blue-800 dark:text-blue-200 space-y-1.5 list-decimal list-inside">
              <li>Click the camera/lock icon in your browser's address bar</li>
              <li>Select "Allow" for camera and microphone</li>
              <li>Click "Request Access" below to try again</li>
            </ol>
          </div>
        )}

        {/* Success Message */}
        {allGranted && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-900 dark:text-green-100">
              All permissions granted! You can now use video chat.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {!allGranted && (
            <Button
              onClick={handleRequestAccess}
              disabled={isRequesting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isRequesting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Requesting...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Request Access
                </>
              )}
            </Button>
          )}
          <Button
            onClick={onClose}
            variant={allGranted ? "default" : "outline"}
            className={allGranted ? "flex-1" : ""}
          >
            {allGranted ? 'Continue' : 'Cancel'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}