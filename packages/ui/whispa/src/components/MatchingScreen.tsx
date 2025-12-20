import { useState, useEffect } from 'react';
import { Loader2, X, Infinity, Globe, Users, Zap } from 'lucide-react';
import { Region, GenderFilter } from '../App';

interface MatchingScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
  waitTime: number | null; // null = forever
  region: Region;
  genderFilter: GenderFilter;
}

export function MatchingScreen({ onSuccess, onCancel, waitTime, region, genderFilter }: MatchingScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState(waitTime);
  const [activeUsers] = useState(Math.floor(Math.random() * 50000) + 200000); // 200k-250k

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // Only start countdown if waitTime is not null (forever)
    if (waitTime !== null) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(interval);
            onCancel();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Simulate matching (random time between 0.5-1 seconds for quick testing)
    const matchingTime = 500 + Math.random() * 500;
    const matchTimeout = setTimeout(() => {
      if (interval) clearInterval(interval);
      onSuccess();
    }, matchingTime);

    return () => {
      if (interval) clearInterval(interval);
      clearTimeout(matchTimeout);
    };
  }, [waitTime, onSuccess, onCancel, region]);

  const handleCancel = () => {
    onCancel();
  };

  const formatRegion = (r: Region) => {
    if (!r || !r.name) return 'Global';
    return r.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatGenderFilter = (filter: GenderFilter) => {
    switch (filter) {
      case 'male': return 'Men';
      case 'female': return 'Women';
      default: return 'Everyone';
    }
  };

  return (
    <div className="flex-1 w-full relative overflow-hidden flex flex-col">
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide flex items-center justify-center p-4">
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950 min-h-full w-full rounded-3xl">
          <div className="text-center space-y-8 max-w-md px-6 py-8">
            {/* Animated Logo/Spinner */}
        <div className="relative mx-auto w-32 h-32">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" />
          
          {/* Rotating ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin" style={{ animationDuration: '1s' }} />
          
          {/* Inner circle */}
          <div className="absolute inset-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-xl">
            <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-pulse" />
          </div>
        </div>
        
        {/* Status Text */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-white">
            Finding you a match...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connecting you with someone interesting
          </p>
          
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {waitTime === null ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Infinity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-300">Unlimited time</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                  {timeRemaining}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate w-full">
              {formatRegion(region)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Region</div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
              {formatGenderFilter(genderFilter)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Looking For</div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
              {activeUsers.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Online Now</div>
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-pink-600 dark:bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl transition-all mx-auto"
        >
          <X className="w-5 h-5" />
          Cancel Search
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}