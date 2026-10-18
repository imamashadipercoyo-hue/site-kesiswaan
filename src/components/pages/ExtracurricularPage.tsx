import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Clock, 
  MapPin, 
  User, 
  Trophy, 
  ArrowRight, 
  X, 
  CheckCircle,
  Users
} from 'lucide-react';
import { ExtracurricularItem, ExtraCategory } from '../../types';

interface ExtracurricularPageProps {
  extras: ExtracurricularItem[];
  selectedExtra: ExtracurricularItem | null;
  onSelectExtra: (extra: ExtracurricularItem | null) => void;
}

const CATEGORIES: ExtraCategory[] = [
  'Olahraga',
  'Seni dan Budaya',
  'Kepemimpinan dan Bela Negara',
  'Keagamaan',
  'Kemanusiaan dan Sosial',
  'Teknologi dan Keterampilan'
];

export const ExtracurricularPage: React.FC<ExtracurricularPageProps> = ({
  extras,
  selectedExtra,
  onSelectExtra
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredExtras = useMemo(() => {
    return extras.filter(item => {
      const matchSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [extras, searchQuery, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Pengembangan Bakat</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Ekstrakurikuler SMK Negeri 1 Jember
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            Eksplorasi ragam kegiatan ekstrakurikuler untuk membentuk jiwa kepemimpinan, sportivitas, daya kreasi seni, wawasan keagamaan, dan kompetensi teknologi digital.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama ekstrakurikuler, pembina, atau kegiatan..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-950 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Ekstrakurikuler ({extras.length})
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-950 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs text-slate-500">
          Menampilkan {filteredExtras.length} kegiatan ekstrakurikuler resmi terdaftar
        </div>

        {/* Extracurricular Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExtras.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectExtra(item)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded">
                  {item.category}
                </div>
                <div className="absolute top-3 right-3 bg-blue-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-400" />
                  <span>{item.memberCount} Siswa</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.schedule}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold pt-1">
                    <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">Pembina: {item.mentorName}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-amber-700 font-bold">
                    {item.achievements.length} Prestasi Utama
                  </span>
                  <span className="font-bold text-blue-950 group-hover:text-amber-600 flex items-center gap-1">
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extracurricular Detail Modal */}
      {selectedExtra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  {selectedExtra.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {selectedExtra.name}
                </h3>
                <p className="text-xs text-slate-500">SMK Negeri 1 Jember</p>
              </div>

              <button
                onClick={() => onSelectExtra(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden aspect-[16/10] border border-slate-200">
              <img src={selectedExtra.imageUrl} alt={selectedExtra.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900">Tujuan & Profil Kegiatan:</h4>
              <p>{selectedExtra.purpose}</p>
            </div>

            {/* Schedule & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">Jadwal Latihan:</span>
                <p className="font-bold text-slate-900">{selectedExtra.schedule}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">Lokasi Latihan:</span>
                <p className="font-bold text-slate-900">{selectedExtra.location}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">Pembina Ekstra:</span>
                <p className="font-bold text-slate-900">{selectedExtra.mentorName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">Informasi / Kontak:</span>
                <p className="font-bold text-slate-900">{selectedExtra.contactInfo || 'Sekretariat Kesiswaan'}</p>
              </div>
            </div>

            {/* Achievements */}
            {selectedExtra.achievements.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Pencapaian & Prestasi Terkini:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedExtra.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => onSelectExtra(null)}
                className="px-5 py-2.5 bg-blue-950 text-white rounded-lg text-xs font-bold hover:bg-slate-900 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
