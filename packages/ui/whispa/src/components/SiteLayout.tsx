import { MessageCircle, Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../hooks/useTheme';

interface SiteHeaderProps {
  onHome: () => void;
  onLogin?: () => void;
}

export function SiteHeader({ onHome, onLogin }: SiteHeaderProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button 
          onClick={onHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl shadow-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Whispa</span>
        </button>
        
        {onLogin && (
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:opacity-90 transition-all font-medium text-sm"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
}

interface SiteFooterProps {
  onViewTerms: () => void;
  onViewPrivacy: () => void;
  onViewRefund: () => void;
  onViewDesignSystem?: () => void;
  onViewAtomicDesignSystem?: () => void;
  onViewComponentDocs?: () => void;
  onViewBackoffice?: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

export function SiteFooter({ 
  onViewTerms, 
  onViewPrivacy, 
  onViewRefund,
  onViewDesignSystem,
  onViewAtomicDesignSystem,
  onViewComponentDocs,
  onViewBackoffice,
  themeMode,
  onThemeChange
}: SiteFooterProps) {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 order-2 md:order-1">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">Whispa</span>
          </div>

          {/* Center: Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 order-1 md:order-2 w-full md:w-auto justify-center">
            <button onClick={onViewTerms} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Terms of Service
            </button>
            <button onClick={onViewPrivacy} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Privacy Policy
            </button>
            <button onClick={onViewRefund} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Refund Policy
            </button>
            {onViewDesignSystem && (
              <button onClick={onViewDesignSystem} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
                Design System
              </button>
            )}
            {onViewAtomicDesignSystem && (
              <button onClick={onViewAtomicDesignSystem} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
                Atomic Design
              </button>
            )}
            {onViewComponentDocs && (
              <button onClick={onViewComponentDocs} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
                📘 Component Docs
              </button>
            )}
            {onViewBackoffice && (
              <button onClick={onViewBackoffice} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
                Admin
              </button>
            )}
          </div>

          {/* Right: Theme Toggle & Copyright */}
          <div className="flex items-center gap-4 order-3 md:order-3">
            <button
              onClick={() => onThemeChange(themeMode === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {themeMode === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Whispa Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}