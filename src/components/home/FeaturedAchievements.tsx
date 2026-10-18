import React from 'react';
import { Trophy, Award, ArrowRight, Medal, Star } from 'lucide-react';
import { AchievementItem } from '../../types';

interface FeaturedAchievementsProps {
  achievements: AchievementItem[];
  onSelectAchievement: (item: AchievementItem) => void;
  onExploreAll: () => void;
}

export const FeaturedAchievements: React.FC<FeaturedAchievementsProps> = ({
  achievements,
  onSelectAchievement,
  onExploreAll
}) => {
  const featuredList = achievements.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded">
              <Trophy className="w-3.5 h-3.5" />
              <span>Etalase Prestasi Siswa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              SMESA JUARA: Jejak Kebanggaan & Prestasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Dedikasi dan kerja keras putra-putri SMK Negeri 1 Jember di kancah kejuaraan kejuruan (LKS), akademik, seni, dan olahraga tingkat regional hingga nasional.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors shrink-0 group cursor-pointer"
          >
            <span>Seluruh Prestasi SMESA JUARA</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAchievement(item)}
              className="bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/60 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-200 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Level badge */}
                <div className="absolute top-3 left-3 bg-blue-950/90 border border-blue-800 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5">
                  <Medal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tingkat {item.level}</span>
                </div>

                {/* Year tag */}
                <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.year}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wide">
                    {item.award}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                    {item.competitionName}
                  </h3>

                  <div className="text-xs text-slate-300 font-medium">
                    <p className="line-clamp-1 font-semibold text-slate-100">
                      {item.students.join(', ')}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.gradeAndMajor}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/70 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Bidang: {item.category}
                  </span>
                  <span className="font-bold text-amber-400 group-hover:underline flex items-center gap-1">
                    <span>Lihat Dokumentasi</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
