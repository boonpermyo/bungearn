import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { SkipForward, AlertTriangle, X } from 'lucide-react';

interface SkipConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  strangerName: string;
  confirmText?: string;
}

export function SkipConfirmDialog({ isOpen, onClose, onConfirm, strangerName, confirmText = 'Skip & Find New' }: SkipConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const isEndChat = confirmText === 'End Chat';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <AlertTriangle className={`w-5 h-5 ${isEndChat ? 'text-red-500' : 'text-orange-500'}`} />
            {isEndChat ? 'End this conversation?' : 'Skip this conversation?'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Are you sure you want to {isEndChat ? 'end' : 'skip'} your chat with <strong>{strangerName}</strong>?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className={`p-4 ${isEndChat ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'} border rounded-lg`}>
            <p className={`text-sm ${isEndChat ? 'text-red-800 dark:text-red-300' : 'text-orange-800 dark:text-orange-300'}`}>
              {isEndChat 
                ? 'This will end your current conversation and return you to the home screen.' 
                : 'This will end your current conversation and immediately search for a new person to chat with.'}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className={`flex-1 ${isEndChat ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'} text-white`}
            >
              {isEndChat ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  End Chat
                </>
              ) : (
                <>
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip & Find New
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}