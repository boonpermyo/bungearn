import { useState } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  Check,
  ChevronDown,
  ChevronRight,
  Code,
  Palette,
  FileText,
  Sparkles,
  Package
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ThemeMode } from '../hooks/useTheme';
import { toast } from 'sonner@2.0.3';

interface ComponentDocumentationProps {
  onBack: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

export function ComponentDocumentation({ onBack, themeMode, onThemeChange }: ComponentDocumentationProps) {
  const [activeSection, setActiveSection] = useState('introduction');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(label);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedCode(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy to clipboard');
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Component Documentation
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Production-grade implementation guide for Whispa Design System
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onThemeChange(themeMode === 'dark' ? 'light' : 'dark')}
            >
              {themeMode === 'dark' ? '🌙' : '☀️'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto flex">
        {/* Sidebar Navigation */}
        <aside className="w-72 border-r border-gray-200 dark:border-gray-800 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Introduction */}
              <NavSection title="Getting Started">
                <NavItem 
                  label="Introduction" 
                  isActive={activeSection === 'introduction'}
                  onClick={() => setActiveSection('introduction')}
                />
                <NavItem 
                  label="Design Tokens" 
                  isActive={activeSection === 'tokens'}
                  onClick={() => setActiveSection('tokens')}
                />
                <NavItem 
                  label="Installation" 
                  isActive={activeSection === 'installation'}
                  onClick={() => setActiveSection('installation')}
                />
              </NavSection>

              {/* Atoms */}
              <NavSection title="Atoms">
                <NavItem 
                  label="Button" 
                  isActive={activeSection === 'button'}
                  onClick={() => setActiveSection('button')}
                />
                <NavItem 
                  label="Input" 
                  isActive={activeSection === 'input'}
                  onClick={() => setActiveSection('input')}
                />
                <NavItem 
                  label="Badge" 
                  isActive={activeSection === 'badge'}
                  onClick={() => setActiveSection('badge')}
                />
                <NavItem 
                  label="Avatar (Emoji)" 
                  isActive={activeSection === 'avatar'}
                  onClick={() => setActiveSection('avatar')}
                />
                <NavItem 
                  label="Switch" 
                  isActive={activeSection === 'switch'}
                  onClick={() => setActiveSection('switch')}
                />
                <NavItem 
                  label="Checkbox" 
                  isActive={activeSection === 'checkbox'}
                  onClick={() => setActiveSection('checkbox')}
                />
                <NavItem 
                  label="Slider" 
                  isActive={activeSection === 'slider'}
                  onClick={() => setActiveSection('slider')}
                />
              </NavSection>

              {/* Molecules */}
              <NavSection title="Molecules">
                <NavItem 
                  label="Search Bar" 
                  isActive={activeSection === 'searchbar'}
                  onClick={() => setActiveSection('searchbar')}
                />
                <NavItem 
                  label="Form Field" 
                  isActive={activeSection === 'formfield'}
                  onClick={() => setActiveSection('formfield')}
                />
                <NavItem 
                  label="User Card" 
                  isActive={activeSection === 'usercard'}
                  onClick={() => setActiveSection('usercard')}
                />
                <NavItem 
                  label="Message Bubble" 
                  isActive={activeSection === 'messagebubble'}
                  onClick={() => setActiveSection('messagebubble')}
                />
                <NavItem 
                  label="Status Indicator" 
                  isActive={activeSection === 'statusindicator'}
                  onClick={() => setActiveSection('statusindicator')}
                />
              </NavSection>

              {/* Organisms */}
              <NavSection title="Organisms">
                <NavItem 
                  label="Chat Window" 
                  isActive={activeSection === 'chatwindow'}
                  onClick={() => setActiveSection('chatwindow')}
                />
                <NavItem 
                  label="User Profile Card" 
                  isActive={activeSection === 'profilecard'}
                  onClick={() => setActiveSection('profilecard')}
                />
                <NavItem 
                  label="Settings Panel" 
                  isActive={activeSection === 'settingspanel'}
                  onClick={() => setActiveSection('settingspanel')}
                />
              </NavSection>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl">
          {activeSection === 'introduction' && <IntroductionSection />}
          {activeSection === 'tokens' && <DesignTokensSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'installation' && <InstallationSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'button' && <ButtonDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'input' && <InputDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'badge' && <BadgeDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'avatar' && <AvatarDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'switch' && <SwitchDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'checkbox' && <CheckboxDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'slider' && <SliderDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'searchbar' && <SearchBarDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'formfield' && <FormFieldDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'usercard' && <UserCardDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'messagebubble' && <MessageBubbleDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'statusindicator' && <StatusIndicatorDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'chatwindow' && <ChatWindowDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'profilecard' && <ProfileCardDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'settingspanel' && <SettingsPanelDocumentation copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
        </main>
      </div>
    </div>
  );
}

// Navigation Components
function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function NavItem({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive 
          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );
}

// Code Block Component
function CodeBlock({ code, language = 'tsx', label, copyToClipboard, copiedCode }: { 
  code: string; 
  language?: string; 
  label: string;
  copyToClipboard: (code: string, label: string) => void;
  copiedCode: string | null;
}) {
  return (
    <div className="relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 dark:bg-gray-950 border border-gray-700 rounded-t-lg">
        <span className="text-xs font-mono text-gray-400">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-gray-400 hover:text-white"
          onClick={() => copyToClipboard(code, label)}
        >
          {copiedCode === label ? (
            <><Check className="w-3 h-3 mr-1" /> Copied</>
          ) : (
            <><Copy className="w-3 h-3 mr-1" /> Copy</>
          )}
        </Button>
      </div>
      <pre className="p-4 bg-gray-900 dark:bg-gray-950 border-x border-b border-gray-700 rounded-b-lg overflow-x-auto">
        <code className="text-sm font-mono text-gray-100">{code}</code>
      </pre>
    </div>
  );
}

// Props Table Component
function PropsTable({ props }: { props: Array<{
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}> }) {
  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Prop</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Default</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {props.map((prop, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <code className="text-purple-600 dark:text-purple-400 font-mono">{prop.name}</code>
                  {prop.required && (
                    <Badge variant="destructive" className="h-5 text-xs">Required</Badge>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <code className="text-sm text-gray-600 dark:text-gray-400 font-mono">{prop.type}</code>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <code className="text-sm text-gray-600 dark:text-gray-400 font-mono">{prop.default}</code>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Design Tokens Table
function TokensTable({ tokens }: { tokens: Array<{
  name: string;
  value: string;
  usage: string;
  preview?: React.ReactNode;
}> }) {
  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Token</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Value</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Preview</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {tokens.map((token, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
              <td className="px-4 py-3">
                <code className="text-purple-600 dark:text-purple-400 font-mono text-sm">{token.name}</code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {token.value}
                </code>
              </td>
              <td className="px-4 py-3">
                {token.preview || <span className="text-gray-400 text-sm">-</span>}
              </td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{token.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Documentation Sections
function IntroductionSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Whispa Design System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Production-grade component library built with React, TypeScript, and Tailwind CSS following Atomic Design methodology.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Design Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Emoji-First Avatars
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All user avatars use emojis (VARCHAR(10)) combined with gradient backgrounds (VARCHAR(50)). 
                No image uploads or avatar_url fields. Privacy-focused and data-efficient.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-600" />
                Consistent Tokens
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Design tokens are centralized in globals.css with CSS custom properties. 
                All components use these tokens for colors, spacing, typography, and more.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Code className="w-4 h-4 text-green-600" />
                TypeScript First
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All components are fully typed with TypeScript interfaces. 
                Comprehensive prop types ensure type safety and better DX.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Package className="w-4 h-4 text-orange-600" />
                Atomic Design
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Components organized into Atoms, Molecules, and Organisms. 
                Promotes reusability and consistent composition patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge>React 18+</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Modern React with hooks, functional components, and concurrent features
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge>TypeScript 5+</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full type safety with strict mode enabled
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge>Tailwind CSS v4</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Utility-first CSS with custom design tokens in globals.css
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge>Radix UI</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Accessible, unstyled component primitives
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge>Lucide React</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Beautiful, consistent icon library
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Schema Note</CardTitle>
          <CardDescription>Important: Avatar implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">
              <strong>No avatar_url field exists in the database.</strong> The schema uses:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li><code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">avatar_emoji</code> (VARCHAR(10)) - Stores the emoji character</li>
              <li><code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">avatar_color</code> (VARCHAR(50)) - Stores Tailwind gradient classes</li>
            </ul>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              All avatar components must render emoji + gradient background only.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DesignTokensSection({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Design Tokens</h1>
        <p className="text-gray-600 dark:text-gray-400">
          All design tokens are defined in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">/styles/globals.css</code> using CSS custom properties.
        </p>
      </div>

      {/* Color Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Color Tokens</CardTitle>
          <CardDescription>Brand gradients and semantic colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Brand Gradients (Use for CTAs, branding)</h3>
            <TokensTable tokens={[
              {
                name: 'gradient-primary',
                value: 'from-purple-600 to-pink-600',
                usage: 'Primary brand gradient for CTAs, buttons, highlights',
                preview: <div className="h-8 w-24 rounded bg-gradient-to-r from-purple-600 to-pink-600" />
              },
              {
                name: 'gradient-action',
                value: 'from-orange-500 to-red-500',
                usage: 'Video calls, critical actions',
                preview: <div className="h-8 w-24 rounded bg-gradient-to-r from-orange-500 to-red-500" />
              },
              {
                name: 'gradient-safety',
                value: 'from-blue-500 to-cyan-500',
                usage: 'Security features, trust badges',
                preview: <div className="h-8 w-24 rounded bg-gradient-to-r from-blue-500 to-cyan-500" />
              },
              {
                name: 'gradient-success',
                value: 'from-green-500 to-emerald-500',
                usage: 'Success states, positive actions',
                preview: <div className="h-8 w-24 rounded bg-gradient-to-r from-green-500 to-emerald-500" />
              },
            ]} />
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Semantic Colors</h3>
            <TokensTable tokens={[
              {
                name: 'text-destructive',
                value: '#d4183d (light) / oklch(0.396 0.141 25.723) (dark)',
                usage: 'Error messages, delete actions',
                preview: <div className="h-8 w-24 rounded bg-red-500" />
              },
              {
                name: 'bg-success',
                value: '#22c55e',
                usage: 'Success notifications, online status',
                preview: <div className="h-8 w-24 rounded bg-green-500" />
              },
              {
                name: 'bg-warning',
                value: '#eab308',
                usage: 'Warning alerts, away status',
                preview: <div className="h-8 w-24 rounded bg-yellow-500" />
              },
              {
                name: 'bg-info',
                value: '#3b82f6',
                usage: 'Info messages, notifications',
                preview: <div className="h-8 w-24 rounded bg-blue-500" />
              },
            ]} />
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Avatar Gradient Options (avatar_color field)</h3>
            <TokensTable tokens={[
              {
                name: 'avatar-gradient-1',
                value: 'bg-gradient-to-br from-purple-500 to-pink-500',
                usage: 'User avatars - option 1',
                preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">😎</div>
              },
              {
                name: 'avatar-gradient-2',
                value: 'bg-gradient-to-br from-blue-500 to-cyan-500',
                usage: 'User avatars - option 2',
                preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg">🤓</div>
              },
              {
                name: 'avatar-gradient-3',
                value: 'bg-gradient-to-br from-green-500 to-emerald-500',
                usage: 'User avatars - option 3',
                preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-lg">😇</div>
              },
              {
                name: 'avatar-gradient-4',
                value: 'bg-gradient-to-br from-orange-500 to-red-500',
                usage: 'User avatars - option 4',
                preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-lg">🥳</div>
              },
              {
                name: 'avatar-gradient-5',
                value: 'bg-gradient-to-br from-indigo-500 to-purple-500',
                usage: 'User avatars - option 5',
                preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-lg">🦸</div>
              },
              {
                name: 'avatar-gradient-6',
                value: 'bg-gradient-to-br from-pink-500 to-rose-500',
                usage: 'User avatars - option 6',
                preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-lg">👩</div>
              },
              {
                name: 'avatar-gradient-7',
                value: 'bg-gradient-to-br from-teal-500 to-green-500',
                usage: 'User avatars - option 7',
                preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-lg">🧙</div>
              },
              {
                name: 'avatar-gradient-8',
                value: 'bg-gradient-to-br from-yellow-400 to-orange-400',
                usage: 'User avatars - option 8',
                preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-lg">⭐</div>
              },
            ]} />
          </div>
        </CardContent>
      </Card>

      {/* Spacing Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>Consistent spacing for padding, margin, and gaps</CardDescription>
        </CardHeader>
        <CardContent>
          <TokensTable tokens={[
            { name: 'spacing-1', value: '0.25rem (4px)', usage: 'Tight spacing between small elements', preview: <div className="h-1 bg-purple-500" style={{ width: '4px' }} /> },
            { name: 'spacing-2', value: '0.5rem (8px)', usage: 'Small gaps, compact layouts', preview: <div className="h-1 bg-purple-500" style={{ width: '8px' }} /> },
            { name: 'spacing-3', value: '0.75rem (12px)', usage: 'Default button padding', preview: <div className="h-1 bg-purple-500" style={{ width: '12px' }} /> },
            { name: 'spacing-4', value: '1rem (16px)', usage: 'Standard element spacing', preview: <div className="h-1 bg-purple-500" style={{ width: '16px' }} /> },
            { name: 'spacing-6', value: '1.5rem (24px)', usage: 'Section padding, card spacing', preview: <div className="h-1 bg-purple-500" style={{ width: '24px' }} /> },
            { name: 'spacing-8', value: '2rem (32px)', usage: 'Large section gaps', preview: <div className="h-1 bg-purple-500" style={{ width: '32px' }} /> },
            { name: 'spacing-12', value: '3rem (48px)', usage: 'Major section spacing', preview: <div className="h-1 bg-purple-500" style={{ width: '48px' }} /> },
          ]} />
        </CardContent>
      </Card>

      {/* Typography Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
          <CardDescription>Font sizes defined in globals.css</CardDescription>
        </CardHeader>
        <CardContent>
          <TokensTable tokens={[
            { name: 'text-xs', value: '0.75rem (12px)', usage: 'Timestamps, fine print', preview: <span className="text-xs">Sample Text</span> },
            { name: 'text-sm', value: '0.875rem (14px)', usage: 'Body text, descriptions', preview: <span className="text-sm">Sample Text</span> },
            { name: 'text-base', value: '1rem (16px)', usage: 'Standard body text', preview: <span className="text-base">Sample Text</span> },
            { name: 'text-lg', value: '1.125rem (18px)', usage: 'Emphasized text', preview: <span className="text-lg">Sample Text</span> },
            { name: 'text-xl', value: '1.25rem (20px)', usage: 'Headings level 4', preview: <span className="text-xl">Sample Text</span> },
            { name: 'text-2xl', value: '1.5rem (24px)', usage: 'Headings level 3', preview: <span className="text-2xl">Sample Text</span> },
            { name: 'text-3xl', value: '1.875rem (30px)', usage: 'Headings level 2', preview: <span className="text-3xl">Sample Text</span> },
            { name: 'text-4xl', value: '2.25rem (36px)', usage: 'Headings level 1', preview: <span className="text-4xl">Sample Text</span> },
          ]} />
        </CardContent>
      </Card>

      {/* Border Radius Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Border Radius</CardTitle>
          <CardDescription>Rounding values for components</CardDescription>
        </CardHeader>
        <CardContent>
          <TokensTable tokens={[
            { name: 'rounded-sm', value: '0.125rem (2px)', usage: 'Subtle rounding', preview: <div className="w-12 h-12 bg-purple-500 rounded-sm" /> },
            { name: 'rounded', value: '0.25rem (4px)', usage: 'Default rounding', preview: <div className="w-12 h-12 bg-purple-500 rounded" /> },
            { name: 'rounded-md', value: '0.375rem (6px)', usage: 'Medium rounding', preview: <div className="w-12 h-12 bg-purple-500 rounded-md" /> },
            { name: 'rounded-lg', value: '0.5rem (8px)', usage: 'Cards, buttons', preview: <div className="w-12 h-12 bg-purple-500 rounded-lg" /> },
            { name: 'rounded-xl', value: '0.75rem (12px)', usage: 'Large cards', preview: <div className="w-12 h-12 bg-purple-500 rounded-xl" /> },
            { name: 'rounded-2xl', value: '1rem (16px)', usage: 'Message bubbles', preview: <div className="w-12 h-12 bg-purple-500 rounded-2xl" /> },
            { name: 'rounded-full', value: '9999px', usage: 'Avatars, badges', preview: <div className="w-12 h-12 bg-purple-500 rounded-full" /> },
          ]} />
        </CardContent>
      </Card>

      {/* Shadow Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Shadow Tokens</CardTitle>
          <CardDescription>Elevation and depth</CardDescription>
        </CardHeader>
        <CardContent>
          <TokensTable tokens={[
            { name: 'shadow-sm', value: '0 1px 2px rgba(0,0,0,0.05)', usage: 'Subtle elevation', preview: <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-sm rounded" /> },
            { name: 'shadow', value: '0 1px 3px rgba(0,0,0,0.1)', usage: 'Default elevation', preview: <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow rounded" /> },
            { name: 'shadow-md', value: '0 4px 6px rgba(0,0,0,0.1)', usage: 'Cards, dropdowns', preview: <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-md rounded" /> },
            { name: 'shadow-lg', value: '0 10px 15px rgba(0,0,0,0.1)', usage: 'Modals, dialogs', preview: <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-lg rounded" /> },
            { name: 'shadow-xl', value: '0 20px 25px rgba(0,0,0,0.1)', usage: 'High emphasis', preview: <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-xl rounded" /> },
          ]} />
        </CardContent>
      </Card>
    </div>
  );
}

function InstallationSection({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  const installCode = `npm install lucide-react
npm install class-variance-authority@0.7.1
npm install @radix-ui/react-slot@1.1.2
npm install sonner@2.0.3`;

  const globalsCSS = `:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #030213;
  --destructive: #d4183d;
  --radius: 0.625rem;
  /* ... other tokens */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... other dark mode tokens */
}`;

  const utilsCode = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Installation Guide</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Step-by-step guide to set up the Whispa Design System in your project.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Install Dependencies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Install the required npm packages:
          </p>
          <CodeBlock 
            code={installCode} 
            language="bash" 
            label="install-deps"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Set Up Design Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Copy the design tokens to <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">/styles/globals.css</code>:
          </p>
          <CodeBlock 
            code={globalsCSS} 
            language="css" 
            label="globals-css"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Note:</strong> The full globals.css file is located at <code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">/styles/globals.css</code> in the codebase.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Create Utility Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">/components/ui/utils.ts</code>:
          </p>
          <CodeBlock 
            code={utilsCode} 
            language="typescript" 
            label="utils-ts"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Component File Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Organize components following this structure:
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg font-mono text-sm">
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
              <div>📁 components/</div>
              <div className="ml-4">📁 ui/ <span className="text-gray-500">(Atoms)</span></div>
              <div className="ml-8">📄 button.tsx</div>
              <div className="ml-8">📄 input.tsx</div>
              <div className="ml-8">📄 badge.tsx</div>
              <div className="ml-8">📄 utils.ts</div>
              <div className="ml-4">📄 SearchBar.tsx <span className="text-gray-500">(Molecule)</span></div>
              <div className="ml-4">📄 UserCard.tsx <span className="text-gray-500">(Molecule)</span></div>
              <div className="ml-4">📄 ChatWindow.tsx <span className="text-gray-500">(Organism)</span></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Database Schema Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ensure your user table has these avatar fields:
          </p>
          <CodeBlock 
            code={`CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  
  -- Avatar fields (NO avatar_url!)
  avatar_emoji VARCHAR(10) NOT NULL DEFAULT '😊',
  avatar_color VARCHAR(50) NOT NULL DEFAULT 'bg-gradient-to-br from-purple-500 to-pink-500',
  
  -- Other fields...
  created_at TIMESTAMP DEFAULT NOW()
);`}
            language="sql" 
            label="schema-sql"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-900 dark:text-red-100">
              <strong>Critical:</strong> Do NOT include an <code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">avatar_url</code> field. 
              The system uses emoji + color gradients only.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Component Documentation Sections continue in next part...
function ButtonDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  const componentCode = `import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };`;

  const usageCode = `import { Button } from './ui/button';
import { Send, Video } from 'lucide-react';

// Basic usage
<Button>Click me</Button>

// With variant
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>

// With size
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Send /></Button>

// With icon
<Button><Send className="w-4 h-4" /> Send Message</Button>

// Brand gradient (custom)
<Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
  Start Chat
</Button>

// Disabled
<Button disabled>Loading...</Button>`;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Button</h1>
          <Badge>Atom</Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Primary interactive element for triggering actions. Built with Radix UI Slot for composition.
        </p>
      </div>

      {/* Props */}
      <Card>
        <CardHeader>
          <CardTitle>Props</CardTitle>
          <CardDescription>Complete TypeScript interface for Button component</CardDescription>
        </CardHeader>
        <CardContent>
          <PropsTable props={[
            {
              name: 'variant',
              type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
              default: '"default"',
              description: 'Visual style variant of the button'
            },
            {
              name: 'size',
              type: '"default" | "sm" | "lg" | "icon"',
              default: '"default"',
              description: 'Size variant affecting height and padding'
            },
            {
              name: 'asChild',
              type: 'boolean',
              default: 'false',
              description: 'Renders as a child component (via Radix Slot)'
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables the button and shows disabled state'
            },
            {
              name: 'className',
              type: 'string',
              description: 'Additional CSS classes to merge with variants'
            },
            {
              name: 'onClick',
              type: '(e: React.MouseEvent) => void',
              description: 'Click event handler'
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              description: 'Button content (text, icons, etc.)'
            },
          ]} />
        </CardContent>
      </Card>

      {/* Design Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens Used</CardTitle>
        </CardHeader>
        <CardContent>
          <TokensTable tokens={[
            { name: 'Height (default)', value: 'h-9 (36px)', usage: 'Default button height' },
            { name: 'Height (sm)', value: 'h-8 (32px)', usage: 'Small button height' },
            { name: 'Height (lg)', value: 'h-10 (40px)', usage: 'Large button height' },
            { name: 'Padding X (default)', value: 'px-4 (16px)', usage: 'Horizontal padding' },
            { name: 'Padding X (sm)', value: 'px-3 (12px)', usage: 'Small horizontal padding' },
            { name: 'Padding X (lg)', value: 'px-6 (24px)', usage: 'Large horizontal padding' },
            { name: 'Border Radius', value: 'rounded-md (6px)', usage: 'Button rounding' },
            { name: 'Font Size', value: 'text-sm (14px)', usage: 'Button text size' },
            { name: 'Font Weight', value: 'font-medium (500)', usage: 'Button text weight' },
            { name: 'Gap (icon)', value: 'gap-2 (8px)', usage: 'Space between icon and text' },
            { name: 'Primary BG', value: 'bg-primary', usage: 'Default variant background' },
            { name: 'Destructive BG', value: 'bg-destructive (#d4183d)', usage: 'Destructive variant' },
            { name: 'Gradient Brand', value: 'from-purple-600 to-pink-600', usage: 'Custom brand gradient' },
          ]} />
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock 
            code={usageCode} 
            language="tsx" 
            label="button-usage"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      {/* Full Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Full Implementation</CardTitle>
          <CardDescription>Complete source code for /components/ui/button.tsx</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock 
            code={componentCode} 
            language="tsx" 
            label="button-implementation"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Use <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">variant="destructive"</code> for delete/remove actions</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Use <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">size="icon"</code> for icon-only buttons with proper aria-label</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Use gradient classes for primary CTAs: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">from-purple-600 to-pink-600</code></p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✗ DON'T</Badge>
              <p className="text-sm">Mix size variants with custom height classes (conflicts)</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✗ DON'T</Badge>
              <p className="text-sm">Use default variant for destructive actions (use destructive variant)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Additional documentation sections for other components...
// (Continuing with Input, Badge, Avatar, etc. - each following the same comprehensive pattern)

function InputDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  const componentCode = `import * as React from "react";
import { cn } from "./utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };`;

  const usageCode = `import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search } from 'lucide-react';

// Basic usage
<Input placeholder="Enter text..." />

// With label
<div className="space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="john_doe" />
</div>

// With type
<Input type="email" placeholder="you@example.com" />
<Input type="password" placeholder="••••••••" />

// With icon (custom wrapper)
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
  <Input placeholder="Search..." className="pl-10" />
</div>

// Disabled state
<Input disabled placeholder="Disabled input" />

// With validation state
<Input 
  placeholder="Email" 
  className="border-red-500 focus-visible:ring-red-500" 
/>`;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Input</h1>
          <Badge>Atom</Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Text input field for user data entry. Supports all native HTML input types.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Props</CardTitle>
        </CardHeader>
        <CardContent>
          <PropsTable props={[
            {
              name: 'type',
              type: '"text" | "email" | "password" | "number" | "search" | etc.',
              default: '"text"',
              description: 'HTML input type attribute'
            },
            {
              name: 'placeholder',
              type: 'string',
              description: 'Placeholder text when input is empty'
            },
            {
              name: 'value',
              type: 'string',
              description: 'Controlled input value'
            },
            {
              name: 'onChange',
              type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
              description: 'Change event handler'
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables the input'
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description: 'Makes the input required'
            },
            {
              name: 'className',
              type: 'string',
              description: 'Additional CSS classes'
            },
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Design Tokens Used</CardTitle>
        </CardHeader>
        <CardContent>
          <TokensTable tokens={[
            { name: 'Height', value: 'h-9 (36px)', usage: 'Input height' },
            { name: 'Padding X', value: 'px-3 (12px)', usage: 'Horizontal padding' },
            { name: 'Padding Y', value: 'py-1 (4px)', usage: 'Vertical padding' },
            { name: 'Border Radius', value: 'rounded-md (6px)', usage: 'Input rounding' },
            { name: 'Border Color', value: 'border-input', usage: 'Default border' },
            { name: 'Background', value: 'bg-transparent', usage: 'Background color' },
            { name: 'Text Size', value: 'text-sm (14px)', usage: 'Input text size' },
            { name: 'Placeholder Color', value: 'text-muted-foreground', usage: 'Placeholder color' },
            { name: 'Focus Ring', value: 'ring-1 ring-ring', usage: 'Focus state' },
            { name: 'Shadow', value: 'shadow-sm', usage: 'Subtle shadow' },
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock 
            code={usageCode} 
            language="tsx" 
            label="input-usage"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Full Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock 
            code={componentCode} 
            language="tsx" 
            label="input-implementation"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Always pair with a Label component for accessibility</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Use appropriate type attributes (email, password, tel, etc.)</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Provide clear placeholder text that describes the expected format</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✗ DON'T</Badge>
              <p className="text-sm">Use placeholder as the only label (accessibility issue)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Continue with more component documentations...
// Due to length, I'll add a few more key components

function AvatarDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  const componentCode = `// EmojiAvatar.tsx - Custom Avatar for Whispa
import * as React from "react";
import { cn } from "./utils";

export interface EmojiAvatarProps {
  emoji: string;           // VARCHAR(10) from database
  avatarColor: string;     // VARCHAR(50) gradient class from database
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  status?: "online" | "offline" | "away" | "busy";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-2xl",
};

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};

export const EmojiAvatar = React.forwardRef<HTMLDivElement, EmojiAvatarProps>(
  ({ emoji, avatarColor, size = "md", showStatus, status = "offline", className }, ref) => {
    return (
      <div ref={ref} className="relative inline-block">
        <div
          className={cn(
            "rounded-full flex items-center justify-center shadow-sm",
            avatarColor,
            sizeClasses[size],
            className
          )}
        >
          {emoji}
        </div>
        {showStatus && (
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white dark:border-gray-900",
              size === "sm" ? "w-2 h-2" : "w-3 h-3",
              statusColors[status],
              status === "online" && "animate-pulse"
            )}
          />
        )}
      </div>
    );
  }
);
EmojiAvatar.displayName = "EmojiAvatar";`;

  const usageCode = `import { EmojiAvatar } from './ui/EmojiAvatar';

// From database: user.avatar_emoji and user.avatar_color
const user = {
  avatar_emoji: '😎',
  avatar_color: 'bg-gradient-to-br from-purple-500 to-pink-500'
};

// Basic usage
<EmojiAvatar 
  emoji={user.avatar_emoji} 
  avatarColor={user.avatar_color} 
/>

// With size
<EmojiAvatar 
  emoji="🤓" 
  avatarColor="bg-gradient-to-br from-blue-500 to-cyan-500"
  size="lg" 
/>

// With status indicator
<EmojiAvatar 
  emoji="😇" 
  avatarColor="bg-gradient-to-br from-green-500 to-emerald-500"
  size="md"
  showStatus
  status="online"
/>

// All sizes
<EmojiAvatar emoji="🥳" avatarColor="bg-gradient-to-br from-orange-500 to-red-500" size="sm" />
<EmojiAvatar emoji="🥳" avatarColor="bg-gradient-to-br from-orange-500 to-red-500" size="md" />
<EmojiAvatar emoji="🥳" avatarColor="bg-gradient-to-br from-orange-500 to-red-500" size="lg" />
<EmojiAvatar emoji="🥳" avatarColor="bg-gradient-to-br from-orange-500 to-red-500" size="xl" />`;

  const databaseSchema = `-- User table schema
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  
  -- IMPORTANT: Avatar fields (NO avatar_url!)
  avatar_emoji VARCHAR(10) NOT NULL DEFAULT '😊',
  avatar_color VARCHAR(50) NOT NULL DEFAULT 'bg-gradient-to-br from-purple-500 to-pink-500',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Valid avatar_color values (store as VARCHAR(50)):
-- 'bg-gradient-to-br from-purple-500 to-pink-500'
-- 'bg-gradient-to-br from-blue-500 to-cyan-500'
-- 'bg-gradient-to-br from-green-500 to-emerald-500'
-- 'bg-gradient-to-br from-orange-500 to-red-500'
-- 'bg-gradient-to-br from-indigo-500 to-purple-500'
-- 'bg-gradient-to-br from-pink-500 to-rose-500'
-- 'bg-gradient-to-br from-teal-500 to-green-500'
-- 'bg-gradient-to-br from-yellow-400 to-orange-400'`;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Avatar (Emoji-based)</h1>
          <Badge>Atom</Badge>
          <Badge variant="outline">Custom</Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          User avatar component using emoji + gradient background. <strong>No image uploads or avatar_url</strong>.
        </p>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
        <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🚨 Critical Database Requirement</h4>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          The database does NOT have an <code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">avatar_url</code> field. 
          User avatars are stored as:
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li><code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">avatar_emoji</code> (VARCHAR(10)) - The emoji character</li>
          <li><code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">avatar_color</code> (VARCHAR(50)) - Tailwind gradient class string</li>
        </ul>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Props</CardTitle>
        </CardHeader>
        <CardContent>
          <PropsTable props={[
            {
              name: 'emoji',
              type: 'string',
              required: true,
              description: 'Emoji character from database avatar_emoji field (max 10 chars)'
            },
            {
              name: 'avatarColor',
              type: 'string',
              required: true,
              description: 'Tailwind gradient class from database avatar_color field (e.g., "bg-gradient-to-br from-purple-500 to-pink-500")'
            },
            {
              name: 'size',
              type: '"sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: 'Avatar size variant'
            },
            {
              name: 'showStatus',
              type: 'boolean',
              default: 'false',
              description: 'Whether to show online status indicator'
            },
            {
              name: 'status',
              type: '"online" | "offline" | "away" | "busy"',
              default: '"offline"',
              description: 'Online status (requires showStatus=true)'
            },
            {
              name: 'className',
              type: 'string',
              description: 'Additional CSS classes'
            },
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Design Tokens Used</CardTitle>
        </CardHeader>
        <CardContent>
          <TokensTable tokens={[
            { name: 'Size (sm)', value: 'w-8 h-8 (32px), text-sm', usage: 'Small avatar', preview: <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">😎</div> },
            { name: 'Size (md)', value: 'w-10 h-10 (40px), text-base', usage: 'Default avatar', preview: <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-base">😎</div> },
            { name: 'Size (lg)', value: 'w-12 h-12 (48px), text-lg', usage: 'Large avatar', preview: <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-lg">😎</div> },
            { name: 'Size (xl)', value: 'w-16 h-16 (64px), text-2xl', usage: 'Extra large avatar', preview: <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">😎</div> },
            { name: 'Border Radius', value: 'rounded-full', usage: 'Circular shape' },
            { name: 'Shadow', value: 'shadow-sm', usage: 'Subtle elevation' },
            { name: 'Status Dot Size', value: 'w-2 h-2 (sm), w-3 h-3 (md+)', usage: 'Status indicator' },
            { name: 'Status Colors', value: 'green-500, gray-400, yellow-500, red-500', usage: 'Online states' },
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock 
            code={databaseSchema} 
            language="sql" 
            label="avatar-schema"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock 
            code={usageCode} 
            language="tsx" 
            label="avatar-usage"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Full Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock 
            code={componentCode} 
            language="tsx" 
            label="avatar-implementation"
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Gradient Options</CardTitle>
          <CardDescription>Valid values for avatar_color database field</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Purple Pink', value: 'bg-gradient-to-br from-purple-500 to-pink-500' },
              { label: 'Blue Cyan', value: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
              { label: 'Green Emerald', value: 'bg-gradient-to-br from-green-500 to-emerald-500' },
              { label: 'Orange Red', value: 'bg-gradient-to-br from-orange-500 to-red-500' },
              { label: 'Indigo Purple', value: 'bg-gradient-to-br from-indigo-500 to-purple-500' },
              { label: 'Pink Rose', value: 'bg-gradient-to-br from-pink-500 to-rose-500' },
              { label: 'Teal Green', value: 'bg-gradient-to-br from-teal-500 to-green-500' },
              { label: 'Yellow Orange', value: 'bg-gradient-to-br from-yellow-400 to-orange-400' },
            ].map((gradient, idx) => (
              <div key={idx} className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-full ${gradient.value} flex items-center justify-center text-lg`}>
                    😎
                  </div>
                  <span className="font-semibold text-sm">{gradient.label}</span>
                </div>
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block break-all">
                  {gradient.value}
                </code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Always fetch both avatar_emoji and avatar_color from database</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Store gradient classes as complete strings in avatar_color field</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✓ DO</Badge>
              <p className="text-sm">Use appropriate size variants based on context (sm for lists, xl for profiles)</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✗ DON'T</Badge>
              <p className="text-sm">Try to use avatar_url (this field does not exist in the schema)</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6">✗ DON'T</Badge>
              <p className="text-sm">Allow image uploads - the system is emoji-only by design</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add placeholder functions for remaining components
function BadgeDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">Badge documentation coming soon...</div>;
}

function SwitchDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">Switch documentation coming soon...</div>;
}

function CheckboxDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">Checkbox documentation coming soon...</div>;
}

function SliderDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">Slider documentation coming soon...</div>;
}

function SearchBarDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">SearchBar documentation coming soon...</div>;
}

function FormFieldDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">FormField documentation coming soon...</div>;
}

function UserCardDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">UserCard documentation coming soon...</div>;
}

function MessageBubbleDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">MessageBubble documentation coming soon...</div>;
}

function StatusIndicatorDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">StatusIndicator documentation coming soon...</div>;
}

function ChatWindowDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">ChatWindow documentation coming soon...</div>;
}

function ProfileCardDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">ProfileCard documentation coming soon...</div>;
}

function SettingsPanelDocumentation({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, label: string) => void; copiedCode: string | null }) {
  return <div className="text-gray-500">SettingsPanel documentation coming soon...</div>;
}
