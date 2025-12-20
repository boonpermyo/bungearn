import { useState } from 'react';
import { Users, History, Lock, Settings, ChevronLeft, ChevronRight, Menu, X as XIcon } from 'lucide-react';
import { ChatSession, Friend, FriendRequest, UserProfile, ChatHistory, Region, ChatMode } from '../App';
import { ChatScreen } from './ChatScreen';
import { ProfileDialog } from './ProfileDialog';
import { FriendsSidebar } from './FriendsSidebar';
import { MatchingScreen } from './MatchingScreen';
import { StrangerChatHistory } from './StrangerChatHistory';
import { ThemeMode } from '../hooks/useTheme';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent } from './ui/sheet';
import { LogoutConfirmDialog } from './LogoutConfirmDialog';
import { PreferencesDialog } from './PreferencesDialog';
import { SettingsDialog } from './SettingsDialog';
import { StartConversationScreen } from './StartConversationScreen';

interface MainAppProps {
  chatSessions: ChatSession[];
  activeChatId: string | null;
  onSwitchChat: (sessionId: string) => void;
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
  onLogout: () => void;
  isMatching: boolean;
  onCancelMatching: () => void;
  onMatchingSuccess: () => void;
  chatMode: ChatMode;
  onUpdateChatMode: (mode: ChatMode) => void;
  cameraPermissionGranted: boolean;
  showCameraPermissionDialog: boolean;
  onCameraAccessLost?: (sessionId: string) => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
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
  onLogout,
  isMatching,
  onCancelMatching,
  onMatchingSuccess,
  chatMode,
  onUpdateChatMode,
  cameraPermissionGranted,
  showCameraPermissionDialog,
  onCameraAccessLost,
  themeMode,
  onThemeChange,
}: MainAppProps) {
  // UI State
  const [profileDialogUser, setProfileDialogUser] = useState<Friend | UserProfile | null>(null);
  const [isFriendsSidebarOpen, setIsFriendsSidebarOpen] = useState(false);
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Derived State
  const activeSession = chatSessions.find(s => s.id === activeChatId);
  const strangerSession = chatSessions.find(s => s.type === 'stranger' && s.isActive);
  const friendSessions = chatSessions.filter(s => s.type === 'friend' && s.isActive);
  
  const onlineFriends = friends.filter(f => f.isOnline);

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

  return (
    // GRID LAYOUT: Row 1 = Header, Row 2 = Main Body
    <div className="h-screen w-screen grid grid-rows-[56px_1fr] bg-black text-white overflow-hidden">
      
      {/* 1. HEADER */}
      <header className="row-start-1 col-span-full border-b border-gray-800 bg-gray-950/50 backdrop-blur-xl z-50 flex items-center px-4 justify-between gap-4">
        {/* Left Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFriendsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Center Title */}
        <div className="flex-1 flex justify-center min-w-0">
          <h1 className="text-sm font-medium text-white/90 truncate max-w-[200px] sm:max-w-xs">
            {activeSession ? activeSession.participant.name : 'Whispa'}
          </h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHistorySidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <History className="w-5 h-5 text-gray-300" />
          </button>

          <button
            onClick={() => setIsPreferencesOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </header>

      {/* 2. MAIN BODY */}
      <div className="row-start-2 col-span-full grid grid-cols-[auto_1fr_auto] overflow-hidden relative">
        
        {/* COL 1: LEFT SIDEBAR (Friends) */}
        <aside 
          className={`hidden lg:flex flex-col border-r border-gray-800 bg-gray-950/50 transition-all duration-300 overflow-hidden flex-shrink-0 ${
            isLeftSidebarCollapsed ? 'w-16 min-w-[4rem]' : 'w-80 min-w-[20rem] max-w-[20rem]'
          }`}
        >
          {isLeftSidebarCollapsed ? (
            // Collapsed
            <div className="flex-1 flex flex-col w-full h-full">
              <div className="h-12 flex items-center justify-center border-b border-gray-800 flex-none">
                <button
                  onClick={() => setIsLeftSidebarCollapsed(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {friendRequests.length > 0 && (
                <div className="py-3 flex justify-center border-b border-gray-800 flex-none">
                  <button
                    onClick={() => setIsFriendsSidebarOpen(true)}
                    className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
                  >
                    <Users className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                      {friendRequests.length}
                    </span>
                  </button>
                </div>
              )}
              
              <ScrollArea className="flex-1 w-full min-h-0">
                <div className="flex flex-col items-center gap-2 py-2">
                  {onlineFriends.slice(0, 50).map((friend) => (
                    <button
                      key={friend.id}
                      onClick={() => onStartFriendChat(friend)}
                      className="p-1 hover:bg-gray-800 rounded-lg transition-colors relative group"
                      title={friend.name}
                    >
                      <div className="text-2xl relative">
                        {friend.avatar}
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900" />
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            // Expanded
            <div className="flex-1 flex flex-col w-full min-w-0 h-full">
              <div className="h-12 flex items-center justify-between px-4 border-b border-gray-800 flex-none">
                <h3 className="font-medium text-white">Friends</h3>
                <button
                  onClick={() => setIsLeftSidebarCollapsed(true)}
                  className="p-1 hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden relative">
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
                />
              </div>
            </div>
          )}
        </aside>

        {/* COL 2: CENTER CHAT AREA */}
        <main className="flex flex-col min-w-0 overflow-hidden relative h-full bg-black">
          <Tabs 
            value={activeChatId || 'stranger'} 
            onValueChange={onSwitchChat} 
            className="flex flex-col h-full w-full"
          >
            {/* Tab Bar - Fixed Height */}
            <div className="flex-none h-12 bg-gray-950 border-b border-gray-800 w-full z-10">
              <TabsList className="bg-transparent p-0 h-full w-full justify-start rounded-none flex-nowrap overflow-x-auto scrollbar-hide">
                <TabsTrigger
                  value="stranger"
                  className="flex-none h-full rounded-none border-r border-gray-800 px-5 data-[state=active]:bg-black text-gray-400 data-[state=active]:text-white transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="text-sm font-medium">Stranger</span>
                    {strangerSession && (
                      <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    )}
                  </div>
                </TabsTrigger>

                {friendSessions.map((session) => (
                  <TabsTrigger
                    key={session.id}
                    value={session.id}
                    className="flex-none h-full rounded-none border-r border-gray-800 px-4 min-w-[120px] max-w-[240px] data-[state=active]:bg-black text-gray-400 data-[state=active]:text-white group"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-xl leading-none">{session.participant.avatar}</span>
                      <span className="truncate text-sm font-medium">{session.participant.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCloseChat(session.id);
                        }}
                        className="ml-auto p-1 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative w-full h-full overflow-hidden">
              
              {/* STRANGER CONTENT */}
              <TabsContent 
                value="stranger" 
                className="absolute inset-0 w-full h-full m-0 p-0 outline-none data-[state=inactive]:hidden"
              >
                {isMatching ? (
                  <div className="w-full h-full flex flex-col">
                    <MatchingScreen
                      onCancel={onCancelMatching}
                      onSuccess={onMatchingSuccess}
                      waitTime={matchingWaitTime}
                      region={selectedRegion}
                      genderFilter="all"
                    />
                  </div>
                ) : strangerSession ? (
                  <div className="w-full h-full flex flex-col">
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
                    />
                  </div>
                ) : (
                  // EMPTY STATE - Uses dedicated component
                  <StartConversationScreen 
                    onStartRandomChat={onStartRandomChat}
                    chatMode={chatMode}
                    onUpdateChatMode={onUpdateChatMode}
                    selectedRegion={selectedRegion}
                    matchingWaitTime={matchingWaitTime}
                    setIsSettingsOpen={setIsSettingsOpen}
                  />
                )}
              </TabsContent>

              {/* FRIEND CONTENT */}
              {friendSessions.map((session) => (
                <TabsContent 
                  key={session.id} 
                  value={session.id} 
                  className="absolute inset-0 w-full h-full m-0 p-0 outline-none data-[state=inactive]:hidden"
                >
                  <div className="w-full h-full flex flex-col">
                    <ChatScreen
                      session={session}
                      onSendMessage={(text) => onSendMessage(session.id, text)}
                      onSkipStranger={() => {}}
                      onStopChat={() => onCloseChat(session.id)}
                      onViewProfile={() => setProfileDialogUser(session.participant)}
                      chatMode={chatMode}
                    />
                  </div>
                </TabsContent>
              ))}

            </div>
          </Tabs>
        </main>

        {/* COL 3: RIGHT SIDEBAR (History) */}
        <aside 
          className={`hidden lg:flex flex-col border-l border-gray-800 bg-gray-950/50 transition-all duration-300 overflow-hidden flex-shrink-0 ${
            isRightSidebarCollapsed ? 'w-16 min-w-[4rem]' : 'w-80 min-w-[20rem] max-w-[20rem]'
          }`}
        >
          {isRightSidebarCollapsed ? (
             // Collapsed
            <div className="flex-1 flex flex-col w-full h-full">
              <div className="h-12 flex items-center justify-center border-b border-gray-800 flex-none">
                <button
                  onClick={() => setIsRightSidebarCollapsed(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="py-3 flex flex-col items-center gap-1 border-b border-gray-800 flex-none text-center">
                <History className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-600 font-medium">{chatHistory.length}</span>
              </div>
              <ScrollArea className="flex-1 w-full min-h-0">
                <div className="flex flex-col items-center gap-2 py-2">
                  {chatHistory.map((chat) => (
                    <button
                      key={chat.id}
                      className="p-1 hover:bg-gray-800 rounded-lg transition-colors group"
                      title={chat.strangerName}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                        {chat.strangerName.charAt(0)}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            // Expanded
            <div className="flex-1 flex flex-col w-full min-w-0 h-full">
              <div className="h-12 flex items-center justify-between px-4 border-b border-gray-800 flex-none">
                <div>
                  <h3 className="font-medium text-white">History</h3>
                  <p className="text-xs text-gray-500">{chatHistory.length} chats</p>
                </div>
                <button
                  onClick={() => setIsRightSidebarCollapsed(true)}
                  className="p-1 hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <StrangerChatHistory history={chatHistory} />
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* MOBILE SHEETS */}
      <Sheet open={isFriendsSidebarOpen} onOpenChange={setIsFriendsSidebarOpen}>
        <SheetContent side="left" className="w-[85vw] max-w-sm bg-black p-0 border-r border-gray-800">
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
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isHistorySidebarOpen} onOpenChange={setIsHistorySidebarOpen}>
        <SheetContent side="right" className="w-[85vw] max-w-sm bg-black p-0 border-l border-gray-800">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-lg font-medium text-white">History</h3>
            <p className="text-sm text-gray-500">{chatHistory.length} conversations</p>
          </div>
          <div className="h-[calc(100%-70px)]">
            <StrangerChatHistory history={chatHistory} />
          </div>
        </SheetContent>
      </Sheet>

      {/* DIALOGS */}
      {profileDialogUser && (
        <ProfileDialog
          user={profileDialogUser}
          isOpen={!!profileDialogUser}
          onClose={() => setProfileDialogUser(null)}
          isCurrentUser={profileDialogUser.id === userProfile.id}
          onLogout={profileDialogUser.id === userProfile.id ? () => setIsLogoutConfirmOpen(true) : undefined}
        />
      )}

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
      />

      <LogoutConfirmDialog
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={() => {
          setIsLogoutConfirmOpen(false);
          onLogout();
        }}
        isAnonymous={isAnonymous}
      />

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedRegion={selectedRegion}
        onUpdateRegion={onUpdateRegion}
        waitTime={matchingWaitTime}
        onUpdateWaitTime={onUpdateWaitTime}
      />
    </div>
  );
}