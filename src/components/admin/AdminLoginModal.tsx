import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  User, 
  Key, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  Info,
  KeyRound,
  ArrowLeft,
  Clock,
  Copy,
  Check,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { SchoolLogo } from '../common/SchoolLogo';
import { AdminUser } from '../../types';
import { StorageService } from '../../services/storageService';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
  currentAdmin: AdminUser | null;
  onLogout: () => void;
  onOpenPanel: () => void;
}

type ModalView = 'login' | 'forgot_request' | 'reset_password' | 'reset_success';

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentAdmin,
  onLogout,
  onOpenPanel
}) => {
  const [view, setView] = useState<ModalView>('login');

  // Login form state
  const [email, setEmail] = useState('admin@smesa.sch.id');
  const [password, setPassword] = useState('smesa2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState<AdminUser[]>([]);

  // Forgot password & reset state
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [generatedTokenInfo, setGeneratedTokenInfo] = useState<{ token: string; expiresAt: number } | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const accounts = StorageService.getAdminAccounts();
      setAvailableAccounts(accounts);
      setErrorMsg('');
      setSuccessMsg('');
      setView('login');
      setGeneratedTokenInfo(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Masukkan alamat surel dan kata sandi administrator.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const authResult = StorageService.authenticate(email, password);
      setLoading(false);

      if (authResult.success && authResult.user) {
        StorageService.loginAdmin(authResult.user);
        onLoginSuccess(authResult.user);
      } else {
        setErrorMsg(authResult.message || 'Login gagal. Periksa kembali email dan kata sandi.');
      }
    }, 300);
  };

  const handleQuickSelect = (acc: AdminUser) => {
    setEmail(acc.email);
    setPassword(acc.password || '');
    setErrorMsg('');
  };

  const handleOpenForgotPassword = () => {
    setResetEmail(email || 'admin@smesa.sch.id');
    setErrorMsg('');
    setSuccessMsg('');
    setView('forgot_request');
  };

  // Step 1: Request password reset token
  const handleRequestToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setErrorMsg('Masukkan alamat email akun administrator yang terdaftar.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = StorageService.requestPasswordReset(resetEmail.trim());
      setLoading(false);

      if (res.success && res.token && res.expiresAt) {
        setGeneratedTokenInfo({ token: res.token, expiresAt: res.expiresAt });
        setResetToken(res.token); // Pre-fill token for administrator convenience
        setView('reset_password');
        setSuccessMsg('Token keamanan berhasil dibuat dan berlaku selama 15 menit.');
      } else {
        setErrorMsg(res.message);
      }
    }, 350);
  };

  // Copy token to clipboard helper
  const handleCopyToken = () => {
    if (generatedTokenInfo?.token) {
      navigator.clipboard.writeText(generatedTokenInfo.token);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  // Step 2: Verify token and apply new password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!resetToken.trim()) {
      setErrorMsg('Masukkan token keamanan sementara yang telah diterbitkan.');
      return;
    }

    if (!newPassword) {
      setErrorMsg('Masukkan kata sandi baru.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Kata sandi baru minimal 6 karakter demi keamanan akun sekolah.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok. Harap periksa kembali.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = StorageService.resetPasswordWithToken(resetEmail, resetToken, newPassword);
      setLoading(false);

      if (result.success) {
        // Refresh local admin accounts list
        setAvailableAccounts(StorageService.getAdminAccounts());
        // Set email and new password into login inputs
        setEmail(resetEmail);
        setPassword(newPassword);
        setView('reset_success');
      } else {
        setErrorMsg(result.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <SchoolLogo size="md" className="shrink-0" animateEntry={false} withHoverScale={true} />
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                Portal Kesiswaan SMESA
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                {view === 'login' && 'Login Administrator Kesiswaan'}
                {view === 'forgot_request' && 'Permintaan Reset Kata Sandi'}
                {view === 'reset_password' && 'Verifikasi Token & Buat Kata Sandi'}
                {view === 'reset_success' && 'Kata Sandi Berhasil Diperbarui'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VIEW 1: Current Admin Logged In */}
        {currentAdmin && view === 'login' && (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3">
              <img
                src={currentAdmin.avatar}
                alt={currentAdmin.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
              />
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  {currentAdmin.role}
                </span>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                  {currentAdmin.name}
                </h4>
                <p className="text-[11px] text-slate-500">{currentAdmin.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenPanel();
                }}
                className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Buka Panel Kontrol CMS</span>
              </button>

              <button
                onClick={onLogout}
                className="w-full py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                Keluar (Logout)
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: Standard Login Form */}
        {!currentAdmin && view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Masuk dengan akun <strong>Administrator</strong> atau <strong>Tim Kesiswaan</strong>. Kata sandi akun dibuat dan diatur langsung oleh Administrator sekolah.
            </p>

            {/* Email field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alamat Surel (Email Akun)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smesa.sch.id atau kesiswaan@smesa.sch.id"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 font-medium text-slate-900 bg-white"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Kata Sandi (Password)
                </label>
                <button
                  type="button"
                  onClick={handleOpenForgotPassword}
                  className="text-[11px] text-amber-700 hover:text-blue-950 hover:underline font-semibold cursor-pointer transition-colors"
                >
                  Lupa kata sandi?
                </button>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full pl-9 pr-10 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 font-medium text-slate-900 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Memverifikasi...' : 'Masuk ke Panel Administrator'}</span>
            </button>

            {/* Quick account helper card */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-900" />
                  <span>Pilih Akun Terdaftar (Klik untuk Isi Cepat):</span>
                </span>
                <span className="text-[10px] text-amber-700 font-semibold">Dikelola Admin</span>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {availableAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickSelect(acc)}
                    className={`w-full text-left p-2 rounded-lg border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      email.toLowerCase() === acc.email.toLowerCase()
                        ? 'border-blue-900 bg-blue-50/70 font-bold text-blue-950'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900">{acc.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {acc.role} · <span className="text-amber-800 font-semibold">{acc.email}</span> (PW: {acc.password})
                      </div>
                    </div>
                    {email.toLowerCase() === acc.email.toLowerCase() && (
                      <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] text-slate-500 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Admin dapat membuat akun baru (Tim Kesiswaan / Administrator) dan mengatur kata sandi langsung dari menu <strong>Panel CMS &gt; Manajemen Akun</strong>.
                </span>
              </div>
            </div>
          </form>
        )}

        {/* VIEW 3: Forgot Password Request Form */}
        {view === 'forgot_request' && (
          <form onSubmit={handleRequestToken} className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <KeyRound className="w-4 h-4 text-amber-700" />
                <span>Sistem Pemulihan Akun Kesiswaan SMESA</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Masukkan alamat email dinas resmi Administrator atau Tim Kesiswaan SMESA yang terdaftar. Sistem keamanan akan menerbitkan <strong>Token Keamanan Sementara (Valid 15 Menit)</strong> untuk verifikasi identitas Anda.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alamat Surel Terdaftar (Email Akun)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="admin@smesa.sch.id / kesiswaan@smesa.sch.id"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 font-medium text-slate-900 bg-white"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Memproses Token Keamanan...' : 'Terbitkan Token Reset Sementara'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setView('login');
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Login</span>
            </button>
          </form>
        )}

        {/* VIEW 4: Token Verification & New Password Creation */}
        {view === 'reset_password' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Generated Token Showcase Banner */}
            {generatedTokenInfo && (
              <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white p-4 rounded-xl shadow-inner border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Token Keamanan Sementara Diterbitkan</span>
                  </span>
                  <span className="text-[10px] text-slate-300 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>Berlaku 15 Menit</span>
                  </span>
                </div>

                <div className="flex items-center justify-between bg-black/40 px-3.5 py-2.5 rounded-lg border border-amber-400/40 font-mono">
                  <span className="text-base sm:text-lg font-extrabold tracking-widest text-amber-300">
                    {generatedTokenInfo.token}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyToken}
                    className="flex items-center gap-1 text-[11px] font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    {copiedToken ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-slate-300 leading-normal">
                  <span className="text-amber-300 font-semibold">*Protokol Keamanan:</span> Pada lingkungan produksi SMESA, token di atas terkirim otomatis ke surel dinas <strong>{resetEmail}</strong> dan SMS pimpinan.
                </p>
              </div>
            )}

            {/* Token input field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Token Keamanan Sementara
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value.toUpperCase())}
                  placeholder="Contoh: SMESA-XXXXXX"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 font-mono font-bold text-slate-900 bg-white tracking-wider"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-9 pr-10 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 font-medium text-slate-900 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full pl-9 pr-10 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 font-medium text-slate-900 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Memverifikasi Token...' : 'Verifikasi Token & Simpan Kata Sandi Baru'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setView('forgot_request');
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali / Minta Token Baru</span>
            </button>
          </form>
        )}

        {/* VIEW 5: Reset Password Success */}
        {view === 'reset_success' && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-extrabold text-slate-900">
                Kata Sandi Baru Berhasil Disimpan!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Token keamanan Anda telah diverifikasi dan digunakan. Kata sandi akun <strong>{resetEmail}</strong> telah diperbarui di sistem kesiswaan.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 text-left space-y-1">
              <div className="font-bold text-slate-900">Kredensial Baru Anda:</div>
              <div>Surel: <span className="font-mono text-blue-900 font-bold">{email}</span></div>
              <div>Kata Sandi: <span className="font-mono text-amber-700 font-bold">{password}</span></div>
            </div>

            <button
              onClick={() => {
                setView('login');
                setErrorMsg('');
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Masuk Sekarang ke Panel Admin</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
