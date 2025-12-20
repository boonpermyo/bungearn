import { UserPlus, Check, X as XIcon } from 'lucide-react';
import { FriendRequest } from '../App';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

interface FriendRequestsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  friendRequests: FriendRequest[];
  onAcceptFriendRequest: (id: string) => void;
  onDeclineFriendRequest: (id: string) => void;
  onViewProfile: (user: any) => void;
}

export function FriendRequestsDialog({
  isOpen,
  onClose,
  friendRequests,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onViewProfile,
}: FriendRequestsDialogProps) {
  const displayedRequests = friendRequests.slice(0, 50);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Friend Requests
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            {friendRequests.length === 0
              ? 'No pending friend requests'
              : `You have ${friendRequests.length} pending ${friendRequests.length === 1 ? 'request' : 'requests'}`}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] -mx-6 px-6">
          {friendRequests.length === 0 ? (
            <div className="text-center py-12 px-4">
              <UserPlus className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                No friend requests
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">
                When someone sends you a friend request, it will appear here!
              </p>
            </div>
          ) : (
            <div className="space-y-3 pb-2">
              {displayedRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => {
                        onViewProfile(request.from);
                        onClose();
                      }}
                      className="flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${request.from.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                        {request.from.avatar}
                      </div>
                    </button>
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => {
                          onViewProfile(request.from);
                          onClose();
                        }}
                        className="text-left w-full hover:underline"
                      >
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {request.from.name}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs truncate">
                          {request.from.bio}
                        </div>
                      </button>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => {
                            onAcceptFriendRequest(request.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            onDeclineFriendRequest(request.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                          <XIcon className="w-4 h-4" />
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
