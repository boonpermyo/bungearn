// Sound utility functions using Web Audio API

export const playNotificationSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

export const playLeaveSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 400;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.8);
};

export const playMatchFoundSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // First note
  const osc1 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  osc1.connect(gain1);
  gain1.connect(audioContext.destination);
  osc1.frequency.value = 523.25; // C5
  osc1.type = 'sine';
  gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  osc1.start(audioContext.currentTime);
  osc1.stop(audioContext.currentTime + 0.3);

  // Second note
  const osc2 = audioContext.createOscillator();
  const gain2 = audioContext.createGain();
  osc2.connect(gain2);
  gain2.connect(audioContext.destination);
  osc2.frequency.value = 659.25; // E5
  osc2.type = 'sine';
  gain2.gain.setValueAtTime(0, audioContext.currentTime + 0.15);
  gain2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  osc2.start(audioContext.currentTime + 0.15);
  osc2.stop(audioContext.currentTime + 0.5);
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission === 'default') {
    await Notification.requestPermission();
  }
};

export const showBrowserNotification = (title: string, body: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });
  }
};
