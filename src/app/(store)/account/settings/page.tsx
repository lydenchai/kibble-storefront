'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertCircle, User, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { updateProfileAction } from '@/actions/account.actions';
import AccountSidebar from '@/components/account/AccountSidebar';

type SaveState = 'idle' | 'loading' | 'success' | 'error';

export default function SettingsPage() {
  const router = useRouter();
  const { user, login } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Profile form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profileSave, setProfileSave] = useState<SaveState>('idle');
  const [profileError, setProfileError] = useState('');

  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordSave, setPasswordSave] = useState<SaveState>('idle');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !user) router.push('/login');
    if (user) {
      setName(user.name || '');
      setPhone((user as any).phone || '');
    }
  }, [mounted, user, router]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSave('loading');
    setProfileError('');
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
      const res = await updateProfileAction({ name, phone }, token);
      if (res.error) throw new Error(res.error);
      if (res.success) {
        // Update the auth store with the new name
        if (user) {
          login({ ...user, name: res.user.name }, token || '');
        }
        setProfileSave('success');
        setTimeout(() => setProfileSave('idle'), 3000);
      }
    } catch (err: any) {
      setProfileError(err.message || 'Failed to save profile.');
      setProfileSave('error');
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      return;
    }
    setPasswordSave('loading');
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
      const res = await updateProfileAction({ currentPassword, newPassword }, token);
      if (res.error) throw new Error(res.error);
      setPasswordSave('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSave('idle'), 3000);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password.');
      setPasswordSave('error');
    }
  };

  if (!mounted || !user) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-6">
        <AccountSidebar />

        <div className="flex-1 min-w-0 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

          {/* Profile Information */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <h2 className="font-semibold text-gray-900">Profile Information</h2>
            </div>

            <form onSubmit={handleProfileSave} className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="settings-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="settings-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="settings-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="settings-email"
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email address cannot be changed.</p>
                </div>
              </div>

              <div>
                <label htmlFor="settings-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Phone className="inline h-4 w-4 mr-1" />Phone Number
                </label>
                <input
                  id="settings-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+855 012 345 678"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                />
              </div>

              {profileSave === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {profileError}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                {profileSave === 'success' && (
                  <span className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" /> Profile saved!
                  </span>
                )}
                <div className="ml-auto">
                  <button
                    type="submit"
                    disabled={profileSave === 'loading'}
                    className="bg-brand-600 text-white font-semibold px-8 py-2.5 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-60 cursor-pointer text-sm"
                  >
                    {profileSave === 'loading' ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                <Lock className="h-4 w-4" />
              </div>
              <h2 className="font-semibold text-gray-900">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordSave} className="p-6 space-y-5">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="current-password"
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showNew ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Minimum 8 characters.</p>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {(passwordSave === 'error' || passwordError) && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {passwordError}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                {passwordSave === 'success' && (
                  <span className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" /> Password updated!
                  </span>
                )}
                <div className="ml-auto">
                  <button
                    type="submit"
                    disabled={passwordSave === 'loading'}
                    className="bg-gray-900 text-white font-semibold px-8 py-2.5 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-60 cursor-pointer text-sm"
                  >
                    {passwordSave === 'loading' ? 'Updating…' : 'Update Password'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h2 className="font-semibold text-red-800 mb-1">Danger Zone</h2>
            <p className="text-sm text-red-600 mb-4">Once you delete your account, all your data will be permanently removed. This action cannot be undone.</p>
            <button
              className="text-sm font-medium text-red-600 border border-red-300 px-5 py-2 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
              onClick={() => window.confirm('Are you sure you want to delete your account? This cannot be undone.')}
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
