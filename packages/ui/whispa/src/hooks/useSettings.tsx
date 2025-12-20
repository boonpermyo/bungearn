import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Settings {
  // Privacy
  showOnlineStatus: boolean;
  allowFriendRequests: boolean;
  showTypingIndicator: boolean;
  showReadReceipts: boolean;
  
  // Chat
  enterToSend: boolean;
  messagePreview: boolean;
  
  // Video Call
  allowVideoCalls: boolean;
  autoEnableCamera: boolean;
  autoEnableMicrophone: boolean;
  
  // Appearance
  compactMode: boolean;
  language: string;
  
  // Blocked users
  blockedUsers: string[];
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    // Load all settings from localStorage on init
    const savedShowOnlineStatus = localStorage.getItem('showOnlineStatus');
    const savedAllowFriendRequests = localStorage.getItem('allowFriendRequests');
    const savedShowTypingIndicator = localStorage.getItem('showTypingIndicator');
    const savedShowReadReceipts = localStorage.getItem('showReadReceipts');
    const savedEnterToSend = localStorage.getItem('enterToSend');
    const savedMessagePreview = localStorage.getItem('messagePreview');
    const savedAllowVideoCalls = localStorage.getItem('allowVideoCalls');
    const savedAutoEnableCamera = localStorage.getItem('autoEnableCamera');
    const savedAutoEnableMicrophone = localStorage.getItem('autoEnableMicrophone');
    const savedCompactMode = localStorage.getItem('compactMode');
    const savedLanguage = localStorage.getItem('language');
    const savedBlockedUsers = localStorage.getItem('blockedUsers');

    return {
      showOnlineStatus: savedShowOnlineStatus !== null ? JSON.parse(savedShowOnlineStatus) : true,
      allowFriendRequests: savedAllowFriendRequests !== null ? JSON.parse(savedAllowFriendRequests) : true,
      showTypingIndicator: savedShowTypingIndicator !== null ? JSON.parse(savedShowTypingIndicator) : true,
      showReadReceipts: savedShowReadReceipts !== null ? JSON.parse(savedShowReadReceipts) : true,
      enterToSend: savedEnterToSend !== null ? JSON.parse(savedEnterToSend) : true,
      messagePreview: savedMessagePreview !== null ? JSON.parse(savedMessagePreview) : true,
      allowVideoCalls: savedAllowVideoCalls !== null ? JSON.parse(savedAllowVideoCalls) : true,
      autoEnableCamera: savedAutoEnableCamera !== null ? JSON.parse(savedAutoEnableCamera) : false,
      autoEnableMicrophone: savedAutoEnableMicrophone !== null ? JSON.parse(savedAutoEnableMicrophone) : true,
      compactMode: savedCompactMode !== null ? JSON.parse(savedCompactMode) : false,
      language: savedLanguage || 'English',
      blockedUsers: savedBlockedUsers ? JSON.parse(savedBlockedUsers) : [],
    };
  });

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      // Save to localStorage
      localStorage.setItem(key, JSON.stringify(value));
      return newSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
