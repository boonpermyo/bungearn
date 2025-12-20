import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { ChatHistory } from '../App';
import { Check, CheckCheck, UserPlus, UserCheck } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

interface ChatHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chat: ChatHistory | null;
  onSendFriendRequest?: (strangerId: string) => void;
  friendRequestSent?: boolean;
}

export function ChatHistoryDialog({ open, onOpenChange, chat, onSendFriendRequest, friendRequestSent }: ChatHistoryDialogProps) {
  if (!chat) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 bg-gray-100 dark:bg-gray-950" aria-describedby={undefined}>
        {/* Header */}
        <DialogHeader className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${chat.strangerAvatarColor || 'bg-gradient-to-br from-blue-500 to-purple-500'}`}>
              {chat.strangerAvatar}
            </div>
            <div>
              <DialogTitle className="text-base">{chat.strangerName}</DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatTime(chat.startTime)} · {Math.floor(chat.duration / 60)}m {chat.duration % 60}s
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="max-w-3xl mx-auto space-y-2">
            {chat.messages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No messages were saved for this conversation
                </p>
              </div>
            ) : (
              chat.messages.map((message, index) => {
                const prevMessage = index > 0 ? chat.messages[index - 1] : null;
                const nextMessage = index < chat.messages.length - 1 ? chat.messages[index + 1] : null;
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
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${chat.strangerAvatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                              {chat.strangerAvatar}
                            </div>
                          ) : !isYou ? (
                            <div className="w-7 flex-shrink-0" />
                          ) : null}

                          {/* Message Bubble */}
                          <div className="flex flex-col">
                            {/* Name (only on first message for them) */}
                            {!isYou && isNewUser && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-3">
                                {chat.strangerName}
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
                            {isYou && isLastInGroup && (
                              <div className="flex items-center justify-end gap-1 mt-0.5 px-2">
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
          </div>
        </ScrollArea>

        {/* Footer */}
        {onSendFriendRequest && (
          <DialogFooter className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <Button
              className="w-full"
              onClick={() => onSendFriendRequest(chat.strangerId)}
              disabled={friendRequestSent}
            >
              {friendRequestSent ? (
                <>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Friend Request Sent
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add as Friend
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}