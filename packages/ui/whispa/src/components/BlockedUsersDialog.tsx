import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { EyeOff, UserX } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { toast } from 'sonner';

interface BlockedUsersDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlockedUsersDialog({ isOpen, onClose }: BlockedUsersDialogProps) {
  const { settings, updateSetting } = useSettings();

  const handleUnblock = (userId: string) => {
    const newBlockedUsers = settings.blockedUsers.filter(id => id !== userId);
    updateSetting('blockedUsers', newBlockedUsers);
    toast.success('User unblocked successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 w-[95vw] sm:w-[95vw] max-w-md">
        <DialogHeader className="pr-6">
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <EyeOff className="w-5 h-5" />
            Blocked Users
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Manage the list of users you have blocked
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-96">
          {settings.blockedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UserX className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No blocked users
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Users you block will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {settings.blockedUsers.map((userId) => (
                <div
                  key={userId}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white">
                      <UserX className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        User {userId.slice(0, 8)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Blocked
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleUnblock(userId)}
                    variant="outline"
                    size="sm"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Unblock
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
