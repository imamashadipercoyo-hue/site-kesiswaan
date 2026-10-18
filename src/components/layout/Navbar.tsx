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
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* School Branding */}
            <button
              onClick={() => handleLinkClick('beranda')}
              className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none group cursor-pointer"
            >
              <SchoolLogo size="lg" className="shrink-0" animateEntry={true} withHoverScale={true} />
              <div className="animate-fadeInDown transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                    KESISWAAN SMESA
                  </span>
                  <span className="hidden sm:inline-block text-[9px] md:text-[10px] font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded transition-transform group-hover:scale-105">
                    OFFICIAL
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-600">SMK NEGERI 1 JEMBER</p>
                <p className="text-[9px] sm:text-[10px] tracking-wide text-amber-600 font-medium mt-0.5">
                  Disiplin · Berkarakter · Berprestasi
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1 text-sm font-medium text-slate-700">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3 py-2 text-xs 2xl:text-sm font-semibold rounded-md transition-all cursor-pointer relative ${
                      isActive
                        ? 'text-blue-950 font-bold'
                        : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2.5">
              <button
                onClick={() => handleLinkClick('agenda')}
                className="inline-flex items-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg border border-amber-500/40 shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Jelajahi Kegiatan</span>
              </button>

              <button
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 transition-colors cursor-pointer shadow-2xs"
                title="Login Administrator Kesiswaan"
              >
                {currentAdmin ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Panel Admin</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Login Administrator</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Hamburger & Quick Login Button */}
            <div className="flex items-center gap-1.5 xl:hidden">
              <button
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-2 rounded-md border border-slate-300"
                title="Login Administrator"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Admin</span>
              </button>
              <button
                onClick={() => handleLinkClick('agenda')}
                className="sm:inline-flex hidden items-center gap-1.5 bg-blue-950 text-amber-400 text-xs font-bold px-3 py-2 rounded-md"
              >
                <span>Kegiatan</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Buka Menu Navigasi"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
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
