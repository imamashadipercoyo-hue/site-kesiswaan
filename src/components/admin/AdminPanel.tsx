import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Trophy, 
  Sparkles, 
  Camera, 
  MessageSquare, 
  Mail, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  RefreshCw,
  Archive,
  History,
  UserCheck
} from 'lucide-react';
import { 
  AdminUser, 
  NewsItem, 
  AgendaItem, 
  AchievementItem, 
  ExtracurricularItem, 
  GalleryItem, 
  StudentAspiration, 
  ContactMessage, 
  SchoolProfileData,
  AuditLog
} from '../../types';
import { StorageService, DEFAULT_ADMINS } from '../../services/storageService';

interface AdminPanelProps {
  currentAdmin: AdminUser;
  onLogout: () => void;
  onClosePanel: () => void;
  onDataChanged: () => void;
  profile: SchoolProfileData;
  news: NewsItem[];
  agenda: AgendaItem[];
  achievements: AchievementItem[];
  extras: ExtracurricularItem[];
  gallery: GalleryItem[];
  aspirations: StudentAspiration[];
  contacts: ContactMessage[];
}

type AdminTab = 
  | 'dashboard'
  | 'berita'
  | 'agenda'
  | 'prestasi'
  | 'ekstra'
  | 'galeri'
  | 'aspirasi'
  | 'kontak'
  | 'profil'
  | 'audit';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentAdmin,
  onLogout,
  onClosePanel,
  onDataChanged,
  profile,
  news,
  agenda,
  achievements,
  extras,
  gallery,
  aspirations,
  contacts
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Profile Form States
  const [wakaGreeting, setWakaGreeting] = useState(profile.wakaGreeting);
  const [runningAnnouncement, setRunningAnnouncement] = useState(profile.runningAnnouncement);

  // News Modal / Form States
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);
  const [showNewsModal, setShowNewsModal] = useState(false);

  // Agenda Modal / Form States
  const [editingAgenda, setEditingAgenda] = useState<Partial<AgendaItem> | null>(null);
  const [showAgendaModal, setShowAgendaModal] = useState(false);

  // Achievement Modal / Form States
  const [editingAchievement, setEditingAchievement] = useState<Partial<AchievementItem> | null>(null);
  const [showAchievementModal, setShowAchievementModal] = useState(false);

  // Aspiration response modal
  const [moderatingAsp, setModeratingAsp] = useState<StudentAspiration | null>(null);
  const [aspResponseText, setAspResponseText] = useState('');

  const isSuperAdmin = currentAdmin.role === 'Super Admin';
  const isEditor = currentAdmin.role === 'Editor Kesiswaan' || isSuperAdmin;

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // Profile save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Hanya Super Admin yang diizinkan memperbarui profil kesiswaan.');
      return;
    }
    StorageService.updateProfile({
      wakaGreeting,
      runningAnnouncement
    }, currentAdmin.name);
    onDataChanged();
    showFeedback('Pengaturan profil dan pengumuman kesiswaan berhasil diperbarui.');
  };

  // News Save
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews?.title || !editingNews?.content) return;

    StorageService.saveNewsItem({
      title: editingNews.title,
      slug: editingNews.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: editingNews.excerpt || editingNews.content.slice(0, 140) + '...',
      content: editingNews.content,
      category: editingNews.category || 'Kegiatan Sekolah',
      author: editingNews.author || currentAdmin.name,
      authorRole: currentAdmin.role,
      date: editingNews.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: editingNews.readTime || '3 menit baca',
      imageUrl: editingNews.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
      status: editingNews.status || (isEditor ? 'published' : 'pending'),
      tags: editingNews.tags || ['SMESA', 'Kesiswaan'],
      id: editingNews.id
    }, currentAdmin.name);

    setShowNewsModal(false);
    setEditingNews(null);
    onDataChanged();
    showFeedback('Data berita/pengumuman berhasil disimpan.');
  };

  // Agenda Save
  const handleSaveAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgenda?.title || !editingAgenda?.startDate) return;

    StorageService.saveAgendaItem({
      title: editingAgenda.title,
      category: editingAgenda.category || 'Upacara & Peringatan',
      startDate: editingAgenda.startDate,
      endDate: editingAgenda.endDate || editingAgenda.startDate,
      time: editingAgenda.time || '07.00 - 10.00 WIB',
      location: editingAgenda.location || 'Lapangan Utama SMESA',
      organizer: editingAgenda.organizer || 'Bidang Kesiswaan',
      description: editingAgenda.description || '',
      status: editingAgenda.status || 'akan_datang',
      targetAudience: editingAgenda.targetAudience || 'Seluruh Siswa SMESA',
      posterUrl: editingAgenda.posterUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
      id: editingAgenda.id
    }, currentAdmin.name);

    setShowAgendaModal(false);
    setEditingAgenda(null);
    onDataChanged();
    showFeedback('Data agenda kegiatan berhasil disimpan.');
  };

  // Achievement Save
  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement?.competitionName || !editingAchievement?.award) return;

    StorageService.saveAchievementItem({
      title: editingAchievement.title || `${editingAchievement.award} - ${editingAchievement.competitionName}`,
      competitionName: editingAchievement.competitionName,
      award: editingAchievement.award,
      category: editingAchievement.category || 'Kompetensi Keahlian',
      level: editingAchievement.level || 'Provinsi',
      year: editingAchievement.year || 2026,
      date: editingAchievement.date || 'Oktober 2026',
      students: Array.isArray(editingAchievement.students) ? editingAchievement.students : [editingAchievement.students as any || 'Peserta Didik SMESA'],
      gradeAndMajor: editingAchievement.gradeAndMajor || 'Kelas XII SMKN 1 Jember',
      description: editingAchievement.description || '',
      imageUrl: editingAchievement.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
      id: editingAchievement.id
    }, currentAdmin.name);

    setShowAchievementModal(false);
    setEditingAchievement(null);
    onDataChanged();
    showFeedback('Data prestasi siswa SMESA JUARA berhasil disimpan.');
  };

  const handleModerate = (status: StudentAspiration['status']) => {
    if (!moderatingAsp) return;
    StorageService.moderateAspiration(moderatingAsp.id, status, aspResponseText.trim() || undefined, currentAdmin.name);
    setModeratingAsp(null);
    setAspResponseText('');
    onDataChanged();
    showFeedback(`Status aspirasi berhasil diubah ke "${status}".`);
  };

  const pendingAspirationsCount = aspirations.filter(a => a.status === 'menunggu_review').length;
  const unreadMessagesCount = contacts.filter(c => !c.isRead).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center font-black">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
              <span>CMS KESISWAAN SMESA</span>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded">
                {currentAdmin.role}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">SMK Negeri 1 Jember · Panel Pengelolaan Konten</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClosePanel}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Website Publik</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/40 px-3 py-1.5 rounded-lg border border-red-800/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div className="bg-emerald-600 text-white text-xs px-6 py-2.5 flex items-center justify-between font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedbackMsg}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Main Admin Layout with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-6 shrink-0">
          {/* User Profile snippet */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <img src={currentAdmin.avatar} alt={currentAdmin.name} className="w-10 h-10 rounded-full object-cover border border-amber-400" />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{currentAdmin.name}</h4>
              <p className="text-[11px] text-amber-400 font-medium">{currentAdmin.role}</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'dashboard', label: 'Dashboard Ikhtisar', icon: LayoutDashboard },
              { id: 'berita', label: `Berita & Warta (${news.length})`, icon: Newspaper },
              { id: 'agenda', label: `Agenda Siswa (${agenda.length})`, icon: Calendar },
              { id: 'prestasi', label: `SMESA JUARA (${achievements.length})`, icon: Trophy },
              { id: 'aspirasi', label: `Aspirasi Siswa (${pendingAspirationsCount} Baru)`, icon: MessageSquare, badge: pendingAspirationsCount },
              { id: 'kontak', label: `Pesan Masuk (${unreadMessagesCount} Baru)`, icon: Mail, badge: unreadMessagesCount },
              { id: 'profil', label: 'Profil & Sambutan Waka', icon: Settings },
              { id: 'audit', label: 'Log Riwayat Audit', icon: History }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-900/60 text-amber-400 font-bold border border-blue-700/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Role Switching Simulator for demo testing */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Uji Ganti Peran (RBAC Demo):
            </span>
            <div className="space-y-1">
              {DEFAULT_ADMINS.map(adm => (
                <button
                  key={adm.id}
                  onClick={() => {
                    StorageService.loginAdmin(adm);
                    window.location.reload();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] flex items-center justify-between ${
                    currentAdmin.id === adm.id
                      ? 'bg-amber-500/20 text-amber-300 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span>{adm.role}</span>
                  {currentAdmin.id === adm.id && <Check className="w-3 h-3 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 bg-slate-900 overflow-y-auto">
          {/* TAB 1: DASHBOARD IKHTISAR */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Selamat Datang, {currentAdmin.name}
                </h2>
                <p className="text-xs text-slate-400">
                  Berikut ringkasan statistik konten dan status layanan kesiswaan SMK Negeri 1 Jember hari ini.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-slate-400 text-xs">Total Warta Terbit</span>
                  <div className="text-2xl font-black text-white">{news.filter(n => n.status === 'published').length}</div>
                  <p className="text-[11px] text-amber-400">{news.filter(n => n.status === 'pending').length} Menunggu Persetujuan</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-slate-400 text-xs">Agenda Siswa Aktif</span>
                  <div className="text-2xl font-black text-amber-400">{agenda.filter(a => a.status !== 'selesai').length}</div>
                  <p className="text-[11px] text-slate-400">Total {agenda.length} Agenda Terdata</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-slate-400 text-xs">Prestasi SMESA JUARA</span>
                  <div className="text-2xl font-black text-white">{achievements.length}</div>
                  <p className="text-[11px] text-emerald-400">100% Terverifikasi Resmi</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-slate-400 text-xs">Aspirasi Siswa Perlu Respon</span>
                  <div className="text-2xl font-black text-amber-400">{pendingAspirationsCount}</div>
                  <p className="text-[11px] text-slate-400">{aspirations.length} Total Tiket Masuk</p>
                </div>
              </div>

              {/* Recent Pending Aspirations & Recent Contacts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800/80 rounded-xl border border-slate-700 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      <span>Aspirasi Siswa Terbaru</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('aspirasi')}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      Buka Semua
                    </button>
                  </div>

                  <div className="space-y-3">
                    {aspirations.slice(0, 3).map(asp => (
                      <div key={asp.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-300">{asp.ticketNumber} · {asp.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            asp.status === 'menunggu_review' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-emerald-950 text-emerald-300'
                          }`}>
                            {asp.status}
                          </span>
                        </div>
                        <h5 className="font-bold text-white truncate">{asp.title}</h5>
                        <p className="text-slate-400 line-clamp-2">{asp.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/80 rounded-xl border border-slate-700 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-400" />
                      <span>Pesan Kontak Masuk</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('kontak')}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      Buka Semua
                    </button>
                  </div>

                  <div className="space-y-3">
                    {contacts.slice(0, 3).map(msg => (
                      <div key={msg.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-300">{msg.fullName} ({msg.topic})</span>
                          <span className="text-slate-500">{msg.createdAt}</span>
                        </div>
                        <h5 className="font-bold text-white truncate">{msg.subject}</h5>
                        <p className="text-slate-400 line-clamp-2">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KELOLA BERITA */}
          {activeTab === 'berita' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Pengelolaan Berita & Warta Kesiswaan</h2>
                  <p className="text-xs text-slate-400">Publikasi artikel, berita prestasi, warta organisasi, dan pengumuman resmi.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingNews({
                      title: '',
                      content: '',
                      category: 'Kegiatan Sekolah',
                      tags: ['SMESA', 'Kesiswaan']
                    });
                    setShowNewsModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {/* News Table */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Judul Berita</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">Penulis</th>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {news.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-semibold text-white max-w-xs truncate">
                          {item.title}
                        </td>
                        <td className="p-3">{item.category}</td>
                        <td className="p-3 text-slate-400">{item.author}</td>
                        <td className="p-3 text-slate-400">{item.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'published' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingNews(item);
                              setShowNewsModal(true);
                            }}
                            className="text-amber-400 hover:text-white font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          {isEditor && (
                            <button
                              onClick={() => {
                                if (confirm(`Hapus artikel "${item.title}"?`)) {
                                  StorageService.deleteNewsItem(item.id, currentAdmin.name);
                                  onDataChanged();
                                  showFeedback('Artikel berhasil dihapus.');
                                }
                              }}
                              className="text-red-400 hover:text-red-300 cursor-pointer"
                            >
                              Hapus
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: KELOLA AGENDA */}
          {activeTab === 'agenda' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Pengelolaan Agenda Kegiatan Siswa</h2>
                  <p className="text-xs text-slate-400">Jadwal upacara, LDKS, turnamen, dan kegiatan kesiswaan.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingAgenda({
                      title: '',
                      startDate: new Date().toISOString().split('T')[0],
                      time: '07.30 - 11.00 WIB',
                      location: 'SMK Negeri 1 Jember',
                      organizer: 'Bidang Kesiswaan',
                      category: 'Upacara & Peringatan',
                      status: 'akan_datang'
                    });
                    setShowAgendaModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Agenda Baru</span>
                </button>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nama Kegiatan</th>
                      <th className="p-3">Tanggal & Waktu</th>
                      <th className="p-3">Lokasi</th>
                      <th className="p-3">Penyelenggara</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {agenda.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-semibold text-white max-w-xs truncate">{item.title}</td>
                        <td className="p-3 text-slate-400">{item.startDate} ({item.time})</td>
                        <td className="p-3 text-slate-400 max-w-[150px] truncate">{item.location}</td>
                        <td className="p-3 text-slate-400">{item.organizer}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'akan_datang' ? 'bg-blue-950 text-blue-300' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingAgenda(item);
                              setShowAgendaModal(true);
                            }}
                            className="text-amber-400 hover:text-white font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          {isEditor && (
                            <button
                              onClick={() => {
                                if (confirm(`Hapus agenda "${item.title}"?`)) {
                                  StorageService.deleteAgendaItem(item.id, currentAdmin.name);
                                  onDataChanged();
                                  showFeedback('Agenda berhasil dihapus.');
                                }
                              }}
                              className="text-red-400 hover:text-red-300 cursor-pointer"
                            >
                              Hapus
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: KELOLA PRESTASI SMESA JUARA */}
          {activeTab === 'prestasi' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Pengelolaan Prestasi Siswa (SMESA JUARA)</h2>
                  <p className="text-xs text-slate-400">Verifikasi dan catat perolehan medali, piala, dan kejuaraan siswa.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingAchievement({
                      competitionName: '',
                      award: 'Juara 1',
                      category: 'Kompetensi Keahlian',
                      level: 'Provinsi',
                      year: 2026,
                      students: [''],
                      gradeAndMajor: 'SMKN 1 Jember'
                    });
                    setShowAchievementModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Catat Prestasi Baru</span>
                </button>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Kompetisi & Penghargaan</th>
                      <th className="p-3">Siswa Peraih Juara</th>
                      <th className="p-3">Tingkat</th>
                      <th className="p-3">Tahun</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {achievements.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/50">
                        <td className="p-3 max-w-xs">
                          <div className="font-bold text-amber-400">{item.award}</div>
                          <div className="text-white truncate">{item.competitionName}</div>
                        </td>
                        <td className="p-3 text-slate-300">
                          <div className="font-semibold">{item.students.join(', ')}</div>
                          <div className="text-[11px] text-slate-500">{item.gradeAndMajor}</div>
                        </td>
                        <td className="p-3">{item.level}</td>
                        <td className="p-3">{item.year}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingAchievement(item);
                              setShowAchievementModal(true);
                            }}
                            className="text-amber-400 hover:text-white font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          {isEditor && (
                            <button
                              onClick={() => {
                                if (confirm(`Hapus data prestasi "${item.title}"?`)) {
                                  StorageService.deleteAchievementItem(item.id, currentAdmin.name);
                                  onDataChanged();
                                  showFeedback('Data prestasi berhasil dihapus.');
                                }
                              }}
                              className="text-red-400 hover:text-red-300 cursor-pointer"
                            >
                              Hapus
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: MODERASI ASPIRASI SISWA */}
          {activeTab === 'aspirasi' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Moderasi Ruang Aspirasi Siswa</h2>
                <p className="text-xs text-slate-400">Review masukan dari peserta didik, beri tanggapan resmi tim kesiswaan, atau ubah status tindak lanjut.</p>
              </div>

              <div className="space-y-4">
                {aspirations.map(asp => (
                  <div key={asp.id} className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="font-bold text-amber-400">{asp.ticketNumber}</span>
                          <span>·</span>
                          <span>{asp.category}</span>
                          <span>·</span>
                          <span>{asp.createdAt}</span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">{asp.title}</h4>
                      </div>

                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        asp.status === 'menunggu_review'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : asp.status === 'ditindaklanjuti'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-blue-950 text-blue-300'
                      }`}>
                        Status: {asp.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-900 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
                      "{asp.content}"
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>Pengirim: <strong>{asp.name}</strong> {asp.studentClass ? `(${asp.studentClass})` : ''}</span>

                      {isEditor && (
                        <button
                          onClick={() => {
                            setModeratingAsp(asp);
                            setAspResponseText(asp.adminResponse || '');
                          }}
                          className="px-3 py-1.5 bg-blue-950 hover:bg-slate-700 text-amber-400 rounded border border-blue-800 font-bold cursor-pointer"
                        >
                          Moderasi & Beri Tanggapan
                        </button>
                      )}
                    </div>

                    {asp.adminResponse && (
                      <div className="bg-blue-950/40 border-l-2 border-amber-400 p-3 rounded-r text-xs text-slate-300">
                        <span className="font-bold text-amber-400 block mb-0.5">Tanggapan Kesiswaan:</span>
                        <span>{asp.adminResponse}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PESAN KONTAK MASUK */}
          {activeTab === 'kontak' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Pesan Kontak Masuk</h2>
                <p className="text-xs text-slate-400">Pesan dari formulir hubungi kami oleh calon siswa, orang tua/wali, atau mitra lomba.</p>
              </div>

              <div className="space-y-4">
                {contacts.map(msg => (
                  <div key={msg.id} className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-amber-400">{msg.ticketNumber} · Topik: {msg.topic}</span>
                        <h4 className="text-base font-bold text-white mt-0.5">{msg.subject}</h4>
                        <p className="text-xs text-slate-400">Dari: {msg.fullName} ({msg.email} / {msg.phone})</p>
                      </div>

                      <div className="text-right text-xs">
                        <span className="text-slate-500 block mb-1">{msg.createdAt}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          msg.status === 'baru' ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-900 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
                      "{msg.message}"
                    </p>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => {
                          StorageService.updateContactStatus(msg.id, 'dibalas');
                          onDataChanged();
                          showFeedback('Status pesan ditandai sebagai "dibalas".');
                        }}
                        className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 cursor-pointer"
                      >
                        Tandai Dibalas
                      </button>
                      <button
                        onClick={() => {
                          StorageService.updateContactStatus(msg.id, 'arsip');
                          onDataChanged();
                          showFeedback('Pesan dipindahkan ke arsip.');
                        }}
                        className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 rounded text-slate-400 cursor-pointer"
                      >
                        Arsipkan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PENGATURAN PROFIL & SAMBUTAN */}
          {activeTab === 'profil' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Pengaturan Profil & Sambutan Waka Kesiswaan</h2>
                <p className="text-xs text-slate-400">Kelola sambutan resmi pimpinan kesiswaan dan teks running banner pengumuman atas.</p>
              </div>

              {!isSuperAdmin ? (
                <div className="bg-amber-950/40 border border-amber-800/60 p-4 rounded-xl text-xs text-amber-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Hanya pengguna dengan peran <strong>Super Admin</strong> yang memiliki otoritas mengubah sambutan resmi kesiswaan.</span>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Running Ticker Pengumuman Teratas:
                    </label>
                    <input
                      type="text"
                      value={runningAnnouncement}
                      onChange={(e) => setRunningAnnouncement(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Sambutan Resmi Wakil Kepala Sekolah Bidang Kesiswaan:
                    </label>
                    <textarea
                      rows={6}
                      value={wakaGreeting}
                      onChange={(e) => setWakaGreeting(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Simpan Perubahan Profil
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 8: AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Riwayat Audit Perubahan Sistem</h2>
                <p className="text-xs text-slate-400">Catatan log aktivitas pengelolaan data, publikasi berita, dan moderasi konten.</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Waktu</th>
                      <th className="p-3">Aksi</th>
                      <th className="p-3">Modul</th>
                      <th className="p-3">Pengguna</th>
                      <th className="p-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {StorageService.getAuditLogs().map(log => (
                      <tr key={log.id} className="hover:bg-slate-800/50">
                        <td className="p-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                        <td className="p-3 font-bold text-amber-400">{log.action}</td>
                        <td className="p-3 text-slate-300">{log.module}</td>
                        <td className="p-3 text-white font-medium">{log.performedBy}</td>
                        <td className="p-3 text-slate-400">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* News Modal Form */}
      {showNewsModal && editingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 p-6 sm:p-8 space-y-5 text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingNews.id ? 'Edit Warta Kesiswaan' : 'Tulis Berita Baru'}
              </h3>
              <button onClick={() => setShowNewsModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={editingNews.title || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Kategori</label>
                  <select
                    value={editingNews.category || 'Kegiatan Sekolah'}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
                    <option value="Pembinaan Karakter">Pembinaan Karakter</option>
                    <option value="OSIS dan MPK">OSIS dan MPK</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                    <option value="Prestasi Siswa">Prestasi Siswa</option>
                    <option value="Lomba dan Kompetisi">Lomba dan Kompetisi</option>
                    <option value="Kegiatan Sosial">Kegiatan Sosial</option>
                    <option value="Pengumuman Resmi">Pengumuman Resmi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Status Publikasi</label>
                  <select
                    value={editingNews.status || 'published'}
                    onChange={(e) => setEditingNews({ ...editingNews, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="published">Terbit (Published)</option>
                    <option value="draft">Draf</option>
                    <option value="pending">Menunggu Persetujuan</option>
                    <option value="archived">Arsip</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">URL Gambar Utama</label>
                <input
                  type="url"
                  value={editingNews.imageUrl || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={2}
                  value={editingNews.excerpt || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Konten Lengkap</label>
                <textarea
                  rows={6}
                  required
                  value={editingNews.content || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Agenda Modal Form */}
      {showAgendaModal && editingAgenda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-700 p-6 sm:p-8 space-y-5 text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingAgenda.id ? 'Edit Agenda Kegiatan' : 'Tambah Agenda Baru'}
              </h3>
              <button onClick={() => setShowAgendaModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveAgenda} className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Nama Kegiatan</label>
                <input
                  type="text"
                  required
                  value={editingAgenda.title || ''}
                  onChange={(e) => setEditingAgenda({ ...editingAgenda, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Tanggal Mulai (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={editingAgenda.startDate || ''}
                    onChange={(e) => setEditingAgenda({ ...editingAgenda, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Waktu</label>
                  <input
                    type="text"
                    value={editingAgenda.time || ''}
                    onChange={(e) => setEditingAgenda({ ...editingAgenda, time: e.target.value })}
                    placeholder="Contoh: 07.00 - 10.30 WIB"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={editingAgenda.location || ''}
                    onChange={(e) => setEditingAgenda({ ...editingAgenda, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Penyelenggara</label>
                  <input
                    type="text"
                    value={editingAgenda.organizer || ''}
                    onChange={(e) => setEditingAgenda({ ...editingAgenda, organizer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Deskripsi</label>
                <textarea
                  rows={3}
                  value={editingAgenda.description || ''}
                  onChange={(e) => setEditingAgenda({ ...editingAgenda, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAgendaModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Achievement Modal Form */}
      {showAchievementModal && editingAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-700 p-6 sm:p-8 space-y-5 text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingAchievement.id ? 'Edit Prestasi Siswa' : 'Catat Prestasi Baru'}
              </h3>
              <button onClick={() => setShowAchievementModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveAchievement} className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Nama Kompetisi / Perlombaan</label>
                <input
                  type="text"
                  required
                  value={editingAchievement.competitionName || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, competitionName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Penghargaan / Gelar</label>
                  <input
                    type="text"
                    required
                    value={editingAchievement.award || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, award: e.target.value })}
                    placeholder="Contoh: Juara 1 Medali Emas"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Tingkat</label>
                  <select
                    value={editingAchievement.level || 'Provinsi'}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, level: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Internasional">Internasional</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Kabupaten/Kota">Kabupaten/Kota</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Nama Siswa / Tim</label>
                <input
                  type="text"
                  required
                  value={Array.isArray(editingAchievement.students) ? editingAchievement.students.join(', ') : ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, students: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="Nama-nama siswa dipisah koma"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Kelas & Jurusan</label>
                <input
                  type="text"
                  value={editingAchievement.gradeAndMajor || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, gradeAndMajor: e.target.value })}
                  placeholder="Contoh: XII Rekayasa Perangkat Lunak 1"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAchievementModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Simpan Prestasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Moderation Response Modal */}
      {moderatingAsp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-700 p-6 sm:p-8 space-y-4 text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Moderasi Aspirasi Siswa</h3>
              <button onClick={() => setModeratingAsp(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-amber-400 font-bold">{moderatingAsp.ticketNumber} · {moderatingAsp.title}</span>
              <p className="text-slate-400">{moderatingAsp.content}</p>
            </div>

            <div>
              <label className="block font-bold mb-1">Tulis Tanggapan Resmi Tim Kesiswaan:</label>
              <textarea
                rows={3}
                value={aspResponseText}
                onChange={(e) => setAspResponseText(e.target.value)}
                placeholder="Tuliskan respon atau langkah tindak lanjut sekolah..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleModerate('ditolak')}
                className="px-3 py-1.5 bg-red-950 text-red-300 rounded border border-red-800 font-semibold cursor-pointer"
              >
                Tolak Aspirasi
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleModerate('disetujui')}
                  className="px-3 py-1.5 bg-blue-950 text-blue-300 rounded border border-blue-800 font-semibold cursor-pointer"
                >
                  Setujui
                </button>
                <button
                  onClick={() => handleModerate('ditindaklanjuti')}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold cursor-pointer"
                >
                  Tindak Lanjuti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
