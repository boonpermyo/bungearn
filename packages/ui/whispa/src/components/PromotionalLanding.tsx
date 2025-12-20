import { motion } from 'motion/react';
import { MessageCircle, Shield, Users, Globe, Sparkles, Lock, CheckCircle, Star, TrendingUp, Award, Clock, Heart, Video, Zap, Search, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeMode } from '../hooks/useTheme';
import { SiteHeader, SiteFooter } from './SiteLayout';

interface PromotionalLandingProps {
  onStartChat: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  onViewTerms: () => void;
  onViewPrivacy: () => void;
  onViewRefund: () => void;
  onViewDesignSystem?: () => void;
  onViewAtomicDesignSystem?: () => void;
  onViewComponentDocs?: () => void;
  onViewBackoffice?: () => void;
}

export function PromotionalLanding({ 
  onStartChat, 
  themeMode, 
  onThemeChange,
  onViewTerms,
  onViewPrivacy,
  onViewRefund,
  onViewDesignSystem,
  onViewAtomicDesignSystem,
  onViewComponentDocs,
  onViewBackoffice
}: PromotionalLandingProps) {
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: 'them' | 'you' }>>([
    { id: 1, text: 'Hey! Nice to meet you! 👋', sender: 'them' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const conversationFlow = [
    { text: 'Hi! Where are you from?', sender: 'you' as const, delay: 2000 },
    { text: "I'm from Tokyo! Love traveling ️", sender: 'them' as const, delay: 3000 },
    { text: "That's awesome! I've always wanted to visit Japan!", sender: 'you' as const, delay: 2500 },
    { text: 'You should! The food here is amazing 🍜', sender: 'them' as const, delay: 3500 },
  ];

  useEffect(() => {
    if (messageIndex >= conversationFlow.length) {
      // Reset conversation after a pause
      const resetTimer = setTimeout(() => {
        setMessages([{ id: 1, text: 'Hey! Nice to meet you! 👋', sender: 'them' }]);
        setMessageIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }

    const currentMessage = conversationFlow[messageIndex];
    const timer = setTimeout(() => {
      // Show typing indicator
      setIsTyping(true);
      
      // After a moment, add the message
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: prev.length + 1, text: currentMessage.text, sender: currentMessage.sender }
        ]);
        setIsTyping(false);
        setMessageIndex(prev => prev + 1);
      }, 1500); // Typing indicator shows for 1.5s
    }, currentMessage.delay);

    return () => clearTimeout(timer);
  }, [messageIndex]);

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your privacy is our priority. Chat anonymously with complete peace of mind.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with people from 7 different regions across the world.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Video,
      title: 'Video & Text Chat',
      description: 'Choose your preferred way to connect - text or video calls with crystal clear quality.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: UserPlus,
      title: 'Make Friends',
      description: 'Turn meaningful conversations into lasting friendships with our friend system.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '1M+', icon: Users },
    { label: 'Conversations Daily', value: '500K+', icon: MessageCircle },
    { label: 'Countries', value: '150+', icon: Globe },
    { label: 'Avg. Rating', value: '4.9', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950 text-gray-900 dark:text-white overflow-x-hidden">
      <SiteHeader onHome={() => {}} onLogin={onStartChat} />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800"
              >
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-purple-700 dark:text-purple-300">Trusted by millions worldwide</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white leading-tight">
                Meet new people.
                <span className="block mt-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Make real connections.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                The safest and most engaging platform to have meaningful conversations with strangers, make new friends, and expand your social circle globally.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onStartChat}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Start Chatting Free
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-4 sm:pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['👨', '👩', '🧑', '👨‍💼'].map((emoji, i) => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center border-2 border-white dark:border-gray-900 text-xs sm:text-sm">
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">4.9/5 from 50K+ reviews</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">100% Safe & Encrypted</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual - Chat Demo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Decorative Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 dark:from-purple-600/10 dark:to-pink-600/10 rounded-3xl blur-3xl" />
                
                {/* Mock Chat Interface */}
                <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg sm:text-xl border-2 border-white/30">
                        😊
                      </div>
                      <div>
                        <p className="text-white">Sarah from Tokyo</p>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-white/80">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          Online now
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="p-4 sm:p-6 space-y-3 min-h-[300px] sm:min-h-[350px] bg-gray-50 dark:bg-gray-950/50">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={msg.sender === 'them' ? 'flex justify-start' : 'flex justify-end'}
                      >
                        <div className={msg.sender === 'them' 
                          ? 'bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm border border-gray-200 dark:border-gray-700' 
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] shadow-lg'
                        }>
                          <p className={msg.sender === 'them' ? 'text-gray-800 dark:text-gray-200 text-sm sm:text-base' : 'text-white text-sm sm:text-base'}>{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`flex ${conversationFlow[messageIndex]?.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`${conversationFlow[messageIndex]?.sender === 'you'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-lg'
                          : 'bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm border border-gray-200 dark:border-gray-700'
                        } max-w-[85%]`}>
                          <div className="flex gap-1">
                            <div className={`w-2 h-2 rounded-full animate-bounce ${conversationFlow[messageIndex]?.sender === 'you' ? 'bg-white/70' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                            <div className={`w-2 h-2 rounded-full animate-bounce ${conversationFlow[messageIndex]?.sender === 'you' ? 'bg-white/70' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                            <div className={`w-2 h-2 rounded-full animate-bounce ${conversationFlow[messageIndex]?.sender === 'you' ? 'bg-white/70' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-3 sm:p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                        Type a message...
                      </div>
                      <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all text-sm sm:text-base">
                        Send
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Active Users Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Active Now</p>
                      <p className="text-base sm:text-lg text-gray-900 dark:text-white">245K+</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Safety Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">100% Safe</p>
                      <p className="text-base sm:text-lg text-gray-900 dark:text-white">Verified</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800 mb-4 sm:mb-6">
              <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-purple-700 dark:text-purple-300">Why Choose Whispa</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4 sm:mb-6">
              Everything you need to
              <span className="block mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                connect with confidence
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with your safety and experience in mind, featuring the latest technology and user-friendly design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-2xl"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800 mb-4 sm:mb-6">
              <Search className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-purple-700 dark:text-purple-300">Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4 sm:mb-6">
              Start chatting in
              <span className="block mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                just 3 simple steps
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Mode',
                description: 'Select text or video chat, pick your region, and set your preferences.',
                icon: MessageCircle
              },
              {
                step: '02',
                title: 'Get Matched',
                description: 'Our smart algorithm connects you with someone interesting in seconds.',
                icon: Search
              },
              {
                step: '03',
                title: 'Start Talking',
                description: 'Have a great conversation and make a new friend from around the world!',
                icon: Heart
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="text-6xl sm:text-7xl font-bold text-purple-100 dark:text-purple-900/30 mb-4">{step.step}</div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-4 sm:mb-6">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-700 dark:text-blue-300">Your Safety First</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4 sm:mb-6">
                Chat with complete
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  peace of mind
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                We take your privacy and safety seriously with enterprise-grade security and moderation.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Lock, text: 'End-to-end encrypted conversations' },
                  { icon: Shield, text: '24/7 automated content moderation' },
                  { icon: CheckCircle, text: 'Anonymous by default - no personal info required' },
                  { icon: Award, text: 'Verified safety standards and compliance' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-3xl p-6 sm:p-8 lg:p-12 border border-blue-200 dark:border-blue-800">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { label: 'Uptime', value: '99.9%', color: 'from-green-500 to-emerald-500' },
                    { label: 'Encrypted', value: '100%', color: 'from-blue-500 to-cyan-500' },
                    { label: 'Response Time', value: '<100ms', color: 'from-purple-500 to-pink-500' },
                    { label: 'User Satisfaction', value: '4.9/5', color: 'from-orange-500 to-red-500' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
                      <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">
                Ready to make new friends?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join millions of people already connecting on Whispa. Start your first conversation today!
              </p>
              <button
                onClick={onStartChat}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-xl text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Get Started Now - It's Free
              </button>
              <p className="text-sm text-white/70 mt-4">No credit card required • Anonymous sign up • 2 min setup</p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      <SiteFooter 
        onViewTerms={onViewTerms}
        onViewPrivacy={onViewPrivacy}
        onViewRefund={onViewRefund}
        onViewDesignSystem={onViewDesignSystem}
        onViewAtomicDesignSystem={onViewAtomicDesignSystem}
        onViewComponentDocs={onViewComponentDocs}
        onViewBackoffice={onViewBackoffice}
        themeMode={themeMode}
        onThemeChange={onThemeChange}
      />
    </div>
  );
}