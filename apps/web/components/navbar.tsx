import Link from 'next/link';
import { MessageCircle } from '@whispa/web-ui/icons';
import { Button } from '@whispa/web-ui/components';

export default function Navbar() {
  return (
    <nav className="backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl shadow-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Whispa</span>
        </Link>

        <Button type="primary" size="large" className="px-4">
          Get Started
        </Button>
      </div>
    </nav>
  );
}
