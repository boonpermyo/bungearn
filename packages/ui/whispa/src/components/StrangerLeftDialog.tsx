import { UserX, SkipForward, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface StrangerLeftDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFindNew: () => void;
}

export function StrangerLeftDialog({ isOpen, onClose, onFindNew }: StrangerLeftDialogProps) {
  const handleFindNew = () => {
    onClose();
    onFindNew();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 border-white/20 text-white backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
              <UserX className="w-12 h-12 text-white/70" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl text-white">
            Conversation Ended
          </DialogTitle>
          <DialogDescription className="text-center text-white/60">
            The stranger has left the chat
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <button
            onClick={handleFindNew}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
          >
            <SkipForward className="w-4 h-4" />
            Find Someone New
          </button>
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
