import { Button, Text } from '@whispa/web-ui/components';
import { MessageCircle } from '@whispa/web-ui/icons';
import Link from 'next/link';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex flex-col justify-between min-h-dvh">
      <nav className="backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" passHref>
            <Button type="link" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="bg-linear-to-r from-purple-600 to-pink-600 p-2 rounded-xl shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <Text className="text-xl! font-bold text-gray-900 dark:text-white">Whispa</Text>
            </Button>
          </Link>
          <Link href="/signin" passHref>
            <Button
              // onClick={onLogin}
              // className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:opacity-90 transition-all font-medium text-sm"
              size="large"
              color="blue"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
      {children}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-3 order-2 md:order-1">
              <div className="bg-linear-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Whispa</span>
            </div>

            {/* Center: Legal Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 order-1 md:order-2 w-full md:w-auto justify-center">
              <Button
                type="link"
                // onClick={onViewTerms}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Button>
              <Button
                type="link"
                // onClick={onViewPrivacy}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Button>
              <Button
                type="link"
                // onClick={onViewRefund}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Refund Policy
              </Button>
            </div>

            {/* Right: Theme Toggle & Copyright */}
            <div className="flex items-center gap-4 order-3 md:order-3">
              {/* <button
                onClick={() => onThemeChange(themeMode === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {themeMode === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button> */}
              <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 Whispa Inc.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
