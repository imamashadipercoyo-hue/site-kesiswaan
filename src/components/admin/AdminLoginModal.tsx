import React, { useState } from 'react';
import { Lock, User, Key, X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { AdminUser } from '../../types';
import { DEFAULT_ADMINS, StorageService } from '../../services/storageService';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
  currentAdmin: AdminUser | null;
  onLogout: () => void;
  onOpenPanel: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentAdmin,
  onLogout,
  onOpenPanel
}) => {
  const [selectedUser, setSelectedUser] = useState<AdminUser>(DEFAULT_ADMINS[0]);
  const [password, setPassword] = useState('smesa2026');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('Masukkan kata sandi administrator.');
      return;
    }
    // Simple demo password verification
    StorageService.loginAdmin(selectedUser);
    onLoginSuccess(selectedUser);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                Autentikasi Staf Kesiswaan
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                Panel CMS Kesiswaan SMESA
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Already Logged In */}
        {currentAdmin ? (
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
                onClick={() => {
                  onLogout();
                }}
                className="w-full py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                Keluar (Logout)
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Pilih akun staf kesiswaan di bawah ini untuk menguji hak akses (Role-Based Access Control):
            </p>

            {/* Quick user selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Pilih Akun Demonstrasi:</label>
              <div className="space-y-1.5">
                {DEFAULT_ADMINS.map(adm => (
                  <button
                    key={adm.id}
                    type="button"
                    onClick={() => setSelectedUser(adm)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      selectedUser.id === adm.id
                        ? 'border-blue-900 bg-blue-50/50 font-bold text-blue-950'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{adm.name}</div>
                      <div className="text-[11px] text-slate-500">{adm.role} · {adm.email}</div>
                    </div>
                    {selectedUser.id === adm.id && (
                      <CheckCircle2 className="w-4 h-4 text-blue-900" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kata Sandi (Demo: smesa2026)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Masuk Sebagai {selectedUser.role}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
