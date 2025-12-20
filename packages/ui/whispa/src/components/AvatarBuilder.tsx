import { useState } from 'react';
import { Shuffle, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AvatarBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  currentBg?: string;
  onSave: (avatar: string, background: string) => void;
}

// Avatar presets for lazy users
const PRESET_AVATARS = [
  '😀', '😎', '🤓', '😇', '🥳', '🤠', '🦸', '🧙',
  '🧑‍💻', '👨‍🎨', '👩‍🔬', '🧑‍🚀', '👨‍🍳', '👩‍⚕️', '🧑‍🎓', '👨‍🏫',
  '🐶', '🐱', '🦊', '🐼', '🦁', '🐯', '🦄', '🐨',
  '🐸', '🐙', '🦉', '🦋', '🐝', '🦖', '🐲', '👾',
  '🌟', '⭐', '💫', '✨', '🔥', '💎', '🌈', '🎨',
  '🎭', '🎪', '🎯', '🎮', '🎸', '🎹', ' труба', '🎻'
];

// Custom avatar parts
const BACKGROUNDS = [
  { value: 'bg-gradient-to-br from-purple-500 to-pink-500', label: 'Purple Pink', preview: 'linear-gradient(to bottom right, #a855f7, #ec4899)' },
  { value: 'bg-gradient-to-br from-blue-500 to-cyan-500', label: 'Blue Cyan', preview: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)' },
  { value: 'bg-gradient-to-br from-green-500 to-emerald-500', label: 'Green', preview: 'linear-gradient(to bottom right, #22c55e, #10b981)' },
  { value: 'bg-gradient-to-br from-orange-500 to-red-500', label: 'Orange Red', preview: 'linear-gradient(to bottom right, #f97316, #ef4444)' },
  { value: 'bg-gradient-to-br from-yellow-400 to-orange-400', label: 'Yellow', preview: 'linear-gradient(to bottom right, #facc15, #fb923c)' },
  { value: 'bg-gradient-to-br from-indigo-500 to-purple-500', label: 'Indigo', preview: 'linear-gradient(to bottom right, #6366f1, #a855f7)' },
  { value: 'bg-gradient-to-br from-pink-500 to-rose-500', label: 'Pink Rose', preview: 'linear-gradient(to bottom right, #ec4899, #f43f5e)' },
  { value: 'bg-gradient-to-br from-teal-500 to-green-500', label: 'Teal', preview: 'linear-gradient(to bottom right, #14b8a6, #22c55e)' },
];

const FACES = ['😊', '😄', '😁', '🙂', '😌', '😏', '🤗', '🤔', '😶', '😐'];
const EYES = ['👀', '👁️', '🥺', '😳', '🤩', '😍', '🧐', '🤓'];
const ACCESSORIES = ['🎩', '👑', '🎓', '🧢', '👒', '⛑️', '👓', '🕶️', '🥽', '🎀', '🌸', '⭐', '💫', '✨'];
const EMOTIONS = ['❤️', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💕', '💖', '💗', '💝'];

export function AvatarBuilder({ isOpen, onClose, currentAvatar, currentBg, onSave }: AvatarBuilderProps) {
  const [selectedType, setSelectedType] = useState<'preset' | 'custom'>('preset');
  const [selectedPreset, setSelectedPreset] = useState(currentAvatar);
  
  // Custom avatar state
  const [customBg, setCustomBg] = useState(currentBg || BACKGROUNDS[0].value);
  const [customFace, setCustomFace] = useState(FACES[0]);
  const [customAccessory, setCustomAccessory] = useState<string>('');
  
  const handleRandomize = () => {
    const randomBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)].value;
    const randomFace = FACES[Math.floor(Math.random() * FACES.length)];
    const randomAccessory = Math.random() > 0.5 ? ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)] : '';
    
    setCustomBg(randomBg);
    setCustomFace(randomFace);
    setCustomAccessory(randomAccessory);
  };

  const handleSave = () => {
    if (selectedType === 'preset') {
      // For presets, use a random nice background if we don't have one selected? 
      // Or just default to purple-pink for now to keep it simple
      const randomBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)].value;
      onSave(selectedPreset, randomBg);
    } else {
      // For custom avatars, save both face and background
      const finalAvatar = customAccessory ? `${customFace}${customAccessory}` : customFace;
      onSave(finalAvatar, customBg);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 !max-w-[95vw] w-[95vw] sm:!max-w-[90vw] md:!max-w-[85vw] lg:!max-w-[1200px] max-h-[90vh] !p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-gray-900 dark:text-white text-2xl">
                Avatar Builder
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-400">
                Create your unique avatar or pick from presets
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-200px)]">
          {/* Left: Preview */}
          <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50">
            <div className="space-y-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Preview</p>
              
              {selectedType === 'preset' ? (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl shadow-2xl">
                  {selectedPreset}
                </div>
              ) : (
                <div className={`w-32 h-32 rounded-full ${customBg} flex items-center justify-center text-5xl shadow-2xl relative`}>
                  <span>{customFace}</span>
                  {customAccessory && (
                    <span className="absolute -top-2 -right-2 text-4xl">{customAccessory}</span>
                  )}
                </div>
              )}
              
              <div className="pt-4">
                <Button
                  onClick={handleRandomize}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={selectedType === 'preset'}
                >
                  <Shuffle className="w-4 h-4" />
                  Randomize
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Options */}
          <div className="flex-1 p-6">
            <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as 'preset' | 'custom')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="preset" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Presets
                </TabsTrigger>
                <TabsTrigger value="custom" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Custom
                </TabsTrigger>
              </TabsList>

              {/* Presets Tab */}
              <TabsContent value="preset" className="mt-0">
                <ScrollArea className="h-[calc(90vh-380px)]">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-900 dark:text-white mb-3 block">Popular Emojis</Label>
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                        {PRESET_AVATARS.slice(0, 16).map((avatar) => (
                          <button
                            key={avatar}
                            onClick={() => setSelectedPreset(avatar)}
                            className={`text-3xl p-3 rounded-xl transition-all hover:scale-110 ${
                              selectedPreset === avatar
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring-2 ring-purple-500 scale-110'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-white mb-3 block">Professionals</Label>
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                        {PRESET_AVATARS.slice(16, 24).map((avatar) => (
                          <button
                            key={avatar}
                            onClick={() => setSelectedPreset(avatar)}
                            className={`text-3xl p-3 rounded-xl transition-all hover:scale-110 ${
                              selectedPreset === avatar
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring-2 ring-purple-500 scale-110'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-white mb-3 block">Animals</Label>
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                        {PRESET_AVATARS.slice(24, 32).map((avatar) => (
                          <button
                            key={avatar}
                            onClick={() => setSelectedPreset(avatar)}
                            className={`text-3xl p-3 rounded-xl transition-all hover:scale-110 ${
                              selectedPreset === avatar
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring-2 ring-purple-500 scale-110'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-white mb-3 block">Special</Label>
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                        {PRESET_AVATARS.slice(32).map((avatar) => (
                          <button
                            key={avatar}
                            onClick={() => setSelectedPreset(avatar)}
                            className={`text-3xl p-3 rounded-xl transition-all hover:scale-110 ${
                              selectedPreset === avatar
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring-2 ring-purple-500 scale-110'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Custom Tab */}
              <TabsContent value="custom" className="mt-0">
                <ScrollArea className="h-[calc(90vh-380px)]">
                  <div className="space-y-6">
                    {/* Background */}
                    <div>
                      <Label className="text-gray-900 dark:text-white mb-3 block">Background</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {BACKGROUNDS.map((bg) => (
                          <button
                            key={bg.value}
                            onClick={() => setCustomBg(bg.value)}
                            className={`relative h-16 rounded-lg transition-all ${
                              customBg === bg.value
                                ? 'ring-2 ring-purple-500 scale-105'
                                : 'hover:scale-105'
                            }`}
                            style={{ background: bg.preview }}
                            title={bg.label}
                          >
                            {customBg === bg.value && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Face */}
                    <div>
                      <Label className="text-gray-900 dark:text-white mb-3 block">Face Expression</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {FACES.map((face) => (
                          <button
                            key={face}
                            onClick={() => setCustomFace(face)}
                            className={`text-3xl p-3 rounded-xl transition-all hover:scale-110 ${
                              customFace === face
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring-2 ring-purple-500 scale-110'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {face}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accessories */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-gray-900 dark:text-white">Accessories (Optional)</Label>
                        {customAccessory && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCustomAccessory('')}
                            className="text-xs h-7"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {ACCESSORIES.map((accessory) => (
                          <button
                            key={accessory}
                            onClick={() => setCustomAccessory(accessory === customAccessory ? '' : accessory)}
                            className={`text-2xl p-2 rounded-lg transition-all hover:scale-110 ${
                              customAccessory === accessory
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring-2 ring-purple-500 scale-110'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {accessory}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Extra Decorations */}
                    <div>
                      <Label className="text-gray-900 dark:text-white mb-3 block">Eyes & Expressions</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {EYES.map((eye) => (
                          <button
                            key={eye}
                            onClick={() => setCustomFace(eye)}
                            className={`text-2xl p-3 rounded-lg transition-all hover:scale-110 ${
                              customFace === eye
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {eye}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-900/50">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Save Avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}