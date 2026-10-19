import {
  NewsItem,
  AgendaItem,
  AchievementItem,
  ExtracurricularItem,
  GalleryItem,
  StudentAspiration,
  ContactMessage,
  SchoolProfileData,
  AdminUser,
  AuditLog,
  PasswordResetToken,
  OsisMpkData,
  OsisSekbid,
  OsisProker,
  PilketosStage,
  AnnualWorkProgram,
  StaffMember,
  PublicDocumentItem
} from '../types';
import {
  INITIAL_SCHOOL_PROFILE,
  INITIAL_NEWS,
  INITIAL_AGENDA,
  INITIAL_ACHIEVEMENTS,
  INITIAL_EXTRACURRICULARS,
  INITIAL_GALLERY,
  INITIAL_ASPIRATIONS,
  INITIAL_CONTACT_MESSAGES,
  INITIAL_OSIS_MPK
} from '../data/initialData';

const KEYS = {
  PROFILE: 'smesa_profile_v2',
  NEWS: 'smesa_news_v1',
  AGENDA: 'smesa_agenda_v1',
  ACHIEVEMENTS: 'smesa_achievements_v1',
  EXTRAS: 'smesa_extras_v1',
  GALLERY: 'smesa_gallery_v1',
  ASPIRATIONS: 'smesa_aspirations_v1',
  CONTACTS: 'smesa_contacts_v1',
  AUDIT_LOGS: 'smesa_audit_logs_v1',
  CURRENT_ADMIN: 'smesa_current_admin_v1',
  ADMIN_ACCOUNTS: 'smesa_admin_accounts_v2',
  RESET_TOKENS: 'smesa_reset_tokens_v1',
  OSIS_MPK: 'smesa_osis_mpk_v1'
};

export const DEFAULT_ADMINS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Drs. H. Bambang Sudarsono, M.Pd.',
    email: 'admin@smesa.sch.id',
    role: 'Administrator',
    password: 'smesa2026',
    status: 'aktif',
    phone: '081234567890',
    createdAt: '2026-10-01 08:00',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'usr-2',
    name: 'Dedy Kurniawan, S.Pd.',
    email: 'kesiswaan@smesa.sch.id',
    role: 'Tim Kesiswaan',
    password: 'kesiswaan2026',
    status: 'aktif',
    phone: '081234567891',
    createdAt: '2026-10-02 09:30',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'usr-3',
    name: 'Budi Santoso, S.Pd.',
    email: 'karakter@smesa.sch.id',
    role: 'Tim Kesiswaan',
    password: 'smesa123',
    status: 'aktif',
    phone: '081234567892',
    createdAt: '2026-10-05 10:15',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'usr-4',
    name: 'Rayhan Aditya (Ketua OSIS)',
    email: 'kontributor.osis@smesa.sch.id',
    role: 'Kontributor Berita',
    password: 'osis2026',
    status: 'aktif',
    phone: '081234567893',
    createdAt: '2026-10-10 14:00',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
  }
];

// Helper for safe JSON parse
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    return JSON.parse(data) as T;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('smesa_data_mutated', { detail: { key } }));
    }
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

export const StorageService = {
  // --- Profile ---
  getProfile(): SchoolProfileData {
    return getFromStorage<SchoolProfileData>(KEYS.PROFILE, INITIAL_SCHOOL_PROFILE);
  },
  updateProfile(profile: Partial<SchoolProfileData>, adminName: string): SchoolProfileData {
    const current = this.getProfile();
    const updated = { ...current, ...profile };
    saveToStorage(KEYS.PROFILE, updated);
    this.addAuditLog('Perbarui Profil Kesiswaan', 'Profil & Sambutan', adminName, 'Memperbarui data sambutan/visi/budaya kesiswaan');
    return updated;
  },

  // Annual Programs Management (Edit & Tambah Program Kerja Kesiswaan)
  saveAnnualProgram(item: Omit<AnnualWorkProgram, 'id'> & { id?: string }, adminName: string): AnnualWorkProgram {
    const profile = this.getProfile();
    const programs = profile.annualPrograms ? [...profile.annualPrograms] : [];

    if (item.id) {
      const idx = programs.findIndex(p => p.id === item.id);
      if (idx !== -1) {
        programs[idx] = { ...programs[idx], ...item } as AnnualWorkProgram;
        profile.annualPrograms = programs;
        saveToStorage(KEYS.PROFILE, profile);
        this.addAuditLog('Edit Program Kerja', 'Profil Kesiswaan', adminName, `Memperbarui program "${item.title}"`);
        return programs[idx];
      }
    }

    const newProg: AnnualWorkProgram = {
      ...item,
      id: `pro-${Date.now()}`
    };
    programs.push(newProg);
    profile.annualPrograms = programs;
    saveToStorage(KEYS.PROFILE, profile);
    this.addAuditLog('Tambah Program Kerja', 'Profil Kesiswaan', adminName, `Menambahkan program kerja baru "${item.title}"`);
    return newProg;
  },

  deleteAnnualProgram(id: string, adminName: string): void {
    const profile = this.getProfile();
    if (!profile.annualPrograms) return;
    const target = profile.annualPrograms.find(p => p.id === id);
    profile.annualPrograms = profile.annualPrograms.filter(p => p.id !== id);
    saveToStorage(KEYS.PROFILE, profile);
    if (target) {
      this.addAuditLog('Hapus Program Kerja', 'Profil Kesiswaan', adminName, `Menghapus program "${target.title}"`);
    }
  },

  // Staff Members Management (Edit & Tambah Struktur Kesiswaan)
  saveStaffMember(item: Omit<StaffMember, 'id'> & { id?: string }, adminName: string): StaffMember {
    const profile = this.getProfile();
    const staff = profile.organizationalStructure ? [...profile.organizationalStructure] : [];

    if (item.id) {
      const idx = staff.findIndex(s => s.id === item.id);
      if (idx !== -1) {
        staff[idx] = { ...staff[idx], ...item } as StaffMember;
        profile.organizationalStructure = staff;
        saveToStorage(KEYS.PROFILE, profile);
        this.addAuditLog('Edit Struktur Kesiswaan', 'Profil Kesiswaan', adminName, `Memperbarui anggota "${item.name}"`);
        return staff[idx];
      }
    }

    const newStaff: StaffMember = {
      ...item,
      id: `stf-${Date.now()}`,
      avatar: item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
    };
    staff.push(newStaff);
    profile.organizationalStructure = staff;
    saveToStorage(KEYS.PROFILE, profile);
    this.addAuditLog('Tambah Struktur Kesiswaan', 'Profil Kesiswaan', adminName, `Menambahkan staf "${item.name}" (${item.title})`);
    return newStaff;
  },

  deleteStaffMember(id: string, adminName: string): void {
    const profile = this.getProfile();
    if (!profile.organizationalStructure) return;
    const target = profile.organizationalStructure.find(s => s.id === id);
    profile.organizationalStructure = profile.organizationalStructure.filter(s => s.id !== id);
    saveToStorage(KEYS.PROFILE, profile);
    if (target) {
      this.addAuditLog('Hapus Struktur Kesiswaan', 'Profil Kesiswaan', adminName, `Menghapus staf "${target.name}"`);
    }
  },

  // Public Documents Management (Edit & Tambah Dokumen Unduhan)
  savePublicDocument(item: Omit<PublicDocumentItem, 'id'> & { id?: string }, adminName: string): PublicDocumentItem {
    const profile = this.getProfile();
    const docs = profile.publicDocuments ? [...profile.publicDocuments] : [];

    if (item.id) {
      const idx = docs.findIndex(d => d.id === item.id);
      if (idx !== -1) {
        docs[idx] = { ...docs[idx], ...item } as PublicDocumentItem;
        profile.publicDocuments = docs;
        saveToStorage(KEYS.PROFILE, profile);
        this.addAuditLog('Edit Dokumen Publik', 'Profil Kesiswaan', adminName, `Memperbarui dokumen "${item.title}"`);
        return docs[idx];
      }
    }

    const newDoc: PublicDocumentItem = {
      ...item,
      id: `doc-${Date.now()}`
    };
    docs.push(newDoc);
    profile.publicDocuments = docs;
    saveToStorage(KEYS.PROFILE, profile);
    this.addAuditLog('Tambah Dokumen Publik', 'Profil Kesiswaan', adminName, `Menambahkan dokumen baru "${item.title}"`);
    return newDoc;
  },

  deletePublicDocument(id: string, adminName: string): void {
    const profile = this.getProfile();
    if (!profile.publicDocuments) return;
    const target = profile.publicDocuments.find(d => d.id === id);
    profile.publicDocuments = profile.publicDocuments.filter(d => d.id !== id);
    saveToStorage(KEYS.PROFILE, profile);
    if (target) {
      this.addAuditLog('Hapus Dokumen Publik', 'Profil Kesiswaan', adminName, `Menghapus dokumen "${target.title}"`);
    }
  },

  // --- News ---
  getNews(): NewsItem[] {
    return getFromStorage<NewsItem[]>(KEYS.NEWS, INITIAL_NEWS);
  },
  getPublishedNews(): NewsItem[] {
    return this.getNews().filter(n => n.status === 'published');
  },
  saveNewsItem(item: Omit<NewsItem, 'id'> & { id?: string }, adminName: string): NewsItem {
    const all = this.getNews();
    if (item.id) {
      const idx = all.findIndex(n => n.id === item.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...item } as NewsItem;
        saveToStorage(KEYS.NEWS, all);
        this.addAuditLog('Edit Berita', 'Berita & Pengumuman', adminName, `Memperbarui artikel "${item.title}"`);
        return all[idx];
      }
    }
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`
    };
    all.unshift(newItem);
    saveToStorage(KEYS.NEWS, all);
    this.addAuditLog('Tambah Berita', 'Berita & Pengumuman', adminName, `Menambahkan artikel baru "${item.title}"`);
    return newItem;
  },
  deleteNewsItem(id: string, adminName: string): void {
    const all = this.getNews();
    const target = all.find(n => n.id === id);
    const filtered = all.filter(n => n.id !== id);
    saveToStorage(KEYS.NEWS, filtered);
    if (target) {
      this.addAuditLog('Hapus Berita', 'Berita & Pengumuman', adminName, `Menghapus artikel "${target.title}"`);
    }
  },

  // --- Agenda ---
  getAgenda(): AgendaItem[] {
    return getFromStorage<AgendaItem[]>(KEYS.AGENDA, INITIAL_AGENDA);
  },
  saveAgendaItem(item: Omit<AgendaItem, 'id'> & { id?: string }, adminName: string): AgendaItem {
    const all = this.getAgenda();
    if (item.id) {
      const idx = all.findIndex(a => a.id === item.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...item } as AgendaItem;
        saveToStorage(KEYS.AGENDA, all);
        this.addAuditLog('Edit Agenda', 'Agenda Kegiatan', adminName, `Memperbarui agenda "${item.title}"`);
        return all[idx];
      }
    }
    const newItem: AgendaItem = {
      ...item,
      id: `agenda-${Date.now()}`
    };
    all.push(newItem);
    // Sort by date ascending
    all.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    saveToStorage(KEYS.AGENDA, all);
    this.addAuditLog('Tambah Agenda', 'Agenda Kegiatan', adminName, `Menambahkan agenda baru "${item.title}"`);
    return newItem;
  },
  deleteAgendaItem(id: string, adminName: string): void {
    const all = this.getAgenda();
    const target = all.find(a => a.id === id);
    const filtered = all.filter(a => a.id !== id);
    saveToStorage(KEYS.AGENDA, filtered);
    if (target) {
      this.addAuditLog('Hapus Agenda', 'Agenda Kegiatan', adminName, `Menghapus agenda "${target.title}"`);
    }
  },

  // --- Achievements ---
  getAchievements(): AchievementItem[] {
    return getFromStorage<AchievementItem[]>(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  },
  saveAchievementItem(item: Omit<AchievementItem, 'id'> & { id?: string }, adminName: string): AchievementItem {
    const all = this.getAchievements();
    if (item.id) {
      const idx = all.findIndex(a => a.id === item.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...item } as AchievementItem;
        saveToStorage(KEYS.ACHIEVEMENTS, all);
        this.addAuditLog('Edit Prestasi', 'SMESA JUARA', adminName, `Memperbarui data prestasi "${item.title}"`);
        return all[idx];
      }
    }
    const newItem: AchievementItem = {
      ...item,
      id: `ach-${Date.now()}`
    };
    all.unshift(newItem);
    saveToStorage(KEYS.ACHIEVEMENTS, all);
    this.addAuditLog('Tambah Prestasi', 'SMESA JUARA', adminName, `Menambahkan prestasi baru "${item.title}"`);
    return newItem;
  },
  deleteAchievementItem(id: string, adminName: string): void {
    const all = this.getAchievements();
    const target = all.find(a => a.id === id);
    const filtered = all.filter(a => a.id !== id);
    saveToStorage(KEYS.ACHIEVEMENTS, filtered);
    if (target) {
      this.addAuditLog('Hapus Prestasi', 'SMESA JUARA', adminName, `Menghapus data prestasi "${target.title}"`);
    }
  },

  // --- Extracurriculars ---
  getExtracurriculars(): ExtracurricularItem[] {
    return getFromStorage<ExtracurricularItem[]>(KEYS.EXTRAS, INITIAL_EXTRACURRICULARS);
  },
  saveExtracurricularItem(item: Omit<ExtracurricularItem, 'id'> & { id?: string }, adminName: string): ExtracurricularItem {
    const all = this.getExtracurriculars();
    if (item.id) {
      const idx = all.findIndex(e => e.id === item.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...item } as ExtracurricularItem;
        saveToStorage(KEYS.EXTRAS, all);
        this.addAuditLog('Edit Ekstrakurikuler', 'Katalog Ekstra', adminName, `Memperbarui ekstra "${item.name}"`);
        return all[idx];
      }
    }
    const newItem: ExtracurricularItem = {
      ...item,
      id: `extra-${Date.now()}`
    };
    all.push(newItem);
    saveToStorage(KEYS.EXTRAS, all);
    this.addAuditLog('Tambah Ekstrakurikuler', 'Katalog Ekstra', adminName, `Menambahkan ekstra baru "${item.name}"`);
    return newItem;
  },
  deleteExtracurricularItem(id: string, adminName: string): void {
    const all = this.getExtracurriculars();
    const target = all.find(e => e.id === id);
    const filtered = all.filter(e => e.id !== id);
    saveToStorage(KEYS.EXTRAS, filtered);
    if (target) {
      this.addAuditLog('Hapus Ekstrakurikuler', 'Katalog Ekstra', adminName, `Menghapus ekstra "${target.name}"`);
    }
  },

  // --- Gallery ---
  getGallery(): GalleryItem[] {
    return getFromStorage<GalleryItem[]>(KEYS.GALLERY, INITIAL_GALLERY);
  },
  saveGalleryItem(item: Omit<GalleryItem, 'id'> & { id?: string }, adminName: string): GalleryItem {
    const all = this.getGallery();
    if (item.id) {
      const idx = all.findIndex(g => g.id === item.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...item } as GalleryItem;
        saveToStorage(KEYS.GALLERY, all);
        this.addAuditLog('Edit Galeri', 'Galeri Dokumentasi', adminName, `Memperbarui item galeri "${item.title}"`);
        return all[idx];
      }
    }
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    all.unshift(newItem);
    saveToStorage(KEYS.GALLERY, all);
    this.addAuditLog('Tambah Galeri', 'Galeri Dokumentasi', adminName, `Menambahkan foto/video "${item.title}"`);
    return newItem;
  },
  deleteGalleryItem(id: string, adminName: string): void {
    const all = this.getGallery();
    const target = all.find(g => g.id === id);
    const filtered = all.filter(g => g.id !== id);
    saveToStorage(KEYS.GALLERY, filtered);
    if (target) {
      this.addAuditLog('Hapus Galeri', 'Galeri Dokumentasi', adminName, `Menghapus item galeri "${target.title}"`);
    }
  },

  // --- Aspirations ---
  getAspirations(): StudentAspiration[] {
    return getFromStorage<StudentAspiration[]>(KEYS.ASPIRATIONS, INITIAL_ASPIRATIONS);
  },
  submitAspiration(aspiration: Omit<StudentAspiration, 'id' | 'ticketNumber' | 'createdAt' | 'status'>): StudentAspiration {
    const all = this.getAspirations();
    const ticketNumber = `ASP-${new Date().getFullYear()}-${String(all.length + 1).padStart(3, '0')}`;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newItem: StudentAspiration = {
      ...aspiration,
      id: `asp-${Date.now()}`,
      ticketNumber,
      createdAt: dateStr,
      status: 'menunggu_review'
    };
    all.unshift(newItem);
    saveToStorage(KEYS.ASPIRATIONS, all);
    return newItem;
  },
  moderateAspiration(id: string, status: StudentAspiration['status'], adminResponse?: string, adminName = 'Admin'): void {
    const all = this.getAspirations();
    const idx = all.findIndex(a => a.id === id);
    if (idx !== -1) {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      all[idx].status = status;
      if (adminResponse !== undefined) {
        all[idx].adminResponse = adminResponse;
        all[idx].respondedAt = dateStr;
      }
      saveToStorage(KEYS.ASPIRATIONS, all);
      this.addAuditLog('Moderasi Aspirasi', 'Ruang Aspirasi Siswa', adminName, `Ubah status aspirasi ${all[idx].ticketNumber} menjadi ${status}`);
    }
  },

  // --- Contact Messages ---
  getContactMessages(): ContactMessage[] {
    return getFromStorage<ContactMessage[]>(KEYS.CONTACTS, INITIAL_CONTACT_MESSAGES);
  },
  submitContactMessage(msg: Omit<ContactMessage, 'id' | 'ticketNumber' | 'createdAt' | 'isRead' | 'status'>): ContactMessage {
    const all = this.getContactMessages();
    const ticketNumber = `MSG-${new Date().getFullYear()}-${String(all.length + 1).padStart(3, '0')}`;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newItem: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      ticketNumber,
      createdAt: dateStr,
      isRead: false,
      status: 'baru'
    };
    all.unshift(newItem);
    saveToStorage(KEYS.CONTACTS, all);
    return newItem;
  },
  updateContactStatus(id: string, status: ContactMessage['status']): void {
    const all = this.getContactMessages();
    const idx = all.findIndex(m => m.id === id);
    if (idx !== -1) {
      all[idx].status = status;
      all[idx].isRead = true;
      saveToStorage(KEYS.CONTACTS, all);
    }
  },

  // --- OSIS & MPK Management (Edit & Tambah Program, Sekbid, Tahapan) ---
  getOsisMpk(): OsisMpkData {
    return getFromStorage<OsisMpkData>(KEYS.OSIS_MPK, INITIAL_OSIS_MPK);
  },

  updateOsisMpk(data: Partial<OsisMpkData>, adminName: string): OsisMpkData {
    const current = this.getOsisMpk();
    const updated = { ...current, ...data };
    saveToStorage(KEYS.OSIS_MPK, updated);
    this.addAuditLog('Perbarui Data OSIS-MPK', 'OSIS & MPK', adminName, 'Memperbarui visi, kepengurusan, atau informasi umum OSIS/MPK');
    return updated;
  },

  saveOsisSekbid(item: Omit<OsisSekbid, 'id'> & { id?: string }, adminName: string): OsisSekbid {
    const osis = this.getOsisMpk();
    const sekbids = [...osis.sekbids];

    if (item.id) {
      const idx = sekbids.findIndex(s => s.id === item.id);
      if (idx !== -1) {
        sekbids[idx] = { ...sekbids[idx], ...item } as OsisSekbid;
        osis.sekbids = sekbids;
        saveToStorage(KEYS.OSIS_MPK, osis);
        this.addAuditLog('Edit Sekbid OSIS', 'OSIS & MPK', adminName, `Memperbarui ${item.num}: ${item.title}`);
        return sekbids[idx];
      }
    }

    const newSekbid: OsisSekbid = {
      ...item,
      id: `sek-${Date.now()}`
    };
    sekbids.push(newSekbid);
    osis.sekbids = sekbids;
    saveToStorage(KEYS.OSIS_MPK, osis);
    this.addAuditLog('Tambah Sekbid OSIS', 'OSIS & MPK', adminName, `Menambahkan divisi ${item.num}: ${item.title}`);
    return newSekbid;
  },

  deleteOsisSekbid(id: string, adminName: string): void {
    const osis = this.getOsisMpk();
    const target = osis.sekbids.find(s => s.id === id);
    osis.sekbids = osis.sekbids.filter(s => s.id !== id);
    saveToStorage(KEYS.OSIS_MPK, osis);
    if (target) {
      this.addAuditLog('Hapus Sekbid OSIS', 'OSIS & MPK', adminName, `Menghapus divisi ${target.num}: ${target.title}`);
    }
  },

  saveOsisProker(item: Omit<OsisProker, 'id'> & { id?: string }, adminName: string): OsisProker {
    const osis = this.getOsisMpk();
    const prokers = [...osis.prokers];

    if (item.id) {
      const idx = prokers.findIndex(p => p.id === item.id);
      if (idx !== -1) {
        prokers[idx] = { ...prokers[idx], ...item } as OsisProker;
        osis.prokers = prokers;
        saveToStorage(KEYS.OSIS_MPK, osis);
        this.addAuditLog('Edit Proker OSIS', 'OSIS & MPK', adminName, `Memperbarui proker "${item.name}"`);
        return prokers[idx];
      }
    }

    const newProk: OsisProker = {
      ...item,
      id: `prok-${Date.now()}`
    };
    prokers.push(newProk);
    osis.prokers = prokers;
    saveToStorage(KEYS.OSIS_MPK, osis);
    this.addAuditLog('Tambah Proker OSIS', 'OSIS & MPK', adminName, `Menambahkan program kerja baru "${item.name}"`);
    return newProk;
  },

  deleteOsisProker(id: string, adminName: string): void {
    const osis = this.getOsisMpk();
    const target = osis.prokers.find(p => p.id === id);
    osis.prokers = osis.prokers.filter(p => p.id !== id);
    saveToStorage(KEYS.OSIS_MPK, osis);
    if (target) {
      this.addAuditLog('Hapus Proker OSIS', 'OSIS & MPK', adminName, `Menghapus proker "${target.name}"`);
    }
  },

  savePilketosStage(item: Omit<PilketosStage, 'id'> & { id?: string }, adminName: string): PilketosStage {
    const osis = this.getOsisMpk();
    const stages = [...osis.pilketosStages];

    if (item.id) {
      const idx = stages.findIndex(s => s.id === item.id);
      if (idx !== -1) {
        stages[idx] = { ...stages[idx], ...item } as PilketosStage;
        osis.pilketosStages = stages;
        saveToStorage(KEYS.OSIS_MPK, osis);
        this.addAuditLog('Edit Tahapan Pilketos', 'OSIS & MPK', adminName, `Memperbarui tahapan "${item.stage}"`);
        return stages[idx];
      }
    }

    const newStage: PilketosStage = {
      ...item,
      id: `stg-${Date.now()}`
    };
    stages.push(newStage);
    osis.pilketosStages = stages;
    saveToStorage(KEYS.OSIS_MPK, osis);
    this.addAuditLog('Tambah Tahapan Pilketos', 'OSIS & MPK', adminName, `Menambahkan tahapan Pilketos "${item.stage}"`);
    return newStage;
  },

  deletePilketosStage(id: string, adminName: string): void {
    const osis = this.getOsisMpk();
    const target = osis.pilketosStages.find(s => s.id === id);
    osis.pilketosStages = osis.pilketosStages.filter(s => s.id !== id);
    saveToStorage(KEYS.OSIS_MPK, osis);
    if (target) {
      this.addAuditLog('Hapus Tahapan Pilketos', 'OSIS & MPK', adminName, `Menghapus tahapan "${target.stage}"`);
    }
  },

  // --- Audit Logs ---
  getAuditLogs(): AuditLog[] {
    return getFromStorage<AuditLog[]>(KEYS.AUDIT_LOGS, [
      {
        id: 'log-1',
        action: 'Inisialisasi Sistem',
        module: 'Core System',
        performedBy: 'Sistem Kesiswaan SMESA',
        timestamp: '2026-10-15 08:00',
        details: 'Basis data awal kesiswaan berhasil dimuat.'
      }
    ]);
  },
  addAuditLog(action: string, module: string, performedBy: string, details: string): void {
    const logs = this.getAuditLogs();
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    logs.unshift({
      id: `log-${Date.now()}`,
      action,
      module,
      performedBy,
      timestamp: dateStr,
      details
    });
    // Keep max 100 logs
    if (logs.length > 100) logs.pop();
    saveToStorage(KEYS.AUDIT_LOGS, logs);
  },

  // --- Admin Session ---
  getCurrentAdmin(): AdminUser | null {
    return getFromStorage<AdminUser | null>(KEYS.CURRENT_ADMIN, null);
  },
  loginAdmin(user: AdminUser): void {
    saveToStorage(KEYS.CURRENT_ADMIN, user);
    this.addAuditLog('Login Admin', 'Autentikasi', user.name, `Pengguna login sebagai ${user.role}`);
  },
  logoutAdmin(): void {
    const current = this.getCurrentAdmin();
    if (current) {
      this.addAuditLog('Logout Admin', 'Autentikasi', current.name, 'Pengguna keluar dari panel admin');
    }
    localStorage.removeItem(KEYS.CURRENT_ADMIN);
  },

  // --- Admin Accounts Management ---
  getAdminAccounts(): AdminUser[] {
    const accounts = getFromStorage<AdminUser[]>(KEYS.ADMIN_ACCOUNTS, DEFAULT_ADMINS);
    if (!accounts || accounts.length === 0) {
      saveToStorage(KEYS.ADMIN_ACCOUNTS, DEFAULT_ADMINS);
      return DEFAULT_ADMINS;
    }
    return accounts;
  },

  saveAdminAccount(account: Omit<AdminUser, 'id'> & { id?: string }, performedBy: string): AdminUser {
    const all = this.getAdminAccounts();
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (account.id) {
      const idx = all.findIndex(a => a.id === account.id);
      if (idx !== -1) {
        all[idx] = {
          ...all[idx],
          ...account
        };
        saveToStorage(KEYS.ADMIN_ACCOUNTS, all);
        this.addAuditLog('Perbarui Akun Pengguna', 'Manajemen Akun', performedBy, `Memperbarui data akun ${all[idx].name} (${all[idx].email}) role ${all[idx].role}`);
        return all[idx];
      }
    }

    const newAccount: AdminUser = {
      ...account,
      id: `usr-${Date.now()}`,
      status: account.status || 'aktif',
      createdAt: dateStr,
      avatar: account.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    };
    all.push(newAccount);
    saveToStorage(KEYS.ADMIN_ACCOUNTS, all);
    this.addAuditLog('Buat Akun Baru', 'Manajemen Akun', performedBy, `Membuat akun baru ${newAccount.name} (${newAccount.email}) dengan role ${newAccount.role}`);
    return newAccount;
  },

  deleteAdminAccount(id: string, performedBy: string): boolean {
    const all = this.getAdminAccounts();
    const target = all.find(a => a.id === id);
    if (!target) return false;

    // Prevent deleting last Administrator
    const adminCount = all.filter(a => a.role === 'Administrator' || a.role === 'Super Admin').length;
    if ((target.role === 'Administrator' || target.role === 'Super Admin') && adminCount <= 1) {
      return false;
    }

    const filtered = all.filter(a => a.id !== id);
    saveToStorage(KEYS.ADMIN_ACCOUNTS, filtered);
    this.addAuditLog('Hapus Akun Pengguna', 'Manajemen Akun', performedBy, `Menghapus akun staf ${target.name} (${target.email})`);
    return true;
  },

  updateAdminPassword(id: string, newPassword: string, performedBy: string): boolean {
    const all = this.getAdminAccounts();
    const idx = all.findIndex(a => a.id === id);
    if (idx === -1) return false;

    all[idx].password = newPassword;
    saveToStorage(KEYS.ADMIN_ACCOUNTS, all);
    this.addAuditLog('Ubah Password Akun', 'Manajemen Akun', performedBy, `Mengubah password untuk akun ${all[idx].name} (${all[idx].email})`);
    return true;
  },

  authenticate(email: string, password: string): { success: boolean; user?: AdminUser; message?: string } {
    const accounts = this.getAdminAccounts();
    const user = accounts.find(a => a.email.toLowerCase().trim() === email.toLowerCase().trim());

    if (!user) {
      return { success: false, message: 'Email administrator atau tim kesiswaan tidak terdaftar.' };
    }

    if (user.status === 'nonaktif') {
      return { success: false, message: 'Akun ini dinonaktifkan oleh administrator. Hubungi pimpinan kesiswaan.' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Kata sandi salah. Silakan periksa kembali kata sandi akun Anda.' };
    }

    // Update lastLogin
    const now = new Date();
    user.lastLogin = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    saveToStorage(KEYS.ADMIN_ACCOUNTS, accounts);

    return { success: true, user };
  },

  // --- Password Reset Token System (Temporary Security Tokens) ---
  requestPasswordReset(email: string): { success: boolean; message: string; token?: string; expiresAt?: number } {
    const accounts = this.getAdminAccounts();
    const user = accounts.find(a => a.email.toLowerCase().trim() === email.toLowerCase().trim());

    if (!user) {
      return { 
        success: false, 
        message: 'Alamat surel tidak terdaftar sebagai akun Administrator atau Tim Kesiswaan SMESA.' 
      };
    }

    if (user.status === 'nonaktif') {
      return { 
        success: false, 
        message: 'Akun ini dinonaktifkan oleh administrator. Hubungi Pimpinan Kesiswaan SMESA.' 
      };
    }

    // Generate secure temporary token (format: SMESA-XXXXXX with 6 uppercase alphanumeric characters)
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const token = `SMESA-${code}`;
    const now = new Date();
    const expiresAt = Date.now() + 15 * 60 * 1000; // Valid for 15 minutes
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const tokens = getFromStorage<PasswordResetToken[]>(KEYS.RESET_TOKENS, []);
    tokens.push({
      token,
      email: user.email,
      expiresAt,
      createdAt: dateStr,
      isUsed: false
    });
    saveToStorage(KEYS.RESET_TOKENS, tokens);

    this.addAuditLog(
      'Permintaan Reset Password', 
      'Autentikasi & Keamanan', 
      user.name, 
      `Token keamanan sementara ${token} dibuat untuk akun ${user.email} (berlaku 15 menit)`
    );

    return {
      success: true,
      message: 'Token keamanan berhasil diterbitkan. Gunakan token ini dalam waktu 15 menit.',
      token,
      expiresAt
    };
  },

  verifyPasswordResetToken(email: string, token: string): { valid: boolean; message: string } {
    const tokens = getFromStorage<PasswordResetToken[]>(KEYS.RESET_TOKENS, []);
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedToken = token.toUpperCase().trim();

    const record = tokens.slice().reverse().find(t => 
      t.email.toLowerCase().trim() === normalizedEmail &&
      t.token.toUpperCase().trim() === normalizedToken
    );

    if (!record) {
      return { valid: false, message: 'Token keamanan tidak valid atau salah ketik. Periksa kembali token Anda.' };
    }

    if (record.isUsed) {
      return { valid: false, message: 'Token keamanan ini telah digunakan sebelumnya. Silakan ajukan token baru.' };
    }

    if (Date.now() > record.expiresAt) {
      return { valid: false, message: 'Token keamanan telah kedaluwarsa (lebih dari 15 menit). Silakan ajukan token baru.' };
    }

    return { valid: true, message: 'Token keamanan valid.' };
  },

  resetPasswordWithToken(email: string, token: string, newPassword: string): { success: boolean; message: string } {
    const tokenCheck = this.verifyPasswordResetToken(email, token);
    if (!tokenCheck.valid) {
      return { success: false, message: tokenCheck.message };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'Kata sandi baru minimal 6 karakter demi standar keamanan akun sekolah.' };
    }

    const accounts = this.getAdminAccounts();
    const user = accounts.find(a => a.email.toLowerCase().trim() === email.toLowerCase().trim());
    if (!user) {
      return { success: false, message: 'Akun administrator tidak ditemukan.' };
    }

    // Update user password
    user.password = newPassword;
    saveToStorage(KEYS.ADMIN_ACCOUNTS, accounts);

    // Mark token as used
    const tokens = getFromStorage<PasswordResetToken[]>(KEYS.RESET_TOKENS, []);
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedToken = token.toUpperCase().trim();
    const record = tokens.slice().reverse().find(t => 
      t.email.toLowerCase().trim() === normalizedEmail &&
      t.token.toUpperCase().trim() === normalizedToken &&
      !t.isUsed
    );
    if (record) {
      record.isUsed = true;
      saveToStorage(KEYS.RESET_TOKENS, tokens);
    }

    this.addAuditLog(
      'Reset Password via Token', 
      'Autentikasi & Keamanan', 
      user.name, 
      `Kata sandi untuk ${user.email} berhasil diperbarui menggunakan token pemulihan sementara.`
    );

    return { 
      success: true, 
      message: 'Kata sandi berhasil diperbarui! Silakan login menggunakan kata sandi baru Anda.' 
    };
  },

  // Reset to initial seed
  resetAllData(): void {
    localStorage.clear();
    saveToStorage(KEYS.PROFILE, INITIAL_SCHOOL_PROFILE);
    saveToStorage(KEYS.NEWS, INITIAL_NEWS);
    saveToStorage(KEYS.AGENDA, INITIAL_AGENDA);
    saveToStorage(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    saveToStorage(KEYS.EXTRAS, INITIAL_EXTRACURRICULARS);
    saveToStorage(KEYS.GALLERY, INITIAL_GALLERY);
    saveToStorage(KEYS.ASPIRATIONS, INITIAL_ASPIRATIONS);
    saveToStorage(KEYS.CONTACTS, INITIAL_CONTACT_MESSAGES);
    saveToStorage(KEYS.ADMIN_ACCOUNTS, DEFAULT_ADMINS);
    saveToStorage(KEYS.OSIS_MPK, INITIAL_OSIS_MPK);
  }
};
