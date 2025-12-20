import { X, Sparkles, Zap, Globe, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Feature {
  icon: 'sparkles' | 'zap' | 'globe' | 'star';
  title: string;
  description: string;
  badge?: string;
}

interface FeatureAnnouncementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  version: string;
  features: Feature[];
  onTryFeature?: () => void;
}

export function FeatureAnnouncementDialog({
  isOpen,
  onClose,
  version,
  features,
  onTryFeature,
}: FeatureAnnouncementDialogProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'zap':
        return <Zap className="w-5 h-5" />;
      case 'globe':
        return <Globe className="w-5 h-5" />;
      case 'star':
        return <Star className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full pointer-events-auto transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Gradient */}
          <div className="relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            
            {/* Content */}
            <div className="relative px-6 pt-8 pb-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon and Badge */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
                    {version}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    What's New
                  </h2>
                  <p className="text-white/90 text-sm">
                    We've added exciting new features to enhance your experience!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible ? 'slideInUp 0.4s ease-out forwards' : 'none',
                  }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    {getIcon(feature.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      {feature.badge && (
                        <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium">
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
            <div className="flex gap-3">
              {onTryFeature && (
                <button
                  onClick={() => {
                    onTryFeature();
                    onClose();
                  }}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all transform hover:scale-[1.02]"
                >
                  Try It Now
                </button>
              )}
              <button
                onClick={onClose}
                className={`px-6 py-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold border-2 border-gray-200 dark:border-gray-700 transition-all ${
                  onTryFeature ? '' : 'flex-1'
                }`}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
