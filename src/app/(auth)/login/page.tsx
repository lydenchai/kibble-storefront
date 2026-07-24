"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { EyeOff, Eye, AlertCircle, X } from "lucide-react";
import { loginAction, registerAction } from "@/actions/auth.actions";
import { useTranslation } from "@/hooks/useTranslation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await loginAction({ email, password });
        if (response.error || response.success === false) {
          const msg = response.error || "Authentication failed. Please check your credentials.";
          setErrorMsg(msg);
          toast.error(msg);
          return;
        }

        if (response && response.data) {
          const { user, accessToken } = response.data;
          login(user, accessToken);

          const searchParams = new URLSearchParams(window.location.search);
          const redirect = searchParams.get("redirect") || "/";
          router.push(redirect);
          router.refresh();
        }
      } else {
        // Register first
        const regRes = await registerAction({ name, email, password });
        if (regRes.error || regRes.success === false) {
          const msg = regRes.error || "Failed to register account.";
          setErrorMsg(msg);
          toast.error(msg);
          return;
        }

        // Then automatically login to get the access token
        const loginResponse = await loginAction({ email, password });
        if (loginResponse.error || loginResponse.success === false) {
          const msg = loginResponse.error || "Authentication failed.";
          setErrorMsg(msg);
          toast.error(msg);
          return;
        }

        if (loginResponse && loginResponse.data) {
          const { user, accessToken } = loginResponse.data;
          login(user, accessToken);

          const searchParams = new URLSearchParams(window.location.search);
          const redirect = searchParams.get("redirect") || "/";
          router.push(redirect);
          router.refresh();
        }
      }
    } catch (error: any) {
      console.error("Authentication failed:", error);
      let message = "Authentication failed. Please check your credentials.";
      if (typeof error?.message === "string") {
        message = error.message;
      }
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin
              ? t('auth.signInDesc')
              : t('auth.joinDesc')}
          </p>

          {errorMsg && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start justify-between gap-3 text-red-700 text-sm animate-fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">Authentication Error</p>
                  <p className="mt-0.5 whitespace-pre-line text-xs">{errorMsg}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setErrorMsg(null)}
                className="text-red-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">
                  {t('auth.fullName')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  placeholder={t('auth.fullName')}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t('auth.email')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                placeholder={t('auth.email')}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type={showNew ? "text" : "password"}
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                placeholder={t('auth.password')}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showNew ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {t('auth.rememberMe')}
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-brand-600 hover:text-brand-500"
                >
                  {t('auth.forgotPassword')}
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? t('auth.processing') : isLogin ? t('auth.signInBtn') : t('auth.signUpBtn')}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t('auth.orContinueWith')}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                <span className="sr-only">{t('auth.signInGoogle')}</span>
                {t('auth.google')}
              </button>
            </div>
            <div>
              <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                <span className="sr-only">{t('auth.signInFacebook')}</span>
                {t('auth.facebook')}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer text-brand-600 hover:text-brand-700 font-medium text-sm"
          >
            {isLogin
              ? t('auth.noAccount')
              : t('auth.hasAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}
