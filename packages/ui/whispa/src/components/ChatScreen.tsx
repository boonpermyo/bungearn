import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Send, SkipForward, X, UserPlus, UserCheck, Check, CheckCheck, User, Flag, Ban, MessageCircle, Video as VideoIcon, History as HistoryIcon, Smile, WifiOff, Clock, AlertCircle } from 'lucide-react';
import { ChatSession, ChatMode } from '../App';
import { VideoChat } from './VideoChat';
import { ReportDialog } from './ReportDialog';
import { useSettings } from '../hooks/useSettings';
import { toast } from 'sonner';
import { SkipConfirmDialog } from './SkipConfirmDialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface ChatScreenProps {
  session: ChatSession;
  onSendMessage: (text: string) => void;
  onSkipStranger: () => void;
  onStopChat: () => void;
  onSendFriendRequest?: () => void;
  friendRequestSent?: boolean;
  onViewProfile: () => void;
  isMatching?: boolean;
  chatMode?: ChatMode;
  onUpdateChatMode?: (mode: ChatMode) => void;
  cameraPermissionGranted?: boolean;
  showCameraPermissionDialog?: boolean;
  onCameraAccessLost?: (sessionId: string) => void;
  onStrangerLeft?: () => void;
  isAppOnline?: boolean;
}

export function ChatScreen({
  session,
  onSendMessage,
  onSkipStranger,
  onStopChat,
  onSendFriendRequest,
  friendRequestSent,
  onViewProfile,
  isMatching,
  chatMode = 'text',
  onUpdateChatMode,
  cameraPermissionGranted,
  showCameraPermissionDialog,
  onCameraAccessLost,
  onStrangerLeft,
  isAppOnline = true,
}: ChatScreenProps) {
  const { settings, updateSetting } = useSettings();
  const [inputMessage, setInputMessage] = useState('');
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [showEndChatConfirm, setShowEndChatConfirm] = useState(false);
  const [emojiPopoverOpen, setEmojiPopoverOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check if this user is blocked
  const isBlocked = settings.blockedUsers.includes(session.participant.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages, session.isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputMessage]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleReport = (reason: string, details: string) => {
    // derive severity from reason
    let severity = 'medium';
    if (reason === 'Underage User' || reason === 'Threats' || reason === 'Inappropriate Content') {
      severity = 'critical';
    } else if (reason === 'Harassment' || reason === 'Fake Profile') {
      severity = 'high';
    }

    const reportData = {
      id: `r-${Date.now()}`,
      reporter: 'Current User', // In real app, this is me
      reported: session.participant.name,
      reportedId: session.participant.id,
      reason,
      details,
      status: 'pending',
      time: 'Just now',
      severity,
      chatTranscript: session.messages.map(m => ({
        id: m.id,
        sender: m.isMe ? 'Current User' : session.participant.name,
        text: m.text,
        time: formatTime(m.timestamp),
        isFlagged: false // Default
      })),
      aiAnalysis: {
        flagged: false, // Default
        confidence: 0,
        reason: 'Pending analysis'
      }
    };

    console.log('--------------------------------------------------');
    console.log('🚀 SIMULATING BACKEND CALL: SUBMIT REPORT');
    console.log('Payload:', JSON.stringify(reportData, null, 2));
    console.log('--------------------------------------------------');

    toast.success(`Report submitted: ${reason}`);
    setShowReportDialog(false);
  };

  const handleBlock = () => {
    updateSetting('blockedUsers', [...settings.blockedUsers, session.participant.id]);
    toast.success(`Blocked ${session.participant.name}`);
    onStopChat();
  };

  const handleSkip = () => {
    onSkipStranger();
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = inputMessage.substring(0, start) + emoji + inputMessage.substring(end);
      setInputMessage(newText);
      
      // Focus and set cursor position after emoji
      setTimeout(() => {
        textarea.focus();
        const newPos = start + emoji.length;
        textarea.setSelectionRange(newPos, newPos);
      }, 0);
    } else {
      setInputMessage(inputMessage + emoji);
    }
    setEmojiPopoverOpen(false);
  };

  // Common emojis
  const emojis = [
    '😊', '😂', '❤️', '👍', '👋', '🎉', '😍', '🤔',
    '😎', '😢', '😭', '😱', '🔥', '💯', '✨', '🙌',
    '👏', '🙏', '💪', '🎯', '🚀', '⭐', '💖', '😉',
    '😜', '🥰', '😇', '🤗', '🤩', '🥳', '😴', '🙄',
    '😏', '🤭', '🤫', '🤨', '😐', '😑', '😶', '🙃',
    '😌', '😋', '😛', '🤤', '🤓', '😳', '🥺', '😤',
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full min-h-0 overflow-hidden">
      {/* Video Chat Section - Left Side */}
      {chatMode === 'video' && session.type !== 'history' && (
        <div className="w-full lg:w-1/2 h-[35vh] lg:h-auto lg:flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-black relative z-20">
          <VideoChat
            participant={session.participant}
            onEndCall={onStopChat}
            onSkipStranger={session.type === 'stranger' ? onSkipStranger : undefined}
            onSendFriendRequest={session.type === 'stranger' ? onSendFriendRequest : undefined}
            onReport={() => setShowReportDialog(true)}
            friendRequestSent={friendRequestSent}
            isStranger={session.type === 'stranger'}
            onCameraAccessLost={onCameraAccessLost ? () => onCameraAccessLost(session.id) : undefined}
          />
        </div>
      )}

      {/* Video History Preview - Static Display for History Sessions */}
      {chatMode === 'video' && session.type === 'history' && (
        <div className="w-full lg:w-1/2 h-[35vh] min-h-[250px] lg:h-full lg:min-h-0 lg:flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative z-0 flex flex-col overflow-hidden">
          {/* Static Video Preview - Flex Layout with 'my-auto' Centering */}
          <div className="flex-1 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent relative z-10">
            {/* 
              Safe Center Layout:
              - Outer: 'min-h-full flex flex-col'. Ensures full height availability.
              - Inner: 'my-auto'. Centers vertically when possible.
              - Overflow: 'my-auto' collapses to zero, 'p-8' prevents edge clipping.
            */}
            <div className="min-h-full flex flex-col items-center p-8">
              <div className="my-auto flex flex-col items-center text-center w-full max-w-md">
                {/* Large Avatar - Responsive Sizing */}
                <div className={`
                  w-20 h-20 text-4xl
                  sm:w-28 sm:h-28 sm:text-5xl
                  lg:w-40 lg:h-40 lg:text-7xl 
                  rounded-full flex items-center justify-center shadow-2xl mb-4 lg:mb-6 flex-shrink-0
                  ${session.participant.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}
                `}>
                  {session.participant.avatar}
                </div>
                
                {/* User Info */}
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-medium mb-1.5">{session.participant.name}</h3>

                

              </div>
            </div>
          </div>

          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-400 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 rounded-full blur-3xl transform translate-x-32 translate-y-32"></div>
          </div>
        </div>
      )}

      {/* Text Chat Section - Right Side */}
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-900 w-full relative z-10">
        {/* Offline Banner */}
        {!isAppOnline && (
          <div className="bg-red-500 text-white px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-2">
            <WifiOff className="w-3.5 h-3.5" />
            You are offline. Messages will be sent when you're back online.
          </div>
        )}
        
        {/* Compact Professional Header */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 h-14 flex items-center justify-between">
            {/* Left: User Info */}
            <button
              onClick={onViewProfile}
              className="flex items-center gap-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5 -ml-2 transition-all min-w-0 flex-1 mr-2"
            >
              <div className="relative flex-shrink-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${session.participant.avatarColor || 'bg-gradient-to-br from-purple-600 to-pink-600'}`}>
                  {session.participant.avatar}
                </div>
                {session.type === 'history' ? (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white dark:border-gray-900" />
                ) : (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                )}
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-gray-900 dark:text-white font-medium text-sm truncate">{session.participant.name}</h2>
                  {session.type === 'history' && (
                    <div className="flex-shrink-0">
                      {session.chatMode === 'video' ? (
                        <VideoIcon className="w-3 h-3 text-purple-600 dark:text-purple-400" title="Video Chat History" />
                      ) : (
                        <MessageCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" title="Text Chat History" />
                      )}
                    </div>
                  )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                  {session.type === 'history' ? 'Chat History (Read Only)' : 'Active now'}
                </p>
              </div>
            </button>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Video Call Button - Only for friends */}
              {session.type === 'friend' && onUpdateChatMode && (
                <button
                  onClick={() => {
                    const newMode = chatMode === 'text' ? 'video' : 'text';
                    toast.info(newMode === 'video' ? 'Starting video call...' : 'Ending video call...');
                    onUpdateChatMode(newMode);
                  }}
                  className={`p-2 rounded-lg transition-all shadow-sm ${
                    chatMode === 'video' 
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  }`}
                  title={chatMode === 'video' ? "End video call" : "Start video call"}
                >
                  <VideoIcon className="w-4 h-4" />
                </button>
              )}
              
              {onSendFriendRequest && (
                <button
                  onClick={onSendFriendRequest}
                  disabled={friendRequestSent}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium text-xs ${
                    friendRequestSent
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-sm'
                  }`}
                  title={friendRequestSent ? 'Friend request sent' : 'Send friend request'}
                >
                  {friendRequestSent ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Sent</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add Friend</span>
                    </>
                  )}
                </button>
              )}
              
              {session.type === 'stranger' && (
                <>
                  <button
                    onClick={() => setShowReportDialog(true)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-500 dark:text-gray-400"
                    title="Report user"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setShowBlockConfirm(true)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    title="Block user"
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area - Compact Design */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 px-3 py-3">
          <div className="max-w-4xl mx-auto space-y-1">
            {[...session.messages, 
              // Mock Data for Overflow Testing
              { id: 'm1', sender: 'stranger' as const, text: 'Hey there! 👋 Welcome to the chat.', timestamp: new Date(Date.now() - 3600000), isRead: true },
              { id: 'm2', sender: 'you' as const, text: 'Hi! Thanks for having me.', timestamp: new Date(Date.now() - 3540000), status: 'sent' as const, isRead: true },
              { id: 'm3', sender: 'stranger' as const, text: 'I wanted to show you how this chat handles long messages. For example, if I type a really long sentence, it should wrap nicely onto multiple lines without breaking the layout. 📜', timestamp: new Date(Date.now() - 3480000), isRead: true },
              { id: 'm4', sender: 'you' as const, text: 'That looks great! What about emojis? 🚀 ⭐️ 🌙', timestamp: new Date(Date.now() - 3420000), status: 'sent' as const, isRead: true },
              { id: 'm5', sender: 'stranger' as const, text: 'Emojis work perfectly! Also, here is a system message below.', timestamp: new Date(Date.now() - 3360000), isRead: true },
              { id: 'm6', sender: 'system' as const, text: 'User Sarah joined the conversation', timestamp: new Date(Date.now() - 3300000) },
              { id: 'm7', sender: 'stranger' as const, text: 'See? It centers the system message.', timestamp: new Date(Date.now() - 3240000), isRead: true },
              { id: 'm8', sender: 'you' as const, text: 'Nice! Let\'s fill up the screen to test scrolling.', timestamp: new Date(Date.now() - 3180000), status: 'sent' as const, isRead: true },
              { id: 'm9', sender: 'stranger' as const, text: 'Sure thing! Message 1...', timestamp: new Date(Date.now() - 3120000), isRead: true },
              { id: 'm10', sender: 'you' as const, text: 'Message 2...', timestamp: new Date(Date.now() - 3060000), status: 'sent' as const, isRead: true },
              { id: 'm11', sender: 'stranger' as const, text: 'Message 3...', timestamp: new Date(Date.now() - 3000000), isRead: true },
              { id: 'm12', sender: 'you' as const, text: 'Message 4...', timestamp: new Date(Date.now() - 2940000), status: 'sent' as const, isRead: true },
              { id: 'm13', sender: 'stranger' as const, text: 'Message 5...', timestamp: new Date(Date.now() - 2880000), isRead: true },
              { id: 'm14', sender: 'you' as const, text: 'Message 6...', timestamp: new Date(Date.now() - 2820000), status: 'sent' as const, isRead: true },
              { id: 'm15', sender: 'stranger' as const, text: 'Message 7...', timestamp: new Date(Date.now() - 2760000), isRead: true },
              { id: 'm16', sender: 'you' as const, text: 'Message 8...', timestamp: new Date(Date.now() - 2700000), status: 'sent' as const, isRead: true },
              { id: 'm17', sender: 'stranger' as const, text: 'Message 9...', timestamp: new Date(Date.now() - 2640000), isRead: true },
              { id: 'm18', sender: 'you' as const, text: 'Message 10!', timestamp: new Date(Date.now() - 2580000), status: 'sent' as const, isRead: true },
            ].length === 0 ? (
              <div className="min-h-full flex flex-col items-center py-20">
                <div className="my-auto text-center space-y-3 max-w-md">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-3xl ${session.participant.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                    {session.participant.avatar}
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white text-lg mb-1">
                      {session.participant.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Send a message to start chatting 👋
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              [...session.messages, 
                // Mock Data for Overflow Testing (Same as above)
                { id: 'm1', sender: 'stranger' as const, text: 'Hey there! 👋 Welcome to the chat.', timestamp: new Date(Date.now() - 3600000), isRead: true },
                { id: 'm2', sender: 'you' as const, text: 'Hi! Thanks for having me.', timestamp: new Date(Date.now() - 3540000), status: 'sent' as const, isRead: true },
                { id: 'm3', sender: 'stranger' as const, text: 'I wanted to show you how this chat handles long messages. For example, if I type a really long sentence, it should wrap nicely onto multiple lines without breaking the layout. 📜', timestamp: new Date(Date.now() - 3480000), isRead: true },
                { id: 'm4', sender: 'you' as const, text: 'That looks great! What about emojis? 🚀 ⭐️ 🌙', timestamp: new Date(Date.now() - 3420000), status: 'sent' as const, isRead: true },
                { id: 'm5', sender: 'stranger' as const, text: 'Emojis work perfectly! Also, here is a system message below.', timestamp: new Date(Date.now() - 3360000), isRead: true },
                { id: 'm6', sender: 'system' as const, text: 'User Sarah joined the conversation', timestamp: new Date(Date.now() - 3300000) },
                { id: 'm7', sender: 'stranger' as const, text: 'See? It centers the system message.', timestamp: new Date(Date.now() - 3240000), isRead: true },
                { id: 'm8', sender: 'you' as const, text: 'Nice! Let\'s fill up the screen to test scrolling.', timestamp: new Date(Date.now() - 3180000), status: 'sent' as const, isRead: true },
                { id: 'm9', sender: 'stranger' as const, text: 'Sure thing! Message 1...', timestamp: new Date(Date.now() - 3120000), isRead: true },
                { id: 'm10', sender: 'you' as const, text: 'Message 2...', timestamp: new Date(Date.now() - 3060000), status: 'sent' as const, isRead: true },
                { id: 'm11', sender: 'stranger' as const, text: 'Message 3...', timestamp: new Date(Date.now() - 3000000), isRead: true },
                { id: 'm12', sender: 'you' as const, text: 'Message 4...', timestamp: new Date(Date.now() - 2940000), status: 'sent' as const, isRead: true },
                { id: 'm13', sender: 'stranger' as const, text: 'Message 5...', timestamp: new Date(Date.now() - 2880000), isRead: true },
                { id: 'm14', sender: 'you' as const, text: 'Message 6...', timestamp: new Date(Date.now() - 2820000), status: 'sent' as const, isRead: true },
                { id: 'm15', sender: 'stranger' as const, text: 'Message 7...', timestamp: new Date(Date.now() - 2760000), isRead: true },
                { id: 'm16', sender: 'you' as const, text: 'Message 8...', timestamp: new Date(Date.now() - 2700000), status: 'sent' as const, isRead: true },
                { id: 'm17', sender: 'stranger' as const, text: 'Message 9...', timestamp: new Date(Date.now() - 2640000), isRead: true },
                { id: 'm18', sender: 'you' as const, text: 'Message 10!', timestamp: new Date(Date.now() - 2580000), status: 'sent' as const, isRead: true },
              ].map((message, index, array) => {
                const prevMessage = index > 0 ? array[index - 1] : null;
                const nextMessage = index < array.length - 1 ? array[index + 1] : null;
                const isNewUser = !prevMessage || prevMessage.sender !== message.sender;
                const isLastInGroup = !nextMessage || nextMessage.sender !== message.sender;
                const timeDiff = prevMessage ? message.timestamp.getTime() - prevMessage.timestamp.getTime() : 0;
                const showTimestamp = !prevMessage || timeDiff > 300000; // 5 minutes
                
                const isYou = message.sender === 'you';

                return (
                  <div key={message.id}>
                    {/* Timestamp Divider */}
                    {showTimestamp && (
                      <div className="flex items-center justify-center my-6">
                        <div className="px-3 py-1 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-xs text-gray-600 dark:text-gray-400">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    )}

                    {message.sender === 'system' ? (
                      /* System Message */
                      <div className="flex justify-center my-3">
                        <div className="px-4 py-2 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl max-w-sm">
                          <p className="text-gray-700 dark:text-gray-300 text-xs text-center">{message.text}</p>
                        </div>
                      </div>
                    ) : (
                      /* Regular Message - iMessage Bubble Style */
                      <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} ${isNewUser ? 'mt-4' : 'mt-1'}`}>
                        <div className={`flex items-end gap-2 max-w-[75%] ${isYou ? 'flex-row-reverse' : 'flex-row'}`}>
                          {/* Avatar (only on last message of group for them, never for you) */}
                          {!isYou && isLastInGroup ? (
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${session.participant.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                              {session.participant.avatar}
                            </div>
                          ) : !isYou ? (
                            <div className="w-7 flex-shrink-0" />
                          ) : null}

                          {/* Message Bubble */}
                          <div className="flex flex-col">
                            {/* Name (only on first message for them) */}
                            {!isYou && isNewUser && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-3">
                                {session.participant.name}
                              </div>
                            )}
                            
                            <div
                              className={`px-4 py-2.5 rounded-3xl ${
                                isYou
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                              } ${
                                isYou && !isLastInGroup && !isNewUser
                                  ? 'rounded-br-lg'
                                  : isYou && !isNewUser
                                  ? 'rounded-tr-lg'
                                  : ''
                              } ${
                                !isYou && !isLastInGroup && !isNewUser
                                  ? 'rounded-bl-lg'
                                  : !isYou && !isNewUser
                                  ? 'rounded-tl-lg'
                                  : ''
                              }`}
                            >
                              <p className="text-[15px] leading-[1.4] break-words whitespace-pre-wrap">
                                {message.text}
                              </p>
                            </div>
                            
                            {/* Read Receipt (only on last message for you) */}
                            {isYou && (
                              <div className="flex items-center justify-end gap-1 mt-0.5 px-2">
                                {message.status === 'sending' ? (
                                  <>
                                    <Clock className="w-3 h-3 text-gray-400 dark:text-gray-500 animate-pulse" />
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Sending...</span>
                                  </>
                                ) : message.status === 'failed' ? (
                                  <>
                                    <AlertCircle className="w-3 h-3 text-red-500" />
                                    <span className="text-xs text-red-500">Failed</span>
                                  </>
                                ) : (
                                  <>
                                    {isLastInGroup && (
                                      <>
                                        {message.isRead ? (
                                          <>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Read</span>
                                            <CheckCheck className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                                          </>
                                        ) : (
                                          <>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Delivered</span>
                                            <Check className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
            
            {/* Typing Indicator */}
            {session.isTyping && (
              <div className="flex justify-start mt-2">
                <div className="flex items-end gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${session.participant.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                    {session.participant.avatar}
                  </div>
                  <div className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl rounded-bl-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Sleek Professional Design */}
        {session.type !== 'history' && (
          <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="px-3 py-2.5">
              <div className="max-w-4xl mx-auto">
              {/* Action Bar for Stranger Mode */}
                {session.type === 'stranger' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
                      <button
                        onClick={() => setShowSkipConfirm(true)}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap"
                      >
                        <SkipForward className="w-3.5 h-3.5" />
                        <span className="inline sm:hidden">Next</span>
                        <span className="hidden sm:inline">Next Stranger</span>
                      </button>
                      <button
                        onClick={() => setShowEndChatConfirm(true)}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span className="inline sm:hidden">End</span>
                        <span className="hidden sm:inline">End Chat</span>
                      </button>
                      {onStrangerLeft && (
                        <button
                          onClick={onStrangerLeft}
                          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/20 hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-all text-orange-700 dark:text-orange-400 text-xs sm:text-sm font-medium whitespace-nowrap"
                          title="Test: Simulate stranger leaving"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span className="hidden lg:inline">Test: Stranger Left</span>
                          <span className="lg:hidden">Test</span>
                        </button>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                      Press Enter to send
                    </div>
                  </div>
                )}

                {/* Input Row */}
                <div className="flex items-end gap-2">
                  {/* Emoji Button */}
                  <Popover open={emojiPopoverOpen} onOpenChange={setEmojiPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        title="Add emoji"
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-80 p-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                      side="top" 
                      align="start"
                    >
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Emojis</h4>
                        <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
                          {emojis.map((emoji, index) => (
                            <button
                              key={index}
                              onClick={() => handleEmojiSelect(emoji)}
                              className="w-9 h-9 flex items-center justify-center text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              title={emoji}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Text Input Container */}
                  <div className="relative flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Message ${session.participant.name}...`}
                      className="w-full bg-transparent border-none rounded-xl px-3.5 py-2.5 pr-12 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:outline-none resize-none max-h-32 overflow-y-auto"
                      rows={1}
                      style={{ minHeight: '40px' }}
                    />
                    
                    {/* Send Button - Inside Input */}
                    <button
                      onClick={handleSend}
                      disabled={!inputMessage.trim()}
                      className={`absolute right-1.5 bottom-1.5 p-2 rounded-lg transition-all ${
                        inputMessage.trim()
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-600 cursor-not-allowed'
                      }`}
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Helper Text for Friend Chat */}
                {session.type !== 'stranger' && (
                  <div className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 text-center">
                    Press Enter to send • Shift+Enter for new line
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Read-Only Banner for History Chats */}
        {session.type === 'history' && (
          <div className="flex-shrink-0 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-200 dark:border-amber-800">
            <div className="px-4 py-3 flex items-center justify-center gap-2">
              <HistoryIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                This is a read-only chat history. You cannot send messages.
              </p>
            </div>
          </div>
        )}

        {/* Report Dialog */}
        <ReportDialog
          isOpen={showReportDialog}
          onClose={() => setShowReportDialog(false)}
          onSubmit={handleReport}
          userName={session.participant.name}
        />

        {/* Block Confirmation Dialog - Modern Professional */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity ${
            showBlockConfirm ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setShowBlockConfirm(false)}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Block User</h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="px-6 py-4">
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to block <span className="font-semibold text-gray-900 dark:text-white">{session.participant.name}</span>? 
                You won't be able to chat with them again.
              </p>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex gap-3">
              <button
                onClick={() => setShowBlockConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleBlock}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Block User
              </button>
            </div>
          </div>
        </div>

        {/* Skip Confirmation Dialog */}
        <SkipConfirmDialog
          isOpen={showSkipConfirm}
          onClose={() => setShowSkipConfirm(false)}
          onConfirm={handleSkip}
          strangerName={session.participant.name}
        />

        {/* End Chat Confirmation Dialog */}
        <SkipConfirmDialog
          isOpen={showEndChatConfirm}
          onClose={() => setShowEndChatConfirm(false)}
          onConfirm={onStopChat}
          strangerName={session.participant.name}
          confirmText="End Chat"
        />
      </div>
    </div>
  );
}