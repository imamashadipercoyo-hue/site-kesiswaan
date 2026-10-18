import React from 'react';
import { ArrowRight, PhoneCall, Award, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onNavigate: (tab: string) => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onNavigate }) => {
  return (
    <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white py-14 sm:py-16 relative overflow-hidden">
      {/* Decorative accent lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kolaborasi Warga Sekolah</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bersama Membangun SMESA yang Aktif, Positif, dan Berprestasi.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Dukungan kolaboratif antara sekolah, orang tua, komite, alumni, dan dunia usaha/industri menjadi pilar kemajuan generasi emas SMK Negeri 1 Jember.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('profil')}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Lihat Program Kesiswaan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('kontak')}
              className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-800 text-white hover:text-amber-300 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg border border-slate-700 transition-all duration-200 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Hubungi Sekolah</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
