import { useState } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Heart, 
  Star, 
  Check, 
  X, 
  Search, 
  Shield, 
  Globe, 
  Video, 
  UserPlus, 
  Zap, 
  Bell, 
  Menu, 
  Settings, 
  Clock, 
  History, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Award, 
  Database,
  Workflow,
  Send,
  Mic,
  Camera,
  Phone,
  Trash2,
  Edit,
  Copy,
  Share2,
  Filter,
  MoreVertical,
  Plus,
  Minus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Upload,
  LogOut,
  User,
  Mail,
  AlertCircle,
  Info,
  CheckCircle2,
  XCircle,
  Sun,
  Moon,
  Eye,
  EyeOff,
  RefreshCw,
  Smile,
  ThumbsUp,
  Flag,
  Bookmark,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { ThemeMode } from '../hooks/useTheme';
import { toast } from 'sonner@2.0.3';

interface AtomicDesignSystemProps {
  onBack: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

export function AtomicDesignSystem({ onBack, themeMode, onThemeChange }: AtomicDesignSystemProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [progress, setProgress] = useState(33);

  // Sample data for examples
  const sampleEmojis = ['😀', '😎', '🤓', '😇', '🥳', '🤠', '🦸', '🧙'];
  const sampleColors = [
    'bg-gradient-to-br from-purple-500 to-pink-500',
    'bg-gradient-to-br from-blue-500 to-cyan-500',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-orange-500 to-red-500',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Atomic Design System</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Whispa component library organized by Atomic Design methodology
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onThemeChange(themeMode === 'dark' ? 'light' : 'dark')}
              >
                {themeMode === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="atoms">Atoms</TabsTrigger>
            <TabsTrigger value="molecules">Molecules</TabsTrigger>
            <TabsTrigger value="organisms">Organisms</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About Atomic Design</CardTitle>
                <CardDescription>
                  Understanding the methodology and how it's applied in Whispa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { 
                      level: 'Atoms', 
                      icon: Zap, 
                      color: 'from-purple-500 to-pink-500',
                      desc: 'Basic building blocks like buttons, inputs, icons, and labels'
                    },
                    { 
                      level: 'Molecules', 
                      icon: Users, 
                      color: 'from-blue-500 to-cyan-500',
                      desc: 'Simple components formed by combining atoms together'
                    },
                    { 
                      level: 'Organisms', 
                      icon: Workflow, 
                      color: 'from-green-500 to-emerald-500',
                      desc: 'Complex UI sections built from molecules and atoms'
                    },
                    { 
                      level: 'Templates', 
                      icon: Database, 
                      color: 'from-orange-500 to-red-500',
                      desc: 'Page-level layouts that define structure and placement'
                    },
                    { 
                      level: 'Tokens', 
                      icon: Award, 
                      color: 'from-indigo-500 to-purple-500',
                      desc: 'Design tokens for colors, spacing, typography, and more'
                    },
                  ].map((item) => (
                    <Card key={item.level} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-3`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg">{item.level}</CardTitle>
                        <CardDescription className="text-xs">
                          {item.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Design Principles</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Emoji-First Avatars</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            All user avatars use emojis with gradient backgrounds. No image uploads to maintain privacy and simplicity.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Safety & Privacy</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Designed with user safety in mind. Clear reporting mechanisms and privacy controls throughout.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Fast & Lightweight</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Optimized components with minimal dependencies for instant matching and smooth interactions.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                          <Globe className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Global & Accessible</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Dark mode support, responsive design, and international emoji support for worldwide users.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ATOMS */}
          <TabsContent value="atoms" className="space-y-8">
            {/* Buttons */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Buttons</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primary interactive elements for triggering actions
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Variants</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                        Brand Gradient
                      </Button>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                        Action Gradient
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sizes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="icon"><Heart className="w-4 h-4" /></Button>
                      <Button size="icon"><MessageCircle className="w-4 h-4" /></Button>
                      <Button size="icon"><Video className="w-4 h-4" /></Button>
                      <Button size="icon"><Settings className="w-4 h-4" /></Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">With Icons</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      <Button><Send className="w-4 h-4" /> Send Message</Button>
                      <Button variant="outline"><Video className="w-4 h-4" /> Start Video</Button>
                      <Button variant="destructive"><Trash2 className="w-4 h-4" /> Delete</Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="secondary"><Plus className="w-4 h-4" /> Add Friend</Button>
                      <Button variant="ghost"><Share2 className="w-4 h-4" /> Share</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">States</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      <Button disabled>Disabled</Button>
                      <Button variant="outline" disabled>Disabled Outline</Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button className="cursor-wait">Loading...</Button>
                      <Button variant="outline">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Processing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Input Fields */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Input Fields</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Text input components for user data entry
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Text Inputs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Default input" />
                    <Input placeholder="Email address" type="email" />
                    <Input placeholder="Password" type="password" />
                    <Input placeholder="Disabled input" disabled />
                    <Input placeholder="Search messages..." className="pl-10" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Textarea</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea placeholder="Type your message here..." rows={3} />
                    <Textarea placeholder="Disabled textarea" disabled rows={3} />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Badges & Labels */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Badges & Labels</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Small status indicators and labels
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Badge Variants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                        Premium
                      </Badge>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                      <Badge className="bg-yellow-500 text-gray-900">Warning</Badge>
                      <Badge className="bg-blue-500 text-white">Info</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Labels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="example">Username</Label>
                      <Input id="example" placeholder="Enter username" />
                    </div>
                    <div>
                      <Label htmlFor="example2" className="text-gray-500">
                        Optional field
                      </Label>
                      <Input id="example2" placeholder="Optional" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Icons */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Icons</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lucide React icons used throughout the application
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Icon Library</CardTitle>
                  <CardDescription>Commonly used icons in Whispa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                    {[
                      { Icon: MessageCircle, name: 'Message' },
                      { Icon: Video, name: 'Video' },
                      { Icon: Users, name: 'Users' },
                      { Icon: Heart, name: 'Heart' },
                      { Icon: Star, name: 'Star' },
                      { Icon: Settings, name: 'Settings' },
                      { Icon: Search, name: 'Search' },
                      { Icon: Bell, name: 'Bell' },
                      { Icon: Shield, name: 'Shield' },
                      { Icon: Globe, name: 'Globe' },
                      { Icon: Lock, name: 'Lock' },
                      { Icon: Send, name: 'Send' },
                      { Icon: Mic, name: 'Mic' },
                      { Icon: Camera, name: 'Camera' },
                      { Icon: Phone, name: 'Phone' },
                      { Icon: UserPlus, name: 'Add User' },
                      { Icon: Check, name: 'Check' },
                      { Icon: X, name: 'Close' },
                      { Icon: Menu, name: 'Menu' },
                      { Icon: Filter, name: 'Filter' },
                      { Icon: Share2, name: 'Share' },
                      { Icon: Flag, name: 'Flag' },
                      { Icon: Bookmark, name: 'Bookmark' },
                      { Icon: Sparkles, name: 'Sparkles' },
                    ].map((item) => (
                      <div key={item.name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <item.Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <span className="text-xs text-center text-gray-600 dark:text-gray-400">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Avatars (Emoji-based) */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Avatars (Emoji-based)</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User representation using emojis with gradient backgrounds - no image uploads
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Emoji Avatars</CardTitle>
                    <CardDescription>Standard avatar sizes with different emojis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                        😎
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-base">
                        🤓
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-lg">
                        😇
                      </div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                        🥳
                      </div>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl">
                        🦸
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Background Gradients</CardTitle>
                    <CardDescription>Available gradient options for avatars</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-3">
                      {sampleColors.map((color, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center text-2xl mx-auto`}>
                            {sampleEmojis[idx]}
                          </div>
                          <p className="text-xs text-center text-gray-500">Gradient {idx + 1}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avatar with Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                          😊
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                      </div>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">
                          🤔
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-400 rounded-full border-2 border-white dark:border-gray-900" />
                      </div>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">
                          😴
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-900" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Switches & Checkboxes */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Toggles & Selection</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive components for binary and multiple choice selections
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Switches</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch1">Enable notifications</Label>
                      <Switch id="switch1" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch2">Dark mode</Label>
                      <Switch id="switch2" checked={switchChecked} onCheckedChange={setSwitchChecked} />
                    </div>
                    <div className="flex items-center justify-between opacity-50">
                      <Label htmlFor="switch3">Disabled switch</Label>
                      <Switch id="switch3" disabled />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Checkboxes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="check1" />
                      <Label htmlFor="check1">Accept terms and conditions</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="check2" defaultChecked />
                      <Label htmlFor="check2">Subscribe to newsletter</Label>
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                      <Checkbox id="check3" disabled />
                      <Label htmlFor="check3">Disabled checkbox</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Radio Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup defaultValue="option1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="option1" />
                        <Label htmlFor="option1">Everyone</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="option2" />
                        <Label htmlFor="option2">Friends only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option3" id="option3" />
                        <Label htmlFor="option3">Nobody</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Sliders & Progress */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Sliders & Progress</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Components for value selection and progress indication
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Slider</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Volume: {sliderValue[0]}%</Label>
                      <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                      <Label>Disabled slider</Label>
                      <Slider defaultValue={[50]} max={100} step={1} disabled />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>Upload progress</Label>
                        <span className="text-gray-500">{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>Loading...</Label>
                        <span className="text-gray-500">66%</span>
                      </div>
                      <Progress value={66} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Separators */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Separators</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Visual dividers for content sections
                </p>
              </div>
              
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-sm">Content above</p>
                    <Separator className="my-4" />
                    <p className="text-sm">Content below</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm">Left</p>
                    <Separator orientation="vertical" className="h-8" />
                    <p className="text-sm">Middle</p>
                    <Separator orientation="vertical" className="h-8" />
                    <p className="text-sm">Right</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* MOLECULES */}
          <TabsContent value="molecules" className="space-y-8">
            {/* Search Bars */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Search Bars</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Input fields combined with icons for search functionality
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Search</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="Search..." className="pl-10" />
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="Search messages..." className="pl-10 pr-10" />
                      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Search with Filter</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="pl-10" />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Form Fields */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Form Fields</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Labeled inputs with validation states
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Standard Form Fields</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="Enter username" />
                      <p className="text-xs text-gray-500">Your unique username for Whispa</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
                      <p className="text-xs text-gray-500">Maximum 200 characters</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Validation States</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="valid" className="text-green-600 dark:text-green-400">
                        Valid input
                      </Label>
                      <div className="relative">
                        <Input id="valid" placeholder="Valid value" className="pr-10 border-green-500" />
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400">Looks good!</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invalid" className="text-red-600 dark:text-red-400">
                        Invalid input
                      </Label>
                      <div className="relative">
                        <Input id="invalid" placeholder="Invalid value" className="pr-10 border-red-500" />
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400">This field is required</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* User Cards */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">User Cards</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Display user information with emoji avatars
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { emoji: '😎', name: 'Alex', status: 'online', color: 'from-purple-500 to-pink-500' },
                  { emoji: '🤓', name: 'Jordan', status: 'offline', color: 'from-blue-500 to-cyan-500' },
                  { emoji: '😇', name: 'Sam', status: 'online', color: 'from-green-500 to-emerald-500' },
                ].map((user, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-xl`}>
                            {user.emoji}
                          </div>
                          {user.status === 'online' && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{user.status}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Message Bubbles */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Message Bubbles</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chat message components with different styles
                </p>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4 max-w-md">
                    {/* Incoming */}
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm">Hey! How are you doing?</p>
                        <p className="text-xs text-gray-400 mt-1">10:30 AM</p>
                      </div>
                    </div>
                    
                    {/* Outgoing */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] shadow-lg">
                        <p className="text-sm text-white">I'm doing great! Thanks for asking 😊</p>
                        <p className="text-xs text-white/70 mt-1">10:31 AM</p>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Status Indicators */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Status Indicators</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Visual feedback components for user and system states
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Online Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm">Online</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <span className="text-sm">Away</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-sm">Busy</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        <span className="text-sm">Offline</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alert Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-green-800 dark:text-green-200">Success message</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm text-yellow-800 dark:text-yellow-200">Warning message</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="text-sm text-red-800 dark:text-red-200">Error message</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-blue-800 dark:text-blue-200">Info message</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Action Groups */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Action Groups</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Grouped buttons for related actions
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Chat Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" className="flex-1">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="flex-1">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="flex-1">
                        <UserPlus className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="flex-1">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Message Input Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Type a message..." className="flex-1" />
                      <Button size="icon" variant="ghost">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button size="icon" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* ORGANISMS */}
          <TabsContent value="organisms" className="space-y-8">
            {/* Navigation Header */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Navigation Headers</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Top-level navigation components
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">App Header</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-14 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon">
                          <Menu className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                            😎
                          </div>
                          <span className="font-semibold">Active Chat</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Video className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Settings className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Chat Window */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Chat Window</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete chat interface organism
                </p>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    {/* Chat Header */}
                    <div className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                            😎
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Stranger</p>
                          <p className="text-xs text-green-500">Online</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="h-64 bg-gray-50 dark:bg-gray-900/50 p-4 space-y-3 overflow-y-auto">
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] shadow-sm">
                          <p className="text-sm">Hi there!</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                          <p className="text-sm text-white">Hello! How's it going?</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] shadow-sm">
                          <p className="text-sm">Great! What brings you to Whispa?</p>
                        </div>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button variant="ghost" size="icon">
                          <Smile className="w-4 h-4" />
                        </Button>
                        <Button size="icon" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* User Profile Card */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">User Profile Cards</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Detailed user information displays
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl mx-auto">
                        😎
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Alex Thompson</h3>
                        <p className="text-sm text-gray-500">@alexthompson</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Love meeting new people and having great conversations!
                      </p>
                      <div className="flex justify-center gap-2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                          <Star className="w-3 h-3" /> Trusted
                        </Badge>
                        <Badge variant="secondary">Active Today</Badge>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          <MessageCircle className="w-4 h-4" /> Chat
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <UserPlus className="w-4 h-4" /> Add Friend
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl">
                          🤓
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">Jordan Lee</h3>
                        <p className="text-sm text-gray-500 mb-2">@jordanlee</p>
                        <div className="flex items-center gap-2 text-sm text-green-500">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Online now
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Tech enthusiast | Coffee lover | Always up for a chat about anything!
                    </p>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-bold">247</p>
                        <p className="text-xs text-gray-500">Chats</p>
                      </div>
                      <div>
                        <p className="font-bold">89</p>
                        <p className="text-xs text-gray-500">Friends</p>
                      </div>
                      <div>
                        <p className="font-bold">4.8</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Feature Cards */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Feature Cards</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Marketing and feature showcase components
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Video,
                    title: 'Video Chat',
                    description: 'High-quality video calls with strangers from around the world',
                    gradient: 'from-purple-500 to-pink-500',
                  },
                  {
                    icon: Shield,
                    title: 'Safe & Secure',
                    description: 'Advanced moderation and reporting tools to keep you safe',
                    gradient: 'from-blue-500 to-cyan-500',
                  },
                  {
                    icon: Globe,
                    title: 'Global Community',
                    description: 'Connect with millions of users from every corner of the globe',
                    gradient: 'from-green-500 to-emerald-500',
                  },
                ].map((feature, idx) => (
                  <Card key={idx} className="group hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                    <CardContent className="pt-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Settings Panel */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Settings Panel</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configuration and preferences interface
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your account and app settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications for new messages</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Video Call Quality</Label>
                        <p className="text-sm text-gray-500">Higher quality uses more data</p>
                      </div>
                      <Select defaultValue="high">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                      </div>
                      <Switch checked={themeMode === 'dark'} onCheckedChange={(checked) => onThemeChange(checked ? 'dark' : 'light')} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Show Online Status</Label>
                        <p className="text-sm text-gray-500">Let others see when you're online</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </TabsContent>

          {/* TEMPLATES */}
          <TabsContent value="templates" className="space-y-8">
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Page Templates</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete page layouts and structures
                </p>
              </div>

              <div className="space-y-6">
                {/* Dashboard Layout */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Layout</CardTitle>
                    <CardDescription>Main app interface with sidebar and content area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                      <div className="flex h-96">
                        {/* Sidebar */}
                        <div className="w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                            😎
                          </div>
                          <Separator />
                          {[MessageCircle, Users, Video, Settings].map((Icon, idx) => (
                            <div key={idx} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                          ))}
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col">
                          {/* Header */}
                          <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
                            <h3 className="font-semibold">Messages</h3>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <Search className="w-4 h-4" />
                              </div>
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <Filter className="w-4 h-4" />
                              </div>
                            </div>
                          </div>

                          {/* Content Grid */}
                          <div className="flex-1 p-4 overflow-auto">
                            <div className="grid grid-cols-2 gap-3">
                              {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm">
                                      🤓
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold truncate">User {item}</p>
                                      <p className="text-xs text-gray-500 truncate">Last message...</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chat Layout */}
                <Card>
                  <CardHeader>
                    <CardTitle>Chat Layout</CardTitle>
                    <CardDescription>Full-screen chat interface with header and input</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <div className="flex flex-col h-96">
                        {/* Chat Header */}
                        <div className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
                          <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon">
                              <ArrowLeft className="w-4 h-4" />
                            </Button>
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-lg">
                                  😇
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm">Stranger</p>
                                <p className="text-xs text-green-500">Online</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Video className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 p-4 overflow-auto">
                          <div className="space-y-3 max-w-2xl mx-auto">
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                            </div>
                            {[
                              { type: 'incoming', text: 'Hey! Nice to meet you!' },
                              { type: 'outgoing', text: 'Hi! Great to meet you too!' },
                              { type: 'incoming', text: 'What brings you to Whispa?' },
                              { type: 'outgoing', text: 'Just wanted to meet new people and have interesting conversations!' },
                            ].map((msg, idx) => (
                              <div key={idx} className={`flex ${msg.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-3 py-2 rounded-2xl max-w-[70%] text-sm ${
                                  msg.type === 'outgoing'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm'
                                    : 'bg-white dark:bg-gray-800 rounded-tl-sm border border-gray-200 dark:border-gray-700'
                                }`}>
                                  {msg.text}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Input Area */}
                        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-3">
                          <div className="flex items-center gap-2 max-w-2xl mx-auto">
                            <Button variant="ghost" size="icon">
                              <Plus className="w-4 h-4" />
                            </Button>
                            <div className="flex-1 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                              <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent outline-none text-sm"
                              />
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Smile className="w-4 h-4" />
                              </Button>
                            </div>
                            <Button size="icon" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Landing Page Hero */}
                <Card>
                  <CardHeader>
                    <CardTitle>Landing Page Hero</CardTitle>
                    <CardDescription>Marketing page hero section with CTA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-12 text-center">
                        <div className="max-w-2xl mx-auto space-y-6">
                          <div className="flex justify-center gap-2 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                              😎
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                              🤓
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                              😇
                            </div>
                          </div>
                          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
                            Meet New People Around the World
                          </h1>
                          <p className="text-lg text-gray-600 dark:text-gray-400">
                            Connect instantly with strangers through text and video chat. Safe, anonymous, and fun.
                          </p>
                          <div className="flex justify-center gap-3">
                            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                              <Sparkles className="w-5 h-5" /> Start Chatting
                            </Button>
                            <Button size="lg" variant="outline">
                              Learn More
                            </Button>
                          </div>
                          <div className="flex justify-center gap-8 pt-4">
                            <div>
                              <p className="text-2xl font-bold">1M+</p>
                              <p className="text-sm text-gray-500">Active Users</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">100K+</p>
                              <p className="text-sm text-gray-500">Daily Chats</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">150+</p>
                              <p className="text-sm text-gray-500">Countries</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* TOKENS */}
          <TabsContent value="tokens" className="space-y-8">
            {/* Colors */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Color Tokens</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Brand colors and gradients used throughout the application
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Brand Gradients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Primary Brand', class: 'from-purple-600 to-pink-600', usage: 'Main CTAs, branding' },
                        { name: 'Action/Video', class: 'from-orange-500 to-red-500', usage: 'Video calls, important actions' },
                        { name: 'Safety/Trust', class: 'from-blue-500 to-cyan-500', usage: 'Security features, verification' },
                        { name: 'Success/Growth', class: 'from-green-500 to-emerald-500', usage: 'Success states, positive actions' },
                        { name: 'Info/Global', class: 'from-indigo-500 to-purple-500', usage: 'Information, global features' },
                        { name: 'Warm/Featured', class: 'from-yellow-400 to-orange-400', usage: 'Highlights, featured content' },
                      ].map((gradient) => (
                        <div key={gradient.name} className="space-y-2">
                          <div className={`h-24 rounded-xl bg-gradient-to-r ${gradient.class}`} />
                          <div>
                            <p className="font-semibold text-sm">{gradient.name}</p>
                            <p className="text-xs text-gray-500">{gradient.usage}</p>
                            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 block">
                              {gradient.class}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Semantic Colors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: 'Success', color: 'bg-green-500', hex: '#22c55e' },
                        { name: 'Error', color: 'bg-red-500', hex: '#ef4444' },
                        { name: 'Warning', color: 'bg-yellow-500', hex: '#eab308' },
                        { name: 'Info', color: 'bg-blue-500', hex: '#3b82f6' },
                      ].map((color) => (
                        <div key={color.name} className="space-y-2">
                          <div className={`h-16 rounded-lg ${color.color}`} />
                          <div>
                            <p className="font-semibold text-sm">{color.name}</p>
                            <p className="text-xs text-gray-500">{color.hex}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Neutral Colors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {[
                        { name: 'Gray 950', color: 'bg-gray-950', usage: 'Dark backgrounds' },
                        { name: 'Gray 900', color: 'bg-gray-900', usage: 'Dark cards' },
                        { name: 'Gray 800', color: 'bg-gray-800', usage: 'Dark elevated' },
                        { name: 'Gray 200', color: 'bg-gray-200', usage: 'Light borders' },
                        { name: 'Gray 100', color: 'bg-gray-100', usage: 'Light elevated' },
                        { name: 'Gray 50', color: 'bg-gray-50', usage: 'Light backgrounds' },
                      ].map((color) => (
                        <div key={color.name} className="space-y-2">
                          <div className={`h-16 rounded-lg ${color.color} border border-gray-300 dark:border-gray-700`} />
                          <div>
                            <p className="font-semibold text-xs">{color.name}</p>
                            <p className="text-xs text-gray-500">{color.usage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Typography */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Typography</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Font sizes, weights, and styles
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      text-4xl font-bold
                    </code>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Heading 2</h2>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      text-3xl font-bold
                    </code>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Heading 3</h3>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      text-2xl font-bold
                    </code>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Heading 4</h4>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      text-xl font-bold
                    </code>
                  </div>
                  <div>
                    <p className="text-base mb-2">Body Text - The quick brown fox jumps over the lazy dog.</p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      text-base
                    </code>
                  </div>
                  <div>
                    <p className="text-sm mb-2">Small Text - Secondary information and captions</p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      text-sm
                    </code>
                  </div>
                  <div>
                    <p className="text-xs mb-2">Extra Small - Timestamps and fine print</p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      text-xs
                    </code>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Spacing */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Spacing Scale</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consistent spacing tokens for padding, margin, and gaps
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { size: '1', px: '4px', rem: '0.25rem' },
                      { size: '2', px: '8px', rem: '0.5rem' },
                      { size: '3', px: '12px', rem: '0.75rem' },
                      { size: '4', px: '16px', rem: '1rem' },
                      { size: '6', px: '24px', rem: '1.5rem' },
                      { size: '8', px: '32px', rem: '2rem' },
                      { size: '12', px: '48px', rem: '3rem' },
                      { size: '16', px: '64px', rem: '4rem' },
                    ].map((space) => (
                      <div key={space.size} className="flex items-center gap-4">
                        <div className="w-16 text-sm font-mono">{space.size}</div>
                        <div className={`h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded`} style={{ width: space.px }} />
                        <div className="text-sm text-gray-500">
                          {space.px} / {space.rem}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Border Radius */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Border Radius</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rounding values for different components
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { name: 'Small', class: 'rounded-sm', value: '2px' },
                      { name: 'Default', class: 'rounded', value: '4px' },
                      { name: 'Medium', class: 'rounded-md', value: '6px' },
                      { name: 'Large', class: 'rounded-lg', value: '8px' },
                      { name: 'XL', class: 'rounded-xl', value: '12px' },
                      { name: '2XL', class: 'rounded-2xl', value: '16px' },
                      { name: '3XL', class: 'rounded-3xl', value: '24px' },
                      { name: 'Full', class: 'rounded-full', value: '9999px' },
                    ].map((radius) => (
                      <div key={radius.name} className="space-y-2">
                        <div className={`h-20 bg-gradient-to-r from-purple-500 to-pink-500 ${radius.class}`} />
                        <div>
                          <p className="font-semibold text-sm">{radius.name}</p>
                          <code className="text-xs text-gray-500">{radius.class}</code>
                          <p className="text-xs text-gray-400">{radius.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Shadows */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Shadow Tokens</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Elevation and depth effects
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { name: 'Small', class: 'shadow-sm', usage: 'Subtle elevation' },
                      { name: 'Default', class: 'shadow', usage: 'Cards, buttons' },
                      { name: 'Medium', class: 'shadow-md', usage: 'Dropdowns' },
                      { name: 'Large', class: 'shadow-lg', usage: 'Modals, dialogs' },
                      { name: 'XL', class: 'shadow-xl', usage: 'Popovers' },
                      { name: '2XL', class: 'shadow-2xl', usage: 'High emphasis' },
                    ].map((shadow) => (
                      <div key={shadow.name} className="space-y-3">
                        <div className={`h-24 bg-white dark:bg-gray-800 rounded-xl ${shadow.class} flex items-center justify-center`}>
                          <p className="font-semibold">{shadow.name}</p>
                        </div>
                        <div>
                          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block mb-1">
                            {shadow.class}
                          </code>
                          <p className="text-xs text-gray-500">{shadow.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
