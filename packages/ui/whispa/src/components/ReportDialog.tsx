import { useState } from 'react';
import { Flag, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
  userName: string;
}

const REPORT_REASONS = [
  { value: 'Harassment', label: 'Harassment or Bullying', icon: '😡' },
  { value: 'Spam', label: 'Spam or Advertising', icon: '📧' },
  { value: 'Inappropriate Content', label: 'Inappropriate Content', icon: '🚫' },
  { value: 'Fake Profile', label: 'Fake Profile / Impersonation', icon: '🎭' },
  { value: 'Underage User', label: 'Underage User', icon: '👶' },
  { value: 'Threats', label: 'Threats or Violence', icon: '⚠️' },
  { value: 'Other', label: 'Other', icon: '📝' },
];

export function ReportDialog({ isOpen, onClose, onSubmit, userName }: ReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit(selectedReason, details);
    
    // Reset form
    setSelectedReason('');
    setDetails('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setSelectedReason('');
    setDetails('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <Flag className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-gray-900 dark:text-white text-xl">
                Report {userName}
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-400">
                Help us keep the community safe
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4 overflow-y-auto flex-1 px-1">
          {/* Warning Banner */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-300">
              False reports may result in restrictions on your account. Please only report genuine violations.
            </div>
          </div>

          {/* Reason Selection */}
          <div className="space-y-3">
            <Label className="text-gray-900 dark:text-white">Select a reason *</Label>
            <div className="grid gap-2">
              {REPORT_REASONS.map((reason) => (
                <button
                  key={reason.value}
                  onClick={() => setSelectedReason(reason.value)}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                    selectedReason === reason.value
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  <span className="text-2xl">{reason.icon}</span>
                  <span className={`text-sm font-medium ${
                    selectedReason === reason.value
                      ? 'text-red-700 dark:text-red-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {reason.label}
                  </span>
                  {selectedReason === reason.value && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="report-details" className="text-gray-900 dark:text-white">
              Additional details (optional)
            </Label>
            <Textarea
              id="report-details"
              placeholder="Please provide any additional context that might help us review this report..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-20 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {details.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2 mt-4 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedReason || isSubmitting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit Report'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}