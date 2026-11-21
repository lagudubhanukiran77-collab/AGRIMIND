import React, { useState } from 'react';
import { useNavigate, useSearchParams, NavLink } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck, Phone, Lock, User, MapPin, Globe, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';
import { LanguageSelector } from '../components/common/LanguageSelector';

export const Login = () => {
  const { login, register } = useAuth();
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login');

  // Form states - clean without mock presets
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerData, setRegisterData] = useState({
    name: '',
    mobile: '',
    location: '',
    farmSize: '5.0',
    currentCrop: 'Paddy',
    preferredLanguage: language,
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(loginMobile, loginPassword);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await register(registerData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite flex flex-col justify-between font-sans">
      {/* Top minimal header */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:px-8 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-forest-900 text-white flex items-center justify-center">
            <Leaf className="w-4 h-4 text-forest-300" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-forest-900 font-sans">
            AGRI<span className="text-forest-500 font-bold">-MIND</span>
          </span>
        </NavLink>

        <LanguageSelector variant="dropdown" />
      </div>

      {/* Main Box */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 mx-auto rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-900 mb-3">
              <Leaf className="w-6 h-6 text-forest-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-charcoal">
              {mode === 'login' ? t('auth.loginTitle') : t('auth.registerTitle')}
            </h2>
            <p className="text-xs text-mutedgrey">
              {mode === 'login' ? t('auth.loginSubtitle') : t('auth.registerSubtitle')}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 rounded-lg transition-all text-center ${
                mode === 'login' ? 'bg-white text-forest-900 shadow-sm' : 'text-slate-600 hover:text-charcoal'
              }`}
            >
              {t('nav.login')}
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2 rounded-lg transition-all text-center ${
                mode === 'register' ? 'bg-white text-forest-900 shadow-sm' : 'text-slate-600 hover:text-charcoal'
              }`}
            >
              {t('nav.register')}
            </button>
          </div>

          {/* Error notice */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-mutedgrey font-medium mb-1.5">
                  {t('auth.mobileNumber')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    maxLength={10}
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-mutedgrey font-medium mb-1.5">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-card flex items-center justify-center gap-2 transition-all"
              >
                {loading ? 'Signing in...' : t('auth.submitLogin')}
                <ArrowRight className="w-4 h-4 text-forest-300" />
              </button>
            </form>
          )}

          {/* REGISTRATION FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-mutedgrey font-medium mb-1">
                  {t('auth.farmerName')} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-mutedgrey font-medium mb-1">
                  {t('auth.mobileNumber')} *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    maxLength={10}
                    value={registerData.mobile}
                    onChange={(e) => setRegisterData({ ...registerData, mobile: e.target.value })}
                    placeholder="10-digit Indian Mobile Number"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-mutedgrey font-medium mb-1">
                  {t('auth.location')} (District / State) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={registerData.location}
                    onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                    placeholder="e.g. Guntur, Andhra Pradesh or Khammam, Telangana"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">
                    Farm Size (Acres) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={registerData.farmSize}
                    onChange={(e) => setRegisterData({ ...registerData, farmSize: e.target.value })}
                    placeholder="e.g. 5.0"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-mutedgrey font-medium mb-1">
                    Current Crop *
                  </label>
                  <select
                    value={registerData.currentCrop}
                    onChange={(e) => setRegisterData({ ...registerData, currentCrop: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-charcoal bg-white focus:ring-1 focus:ring-forest-900"
                  >
                    <option value="Paddy">Paddy (Rice)</option>
                    <option value="Chilli">Chilli (Mirchi)</option>
                    <option value="Cotton">Cotton (Kapas)</option>
                    <option value="Paddy & Chilli">Paddy & Chilli</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-mutedgrey font-medium mb-1">
                  {t('auth.preferredLanguage')}
                </label>
                <select
                  value={registerData.preferredLanguage}
                  onChange={(e) => setRegisterData({ ...registerData, preferredLanguage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-charcoal bg-white focus:ring-1 focus:ring-forest-900"
                >
                  <option value="en">English</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">
                    {t('auth.password')} *
                  </label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">
                    {t('auth.confirmPassword')} *
                  </label>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-card flex items-center justify-center gap-2 transition-all mt-2"
              >
                {loading ? 'Creating farm account...' : t('auth.submitRegister')}
                <ArrowRight className="w-4 h-4 text-forest-300" />
              </button>
            </form>
          )}

          {/* Security & Data Encryption */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-mutedgrey flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
            <span>
              {t('auth.authNotice')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="p-4 text-center text-xs text-mutedgrey">
        AGRI-MIND Decision Support System · Andhra Pradesh & Telangana
      </div>
    </div>
  );
};
