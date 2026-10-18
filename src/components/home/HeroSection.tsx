import React from 'react';
import { 
  ArrowRight, 
  Trophy, 
  Users, 
  Calendar, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onExploreAgenda: () => void;
  onExploreAchievements: () => void;
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreAgenda,
  onExploreAchievements,
  onNavigate
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* Subtle architectural background pattern */}
      <div 
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
      />

      {/* Decorative gradient glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Portal Resmi Kesiswaan · SMK Negeri 1 Jember</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Wadah Tumbuh, <span className="text-amber-400">Berkarya,</span> dan Berprestasi.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Selamat datang di Portal Kesiswaan SMK Negeri 1 Jember. Temukan informasi kegiatan siswa, program pembinaan karakter, prestasi, organisasi, dan ekstrakurikuler untuk membangun generasi yang disiplin, kreatif, bertanggung jawab, dan berdaya saing.
            </p>

            {/* Core Values Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Disiplin Humanis</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Karakter Pelajar Pancasila</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Tradisi Juara Terverifikasi</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onExploreAgenda}
                className="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-lg shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <span>Lihat Kegiatan</span>
                <Calendar className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreAchievements}
                className="inline-flex items-center gap-2.5 bg-slate-800/80 hover:bg-slate-800 text-white hover:text-amber-300 font-bold text-sm px-6 py-3.5 rounded-lg border border-slate-700 shadow transition-all duration-200 cursor-pointer"
              >
                <span>Jelajahi Prestasi</span>
                <Trophy className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => onNavigate('profil')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-3 transition-colors cursor-pointer"
              >
                <span>Profil Kesiswaan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop"
                  alt="Peserta Didik SMK Negeri 1 Jember Berprestasi"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Bottom caption banner */}
                <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-amber-400">
                    SMK Negeri 1 Jember
                  </div>
                  <h3 className="text-white font-bold text-sm sm:text-base leading-snug">
                    Mencetak Lulusan Unggul, Berbudi Pekerti Luhur, dan Siap Bersaing Global
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Jalan Jambu No. 17, Patrang, Kabupaten Jember
                  </p>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-900/95 border border-amber-500/40 backdrop-blur-md rounded-xl p-3.5 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Status Pembinaan</p>
                  <p className="text-xs font-bold text-white">Sekolah Ramah Anak Terverifikasi</p>
                </div>
              </div>

              {/* Floating champions badge */}
              <div className="absolute -top-4 -right-3 sm:-right-4 bg-blue-950/95 border border-blue-800 backdrop-blur-md rounded-xl p-3 shadow-xl flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">SMESA JUARA</p>
                  <p className="text-xs font-bold text-white">LKS & FLS2N Jawa Timur</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span>2.400+</span>
            </div>
            <p className="text-xs font-medium text-slate-400">Peserta Didik Aktif SMESA</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight flex items-center gap-1.5">
              <span>22</span>
            </div>
            <p className="text-xs font-medium text-slate-400">Ekstrakurikuler Pilihan</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span>48+</span>
            </div>
            <p className="text-xs font-medium text-slate-400">Prestasi Terverifikasi (2026)</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight flex items-center gap-1.5">
              <span>100%</span>
            </div>
            <p className="text-xs font-medium text-slate-400">Pembinaan Karakter 5S & Disiplin</p>
          </div>
        </div>
      </div>
    </section>
  );
};
