import { useState, useEffect } from 'react';
import { User, Palette, Bell, Shield, MessageSquare, Settings, LogOut, Sparkles, Check, Globe, Keyboard, Sun, Moon, Crown, Volume2, Eye, EyeOff, Info, Download, Trash2, Languages, Video, Mic, FileText, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { UserProfile, Region } from '../App';
import { ThemeMode } from '../hooks/useTheme';
import { AvatarBuilder } from './AvatarBuilder';
import { toast } from 'sonner';
import { useSettings } from '../hooks/useSettings';
import { BlockedUsersDialog } from './BlockedUsersDialog';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import { TermsDialog, PrivacyDialog, RefundDialog } from './LegalDialogs';

interface PreferencesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  isAnonymous: boolean;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  onClaimAccount: () => void;
  soundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  notificationsEnabled: boolean;
  onNotificationsToggle: (enabled: boolean) => void;
  onLogout: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
  compactMode: boolean;
  onCompactModeToggle: (enabled: boolean) => void;
}

type PreferenceTab = 'profile' | 'appearance' | 'notifications' | 'privacy' | 'chat' | 'account' | 'legal';

const AVATARS = ['', '😎', '🤓', '😇', '🥳', '🤠', '🦸', '🧙', '🧑‍💻', '👨‍🎨', '👩‍🔬', '🐶', '🐱', '🦊', '🐼', '🦁', '🐯', '🦄'];

export function PreferencesDialog({
  isOpen,
  onClose,
  userProfile,
  isAnonymous,
  themeMode,
  onThemeChange,
  onClaimAccount,
  soundEnabled,
  onSoundToggle,
  notificationsEnabled,
  onNotificationsToggle,
  onLogout,
  onUpdateProfile,
  compactMode,
  onCompactModeToggle,
}: PreferencesDialogProps) {
  const { settings, updateSetting } = useSettings();
  const [activeTab, setActiveTab] = useState<PreferenceTab | null>(null);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [isAvatarBuilderOpen, setIsAvatarBuilderOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isBlockedUsersOpen, setIsBlockedUsersOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  useEffect(() => {
    // Force activeTab to 'profile' on desktop if it's null (initial load or resize)
    // We check window.innerWidth to determine if it's desktop
    const handleResize = () => {
      if (window.innerWidth >= 768 && !activeTab) {
        setActiveTab('profile');
      }
    };

    // Run on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  useEffect(() => {
    if (isOpen) {
      setEditedProfile(userProfile);
      // Reset to main menu on mobile when reopening
      if (window.innerWidth < 768) {
        setActiveTab(null);
      } else {
        setActiveTab('profile');
      }
    }
  }, [isOpen, userProfile]);

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'privacy' as const, label: 'Privacy', icon: Shield },
    { id: 'chat' as const, label: 'Chat', icon: MessageSquare },
    { id: 'account' as const, label: 'Account', icon: Crown },
    { id: 'legal' as const, label: 'Legal & About', icon: FileText },
  ];

  const regionOptions = [
    { value: 'worldwide' as Region, label: 'Worldwide', flag: '🌍' },
    { value: 'asia' as Region, label: 'Asia', flag: '🌏' },
    { value: 'europe' as Region, label: 'Europe', flag: '🇪🇺' },
    { value: 'north-america' as Region, label: 'North America', flag: '🇺🇸' },
    { value: 'south-america' as Region, label: 'South America', flag: '🇧🇷' },
    { value: 'africa' as Region, label: 'Africa', flag: '🌍' },
    { value: 'oceania' as Region, label: 'Oceania', flag: '🇦🇺' },
  ];

  const handleDeleteAccount = () => {
    // Open the delete account dialog instead of inline confirmation
    setIsDeleteAccountOpen(true);
  };

  const handleExportData = () => {
    // In production, request data export from backend
    console.log('Exporting user data...');
    toast.info('Data export is not yet implemented.');
  };

  const handleClose = () => {
    // Auto-save profile changes when closing
    if (editedProfile.name !== userProfile.name || 
        editedProfile.bio !== userProfile.bio || 
        editedProfile.avatar !== userProfile.avatar || 
        editedProfile.avatarColor !== userProfile.avatarColor ||
        editedProfile.region !== userProfile.region) {
      onUpdateProfile(editedProfile);
    }
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 !w-screen !h-screen !max-w-none !max-h-none !rounded-none !m-0 p-0 md:!w-[85vw] md:!h-[85vh] md:!max-w-[1000px] md:!rounded-xl md:!m-auto md:border overflow-hidden [&>button]:hidden md:[&>button]:block" aria-describedby={undefined}>
          <div className="flex flex-col md:flex-row h-full overflow-hidden">
            
            {/* 
              MOBILE VIEW: 
              If activeTab is NULL, show the MAIN MENU list.
              If activeTab is SET, this section is HIDDEN (unless on desktop).
            */}
            <div className={`
              ${activeTab && 'hidden md:flex'} 
              flex-col w-full h-full md:w-64 md:border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 min-h-0
            `}>
              <div className="flex items-center justify-between px-4 py-4 md:px-4 md:py-4 md:border-b border-gray-200 dark:border-gray-800 shrink-0">
                <DialogTitle className="text-gray-900 dark:text-white text-xl font-bold md:text-lg md:font-semibold">
                  Settings
                </DialogTitle>
                <button 
                  onClick={handleClose}
                  className="p-2 -mr-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full md:hidden"
                >
                  <span className="sr-only">Close</span>
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </button>
              </div>
              
              <ScrollArea className="flex-1 min-h-0">
                <nav className="p-2 md:p-2 space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between p-4 md:px-3 md:py-2 rounded-xl md:rounded-lg transition-all text-base md:text-sm mb-2 md:mb-0 ${
                          activeTab === tab.id
                            ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-white shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 md:text-gray-900'
                            : 'bg-white md:bg-transparent dark:bg-gray-800/50 md:dark:bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 md:hover:bg-gray-200/50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-4 md:gap-3">
                          <div className={`p-2 rounded-lg ${
                            activeTab === tab.id 
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 md:bg-transparent md:text-current md:p-0' 
                              : 'bg-gray-100 dark:bg-gray-700 md:bg-transparent md:text-gray-500 md:dark:text-gray-400 md:p-0'
                          }`}>
                            <Icon className="w-5 h-5 md:w-4 md:h-4" />
                          </div>
                          <span className="font-medium">{tab.label}</span>
                        </div>
                        {/* Chevron for mobile only */}
                        <svg className="w-5 h-5 text-gray-400 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    );
                  })}
                </nav>
              </ScrollArea>
              
              <div className="p-4 text-center md:hidden mt-auto shrink-0">
                 <p className="text-xs text-gray-400">Whispa v1.0.0</p>
              </div>
            </div>

            {/* 
              CONTENT AREA:
              On Mobile: Only visible if activeTab is NOT null.
              On Desktop: Always visible (activeTab is never null on desktop).
            */}
            <div className={`
              ${!activeTab && 'hidden md:flex'} 
              flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden bg-gray-50 md:bg-white dark:bg-gray-900
            `}>
              {/* Mobile Content Header with Back Button */}
              <div className="flex md:hidden items-center justify-between px-4 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveTab(null)}
                    className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h3>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 -mr-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
                >
                  <span className="sr-only">Close</span>
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </button>
              </div>

              <ScrollArea className="flex-1 min-h-0">
                <div className="p-4 md:p-6 pb-20 md:pb-20">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div className="space-y-6 max-w-2xl">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                          Profile Settings
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Manage your public profile information
                        </p>
                      </div>

                      {/* Avatar Selection */}
                      <div className="space-y-3">
                        <Label className="text-gray-900 dark:text-white">Avatar</Label>
                        <div className="flex items-center gap-4">
                          {/* Current Avatar Preview */}
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg ${editedProfile.avatarColor || 'bg-gradient-to-br from-purple-600 to-pink-600'}`}>
                            {editedProfile.avatar}
                          </div>
                          {/* Avatar Builder State */}
                          <div className="flex-1">
                            <AvatarBuilder
                              isOpen={isAvatarBuilderOpen}
                              onClose={() => setIsAvatarBuilderOpen(false)}
                              currentAvatar={editedProfile.avatar}
                              currentBg={editedProfile.avatarColor}
                              onSave={(avatar, color) => setEditedProfile({ ...editedProfile, avatar, avatarColor: color })}
                            />
                            <Button
                              onClick={() => setIsAvatarBuilderOpen(true)}
                              variant="outline"
                              className="w-full"
                            >
                              <Sparkles className="w-4 h-4 mr-2" />
                              Change Avatar
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 dark:text-white">
                          Display Name
                        </Label>
                        <Input
                          id="name"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          placeholder="Your display name"
                          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                          maxLength={30}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {editedProfile.name.length}/30 characters
                        </p>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-900 dark:text-white">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                          placeholder="Tell people about yourself..."
                          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 resize-none min-h-24"
                          maxLength={150}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {editedProfile.bio.length}/150 characters
                        </p>
                      </div>

                      {/* Region */}
                      <div className="space-y-2">
                        <Label className="text-gray-900 dark:text-white">Region</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {regionOptions.map((region) => (
                            <button
                              key={region.value}
                              onClick={() => setEditedProfile({ ...editedProfile, region: region.value })}
                              className={`flex items-center gap-2 p-3 rounded-lg transition-all border ${
                                editedProfile.region === region.value
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent'
                                  : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                            >
                              <span className="text-xl">{region.flag}</span>
                              <span className="text-sm">{region.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance Tab */}
                  {activeTab === 'appearance' && (
                    <div className="space-y-6 max-w-2xl">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                          Appearance
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Customize how Whispa looks for you
                        </p>
                      </div>

                      {/* Theme Selection */}
                      <div className="space-y-3">
                        <Label className="text-gray-900 dark:text-white">Theme</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            onClick={() => onThemeChange('light')}
                            className={`p-4 rounded-xl transition-all border-2 ${
                              themeMode === 'light'
                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                          >
                            <div className="w-full h-20 bg-white rounded-lg mb-3 border border-gray-200 flex items-center justify-center">
                              <div className="text-4xl">☀️</div>
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Light
                            </div>
                            {themeMode === 'light' && (
                              <div className="mt-2 flex justify-center">
                                <Check className="w-5 h-5 text-purple-600" />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => onThemeChange('dark')}
                            className={`p-4 rounded-xl transition-all border-2 ${
                              themeMode === 'dark'
                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                          >
                            <div className="w-full h-20 bg-gray-900 rounded-lg mb-3 border border-gray-700 flex items-center justify-center">
                              <div className="text-4xl">🌙</div>
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Dark
                            </div>
                            {themeMode === 'dark' && (
                              <div className="mt-2 flex justify-center">
                                <Check className="w-5 h-5 text-purple-600" />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => onThemeChange('system')}
                            className={`p-4 rounded-xl transition-all border-2 ${
                              themeMode === 'system'
                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                          >
                            <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 rounded-lg mb-3 border border-gray-300 flex items-center justify-center">
                              <div className="text-4xl">💻</div>
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              System
                            </div>
                            {themeMode === 'system' && (
                              <div className="mt-2 flex justify-center">
                                <Check className="w-5 h-5 text-purple-600" />
                              </div>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Additional Appearance Options */}
                      <div className="space-y-4">
                        {/* Compact mode option removed since it's now always enabled */}
                        {/* <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Keyboard className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Compact Mode
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Reduce spacing and padding for a more compact interface
                            </p>
                          </div>
                          <Switch
                            checked={compactMode}
                            onCheckedChange={onCompactModeToggle}
                          />
                        </div> */}

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Languages className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Language
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Change the display language
                            </p>
                          </div>
                          <select
                            value={settings.language}
                            onChange={(e) => updateSetting('language', e.target.value)}
                            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm"
                          >
                            <option>English</option>
                            <option>Español</option>
                            <option>Français</option>
                            <option>Deutsch</option>
                            <option>日本語</option>
                            <option>中文</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-6 max-w-2xl">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                          Notifications & Sounds
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Manage how you receive notifications
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Browser Notifications
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Get notified when you receive new messages while away
                            </p>
                          </div>
                          <Switch
                            checked={notificationsEnabled}
                            onCheckedChange={onNotificationsToggle}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Sound Effects
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Play sounds for messages and notifications
                            </p>
                          </div>
                          <Switch
                            checked={soundEnabled}
                            onCheckedChange={onSoundToggle}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Message Previews
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Show message content in notifications
                            </p>
                          </div>
                          <Switch
                            checked={settings.messagePreview}
                            onCheckedChange={(value) => updateSetting('messagePreview', value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Tab */}
                  {activeTab === 'privacy' && (
                    <div className="space-y-6 max-w-2xl">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                          Privacy & Safety
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Control who can interact with you
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Show Online Status
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Let others see when you're online
                            </p>
                          </div>
                          <Switch
                            checked={settings.showOnlineStatus}
                            onCheckedChange={(value) => updateSetting('showOnlineStatus', value)}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Allow Friend Requests
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Let strangers send you friend requests
                            </p>
                          </div>
                          <Switch
                            checked={settings.allowFriendRequests}
                            onCheckedChange={(value) => updateSetting('allowFriendRequests', value)}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Typing Indicator
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Show when you're typing a message
                            </p>
                          </div>
                          <Switch
                            checked={settings.showTypingIndicator}
                            onCheckedChange={(value) => updateSetting('showTypingIndicator', value)}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Read Receipts
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Let others know when you've read their messages
                            </p>
                          </div>
                          <Switch
                            checked={settings.showReadReceipts}
                            onCheckedChange={(value) => updateSetting('showReadReceipts', value)}
                          />
                        </div>

                        {/* Blocked Users */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Blocked Users
                              </Label>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{settings.blockedUsers.length} blocked</span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Manage users you've blocked
                          </p>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => setIsBlockedUsersOpen(true)}>
                            View Blocked Users
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chat Tab */}
                  {activeTab === 'chat' && (
                    <div className="space-y-6 max-w-2xl">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                          Chat Settings
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Customize your chat experience
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Keyboard className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <Label className="text-gray-900 dark:text-white font-medium">
                                Enter to Send
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Press Enter to send messages (Shift+Enter for new line)
                            </p>
                          </div>
                          <Switch
                            checked={settings.enterToSend}
                            onCheckedChange={(value) => updateSetting('enterToSend', value)}
                          />
                        </div>

                        {/* Video Call Settings */}
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <Label className="text-gray-900 dark:text-white font-medium">
                              Video Call Settings
                            </Label>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <Label className="text-sm text-gray-900 dark:text-white">
                                  Allow Video Calls
                                </Label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Let others call you via video
                                </p>
                              </div>
                              <Switch
                                checked={settings.allowVideoCalls ?? true}
                                onCheckedChange={(value) => updateSetting('allowVideoCalls', value)}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <Label className="text-sm text-gray-900 dark:text-white">
                                  Auto-enable Camera
                                </Label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Turn on camera when joining calls
                                </p>
                              </div>
                              <Switch
                                checked={settings.autoEnableCamera ?? false}
                                onCheckedChange={(value) => updateSetting('autoEnableCamera', value)}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <Label className="text-sm text-gray-900 dark:text-white">
                                  Auto-enable Microphone
                                </Label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Turn on microphone when joining calls
                                </p>
                              </div>
                              <Switch
                                checked={settings.autoEnableMicrophone ?? true}
                                onCheckedChange={(value) => updateSetting('autoEnableMicrophone', value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Info className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <Label className="text-gray-900 dark:text-white font-medium">
                              Chat Behavior
                            </Label>
                          </div>
                          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <p>• Messages are end-to-end encrypted</p>
                            <p>• Chat history is stored locally and on our servers</p>
                            <p>• Stranger chats are anonymized for privacy</p>
                            <p>• Report inappropriate behavior to keep the community safe</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Account Tab */}
                  {activeTab === 'account' && (
                    <div className="space-y-6 max-w-2xl">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                          Account Management
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Manage your account and data
                        </p>
                      </div>

                      {/* Claim Account (Anonymous Users Only) */}
                      {isAnonymous && (
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                          <div className="flex items-start gap-3 mb-4">
                            <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                Claim Your Account
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                You're using an anonymous account. Claim it to save your data, friends, and chat history permanently.
                              </p>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                              Benefits of claiming your account:
                            </h4>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                              <li>✓ Permanent access to your data</li>
                              <li>✓ Keep all your friends and chat history</li>
                              <li>✓ Sync across devices</li>
                              <li>✓ Enhanced security features</li>
                            </ul>
                          </div>
                          <Button
                            onClick={onClaimAccount}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          >
                            <Crown className="w-4 h-4 mr-2" />
                            Claim Account Now
                          </Button>
                        </div>
                      )}

                      {/* Account Info */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                          Account Information
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Account Type:</span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {isAnonymous ? 'Anonymous' : 'Full Account'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Member Since:</span>
                            <span className="text-gray-900 dark:text-white">
                              {new Date(userProfile.joinedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                            <span className="text-gray-900 dark:text-white font-mono text-xs">
                              {userProfile.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Data Export */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <Label className="text-gray-900 dark:text-white font-medium">
                              Download Your Data
                            </Label>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          Export all your data including profile, friends, and chat history
                        </p>
                        <Button onClick={handleExportData} variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Request Data Export
                        </Button>
                      </div>

                      {/* Logout */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <Label className="text-gray-900 dark:text-white font-medium">
                              Logout
                            </Label>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {isAnonymous 
                            ? 'Sign out of your anonymous session. Your data may be lost if you haven\'t claimed your account.'
                            : 'Sign out of your account. You can sign back in anytime.'}
                        </p>
                        <Button 
                          onClick={onLogout}
                          variant="outline" 
                          className="w-full border-gray-300 dark:border-gray-600"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>

                      {/* Delete Account */}
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <Label className="text-red-900 dark:text-red-400 font-medium">
                            Delete Account
                          </Label>
                        </div>
                        <p className="text-sm text-red-800 dark:text-red-300 mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        
                        {!showDeleteConfirm ? (
                          <Button
                            onClick={() => setShowDeleteConfirm(true)}
                            variant="outline"
                            className="w-full border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                          >
                            Request Account Deletion
                          </Button>
                        ) : (
                          <div className="space-y-3">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                              <p className="text-sm text-red-900 dark:text-red-300 font-medium mb-2">
                                Are you absolutely sure?
                              </p>
                              <p className="text-xs text-red-800 dark:text-red-400">
                                This will permanently delete your account, friends, and all chat history.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => setShowDeleteConfirm(false)}
                                variant="outline"
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleDeleteAccount}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Forever
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Legal Tab */}
                  {activeTab === 'legal' && (
                    <div className="space-y-6 max-w-2xl">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                          Legal & About
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Review our terms, policies, and information about Whispa
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            About Whispa
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Whispa is a platform designed to connect people from around the world anonymously. 
                            Our mission is to foster genuine connections without the barriers of identity.
                          </p>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            Version 1.0.0
                          </div>
                        </div>

                        <div className="grid gap-3">
                          <button
                            onClick={() => setIsTermsOpen(true)}
                            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900 dark:text-white">Terms of Service</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Rules for using our platform</div>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </button>

                          <button
                            onClick={() => setIsPrivacyOpen(true)}
                            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                <Shield className="w-5 h-5" />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900 dark:text-white">Privacy Policy</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">How we handle your data</div>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </button>

                          <button
                            onClick={() => setIsRefundOpen(true)}
                            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                <Crown className="w-5 h-5" />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900 dark:text-white">Refund Policy</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Information about payments</div>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BlockedUsersDialog 
        isOpen={isBlockedUsersOpen}
        onClose={() => setIsBlockedUsersOpen(false)}
      />

      <DeleteAccountDialog 
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
        onConfirmDelete={onLogout}
        userName={userProfile.name}
      />

      <TermsDialog open={isTermsOpen} onOpenChange={setIsTermsOpen} />
      <PrivacyDialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen} />
      <RefundDialog open={isRefundOpen} onOpenChange={setIsRefundOpen} />
    </>
  );
}