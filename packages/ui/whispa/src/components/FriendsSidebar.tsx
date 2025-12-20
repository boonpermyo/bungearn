import { useState } from 'react';
import { Users, UserPlus, Check, Search, Crown, History, MessageCircle, Clock, Video, Trash2, X } from 'lucide-react';
import { Friend, FriendRequest, UserProfile, ChatHistory } from '../App';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FriendRequestsDialog } from './FriendRequestsDialog';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface FriendsSidebarProps {
  friends: Friend[];
  friendRequests: FriendRequest[];
  userProfile: UserProfile;
  isAnonymous: boolean;
  onStartFriendChat: (friend: Friend) => void;
  onAcceptFriendRequest: (id: string) => void;
  onDeclineFriendRequest: (id: string) => void;
  onClaimAccount: () => void;
  onViewProfile: (user: Friend | UserProfile) => void;
  formatTime: (date: Date) => string;
  chatHistory: ChatHistory[];
  initialTab?: 'friends' | 'history';
  onViewHistoryChat?: (chat: ChatHistory) => void;
  onSendFriendRequestFromHistory?: (strangerId: string, strangerName: string) => void;
  onUnfriend: (friendId: string) => void;
  onDeleteHistoryChat?: (chatId: string) => void;
  onClearAllHistory?: () => void;
}

type FriendFilter = 'online' | 'offline';

export function FriendsSidebar({
  friends,
  friendRequests,
  userProfile,
  isAnonymous,
  onStartFriendChat,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onClaimAccount,
  onViewProfile,
  formatTime,
  chatHistory,
  initialTab = 'friends',
  onViewHistoryChat,
  onSendFriendRequestFromHistory,
  onUnfriend,
  onDeleteHistoryChat,
  onClearAllHistory,
}: FriendsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [friendFilter, setFriendFilter] = useState<FriendFilter>('online');
  const [showFriendRequestsDialog, setShowFriendRequestsDialog] = useState(false);
  const [showClearHistoryConfirm, setShowClearHistoryConfirm] = useState(false);

  const onlineFriends = friends.filter(f => f.isOnline);
  const offlineFriends = friends.filter(f => !f.isOnline);

  // Filter friends based on search and filter
  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         friend.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (friendFilter === 'online') return friend.isOnline;
    if (friendFilter === 'offline') return !friend.isOnline;
    return true;
  });

  // Filter history based on search
  const filteredHistory = chatHistory.filter(chat => {
    return chat.strangerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           chat.strangerBio?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
      {/* User Profile Header - Fixed at top */}
      <div className="flex-none p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-20">
        <button
          onClick={() => onViewProfile(userProfile)}
          className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg relative ${userProfile.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
            {userProfile.avatar}
            {isAnonymous && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                <Crown className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="font-medium text-gray-900 dark:text-white truncate text-sm flex items-center gap-1">
              {userProfile.name}
              {isAnonymous && (
                <span className="text-xs text-yellow-600 dark:text-yellow-500">(Guest)</span>
              )}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs truncate">
              {userProfile.bio || 'No bio'}
            </div>
          </div>
        </button>
      </div>

      {/* Tabs Container - Flex column to fill remaining space */}
      <Tabs defaultValue={initialTab} className="flex-1 flex flex-col min-h-0">
        {/* Tabs List - Fixed height */}
        <TabsList className="w-full grid grid-cols-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 rounded-none h-12 p-1 m-0 flex-none z-10">
          <TabsTrigger 
            value="friends"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm rounded-lg transition-all relative"
          >
            <Users className="w-4 h-4 mr-2" />
            <span className="font-medium">Friends</span>
            {friendRequests.length > 0 && (
              <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm rounded-lg transition-all relative"
          >
            <History className="w-4 h-4 mr-2" />
            <span className="font-medium">History</span>
            {chatHistory.length > 0 && (
              <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Friends Tab Content - Flex column to manage internal scrolling */}
        <TabsContent value="friends" className="flex-1 flex flex-col min-h-0 mt-0 data-[state=inactive]:hidden">
          
          {/* Header Section (Requests + Search) - Fixed non-scrolling part */}
          <div className="flex-none flex flex-col bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
            {friendRequests.length > 0 && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setShowFriendRequestsDialog(true)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 border border-purple-200 dark:border-purple-800 rounded-lg transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${userProfile.avatarColor || 'bg-gradient-to-br from-purple-600 to-pink-600'}`}>
                      <UserPlus className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      Friend Requests
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                      {friendRequests.length}
                    </div>
                  </div>
                </button>
              </div>
            )}
            
            <div className="p-3 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
                <Input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-500"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setFriendFilter('online')}
                  className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1 ${
                    friendFilter === 'online'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${friendFilter === 'online' ? 'bg-white' : 'bg-green-500'}`} />
                  Online {onlineFriends.length > 0 && `(${onlineFriends.length})`}
                </button>
                <button
                  onClick={() => setFriendFilter('offline')}
                  className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1 ${
                    friendFilter === 'offline'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${friendFilter === 'offline' ? 'bg-white' : 'bg-gray-400'}`} />
                  Offline {offlineFriends.length > 0 && `(${offlineFriends.length})`}
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Content - Native Scroll */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-white dark:bg-gray-900 p-2">
            {filteredFriends.length > 0 ? (
              <div className="space-y-0.5">
                {filteredFriends.map((friend) => (
                  <button
                    key={friend.id}
                    onClick={() => onStartFriendChat(friend)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onViewProfile(friend);
                    }}
                    className="w-full flex items-center gap-3 px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                  >
                    <div className="relative flex-shrink-0">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProfile(friend);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer hover:scale-105 transition-transform ${
                        friend.avatarColor || (friend.isOnline 
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                          : 'bg-gradient-to-br from-gray-400 to-gray-500')
                      }`}>
                        {friend.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                        friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {friend.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {friend.isOnline ? friend.bio : (friend.lastSeen ? `Last seen ${formatTime(friend.lastSeen)}` : 'Offline')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <Users className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                {searchQuery ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No friends found matching "{searchQuery}"
                  </p>
                ) : friends.length === 0 ? (
                  <>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      No friends yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                      Start chatting with strangers and add them as friends!
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No {friendFilter} friends
                  </p>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent value="history" className="flex-1 flex flex-col min-h-0 mt-0 data-[state=inactive]:hidden">
          {/* History Actions Header */}
          {chatHistory.length > 0 && (
            <div className="flex-none p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Recent Chats ({chatHistory.length})
              </span>
              {onClearAllHistory && (
                <button
                  onClick={() => setShowClearHistoryConfirm(true)}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear All
                </button>
              )}
            </div>
          )}

          {/* Clear History Confirmation */}
          {showClearHistoryConfirm && (
            <div className="p-3 m-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-xs text-red-800 dark:text-red-200 mb-2 font-medium">
                Are you sure? This will delete all your chat history.
              </p>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setShowClearHistoryConfirm(false)}
                  className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onClearAllHistory?.();
                    setShowClearHistoryConfirm(false);
                  }}
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Confirm Clear
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto min-h-0 bg-white dark:bg-gray-900 p-2">
            {chatHistory.length === 0 ? (
              <div className="text-center py-12 px-4">
                <History className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                  No chat history yet
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs">
                  Start chatting with strangers to build your history!
                </p>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-12 px-4">
                 <Search className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                 <p className="text-gray-500 dark:text-gray-400 text-sm">
                   No history found matching "{searchQuery}"
                 </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 transition-colors group relative"
                  >
                    {/* Delete Button (Visible on Hover) */}
                    {onDeleteHistoryChat && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteHistoryChat(chat.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 z-10"
                        title="Delete chat"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProfile({
                            id: chat.strangerId,
                            name: chat.strangerName,
                            avatar: chat.strangerAvatar,
                            avatarColor: chat.strangerAvatarColor,
                            bio: chat.strangerBio,
                            region: chat.strangerRegion,
                            isOnline: false, // Default for history view
                          });
                        }}
                        className="flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
                        title="View Profile"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg relative ${chat.strangerAvatarColor || 'bg-gradient-to-br from-blue-500 to-purple-500'}`}>
                          {chat.strangerAvatar}
                          {chat.becameFriend && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                      </button>

                      {/* Chat Content */}
                      <button
                        onClick={() => onViewHistoryChat?.(chat)}
                        className="flex-1 min-w-0 text-left hover:bg-gray-50 dark:hover:bg-gray-750 -m-1 p-1 rounded transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1 pr-6">
                          <div className="font-medium text-gray-900 dark:text-white truncate text-sm">
                            {chat.strangerName}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            {formatDuration(chat.duration)}
                          </div>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs truncate mb-2">
                          {chat.strangerBio}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <MessageCircle className="w-3 h-3" />
                              <span>{chat.messageCount}</span>
                            </div>
                            {chat.chatMode === 'video' && (
                              <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                                <Video className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(chat.startTime)}
                          </div>
                        </div>
                        {chat.becameFriend && (
                          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                              <Check className="w-3 h-3" />
                              <span>Now friends</span>
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Friend Requests Dialog */}
      <FriendRequestsDialog
        isOpen={showFriendRequestsDialog}
        onClose={() => setShowFriendRequestsDialog(false)}
        friendRequests={friendRequests}
        onAcceptFriendRequest={onAcceptFriendRequest}
        onDeclineFriendRequest={onDeclineFriendRequest}
        onViewProfile={onViewProfile}
      />
    </div>
  );
}