import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { NewsItem } from '../../types';

interface LatestNewsSectionProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  onExploreAll: () => void;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({
  news,
  onSelectNews,
  onExploreAll
}) => {
  const publishedNews = news.filter(n => n.status === 'published').slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Kabar & Warta Sekolah
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Berita & Pengumuman Terbaru
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Liputan aktual kegiatan siswa, agenda organisasi, prestasi, dan pengumuman resmi kesiswaan SMK Negeri 1 Jember.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-950 hover:text-amber-600 transition-colors shrink-0 group cursor-pointer"
          >
            <span>Lihat Semua Berita</span>
            <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedNews.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col group cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Clean, unboxed category indicator in top-left banner */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded">
                  {item.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Clean unboxed metadata with dot separators (Zero-Pill discipline) */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date}</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                {/* Footer read button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[140px]">{item.author}</span>
                  </span>

                  <span className="font-bold text-blue-950 group-hover:text-amber-600 inline-flex items-center gap-1 transition-colors">
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
