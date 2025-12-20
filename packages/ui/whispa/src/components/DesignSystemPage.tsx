import { useState } from 'react';
import { ArrowLeft, MessageCircle, Heart, Star, Check, X, Search, Shield, Globe, Video, UserPlus, Zap, Bell, Menu, Settings, Clock, History, ChevronRight, ChevronLeft, Lock, Users, TrendingUp, Sparkles, Award, Database, Workflow } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { ThemeMode } from '../hooks/useTheme';

interface DesignSystemPageProps {
  onBack: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

export function DesignSystemPage({ onBack, themeMode, onThemeChange }: DesignSystemPageProps) {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Design System</h1>
              <p className="text-gray-500 dark:text-gray-400">Core components and style guide for Whispa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onThemeChange(themeMode === 'dark' ? 'light' : 'dark')}
            >
              {themeMode === 'dark' ? '🌙' : '☀️'}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="antd">Ant Design</TabsTrigger>
            <TabsTrigger value="system">System Arch</TabsTrigger>
          </TabsList>

          {/* Colors Section */}
          <TabsContent value="colors" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">Brand Colors</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <ColorCard name="Purple 600" className="bg-purple-600" hex="#9333ea" />
                <ColorCard name="Purple 500" className="bg-purple-500" hex="#a855f7" />
                <ColorCard name="Pink 600" className="bg-pink-600" hex="#db2777" />
                <ColorCard name="Pink 500" className="bg-pink-500" hex="#ec4899" />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Gradients</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GradientCard 
                  name="Primary Brand" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600" 
                  usage="from-purple-600 to-pink-600"
                />
                <GradientCard 
                  name="Safety & Trust" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500" 
                  usage="from-blue-500 to-cyan-500"
                />
                <GradientCard 
                  name="Video & Action" 
                  className="bg-gradient-to-r from-orange-500 to-red-500" 
                  usage="from-orange-500 to-red-500"
                />
                <GradientCard 
                  name="Growth & Success" 
                  className="bg-gradient-to-r from-green-500 to-emerald-500" 
                  usage="from-green-500 to-emerald-500"
                />
                <GradientCard 
                  name="Global & Brand" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500" 
                  usage="from-purple-500 to-pink-500"
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Page Backgrounds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="h-24 w-full rounded-lg border border-gray-100 dark:border-gray-700 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950" />
                  <div>
                    <p className="font-medium text-sm">Landing Page Hero</p>
                    <code className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded mt-1 block w-fit">
                      bg-gradient-to-b from-white via-purple-50/30 to-white
                    </code>
                  </div>
                </div>
                <div className="space-y-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="h-24 w-full rounded-lg border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-950 dark:via-purple-950/20 dark:to-pink-950/20" />
                  <div>
                    <p className="font-medium text-sm">App Background</p>
                    <code className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded mt-1 block w-fit">
                      bg-gradient-to-br from-gray-50 via-purple-50/30 ...
                    </code>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Semantic Colors</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <ColorCard name="Success (Green 500)" className="bg-green-500" hex="#22c55e" />
                <ColorCard name="Error (Red 500)" className="bg-red-500" hex="#ef4444" />
                <ColorCard name="Warning (Yellow 500)" className="bg-yellow-500" hex="#eab308" />
                <ColorCard name="Info (Blue 500)" className="bg-blue-500" hex="#3b82f6" />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Neutral Colors</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <ColorCard name="Gray 950 (Dark Bg)" className="bg-gray-950" hex="#030712" />
                <ColorCard name="Gray 900" className="bg-gray-900" hex="#111827" />
                <ColorCard name="Gray 800" className="bg-gray-800" hex="#1f2937" />
                <ColorCard name="Gray 500" className="bg-gray-500" hex="#6b7280" />
                <ColorCard name="Gray 200" className="bg-gray-200" hex="#e5e7eb" />
                <ColorCard name="Gray 50 (Light Bg)" className="bg-gray-50" hex="#f9fafb" />
              </div>
            </section>
          </TabsContent>

          {/* Typography Section */}
          <TabsContent value="typography" className="space-y-8">
            <div className="grid gap-8 p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
                  Hero Display
                </h1>
                <p className="text-sm text-gray-500 mt-2">text-4xl sm:text-5xl lg:text-7xl + gradient clip</p>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Heading 1</h1>
                <p className="text-sm text-gray-500 mt-2">text-4xl sm:text-5xl lg:text-6xl font-bold</p>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">Heading 2</h2>
                <p className="text-sm text-gray-500 mt-2">text-3xl sm:text-4xl font-bold</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Heading 3</h3>
                <p className="text-sm text-gray-500 mt-2">text-2xl font-bold</p>
              </div>
              <div>
                <h4 className="text-xl font-bold">Heading 4</h4>
                <p className="text-sm text-gray-500 mt-2">text-xl font-bold</p>
              </div>
              <div>
                <p className="text-base text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                  Body Text: The quick brown fox jumps over the lazy dog. Whispa connects you with strangers from around the world. Secure, anonymous, and fun.
                </p>
                <p className="text-sm text-gray-500 mt-2">text-base text-gray-700 dark:text-gray-300 leading-relaxed</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Small Text: This is for captions, timestamps, or secondary information.
                </p>
                <p className="text-sm text-gray-500 mt-2">text-sm text-gray-500 dark:text-gray-400</p>
              </div>
            </div>
          </TabsContent>

          {/* Components Section */}
          <TabsContent value="components" className="space-y-12">
            
            {/* Chat Interface */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Chat Interface</h3>
              <div className="space-y-4 max-w-md p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
                {/* Incoming Message */}
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200 text-sm">
                      Hey! This is how an incoming message looks.
                    </p>
                  </div>
                </div>
                
                {/* Outgoing Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] shadow-lg">
                    <p className="text-white text-sm">
                      And this is a message sent by you! It uses the primary gradient.
                    </p>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm border border-gray-200 dark:border-gray-700 w-fit">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Special Badges & Indicators */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Badges & Indicators</h3>
              <div className="flex flex-wrap gap-6 items-center">
                
                {/* Trusted Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800">
                  <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Trusted Badge</span>
                </div>

                {/* Safety Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-blue-700 dark:text-blue-300">Safety First</span>
                </div>

                {/* Status Dots */}
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm">Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    <span className="text-sm">Offline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm">Busy/Notify</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Effects & Shadows */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Effects & Shadows</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                  shadow-sm
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 text-center">
                  shadow-lg
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 text-center">
                  shadow-2xl
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl shadow-purple-500/25 border border-purple-100 dark:border-purple-900/50 text-center">
                  Colored Shadow
                  <code className="block text-xs mt-2 text-gray-500">shadow-purple-500/25</code>
                </div>
                <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10" />
                  Glass Effect
                  <code className="block text-xs mt-2 text-gray-500">backdrop-blur-xl</code>
                </div>
              </div>
            </section>

            {/* Buttons */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Buttons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button>Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                  Gradient Brand
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><MessageCircle className="w-4 h-4" /></Button>
              </div>
            </section>

            {/* Form Elements */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Form Elements</h3>
              <div className="grid max-w-md gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Input Field</label>
                  <Input placeholder="Type something..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Disabled Input</label>
                  <Input disabled placeholder="Can't type here" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="airplane-mode" />
                    <label htmlFor="airplane-mode" className="text-sm font-medium">Toggle Switch</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="airplane-mode-checked" defaultChecked />
                    <label htmlFor="airplane-mode-checked" className="text-sm font-medium">Checked</label>
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                   <label className="text-sm font-medium">Slider</label>
                   <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </section>

            {/* Cards & Content */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Cards & Content</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description goes here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is a standard card component used for grouping content.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Action</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-none">
                  <CardHeader>
                    <CardTitle className="text-white">Brand Card</CardTitle>
                    <CardDescription className="text-white/80">Highlighted content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Used for special features or promotions.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-gray-100">
                      Action
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </section>

            {/* Badges & Avatars */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Badges & Avatars</h3>
              <div className="flex gap-4 items-center">
                <Badge>Default Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                  Brand Gradient
                </Badge>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg">
                  😎
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <UserPlus className="w-5 h-5" />
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Layout Section */}
          <TabsContent value="layout" className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Navigation Structures</h3>
              <div className="space-y-8">
                
                {/* Minimal Header */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">Ultra-Minimal App Header (h-9)</h4>
                  <div className="w-full h-9 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Menu className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div className="font-medium text-xs">Active Chat Name</div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                    </div>
                  </div>
                </div>

                {/* Sidebar Navigation Item */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">Sidebar Navigation Item</h4>
                  <div className="flex gap-4">
                    {/* Default */}
                    <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all">
                        <Users className="w-5 h-5" />
                      </button>
                    </div>
                    {/* Active/Notification */}
                    <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 relative">
                        <MessageCircle className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tab Triggers */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">Chat Tab Triggers</h4>
                  <div className="flex border-b border-gray-200 dark:border-gray-800">
                    <div className="px-6 py-3 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex items-center gap-2 border-t-2 border-t-purple-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Stranger</span>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex items-center gap-2 opacity-60">
                      <span className="text-lg">👩</span>
                      <span className="text-sm">Sarah</span>
                      <X className="w-3 h-3 ml-2 hover:text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Card Variations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Feature Card */}
                <div className="group p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-xl cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Feature Card</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Used on the landing page. Features a hover effect on the border and icon scale.
                  </p>
                </div>

                {/* Stats Card */}
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-1">1M+</div>
                  <div className="text-sm text-gray-500">Global Users</div>
                </div>

              </div>
            </section>
          </TabsContent>

          {/* Animations Section */}
          <TabsContent value="animations" className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Micro-Interactions</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Hover Scale */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">Hover Scale</h4>
                  <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <button className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300">
                      Hover Me
                    </button>
                  </div>
                  <code className="text-xs text-gray-500 block">hover:scale-105 transition-transform duration-300</code>
                </div>

                {/* Icon Rotate */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">Group Hover Rotate</h4>
                  <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <button className="group px-6 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>Hover Me</span>
                    </button>
                  </div>
                  <code className="text-xs text-gray-500 block">group-hover:rotate-12</code>
                </div>

                {/* Pulse */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">Pulse Indicator</h4>
                  <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-900 rounded-xl">
                     <div className="relative">
                       <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white dark:border-gray-900" />
                     </div>
                  </div>
                  <code className="text-xs text-gray-500 block">animate-pulse</code>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Entrance Animations</h3>
              <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-in fade-in slide-in-from-bottom-4 duration-700" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200" />
                </div>
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">Standard Page Load Sequence</p>
                  <code className="text-xs text-gray-400 mt-2 block">
                    animate-in fade-in slide-in-from-bottom-4 duration-700
                  </code>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Icons Section */}
          <TabsContent value="icons" className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              <IconCard icon={MessageCircle} name="MessageCircle" />
              <IconCard icon={Heart} name="Heart" />
              <IconCard icon={Star} name="Star" />
              <IconCard icon={Shield} name="Shield" />
              <IconCard icon={Globe} name="Globe" />
              <IconCard icon={Video} name="Video" />
              <IconCard icon={UserPlus} name="UserPlus" />
              <IconCard icon={Search} name="Search" />
              <IconCard icon={Check} name="Check" />
              <IconCard icon={X} name="X" />
              <IconCard icon={Zap} name="Zap" />
              <IconCard icon={Bell} name="Bell" />
              <IconCard icon={Menu} name="Menu" />
              <IconCard icon={Settings} name="Settings" />
              <IconCard icon={Clock} name="Clock" />
              <IconCard icon={History} name="History" />
              <IconCard icon={ArrowLeft} name="ArrowLeft" />
              <IconCard icon={ChevronRight} name="ChevronRight" />
              <IconCard icon={ChevronLeft} name="ChevronLeft" />
              <IconCard icon={Lock} name="Lock" />
              <IconCard icon={Users} name="Users" />
              <IconCard icon={TrendingUp} name="TrendingUp" />
              <IconCard icon={Sparkles} name="Sparkles" />
              <IconCard icon={Award} name="Award" />
            </div>
          </TabsContent>
          {/* Ant Design Section */}
          <TabsContent value="antd" className="space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#1677ff] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg viewBox="0 0 1024 1024" className="w-8 h-8 text-white" fill="currentColor" aria-hidden="true"><path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"/></svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Ant Design 6.0 Theme</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Copy this comprehensive configuration object to seamlessly integrate Ant Design 6.0 components with the Whispa design system, including full token mapping.</p>
                </div>
              </div>

              <div className="bg-[#0d1117] dark:bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] dark:bg-gray-900 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="ml-3 text-xs text-gray-400 font-mono">theme/antdConfig.ts</span>
                  </div>
                  <button className="text-xs text-gray-400 hover:text-white transition-colors">Copy</button>
                </div>
                <div className="p-6 overflow-x-auto custom-scrollbar">
                  <pre className="text-sm text-[#e6edf3] font-mono leading-relaxed">
{`import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

// 🎨 WHISPA DESIGN SYSTEM - ANT DESIGN 6.0 INTEGRATION
// =====================================================

export const whispaTheme: ThemeConfig = {
  // 1. Global Token Overrides
  token: {
    // Brand Colors (Matching Tailwind tokens)
    colorPrimary: '#9333ea',    // Purple 600
    colorInfo: '#3b82f6',       // Blue 500
    colorSuccess: '#22c55e',    // Green 500
    colorWarning: '#eab308',    // Yellow 500
    colorError: '#ef4444',      // Red 500
    
    // Neutrals
    colorTextBase: '#111827',   // Gray 900
    colorBgBase: '#ffffff',     // White
    
    // Typography
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 16,               // Base size to match Rem
    fontSizeHeading1: 36,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    
    // Spacing & Shapes
    borderRadius: 8,            // Default radius
    borderRadiusLG: 12,         // Large radius
    borderRadiusSM: 4,          // Small radius
    wireframe: false,
    
    // Transitions
    motionUnit: 0.1,
  },
  
  // 2. Component-Specific Overrides
  components: {
    Button: {
      controlHeight: 44,        // Taller buttons
      controlHeightSM: 36,
      borderRadius: 8,
      primaryShadow: '0 4px 14px 0 rgba(147, 51, 234, 0.3)', // Purple glow
      fontWeight: 500,
      paddingContentHorizontal: 24,
    },
    Input: {
      controlHeight: 44,
      borderRadius: 8,
      activeBorderColor: '#9333ea',
      hoverBorderColor: '#a855f7',
      colorBgContainer: '#f9fafb', // Gray 50
    },
    Select: {
      controlHeight: 44,
      borderRadius: 8,
      colorBgContainer: '#f9fafb',
    },
    Card: {
      borderRadiusLG: 16,       // Rounded-2xl
      boxShadowTertiary: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', // shadow-md
    },
    Modal: {
      borderRadiusLG: 20,
      contentBg: '#ffffff',
      headerBg: '#ffffff',
    },
    Table: {
      borderRadiusLG: 12,
      headerBg: '#f9fafb',      // Gray 50
      headerColor: '#374151',   // Gray 700
      rowHoverBg: '#f3f4f6',    // Gray 100
    },
    Tag: {
      borderRadiusSM: 6,
    },
    Menu: {
      itemBorderRadius: 8,
      itemSelectedColor: '#9333ea',
      itemSelectedBg: '#f3e8ff', // Purple 100
    }
  },
  
  // 3. Algorithm (Dark Mode support)
  // algorithm: theme.defaultAlgorithm, // or theme.darkAlgorithm
};`}
                  </pre>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-xl p-4 flex gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg h-fit">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">Ant Design 6.0 Features</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    This configuration leverages new Design Token features in v6.0 for better performance and consistency.
                    Use <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded">App</code> component wrapper for static methods like message and modal to inherit these tokens automatically.
                  </p>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* System Architecture Section */}
          <TabsContent value="system" className="space-y-12">
            
            {/* 1. Database Design Comparison */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Database className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">1. Production Database Schema</h3>
                  <p className="text-gray-500 dark:text-gray-400">Optimized PostgreSQL schema using UUIDs for horizontal scalability without complex partitioning.</p>
                </div>
              </div>
              
              <div className="w-full">
                <div className="bg-[#0d1117] dark:bg-black rounded-xl overflow-hidden border border-gray-800 shadow-xl">
                    <div className="px-4 py-2 bg-[#161b22] border-b border-gray-800 text-xs text-gray-400 font-mono">schema.sql</div>
                    <div className="p-4 overflow-x-auto custom-scrollbar h-[600px]">
                      <pre className="text-xs text-[#e6edf3] font-mono leading-relaxed">
{`-- 1. USERS
-- Core identity. Uses UUIDv4 for universal compatibility.
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE, 
  password_hash VARCHAR(255),
  is_anonymous BOOLEAN DEFAULT true,
  avatar_emoji VARCHAR(10) DEFAULT '😊',
  avatar_color VARCHAR(50) DEFAULT 'bg-gradient-to-br from-purple-500 to-pink-500',
  bio TEXT,
  last_seen_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. USER PREFERENCES
-- E.g., Tags for matching ("Coding", "Music")
CREATE TABLE user_interests (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  interest VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, interest)
);

-- 3. RELATIONSHIPS (Social Graph)
-- Self-referential adjacency list.
CREATE TABLE relationships (
  user_id_a UUID REFERENCES users(id) ON DELETE CASCADE,
  user_id_b UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING', 'ACCEPTED', 'BLOCKED'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id_a, user_id_b)
);
-- Index for fast "Who blocked me?" or "Who are my friends?" lookups
CREATE INDEX idx_relationships_status ON relationships(user_id_b, status);

-- 4. CONVERSATIONS
-- Metadata for chat sessions.
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) DEFAULT 'STRANGER', -- 'STRANGER', 'FRIEND', 'GROUP'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Participants Join Table (M:N)
CREATE TABLE conversation_participants (
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT NOW(),
  role VARCHAR(20) DEFAULT 'MEMBER', -- 'ADMIN', 'MEMBER'
  PRIMARY KEY (conversation_id, user_id)
);

-- 5. MESSAGES
-- High-volume table. Indexed for scrolling performance.
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  content TEXT, -- Encrypted at application layer
  message_type VARCHAR(10) DEFAULT 'TEXT', -- 'TEXT', 'IMAGE', 'SYSTEM'
  media_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
-- Composite index is CRITICAL for "SELECT * FROM messages WHERE conversation_id = X ORDER BY created_at DESC LIMIT 50"
CREATE INDEX idx_messages_scrolling ON messages(conversation_id, created_at DESC);

-- 6. REPORTS (Moderation)
CREATE TABLE reports (
  id SERIAL PRIMARY KEY, -- Auto-increment is fine for internal tools
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  violator_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reason VARCHAR(50),
  details TEXT,
  status VARCHAR(20) DEFAULT 'OPEN', -- 'OPEN', 'RESOLVED', 'DISMISSED'
  created_at TIMESTAMP DEFAULT NOW()
);`}
                      </pre>
                    </div>
                  </div>
              </div>
            </section>

            {/* 2. Entity-Relationship Diagram (ERD) */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">2. Entity-Relationship Diagram (ERD)</h3>
              </div>
              
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <svg viewBox="0 0 1000 600" className="w-full min-w-[800px] h-auto font-sans">
                    <defs>
                       <marker id="crowsfoot-one" markerWidth="12" markerHeight="12" refX="12" refY="6" orient="auto">
                        <path d="M0,6 L12,6 M6,0 L6,12" stroke="#64748B" strokeWidth="1.5" fill="none"/>
                      </marker>
                      <marker id="crowsfoot-many" markerWidth="12" markerHeight="12" refX="0" refY="6" orient="auto">
                        <path d="M0,6 L12,6 M0,0 L6,6 L0,12" stroke="#64748B" strokeWidth="1.5" fill="none"/>
                      </marker>
                      <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="110%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
                      </filter>
                    </defs>

                    {/* USERS TABLE (Center) */}
                    <g transform="translate(400, 200)">
                      <rect x="0" y="0" width="200" height="220" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" filter="url(#card-shadow)" />
                      <path d="M0,35 L200,35" stroke="#3B82F6" strokeWidth="1" />
                      <text x="100" y="22" textAnchor="middle" fill="#1E3A8A" fontWeight="bold" fontSize="14">USERS</text>
                      
                      <text x="15" y="55" fill="#1E40AF" fontSize="12" fontWeight="bold">PK  id (UUID)</text>
                      <text x="15" y="75" fill="#374151" fontSize="12">username</text>
                      <text x="15" y="95" fill="#374151" fontSize="12">email</text>
                      <text x="15" y="115" fill="#374151" fontSize="12">password_hash</text>
                      <text x="15" y="135" fill="#374151" fontSize="12">is_anonymous</text>
                      <text x="15" y="155" fill="#374151" fontSize="12">avatar_emoji</text>
                      <text x="15" y="175" fill="#374151" fontSize="12">avatar_color</text>
                      <text x="15" y="195" fill="#374151" fontSize="12">created_at</text>
                    </g>

                    {/* USER_INTERESTS (Left) */}
                    <g transform="translate(50, 220)">
                      <rect x="0" y="0" width="180" height="100" rx="8" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2" filter="url(#card-shadow)" />
                      <path d="M0,35 L180,35" stroke="#22C55E" strokeWidth="1" />
                      <text x="90" y="22" textAnchor="middle" fill="#14532D" fontWeight="bold" fontSize="14">USER_INTERESTS</text>
                      
                      <text x="15" y="55" fill="#15803D" fontSize="12" fontWeight="bold">PK,FK  user_id</text>
                      <text x="15" y="75" fill="#15803D" fontSize="12" fontWeight="bold">PK     interest</text>
                      <text x="15" y="95" fill="#374151" fontSize="12">weight</text>
                    </g>

                    {/* RELATIONSHIPS (Top) */}
                    <g transform="translate(400, 20)">
                      <rect x="0" y="0" width="200" height="110" rx="8" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" filter="url(#card-shadow)" />
                      <path d="M0,35 L200,35" stroke="#A855F7" strokeWidth="1" />
                      <text x="100" y="22" textAnchor="middle" fill="#581C87" fontWeight="bold" fontSize="14">RELATIONSHIPS</text>
                      
                      <text x="15" y="55" fill="#7E22CE" fontSize="12" fontWeight="bold">PK,FK  user_id_a</text>
                      <text x="15" y="75" fill="#7E22CE" fontSize="12" fontWeight="bold">PK,FK  user_id_b</text>
                      <text x="15" y="95" fill="#374151" fontSize="12">status</text>
                    </g>

                    {/* CONVERSATIONS (Right) */}
                    <g transform="translate(750, 220)">
                      <rect x="0" y="0" width="180" height="100" rx="8" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" filter="url(#card-shadow)" />
                      <path d="M0,35 L180,35" stroke="#EA580C" strokeWidth="1" />
                      <text x="90" y="22" textAnchor="middle" fill="#7C2D12" fontWeight="bold" fontSize="14">CONVERSATIONS</text>
                      
                      <text x="15" y="55" fill="#C2410C" fontSize="12" fontWeight="bold">PK  id</text>
                      <text x="15" y="75" fill="#374151" fontSize="12">type</text>
                      <text x="15" y="95" fill="#374151" fontSize="12">is_active</text>
                    </g>

                    {/* MESSAGES (Bottom Right) */}
                    <g transform="translate(750, 420)">
                      <rect x="0" y="0" width="180" height="120" rx="8" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" filter="url(#card-shadow)" />
                      <path d="M0,35 L180,35" stroke="#EA580C" strokeWidth="1" />
                      <text x="90" y="22" textAnchor="middle" fill="#7C2D12" fontWeight="bold" fontSize="14">MESSAGES</text>
                      
                      <text x="15" y="55" fill="#C2410C" fontSize="12" fontWeight="bold">PK  id</text>
                      <text x="15" y="75" fill="#C2410C" fontSize="12" fontWeight="bold">FK  conversation_id</text>
                      <text x="15" y="95" fill="#C2410C" fontSize="12" fontWeight="bold">FK  sender_id</text>
                      <text x="15" y="115" fill="#374151" fontSize="12">content</text>
                    </g>

                    {/* REPORTS (Bottom Center) */}
                    <g transform="translate(400, 450)">
                      <rect x="0" y="0" width="200" height="110" rx="8" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" filter="url(#card-shadow)" />
                      <path d="M0,35 L200,35" stroke="#EF4444" strokeWidth="1" />
                      <text x="100" y="22" textAnchor="middle" fill="#991B1B" fontWeight="bold" fontSize="14">REPORTS</text>
                      
                      <text x="15" y="55" fill="#B91C1C" fontSize="12" fontWeight="bold">PK  id</text>
                      <text x="15" y="75" fill="#B91C1C" fontSize="12" fontWeight="bold">FK  reporter_id</text>
                      <text x="15" y="95" fill="#B91C1C" fontSize="12" fontWeight="bold">FK  violator_id</text>
                    </g>

                    {/* CONNECTIONS */}
                    
                    {/* Users to Interests (1:N) */}
                    <path d="M400,270 L230,270" stroke="#64748B" strokeWidth="2" markerEnd="url(#crowsfoot-many)" />
                    <text x="315" y="260" fill="#64748B" fontSize="10" textAnchor="middle">Has Many</text>

                    {/* Users to Relationships (1:N - Self) */}
                    <path d="M500,200 L500,130" stroke="#64748B" strokeWidth="2" markerEnd="url(#crowsfoot-many)" />
                    
                    {/* Users to Conversations (N:M via hidden link table) */}
                    <path d="M600,270 L750,270" stroke="#64748B" strokeWidth="2" markerEnd="url(#crowsfoot-many)" />
                    
                    {/* Conversations to Messages (1:N) */}
                    <path d="M840,320 L840,420" stroke="#64748B" strokeWidth="2" markerEnd="url(#crowsfoot-many)" />

                    {/* Users to Reports (1:N) */}
                    <path d="M500,380 L500,450" stroke="#64748B" strokeWidth="2" markerEnd="url(#crowsfoot-many)" />
                  </svg>
                </div>
              </div>
            </section>

            {/* 3. Data Dictionary */}
             <section className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-2">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Database className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold">3. Data Dictionary</h3>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Entity / Attribute</th>
                      <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Type</th>
                      <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Keys</th>
                      <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-black">
                    {/* USERS */}
                    <tr className="bg-blue-50/50 dark:bg-blue-900/10"><td colSpan={4} className="px-6 py-2 font-bold text-blue-700 dark:text-blue-400">USERS</td></tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK</span></td>
                      <td className="px-6 py-3 text-gray-500">Unique user identifier (UUID v4).</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">username</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(50)</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-xs">UQ</span></td>
                      <td className="px-6 py-3 text-gray-500">Unique display name.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">email</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(255)</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-xs">UQ</span></td>
                      <td className="px-6 py-3 text-gray-500">User email address.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">password_hash</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(255)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Hashed password (Argon2/Bcrypt).</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">is_anonymous</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">BOOLEAN</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">True if user hasn't fully registered.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">avatar_emoji</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(10)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">User's chosen emoji avatar.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">avatar_color</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(50)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Tailwind gradient class for background.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">bio</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TEXT</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">User biography.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">last_active_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Last seen timestamp.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">created_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Account creation timestamp.</td>
                    </tr>

                    {/* USER_INTERESTS */}
                    <tr className="bg-green-50/50 dark:bg-green-900/10"><td colSpan={4} className="px-6 py-2 font-bold text-green-700 dark:text-green-400">USER_INTERESTS</td></tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">user_id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK, FK</span></td>
                      <td className="px-6 py-3 text-gray-500">Reference to Users table.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">interest</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(50)</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK</span></td>
                      <td className="px-6 py-3 text-gray-500">Interest tag (e.g. 'Coding').</td>
                    </tr>

                    {/* RELATIONSHIPS */}
                    <tr className="bg-purple-50/50 dark:bg-purple-900/10"><td colSpan={4} className="px-6 py-2 font-bold text-purple-700 dark:text-purple-400">RELATIONSHIPS</td></tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">user_id_a</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK, FK</span></td>
                      <td className="px-6 py-3 text-gray-500">Initiator of the relationship.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">user_id_b</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK, FK</span></td>
                      <td className="px-6 py-3 text-gray-500">Recipient of the relationship.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">status</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(20)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">'PENDING', 'ACCEPTED', 'BLOCKED'.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">created_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">When the relationship was created.</td>
                    </tr>

                     {/* CONVERSATIONS */}
                    <tr className="bg-orange-50/50 dark:bg-orange-900/10"><td colSpan={4} className="px-6 py-2 font-bold text-orange-700 dark:text-orange-400">CONVERSATIONS</td></tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK</span></td>
                      <td className="px-6 py-3 text-gray-500">Unique conversation ID.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">type</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(20)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">'DIRECT', 'GROUP'.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">created_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Creation time.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">updated_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Last activity time.</td>
                    </tr>

                    {/* CONVERSATION_PARTICIPANTS */}
                    <tr className="bg-orange-50/50 dark:bg-orange-900/10"><td colSpan={4} className="px-6 py-2 font-bold text-orange-700 dark:text-orange-400">CONVERSATION_PARTICIPANTS</td></tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">conversation_id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK, FK</span></td>
                      <td className="px-6 py-3 text-gray-500">Conversation reference.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">user_id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK, FK</span></td>
                      <td className="px-6 py-3 text-gray-500">Participant reference.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">role</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(20)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">'ADMIN', 'MEMBER'.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">joined_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">When user joined.</td>
                    </tr>

                    {/* MESSAGES */}
                    <tr className="bg-orange-50/50 dark:bg-orange-900/10"><td colSpan={4} className="px-6 py-2 font-bold text-orange-700 dark:text-orange-400">MESSAGES</td></tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK</span></td>
                      <td className="px-6 py-3 text-gray-500">Unique message identifier.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">conversation_id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">FK</span></td>
                      <td className="px-6 py-3 text-gray-500">Reference to Conversation.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">sender_id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">FK</span></td>
                      <td className="px-6 py-3 text-gray-500">Sender reference.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">content</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TEXT</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Message content (encrypted).</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">message_type</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(20)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">'TEXT', 'IMAGE', 'SYSTEM'.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">is_read</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">BOOLEAN</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Read status.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">created_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Timestamp.</td>
                    </tr>

                    {/* REPORTS */}
                    <tr className="bg-red-50/50 dark:bg-red-900/10"><td colSpan={4} className="px-6 py-2 font-bold text-red-700 dark:text-red-400">REPORTS</td></tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">SERIAL</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK</span></td>
                      <td className="px-6 py-3 text-gray-500">Auto-incrementing report ID.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">reporter_id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">FK</span></td>
                      <td className="px-6 py-3 text-gray-500">User filing the report.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">reported_user_id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">FK</span></td>
                      <td className="px-6 py-3 text-gray-500">The reported user.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">reason</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(50)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Categorized reason.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">details</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TEXT</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Optional text description.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">status</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(20)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">'OPEN', 'RESOLVED', 'DISMISSED'.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">created_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Submission time.</td>
                    </tr>

                    {/* AUDIT LOGS */}
                    <tr className="bg-gray-50/50 dark:bg-gray-800/30"><td colSpan={4} className="px-6 py-2 font-bold text-gray-700 dark:text-gray-400">AUDIT_LOGS</td></tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">SERIAL</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">PK</span></td>
                      <td className="px-6 py-3 text-gray-500">Log ID.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">user_id</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">UUID</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-bold">FK</span></td>
                      <td className="px-6 py-3 text-gray-500">User associated with event.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">action</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">VARCHAR(50)</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Event type.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">ip_address</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">INET</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Origin IP.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-mono text-gray-700 dark:text-gray-300">created_at</td>
                      <td className="px-6 py-3 text-purple-600 dark:text-purple-400">TIMESTAMP</td>
                      <td className="px-6 py-3">-</td>
                      <td className="px-6 py-3 text-gray-500">Log time.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Backend Architecture Comparison */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-2">
                 <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <Zap className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold">4. Backend Framework Strategy</h3>
              </div>

              <div className="grid lg:grid-cols-1 gap-8">
                 <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-red-600 dark:text-red-400">NestJS (Node.js)</h4>
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">Unified TypeScript Stack</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A unified backend architecture using NestJS for both API and WebSocket handling. 
                    This allows for shared TypeScript interfaces (DTOs) with the Next.js frontend, reducing bugs and simplifying development.
                    PostgreSQL is used for persistence, while Redis handles the pub/sub message queue and temporary cache.
                  </p>
                   <div className="bg-[#0d1117] dark:bg-black rounded-xl overflow-hidden border border-gray-800 shadow-xl">
                    <div className="px-4 py-2 bg-[#161b22] border-b border-gray-800 text-xs text-gray-400 font-mono">chat.gateway.ts</div>
                    <div className="p-4 overflow-x-auto custom-scrollbar">
                      <pre className="text-xs text-[#e6edf3] font-mono leading-relaxed">
{`@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(private matchService: MatchingService) {}

  @SubscribeMessage('find_match')
  async handleMatch(client: Socket, data: Preferences) {
    // 1. Add user to Redis queue for matching
    await this.matchService.addToQueue(client.id, data);
    
    // 2. Try to find match immediately
    const match = await this.matchService.findMatch(data);
    
    if (match) {
      // 3. Create persistent room & notify both users
      const roomId = uuid();
      await this.roomService.createRoom(roomId, [client.id, match.id]);
      
      this.server.to([client.id, match.id]).join(roomId);
      this.server.to(roomId).emit('matched', { roomId });
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Frontend Path Design */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">5. Frontend Path Design</h3>
              </div>
              
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Route Security Strategy</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      We use a High-Order Component (HOC) pattern to protect sensitive routes. The application is divided into two distinct zones:
                    </p>
                    
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">Public Zone</p>
                          <p className="text-sm text-gray-500">Accessible by anyone. Optimized for SEO and initial load performance (SSG where possible).</p>
                          <div className="flex gap-2 mt-2">
                             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 font-mono">/</span>
                             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 font-mono">/login</span>
                             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 font-mono">/legal/*</span>
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                          <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">Protected Zone</p>
                          <p className="text-sm text-gray-500">Requires valid JWT in HTTP-only cookie. Automatic redirection to login if session expires.</p>
                           <div className="flex gap-2 mt-2">
                             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 font-mono">/app/*</span>
                             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 font-mono">/settings</span>
                             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 font-mono">/profile</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#0d1117] dark:bg-black rounded-xl overflow-hidden border border-gray-800">
                    <div className="px-4 py-2 bg-[#161b22] border-b border-gray-800 text-xs text-gray-400 font-mono">components/auth/RequireAuth.tsx</div>
                    <div className="p-4 overflow-x-auto custom-scrollbar">
                      <pre className="text-xs text-[#e6edf3] font-mono leading-relaxed">
{`export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                   <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white text-center">Route Hierarchy Visualization</h4>
                   <div className="w-full overflow-x-auto">
                     <svg viewBox="0 0 800 240" className="w-full min-w-[600px] mx-auto">
                        {/* Root */}
                        <circle cx="400" cy="30" r="6" fill="#6B7280" />
                        <text x="400" y="15" textAnchor="middle" fontSize="12" fill="#6B7280">Root (/)</text>

                        {/* Public Branch */}
                        <line x1="400" y1="30" x2="200" y2="80" stroke="#9CA3AF" strokeWidth="2" />
                        <rect x="140" y="80" width="120" height="40" rx="20" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
                        <text x="200" y="105" textAnchor="middle" fill="#1E40AF" fontWeight="bold">Public Routes</text>

                        {/* Protected Branch */}
                        <line x1="400" y1="30" x2="600" y2="80" stroke="#9CA3AF" strokeWidth="2" />
                        <rect x="540" y="80" width="120" height="40" rx="20" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2" />
                        <text x="600" y="105" textAnchor="middle" fill="#6B21A8" fontWeight="bold">Protected Routes</text>
                        <text x="600" y="135" textAnchor="middle" fill="#9333EA" fontSize="10">(RequireAuth)</text>

                        {/* Public Children */}
                        <line x1="200" y1="120" x2="100" y2="170" stroke="#CBD5E1" strokeWidth="1" />
                        <rect x="50" y="170" width="100" height="30" rx="4" fill="white" stroke="#CBD5E1" />
                        <text x="100" y="190" textAnchor="middle" fontSize="12">Landing</text>

                        <line x1="200" y1="120" x2="300" y2="170" stroke="#CBD5E1" strokeWidth="1" />
                        <rect x="250" y="170" width="100" height="30" rx="4" fill="white" stroke="#CBD5E1" />
                        <text x="300" y="190" textAnchor="middle" fontSize="12">Login</text>

                         {/* Protected Children */}
                        <line x1="600" y1="120" x2="500" y2="170" stroke="#D8B4FE" strokeWidth="1" />
                        <rect x="450" y="170" width="100" height="30" rx="4" fill="white" stroke="#D8B4FE" />
                        <text x="500" y="190" textAnchor="middle" fontSize="12">/app</text>

                        <line x1="600" y1="120" x2="700" y2="170" stroke="#D8B4FE" strokeWidth="1" />
                        <rect x="650" y="170" width="100" height="30" rx="4" fill="white" stroke="#D8B4FE" />
                        <text x="700" y="190" textAnchor="middle" fontSize="12">/profile</text>
                     </svg>
                   </div>
                </div>
              </div>
            </section>

            {/* 6. Architect's Note (Simplified) */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Why this Stack?</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                By removing the complexity of MongoDB and Go, we gain a <span className="font-bold text-purple-600">Single Source of Truth</span> in PostgreSQL.
                NestJS provides the structure needed for enterprise-grade features (Guards, Interceptors, DI) while keeping the language unified with the frontend.
              </p>
            </section>

            {/* 7. System Architecture Diagram */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-2">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Workflow className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold">7. System Architecture Diagram</h3>
              </div>
              
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <svg viewBox="0 0 1200 600" className="w-full min-w-[1000px] h-auto font-sans">
                    {/* Definitions */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                      </marker>
                      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                      </filter>
                    </defs>

                    {/* 1. Client Layer */}
                    <g transform="translate(50, 50)">
                      <rect x="0" y="0" width="200" height="500" rx="10" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                      <text x="100" y="30" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">CLIENT SIDE</text>
                      
                      {/* Browser / App */}
                      <rect x="20" y="60" width="160" height="120" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" filter="url(#shadow)" />
                      <text x="100" y="100" textAnchor="middle" fill="#1E3A8A" fontSize="16" fontWeight="bold">Next.js Client</text>
                      <text x="100" y="125" textAnchor="middle" fill="#3B82F6" fontSize="12">(React + Zustand)</text>
                      
                      {/* User Icon */}
                      <circle cx="100" cy="250" r="30" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="2" />
                      <text x="100" y="255" textAnchor="middle" fontSize="20">👤</text>
                      <text x="100" y="300" textAnchor="middle" fill="#374151" fontSize="14">End User</text>
                    </g>

                    {/* 2. Load Balancer / Gateway */}
                    <g transform="translate(300, 200)">
                      <rect x="0" y="0" width="120" height="180" rx="8" fill="#FDF2F8" stroke="#DB2777" strokeWidth="2" filter="url(#shadow)" />
                      <text x="60" y="80" textAnchor="middle" fill="#831843" fontSize="14" fontWeight="bold">Nginx</text>
                      <text x="60" y="100" textAnchor="middle" fill="#DB2777" fontSize="12">Load Balancer</text>
                    </g>

                    {/* 3. Backend Services */}
                    <g transform="translate(500, 50)">
                      <rect x="0" y="0" width="300" height="500" rx="10" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                      <text x="150" y="30" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">BACKEND SERVICES</text>

                      {/* NestJS (Core API) */}
                      <rect x="20" y="150" width="260" height="150" rx="8" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" filter="url(#shadow)" />
                      <text x="130" y="210" textAnchor="middle" fill="#991B1B" fontSize="18" fontWeight="bold">NestJS (Monolith)</text>
                      <text x="130" y="240" textAnchor="middle" fill="#EF4444" fontSize="12">Auth, Match, Chat, Profile</text>
                      
                      {/* Redis (Queue) */}
                      <rect x="80" y="350" width="140" height="80" rx="8" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" filter="url(#shadow)" />
                      <text x="150" y="395" textAnchor="middle" fill="#9A3412" fontSize="14" fontWeight="bold">Redis</text>
                    </g>

                    {/* 4. Data Layer */}
                    <g transform="translate(900, 50)">
                      <rect x="0" y="0" width="200" height="500" rx="10" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                      <text x="100" y="30" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">DATA LAYER</text>

                      {/* PostgreSQL */}
                      <g transform="translate(20, 150)">
                        <path d="M0,30 C0,15 160,15 160,30 L160,120 C160,135 0,135 0,120 Z" fill="#F0F9FF" stroke="#3B82F6" strokeWidth="2" />
                        <ellipse cx="80" cy="30" rx="80" ry="15" fill="#E0F2FE" stroke="#3B82F6" strokeWidth="2" />
                        <text x="80" y="80" textAnchor="middle" fill="#1E40AF" fontSize="16" fontWeight="bold">PostgreSQL</text>
                        <text x="80" y="105" textAnchor="middle" fill="#3B82F6" fontSize="12">Primary DB</text>
                      </g>
                    </g>

                    {/* CONNECTIONS */}
                    {/* User to Client */}
                    <line x1="100" y1="220" x2="100" y2="180" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* Client to LB */}
                    <path d="M250,120 C280,120 280,250 300,250" fill="none" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* LB to NestJS */}
                    <path d="M420,290 C450,290 450,225 520,225" fill="none" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* NestJS to Redis */}
                    <line x1="630" y1="300" x2="630" y2="350" stroke="#EA580C" strokeWidth="2" strokeDasharray="4" />

                    {/* NestJS to Postgres */}
                    <line x1="780" y1="225" x2="920" y2="225" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)" />

                  </svg>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Relational Data (Core)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span>Redis Cache/Queue</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-gray-400">---</span>
                    <span>Async / Event Flow</span>
                  </div>
                </div>
              </div>
            </section>

          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ColorCard({ name, className, hex }: { name: string; className: string; hex?: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-24 w-full rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 ${className}`} />
      <div>
        <p className="font-medium text-sm">{name}</p>
        {hex && <p className="text-xs text-gray-500 font-mono">{hex}</p>}
      </div>
    </div>
  );
}

function IconCard({ icon: Icon, name }: { icon: any; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
      <Icon className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300" />
      <span className="text-xs text-gray-500 dark:text-gray-400 text-center">{name}</span>
    </div>
  );
}

function GradientCard({ name, className, usage }: { name: string; className: string; usage: string }) {
  return (
    <div className="space-y-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className={`h-24 w-full rounded-lg shadow-sm ${className}`} />
      <div>
        <p className="font-medium text-sm">{name}</p>
        <code className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded mt-1 block w-fit overflow-hidden text-ellipsis max-w-full">
          bg-gradient-to-r {usage}
        </code>
      </div>
    </div>
  );
}
