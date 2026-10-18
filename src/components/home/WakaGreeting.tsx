import React from 'react';
import { Quote, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { SchoolProfileData } from '../../types';

interface WakaGreetingProps {
  profile: SchoolProfileData;
  onExploreProfile: () => void;
}

export const WakaGreeting: React.FC<WakaGreetingProps> = ({ profile, onExploreProfile }) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Photo & Identity Badge */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              {/* Background accent block */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-900 to-amber-500 rounded-2xl transform rotate-2 opacity-25 filter blur-xs" />
              
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={profile.wakaPhoto}
                  alt={profile.wakaName}
                  className="w-full h-88 sm:h-96 object-cover object-top"
                />
                
                {/* Gradient overlay at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pimpinan Kesiswaan SMESA</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                    {profile.wakaName}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {profile.wakaTitle}
                  </p>
                </div>
              </div>

              {/* Official Seal badge */}
              <div className="absolute -bottom-4 right-4 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-800">Masa Bakti Aktif</span>
              </div>
            </div>
          </div>

          {/* Sambutan & Pesan Pembinaan */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-900">
                Sambutan Resmi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Membangun Generasi Disiplin, Tangguh, dan Berkarakter Juara
              </h2>
            </div>

            <div className="relative">
              <Quote className="absolute -top-3 -left-3 w-10 h-10 text-amber-400/20 pointer-events-none" />
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 pl-3 border-l-2 border-amber-500/80">
                <p>
                  {profile.wakaGreeting}
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Disiplin dan Keteladanan</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Pembiasaan tata tertib dan etika santun 5S dalam keseharian.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Prestasi dan Minat Bakat</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Pendampingan kompetisi akademik, teknologi, seni, dan olahraga.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreProfile}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-950 hover:text-amber-600 uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <span>Pelajari Visi, Misi & Struktur Kesiswaan</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
