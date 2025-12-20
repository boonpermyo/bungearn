import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  WifiOff, 
  ShieldAlert, 
  ServerCrash, 
  UserX, 
  AlertTriangle,
  X, 
  RefreshCw, 
  Mail, 
  ExternalLink,
  Copy,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

export type ErrorType = 'network' | 'auth' | 'server' | 'validation' | 'unexpected' | null;

export interface AuthError {
  type: ErrorType;
  title: string;
  message: string;
  technicalDetails?: string;
  errorCode?: string;
  timestamp?: string;
  suggestions?: string[];
  supportUrl?: string;
}

interface ErrorNotificationProps {
  error: AuthError;
  onDismiss: () => void;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function ErrorNotification({ error, onDismiss, onRetry, isRetrying }: ErrorNotificationProps) {
  const [showTechnical, setShowTechnical] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyErrorDetails = () => {
    const errorText = `
Error Type: ${error.type}
Error Code: ${error.errorCode || 'N/A'}
Title: ${error.title}
Message: ${error.message}
Technical Details: ${error.technicalDetails || 'N/A'}
Timestamp: ${error.timestamp || new Date().toISOString()}
    `.trim();

    navigator.clipboard.writeText(errorText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const getErrorIcon = () => {
    switch (error.type) {
      case 'network':
        return WifiOff;
      case 'auth':
        return ShieldAlert;
      case 'server':
        return ServerCrash;
      case 'validation':
        return UserX;
      case 'unexpected':
        return AlertTriangle;
      default:
        return AlertCircle;
    }
  };

  const getErrorTheme = () => {
    switch (error.type) {
      case 'network':
        return {
          gradient: 'from-orange-500 via-red-500 to-pink-500',
          bg: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
          border: 'border-orange-200 dark:border-orange-800',
          text: 'text-orange-700 dark:text-orange-300',
          icon: 'text-orange-600 dark:text-orange-400',
          button: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
        };
      case 'auth':
        return {
          gradient: 'from-purple-500 via-pink-500 to-red-500',
          bg: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
          border: 'border-purple-200 dark:border-purple-800',
          text: 'text-purple-700 dark:text-purple-300',
          icon: 'text-purple-600 dark:text-purple-400',
          button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
        };
      case 'server':
        return {
          gradient: 'from-blue-500 via-cyan-500 to-teal-500',
          bg: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-700 dark:text-blue-300',
          icon: 'text-blue-600 dark:text-blue-400',
          button: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
        };
      case 'validation':
        return {
          gradient: 'from-yellow-500 via-orange-500 to-red-500',
          bg: 'from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          text: 'text-yellow-700 dark:text-yellow-300',
          icon: 'text-yellow-600 dark:text-yellow-400',
          button: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
        };
      case 'unexpected':
        return {
          gradient: 'from-red-500 via-pink-500 to-rose-500',
          bg: 'from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-700 dark:text-red-300',
          icon: 'text-red-600 dark:text-red-400',
          button: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
        };
      default:
        return {
          gradient: 'from-gray-500 to-slate-500',
          bg: 'from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-700 dark:text-gray-300',
          icon: 'text-gray-600 dark:text-gray-400',
          button: 'bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600'
        };
    }
  };

  const Icon = getErrorIcon();
  const theme = getErrorTheme();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -100, opacity: 0, scale: 0.95 }}
      transition={{ 
        type: 'spring', 
        damping: 20, 
        stiffness: 300,
        opacity: { duration: 0.2 }
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
    >
      {/* Main card */}
      <div className="relative">
        <div className="bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
          {/* Header with gradient background */}
          <div className={`bg-gradient-to-r ${theme.bg} border-b ${theme.border} px-6 py-4`}>
            <div className="flex items-start gap-4">
              {/* Animated icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring', 
                  damping: 10, 
                  stiffness: 200,
                  delay: 0.1 
                }}
                className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} shadow-lg flex items-center justify-center`}
              >
                <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Title and message */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {error.title}
                      </h3>
                      {error.errorCode && (
                        <div className="flex items-center gap-2">
                          <code className={`text-xs px-2 py-0.5 rounded-md ${theme.bg} ${theme.border} border ${theme.text} font-mono`}>
                            {error.errorCode}
                          </code>
                          {error.timestamp && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(error.timestamp).toLocaleTimeString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Close button */}
                    <button
                      onClick={onDismiss}
                      className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {error.message}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Body content */}
          <div className="px-6 py-4 space-y-4">
            {/* Technical details - collapsible */}
            {error.technicalDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <button
                  onClick={() => setShowTechnical(!showTechnical)}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Technical Details
                    </span>
                  </div>
                  {showTechnical ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {showTechnical && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-4 bg-gray-900 dark:bg-gray-950 rounded-lg border border-gray-700 relative group">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap break-all">
                          {error.technicalDetails}
                        </pre>
                        
                        {/* Copy button */}
                        <button
                          onClick={copyErrorDetails}
                          className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          {copied ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center pt-2"
            >
              {/* Close button */}
              <button
                onClick={onDismiss}
                className={`px-6 py-2.5 ${theme.button} text-white rounded-xl font-medium text-sm transition-all transform hover:scale-105 active:scale-95`}
              >
                Close
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Missing import
function Code({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}