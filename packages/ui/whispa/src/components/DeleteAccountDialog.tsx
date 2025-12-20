import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  userName: string;
}

export function DeleteAccountDialog({ 
  isOpen, 
  onClose, 
  onConfirmDelete,
  userName 
}: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const requiredText = 'i want to delete my account';

  const handleDelete = async () => {
    if (confirmText.toLowerCase().trim() !== requiredText) {
      toast.error('Please type the confirmation text exactly as shown');
      return;
    }

    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Account deletion requested. You will be logged out.');
      onConfirmDelete();
      setIsDeleting(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-red-200 dark:border-red-800 w-[95vw] sm:w-[95vw] max-w-md">
        <DialogHeader className="pr-6">
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-6 h-6" />
            Delete Account Permanently
          </DialogTitle>
          <DialogDescription className="text-red-500 dark:text-red-400">
            This action is irreversible. Please confirm your choice below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">
              ⚠️ Warning: This action cannot be undone
            </h3>
            <ul className="space-y-1 text-sm text-red-800 dark:text-red-400">
              <li>• Your account <strong>{userName}</strong> will be permanently deleted</li>
              <li>• All your friends will be removed</li>
              <li>• All chat history will be deleted</li>
              <li>• Your profile and data will be erased</li>
              <li>• You will lose access immediately</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">
              Type <strong className="text-red-600 dark:text-red-400">"i want to delete my account"</strong> to confirm
            </Label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="i want to delete my account"
              className="border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Text is case-insensitive
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={confirmText.toLowerCase().trim() !== requiredText || isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>Deleting...</>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Forever
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            This will immediately log you out and schedule your account for permanent deletion
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}