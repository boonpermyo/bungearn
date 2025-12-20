import { LogOut, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';

interface LogoutConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isAnonymous: boolean;
}

export function LogoutConfirmDialog({ isOpen, onClose, onConfirm, isAnonymous }: LogoutConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 w-[95vw] sm:w-[95vw] max-w-md">
        <DialogHeader className="pr-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-gray-900 dark:text-white text-xl">
                Confirm Logout
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-400">
                Are you sure you want to logout?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {isAnonymous && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-300">
                <p className="font-medium mb-1">Anonymous Account Warning</p>
                <p>
                  You're using an anonymous account. If you logout, you may lose access to your data unless you claim your account first.
                </p>
              </div>
            </div>
          )}

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              What happens when you logout:
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• All active chats will be closed</li>
              <li>• You'll be redirected to the login page</li>
              {isAnonymous && <li>• Your anonymous data may be lost</li>}
              {!isAnonymous && <li>• Your data will be saved and available when you login again</li>}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
