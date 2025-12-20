import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  TrendingUp, 
  AlertTriangle, 
  Search, 
  Bell,
  MoreVertical,
  Activity,
  Shield,
  FileText,
  BarChart3,
  MoreHorizontal,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Ban,
  Trash2,
  Eye,
  Flag,
  ShieldAlert
} from 'lucide-react';
import { ThemeMode } from '../hooks/useTheme';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface BackofficeAppProps {
  onLogout: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

export function BackofficeApp({ onLogout, themeMode, onThemeChange }: BackofficeAppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <BackofficeAuth 
        onLogin={() => setIsAuthenticated(true)} 
        onBack={onLogout}
      />
    );
  }

  return (
    <BackofficeDashboard 
      onLogout={() => {
        setIsAuthenticated(false);
        onLogout();
      }} 
      themeMode={themeMode}
      onThemeChange={onThemeChange}
    />
  );
}

function BackofficeAuth({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      setIsLoading(false);
      if (username && password) {
        toast.success('Welcome back, Admin!');
        onLogin();
      } else {
        toast.error('Please enter valid credentials');
      }
    }, 1000);
  };

  const handleBypassLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    toast.info('Auto-filled developer credentials');
    
    // Optional: Auto-submit
    setTimeout(() => {
      toast.success('Bypass Access Granted');
      onLogin();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 transition-colors duration-500">
      <div className="w-full max-w-[400px] animate-in fade-in zoom-in-95 duration-500">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/30 mb-5 transform transition-transform hover:scale-105">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Whispa Admin
          </h1>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Username
                </Label>
                <div className="relative group">
                  <Input 
                    id="username"
                    type="text" 
                    placeholder="Enter your ID" 
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errors.username) setErrors({ ...errors, username: undefined });
                    }}
                    className={`pl-10 h-11 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 transition-all duration-200 ${errors.username ? 'border-red-500 ring-1 ring-red-500' : 'group-hover:border-indigo-300'}`}
                  />
                  <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3.5 group-hover:text-indigo-500 transition-colors" />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-500 flex items-center mt-1 animate-in slide-in-from-left-1">
                    <AlertTriangle className="w-3 h-3 mr-1" /> {errors.username}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Password
                  </Label>
                </div>
                <div className="relative group">
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={`pl-10 h-11 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 transition-all duration-200 ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'group-hover:border-indigo-300'}`}
                  />
                  <Shield className="w-4 h-4 text-gray-400 absolute left-3 top-3.5 group-hover:text-indigo-500 transition-colors" />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 flex items-center mt-1 animate-in slide-in-from-left-1">
                    <AlertTriangle className="w-3 h-3 mr-1" /> {errors.password}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  'Sign In to Dashboard'
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-400 font-medium">Developer Options</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-10 text-xs font-medium border-dashed text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
              onClick={handleBypassLogin}
            >
              Auto-fill Test Credentials
            </Button>
          </div>

          <div className="bg-gray-50/50 dark:bg-gray-800/30 p-4 border-t border-gray-100 dark:border-gray-800 text-center">
            <button 
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto font-medium group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> 
              Return to Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackofficeDashboard({ onLogout, themeMode, onThemeChange }: { onLogout: () => void; themeMode: ThemeMode; onThemeChange: (mode: ThemeMode) => void }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data for Users
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Sarah Wilson', email: 'sarah.w@example.com', status: 'active', region: 'North America', joined: '2023-10-15', reports: 0, avatar: '👩‍🎨', avatarColor: 'bg-gradient-to-br from-pink-500 to-rose-500', trustScore: 92 },
    { id: 'u2', name: 'Mike Chen', email: 'm.chen@example.com', status: 'banned', region: 'Asia', joined: '2023-09-20', reports: 5, avatar: '👨‍💻', avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-500', trustScore: 12 },
    { id: 'u3', name: 'Alex Johnson', email: 'alex.j@example.com', status: 'active', region: 'Europe', joined: '2023-11-01', reports: 1, avatar: '🦸‍♂️', avatarColor: 'bg-gradient-to-br from-purple-500 to-indigo-500', trustScore: 88 },
    { id: 'u4', name: 'Jessica Davis', email: 'jess.d@example.com', status: 'active', region: 'North America', joined: '2023-10-28', reports: 0, avatar: '👩‍🔬', avatarColor: 'bg-gradient-to-br from-teal-500 to-emerald-500', trustScore: 95 },
    { id: 'u5', name: 'Kevin Brown', email: 'k.brown@example.com', status: 'flagged', region: 'Europe', joined: '2023-10-05', reports: 3, avatar: '🤠', avatarColor: 'bg-gradient-to-br from-orange-500 to-red-500', trustScore: 45 },
    { id: 'u6', name: 'Emma Wilson', email: 'emma.w@example.com', status: 'active', region: 'Australia', joined: '2023-11-10', reports: 0, avatar: '👩‍🚀', avatarColor: 'bg-gradient-to-br from-violet-500 to-fuchsia-500', trustScore: 90 },
    { id: 'u7', name: 'David Lee', email: 'david.l@example.com', status: 'active', region: 'Asia', joined: '2023-10-12', reports: 0, avatar: '🧙‍♂️', avatarColor: 'bg-gradient-to-br from-indigo-500 to-blue-500', trustScore: 94 },
    { id: 'u8', name: 'Lisa Anderson', email: 'lisa.a@example.com', status: 'banned', region: 'North America', joined: '2023-09-15', reports: 8, avatar: '🧛‍♀️', avatarColor: 'bg-gradient-to-br from-red-600 to-red-900', trustScore: 8 },
  ]);

  // Mock Data for Reports with Chat Transcripts
  const [reports, setReports] = useState([
    { 
      id: 'r1', 
      reporter: 'Sarah Wilson', 
      reporterAvatar: '👩‍🎨',
      reporterColor: 'bg-gradient-to-br from-pink-500 to-rose-500',
      reported: 'Kevin Brown', 
      reportedId: 'u5',
      reportedAvatar: '🤠',
      reportedColor: 'bg-gradient-to-br from-orange-500 to-red-500',
      reason: 'Harassment', 
      status: 'pending', 
      time: '10 mins ago', 
      severity: 'high',
      chatTranscript: [
        { id: 'c1', sender: 'Kevin Brown', text: 'Hey, why are you ignoring me?', time: '14:02 PM', isFlagged: false },
        { id: 'c2', sender: 'Sarah Wilson', text: 'Please leave me alone.', time: '14:03 PM', isFlagged: false },
        { id: 'c3', sender: 'Kevin Brown', text: 'You think you are better than me? Stupid b****', time: '14:04 PM', isFlagged: true },
        { id: 'c4', sender: 'Sarah Wilson', text: 'I am blocking you.', time: '14:05 PM', isFlagged: false },
      ],
      aiAnalysis: {
        flagged: true,
        confidence: 94,
        reason: 'Detected harassment and profanity directed at user.'
      }
    },
    { 
      id: 'r2', 
      reporter: 'Alex Johnson', 
      reporterAvatar: '🦸‍♂️',
      reporterColor: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      reported: 'Mike Chen', 
      reportedId: 'u2',
      reportedAvatar: '👨‍💻',
      reportedColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      reason: 'Spam', 
      status: 'resolved', 
      time: '2 hours ago', 
      severity: 'medium',
      chatTranscript: [
         { id: 'c1', sender: 'Mike Chen', text: 'Buy cheap crypto now! www.scam-link.com', time: '10:00 AM', isFlagged: true },
         { id: 'c2', sender: 'Mike Chen', text: 'Best deals only for you friend', time: '10:01 AM', isFlagged: true },
      ],
       aiAnalysis: {
        flagged: true,
        confidence: 99,
        reason: 'Pattern matching identified potential phishing link.'
      }
    },
    { 
      id: 'r3', 
      reporter: 'Jessica Davis', 
      reporterAvatar: '👩‍🔬',
      reporterColor: 'bg-gradient-to-br from-teal-500 to-emerald-500',
      reported: 'User_Unknown', 
      reportedId: 'unknown',
      reportedAvatar: '❓',
      reportedColor: 'bg-gray-500',
      reason: 'Inappropriate Content', 
      status: 'pending', 
      time: '5 mins ago', 
      severity: 'critical',
      chatTranscript: [
        { id: 'c1', sender: 'User_Unknown', text: '[Image Sent]', time: '11:20 PM', isFlagged: true, type: 'image' },
        { id: 'c2', sender: 'Jessica Davis', text: 'What is that?? Disgusting.', time: '11:21 PM', isFlagged: false },
      ],
      aiAnalysis: {
        flagged: true,
        confidence: 89,
        reason: 'Nudity detection model triggered on sent image.'
      }
    },
    { 
      id: 'r4', 
      reporter: 'Emma Wilson', 
      reporterAvatar: '👩‍🚀',
      reporterColor: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
      reported: 'Sarah Wilson', 
      reportedId: 'u1',
      reportedAvatar: '👩‍🎨',
      reportedColor: 'bg-gradient-to-br from-pink-500 to-rose-500',
      reason: 'Fake Profile', 
      status: 'dismissed', 
      time: '1 day ago', 
      severity: 'low',
       chatTranscript: [
        { id: 'c1', sender: 'Sarah Wilson', text: 'Hi! Are you new here?', time: '09:00 AM', isFlagged: false },
        { id: 'c2', sender: 'Emma Wilson', text: 'Are you a bot?', time: '09:05 AM', isFlagged: false },
      ],
      aiAnalysis: {
        flagged: false,
        confidence: 12,
        reason: 'No suspicious patterns detected.'
      }
    },
  ]);

  const [reportFilter, setReportFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');
  const [selectedReportIds, setSelectedReportIds] = useState<string[]>([]);
  const [adminNote, setAdminNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userPage, setUserPage] = useState(1);
  const itemsPerPage = 5;
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', region: 'na' });
  const [filters, setFilters] = useState<{ status: string[], region: string[] }>({
    status: [],
    region: []
  });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Mock Data for Charts
  const activityData = [
    { name: 'Mon', active: 4000, messages: 2400 },
    { name: 'Tue', active: 3000, messages: 1398 },
    { name: 'Wed', active: 2000, messages: 9800 },
    { name: 'Thu', active: 2780, messages: 3908 },
    { name: 'Fri', active: 1890, messages: 4800 },
    { name: 'Sat', active: 2390, messages: 3800 },
    { name: 'Sun', active: 3490, messages: 4300 },
  ];

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all fields");
      return;
    }
    const id = `u${users.length + 1}`;
    const newUserObj = {
      id,
      name: newUser.name,
      email: newUser.email,
      status: 'active',
      region: newUser.region === 'na' ? 'North America' : newUser.region === 'eu' ? 'Europe' : 'Asia',
      joined: new Date().toISOString().split('T')[0],
      reports: 0,
      avatar: '👤',
      avatarColor: 'bg-gradient-to-br from-gray-400 to-gray-600',
      trustScore: 50
    };
    // @ts-ignore
    setUsers([newUserObj, ...users]);
    setNewUser({ name: '', email: '', role: 'user', region: 'na' });
    setIsAddUserOpen(false);
    toast.success(`User ${newUser.name} created successfully`);
  };

  const handleExportUsers = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Generating CSV export...',
        success: () => {
          const headers = ['ID', 'Name', 'Email', 'Status', 'Region', 'Joined', 'Reports'];
          const csvContent = [
            headers.join(','),
            ...filteredUsers.map(u => [u.id, u.name, u.email, u.status, u.region, u.joined, u.reports].join(','))
          ].join('\n');
          
          const blob = new Blob([csvContent], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
          a.click();
          return 'Export downloaded successfully';
        },
        error: 'Failed to export users',
      }
    );
  };

  const handleBanUser = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'banned', trustScore: 0 } : u));
    toast.success('User has been banned successfully');
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'active', trustScore: 50 } : u));
    toast.success('User ban revoked');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast.success('User deleted from system');
  };

  const handleResolveReport = (reportId: string, action: 'ban' | 'dismiss' | 'warn') => {
    const report = reports.find(r => r.id === reportId);
    
    // Update Report Status
    setReports(reports.map(r => r.id === reportId ? { ...r, status: action === 'dismiss' ? 'dismissed' : 'resolved' } : r));
    
    // Update User Status if needed
    if (action === 'ban' && report?.reportedId) {
      setUsers(users.map(u => u.id === report.reportedId ? { ...u, status: 'banned', trustScore: 0 } : u));
      toast.success('Report resolved: User banned');
    } else if (action === 'warn' && report?.reportedId) {
       setUsers(users.map(u => u.id === report.reportedId ? { ...u, status: 'flagged', trustScore: Math.max(0, (u.trustScore || 50) - 20) } : u));
      toast.success('Report resolved: Warning sent to user');
    } else {
      toast.info('Report dismissed');
    }
    setAdminNote('');
  };

  const handleBulkAction = (action: 'dismiss' | 'resolve') => {
    if (selectedReportIds.length === 0) return;
    
    setReports(reports.map(r => 
      selectedReportIds.includes(r.id) 
        ? { ...r, status: action === 'dismiss' ? 'dismissed' : 'resolved' } 
        : r
    ));
    
    toast.success(`${selectedReportIds.length} reports ${action === 'dismiss' ? 'dismissed' : 'resolved'}`);
    setSelectedReportIds([]);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status.length === 0 || filters.status.includes(user.status);
    const matchesRegion = filters.region.length === 0 || filters.region.includes(user.region);
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const paginatedUsers = filteredUsers.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);
  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const filteredReports = reports.filter(report => {
    if (reportFilter === 'all') return true;
    return report.status === reportFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">AdminPanel</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={Users} 
            label="User Management" 
            isActive={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="Chat Logs" 
            isActive={activeTab === 'chats'} 
            onClick={() => setActiveTab('chats')} 
          />
          <SidebarItem 
            icon={AlertTriangle} 
            label="Reports & Safety" 
            isActive={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')} 
            badge="12"
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Analytics" 
            isActive={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')} 
          />
          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">System</p>
            <SidebarItem 
              icon={FileText} 
              label="Audit Logs" 
              isActive={activeTab === 'audit'} 
              onClick={() => setActiveTab('audit')} 
            />
            <SidebarItem 
              icon={Settings} 
              label="Settings" 
              isActive={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg shadow-sm border border-gray-200 dark:border-gray-700">
              🛡️
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Administrator</p>
              <p className="text-xs text-gray-500 truncate">admin@whispa.com</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onThemeChange(themeMode === 'dark' ? 'light' : 'dark')}
            >
              {themeMode === 'dark' ? '🌙' : '☀️'}
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Stats Grid - Whispa KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{users.length.toLocaleString()}</h3>
                      </div>
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      <span className="text-green-600 font-medium flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12%
                      </span>
                      <span className="text-gray-500 ml-2">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-200 dark:border-gray-800 cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => setActiveTab('reports')}>
                   <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Reports</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                          {reports.filter(r => r.status === 'pending').length}
                        </h3>
                      </div>
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      {reports.filter(r => r.status === 'pending').length > 0 ? (
                        <span className="text-red-600 font-medium flex items-center">
                          +2 new
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium flex items-center">
                          All clear
                        </span>
                      )}
                      <span className="text-gray-500 ml-2">requiring attention</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-200 dark:border-gray-800" onClick={() => setActiveTab('messages')}>
                   <CardContent className="p-6 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Messages</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">1.2M</h3>
                      </div>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      <span className="text-green-600 font-medium flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +5.2%
                      </span>
                      <span className="text-gray-500 ml-2">this week</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                   <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Online Users</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">2,845</h3>
                      </div>
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Activity className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-600 font-medium">Live now</span>
                      </div>
                      <span className="text-gray-500 ml-2">across all regions</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts & Reports Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area */}
                <Card className="lg:col-span-2 border-gray-200 dark:border-gray-800 shadow-sm h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>Platform Activity</CardTitle>
                    <CardDescription>Message volume and active user trends (Last 7 Days)</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 min-h-[350px]">
                    <div className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" vertical={false} />
                          <XAxis dataKey="name" className="text-xs text-gray-500" axisLine={false} tickLine={false} dy={10} />
                          <YAxis className="text-xs text-gray-500" axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            labelStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
                          />
                          <Area type="monotone" dataKey="active" stroke="#6366f1" fillOpacity={1} fill="url(#colorActive)" name="Active Users" />
                          <Area type="monotone" dataKey="messages" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMessages)" name="Messages" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Latest Reports List */}
                <Card className="border-gray-200 dark:border-gray-800 shadow-sm flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Latest Reports</CardTitle>
                    {reports.filter(r => r.status === 'pending').length > 0 && (
                      <Badge variant="destructive" className="h-6">
                        {reports.filter(r => r.status === 'pending').length} Pending
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto">
                    <div className="space-y-4">
                      {reports.slice(0, 5).map((report) => (
                        <div key={report.id} 
                             className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                             onClick={() => setActiveTab('reports')}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm flex-shrink-0 ${report.reportedColor || 'bg-gray-200'}`}>
                            {report.reportedAvatar || '👤'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{report.reported}</p>
                              <span className="text-[10px] text-gray-500 whitespace-nowrap">{report.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{report.reason}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">{report.status}</Badge>
                              {report.severity === 'critical' && <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">CRITICAL</Badge>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 text-xs" onClick={() => setActiveTab('reports')}>View All Reports</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Users Table */}
              <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Newest Members</CardTitle>
                    <CardDescription>Recent registrations and their status</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('users')}>View All Users</Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                          <th className="px-4 py-3 font-medium text-gray-500">User</th>
                          <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                          <th className="px-4 py-3 font-medium text-gray-500">Region</th>
                          <th className="px-4 py-3 font-medium text-gray-500">Joined</th>
                          <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {users.slice(0, 5).map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-sm ${user.avatarColor || 'bg-gray-200'}`}>
                                  {user.avatar}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={`
                                ${user.status === 'active' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-900' : ''}
                                ${user.status === 'banned' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-900' : ''}
                                ${user.status === 'flagged' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900' : ''}
                              `}>
                                {user.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-gray-500">{user.region}</td>
                            <td className="px-4 py-3 text-gray-500">{user.joined}</td>
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={() => {
                                setSelectedUser(user);
                                setActiveTab('users');
                              }}>
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* User Management Tab Content */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h2>
                  <p className="text-sm text-gray-500">Manage user accounts, permissions, and status.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-9 w-full sm:w-64 bg-white dark:bg-gray-900"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2 border-dashed">
                        <Filter className="w-4 h-4" />
                        Filter
                        {(filters.status.length > 0 || filters.region.length > 0) && (
                          <Badge variant="secondary" className="h-5 rounded-sm px-1 font-normal">
                            {filters.status.length + filters.region.length}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {['active', 'banned', 'flagged'].map((status) => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={filters.status.includes(status)}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({
                              ...prev,
                              status: checked 
                                ? [...prev.status, status]
                                : prev.status.filter(s => s !== status)
                            }));
                          }}
                          className="capitalize"
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Region</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {['North America', 'Europe', 'Asia', 'Australia'].map((region) => (
                        <DropdownMenuCheckboxItem
                          key={region}
                          checked={filters.region.includes(region)}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({
                              ...prev,
                              region: checked 
                                ? [...prev.region, region]
                                : prev.region.filter(r => r !== region)
                            }));
                          }}
                        >
                          {region}
                        </DropdownMenuCheckboxItem>
                      ))}
                      {(filters.status.length > 0 || filters.region.length > 0) && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => setFilters({ status: [], region: [] })}
                            className="justify-center text-center"
                          >
                            Clear Filters
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="outline" className="gap-2" onClick={handleExportUsers}>
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>

              <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          <th className="px-6 py-4 font-medium">User Details</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium">Region</th>
                          <th className="px-6 py-4 font-medium">Joined Date</th>
                          <th className="px-6 py-4 font-medium">Reports</th>
                          <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {paginatedUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm ${user.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                                  {user.avatar}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                  <div className="text-xs text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${user.status === 'active' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-900' : ''}
                                  ${user.status === 'banned' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-900' : ''}
                                  ${user.status === 'flagged' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900' : ''}
                                `}
                              >
                                {user.status.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.region}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.joined}</td>
                            <td className="px-6 py-4">
                              {user.reports > 0 ? (
                                <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400">
                                  {user.reports} Flags
                                </Badge>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                      setActiveTab('messages');
                                      toast.info(`Viewing chat logs for ${user.name}`);
                                  }}>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    View Chat Logs
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {user.status === 'banned' ? (
                                    <DropdownMenuItem onClick={() => handleUnbanUser(user.id)}>
                                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                      Revoke Ban
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem onClick={() => handleBanUser(user.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30">
                                      <Ban className="w-4 h-4 mr-2" />
                                      Ban User
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Account
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-sm text-gray-500">
                      Showing <span className="font-medium">
                        {Math.min((userPage - 1) * itemsPerPage + 1, filteredUsers.length)}-{Math.min(userPage * itemsPerPage, filteredUsers.length)}
                      </span> of <span className="font-medium">{filteredUsers.length}</span> users
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setUserPage(p => Math.max(1, p - 1))}
                        disabled={userPage === 1}
                        className="h-8"
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setUserPage(p => Math.min(totalUserPages, p + 1))}
                        disabled={userPage === totalUserPages}
                        className="h-8"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Profile Dialog */}
              <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
                <DialogContent className="max-w-md">
                   <DialogHeader>
                     <div className="flex items-center gap-4 pt-2">
                       <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm border-2 border-white dark:border-gray-800 ${selectedUser?.avatarColor}`}>
                          {selectedUser?.avatar}
                       </div>
                       <div>
                         <DialogTitle className="text-xl">{selectedUser?.name}</DialogTitle>
                         <DialogDescription className="text-sm">{selectedUser?.email}</DialogDescription>
                         <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{selectedUser?.id}</Badge>
                            <Badge variant={selectedUser?.status === 'active' ? 'default' : 'destructive'} className="capitalize">{selectedUser?.status}</Badge>
                         </div>
                       </div>
                     </div>
                   </DialogHeader>
                   
                   <div className="py-4 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-2 mb-1 text-gray-500">
                               <Activity className="w-3 h-3" />
                               <span className="text-xs font-semibold uppercase">Trust Score</span>
                            </div>
                            <p className="text-lg font-bold">{selectedUser?.trustScore}<span className="text-xs text-gray-400 font-normal">/100</span></p>
                         </div>
                         <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-2 mb-1 text-gray-500">
                               <Flag className="w-3 h-3" />
                               <span className="text-xs font-semibold uppercase">Reports</span>
                            </div>
                            <p className="text-lg font-bold">{selectedUser?.reports}</p>
                         </div>
                         <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-2 mb-1 text-gray-500">
                               <Users className="w-3 h-3" />
                               <span className="text-xs font-semibold uppercase">Region</span>
                            </div>
                            <p className="font-medium">{selectedUser?.region}</p>
                         </div>
                         <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-2 mb-1 text-gray-500">
                               <Clock className="w-3 h-3" />
                               <span className="text-xs font-semibold uppercase">Joined</span>
                            </div>
                            <p className="font-medium">{selectedUser?.joined}</p>
                         </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                           <FileText className="w-4 h-4" /> Recent Activity
                        </h4>
                        <div className="border-l-2 border-indigo-100 dark:border-indigo-900 pl-4 space-y-4">
                           <div className="relative">
                              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-gray-950"></div>
                              <p className="text-sm font-medium">Updated profile picture</p>
                              <p className="text-xs text-gray-500">2 hours ago</p>
                           </div>
                           <div className="relative">
                              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-950"></div>
                              <p className="text-sm font-medium">Logged in from new device</p>
                              <p className="text-xs text-gray-500">Yesterday at 4:30 PM</p>
                           </div>
                        </div>
                      </div>
                   </div>

                   <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
                      <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30" onClick={() => {
                          handleBanUser(selectedUser?.id);
                          setSelectedUser(null);
                      }}>
                        <Ban className="w-4 h-4 mr-2" /> 
                        {selectedUser?.status === 'banned' ? 'Already Banned' : 'Ban User'}
                      </Button>
                      <Button onClick={() => setSelectedUser(null)}>Done</Button>
                   </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Reports Tab Content */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-red-50 dark:bg-red-950/10 border-red-100 dark:border-red-900/30">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">Critical Reports</p>
                      <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">
                        {reports.filter(r => r.severity === 'critical' && r.status === 'pending').length}
                      </h3>
                    </div>
                    <ShieldAlert className="w-8 h-8 text-red-500 opacity-50" />
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50 dark:bg-yellow-950/10 border-yellow-100 dark:border-yellow-900/30">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending Review</p>
                      <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mt-1">
                        {reports.filter(r => r.status === 'pending').length}
                      </h3>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-950/10 border-green-100 dark:border-green-900/30">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Resolved Today</p>
                      <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">
                        {reports.filter(r => r.status === 'resolved').length}
                      </h3>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Tabs defaultValue="all" value={reportFilter} onValueChange={(v) => setReportFilter(v as any)} className="w-full sm:w-auto">
                    <TabsList>
                      <TabsTrigger value="all">All Reports</TabsTrigger>
                      <TabsTrigger value="pending" className="relative">
                        Pending
                        {reports.filter(r => r.status === 'pending').length > 0 && (
                          <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="resolved">Resolved</TabsTrigger>
                      <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex gap-2 w-full sm:w-auto">
                     {selectedReportIds.length > 0 && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction('dismiss')}>
                          Dismiss Selected ({selectedReportIds.length})
                        </Button>
                        <Button variant="default" size="sm" onClick={() => handleBulkAction('resolve')}>
                          Resolve Selected ({selectedReportIds.length})
                        </Button>
                      </>
                    )}
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="severity">Severity (High-Low)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Reports List */}
                <div className="grid grid-cols-1 gap-4">
                  {filteredReports.map((report) => (
                    <Card key={report.id} className={`border transition-all ${
                      selectedReportIds.includes(report.id) 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10' 
                        : 'border-gray-200 dark:border-gray-800 hover:shadow-md'
                    }`}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          <Checkbox 
                            checked={selectedReportIds.includes(report.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedReportIds([...selectedReportIds, report.id]);
                              } else {
                                setSelectedReportIds(selectedReportIds.filter(id => id !== report.id));
                              }
                            }}
                            className="mt-1"
                          />
                          
                          <div className={`p-3 rounded-full flex-shrink-0 ${
                            report.severity === 'critical' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                            report.severity === 'high' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                            'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            <Flag className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white">{report.reason}</h4>
                                {report.severity === 'critical' && (
                                  <Badge variant="destructive" className="animate-pulse">CRITICAL</Badge>
                                )}
                                <Badge variant="outline" className={
                                  report.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                  report.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' : 
                                  'bg-gray-100 text-gray-600 border-gray-200'
                                }>
                                  {report.status.toUpperCase()}
                                </Badge>
                              </div>
                              <span className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
                                <Clock className="w-3 h-3" />
                                {report.time}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${report.reporterColor || 'bg-gray-200'}`}>
                                  {report.reporterAvatar || '👤'}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{report.reporter}</span>
                              </div>
                              <span>reported</span>
                              <div className="flex items-center gap-1">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${report.reportedColor || 'bg-red-100'}`}>
                                  {report.reportedAvatar || '👤'}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{report.reported}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                               <ReportReviewModal 
                                 report={report} 
                                 reportedUser={users.find(u => u.id === report.reportedId) || { 
                                   name: report.reported, 
                                   id: 'unknown', 
                                   trustScore: 50, 
                                   joined: 'Unknown', 
                                   reports: 0, 
                                   status: 'unknown',
                                   avatar: report.reportedAvatar || '👤',
                                   avatarColor: report.reportedColor || 'bg-gray-200'
                                 }}
                                 onResolve={handleResolveReport} 
                               />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredReports.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">All Caught Up!</h3>
                      <p className="text-gray-500 mt-1">No reports match your current filters.</p>
                      <Button variant="link" onClick={() => setReportFilter('all')} className="mt-2">Clear Filters</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab Content (New) */}
          {activeTab === 'messages' && (
             <div className="h-[calc(100vh-10rem)] flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
                    <Input placeholder="Search logs..." className="pl-9" />
                  </div>
                  <Card className="flex-1 border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {['Sarah / Admin', 'Mike_88', 'User_9921', 'Reported_User_X', 'Spammer_01'].map((u, i) => (
                           <div key={i} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${i === 2 ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                             <div className="flex justify-between items-start mb-1">
                               <span className="font-medium text-sm text-gray-900 dark:text-white">{u}</span>
                               <span className="text-xs text-gray-500">2m ago</span>
                             </div>
                             <p className="text-xs text-gray-500 truncate">Last message content snippet would go here...</p>
                           </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <Card className="flex-1 border-gray-200 dark:border-gray-800 shadow-sm flex flex-col overflow-hidden">
                    <CardHeader className="py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <Avatar className="w-8 h-8">
                              <AvatarFallback>U9</AvatarFallback>
                           </Avatar>
                           <div>
                             <h4 className="text-sm font-semibold">User_9921</h4>
                             <p className="text-xs text-gray-500">ID: 882910-22</p>
                           </div>
                        </div>
                        <Badge variant="outline">Read Only Mode</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden relative">
                       <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
                       <ScrollArea className="h-full p-4 space-y-4">
                         <div className="flex flex-col gap-3">
                           <div className="self-start max-w-[80%] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                             <p>Hello, I am having trouble with my account.</p>
                             <span className="text-[10px] text-gray-400 mt-1 block">10:30 AM</span>
                           </div>
                           <div className="self-end max-w-[80%] bg-indigo-600 text-white rounded-lg p-3 text-sm">
                             <p>Hi there! I can help with that. What seems to be the issue?</p>
                             <span className="text-[10px] text-indigo-200 mt-1 block">10:32 AM</span>
                           </div>
                           <div className="self-start max-w-[80%] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                             <p>I cannot update my profile picture. It says "server error".</p>
                             <span className="text-[10px] text-gray-400 mt-1 block">10:33 AM</span>
                           </div>
                           <div className="self-end max-w-[80%] bg-indigo-600 text-white rounded-lg p-3 text-sm">
                             <p>I see. Let me check the logs for you.</p>
                             <span className="text-[10px] text-indigo-200 mt-1 block">10:35 AM</span>
                           </div>
                           <div className="my-4 text-center">
                             <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-800">Session ended • 10:45 AM</span>
                           </div>
                         </div>
                       </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
             </div>
          )}

          {/* Audit Logs Tab Content */}
          {activeTab === 'audit' && (
            <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>System Audit Logs</CardTitle>
                  <CardDescription>Track all administrative and system-level actions.</CardDescription>
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" size="sm">Export CSV</Button>
                   <Button variant="outline" size="sm">Filter</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-3">Timestamp</th>
                        <th className="px-4 py-3">Action</th>
                        <th className="px-4 py-3">User</th>
                        <th className="px-4 py-3">IP Address</th>
                        <th className="px-4 py-3">Details</th>
                        <th className="px-4 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {[
                        { time: '2023-10-24 14:32:11', action: 'USER_BANNED', user: 'Admin_Sarah', ip: '192.168.1.1', details: 'Banned User_9921 for spam', status: 'success' },
                        { time: '2023-10-24 14:28:05', action: 'LOGIN_FAILED', user: 'Unknown', ip: '45.22.19.112', details: 'Invalid password attempt', status: 'warning' },
                        { time: '2023-10-24 14:15:30', action: 'SETTINGS_UPDATE', user: 'Admin_Mike', ip: '192.168.1.5', details: 'Updated matching algorithm weights', status: 'success' },
                        { time: '2023-10-24 13:55:12', action: 'REPORT_RESOLVED', user: 'Mod_Alex', ip: '192.168.1.8', details: 'Resolved report #4421 (Harassment)', status: 'success' },
                        { time: '2023-10-24 13:40:00', action: 'SYSTEM_BACKUP', user: 'System', ip: '127.0.0.1', details: 'Automated hourly backup completed', status: 'success' },
                        { time: '2023-10-24 13:12:45', action: 'USER_UNBANNED', user: 'Admin_Sarah', ip: '192.168.1.1', details: 'Unbanned User_8812 (Appeal accepted)', status: 'success' },
                        { time: '2023-10-24 12:50:22', action: 'API_ERROR', user: 'System', ip: '10.0.0.5', details: 'Rate limit exceeded for external geo-ip service', status: 'error' },
                        { time: '2023-10-24 12:30:10', action: 'LOGIN_SUCCESS', user: 'Admin_Sarah', ip: '192.168.1.1', details: 'Successful login', status: 'success' },
                      ].map((log, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-400">{log.time}</td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-gray-900 dark:text-white">{log.action}</span>
                          </td>
                          <td className="px-4 py-3 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-[10px]">
                              {log.user === 'System' ? '🤖' : '👮'}
                            </div>
                            {log.user}
                          </td>
                          <td className="px-4 py-3 font-mono text-gray-500">{log.ip}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-xs truncate" title={log.details}>{log.details}</td>
                          <td className="px-4 py-3 text-right">
                            <Badge 
                              variant="outline" 
                              className={`
                                ${log.status === 'success' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-900' : ''}
                                ${log.status === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900' : ''}
                                ${log.status === 'error' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-900' : ''}
                              `}
                            >
                              {log.status.toUpperCase()}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <p>Showing 8 of 1,240 records</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab Content (New) */}
          {activeTab === 'settings' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                   <CardContent className="p-0">
                      <div className="flex flex-col">
                         <Button variant="ghost" className="justify-start rounded-none h-12 px-6 border-l-2 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10 font-medium">General</Button>
                         <Button variant="ghost" className="justify-start rounded-none h-12 px-6 border-l-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-500">Notifications</Button>
                         <Button variant="ghost" className="justify-start rounded-none h-12 px-6 border-l-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-500">Security</Button>
                         <Button variant="ghost" className="justify-start rounded-none h-12 px-6 border-l-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-500">Moderation Rules</Button>
                         <Button variant="ghost" className="justify-start rounded-none h-12 px-6 border-l-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-500">API & Integrations</Button>
                      </div>
                   </CardContent>
                </Card>
                <div className="lg:col-span-2 space-y-6">
                   <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                      <CardHeader>
                         <CardTitle>General Settings</CardTitle>
                         <CardDescription>Manage your platform's core configuration.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                         <div className="grid gap-2">
                           <Label>Platform Name</Label>
                           <Input defaultValue="Whispa" />
                         </div>
                         <div className="grid gap-2">
                           <Label>Support Email</Label>
                           <Input defaultValue="support@whispa.chat" />
                         </div>
                         <div className="flex items-center justify-between pt-2">
                            <div className="space-y-0.5">
                               <Label>Maintenance Mode</Label>
                               <p className="text-xs text-gray-500">Temporarily disable access for non-admins</p>
                            </div>
                            <Checkbox />
                         </div>
                      </CardContent>
                   </Card>
                   
                   <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                      <CardHeader>
                         <CardTitle>System Thresholds</CardTitle>
                         <CardDescription>Configure automated moderation limits.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                         <div className="grid gap-2">
                           <Label className="flex justify-between">
                              <span>Spam Detection Sensitivity</span>
                              <span className="text-gray-500 font-normal">High</span>
                           </Label>
                           <Progress value={75} className="h-2" />
                         </div>
                         <div className="grid gap-2">
                           <Label>Max Reports Before Auto-Flag</Label>
                           <Select defaultValue="3">
                              <SelectTrigger>
                                 <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="3">3 Reports (Strict)</SelectItem>
                                 <SelectItem value="5">5 Reports (Standard)</SelectItem>
                                 <SelectItem value="10">10 Reports (Lenient)</SelectItem>
                              </SelectContent>
                           </Select>
                         </div>
                         <div className="flex justify-end pt-2">
                            <Button>Save Changes</Button>
                         </div>
                      </CardContent>
                   </Card>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}

function ReportReviewModal({ report, reportedUser, onResolve }: { report: any, reportedUser: any, onResolve: (id: string, action: 'ban' | 'dismiss' | 'warn') => void }) {
  const [step, setStep] = useState<'review' | 'success'>('review');
  const [actionTaken, setActionTaken] = useState<'ban' | 'dismiss' | 'warn' | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const handleAction = (action: 'ban' | 'dismiss' | 'warn') => {
    setActionTaken(action);
    setStep('success');
    onResolve(report.id, action);
  };

  return (
    <Dialog onOpenChange={(open) => {
      if (!open) {
        setTimeout(() => {
          setStep('review');
          setActionTaken(null);
          setAdminNote('');
        }, 300);
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">Review Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-full w-full h-full sm:h-[95vh] sm:w-[95vw] sm:max-w-[95vw] sm:rounded-xl overflow-hidden flex flex-col p-0 gap-0">
        
        {step === 'review' ? (
          <>
             <DialogHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DialogTitle className="text-xl">Case #{report.id}</DialogTitle>
                  <Badge variant="outline" className={`
                    ${report.severity === 'critical' ? 'border-red-200 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' : ''}
                    ${report.severity === 'high' ? 'border-orange-200 text-orange-700 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800' : ''}
                  `}>
                    {report.severity.toUpperCase()} SEVERITY
                  </Badge>
                  <Badge variant="secondary">{report.reason}</Badge>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {report.time}
                </div>
              </div>
              <DialogDescription className="mt-2">
                Review the reported content and user history below.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 pt-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                {/* Left Column: Context (5 cols - Wider now) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* User Card */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-4 bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-sm shrink-0 border-4 border-white dark:border-gray-800 ${reportedUser.avatarColor || 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
                          {reportedUser.avatar}
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                              {reportedUser.name}
                            </h3>
                            <Badge variant="outline" className="shrink-0 text-[10px] uppercase">ID: {reportedUser.id}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Joined {reportedUser.joined}</p>
                          <div className="flex items-center gap-2 mt-2">
                             <Badge variant="secondary" className="bg-white hover:bg-white border-gray-200 text-gray-600 font-normal">
                               {reportedUser.region || 'Unknown Region'}
                             </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Trust Score Section */}
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <div>
                            <span className="text-sm font-medium text-gray-500 block">Trust Score</span>
                            <span className={`text-2xl font-bold leading-none ${
                              reportedUser.trustScore < 50 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {reportedUser.trustScore}
                              <span className="text-sm text-gray-400 font-normal">/100</span>
                            </span>
                          </div>
                          <Badge variant={reportedUser.trustScore < 50 ? "destructive" : "default"} className="mb-1">
                            {reportedUser.trustScore < 50 ? "Low Trust" : "Good Standing"}
                          </Badge>
                        </div>
                        <Progress value={reportedUser.trustScore} className={`h-2.5 bg-gray-100 dark:bg-gray-800 [&>div]:${reportedUser.trustScore < 50 ? 'bg-red-500' : 'bg-green-500'}`} />
                      </div>
                      
                      <Separator />

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-2 mb-2 text-gray-500">
                             <Flag className="w-4 h-4" />
                             <span className="text-xs font-semibold uppercase tracking-wider">Reports</span>
                          </div>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">{reportedUser.reports || 0}</p>
                          <p className="text-xs text-gray-500">Previous incidents</p>
                        </div>
                        
                         <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-2 mb-2 text-gray-500">
                             <Activity className="w-4 h-4" />
                             <span className="text-xs font-semibold uppercase tracking-wider">Status</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              {reportedUser.status === 'active' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                                reportedUser.status === 'active' ? 'bg-green-500' : 
                                reportedUser.status === 'banned' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}></span>
                            </span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white capitalize">{reportedUser.status}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Internal Notes */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Internal Decision Note</Label>
                    <Textarea 
                      placeholder="Why are you taking this action? (Optional)"
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="min-h-[120px] resize-none bg-yellow-50/30 dark:bg-yellow-900/10 focus:bg-white dark:focus:bg-gray-900 transition-colors p-4 text-base"
                    />
                  </div>
                </div>

                {/* Right Column: Evidence (7 cols) */}
                <div className="lg:col-span-7 flex flex-col h-full space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex-1 flex flex-col overflow-hidden shadow-inner">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
                       <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <MessageSquare className="w-4 h-4" />
                        Chat Transcript
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Shield className="w-3 h-3" />
                        End-to-End Encrypted Access
                      </div>
                    </div>
                    
                    <ScrollArea className="flex-1 p-4 bg-gray-50/50 dark:bg-black/20">
                      <div className="space-y-6 max-w-2xl mx-auto">
                        {report.chatTranscript && report.chatTranscript.length > 0 ? (
                          report.chatTranscript.map((msg: any) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.sender === report.reporter ? '' : 'flex-row-reverse'}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mt-1 shadow-sm ${
                                msg.sender === report.reporter 
                                  ? (report.reporterColor || 'bg-gray-200') 
                                  : (report.reportedColor || 'bg-indigo-100')
                              }`}>
                                {msg.sender === report.reporter ? (report.reporterAvatar || '👤') : (report.reportedAvatar || '👤')}
                              </div>
                              <div className={`${msg.sender === report.reporter ? '' : 'flex flex-col items-end'}`}>
                                <div className={`flex items-baseline gap-2 mb-1 ${msg.sender === report.reporter ? '' : 'flex-row-reverse'}`}>
                                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{msg.sender}</span>
                                  <span className="text-xs text-gray-400">{msg.time}</span>
                                </div>
                                <div className={`${
                                  msg.sender === report.reporter 
                                    ? 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-none' 
                                    : 'bg-indigo-600 text-white rounded-tr-none'
                                  } p-3 rounded-2xl shadow-sm text-sm`}>
                                  {msg.type === 'image' ? (
                                    <div className="flex items-center gap-2 italic text-xs opacity-90">
                                      <Eye className="w-4 h-4" />
                                      [Image Media Hidden]
                                    </div>
                                  ) : (
                                    msg.text
                                  )}
                                </div>
                                {msg.isFlagged && (
                                  <div className="mt-1 flex items-center gap-1 text-[10px] text-red-500 font-medium">
                                    <AlertTriangle className="w-3 h-3" />
                                    Flagged by System
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 text-gray-500 italic">No chat logs available for this report.</div>
                        )}

                        <div className="relative py-4">
                           <Separator />
                           <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-900 px-2 text-xs text-gray-400 font-medium">
                             Report Filed
                           </span>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Automated Analysis Alert */}
                  {report.aiAnalysis && (
                    <div className={`border rounded-lg p-4 flex items-start gap-3 ${
                      report.aiAnalysis.flagged 
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/50' 
                        : 'bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/50'
                    }`}>
                       <div className={`p-2 rounded-full shrink-0 ${
                         report.aiAnalysis.flagged 
                           ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' 
                           : 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400'
                       }`}>
                         {report.aiAnalysis.flagged ? <ShieldAlert className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                       </div>
                       <div>
                         <h5 className={`font-semibold text-sm ${
                           report.aiAnalysis.flagged ? 'text-red-900 dark:text-red-300' : 'text-green-900 dark:text-green-300'
                         }`}>
                           {report.aiAnalysis.flagged ? 'Safety System Flagged' : 'System Analysis Clear'}
                         </h5>
                         <p className={`text-xs mt-1 ${
                           report.aiAnalysis.flagged ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'
                         }`}>
                           Confidence: <strong>{report.aiAnalysis.confidence}%</strong> - {report.aiAnalysis.reason}
                         </p>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button variant="ghost" onClick={() => handleAction('dismiss')} className="w-full sm:w-auto">Dismiss (No Violation)</Button>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-900/20"
                  onClick={() => handleAction('warn')}
                >
                  Send Warning
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 shadow-sm"
                  onClick={() => handleAction('ban')}
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Ban User & Close Report
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-300">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
              actionTaken === 'ban' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500' :
              actionTaken === 'warn' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-500' :
              'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}>
              {actionTaken === 'ban' ? <Ban className="w-10 h-10" /> :
               actionTaken === 'warn' ? <AlertTriangle className="w-10 h-10" /> :
               <CheckCircle className="w-10 h-10" />
              }
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {actionTaken === 'ban' ? 'User Banned Successfully' :
               actionTaken === 'warn' ? 'Warning Sent to User' :
               'Report Dismissed'}
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              {actionTaken === 'ban' ? 'The user has been banned from the platform. An email notification has been sent to them regarding this violation.' :
               actionTaken === 'warn' ? 'The user has received an official warning. This incident has been logged in their permanent record.' :
               'The report has been closed and marked as resolved. No punitive action was taken against the user.'}
            </p>

            <div className="flex gap-4">
              <DialogTrigger asChild>
                <Button variant="outline" className="min-w-[120px]">Close</Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                 <Button className="min-w-[120px]">Next Report</Button>
              </DialogTrigger>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SidebarItem({ icon: Icon, label, isActive, onClick, badge }: { icon: any; label: string; isActive?: boolean; onClick: () => void; badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' 
          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`} />
        {label}
      </div>
      {badge && (
        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon, className }: { title: string; value: string; trend: string; trendUp: boolean; icon: any; className?: string }) {
  return (
    <Card className={`border-gray-200 dark:border-gray-800 shadow-sm ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl ${trendUp ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-red-100 text-red-600 dark:bg-red-900/20'}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs">
          <span className={`font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}