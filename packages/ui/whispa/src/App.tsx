import { useState, useEffect, useRef } from 'react';
import { PromotionalLanding } from './components/PromotionalLanding';
import { AuthChoice } from './components/AuthChoice';
import { MainApp } from './components/MainApp';
import { MatchingScreen } from './components/MatchingScreen';
import { StrangerLeftDialog } from './components/StrangerLeftDialog';
import { ClaimAccountDialog } from './components/ClaimAccountDialog';
import { CameraPermissionErrorDialog } from './components/CameraPermissionErrorDialog';
import { toast } from 'sonner';
import { playLeaveSound, showBrowserNotification } from './utils/sounds';
import { useTheme } from './hooks/useTheme';
import { SettingsProvider, useSettings } from './hooks/useSettings';

import { TermsPage, PrivacyPage, RefundPage } from './components/LegalPages';
import { DesignSystemPage } from './components/DesignSystemPage';
import { AtomicDesignSystem } from './components/AtomicDesignSystem';
import { ComponentDocumentation } from './components/ComponentDocumentation';
import { BackofficeApp } from './components/BackofficeApp';

import { GenderSelectionDialog, Gender } from './components/GenderSelectionDialog';

export type AppState = 'promotional-landing' | 'auth-choice' | 'main-app' | 'legal-terms' | 'legal-privacy' | 'legal-refund' | 'design-system' | 'atomic-design-system' | 'component-docs' | 'backoffice';

export type ChatMode = 'text' | 'video';

export interface Message {
  id: string;
  sender: 'you' | 'stranger' | 'system';
  text: string;
  timestamp: Date;
  isRead?: boolean;
  status?: 'sending' | 'sent' | 'failed';
}

export interface ChatHistory {
  id: string;
  strangerName: string;
  strangerAvatar: string;
  strangerAvatarColor?: string;
  strangerBio: string;
  strangerRegion: string;
  duration: number;
  messageCount: number;
  endedBy: 'you' | 'stranger';
  startTime: Date;
  becameFriend: boolean;
  friendId?: string; // ID if they became a friend
  chatMode: ChatMode; // Track if it was text or video chat
  messages: Message[]; // Store the full conversation
  strangerId: string; // Store stranger ID to send friend request
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  bio: string;
  region: string;
  joinedDate: string;
  gender?: Gender;
}

export type GenderFilter = 'all' | 'male' | 'female';

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  avatarColor?: string;
  bio: string;
  region: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface FriendRequest {
  id: string;
  from: Friend;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  type: 'stranger' | 'friend' | 'history'; // New type for history viewing
  participant: Friend;
  messages: Message[];
  isTyping: boolean;
  unreadCount: number;
  chatMode?: ChatMode; // Track the chat mode (text/video) for history sessions
  isReadOnly?: boolean; // Flag for read-only sessions like history
}

export type Region = {
  name: string;
  flag: string;
  popularity: 'low' | 'medium' | 'high';
};

export const REGIONS: Region[] = [
  { name: 'North America', flag: '🇺🇸', popularity: 'high' },
  { name: 'Europe', flag: '🇪🇺', popularity: 'high' },
  { name: 'Asia', flag: '🌏', popularity: 'medium' },
  { name: 'South America', flag: '🇧🇷', popularity: 'medium' },
  { name: 'Africa', flag: '', popularity: 'low' },
  { name: 'Oceania', flag: '🇦🇺', popularity: 'medium' },
  { name: 'Middle East', flag: '🌙', popularity: 'low' },
];

function AppContent() {
  const { settings, updateSetting } = useSettings();
  const { themeMode, setThemeMode } = useTheme();
  
  const [appState, setAppState] = useState<AppState>('promotional-landing');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState<Set<string>>(new Set());
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: 'history-mock-video-1',
      strangerName: 'Sarah Jenkins',
      strangerAvatar: '👩‍🎨',
      strangerAvatarColor: 'bg-gradient-to-br from-pink-500 to-rose-500',
      strangerBio: 'Digital artist loving the new video features!',
      strangerRegion: 'Europe',
      duration: 450, // 7m 30s
      messageCount: 12,
      endedBy: 'you',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      becameFriend: false,
      chatMode: 'video',
      strangerId: 'stranger-mock-1',
      messages: [
        {
          id: 'msg-1',
          sender: 'stranger',
          text: 'Hi there! Your camera quality is great!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 5000),
        },
        {
          id: 'msg-2',
          sender: 'you',
          text: 'Thanks! Just got a new webcam. How is your day going?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 15000),
        },
        {
          id: 'msg-3',
          sender: 'stranger',
          text: 'Pretty good! Just finished a painting session.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 25000),
        },
        {
          id: 'msg-4',
          sender: 'you',
          text: 'Oh nice! What kind of art do you do?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 35000),
        }
      ]
    },
    {
      id: 'history-mock-text-1',
      strangerName: 'Alex Chen',
      strangerAvatar: '👨‍💻',
      strangerAvatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      strangerBio: 'Coding late night...',
      strangerRegion: 'Asia',
      duration: 120, // 2m
      messageCount: 5,
      endedBy: 'stranger',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      becameFriend: true,
      chatMode: 'text',
      strangerId: 'stranger-mock-2',
      messages: [
        {
          id: 'msg-t1',
          sender: 'you',
          text: 'Hello!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5 + 2000),
        },
        {
          id: 'msg-t2',
          sender: 'stranger',
          text: 'Hey! Are you a developer too?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5 + 8000),
        }
      ]
    }
  ]);
  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);
  const [matchingWaitTime, setMatchingWaitTime] = useState<number | null>(null);
  const [selectedGenderFilter, setSelectedGenderFilter] = useState<GenderFilter>('all');
  const [isMatching, setIsMatching] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>('text');
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [showCameraPermissionDialog, setShowCameraPermissionDialog] = useState(false);
  const [showStrangerLeftDialog, setShowStrangerLeftDialog] = useState(false);
  const [showClaimDialog, setShowClaimDialog] = useState(false);
  const chatStartTimeRef = useRef<Date | null>(null);
  const matchingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const matchingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Offline Handling
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [messageQueue, setMessageQueue] = useState<{sessionId: string, text: string, timestamp: Date}[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You're back online!");
      
      // Process queue
      if (messageQueue.length > 0) {
        toast.info(`Sending ${messageQueue.length} pending messages...`);
        messageQueue.forEach(msg => {
          // In a real app, we would send to backend here
          // For now, we update the message status in state
          setChatSessions(prev => prev.map(session => {
             if (session.id === msg.sessionId) {
               return {
                 ...session,
                 messages: session.messages.map(m => 
                   (m.text === msg.text && m.status === 'sending') 
                     ? { ...m, status: 'sent' as const } 
                     : m
                 )
               };
             }
             return session;
          }));
        });
        setMessageQueue([]);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You're offline. Messages will be queued.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [messageQueue]);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      id: 'user-1',
      name: 'You',
      avatar: '😊',
      avatarColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      bio: 'Just chatting!',
      region: 'North America',
      joinedDate: new Date().toISOString(),
    };
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Mock friends data
  useEffect(() => {
    // Generate more friends (50 online, 30 offline)
    const generatedFriends: Friend[] = [];
    const avatars = ['😀', '😎', '🤓', '😊', '🥳', '🤗', '😇', '🙂', '😄', '🤩', '😌', '🥰', '🎨', '🎮', '📚', '🎵', '🎭', '🎪', '🎬', '🎤', '🎧', '🎸', '🎹', ' труб', '🎻', '🏀', '⚽', '🎾', '🏈', '⚾', '🎯', '🎳', '🎲', '🃏', '🎰', '🧩', '🚀', '🛸', '🌟', '⭐', '💫', '✨', '🔥', '💎', '👑', '🏆', '🥇'];
    const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Skyler', 'Drew', 'Blake', 'Charlie', 'Dakota', 'Cameron', 'Finley', 'Hayden', 'Jessie', 'Kennedy', 'Logan', 'Micah', 'Parker', 'Reese', 'River', 'Sage', 'Sawyer', 'Shane', 'Shiloh', 'Spencer', 'Tanner', 'Phoenix', 'Rowan', 'Ellis', 'Emerson', 'Harper', 'Peyton', 'Kai', 'Angel', 'Ash', 'Ari'];
    const lastNames = ['Smith', 'Johnson', 'Lee', 'Chen', 'Kim', 'Garcia', 'Martinez', 'Rodriguez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Davis', 'Brown', 'Miller', 'White', 'Harris'];
    const avatarColors = [
      'bg-gradient-to-br from-purple-500 to-pink-500',
      'bg-gradient-to-br from-blue-500 to-cyan-500',
      'bg-gradient-to-br from-green-500 to-emerald-500',
      'bg-gradient-to-br from-orange-500 to-red-500',
      'bg-gradient-to-br from-yellow-400 to-orange-400',
      'bg-gradient-to-br from-indigo-500 to-purple-500',
      'bg-gradient-to-br from-pink-500 to-rose-500',
      'bg-gradient-to-br from-teal-500 to-green-500',
    ];
    const bios = [
      'Digital artist', 'Gamer', 'Book lover', 'Music producer', 'Photographer', 'Developer',
      'Designer', 'Writer', 'Traveler', 'Foodie', 'Fitness enthusiast', 'Musician',
      'Movie buff', 'Sports fan', 'Tech geek', 'Nature lover', 'Coffee addict',
      'Pet lover', 'Adventure seeker', 'Creative soul', 'Night owl', 'Early bird',
      'Dreamer', 'Thinker', 'Explorer', 'Wanderer', 'Philosopher', 'Artist',
      'Entrepreneur', 'Student', 'Teacher', 'Scientist', 'Engineer', 'Architect',
      'Chef', 'Dancer', 'Singer', 'Painter', 'Sculptor', 'Poet'
    ];
    const regions = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];

    for (let i = 1; i <= 80; i++) {
      const isOnline = i <= 50; // First 50 are online
      generatedFriends.push({
        id: `friend-${i}`,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        avatarColor: avatarColors[Math.floor(Math.random() * avatarColors.length)],
        bio: bios[Math.floor(Math.random() * bios.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        isOnline,
        lastSeen: isOnline ? undefined : new Date(Date.now() - Math.random() * 86400000 * 7), // Random last seen within 7 days
      });
    }

    setFriends(generatedFriends);

    // Generate 100 friend requests
    const generatedRequests: FriendRequest[] = [];
    for (let i = 1; i <= 100; i++) {
      generatedRequests.push({
        id: `req-${i}`,
        from: {
          id: `request-user-${i}`,
          name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
          avatar: avatars[Math.floor(Math.random() * avatars.length)],
          avatarColor: avatarColors[Math.floor(Math.random() * avatarColors.length)],
          bio: bios[Math.floor(Math.random() * bios.length)],
          region: regions[Math.floor(Math.random() * regions.length)],
          isOnline: Math.random() > 0.3,
          lastSeen: Math.random() > 0.3 ? undefined : new Date(Date.now() - Math.random() * 86400000 * 7),
        },
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 30), // Random within last 30 days
      });
    }

    setFriendRequests(generatedRequests);
  }, []);

  const handleSendMessage = (sessionId: string, text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'you' as const,
      text,
      timestamp: new Date(),
      isRead: false,
      status: isOnline ? 'sent' : 'sending',
    };

    setChatSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? {
              ...session,
              messages: [
                ...session.messages,
                newMessage,
              ],
            }
          : session
      )
    );

    if (!isOnline) {
      setMessageQueue(prev => [...prev, { sessionId, text, timestamp: new Date() }]);
      return; // Don't simulate response if offline
    }

    // Simulate response after a delay
    setTimeout(() => {
      setChatSessions(prev =>
        prev.map(session =>
          session.id === sessionId
            ? {
                ...session,
                isTyping: false,
                messages: [
                  ...session.messages,
                  {
                    id: `msg-${Date.now()}-response`,
                    sender: 'stranger' as const,
                    text: getRandomResponse(),
                    timestamp: new Date(),
                    status: 'sent',
                  },
                ],
              }
            : session
        )
      );
    }, 1500);

    // Show typing indicator
    setChatSessions(prev =>
      prev.map(session =>
        session.id === sessionId ? { ...session, isTyping: true } : session
      )
    );
  };

  const getRandomResponse = () => {
    const responses = [
      'That\'s interesting!',
      'Tell me more about that',
      'I totally agree',
      'Really? I didn\'t know that',
      'Haha, that\'s funny',
      'What do you think about...',
      'I see what you mean',
      'That makes sense',
      'Cool!',
      'Nice to meet you!',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSkipStranger = () => {
    // Find the active stranger session
    const strangerSession = chatSessions.find(
      s => s.id === activeChatId && s.type === 'stranger'
    );
    
    if (strangerSession && chatStartTimeRef.current) {
      // Add to history
      const duration = Math.floor((new Date().getTime() - chatStartTimeRef.current.getTime()) / 1000);
      const historyEntry: ChatHistory = {
        id: `history-${Date.now()}`,
        strangerName: strangerSession.participant.name,
        strangerAvatar: strangerSession.participant.avatar,
        strangerAvatarColor: strangerSession.participant.avatarColor,
        strangerBio: strangerSession.participant.bio,
        strangerRegion: strangerSession.participant.region,
        duration,
        messageCount: strangerSession.messages.length,
        endedBy: 'you',
        startTime: chatStartTimeRef.current,
        becameFriend: false,
        chatMode,
        messages: strangerSession.messages,
        strangerId: strangerSession.participant.id,
      };
      setChatHistory(prev => [historyEntry, ...prev]);
    }

    // Don't remove stranger session here - let handleMatchingSuccess handle it
    // This prevents race condition
    setActiveChatId(null);
    chatStartTimeRef.current = null;
    
    // Start new random chat (this will replace the stranger session)
    handleStartRandomChat();
  };

  const handleCloseChat = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    
    if (session && session.type === 'stranger' && chatStartTimeRef.current) {
      playLeaveSound();
      
      // Add to history
      const duration = Math.floor((new Date().getTime() - chatStartTimeRef.current.getTime()) / 1000);
      const historyEntry: ChatHistory = {
        id: `history-${Date.now()}`,
        strangerName: session.participant.name,
        strangerAvatar: session.participant.avatar,
        strangerAvatarColor: session.participant.avatarColor,
        strangerBio: session.participant.bio,
        strangerRegion: session.participant.region,
        duration,
        messageCount: session.messages.length,
        endedBy: 'you',
        startTime: chatStartTimeRef.current,
        becameFriend: friendRequestsSent.has(session.participant.id),
        friendId: friendRequestsSent.has(session.participant.id) ? session.participant.id : undefined,
        chatMode,
        messages: session.messages,
        strangerId: session.participant.id,
      };
      setChatHistory(prev => [historyEntry, ...prev]);
      chatStartTimeRef.current = null;
    }

    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    
    if (activeChatId === sessionId) {
      const remainingSessions = chatSessions.filter(s => s.id !== sessionId);
      setActiveChatId(remainingSessions.length > 0 ? remainingSessions[0].id : null);
    }
  };

  const handleStartFriendChat = (friend: Friend) => {
    const existingSession = chatSessions.find(
      s => s.type === 'friend' && s.participant.id === friend.id
    );

    if (existingSession) {
      setActiveChatId(existingSession.id);
      return;
    }

    const newSession: ChatSession = {
      id: `session-friend-${Date.now()}`,
      type: 'friend',
      participant: friend,
      messages: [],
      isTyping: false,
      unreadCount: 0,
    };

    setChatSessions(prev => [...prev, newSession]);
    setActiveChatId(newSession.id);
  };

  const handleAcceptFriendRequest = (id: string) => {
    const request = friendRequests.find(r => r.id === id);
    if (request) {
      setFriends(prev => [...prev, request.from]);
      toast.success(`You are now friends with ${request.from.name}!`);
    }
    setFriendRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleDeclineFriendRequest = (id: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== id));
    toast.success('Friend request declined');
  };

  const handleUnfriend = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend) return;

    // Remove from friends list
    setFriends(prev => prev.filter(f => f.id !== friendId));

    // Check if there's an active chat with this friend
    const friendChatSession = chatSessions.find(
      session => session.type === 'friend' && session.participant.id === friendId
    );

    if (friendChatSession) {
      // Add system message to the chat
      const systemMessage: Message = {
        id: `system-${Date.now()}`,
        sender: 'system',
        text: `You have unfriended ${friend.name}`,
        timestamp: new Date(),
      };

      setChatSessions(prev =>
        prev.map(session =>
          session.id === friendChatSession.id
            ? { ...session, messages: [...session.messages, systemMessage] }
            : session
        )
      );
    }

    toast.success(`Unfriended ${friend.name}`);
  };

  const handleSendFriendRequest = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setFriendRequestsSent(prev => new Set([...prev, session.participant.id]));
      toast.success(`Friend request sent to ${session.participant.name}!`);
    }
  };

  const handleViewHistoryChat = (chat: ChatHistory) => {
    // Create a read-only session from history
    const historySession: ChatSession = {
      id: `session-history-${chat.id}`,
      type: 'history' as any, // New type for history viewing
      participant: {
        id: chat.strangerId,
        name: chat.strangerName,
        avatar: chat.strangerAvatar,
        avatarColor: chat.strangerAvatarColor,
        bio: chat.strangerBio,
        region: chat.strangerRegion,
        isOnline: false,
      },
      messages: chat.messages,
      isTyping: false,
      unreadCount: 0,
      chatMode: chat.chatMode,
      isReadOnly: true,
    };

    // Check if already open
    const existingSession = chatSessions.find(s => s.id === historySession.id);
    if (existingSession) {
      setActiveChatId(existingSession.id);
      return;
    }

    setChatSessions(prev => [...prev, historySession]);
    setActiveChatId(historySession.id);
  };

  const handleSendFriendRequestFromHistory = (strangerId: string, strangerName: string) => {
    // Check if already friends or request already sent
    const isAlreadyFriend = friends.some(f => f.id === strangerId);
    if (isAlreadyFriend) {
      toast.info(`You are already friends with ${strangerName}!`);
      return;
    }

    if (friendRequestsSent.has(strangerId)) {
      toast.info(`Friend request already sent to ${strangerName}!`);
      return;
    }

    setFriendRequestsSent(prev => new Set([...prev, strangerId]));
    toast.success(`Friend request sent to ${strangerName}!`);
  };

  const handleStartRandomChat = () => {
    setIsMatching(true);
    setMatchingWaitTime(0);

    const matchingInterval = setInterval(() => {
      setMatchingWaitTime(prev => (prev !== null ? prev + 1 : 0));
    }, 1000);

    const matchingTimeout = setTimeout(() => {
      clearInterval(matchingInterval);
      handleMatchingSuccess();
    }, 3000);

    matchingIntervalRef.current = matchingInterval;
    matchingTimeoutRef.current = matchingTimeout;
  };

  const handleMatchingSuccess = () => {
    const avatars = ['🦊', '🐼', '🐨', '🐯', '🦁', '🐸', '🐙', '🦋', '🐝', '🦄'];
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const bios = ['Just chatting!', 'Looking for friends', 'Bored', 'Hello!', 'Want to talk?'];
    const regions = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];
    const avatarColors = [
      'bg-gradient-to-br from-purple-500 to-pink-500',
      'bg-gradient-to-br from-blue-500 to-cyan-500',
      'bg-gradient-to-br from-green-500 to-emerald-500',
      'bg-gradient-to-br from-orange-500 to-red-500',
    ];

    const newSession: ChatSession = {
      id: `session-stranger-${Date.now()}`,
      type: 'stranger',
      participant: {
        id: `stranger-${Date.now()}`,
        name: names[Math.floor(Math.random() * names.length)],
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        avatarColor: avatarColors[Math.floor(Math.random() * avatarColors.length)],
        bio: bios[Math.floor(Math.random() * bios.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        isOnline: true,
      },
      messages: [
        {
          id: `msg-system-${Date.now()}`,
          sender: 'system',
          text: 'You are now chatting with a stranger. Say hi!',
          timestamp: new Date(),
        },
      ],
      isTyping: false,
      unreadCount: 0,
    };

    chatStartTimeRef.current = new Date();
    
    // Update sessions - keep all non-stranger sessions
    setChatSessions(prev => {
      const nonStrangerSessions = prev.filter(s => s.type !== 'stranger');
      return [...nonStrangerSessions, newSession];
    });
    
    // Set active chat immediately (no setTimeout)
    setActiveChatId(newSession.id);
    setIsMatching(false);
    setMatchingWaitTime(null);
    
    showBrowserNotification('New Chat', 'You are now connected with a stranger!');
  };

  const handleCancelMatching = () => {
    setIsMatching(false);
    setMatchingWaitTime(null);

    if (matchingIntervalRef.current) {
      clearInterval(matchingIntervalRef.current);
      matchingIntervalRef.current = null;
    }

    if (matchingTimeoutRef.current) {
      clearTimeout(matchingTimeoutRef.current);
      matchingTimeoutRef.current = null;
    }
  };

  const handleUpdateChatMode = (mode: ChatMode) => {
    setChatMode(mode);
    if (mode === 'video' && !cameraPermissionGranted) {
      setShowCameraPermissionDialog(true);
    }
  };

  const handleUpdateSessionChatMode = (sessionId: string, mode: ChatMode) => {
    setChatSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return { ...session, chatMode: mode };
      }
      return session;
    }));
    
    if (mode === 'video' && !cameraPermissionGranted) {
      setShowCameraPermissionDialog(true);
    }
  };

  const handleCameraAccessLost = (sessionId: string) => {
    setChatMode('text');
    toast.error('Camera access lost. Switched to text chat.');
  };

  const handleClaimAccount = () => {
    setShowClaimDialog(true);
  };

  const handleClaimSuccess = (name: string, email: string) => {
    setIsAnonymous(false);
    setUserProfile(prev => ({ ...prev, name }));
    toast.success('Account claimed successfully!');
  };

  const handleGoogleClaim = () => {
    setIsAnonymous(false);
    toast.success('Claimed with Google!');
  };
  
  const handleGenderSelect = (gender: Gender) => {
    setUserProfile(prev => ({ ...prev, gender }));
    toast.success('Gender set successfully!');
  };

  const handleLogout = () => {
    setAppState('promotional-landing');
    setChatSessions([]);
    setActiveChatId(null);
    setIsAnonymous(true);
    // Reset gender on logout so next user has to pick
    setUserProfile(prev => {
      const { gender, ...rest } = prev;
      return rest as UserProfile;
    });
    toast.success('Logged out successfully');
  };

  const handleUpdateRegion = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleUpdateGenderFilter = (filter: GenderFilter) => {
    setSelectedGenderFilter(filter);
  };

  const handleUpdateWaitTime = (time: number | null) => {
    setMatchingWaitTime(time);
  };

  const handleDeleteHistoryChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    // If viewing this history, close it
    const historySessionId = `session-history-${chatId}`;
    setChatSessions(prev => prev.filter(s => s.id !== historySessionId));
    if (activeChatId === historySessionId) {
      setActiveChatId(null);
    }
    toast.success('Chat history deleted');
  };

  const handleClearAllHistory = () => {
    setChatHistory([]);
    // Close all open history sessions
    setChatSessions(prev => prev.filter(s => s.type !== 'history'));
    if (activeChatId && activeChatId.startsWith('session-history-')) {
      setActiveChatId(null);
    }
    toast.success('All chat history cleared');
  };

  const handleThemeChange = (mode: 'light' | 'dark') => {
    setThemeMode(mode);
  };

  return (
    <div className={themeMode === 'dark' ? 'dark' : ''}>
      {appState === 'promotional-landing' && (
        <PromotionalLanding 
          onStartChat={() => setAppState('auth-choice')} 
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
          onViewTerms={() => setAppState('legal-terms')}
          onViewPrivacy={() => setAppState('legal-privacy')}
          onViewRefund={() => setAppState('legal-refund')}
          onViewDesignSystem={() => setAppState('design-system')}
          onViewAtomicDesignSystem={() => setAppState('atomic-design-system')}
          onViewComponentDocs={() => setAppState('component-docs')}
          onViewBackoffice={() => setAppState('backoffice')}
        />
      )}

      {appState === 'legal-terms' && (
        <TermsPage 
          onBack={() => setAppState('promotional-landing')}
          onLogin={() => setAppState('auth-choice')}
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
          onViewTerms={() => setAppState('legal-terms')}
          onViewPrivacy={() => setAppState('legal-privacy')}
          onViewRefund={() => setAppState('legal-refund')}
        />
      )}

      {appState === 'legal-privacy' && (
        <PrivacyPage 
          onBack={() => setAppState('promotional-landing')}
          onLogin={() => setAppState('auth-choice')}
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
          onViewTerms={() => setAppState('legal-terms')}
          onViewPrivacy={() => setAppState('legal-privacy')}
          onViewRefund={() => setAppState('legal-refund')}
        />
      )}

      {appState === 'legal-refund' && (
        <RefundPage 
          onBack={() => setAppState('promotional-landing')}
          onLogin={() => setAppState('auth-choice')}
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
          onViewTerms={() => setAppState('legal-terms')}
          onViewPrivacy={() => setAppState('legal-privacy')}
          onViewRefund={() => setAppState('legal-refund')}
        />
      )}

      {appState === 'design-system' && (
        <DesignSystemPage
          onBack={() => setAppState('promotional-landing')}
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
        />
      )}

      {appState === 'atomic-design-system' && (
        <AtomicDesignSystem
          onBack={() => setAppState('promotional-landing')}
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
        />
      )}

      {appState === 'component-docs' && (
        <ComponentDocumentation
          onBack={() => setAppState('promotional-landing')}
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
        />
      )}

      {appState === 'backoffice' && (
        <BackofficeApp
          onLogout={() => setAppState('promotional-landing')}
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
        />
      )}

      {appState === 'auth-choice' && (
        <AuthChoice
          onAnonymous={() => {
            setIsAnonymous(true);
            setAppState('main-app');
          }}
          onGoogleSignIn={() => {
            setIsAnonymous(false);
            setUserProfile(prev => ({ ...prev, name: 'Google User' }));
            setAppState('main-app');
          }}
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
          onHome={() => setAppState('promotional-landing')}
        />
      )}

      {appState === 'main-app' && (
        <MainApp
          chatSessions={chatSessions}
          activeChatId={activeChatId}
          onSwitchChat={setActiveChatId}
          onSendMessage={handleSendMessage}
          onSkipStranger={handleSkipStranger}
          onCloseChat={handleCloseChat}
          friends={friends}
          friendRequests={friendRequests}
          onStartFriendChat={handleStartFriendChat}
          onAcceptFriendRequest={handleAcceptFriendRequest}
          onDeclineFriendRequest={handleDeclineFriendRequest}
          onSendFriendRequest={handleSendFriendRequest}
          friendRequestsSent={friendRequestsSent}
          userProfile={userProfile}
          chatHistory={chatHistory}
          onStartRandomChat={handleStartRandomChat}
          isAnonymous={isAnonymous}
          onClaimAccount={handleClaimAccount}
          onLogout={handleLogout}
          selectedRegion={selectedRegion}
          matchingWaitTime={matchingWaitTime}
          onUpdateRegion={handleUpdateRegion}
          selectedGenderFilter={selectedGenderFilter}
          onUpdateGenderFilter={handleUpdateGenderFilter}
          onUpdateWaitTime={handleUpdateWaitTime}
          isMatching={isMatching}
          onCancelMatching={handleCancelMatching}
          onMatchingSuccess={handleMatchingSuccess}
          chatMode={chatMode}
          onUpdateChatMode={handleUpdateChatMode}
          onUpdateSessionChatMode={handleUpdateSessionChatMode}
          cameraPermissionGranted={cameraPermissionGranted}
          showCameraPermissionDialog={showCameraPermissionDialog}
          onCameraAccessLost={handleCameraAccessLost}
          themeMode={themeMode}
          onThemeChange={setThemeMode}
          onUpdateProfile={setUserProfile}
          compactMode={settings.compactMode}
          onCompactModeToggle={(enabled) => updateSetting('compactMode', enabled)}
          onViewHistoryChat={handleViewHistoryChat}
          onSendFriendRequestFromHistory={handleSendFriendRequestFromHistory}
          onStrangerLeft={() => setShowStrangerLeftDialog(true)}
          onUnfriend={handleUnfriend}
          onDeleteHistoryChat={handleDeleteHistoryChat}
          onClearAllHistory={handleClearAllHistory}
          isAppOnline={isOnline}
        />
      )}

      <StrangerLeftDialog
        isOpen={showStrangerLeftDialog}
        onClose={() => setShowStrangerLeftDialog(false)}
        onFindNew={handleStartRandomChat}
      />

      <GenderSelectionDialog
        isOpen={appState === 'main-app' && !userProfile.gender}
        onSelectGender={handleGenderSelect}
      />

      <ClaimAccountDialog
        open={showClaimDialog}
        onOpenChange={setShowClaimDialog}
        onClaimSuccess={handleClaimSuccess}
        onGoogleClaim={handleGoogleClaim}
        currentProfile={userProfile}
      />

      <CameraPermissionErrorDialog
        isOpen={showCameraPermissionDialog}
        onClose={() => setShowCameraPermissionDialog(false)}
        onPermissionGranted={() => {
          setCameraPermissionGranted(true);
          toast.success('Camera and microphone access granted!');
        }}
        errorMessage="Camera and microphone access is required for video chat. Please enable permissions in your browser settings."
      />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}