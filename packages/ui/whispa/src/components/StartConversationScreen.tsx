import { MessageCircle, Video, ChevronRight, Settings, Globe, Clock, Zap } from 'lucide-react';
import { ChatMode, Region } from '../App';

interface StartConversationScreenProps {
  onStartRandomChat: () => void;
  chatMode: ChatMode;
  onUpdateChatMode: (mode: ChatMode) => void;
  selectedRegion: Region;
  matchingWaitTime: number | null;
  setIsSettingsOpen: (open: boolean) => void;
}

export function StartConversationScreen({
  onStartRandomChat,
  chatMode,
  onUpdateChatMode,
  selectedRegion,
  matchingWaitTime,
  setIsSettingsOpen,
}: StartConversationScreenProps) {
  return (
    <div className="w-full h-full overflow-y-auto bg-black scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
      {/* 
        Layout Strategy:
        - min-h-full ensures the container is at least the height of the screen.
        - flex flex-col allows children to stack.
        - p-4 adds safe padding around the edges.
      */}
      <div className="min-h-full w-full flex flex-col p-4 md:p-8">
        
        {/* 
          Centering Strategy:
          - my-auto on this inner wrapper automatically pushes it to the center vertically 
            if there is space.
          - If there isn't space (screen too small), margins collapse to 0 and content 
            starts at the top, preventing clipping.
        */}
        <div className="w-full max-w-2xl mx-auto my-auto flex flex-col items-center text-center gap-8 py-12">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex-shrink-0">
               {/* Glowing background effect */}
               <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full" />
               <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/20 ring-4 ring-black">
                 <MessageCircle className="w-12 h-12 text-white fill-white/20" />
               </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Start a Conversation
              </h2>
              <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                Connect instantly with people around the world. Choose your mode and dive into meaningful conversations.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-sm opacity-50">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-700" />
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Choose Your Mode</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-700" />
          </div>

          {/* Mode Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {/* Text Mode */}
            <button
              onClick={() => onUpdateChatMode('text')}
              className={`group relative p-6 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-4 overflow-hidden ${
                chatMode === 'text'
                  ? 'bg-gradient-to-b from-purple-900/40 to-pink-900/10 border-purple-500/50 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]'
                  : 'bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                chatMode === 'text' ? 'bg-purple-500/20 text-purple-300' : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700'
              }`}>
                <MessageCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className={`text-lg font-bold ${chatMode === 'text' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>Text Chat</h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[180px]">
                  Connect through messages. Deep conversations.
                </p>
              </div>
              {chatMode === 'text' && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-purple-500 rounded-full shadow-lg shadow-purple-900/20">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Selected</span>
                </div>
              )}
            </button>

            {/* Video Mode */}
            <button
              onClick={() => onUpdateChatMode('video')}
              className={`group relative p-6 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-4 overflow-hidden ${
                chatMode === 'video'
                  ? 'bg-gradient-to-b from-pink-900/40 to-purple-900/10 border-pink-500/50 shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)]'
                  : 'bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                chatMode === 'video' ? 'bg-pink-500/20 text-pink-300' : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700'
              }`}>
                <Video className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className={`text-lg font-bold ${chatMode === 'video' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>Video Chat</h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[180px]">
                  Face-to-face connections. Authentic interactions.
                </p>
              </div>
              {chatMode === 'video' && (
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-pink-500 rounded-full shadow-lg shadow-pink-900/20">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Selected</span>
                </div>
              )}
            </button>
          </div>

          {/* Start Button */}
          <div className="w-full max-w-sm pt-4">
            <button
              onClick={onStartRandomChat}
              className="group relative w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white shadow-xl shadow-purple-900/20 hover:shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                Start Conversation
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Footer Settings */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-full border border-gray-800 transition-colors text-xs font-medium text-gray-400 hover:text-white"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Matching Preferences</span>
            </button>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-medium text-gray-600 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              {selectedRegion.replace(/-/g, ' ')}
            </div>
            <div className="w-px h-3 bg-gray-800" />
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              {matchingWaitTime ? `${matchingWaitTime}s Timeout` : 'No Timeout'}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}