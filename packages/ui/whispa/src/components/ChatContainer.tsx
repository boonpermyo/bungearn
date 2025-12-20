import { useState } from 'react';
import { X, Send, UserPlus, Users as UsersIcon } from 'lucide-react';
import { ChatSession, Friend, UserProfile } from '../App';
import { ChatScreen } from './ChatScreen';
import { FriendsSidebar } from './FriendsSidebar';
import { ProfileDialog } from './ProfileDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface ChatContainerProps {
  sessions: ChatSession[];
  activeChatId: string | null;
  onSwitchChat: (id: string) => void;
  onSendMessage: (sessionId: string, text: string) => void;
  onSkipStranger: () => void;
  onStopChat: (sessionId: string, endedBy: 'you' | 'stranger') => void;
  onStrangerLeft: () => void;
  onSendFriendRequest: (sessionId: string) => void;
  friends: Friend[];
  onStartFriendChat: (friend: Friend) => void;
  userProfile: UserProfile;
}

export function ChatContainer({
  sessions,
  activeChatId,
  onSwitchChat,
  onSendMessage,
  onSkipStranger,
  onStopChat,
  onSendFriendRequest,
  friends,
  onStartFriendChat,
  userProfile,
}: ChatContainerProps) {
  const [confirmDialog, setConfirmDialog] = useState<{
    type: 'next' | 'stop';
    sessionId: string;
  } | null>(null);
  const [friendRequestSent, setFriendRequestSent] = useState<Set<string>>(new Set());
  const [showFriendsSidebar, setShowFriendsSidebar] = useState(true);
  const [profileDialogUser, setProfileDialogUser] = useState<Friend | UserProfile | null>(null);

  const activeSession = sessions.find(s => s.id === activeChatId);

  const handleConfirmNext = () => {
    if (confirmDialog) {
      onSkipStranger();
      setConfirmDialog(null);
    }
  };

  const handleConfirmStop = () => {
    if (confirmDialog) {
      onStopChat(confirmDialog.sessionId, 'you');
      setConfirmDialog(null);
    }
  };

  const handleSendFriendRequest = (sessionId: string) => {
    onSendFriendRequest(sessionId);
    setFriendRequestSent(new Set([...friendRequestSent, sessionId]));
  };

  const handleCloseChat = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session?.type === 'stranger') {
      setConfirmDialog({ type: 'stop', sessionId });
    } else {
      onStopChat(sessionId, 'you');
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Friends Sidebar */}
      <FriendsSidebar
        isOpen={showFriendsSidebar}
        onToggle={() => setShowFriendsSidebar(!showFriendsSidebar)}
        friends={friends}
        sessions={sessions}
        onStartChat={onStartFriendChat}
        onViewProfile={(friend) => setProfileDialogUser(friend)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Tabs */}
        {sessions.length > 0 && (
          <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 flex items-center overflow-x-auto">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSwitchChat(session.id)}
                className={`flex items-center gap-2 px-4 py-3 border-r border-white/10 transition-all min-w-[200px] ${
                  session.id === activeChatId
                    ? 'bg-white/10 text-white'
                    : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-xl">{session.participant.avatar}</span>
                <div className="flex-1 text-left truncate">
                  <div className="truncate text-sm">{session.participant.name}</div>
                  <div className="text-xs text-white/50">
                    {session.type === 'stranger' ? 'Stranger' : 'Friend'}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseChat(session.id);
                  }}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </button>
            ))}
          </div>
        )}

        {/* Active Chat */}
        {activeSession ? (
          <div className="flex-1 flex flex-col">
            <ChatScreen
              session={activeSession}
              onSendMessage={(text) => onSendMessage(activeSession.id, text)}
              onSkipStranger={() => setConfirmDialog({ type: 'next', sessionId: activeSession.id })}
              onStopChat={() => setConfirmDialog({ type: 'stop', sessionId: activeSession.id })}
              onSendFriendRequest={() => handleSendFriendRequest(activeSession.id)}
              friendRequestSent={friendRequestSent.has(activeSession.id)}
              onViewProfile={() => setProfileDialogUser(activeSession.participant as Friend)}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white/60">
              <UsersIcon className="w-16 h-16 mx-auto mb-4 text-white/40" />
              <p>Select a chat or start a new conversation</p>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialogs */}
      <AlertDialog open={confirmDialog?.type === 'next'} onOpenChange={() => setConfirmDialog(null)}>
        <AlertDialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Skip this stranger?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              You'll be matched with a new random stranger. This conversation will end.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmNext}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Skip & Find New
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmDialog?.type === 'stop'} onOpenChange={() => setConfirmDialog(null)}>
        <AlertDialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">End this conversation?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This will close the chat. You can always start a new conversation later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmStop}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              End Chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Profile Dialog */}
      {profileDialogUser && (
        <ProfileDialog
          user={profileDialogUser}
          isOpen={!!profileDialogUser}
          onClose={() => setProfileDialogUser(null)}
          isCurrentUser={profileDialogUser.id === userProfile.id}
        />
      )}
    </div>
  );
}
