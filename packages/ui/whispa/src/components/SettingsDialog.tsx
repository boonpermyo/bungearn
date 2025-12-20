import { Region, GenderFilter } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Globe, Clock, Users } from 'lucide-react';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion: Region;
  matchingWaitTime: number | null;
  onUpdateRegion: (region: Region) => void;
  onUpdateWaitTime: (time: number | null) => void;
  selectedGenderFilter: GenderFilter;
  onUpdateGenderFilter: (filter: GenderFilter) => void;
}

// Gender icons matching GenderSelectionDialog
const GenderIcons = {
  all: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17" cy="7" r="2" />
      <path d="M21 21v-2a2 2 0 0 0-2-2h-2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
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
  )
};

export function SettingsDialog({
  isOpen,
  onClose,
  selectedRegion,
  matchingWaitTime,
  onUpdateRegion,
  onUpdateWaitTime,
  selectedGenderFilter,
  onUpdateGenderFilter,
}: SettingsDialogProps) {
  const regionOptions = [
    { value: 'worldwide' as Region, label: 'Worldwide', flag: '🌍', popularity: 95 },
    { value: 'asia' as Region, label: 'Asia', flag: '🌏', popularity: 85 },
    { value: 'europe' as Region, label: 'Europe', flag: '🇪🇺', popularity: 78 },
    { value: 'north-america' as Region, label: 'North America', flag: '🇺🇸', popularity: 72 },
    { value: 'south-america' as Region, label: 'South America', flag: '🇧🇷', popularity: 58 },
    { value: 'africa' as Region, label: 'Africa', flag: '🌍', popularity: 45 },
    { value: 'oceania' as Region, label: 'Oceania', flag: '🇦🇺', popularity: 42 },
  ];

  const waitTimeOptions = [
    { value: 10, label: '10 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: null, label: 'Forever' },
  ];

  const getWaitTimeLabel = () => {
    if (matchingWaitTime === null) return 'Forever';
    if (matchingWaitTime < 60) return `${matchingWaitTime}s`;
    return `${matchingWaitTime / 60}m`;
  };

  const genderOptions: { value: GenderFilter; label: string; Icon: any }[] = [
    { value: 'all', label: 'Everyone', Icon: GenderIcons.all },
    { value: 'male', label: 'Male', Icon: GenderIcons.male },
    { value: 'female', label: 'Female', Icon: GenderIcons.female },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 w-[95vw] sm:w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto" hideCloseButton={false}>
        <DialogHeader className="space-y-1 pr-6">
          <DialogTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl">Matching Settings</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Configure your random chat matching preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Interested In */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Users className="w-4 h-4 text-gray-400 dark:text-gray-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Interested In</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {genderOptions.map((option) => {
                const IconComponent = option.Icon;
                const isSelected = selectedGenderFilter === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => onUpdateGenderFilter(option.value)}
                    className={`p-3 rounded-lg transition-all flex flex-col items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" strokeWidth={2} />
                    <span className="text-xs font-medium">{option.label}</span>
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-gray-900 dark:text-white">Region</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {regionOptions.map((region) => (
                <button
                  key={region.value}
                  onClick={() => onUpdateRegion(region.value)}
                  className={`p-3 rounded-lg transition-all text-left relative overflow-hidden ${
                    selectedRegion === region.value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {/* Popularity background bar */}
                  <div
                    className="absolute inset-0 bg-white/5"
                    style={{ width: `${region.popularity}%` }}
                  />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{region.flag}</span>
                      <span className="text-sm">{region.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Popularity indicator */}
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            region.popularity >= 80
                              ? 'bg-green-400'
                              : region.popularity >= 60
                              ? 'bg-yellow-400'
                              : 'bg-orange-400'
                          }`}
                        />
                        <span className="text-xs opacity-60">{region.popularity}%</span>
                      </div>
                      {selectedRegion === region.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="text-green-400">● High</span> •
              <span className="text-yellow-400"> ● Medium</span> •
              <span className="text-orange-400"> ● Low</span> activity
            </p>
          </div>

          {/* Wait Time Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <h3 className="text-gray-900 dark:text-white">Wait Time</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {waitTimeOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => onUpdateWaitTime(option.value)}
                  className={`p-3 rounded-lg transition-all text-left ${
                    matchingWaitTime === option.value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option.label}</span>
                    {matchingWaitTime === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  {option.value === null && (
                    <p className="text-xs opacity-60 mt-1">Keep searching until found</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Current Settings Summary */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-600 dark:text-gray-400 text-xs uppercase mb-2">Current Settings</h4>
            <div className="space-y-1 text-sm">
              <p className="text-gray-900 dark:text-white">
                <span className="text-gray-600 dark:text-gray-400">Interested In:</span>{' '}
                {genderOptions.find((g) => g.value === selectedGenderFilter)?.label}
              </p>
              <p className="text-gray-900 dark:text-white">
                <span className="text-gray-600 dark:text-gray-400">Region:</span>{' '}
                {regionOptions.find((r) => r.value === selectedRegion)?.flag}{' '}
                {regionOptions.find((r) => r.value === selectedRegion)?.label}
              </p>
              <p className="text-gray-900 dark:text-white">
                <span className="text-gray-600 dark:text-gray-400">Wait Time:</span> {getWaitTimeLabel()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}