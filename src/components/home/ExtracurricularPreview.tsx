import React from 'react';
import { Sparkles, Users, ArrowRight, Clock, MapPin } from 'lucide-react';
import { ExtracurricularItem } from '../../types';

interface ExtracurricularPreviewProps {
  extras: ExtracurricularItem[];
  onSelectExtra: (extra: ExtracurricularItem) => void;
  onExploreAll: () => void;
}

export const ExtracurricularPreview: React.FC<ExtracurricularPreviewProps> = ({
  extras,
  onSelectExtra,
  onExploreAll
}) => {
  const previewList = extras.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Pengembangan Minat & Bakat
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ekstrakurikuler Pilihan SMESA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Tersedia 22 cabang ekstrakurikuler resmi untuk mengasah kedisiplinan, jiwa kepemimpinan, kreativitas seni, dan kebugaran olahraga siswa.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-950 hover:text-amber-600 transition-colors shrink-0 group cursor-pointer"
          >
            <span>Katalog Lengkap (22 Ekstrakurikuler)</span>
            <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewList.map((extra) => (
            <div
              key={extra.id}
              onClick={() => onSelectExtra(extra)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src={extra.imageUrl}
                  alt={extra.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded">
                  {extra.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {extra.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {extra.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{extra.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-semibold text-slate-700">Pembina: {extra.mentorName.split(',')[0]}</span>
                    <span className="font-bold text-blue-950 group-hover:text-amber-600 flex items-center gap-1">
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
