import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { UserPlus, Loader2, Check, AlertCircle } from 'lucide-react';
import { UserProfile } from '../App';

interface ClaimAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaimSuccess: (email: string, username: string, password: string) => void;
  onGoogleClaim: () => void;
  currentProfile: UserProfile;
}

export function ClaimAccountDialog({
  open,
  onOpenChange,
  onClaimSuccess,
  onGoogleClaim,
  currentProfile,
}: ClaimAccountDialogProps) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and a number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Call success handler after showing success message
    setTimeout(() => {
      onClaimSuccess(formData.email, formData.username, formData.password);
      setShowSuccess(false);
      onOpenChange(false);
      // Reset form
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-xl border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <UserPlus className="w-6 h-6 text-purple-300" />
            Claim Your Account
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Convert your anonymous session into a registered account. All your friends and chat
            history will be preserved!
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl text-white">Account Claimed Successfully!</h3>
              <p className="text-white/70 text-sm">
                Your anonymous account has been upgraded to a registered account.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {/* Current Profile Info */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 space-y-2">
              <p className="text-sm text-white/70">Your Current Anonymous Profile:</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentProfile.avatar}</span>
                <div>
                  <p className="text-white">{currentProfile.name}</p>
                  <p className="text-white/60 text-sm">{currentProfile.bio}</p>
                </div>
              </div>
            </div>

            {/* Google Claim Button */}
            <button
              onClick={onGoogleClaim}
              type="button"
              className="w-full bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-3 shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Claim with Google
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-purple-900/95 text-white/60">or claim with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/90">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 ${
                    errors.username ? 'border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                />
                {errors.username && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/90">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm text-blue-200">
                <p className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    By claiming your account, you'll be able to access your chats from any device and
                    won't lose your data if you close the browser.
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                  className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Claiming Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Claim Account
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}