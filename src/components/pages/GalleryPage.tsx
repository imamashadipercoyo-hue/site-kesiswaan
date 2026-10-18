import React, { useState, useMemo, useEffect } from 'react';
import { 
  Camera, 
  Video, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  User, 
  Maximize2,
  Plus,
  Edit3,
  Trash2,
  Lock,
  UserCheck,
  Check,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { GalleryItem, AdminUser } from '../../types';
import { StorageService } from '../../services/storageService';

interface GalleryPageProps {
  gallery: GalleryItem[];
  currentAdmin?: AdminUser | null;
  onOpenLoginModal?: () => void;
  onDataChanged?: () => void;
}

const CATEGORIES = [
  'Semua Dokumentasi',
  'Kegiatan Sekolah',
  'Upacara & Peringatan',
  'OSIS dan MPK',
  'Ekstrakurikuler',
  'Lomba dan Prestasi',
  'Kegiatan Sosial',
  'Pembinaan Karakter'
];

const PHOTO_PRESETS = [
  {
    label: 'Upacara Bendera',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    label: 'Praktikum Komputer/LKS',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    label: 'Aksi Sosial / PMR',
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop'
  },
  {
    label: 'Pentas Seni & Tari',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'
  },
  {
    label: 'Apel Pagi / Karakter',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop'
  },
  {
    label: 'Kompetisi Olahraga',
    url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop'
  }
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ 
  gallery,
  currentAdmin,
  onOpenLoginModal,
  onDataChanged
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua Dokumentasi');
  const [selectedYear, setSelectedYear] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);

  const adminName = currentAdmin ? currentAdmin.name : 'Staf Kesiswaan SMESA';

  const requireAuth = (callback: () => void) => {
    if (!currentAdmin) {
      if (onOpenLoginModal) onOpenLoginModal();
    } else {
      callback();
    }
  };

  const filteredItems = useMemo(() => {
    return gallery.filter(item => {
      const matchCat = selectedCategory === 'Semua Dokumentasi' || item.category === selectedCategory;
      const matchYear = selectedYear === 'all' || String(item.year) === selectedYear;
      return matchCat && matchYear;
    });
  }, [gallery, selectedCategory, selectedYear]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((idx) => (idx !== null && idx < filteredItems.length - 1 ? idx + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((idx) => (idx !== null && idx > 0 ? idx - 1 : filteredItems.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Handle Save Gallery Item
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title || !editingItem.url) return;

    StorageService.saveGalleryItem({
      id: editingItem.id,
      title: editingItem.title,
      description: editingItem.description || '',
      category: (editingItem.category as any) || 'Kegiatan Sekolah',
      type: editingItem.type || 'image',
      url: editingItem.url,
      date: editingItem.date || 'Oktober 2026',
      year: editingItem.year ? Number(editingItem.year) : 2026,
      photographer: editingItem.photographer || 'Dokumentasi Kesiswaan SMESA'
    }, adminName);

    setShowModal(false);
    setEditingItem(null);
    if (onDataChanged) onDataChanged();
  };

  const handleDeleteItem = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Hapus dokumentasi "${item.title}"?`)) {
      StorageService.deleteGalleryItem(item.id, adminName);
      if (onDataChanged) onDataChanged();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded">
              <Camera className="w-3.5 h-3.5" />
              <span>Dokumentasi Siswa</span>
            </div>

            {/* Quick Management Badge / Login Trigger */}
            {currentAdmin ? (
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-lg">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Login: {currentAdmin.name} ({currentAdmin.role})</span>
              </div>
            ) : (
              <button
                onClick={() => onOpenLoginModal && onOpenLoginModal()}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-400/30 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Login Pengelola untuk Edit & Tambah</span>
              </button>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Galeri Kegiatan Kesiswaan SMESA
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            Kumpulan potret momen upacara bendera, perlombaan, aksi kepedulian sosial, serta kreativitas budaya peserta didik SMK Negeri 1 Jember.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => requireAuth(() => {
                setEditingItem({
                  title: '',
                  description: '',
                  category: 'Kegiatan Sekolah',
                  type: 'image',
                  url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
                  date: 'Oktober 2026',
                  year: 2026,
                  photographer: 'Tim Dokumentasi Kesiswaan'
                });
                setShowModal(true);
              })}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Dokumentasi Baru</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs w-full sm:w-auto">
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

          {/* Year Filter & Quick Add Action */}
          <div className="w-full sm:w-auto flex items-center gap-2 justify-end">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
            >
              <option value="all">Semua Tahun</option>
              <option value="2026">Tahun 2026</option>
              <option value="2025">Tahun 2025</option>
            </select>

            <button
              onClick={() => requireAuth(() => {
                setEditingItem({
                  title: '',
                  description: '',
                  category: 'Kegiatan Sekolah',
                  type: 'image',
                  url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
                  date: 'Oktober 2026',
                  year: 2026,
                  photographer: 'Tim Dokumentasi Kesiswaan'
                });
                setShowModal(true);
              })}
              className="inline-flex items-center gap-1 text-xs font-bold bg-blue-950 text-amber-400 hover:bg-slate-900 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs text-slate-500 flex items-center justify-between">
          <span>Menampilkan {filteredItems.length} foto & video dokumentasi</span>
          {currentAdmin && (
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mode Pengelolaan Aktif: Anda dapat Mengedit dan Menambah Dokumentasi</span>
            </span>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-200 group flex flex-col relative"
            >
              {/* Media Container */}
              <div 
                onClick={() => setLightboxIndex(index)}
                className="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-xs text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded">
                  {item.category}
                </div>

                <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.year}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => setLightboxIndex(index)}
                    className="font-bold text-sm text-slate-900 group-hover:text-blue-900 transition-colors leading-snug cursor-pointer"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Metadata & Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        requireAuth(() => {
                          setEditingItem(item);
                          setShowModal(true);
                        });
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded transition-colors cursor-pointer"
                      title="Edit Dokumentasi"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={(e) => requireAuth(() => handleDeleteItem(item, e))}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      title="Hapus Dokumentasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Tutup Tampilan Penuh"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : filteredItems.length - 1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(lightboxIndex < filteredItems.length - 1 ? lightboxIndex + 1 : 0);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Foto Berikutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content display */}
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative max-h-[70vh] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src={currentLightboxItem.url}
                alt={currentLightboxItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="text-center text-white space-y-1 px-4 max-w-xl">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                {currentLightboxItem.category} · {currentLightboxItem.date}
              </span>
              <h3 className="text-base sm:text-lg font-bold">
                {currentLightboxItem.title}
              </h3>
              <p className="text-xs text-slate-300">
                {currentLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH / EDIT DOKUMENTASI GALERI */}
      {showModal && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-900" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingItem.id ? 'Edit Dokumentasi Galeri' : 'Tambah Foto / Video Dokumentasi'}
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Dokumentasi</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Contoh: Upacara Peringatan Hari Sumpah Pemuda di SMESA"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Kegiatan</label>
                  <select
                    value={editingItem.category || 'Kegiatan Sekolah'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium bg-white"
                  >
                    <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
                    <option value="Upacara & Peringatan">Upacara & Peringatan</option>
                    <option value="OSIS dan MPK">OSIS dan MPK</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                    <option value="Lomba dan Prestasi">Lomba dan Prestasi</option>
                    <option value="Kegiatan Sosial">Kegiatan Sosial</option>
                    <option value="Pembinaan Karakter">Pembinaan Karakter</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipe Media</label>
                  <select
                    value={editingItem.type || 'image'}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium bg-white"
                  >
                    <option value="image">Foto (Gambar)</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">URL Foto / Video Media</label>
                  <span className="text-[10px] text-slate-500">Pilih Preset Cepat di Bawah:</span>
                </div>
                <input
                  type="url"
                  required
                  value={editingItem.url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {PHOTO_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, url: preset.url })}
                      className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Kegiatan</label>
                  <input
                    type="text"
                    required
                    value={editingItem.date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="Contoh: 18 Oktober 2026"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Kegiatan</label>
                  <input
                    type="number"
                    required
                    value={editingItem.year || 2026}
                    onChange={(e) => setEditingItem({ ...editingItem, year: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fotografer / Dokumentator</label>
                <input
                  type="text"
                  value={editingItem.photographer || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, photographer: e.target.value })}
                  placeholder="Contoh: Tim Dokumentasi Kesiswaan / Jurnalistik"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Keterangan / Deskripsi Kegiatan</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Ceritakan momen penting yang diabadikan dalam dokumentasi ini..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Simpan Dokumentasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
