import { ChatHistory } from '../App';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Clock, MessageSquare, Video, UserCheck, History, Globe } from 'lucide-react';

interface StrangerChatHistoryProps {
  history: ChatHistory[];
  onViewChat?: (chat: ChatHistory) => void;
}

export function StrangerChatHistory({ history, onViewChat }: StrangerChatHistoryProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Group history by days
  const groupByDays = () => {
    const groups: { [key: string]: ChatHistory[] } = {};
    const now = new Date();
    
    history.forEach((chat) => {
      const chatDate = new Date(chat.startTime);
      const diffMs = now.getTime() - chatDate.getTime();
      const diffDays = Math.floor(diffMs / 86400000);
      
      let label: string;
      if (diffDays === 0) {
        label = 'Today';
      } else if (diffDays === 1) {
        label = 'Yesterday';
      } else if (diffDays < 7) {
        label = chatDate.toLocaleDateString('en-US', { weekday: 'long' });
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        label = weeks === 1 ? 'Last Week' : `${weeks} Weeks Ago`;
      } else {
        label = chatDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      
      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(chat);
    });
    
    return groups;
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
          <History className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg text-gray-900 dark:text-white mb-2">No Chat History</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          Your past stranger conversations will appear here after you start chatting
        </p>
      </div>
    );
  }

  const groupedHistory = groupByDays();

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {Object.entries(groupedHistory).map(([label, chats]) => (
          <div key={label}>
            {/* Day Label */}
            <div className="sticky top-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 py-2 mb-3 border-b border-gray-100 dark:border-gray-800/50">
              <h3 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold px-1">
                {label}
              </h3>
            </div>

            {/* Chats for this day */}
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 hover:bg-purple-50 dark:hover:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-500 transition-all cursor-pointer group"
                  onClick={() => onViewChat && onViewChat(chat)}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                        {chat.strangerAvatar}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                          {chat.strangerName}
                        </h4>
                        {chat.becameFriend && (
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 text-xs px-1.5 py-0">
                            <UserCheck className="w-3 h-3" />
                          </Badge>
                        )}
                        {chat.chatMode === 'video' && (
                          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-xs px-1.5 py-0">
                            <Video className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                        {chat.strangerBio}
                      </p>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(chat.duration)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {chat.messageCount} msgs
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {chat.strangerRegion}
                        </div>
                      </div>
                    </div>

                    {/* Time & Status */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                        {formatTime(chat.startTime)}
                      </p>
                      <div className="text-[10px] text-gray-400 dark:text-gray-600">
                        {chat.endedBy === 'you' ? 'You left' : 'They left'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}