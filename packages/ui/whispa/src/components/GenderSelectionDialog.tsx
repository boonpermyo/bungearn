import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { User, AlertTriangle } from 'lucide-react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export type Gender = 'male' | 'female' | 'rather-not-say';

interface GenderSelectionDialogProps {
  isOpen: boolean;
  onSelectGender: (gender: Gender) => void;
}

const MaleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
    <path d="M16 8v4h-4" />
    <path d="M16 8l-5.5 5.5" />
    <circle cx="9" cy="15" r="2.5" />
  </svg>
);

// Better icons using standard symbols or simplified avatars
const Icons = {
  male: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
      <circle cx="10" cy="14" r="5" />
      <path d="M19 5L13.5 10.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 5V9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 5H15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  female: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14V21" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 18H15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  neutral: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 15L15 9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 15L9 9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

export function GenderSelectionDialog({ isOpen, onSelectGender }: GenderSelectionDialogProps) {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  const handleSubmit = () => {
    if (selectedGender) {
      onSelectGender(selectedGender);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent 
        className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
        hideCloseButton={true}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Select Your Gender
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            To improve your matching experience, please select your gender.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-medium text-amber-900 dark:text-amber-400 text-sm">Important Note</h4>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                You cannot change your gender selection later. This information helps us filter matches and ensure a safe community environment.
              </p>
            </div>
          </div>

          <RadioGroup 
            value={selectedGender || ''} 
            onValueChange={(val) => setSelectedGender(val as Gender)}
            className="grid gap-3"
          >
            {[
              { id: 'male', label: 'Male', Icon: Icons.male, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
              { id: 'female', label: 'Female', Icon: Icons.female, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20', border: 'border-pink-200 dark:border-pink-800' },
              { id: 'rather-not-say', label: 'Rather not say', Icon: Icons.neutral, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800', border: 'border-gray-200 dark:border-gray-700' }
            ].map((option) => (
              <Label
                key={option.id}
                htmlFor={option.id}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all group ${
                  selectedGender === option.id
                    ? `border-purple-600 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-600`
                    : `border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800`
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    selectedGender === option.id ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600' : `${option.bg} ${option.color}`
                  } transition-colors`}>
                    <option.Icon className="w-5 h-5" />
                  </div>
                  <span className={`font-medium ${
                    selectedGender === option.id ? 'text-purple-900 dark:text-purple-100' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {option.label}
                  </span>
                </div>
                <RadioGroupItem value={option.id} id={option.id} className="text-purple-600 border-gray-300 dark:border-gray-600" />
              </Label>
            ))}
          </RadioGroup>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!selectedGender}
          className={`w-full h-14 text-lg font-medium transition-all duration-300 shadow-lg ${
            selectedGender 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white translate-y-0 opacity-100' 
              : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}