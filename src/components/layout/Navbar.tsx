import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Compass, 
  Lock, 
  MapPin, 
  Phone, 
  Bell, 
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { SchoolLogo } from '../common/SchoolLogo';
import { AdminUser } from '../../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenAdminModal: () => void;
  currentAdmin: AdminUser | null;
  runningAnnouncement?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAdminModal,
  currentAdmin,
  runningAnnouncement
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil Kesiswaan' },
    { id: 'berita', label: 'Berita & Pengumuman' },
    { id: 'agenda', label: 'Agenda Kegiatan' },
    { id: 'prestasi', label: 'Prestasi Siswa' },
    { id: 'osis-mpk', label: 'OSIS & MPK' },
    { id: 'ekstra', label: 'Ekstrakurikuler' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'kontak', label: 'Kontak' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm transition-all duration-200">
      {/* Top Bar: Contact, Address, Announcement ticker */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-1.5">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">SMKN 1 Jember · </span>Jl. Jambu No. 17, Patrang, Jember
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              (0331) 486110
            </span>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 text-[11px]">
            {runningAnnouncement && (
              <div className="flex items-center gap-1.5 text-amber-300 font-medium truncate max-w-[280px] sm:max-w-md">
                <Bell className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
                <span className="truncate">{runningAnnouncement}</span>
              </div>
            )}
            
            <button
              onClick={onOpenAdminModal}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 font-medium transition-colors cursor-pointer ml-auto md:ml-2"
              title="Akses Staf Kesiswaan & Administrator"
            >
              {currentAdmin ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate max-w-[110px]">{currentAdmin.name.split(' ')[0]} ({currentAdmin.role.split(' ')[0]})</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Login Administrator</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-[84px] gap-2 sm:gap-4 lg:gap-6">
            {/* School Branding */}
            <button
              onClick={() => handleLinkClick('beranda')}
              className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group cursor-pointer shrink min-w-0"
              aria-label="Kembali ke Beranda Portal Kesiswaan SMESA"
            >
              <SchoolLogo size="lg" className="shrink-0" animateEntry={true} withHoverScale={true} />
              <div className="animate-fadeInDown transition-transform duration-300 ease-out group-hover:translate-x-0.5 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="text-sm sm:text-base md:text-lg xl:text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors truncate">
                    KESISWAAN SMESA
                  </span>
                  <span className="inline-flex items-center text-[8.5px] sm:text-[9.5px] font-black tracking-wider text-amber-800 bg-gradient-to-r from-amber-400/25 to-amber-500/20 border border-amber-400/40 px-1.5 py-0.5 rounded-sm shadow-2xs transition-transform group-hover:scale-105">
                    OFFICIAL
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-600 truncate">SMK NEGERI 1 JEMBER</p>
                <p className="hidden xs:flex items-center gap-1 text-[8.5px] sm:text-[10px] tracking-wide text-amber-600 font-medium mt-0.5 truncate">
                  <span>Disiplin</span>
                  <span className="text-amber-400">·</span>
                  <span>Berkarakter</span>
                  <span className="text-amber-400">·</span>
                  <span>Berprestasi</span>
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 text-xs xl:text-sm font-semibold text-slate-700">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-2.5 xl:px-3 py-2 rounded-lg transition-all cursor-pointer relative ${
                      isActive
                        ? 'text-blue-950 font-extrabold bg-blue-50/70 shadow-2xs'
                        : 'text-slate-600 hover:text-blue-950 hover:bg-slate-100/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-2.5 right-2.5 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-full shadow-[0_1px_4px_rgba(245,158,11,0.5)]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
              <button
                onClick={() => handleLinkClick('agenda')}
                className="inline-flex items-center gap-1.5 xl:gap-2 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 hover:from-slate-900 hover:to-blue-950 text-amber-400 hover:text-amber-300 font-extrabold text-[11px] xl:text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg border border-amber-500/40 shadow-xs hover:shadow-md hover:shadow-amber-500/15 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Compass className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400 animate-pulse" />
                <span>Jelajahi Kegiatan</span>
              </button>

              <button
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-[11px] xl:text-xs px-3 py-2.5 rounded-lg border border-slate-300/90 hover:border-slate-400 transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Login Administrator Kesiswaan"
              >
                {currentAdmin ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Panel Admin</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Login Admin</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Hamburger & Quick Controls (HP & Tablet) */}
            <div className="flex items-center gap-1.5 lg:hidden shrink-0">
              <button
                onClick={() => handleLinkClick('agenda')}
                className="sm:inline-flex hidden items-center gap-1 bg-gradient-to-r from-blue-950 to-slate-900 text-amber-400 text-xs font-bold px-3 py-2 rounded-lg border border-amber-500/30 shadow-2xs active:scale-95"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Kegiatan</span>
              </button>

              <button
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-2.5 py-2 rounded-lg border border-slate-300 shadow-2xs active:scale-95 transition-colors"
                title="Login Administrator"
              >
                {currentAdmin ? (
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span className="hidden sm:inline">Admin</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-lg text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 focus:outline-none transition-colors active:scale-95 cursor-pointer"
                aria-label="Buka Menu Navigasi"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <SchoolLogo size="md" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-slate-900">KESISWAAN SMESA</span>
                  <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1 py-0.5 rounded">OFFICIAL</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">SMK Negeri 1 Jember</p>
              </div>
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 bg-amber-50 px-2 py-1 rounded">
              Navigasi
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-blue-950 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('agenda')}
              className="w-full flex items-center justify-center gap-2 bg-blue-950 text-amber-400 font-bold text-sm py-2.5 rounded-lg"
            >
              <Compass className="w-4 h-4" />
              <span>Jelajahi Kegiatan Siswa</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              <ShieldCheck className="w-4 h-4 text-blue-900" />
              <span>Panel CMS Staf Kesiswaan</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
