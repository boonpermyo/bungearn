import { useState, useEffect } from 'react';

export type CameraPermissionState = 'prompt' | 'granted' | 'denied' | 'unavailable';

export function useCameraPermission() {
  const [permissionState, setPermissionState] = useState<CameraPermissionState>('prompt');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const checkPermission = async () => {
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionState('unavailable');
        return 'unavailable';
      }

      // Try to query permission status if available
      if ('permissions' in navigator) {
        try {
          const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
          if (result.state === 'granted') {
            setPermissionState('granted');
            return 'granted';
          } else if (result.state === 'denied') {
            setPermissionState('denied');
            return 'denied';
          } else {
            setPermissionState('prompt');
            return 'prompt';
          }
        } catch (e) {
          // Permission query not supported, will need to request directly
          setPermissionState('prompt');
          return 'prompt';
        }
      } else {
        setPermissionState('prompt');
        return 'prompt';
      }
    } catch (error) {
      setPermissionState('unavailable');
      return 'unavailable';
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setPermissionState('granted');
      return true;
    } catch (error: any) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionState('denied');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setPermissionState('unavailable');
      } else {
        setPermissionState('denied');
      }
      return false;
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    checkPermission();
    
    return () => {
      stopStream();
    };
  }, []);

  return {
    permissionState,
    requestPermission,
    checkPermission,
    stopStream,
    stream,
  };
}
