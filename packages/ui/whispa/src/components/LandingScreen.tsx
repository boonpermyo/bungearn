import { useState } from 'react';
import { MessageCircle, Zap, Shield, Users, History, Settings, Clock, MessageSquare, TrendingUp, User, Globe, UserPlus, Check, X as XIcon } from 'lucide-react';
import { ChatHistory, Region, Friend, FriendRequest, UserProfile, ChatSession } from '../App';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { ProfileDialog } from './ProfileDialog';
import { TermsDialog, PrivacyDialog, RefundDialog } from './LegalDialogs';

interface LandingScreenProps {
  onStartChat: () => void;
  chatHistory: ChatHistory[];
  matchingWaitTime: number | null;
  onUpdateWaitTime: (time: number | null) => void;
  selectedRegion: Region;
  onUpdateRegion: (region: Region) => void;
  friends: Friend[];
  friendRequests: FriendRequest[];
  onStartFriendChat: (friend: Friend) => void;
  onAcceptFriendRequest: (id: string) => void;
  onDeclineFriendRequest: (id: string) => void;
  userProfile: UserProfile;
  activeSessions: ChatSession[];
  onEnterChatMode: (sessionId: string) => void;
}

export function LandingScreen({ 
  onStartChat, 
  chatHistory,
  matchingWaitTime,
  onUpdateWaitTime,
  selectedRegion,
  onUpdateRegion,
  friends,
  friendRequests,
  onStartFriendChat,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  userProfile,
  activeSessions,
  onEnterChatMode
}: LandingScreenProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profileDialogUser, setProfileDialogUser] = useState<Friend | UserProfile | null>(null);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  const regionOptions: { value: Region; label: string; flag: string; popularity: number }[] = [
    { value: 'worldwide', label: 'Worldwide', flag: '🌍', popularity: 95 },
    { value: 'asia', label: 'Asia', flag: '🌏', popularity: 85 },
    { value: 'europe', label: 'Europe', flag: '🇪🇺', popularity: 78 },
    { value: 'north-america', label: 'North America', flag: '🇺🇸', popularity: 72 },
    { value: 'south-america', label: 'South America', flag: '🇧🇷', popularity: 58 },
    { value: 'africa', label: 'Africa', flag: '🌍', popularity: 45 },
    { value: 'oceania', label: 'Oceania', flag: '🇦🇺', popularity: 42 },
  ];

  const waitTimeOptions = [
    { label: '15 seconds', value: 15 },
    { label: '30 seconds', value: 30 },
    { label: '1 minute', value: 60 },
    { label: 'Forever', value: null },
  ];

  const getWaitTimeLabel = () => {
    if (matchingWaitTime === null) return 'Forever';
    if (matchingWaitTime === 60) return '1 minute';
    return `${matchingWaitTime} seconds`;
  };

  const handleSelectWaitTime = (value: number | null) => {
    onUpdateWaitTime(value);
    setIsSettingsOpen(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Calculate statistics
  const totalChats = chatHistory.length;
  const totalDuration = chatHistory.reduce((sum, chat) => sum + chat.duration, 0);
  const averageDuration = totalChats > 0 ? Math.floor(totalDuration / totalChats) : 0;
  const longestChat = chatHistory.length > 0 
    ? chatHistory.reduce((longest, chat) => chat.duration > longest.duration ? chat : longest, chatHistory[0])
    : null;
  const endedByYou = chatHistory.filter(chat => chat.endedBy === 'you').length;
  const endedByStranger = chatHistory.filter(chat => chat.endedBy === 'stranger').length;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative">
      <div className="max-w-2xl w-full text-center space-y-8 pb-16">
        {/* Top Left - User Profile Button */}
        <div className="absolute top-6 left-6">
          <button
            onClick={() => setProfileDialogUser(userProfile)}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white pl-2 pr-4 py-2 rounded-xl transition-all"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xl ${userProfile.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
              {userProfile.avatar}
            </div>
            <span className="hidden sm:inline">{userProfile.name}</span>
          </button>
        </div>

        {/* Top Right Button - History Sheet */}
        <div className="absolute top-6 right-6">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl transition-all">
                <History className="w-5 h-5" />
                <span className="hidden sm:inline">History</span>
                {totalChats > 0 && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 rounded-full text-xs">
                    {totalChats}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xl bg-gradient-to-br from-slate-900 to-slate-800 border-white/20 text-white overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-white text-2xl">Chat History</SheetTitle>
                <SheetDescription className="text-white/70">
                  View your past conversations and statistics
                </SheetDescription>
              </SheetHeader>
              
              <Tabs defaultValue="history" className="w-full mt-6">
                <TabsList className="bg-white/10 backdrop-blur-sm border border-white/20 w-full">
                  <TabsTrigger value="history" className="data-[state=active]:bg-white/20 text-white flex-1">
                    History
                  </TabsTrigger>
                  <TabsTrigger value="statistics" className="data-[state=active]:bg-white/20 text-white flex-1">
                    Statistics
                  </TabsTrigger>
                </TabsList>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-4 mt-6">
                  {chatHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="bg-white/5 p-6 rounded-2xl mb-4">
                        <MessageSquare className="w-12 h-12 text-white/30" />
                      </div>
                      <p className="text-white/60">No conversations yet</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[calc(100vh-280px)]">
                      <div className="space-y-2 pr-4">
                        {chatHistory.map((chat) => (
                          <div
                            key={chat.id}
                            className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-lg p-3 transition-all cursor-pointer"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${chat.strangerAvatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                                  <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-white truncate">{chat.strangerName}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                                      chat.endedBy === 'you' 
                                        ? 'bg-purple-500/20 text-purple-300' 
                                        : 'bg-pink-500/20 text-pink-300'
                                    }`}>
                                      {chat.endedBy === 'you' ? 'You left' : 'They left'}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
                                    <span>{formatDate(chat.startTime)}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {formatDuration(chat.duration)}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <MessageSquare className="w-3 h-3" />
                                      {chat.messageCount}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>

                {/* Statistics Tab */}
                <TabsContent value="statistics" className="space-y-4 mt-6">
                  {chatHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="bg-white/5 p-6 rounded-2xl mb-4">
                        <TrendingUp className="w-12 h-12 text-white/30" />
                      </div>
                      <p className="text-white/60">No statistics yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Total Chats */}
                        <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                              <Users className="w-4 h-4 text-purple-300" />
                            </div>
                            <p className="text-white/60 text-xs">Total</p>
                          </div>
                          <p className="text-white text-3xl">{totalChats}</p>
                        </div>

                        {/* Average Duration */}
                        <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-pink-300" />
                            </div>
                            <p className="text-white/60 text-xs">Average</p>
                          </div>
                          <p className="text-white text-3xl">{formatDuration(averageDuration)}</p>
                        </div>
                      </div>

                      {/* Longest Chat */}
                      {longestChat && (
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white/60 text-xs">Longest Chat</p>
                                <p className="text-white text-xl">{formatDuration(longestChat.duration)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white/60 text-xs">with</p>
                              <p className="text-white text-sm">{longestChat.strangerName}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Who Ended Chats */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                        <h3 className="text-white text-sm mb-3">Who Ended Chats</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-purple-300">You</span>
                              <span className="text-white/80">{endedByYou} ({totalChats > 0 ? Math.round((endedByYou / totalChats) * 100) : 0}%)</span>
                            </div>
                            <div className="bg-white/5 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-purple-400 h-full transition-all duration-500"
                                style={{ width: `${totalChats > 0 ? (endedByYou / totalChats) * 100 : 0}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-pink-300">Stranger</span>
                              <span className="text-white/80">{endedByStranger} ({totalChats > 0 ? Math.round((endedByStranger / totalChats) * 100) : 0}%)</span>
                            </div>
                            <div className="bg-white/5 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-pink-500 to-pink-400 h-full transition-all duration-500"
                                style={{ width: `${totalChats > 0 ? (endedByStranger / totalChats) * 100 : 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo and Title */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl">
              <MessageCircle className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-white text-6xl">Whispa</h1>
          <p className="text-white/70 text-xl">Talk to strangers anonymously</p>
        </div>

        {/* Start Button and Settings */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md mx-auto" style={{ animationDelay: '100ms' }}>
          <button
            onClick={onStartChat}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-2xl">Start Random Talk</span>
          </button>
          
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl transition-all">
                <Settings className="w-5 h-5" />
                <span>Matching Settings</span>
                <span className="text-white/70">({getWaitTimeLabel()})</span>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-white/20 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Matching Settings</DialogTitle>
                <DialogDescription className="text-white/70">
                  Configure your matching preferences
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                {/* Region Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-purple-300" />
                    <h3 className="text-white">Region</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {regionOptions.map((region) => (
                      <button
                        key={region.value}
                        onClick={() => onUpdateRegion(region.value)}
                        className={`p-3 rounded-lg transition-all text-left relative overflow-hidden ${
                          selectedRegion === region.value
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                        }`}
                      >
                        {/* Popularity background bar */}
                        <div 
                          className="absolute inset-0 bg-white/5"
                          style={{ width: `${region.popularity}%` }}
                        />
                        
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{region.flag}</span>
                            <span className="text-sm">{region.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Popularity indicator */}
                            <div className="flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                region.popularity >= 80 ? 'bg-green-400' :
                                region.popularity >= 60 ? 'bg-yellow-400' :
                                'bg-orange-400'
                              }`} />
                              <span className="text-xs text-white/60">{region.popularity}%</span>
                            </div>
                            {selectedRegion === region.value && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    <span className="text-green-400">● High</span> • 
                    <span className="text-yellow-400"> ● Medium</span> • 
                    <span className="text-orange-400"> ● Low</span> activity
                  </p>
                </div>

                {/* Wait Time Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-pink-300" />
                    <h3 className="text-white">Wait Time</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {waitTimeOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleSelectWaitTime(option.value)}
                        className={`p-3 rounded-lg transition-all text-left ${
                          matchingWaitTime === option.value
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{option.label}</span>
                          {matchingWaitTime === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        {option.value === null && (
                          <p className="text-xs text-white/60 mt-1">
                            Keep searching until found
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Settings Summary */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white/60 text-xs uppercase mb-2">Current Settings</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-white">
                      <span className="text-white/60">Region:</span> {regionOptions.find(r => r.value === selectedRegion)?.flag} {regionOptions.find(r => r.value === selectedRegion)?.label}
                    </p>
                    <p className="text-white">
                      <span className="text-white/60">Wait Time:</span> {getWaitTimeLabel()}
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Chats */}
        {activeSessions.length > 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md mx-auto" style={{ animationDelay: '150ms' }}>
            <h3 className="text-white/70 text-sm uppercase">Active Chats</h3>
            <div className="space-y-2">
              {activeSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onEnterChatMode(session.id)}
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl transition-all"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${session.participant.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                    {session.participant.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white">{session.participant.name}</div>
                    <div className="text-white/60 text-xs">
                      {session.type === 'stranger' ? 'Stranger' : 'Friend'} • {session.messages.length} messages
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Friend Requests */}
        {friendRequests.length > 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md mx-auto" style={{ animationDelay: '175ms' }}>
            <h3 className="text-white/70 text-sm uppercase">Friend Requests</h3>
            <div className="space-y-2">
              {friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-xl"
                >
                  <button
                    onClick={() => setProfileDialogUser(request.from)}
                    className="hover:scale-110 transition-transform"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${request.from.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                      {request.from.avatar}
                    </div>
                  </button>
                  <div className="flex-1 text-left">
                    <div className="text-white">{request.from.name}</div>
                    <div className="text-white/60 text-xs">{request.from.bio}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAcceptFriendRequest(request.id)}
                      className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 rounded-lg transition-all"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeclineFriendRequest(request.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-lg transition-all"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-3 hover:bg-white/15 transition-all">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="text-white">Instant Match</h3>
            <p className="text-white/60 text-sm">Get connected with strangers in seconds</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-3 hover:bg-white/15 transition-all">
            <div className="bg-pink-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-pink-300" />
            </div>
            <h3 className="text-white">100% Anonymous</h3>
            <p className="text-white/60 text-sm">No registration, no personal info needed</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-3 hover:bg-white/15 transition-all">
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-indigo-300" />
            </div>
            <h3 className="text-white">Random People</h3>
            <p className="text-white/60 text-sm">Meet new people from around the world</p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="fixed bottom-0 left-0 w-full flex flex-wrap justify-center items-center gap-6 py-4 px-4 text-sm font-medium text-white/90 bg-black/40 backdrop-blur-md border-t border-white/10 z-[100]">
        <button onClick={() => setIsTermsOpen(true)} className="hover:text-purple-300 transition-colors">
          Terms of Service
        </button>
        <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-purple-300 transition-colors">
          Privacy Policy
        </button>
        <button onClick={() => setIsRefundOpen(true)} className="hover:text-purple-300 transition-colors">
          Refund Policy
        </button>
      </div>

      {/* Profile Dialog */}
      {profileDialogUser && (
        <ProfileDialog
          user={profileDialogUser}
          isOpen={!!profileDialogUser}
          onClose={() => setProfileDialogUser(null)}
          isCurrentUser={profileDialogUser.id === userProfile.id}
        />
      )}
      {/* Legal Dialogs */}
      <TermsDialog open={isTermsOpen} onOpenChange={setIsTermsOpen} />
      <PrivacyDialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen} />
      <RefundDialog open={isRefundOpen} onOpenChange={setIsRefundOpen} />
    </div>
  );
}