import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, Ghost, Sparkles, Shield, Check, Zap, Lock, Globe, Heart, Star, MessageCircle, Bug } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeMode } from '../hooks/useTheme';
import { useState } from 'react';
import { ErrorNotification, AuthError } from './ErrorNotification';

interface AuthChoiceProps {
  onAnonymous: () => void;
  onGoogleSignIn: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  onHome: () => void;
}

export function AuthChoice({ onAnonymous, onGoogleSignIn, themeMode, onThemeChange, onHome }: AuthChoiceProps) {
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Production-grade error definitions with suggestions
  const triggerRandomError = () => {
    const errors: AuthError[] = [
      {
        type: 'network',
        title: 'Network Connection Failed',
        message: 'We couldn\'t establish a connection to our servers. This might be due to your internet connection or network settings.',
        errorCode: 'ERR_NETWORK_001',
        timestamp: new Date().toISOString(),
        technicalDetails: `Network Error: Failed to fetch
Endpoint: https://api.whispa.com/auth/google
Method: POST
Status: Network timeout after 10000ms
Browser: ${navigator.userAgent}
Connection: ${(navigator as any).connection?.effectiveType || 'unknown'}`,
        suggestions: [
          'Check your internet connection and try again',
          'Disable VPN or proxy if you\'re using one',
          'Try switching between Wi-Fi and mobile data',
          'Check if your firewall is blocking the connection',
          'Wait a moment and retry - this could be temporary'
        ],
        supportUrl: 'https://help.whispa.com/network-issues'
      },
      {
        type: 'auth',
        title: 'Google Authentication Failed',
        message: 'We couldn\'t verify your Google account. This could be due to an expired session or permissions issue.',
        errorCode: 'AUTH_TOKEN_401',
        timestamp: new Date().toISOString(),
        technicalDetails: `Authentication Error: Invalid OAuth token
Provider: Google OAuth 2.0
Token Status: INVALID
Reason: Token verification failed - signature mismatch
Auth Flow: popup
Scopes Requested: openid, profile, email
Client ID: 123456789-abc123def456.apps.googleusercontent.com`,
        suggestions: [
          'Sign out of Google and sign back in',
          'Clear your browser cookies and cache',
          'Try using a different Google account',
          'Check if third-party cookies are enabled in your browser',
          'Disable browser extensions that might interfere with authentication'
        ],
        supportUrl: 'https://help.whispa.com/auth-issues'
      },
      {
        type: 'server',
        title: 'Server Temporarily Unavailable',
        message: 'Our authentication servers are experiencing high traffic right now. Your request couldn\'t be processed at this time.',
        errorCode: 'SRV_503_UNAVAIL',
        timestamp: new Date().toISOString(),
        technicalDetails: `Server Error: 503 Service Unavailable
Server: auth-lb-01.whispa.com
Region: us-east-1
Load: 98.7%
Queue Position: 1,247
Estimated Wait: 30-60 seconds
Incident ID: INC-2024-12-15-001`,
        suggestions: [
          'Wait 30-60 seconds and try again',
          'Check our status page for ongoing incidents',
          'Try again during off-peak hours',
          'Use the anonymous option to start chatting immediately'
        ],
        supportUrl: 'https://status.whispa.com'
      },
      {
        type: 'validation',
        title: 'Account Verification Required',
        message: 'Your account has been flagged for additional verification. This is a security measure to protect your account.',
        errorCode: 'VAL_ACCOUNT_002',
        timestamp: new Date().toISOString(),
        technicalDetails: `Validation Error: Account suspended pending review
Account ID: usr_7f3a9c2e4b1d42a8
Status: SUSPENDED
Reason: Unusual login activity detected
Flagged: 2024-12-15T10:23:45Z
Review Ticket: SUP-2024-WH-00123
IP Address: 192.168.1.100
Location: San Francisco, CA, US`,
        suggestions: [
          'Contact our support team to verify your identity',
          'Check your email for verification instructions',
          'Provide proof of identity if requested',
          'Review our account security guidelines',
          'This is a temporary hold for your security'
        ],
        supportUrl: 'https://help.whispa.com/account-suspended'
      },
      {
        type: 'unexpected',
        title: 'Unexpected Error Occurred',
        message: 'Something unexpected happened while processing your request. Our engineering team has been automatically notified.',
        errorCode: 'ERR_UNKNOWN_500',
        timestamp: new Date().toISOString(),
        technicalDetails: `Unhandled Exception: Internal Server Error
Error ID: 7f3a9c2e-4b1d-42a8-9e6f-c3d5e8f2a1b9
Stack Trace:
  at AuthService.validateToken (auth.service.ts:234:15)
  at async GoogleAuthProvider.signIn (google-auth.provider.ts:89:23)
  at async AuthController.handleGoogleCallback (auth.controller.ts:156:9)
Type: TypeError
Message: Cannot read property 'email' of undefined
Logged: ✓ Sent to Sentry
Alerted: ✓ On-call engineer notified`,
        suggestions: [
          'Try again in a few moments',
          'Clear your browser cache and retry',
          'Try using a different browser',
          'If the problem persists, contact support with the error ID above',
          'Use the anonymous option as an alternative'
        ],
        supportUrl: 'https://help.whispa.com/errors'
      },
    ];

    const randomError = errors[Math.floor(Math.random() * errors.length)];
    setError(randomError);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo: 40% success rate to show errors more often
      const shouldFail = Math.random() > 0.4;
      
      if (shouldFail) {
        triggerRandomError();
      } else {
        onGoogleSignIn();
      }
    } catch (err) {
      setError({
        type: 'unexpected',
        title: 'Unexpected Error',
        message: 'An unexpected error occurred. Please try again.',
        errorCode: 'ERR_CATCH_999',
        timestamp: new Date().toISOString(),
        technicalDetails: err instanceof Error ? err.message : 'Unknown error',
        suggestions: [
          'Refresh the page and try again',
          'Clear browser cache',
          'Contact support if this persists'
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950 relative overflow-hidden">
      {/* Header with Theme Toggle */}
      <nav className="relative z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onHome}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl text-gray-900 dark:text-white">Whispa</span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Test Error Button */}
              <button
                onClick={triggerRandomError}
                className="group flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 hover:from-red-200 hover:to-pink-200 dark:hover:from-red-900/50 dark:hover:to-pink-900/50 text-red-700 dark:text-red-300 rounded-lg text-xs transition-all border border-red-300 dark:border-red-700 shadow-sm hover:shadow-md"
                title="Trigger random error for testing UI/UX"
              >
                <Bug className="w-3.5 h-3.5 group-hover:animate-bounce" />
                <span className="hidden sm:inline font-medium">Test Error</span>
              </button>
              
              <ThemeToggle themeMode={themeMode} onThemeChange={onThemeChange} />
            </div>
          </div>
        </div>
      </nav>

      {/* Beautiful Error Notification */}
      <AnimatePresence mode="wait">
        {error && (
          <ErrorNotification
            error={error}
            onDismiss={dismissError}
            onRetry={handleGoogleSignIn}
            isRetrying={isLoading}
          />
        )}
      </AnimatePresence>

      {/* Content Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-purple-700 dark:text-purple-300">Choose how you want to start</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-4 sm:mb-6"
            >
              Welcome to
              <span className="block mt-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Whispa
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
            >
              Sign in to unlock the full experience, or start chatting anonymously right away
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {/* Sign In Option */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative h-full"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 group-hover:border-purple-300 dark:group-hover:border-purple-700 transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                        <UserCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl text-white">Full Account</h2>
                        <p className="text-white/80 text-sm">Recommended</p>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    </div>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base">
                    Get the complete Whispa experience with all features unlocked
                  </p>
                </div>

                {/* Features List */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="space-y-3">
                    {[
                      { icon: Heart, title: 'Friend System', desc: 'Add friends and stay connected' },
                      { icon: MessageCircle, title: 'Chat History', desc: 'Never lose your conversations' },
                      { icon: Globe, title: 'Multi-Device Sync', desc: 'Access from anywhere' },
                      { icon: Sparkles, title: 'Custom Profile', desc: 'Personalize your identity' },
                      { icon: Shield, title: 'Enhanced Privacy', desc: 'Advanced security features' },
                      { icon: Zap, title: 'Priority Matching', desc: 'Get matched faster' },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 dark:text-white text-sm sm:text-base">{feature.title}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
                        </div>
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Sign In Buttons */}
                  <div className="space-y-3 pt-4">
                    <button 
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 py-3.5 sm:py-4 rounded-xl transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-3 shadow-sm hover:shadow-md group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-gray-300 dark:border-gray-600 border-t-purple-600 dark:border-t-purple-400 rounded-full"
                          />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span>Continue with Google</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Anonymous Option */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative cursor-pointer h-full"
              onClick={onAnonymous}
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-slate-600 dark:from-gray-700 dark:to-slate-700 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-gray-700 to-slate-700 dark:from-gray-800 dark:to-slate-800 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                        <Ghost className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl text-white">Anonymous</h2>
                        <p className="text-white/80 text-sm">Quick & Private</p>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Zap className="w-4 h-4 text-yellow-300" />
                    </div>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base">
                    Start chatting instantly without any registration or personal information
                  </p>
                </div>

                {/* Features List */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="space-y-3">
                    {[
                      { icon: Zap, title: 'Instant Access', desc: 'Start chatting in seconds' },
                      { icon: Shield, title: 'Complete Privacy', desc: 'No personal data required' },
                      { icon: Lock, title: 'Anonymous Identity', desc: 'Stay completely private' },
                      { icon: Globe, title: 'Random Matching', desc: 'Connect with anyone globally' },
                      { icon: UserCircle, title: 'Claim Anytime', desc: 'Register later to save data' },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-800/50 dark:to-slate-800/50 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 dark:text-white text-sm sm:text-base">{feature.title}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
                        </div>
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Anonymous Button */}
                  <div className="pt-4">
                    <button className="w-full bg-gradient-to-r from-gray-700 to-slate-700 dark:from-gray-800 dark:to-slate-800 hover:from-gray-800 hover:to-slate-800 dark:hover:from-gray-700 dark:hover:to-slate-700 text-white py-3.5 sm:py-4 rounded-xl transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2">
                      <Ghost className="w-5 h-5" />
                      <span>Continue as Guest</span>
                    </button>
                  </div>

                  {/* Info Badge */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 sm:p-4">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-blue-900 dark:text-blue-100 text-xs sm:text-sm">
                          <span className="font-medium">Pro tip:</span> You can claim your account and convert to a full account at any time to save your chat history and friends!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8 sm:mt-12 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>1M+ Active Users</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 max-w-2xl mx-auto px-4">
              Both options are completely safe and secure. Choose what works best for you.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
