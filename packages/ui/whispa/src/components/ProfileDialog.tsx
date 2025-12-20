import { MapPin, Calendar, MessageCircle, Circle, LogOut, User, Mail, Shield, Crown, UserMinus, UserPlus, UserCheck } from 'lucide-react';
import { Friend, UserProfile } from '../App';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useState } from 'react';

interface ProfileDialogProps {
  user: Friend | UserProfile;
  isOpen: boolean;
  onClose: () => void;
  isCurrentUser?: boolean;
  onLogout?: () => void;
  onUnfriend?: (friendId: string) => void;
  isAnonymous?: boolean;
  onClaimAccount?: () => void;
  onSendFriendRequest?: (id: string) => void;
  friendRequestSent?: boolean;
  isFriend?: boolean;
}

export function ProfileDialog({ user, isOpen, onClose, isCurrentUser, onLogout, onUnfriend, isAnonymous, onClaimAccount, onSendFriendRequest, friendRequestSent, isFriend: isFriendProp }: ProfileDialogProps) {
  const isFriend = isFriendProp ?? 'isOnline' in user;
  
  const formatJoinDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const formatLastSeen = (date?: Date) => {
    if (!date) return '';
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const [isUnfriendDialogOpen, setIsUnfriendDialogOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 w-[95vw] sm:w-[95vw] max-w-md max-h-[90vh] overflow-y-auto" hideCloseButton={false}>
        <DialogHeader className="pr-6">
          <DialogTitle className="text-gray-900 dark:text-white text-xl">
            {isCurrentUser ? 'Your Profile' : `${user.name}'s Profile`}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {isCurrentUser ? 'View and manage your profile' : 'View profile details'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Avatar and Status */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
            <div className="relative">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg ${user.avatarColor || 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                {user.avatar}
              </div>
              {isFriend && (
                <div
                  className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                    user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                  {user.name}
                </h3>
                {isCurrentUser && (
                  <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                )}
              </div>
              {isFriend && user.isOnline ? (
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-sm mt-1">
                  <Circle className="w-2 h-2 fill-current" />
                  <span>Online</span>
                </div>
              ) : isFriend && user.lastSeen ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Last seen {formatLastSeen(user.lastSeen)}
                </p>
              ) : null}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <User className="w-4 h-4 text-gray-400 dark:text-gray-600" />
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Bio
              </h4>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-900 dark:text-gray-100">{user.bio}</p>
            </div>
          </div>

          {/* Region */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-600" />
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Region
              </h4>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-900 dark:text-gray-100 capitalize">
                {user.region.replace('-', ' ')}
              </p>
            </div>
          </div>

          {/* Gender (if available) */}
          {'gender' in user && user.gender && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <User className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Gender
                </h4>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-gray-100 capitalize">
                  {user.gender === 'rather-not-say' ? 'Prefer not to say' : user.gender}
                </p>
              </div>
            </div>
          )}

          {/* Join Date (for UserProfile) */}
          {'joinedDate' in user && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Member Since
                </h4>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-gray-100">
                  {formatJoinDate(user.joinedDate)}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          {isCurrentUser && isAnonymous && onClaimAccount && (
             <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={onClaimAccount}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg transition-all shadow-md"
              >
                <Crown className="w-4 h-4" />
                <span className="font-medium">Claim Account</span>
              </button>
            </div>
          )}

          {isCurrentUser && onLogout && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-3 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}

          {!isCurrentUser && !isFriend && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-2">
              <button
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">Send Message</span>
              </button>
              
              {onSendFriendRequest && (
                <button
                  onClick={() => onSendFriendRequest(user.id)}
                  disabled={friendRequestSent}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all border ${
                    friendRequestSent
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {friendRequestSent ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span className="font-medium">Friend Request Sent</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span className="font-medium">Add Friend</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {!isCurrentUser && isFriend && onUnfriend && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setIsUnfriendDialogOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-3 rounded-lg transition-all"
              >
                <UserMinus className="w-4 h-4" />
                <span className="font-medium">Unfriend</span>
              </button>
            </div>
          )}
        </div>
      </DialogContent>

      {/* Unfriend Confirmation Dialog */}
      <AlertDialog open={isUnfriendDialogOpen} onOpenChange={setIsUnfriendDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white text-xl">Unfriend {user.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400 text-base">
              This action cannot be undone. {user.name} will be permanently removed from your friends list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="rounded-lg border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg border-none"
              onClick={() => {
                if (onUnfriend) onUnfriend(user.id);
                setIsUnfriendDialogOpen(false);
                onClose();
              }}
            >
              Unfriend
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}