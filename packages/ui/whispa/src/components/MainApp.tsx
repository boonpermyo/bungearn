import { useState, useEffect } from 'react';
import { Plus, Settings, User, X as XIcon, History, Video as VideoIcon, MessageCircle, Mail, Menu, Lock, Globe, Clock, ChevronLeft, ChevronRight, Users, Crown } from 'lucide-react';
import { ChatSession, Friend, FriendRequest, UserProfile, ChatHistory, Region, ChatMode, GenderFilter } from '../App';
import { ChatScreen } from './ChatScreen';
import { ProfileDialog } from './ProfileDialog';
import { FriendsSidebar } from './FriendsSidebar';
import { MatchingScreen } from './MatchingScreen';
import { StrangerChatHistory } from './StrangerChatHistory';
import { ThemeToggle } from './ThemeToggle';
import { ThemeMode } from '../hooks/useTheme';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Sheet, SheetContent } from './ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { LogoutConfirmDialog } from './LogoutConfirmDialog';
import { PreferencesDialog } from './PreferencesDialog';
import { SettingsDialog } from './SettingsDialog';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';
import { useSettings } from '../hooks/useSettings';
import { translate } from '../utils/translations';
import { ChatHistoryDialog } from './ChatHistoryDialog';
import { FeatureAnnouncementDialog } from './FeatureAnnouncementDialog';
import { toast } from 'sonner';

interface MainAppProps {
  chatSessions: ChatSession[];
  activeChatId: string | null;
  onSwitchChat: (sessionId: string | null) => void;
  onSendMessage: (sessionId: string, text: string) => void;
  onSkipStranger: () => void;
  onCloseChat: (sessionId: string) => void;
  friends: Friend[];
  friendRequests: FriendRequest[];
  onStartFriendChat: (friend: Friend) => void;
  onAcceptFriendRequest: (id: string) => void;
  onDeclineFriendRequest: (id: string) => void;
  onSendFriendRequest: (sessionId: string) => void;
  friendRequestsSent: Set<string>;
  userProfile: UserProfile;
  chatHistory: ChatHistory[];
  onStartRandomChat: () => void;
  isAnonymous: boolean;
  onClaimAccount: () => void;
  selectedRegion: Region;
  matchingWaitTime: number | null;
  onUpdateRegion: (region: Region) => void;
  onUpdateWaitTime: (time: number | null) => void;
  selectedGenderFilter: GenderFilter;
  onUpdateGenderFilter: (filter: GenderFilter) => void;
  onLogout: () => void;
  isMatching: boolean;
  onCancelMatching: () => void;
  onMatchingSuccess: () => void;
  chatMode: ChatMode;
  onUpdateChatMode: (mode: ChatMode) => void;
  onUpdateSessionChatMode?: (sessionId: string, mode: ChatMode) => void;
  cameraPermissionGranted: boolean;
  showCameraPermissionDialog: boolean;
  onCameraAccessLost?: (sessionId: string) => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  onUpdateProfile: (profile: UserProfile) => void;
  compactMode: boolean;
  onCompactModeToggle: (enabled: boolean) => void;
  onViewHistoryChat?: (chat: ChatHistory) => void;
  onSendFriendRequestFromHistory?: (strangerId: string, strangerName: string) => void;
  onStrangerLeft?: () => void; // Added for testing
  onUnfriend: (friendId: string) => void;
  onDeleteHistoryChat?: (chatId: string) => void;
  onClearAllHistory?: () => void;
  isAppOnline?: boolean;
}

export function MainApp({
  chatSessions,
  activeChatId,
  onSwitchChat,
  onSendMessage,
  onSkipStranger,
  onCloseChat,
  friends,
  friendRequests,
  onStartFriendChat,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onSendFriendRequest,
  friendRequestsSent,
  userProfile,
  chatHistory,
  onStartRandomChat,
  isAnonymous,
  onClaimAccount,
  selectedRegion,
  matchingWaitTime,
  onUpdateRegion,
  onUpdateWaitTime,
  selectedGenderFilter,
  onUpdateGenderFilter,
  onLogout,
  isMatching,
  onCancelMatching,
  onMatchingSuccess,
  chatMode,
  onUpdateChatMode,
  onUpdateSessionChatMode,
  cameraPermissionGranted,
  showCameraPermissionDialog,
  onCameraAccessLost,
  themeMode,
  onThemeChange,
  onUpdateProfile,
  compactMode,
  onCompactModeToggle,
  onViewHistoryChat,
  onSendFriendRequestFromHistory,
  onStrangerLeft,
  onUnfriend,
  onDeleteHistoryChat,
  onClearAllHistory,
  isAppOnline = true,
}: MainAppProps) {
  const { settings } = useSettings();
  const t = (key: string) => translate(key, settings.language);
  
  const [profileDialogUser, setProfileDialogUser] = useState<Friend | UserProfile | null>(null);
  const [isFriendsSidebarOpen, setIsFriendsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sidebarInitialTab, setSidebarInitialTab] = useState<'friends' | 'history'>('friends');
  const [selectedHistoryChat, setSelectedHistoryChat] = useState<ChatHistory | null>(null);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [showFeatureAnnouncement, setShowFeatureAnnouncement] = useState(false);

  // Feature announcement version tracking
  const CURRENT_FEATURE_VERSION = 'v2.1-video-call-unread';

  // Check if user has seen this version's announcement
  useEffect(() => {
    const lastSeenVersion = localStorage.getItem('lastSeenFeatureVersion');
    if (lastSeenVersion !== CURRENT_FEATURE_VERSION) {
      // Show announcement after a short delay for better UX
      const timer = setTimeout(() => {
        setShowFeatureAnnouncement(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseFeatureAnnouncement = () => {
    setShowFeatureAnnouncement(false);
    // Mark this version as seen
    localStorage.setItem('lastSeenFeatureVersion', CURRENT_FEATURE_VERSION);
  };
  
  const activeSession = chatSessions.find(s => s.id === activeChatId);
  const strangerSession = chatSessions.find(s => s.type === 'stranger');
  const friendSessions = chatSessions.filter(s => s.type === 'friend' || s.type === 'history');
  
  const onlineFriends = friends.filter(f => f.isOnline);
  const offlineFriends = friends.filter(f => !f.isOnline);

  // Calculate the active tab value:
  // - If active session is stranger, use "stranger" as the tab value
  // - If active session is friend/history, use the session ID as the tab value
  // - Otherwise default to 'stranger'
  const activeTabValue = activeSession?.type === 'stranger' 
    ? 'stranger' 
    : (activeChatId || 'stranger');
  
  // Handle tab changes - convert "stranger" string to actual stranger session ID
  const handleTabChange = (value: string) => {
    if (value === 'stranger' && strangerSession) {
      onSwitchChat(strangerSession.id);
    } else if (value === 'stranger') {
      // If clicking stranger tab but no stranger session, set activeChatId to null to show empty state
      onSwitchChat(null);
    } else {
      onSwitchChat(value);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleViewHistoryChat = (chat: ChatHistory) => {
    // Instead of opening a dialog, call the onViewHistoryChat prop to create a session
    if (onViewHistoryChat) {
      onViewHistoryChat(chat);
    }
    setIsFriendsSidebarOpen(false);
  };

  const handleSendFriendRequestFromHistory = (strangerId: string, strangerName: string) => {
    if (onSendFriendRequestFromHistory) {
      onSendFriendRequestFromHistory(strangerId, strangerName);
    }
  };

  return (
    <div className={`fixed inset-0 flex flex-col bg-white dark:bg-gray-950 overflow-hidden compact-mode`}>
      {/* Ultra Minimal Header */}
      <header className="flex-shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 h-9 relative z-50">
        <div className="h-full px-3 flex items-center justify-between gap-2">
          {/* Left: Mobile Menu Only */}
          <button
            onClick={() => {
              setSidebarInitialTab('friends');
              setIsFriendsSidebarOpen(true);
            }}
            className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <Menu className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Center: Current Active Chat Name ONLY */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-xs font-medium text-gray-900 dark:text-white truncate max-w-xs">
              {activeSession ? activeSession.participant.name : 'Whispa'}
            </h1>
          </div>

          {/* Right: History (Mobile) + Settings Button ONLY */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Sidebar - Friends (Desktop) */}
        <div 
          className={`hidden lg:flex bg-gray-50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 flex-col transition-all duration-300 ${
            isLeftSidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          {isLeftSidebarCollapsed ? (
            <div className="flex-1 flex flex-col overflow-hidden py-4 items-center gap-4">
              {/* Expand Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsLeftSidebarCollapsed(false)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Expand Sidebar</TooltipContent>
              </Tooltip>

              <div className="w-8 h-[1px] bg-gray-200 dark:bg-gray-800" />
              
              {/* User Profile - Moved to top to match expanded state */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setProfileDialogUser(userProfile)}
                    className="w-10 h-10 aspect-square flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all p-1"
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center text-lg shadow-sm relative overflow-hidden">
                        <div className={`absolute inset-0 ${userProfile.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`} />
                        <span className="relative z-10">{userProfile.avatar}</span>
                        {isAnonymous && (
                          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center z-20">
                            <Crown className="w-2 h-2 text-white" />
                          </div>
                        )}
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">My Profile</TooltipContent>
              </Tooltip>

              <div className="w-8 h-[1px] bg-gray-200 dark:bg-gray-800" />

              {/* Main Actions */}
              <div className="flex flex-col gap-2 w-full px-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setSidebarInitialTab('history');
                        setIsFriendsSidebarOpen(true);
                      }}
                      className="w-full aspect-square flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all relative"
                    >
                      <History className="w-5 h-5" />
                      {chatHistory.length > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">History</TooltipContent>
                </Tooltip>

                {friendRequests.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          setSidebarInitialTab('friends');
                          setIsFriendsSidebarOpen(true);
                        }}
                        className="w-full aspect-square flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all relative"
                      >
                        <Users className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {friendRequests.length} Friend Request{friendRequests.length !== 1 && 's'}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              <div className="w-8 h-[1px] bg-gray-200 dark:bg-gray-800" />

              {/* Online Friends List */}
              <ScrollArea className="flex-1 w-full px-2 min-h-0">
                <div className="flex flex-col gap-3 pb-4 items-center">
                  {onlineFriends.map((friend) => (
                    <Tooltip key={friend.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onStartFriendChat(friend)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setProfileDialogUser(friend);
                          }}
                          className="relative group"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg hover:scale-105 transition-transform ${friend.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                             {friend.avatar}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="flex items-center gap-2">
                        <span>{friend.name}</span>
                        {friend.isOnline && <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  
                  {/* Offline friends */}
                   {offlineFriends.slice(0, 5).map((friend) => (
                    <Tooltip key={friend.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onStartFriendChat(friend)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setProfileDialogUser(friend);
                          }}
                          className="relative group"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg hover:scale-105 transition-transform ${friend.avatarColor || 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                             {friend.avatar}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white dark:border-gray-900" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {friend.name} (Offline)
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </ScrollArea>
              
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h3 className="text-gray-900 dark:text-white">Friends</h3>
                <button
                  onClick={() => setIsLeftSidebarCollapsed(true)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              <FriendsSidebar
                friends={friends}
                friendRequests={friendRequests}
                userProfile={userProfile}
                isAnonymous={isAnonymous}
                onStartFriendChat={onStartFriendChat}
                onAcceptFriendRequest={onAcceptFriendRequest}
                onDeclineFriendRequest={onDeclineFriendRequest}
                onClaimAccount={onClaimAccount}
                onViewProfile={setProfileDialogUser}
                formatTime={formatTime}
                chatHistory={chatHistory}
                onViewHistoryChat={handleViewHistoryChat}
                onSendFriendRequestFromHistory={handleSendFriendRequestFromHistory}
                onUnfriend={onUnfriend}
                onDeleteHistoryChat={onDeleteHistoryChat}
                onClearAllHistory={onClearAllHistory}
              />
            </>
          )}
        </div>

        {/* Mobile Friends Sidebar */}
        <Sheet open={isFriendsSidebarOpen} onOpenChange={setIsFriendsSidebarOpen}>
          <SheetContent side="left" className="w-[85vw] max-w-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-0">
            <div className="sr-only">Friends and friend requests</div>
            <div className="sr-only">View and manage your friends list</div>
            <FriendsSidebar
              friends={friends}
              friendRequests={friendRequests}
              userProfile={userProfile}
              isAnonymous={isAnonymous}
              onStartFriendChat={(friend) => {
                onStartFriendChat(friend);
                setIsFriendsSidebarOpen(false);
              }}
              onAcceptFriendRequest={onAcceptFriendRequest}
              onDeclineFriendRequest={onDeclineFriendRequest}
              onClaimAccount={onClaimAccount}
              onViewProfile={(user) => {
                setProfileDialogUser(user);
                setIsFriendsSidebarOpen(false);
              }}
              formatTime={formatTime}
              chatHistory={chatHistory}
              initialTab={sidebarInitialTab}
              onViewHistoryChat={handleViewHistoryChat}
              onSendFriendRequestFromHistory={handleSendFriendRequestFromHistory}
              onUnfriend={onUnfriend}
              onDeleteHistoryChat={onDeleteHistoryChat}
              onClearAllHistory={onClearAllHistory}
            />
          </SheetContent>
        </Sheet>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-950">
          {/* Chat Tabs */}
          <Tabs value={activeTabValue} onValueChange={handleTabChange} className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <TabsList className="flex-shrink-0 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 rounded-none justify-start p-0 min-h-[44px] overflow-x-auto scrollbar-hide flex w-full relative z-20">
              {/* Locked Stranger Tab */}
              <TabsTrigger
                value="stranger"
                className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-950 text-gray-700 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white px-3 sm:px-6 py-2 sm:py-3 rounded-none border-r border-gray-200 dark:border-gray-800 relative flex-shrink-0"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Stranger</span>
                  {strangerSession && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
              </TabsTrigger>

              {/* Friend Chat Tabs */}
              {friendSessions.map((session) => (
                <TabsTrigger
                  key={session.id}
                  value={session.id}
                  className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-950 text-gray-700 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white px-3 sm:px-6 py-2 sm:py-3 rounded-none border-r border-gray-200 dark:border-gray-800 group relative flex-shrink-0"
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Icon indicator for history mode */}
                    {session.type === 'history' ? (
                      session.chatMode === 'video' ? (
                        <VideoIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" title="Video Chat History" />
                      ) : (
                        <MessageCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" title="Text Chat History" />
                      )
                    ) : null}
                    <span className="text-base sm:text-lg">{session.participant.avatar}</span>
                    <span className="text-xs sm:text-sm max-w-[80px] sm:max-w-none truncate">{session.participant.name}</span>
                    {/* Unread count badge */}
                    {session.unreadCount > 0 && activeChatId !== session.id && (
                      <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs flex items-center justify-center font-medium">
                        {session.unreadCount > 99 ? '99+' : session.unreadCount}
                      </span>
                    )}
                    {session.messages.length > 0 && session.unreadCount === 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">({session.messages.length})</span>
                    )}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseChat(session.id);
                      }}
                      className="ml-1 sm:ml-2 p-0.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          onCloseChat(session.id);
                        }
                      }}
                    >
                      <XIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600 dark:text-red-400" />
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Stranger Chat Content */}
            <TabsContent value="stranger" className="flex-1 flex flex-col mt-0 overflow-hidden min-h-0 bg-white dark:bg-gray-950">
              {isMatching ? (
                // Show Matching Screen Inline
                <MatchingScreen
                  onCancel={onCancelMatching}
                  onSuccess={onMatchingSuccess}
                  waitTime={matchingWaitTime}
                  region={selectedRegion}
                  genderFilter={selectedGenderFilter}
                />
              ) : strangerSession ? (
                <ChatScreen
                  session={strangerSession}
                  onSendMessage={(text) => onSendMessage(strangerSession.id, text)}
                  onSkipStranger={onSkipStranger}
                  onStopChat={() => onCloseChat(strangerSession.id)}
                  onSendFriendRequest={() => onSendFriendRequest(strangerSession.id)}
                  friendRequestSent={friendRequestsSent.has(strangerSession.participant.id)}
                  onViewProfile={() => setProfileDialogUser(strangerSession.participant)}
                  chatMode={chatMode}
                  cameraPermissionGranted={cameraPermissionGranted}
                  showCameraPermissionDialog={showCameraPermissionDialog}
                  onCameraAccessLost={onCameraAccessLost}
                  onStrangerLeft={onStrangerLeft}
                  isAppOnline={isAppOnline}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-950 dark:via-purple-950/20 dark:to-pink-950/20 p-4 sm:p-8 overflow-y-auto">
                  <div className="w-full max-w-4xl">
                    {/* Hero Section */}
                    <div className="text-center mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-3xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 shadow-xl shadow-purple-500/25 animate-in zoom-in duration-500">
                        <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 dark:from-white dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                        Start a Conversation
                      </h2>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                        Connect instantly with people around the world. Choose your mode and dive into meaningful conversations.
                      </p>
                    </div>

                    {/* Mode Selection Cards */}
                    <div className="mb-8 sm:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '100ms' }}>
                      <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Choose Your Mode</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto px-4">
                        {/* Text Chat Card */}
                        <button
                          onClick={() => onUpdateChatMode('text')}
                          className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                            chatMode === 'text'
                              ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/30 scale-[1.02] sm:scale-105'
                              : 'bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl hover:scale-[1.02]'
                          }`}
                        >
                          {/* Background Pattern */}
                          <div className={`absolute inset-0 opacity-10 ${chatMode === 'text' ? 'opacity-20' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
                          </div>

                          <div className="relative p-6 sm:p-8">
                            <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mb-4 sm:mb-5 transition-transform duration-300 ${
                              chatMode === 'text'
                                ? 'bg-white/20 backdrop-blur-sm'
                                : 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 group-hover:scale-110'
                            }`}>
                              <MessageCircle className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                chatMode === 'text' ? 'text-white' : 'text-purple-600 dark:text-purple-400'
                              }`} strokeWidth={2} />
                            </div>
                            
                            <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${
                              chatMode === 'text' ? 'text-white' : 'text-gray-900 dark:text-white'
                            }`}>
                              Text Chat
                            </h3>
                            
                            <p className={`text-sm sm:text-base leading-relaxed mb-4 ${
                              chatMode === 'text' ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              Connect through messages. Perfect for deep conversations and thoughtful exchanges.
                            </p>

                            <div className="flex items-center gap-2">
                              {chatMode === 'text' && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                  <span className="text-xs font-medium text-white">Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </button>

                        {/* Video Chat Card */}
                        <button
                          onClick={() => onUpdateChatMode('video')}
                          className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                            chatMode === 'video'
                              ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/30 scale-[1.02] sm:scale-105'
                              : 'bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl hover:scale-[1.02]'
                          }`}
                        >
                          {/* Background Pattern */}
                          <div className={`absolute inset-0 opacity-10 ${chatMode === 'video' ? 'opacity-20' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400"></div>
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl transform -translate-x-16 -translate-y-16"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl transform translate-x-12 translate-y-12"></div>
                          </div>

                          <div className="relative p-6 sm:p-8">
                            <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mb-4 sm:mb-5 transition-transform duration-300 relative ${
                              chatMode === 'video'
                                ? 'bg-white/20 backdrop-blur-sm'
                                : 'bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 group-hover:scale-110'
                            }`}>
                              <VideoIcon className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                chatMode === 'video' ? 'text-white' : 'text-pink-600 dark:text-pink-400'
                              }`} strokeWidth={2} />
                              {chatMode === 'video' && !cameraPermissionGranted && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-white dark:border-gray-900 rounded-full animate-pulse" />
                              )}
                            </div>
                            
                            <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${
                              chatMode === 'video' ? 'text-white' : 'text-gray-900 dark:text-white'
                            }`}>
                              Video Chat
                            </h3>
                            
                            <p className={`text-sm sm:text-base leading-relaxed mb-4 ${
                              chatMode === 'video' ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              Face-to-face connections. Experience authentic interactions in real-time.
                            </p>

                            <div className="flex items-center gap-2">
                              {chatMode === 'video' && cameraPermissionGranted && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                  <span className="text-xs font-medium text-white">Selected</span>
                                </div>
                              )}
                              {chatMode === 'video' && !cameraPermissionGranted && (
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                                  chatMode === 'video' ? 'bg-yellow-400/20 backdrop-blur-sm' : 'bg-yellow-50 dark:bg-yellow-900/20'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                                    chatMode === 'video' ? 'bg-yellow-200' : 'bg-yellow-500'
                                  }`}></div>
                                  <span className={`text-xs font-medium ${
                                    chatMode === 'video' ? 'text-white' : 'text-yellow-700 dark:text-yellow-400'
                                  }`}>
                                    Permission Required
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
                      <button
                        onClick={onStartRandomChat}
                        className="group relative inline-flex items-center gap-3 px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-700 hover:via-purple-600 hover:to-pink-700 text-white rounded-2xl transition-all duration-300 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/40 hover:scale-105 text-base sm:text-lg font-semibold overflow-hidden"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        
                        <span className="relative">Start Conversation</span>
                        <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>

                      {/* Settings Link */}
                      <div className="mt-6 sm:mt-8">
                        <button
                          onClick={() => setIsSettingsOpen(true)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 group"
                        >
                          <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                          <span className="text-sm font-medium">Matching Preferences</span>
                        </button>
                      </div>

                      {/* Current Settings Display */}
                      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{selectedRegion.flag} {selectedRegion.name}</span>
                        </div>
                        <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                          </div>
                          <span className="font-medium">
                            {matchingWaitTime === null ? 'No Timeout' : matchingWaitTime < 60 ? `${matchingWaitTime}s` : `${matchingWaitTime / 60}m`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 px-4 animate-in fade-in duration-700" style={{ animationDelay: '300ms' }}>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Anonymous & Safe</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Instant Matching</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Global Community</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Friend Chat Tabs Content */}
            {friendSessions.map((session) => {
              const isFriend = friends.some(f => f.id === session.participant.id);
              return (
                <TabsContent key={session.id} value={session.id} className="flex-1 flex flex-col mt-0 overflow-hidden min-h-0 bg-white dark:bg-gray-950">
                  <ChatScreen
                    session={session}
                    onSendMessage={(text) => onSendMessage(session.id, text)}
                    onSkipStranger={() => {}}
                    onStopChat={() => onCloseChat(session.id)}
                    onViewProfile={() => setProfileDialogUser(session.participant)}
                    chatMode={session.chatMode || 'text'}
                    onUpdateChatMode={onUpdateSessionChatMode ? (mode) => onUpdateSessionChatMode(session.id, mode) : undefined}
                    onSendFriendRequest={!isFriend ? () => onSendFriendRequest(session.id) : undefined}
                    friendRequestSent={!isFriend ? friendRequestsSent.has(session.participant.id) : undefined}
                    cameraPermissionGranted={cameraPermissionGranted}
                    showCameraPermissionDialog={showCameraPermissionDialog}
                    isAppOnline={isAppOnline}
                  />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>

      {/* Profile Dialog */}
      {profileDialogUser && (
        <ProfileDialog
          user={profileDialogUser}
          isOpen={!!profileDialogUser}
          onClose={() => setProfileDialogUser(null)}
          isCurrentUser={profileDialogUser.id === userProfile.id}
          onLogout={profileDialogUser.id === userProfile.id ? () => setIsLogoutConfirmOpen(true) : undefined}
          isFriend={friends.some(f => f.id === profileDialogUser.id)}
          onUnfriend={friends.some(f => f.id === profileDialogUser.id) ? onUnfriend : undefined}
          isAnonymous={isAnonymous}
          onClaimAccount={onClaimAccount}
          onSendFriendRequest={onSendFriendRequestFromHistory}
          friendRequestSent={friendRequestsSent.has(profileDialogUser.id)}
        />
      )}

      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedRegion={selectedRegion}
        matchingWaitTime={matchingWaitTime}
        onUpdateRegion={onUpdateRegion}
        onUpdateWaitTime={onUpdateWaitTime}
        selectedGenderFilter={selectedGenderFilter}
        onUpdateGenderFilter={onUpdateGenderFilter}
      />

      {/* Preferences Dialog - Theme, Profile, Logout */}
      <PreferencesDialog
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        userProfile={userProfile}
        isAnonymous={isAnonymous}
        themeMode={themeMode}
        onThemeChange={onThemeChange}
        onClaimAccount={onClaimAccount}
        soundEnabled={soundEnabled}
        onSoundToggle={setSoundEnabled}
        notificationsEnabled={notificationsEnabled}
        onNotificationsToggle={setNotificationsEnabled}
        onLogout={() => setIsLogoutConfirmOpen(true)}
        onUpdateProfile={onUpdateProfile}
        compactMode={compactMode}
        onCompactModeToggle={onCompactModeToggle}
      />

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmDialog
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={() => {
          setIsLogoutConfirmOpen(false);
          onLogout();
        }}
        isAnonymous={isAnonymous}
      />

      {/* Chat History Dialog */}
      <ChatHistoryDialog
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
        chat={selectedHistoryChat}
        onSendFriendRequest={handleSendFriendRequestFromHistory}
        friendRequestSent={selectedHistoryChat ? friendRequestsSent.has(selectedHistoryChat.strangerId) : false}
      />

      {/* Feature Announcement Dialog */}
      <FeatureAnnouncementDialog
        isOpen={showFeatureAnnouncement}
        onClose={handleCloseFeatureAnnouncement}
        version="v2.1"
        features={[
          {
            icon: 'star',
            title: 'Unread Message Indicators',
            description: 'Never miss a message! Chat tabs now show unread message counts with beautiful gradient badges so you always know when friends send you messages.',
            badge: 'NEW',
          },
          {
            icon: 'zap',
            title: 'Video Call Button',
            description: 'Start video calls with your friends instantly! Look for the new video call button in the chat header. Configure your camera and microphone preferences in Settings.',
            badge: 'NEW',
          },
          {
            icon: 'globe',
            title: 'Video Call Settings',
            description: 'Control who can call you and how! New settings let you enable/disable video calls, auto-enable camera, and auto-enable microphone. Find them in Settings → Chat.',
            badge: 'NEW',
          },
          {
            icon: 'sparkles',
            title: 'Coming Soon: Surprise Me Mode',
            description: 'Get ready for completely random global matching! Connect with anyone, anywhere in the world with no filters. True serendipity awaits!',
            badge: 'SOON',
          },
        ]}
        onTryFeature={() => {
          handleCloseFeatureAnnouncement();
          onStartRandomChat();
        }}
      />
    </div>
  );
}