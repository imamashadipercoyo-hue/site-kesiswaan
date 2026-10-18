import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  Calendar, 
  Users, 
  Filter, 
  Search, 
  X, 
  Sparkles, 
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { AchievementItem, AchievementCategory, AchievementLevel } from '../../types';

interface AchievementsPageProps {
  achievements: AchievementItem[];
  selectedAchievement: AchievementItem | null;
  onSelectAchievement: (item: AchievementItem | null) => void;
}

const CATEGORIES: AchievementCategory[] = [
  'Akademik',
  'Olahraga',
  'Seni dan Budaya',
  'Kompetensi Keahlian',
  'Teknologi dan Inovasi',
  'Kewirausahaan',
  'Organisasi & Kepemimpinan'
];

const LEVELS: AchievementLevel[] = [
  'Internasional',
  'Nasional',
  'Provinsi',
  'Kabupaten/Kota'
];

export const AchievementsPage: React.FC<AchievementsPageProps> = ({
  achievements,
  selectedAchievement,
  onSelectAchievement
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Filtered achievements
  const filtered = useMemo(() => {
    return achievements.filter(item => {
      const matchSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.competitionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.students.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.gradeAndMajor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || item.level === selectedLevel;
      const matchYear = selectedYear === 'all' || String(item.year) === selectedYear;

      return matchSearch && matchCat && matchLevel && matchYear;
    });
  }, [achievements, searchQuery, selectedCategory, selectedLevel, selectedYear]);

  // Statistics calculation from verified data
  const stats = useMemo(() => {
    const total = achievements.length;
    const nasional = achievements.filter(a => a.level === 'Nasional').length;
    const provinsi = achievements.filter(a => a.level === 'Provinsi').length;
    const kabupaten = achievements.filter(a => a.level === 'Kabupaten/Kota').length;
    return { total, nasional, provinsi, kabupaten };
  }, [achievements]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Banner SMESA JUARA */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-14 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded">
            <Trophy className="w-3.5 h-3.5" />
            <span>Etalase Kebanggaan Siswa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            SMESA JUARA: <span className="text-amber-400">Prestasi Peserta Didik</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            Dokumentasi rekam jejak juara siswa-siswi SMK Negeri 1 Jember yang telah diverifikasi secara resmi dalam berbagai kejuaraan kejuruan (LKS), akademik, olahraga, seni budaya, dan teknologi.
          </p>

          {/* Statistics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl">
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{stats.total}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Total Prestasi Terverifikasi</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.nasional}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Tingkat Nasional</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{stats.provinsi}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Tingkat Provinsi Jatim</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.kabupaten}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Tingkat Kabupaten/Kota</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama kompetisi, siswa, atau jurusan..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
              />
            </div>

            {/* Level Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
              >
                <option value="all">Semua Tingkat</option>
                {LEVELS.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
              >
                <option value="all">Semua Tahun</option>
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
            </div>
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
              Semua Bidang
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

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filtered.length} prestasi terverifikasi</span>
          {(searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedYear !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSelectedYear('all');
              }}
              className="text-blue-900 font-semibold hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectAchievement(item)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Level badge */}
                <div className="absolute top-3 left-3 bg-blue-950/90 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5">
                  <Medal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tingkat {item.level}</span>
                </div>

                <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.year}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wide">
                    {item.award}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2">
                    {item.competitionName}
                  </h3>

                  <div className="text-xs text-slate-700 font-medium">
                    <p className="line-clamp-1 font-bold text-slate-900">
                      {item.students.join(', ')}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.gradeAndMajor}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    Bidang: {item.category}
                  </span>
                  <span className="font-bold text-blue-950 group-hover:text-amber-600 flex items-center gap-1">
                    <span>Lihat Bukti</span>
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Achievement Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-700 uppercase">
                    Tingkat {selectedAchievement.level} · {selectedAchievement.year}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  {selectedAchievement.award}
                </h3>
                <p className="text-xs text-slate-500">{selectedAchievement.competitionName}</p>
              </div>

              <button
                onClick={() => onSelectAchievement(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden aspect-[16/10] border border-slate-200">
              <img
                src={selectedAchievement.imageUrl}
                alt={selectedAchievement.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Student & Mentor Data */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Siswa Peraih Juara:</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">
                  {selectedAchievement.students.join(', ')}
                </p>
                <p className="text-[11px] text-slate-500">{selectedAchievement.gradeAndMajor}</p>
              </div>

              {selectedAchievement.mentors && selectedAchievement.mentors.length > 0 && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-medium">Guru Pembina / Pendamping:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {selectedAchievement.mentors.join(', ')}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900">Ulasan Pencapaian:</h4>
              <p>{selectedAchievement.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Terverifikasi Tim Kesiswaan SMESA</span>
              </div>

              <button
                onClick={() => onSelectAchievement(null)}
                className="px-4 py-2 bg-blue-950 text-white rounded-lg font-bold hover:bg-slate-900 cursor-pointer"
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
