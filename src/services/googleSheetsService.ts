import { StorageService } from './storageService';

export interface GoogleSheetsConfig {
  webAppUrl: string;
  spreadsheetUrl?: string;
  spreadsheetId?: string;
  autoSync: boolean;
  lastSyncTime?: string | null;
  syncStatus: 'idle' | 'connected' | 'error' | 'syncing';
  lastErrorMessage?: string | null;
}

export interface TableSummaryItem {
  id: string;
  tableName: string;
  label: string;
  category: string;
  columnsCount: number;
  rowCount: number;
  description: string;
}

const CONFIG_KEY = 'smesa_googlesheets_config_v1';

const DEFAULT_CONFIG: GoogleSheetsConfig = {
  webAppUrl: '',
  spreadsheetUrl: '',
  spreadsheetId: '',
  autoSync: false,
  lastSyncTime: null,
  syncStatus: 'idle',
  lastErrorMessage: null
};

export const GoogleSheetsService = {
  getSettings(): GoogleSheetsConfig {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load Google Sheets config:', e);
    }
    return DEFAULT_CONFIG;
  },

  saveSettings(settings: Partial<GoogleSheetsConfig>): GoogleSheetsConfig {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save Google Sheets config:', e);
    }
    return updated;
  },

  async testConnection(customUrl?: string): Promise<{ success: boolean; message: string; details?: any }> {
    const url = (customUrl || this.getSettings().webAppUrl).trim();
    if (!url) {
      return { success: false, message: 'URL Google Apps Script Web App belum diisi.' };
    }

    try {
      // Use text/plain mode with no preflight CORS issues
      const res = await fetch(`${url}?action=ping`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (data && data.status === 'success') {
        this.saveSettings({
          webAppUrl: url,
          syncStatus: 'connected',
          spreadsheetId: data.spreadsheetId || '',
          lastErrorMessage: null
        });
        return {
          success: true,
          message: data.message || 'Koneksi ke Google Apps Script berhasil terhubung!',
          details: data
        };
      } else {
        throw new Error(data.message || 'Respon dari Apps Script tidak valid.');
      }
    } catch (err: any) {
      const errMsg = err.message || 'Gagal menghubungi Google Apps Script Web App.';
      this.saveSettings({
        syncStatus: 'error',
        lastErrorMessage: errMsg
      });
      return { success: false, message: errMsg };
    }
  },

  async initSpreadsheet(customUrl?: string): Promise<{ success: boolean; message: string }> {
    const url = (customUrl || this.getSettings().webAppUrl).trim();
    if (!url) {
      return { success: false, message: 'URL Google Apps Script Web App belum diisi.' };
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({ action: 'initSpreadsheet' })
      });

      const data = await res.json();
      if (data && data.status === 'success') {
        return { success: true, message: data.message || 'Seluruh tabel Google Sheets berhasil dibuat!' };
      }
      throw new Error(data.message || 'Gagal inisialisasi lembar.');
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal inisialisasi spreadsheet.' };
    }
  },

  getAllDatabaseTablesData() {
    const profile = StorageService.getProfile();
    const osis = StorageService.getOsisMpk();

    return {
      tbl_profil: [
        {
          id: 'smesa-profile-main',
          schoolName: profile.schoolName,
          tagline: profile.tagline,
          wakaName: profile.wakaName,
          wakaTitle: profile.wakaTitle,
          wakaGreeting: profile.wakaGreeting,
          wakaPhoto: profile.wakaPhoto,
          vision: profile.vision,
          missions: profile.missions,
          overview: profile.overview || '',
          rolesAndFunctions: profile.rolesAndFunctions || [],
          disciplineTitle: profile.disciplineCulture?.title || '',
          disciplinePoints: profile.disciplineCulture?.points || [],
          runningAnnouncement: profile.runningAnnouncement,
          updatedAt: new Date().toISOString()
        }
      ],
      tbl_agenda_proker: (profile.annualPrograms || []).map(p => ({ ...p, updatedAt: new Date().toISOString() })),
      tbl_struktur_kesiswaan: (profile.organizationalStructure || []).map(s => ({ ...s, updatedAt: new Date().toISOString() })),
      tbl_unduhan_dokumen: (profile.publicDocuments || []).map(d => ({ ...d, updatedAt: new Date().toISOString() })),
      tbl_berita: StorageService.getNews().map(n => ({ ...n, updatedAt: new Date().toISOString() })),
      tbl_agenda_siswa: StorageService.getAgenda().map(a => ({ ...a, updatedAt: new Date().toISOString() })),
      tbl_prestasi: StorageService.getAchievements().map(ac => ({ ...ac, updatedAt: new Date().toISOString() })),
      tbl_ekstrakurikuler: StorageService.getExtracurriculars().map(e => ({ ...e, updatedAt: new Date().toISOString() })),
      tbl_galeri: StorageService.getGallery().map(g => ({ ...g, updatedAt: new Date().toISOString() })),
      tbl_osis_mpk: [
        {
          id: 'smesa-osis-mpk-main',
          period: osis.osisPeriod,
          cabinetName: osis.cabinetName,
          chiefName: osis.chiefName,
          chiefClass: osis.chiefClass,
          chiefAvatar: osis.chiefAvatar,
          viceChiefName: osis.viceChiefName,
          viceChiefClass: osis.viceChiefClass,
          viceChiefAvatar: osis.viceChiefAvatar,
          osisVision: osis.osisVision,
          osisMissions: osis.osisMissions,
          osisDescription: osis.osisDescription,
          mpkChiefName: osis.mpkChiefName,
          mpkChiefClass: osis.mpkChiefClass,
          mpkDescription: osis.mpkDescription,
          updatedAt: new Date().toISOString()
        }
      ],
      tbl_osis_proker: (osis.prokers || []).map((op: any) => ({ ...op, updatedAt: new Date().toISOString() })),
      tbl_osis_sekbid: (osis.sekbids || []).map((os: any) => ({ ...os, updatedAt: new Date().toISOString() })),
      tbl_mpk_komisi: (osis.mpkCommissions || []).map((mk: any) => ({ ...mk, updatedAt: new Date().toISOString() })),
      tbl_pilketos_stages: (osis.pilketosStages || []).map((ps: any) => ({ ...ps, updatedAt: new Date().toISOString() })),
      tbl_aspirasi_siswa: StorageService.getAspirations().map(asp => ({ ...asp, updatedAt: new Date().toISOString() })),
      tbl_pesan_kontak: StorageService.getContactMessages().map(c => ({ ...c, updatedAt: new Date().toISOString() })),
      tbl_akun_pengguna: StorageService.getAdminAccounts().map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        avatar: u.avatar,
        status: u.status || 'aktif',
        phone: u.phone || '-',
        createdAt: u.createdAt || '',
        lastLogin: u.lastLogin || '',
        updatedAt: new Date().toISOString()
      })),
      tbl_log_audit: StorageService.getAuditLogs().map(l => ({ ...l, updatedAt: new Date().toISOString() }))
    };
  },

  async syncAllToGoogleSheets(): Promise<{ success: boolean; message: string; details?: any }> {
    const config = this.getSettings();
    if (!config.webAppUrl) {
      return { success: false, message: 'URL Google Apps Script belum dikonfigurasi.' };
    }

    this.saveSettings({ syncStatus: 'syncing' });

    try {
      const allData = this.getAllDatabaseTablesData();
      const res = await fetch(config.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          action: 'syncAll',
          data: allData
        })
      });

      const result = await res.json();
      if (result && result.status === 'success') {
        const now = new Date().toLocaleString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        this.saveSettings({
          syncStatus: 'connected',
          lastSyncTime: now,
          lastErrorMessage: null
        });
        return {
          success: true,
          message: 'Berhasil menyinkronkan seluruh 18 tabel database ke Google Sheets.',
          details: result
        };
      } else {
        throw new Error(result.message || 'Gagal sinkronisasi ke Google Sheets.');
      }
    } catch (err: any) {
      const msg = err.message || 'Gagal terhubung saat sinkronisasi.';
      this.saveSettings({
        syncStatus: 'error',
        lastErrorMessage: msg
      });
      return { success: false, message: msg };
    }
  },

  async syncAllFromGoogleSheets(): Promise<{ success: boolean; message: string; details?: any }> {
    const config = this.getSettings();
    if (!config.webAppUrl) {
      return { success: false, message: 'URL Google Apps Script belum dikonfigurasi.' };
    }

    this.saveSettings({ syncStatus: 'syncing' });

    try {
      const res = await fetch(`${config.webAppUrl}?action=getAll`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await res.json();
      if (result && result.status === 'success' && result.data) {
        const d = result.data;

        // Apply to local storage if data exists
        if (d.tbl_berita && Array.isArray(d.tbl_berita) && d.tbl_berita.length > 0) {
          localStorage.setItem('smesa_news_v1', JSON.stringify(d.tbl_berita));
        }
        if (d.tbl_agenda_siswa && Array.isArray(d.tbl_agenda_siswa) && d.tbl_agenda_siswa.length > 0) {
          localStorage.setItem('smesa_agenda_v1', JSON.stringify(d.tbl_agenda_siswa));
        }
        if (d.tbl_prestasi && Array.isArray(d.tbl_prestasi) && d.tbl_prestasi.length > 0) {
          localStorage.setItem('smesa_achievements_v1', JSON.stringify(d.tbl_prestasi));
        }
        if (d.tbl_ekstrakurikuler && Array.isArray(d.tbl_ekstrakurikuler) && d.tbl_ekstrakurikuler.length > 0) {
          localStorage.setItem('smesa_extras_v1', JSON.stringify(d.tbl_ekstrakurikuler));
        }
        if (d.tbl_galeri && Array.isArray(d.tbl_galeri) && d.tbl_galeri.length > 0) {
          localStorage.setItem('smesa_gallery_v1', JSON.stringify(d.tbl_galeri));
        }
        if (d.tbl_aspirasi_siswa && Array.isArray(d.tbl_aspirasi_siswa)) {
          localStorage.setItem('smesa_aspirations_v1', JSON.stringify(d.tbl_aspirasi_siswa));
        }
        if (d.tbl_pesan_kontak && Array.isArray(d.tbl_pesan_kontak)) {
          localStorage.setItem('smesa_contacts_v1', JSON.stringify(d.tbl_pesan_kontak));
        }
        if (d.tbl_akun_pengguna && Array.isArray(d.tbl_akun_pengguna) && d.tbl_akun_pengguna.length > 0) {
          localStorage.setItem('smesa_admin_accounts_v2', JSON.stringify(d.tbl_akun_pengguna));
        }

        // Apply profile updates if present
        const currentProfile = StorageService.getProfile();
        let updatedProfile = { ...currentProfile };

        if (d.tbl_profil && Array.isArray(d.tbl_profil) && d.tbl_profil.length > 0) {
          const p = d.tbl_profil[0];
          updatedProfile = {
            ...updatedProfile,
            schoolName: p.schoolName || updatedProfile.schoolName,
            tagline: p.tagline || updatedProfile.tagline,
            wakaName: p.wakaName || updatedProfile.wakaName,
            wakaTitle: p.wakaTitle || updatedProfile.wakaTitle,
            wakaGreeting: p.wakaGreeting || updatedProfile.wakaGreeting,
            wakaPhoto: p.wakaPhoto || updatedProfile.wakaPhoto,
            vision: p.vision || updatedProfile.vision,
            missions: Array.isArray(p.missions) ? p.missions : updatedProfile.missions,
            overview: p.overview || updatedProfile.overview,
            rolesAndFunctions: Array.isArray(p.rolesAndFunctions) ? p.rolesAndFunctions : updatedProfile.rolesAndFunctions,
            runningAnnouncement: p.runningAnnouncement || updatedProfile.runningAnnouncement
          };
        }

        if (d.tbl_agenda_proker && Array.isArray(d.tbl_agenda_proker) && d.tbl_agenda_proker.length > 0) {
          updatedProfile.annualPrograms = d.tbl_agenda_proker;
        }
        if (d.tbl_struktur_kesiswaan && Array.isArray(d.tbl_struktur_kesiswaan) && d.tbl_struktur_kesiswaan.length > 0) {
          updatedProfile.organizationalStructure = d.tbl_struktur_kesiswaan;
        }
        if (d.tbl_unduhan_dokumen && Array.isArray(d.tbl_unduhan_dokumen) && d.tbl_unduhan_dokumen.length > 0) {
          updatedProfile.publicDocuments = d.tbl_unduhan_dokumen;
        }
        localStorage.setItem('smesa_profile_v2', JSON.stringify(updatedProfile));

        // Apply OSIS MPK updates if present
        const currentOsis = StorageService.getOsisMpk();
        let updatedOsis = { ...currentOsis };
        if (d.tbl_osis_mpk && Array.isArray(d.tbl_osis_mpk) && d.tbl_osis_mpk.length > 0) {
          const o = d.tbl_osis_mpk[0];
          updatedOsis = {
            ...updatedOsis,
            osisPeriod: o.period || o.osisPeriod || updatedOsis.osisPeriod,
            cabinetName: o.cabinetName || updatedOsis.cabinetName,
            chiefName: o.chiefName || updatedOsis.chiefName,
            chiefClass: o.chiefClass || updatedOsis.chiefClass,
            chiefAvatar: o.chiefAvatar || updatedOsis.chiefAvatar,
            viceChiefName: o.viceChiefName || updatedOsis.viceChiefName,
            viceChiefClass: o.viceChiefClass || updatedOsis.viceChiefClass,
            viceChiefAvatar: o.viceChiefAvatar || updatedOsis.viceChiefAvatar,
            osisVision: o.osisVision || updatedOsis.osisVision,
            osisMissions: Array.isArray(o.osisMissions) ? o.osisMissions : updatedOsis.osisMissions,
            osisDescription: o.osisDescription || updatedOsis.osisDescription,
            mpkChiefName: o.mpkChiefName || updatedOsis.mpkChiefName,
            mpkChiefClass: o.mpkChiefClass || updatedOsis.mpkChiefClass,
            mpkDescription: o.mpkDescription || updatedOsis.mpkDescription
          };
        }
        if (d.tbl_osis_proker && Array.isArray(d.tbl_osis_proker)) {
          updatedOsis.prokers = d.tbl_osis_proker;
        }
        if (d.tbl_osis_sekbid && Array.isArray(d.tbl_osis_sekbid)) {
          updatedOsis.sekbids = d.tbl_osis_sekbid;
        }
        if (d.tbl_mpk_komisi && Array.isArray(d.tbl_mpk_komisi)) {
          updatedOsis.mpkCommissions = d.tbl_mpk_komisi;
        }
        if (d.tbl_pilketos_stages && Array.isArray(d.tbl_pilketos_stages)) {
          updatedOsis.pilketosStages = d.tbl_pilketos_stages;
        }
        localStorage.setItem('smesa_osis_mpk_v1', JSON.stringify(updatedOsis));

        const now = new Date().toLocaleString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        this.saveSettings({
          syncStatus: 'connected',
          lastSyncTime: now,
          lastErrorMessage: null
        });

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('smesa_data_mutated', { detail: { key: 'ALL_SYNCED' } }));
        }

        return {
          success: true,
          message: 'Data 18 tabel berhasil ditarik dari Google Sheets ke database lokal aplikasi.',
          details: result
        };
      } else {
        throw new Error(result.message || 'Tidak ada data yang dapat ditarik.');
      }
    } catch (err: any) {
      const msg = err.message || 'Gagal menarik data dari Google Sheets.';
      this.saveSettings({
        syncStatus: 'error',
        lastErrorMessage: msg
      });
      return { success: false, message: msg };
    }
  },

  triggerAutoSync() {
    const config = this.getSettings();
    if (config.autoSync && config.webAppUrl) {
      // Run non-blocking background sync
      setTimeout(() => {
        this.syncAllToGoogleSheets().catch(err => {
          console.warn('Auto-sync to Google Sheets failed:', err);
        });
      }, 500);
    }
  },

  getTableSummaries(): TableSummaryItem[] {
    const data = this.getAllDatabaseTablesData();

    return [
      {
        id: 'tbl_profil',
        tableName: 'tbl_profil',
        label: 'Profil Resmi Kesiswaan & Visi Misi',
        category: 'Profil',
        columnsCount: 15,
        rowCount: data.tbl_profil.length,
        description: 'Visi, misi, sambutan Waka, overview, 5 peran tanggung jawab, & budaya 5S'
      },
      {
        id: 'tbl_agenda_proker',
        tableName: 'tbl_agenda_proker',
        label: 'Agenda Program Kerja Tahunan',
        category: 'Profil',
        columnsCount: 8,
        rowCount: data.tbl_agenda_proker.length,
        description: 'Daftar proker tahunan pembinaan, MPLS, LDKS, dan status pelaksanaan'
      },
      {
        id: 'tbl_struktur_kesiswaan',
        tableName: 'tbl_struktur_kesiswaan',
        label: 'Struktur Organisasi Kesiswaan',
        category: 'Profil',
        columnsCount: 7,
        rowCount: data.tbl_struktur_kesiswaan.length,
        description: 'Susunan tim pembina kesiswaan, staf tatib, pendamping ekstra, foto & peran'
      },
      {
        id: 'tbl_unduhan_dokumen',
        tableName: 'tbl_unduhan_dokumen',
        label: 'Unduhan Dokumen Publik',
        category: 'Profil',
        columnsCount: 8,
        rowCount: data.tbl_unduhan_dokumen.length,
        description: 'Tata tertib, SOP dispensasi kejuaraan, formulir izin, & pedoman organisasi'
      },
      {
        id: 'tbl_berita',
        tableName: 'tbl_berita',
        label: 'Warta & Berita Kesiswaan',
        category: 'Publikasi',
        columnsCount: 15,
        rowCount: data.tbl_berita.length,
        description: 'Artikel warta kegiatan sekolah, prestasi, tags, dan status publikasi'
      },
      {
        id: 'tbl_agenda_siswa',
        tableName: 'tbl_agenda_siswa',
        label: 'Agenda & Kalender Kegiatan Siswa',
        category: 'Kegiatan',
        columnsCount: 14,
        rowCount: data.tbl_agenda_siswa.length,
        description: 'Jadwal apel, rapat OSIS, kompetisi, waktu, lokasi, & sasaran peserta'
      },
      {
        id: 'tbl_prestasi',
        tableName: 'tbl_prestasi',
        label: 'Prestasi Siswa (SMESA JUARA)',
        category: 'Prestasi',
        columnsCount: 14,
        rowCount: data.tbl_prestasi.length,
        description: 'Kejuaraan kota, provinsi, nasional, nama siswa, kompetensi keahlian'
      },
      {
        id: 'tbl_ekstrakurikuler',
        tableName: 'tbl_ekstrakurikuler',
        label: '22 Ekstrakurikuler Sekolah',
        category: 'Kegiatan',
        columnsCount: 13,
        rowCount: data.tbl_ekstrakurikuler.length,
        description: 'Nama ekskul, pelatih/pembina, jadwal latihan, lokasi, & jumlah anggota'
      },
      {
        id: 'tbl_galeri',
        tableName: 'tbl_galeri',
        label: 'Galeri Dokumentasi Kegiatan',
        category: 'Dokumentasi',
        columnsCount: 10,
        rowCount: data.tbl_galeri.length,
        description: 'Foto & dokumentasi kegiatan resmi, kategori, fotografer, & tanggal'
      },
      {
        id: 'tbl_osis_mpk',
        tableName: 'tbl_osis_mpk',
        label: 'Profil Kepengurusan OSIS & MPK',
        category: 'Organisasi',
        columnsCount: 16,
        rowCount: data.tbl_osis_mpk.length,
        description: 'Visi misi OSIS, kabinet, data Ketua/Wakil OSIS, & Ketua MPK'
      },
      {
        id: 'tbl_osis_proker',
        tableName: 'tbl_osis_proker',
        label: 'Program Kerja Divisi OSIS',
        category: 'Organisasi',
        columnsCount: 7,
        rowCount: data.tbl_osis_proker.length,
        description: 'Proker per divisi OSIS, target bulan pelaksanaan, & status proker'
      },
      {
        id: 'tbl_osis_sekbid',
        tableName: 'tbl_osis_sekbid',
        label: 'Seksi Bidang OSIS (Sekbid 1 - 10)',
        category: 'Organisasi',
        columnsCount: 6,
        rowCount: data.tbl_osis_sekbid.length,
        description: 'Daftar 10 Sekbid OSIS SMESA, koordinator, dan ruang lingkup kerja'
      },
      {
        id: 'tbl_mpk_komisi',
        tableName: 'tbl_mpk_komisi',
        label: 'Komisi Perwakilan Kelas (MPK)',
        category: 'Organisasi',
        columnsCount: 5,
        rowCount: data.tbl_mpk_komisi.length,
        description: 'Komisi A (Aspirasi), B (Pengawasan), C (Hukum & Tatib) fungsionaris MPK'
      },
      {
        id: 'tbl_pilketos_stages',
        tableName: 'tbl_pilketos_stages',
        label: 'Tahapan Pemilihan Ketua OSIS',
        category: 'Organisasi',
        columnsCount: 6,
        rowCount: data.tbl_pilketos_stages.length,
        description: 'Timeline seleksi berkas, debat kandidat, pemungutan suara pilketos'
      },
      {
        id: 'tbl_aspirasi_siswa',
        tableName: 'tbl_aspirasi_siswa',
        label: 'Kotak Aspirasi & Suara Siswa',
        category: 'Interaksi',
        columnsCount: 13,
        rowCount: data.tbl_aspirasi_siswa.length,
        description: 'Nomor tiket, nama/anonim, kategori aspirasi, status, & respon admin'
      },
      {
        id: 'tbl_pesan_kontak',
        tableName: 'tbl_pesan_kontak',
        label: 'Pesan Masuk Buku Tamu / Kontak',
        category: 'Interaksi',
        columnsCount: 12,
        rowCount: data.tbl_pesan_kontak.length,
        description: 'Pesan dari wali murid / masyarakat umum, topik, email, nomor HP'
      },
      {
        id: 'tbl_akun_pengguna',
        tableName: 'tbl_akun_pengguna',
        label: 'Akun Pengelola & Staf Kesiswaan',
        category: 'Keamanan',
        columnsCount: 10,
        rowCount: data.tbl_akun_pengguna.length,
        description: 'Daftar administrator dan tim kesiswaan terdaftar beserta peran'
      },
      {
        id: 'tbl_log_audit',
        tableName: 'tbl_log_audit',
        label: 'Log Riwayat Audit Sistem',
        category: 'Keamanan',
        columnsCount: 6,
        rowCount: data.tbl_log_audit.length,
        description: 'Jejak rekam penambahan, pengubahan, & penghapusan konten oleh staf'
      }
    ];
  },

  exportTableToCsv(tableName: string) {
    const data = this.getAllDatabaseTablesData();
    const rows = (data as any)[tableName] || [];
    if (rows.length === 0) {
      alert(`Tabel "${tableName}" belum memiliki data untuk diekspor.`);
      return;
    }

    const headers = Object.keys(rows[0]);
    const csvLines = [headers.join(',')];

    for (const row of rows) {
      const values = headers.map(h => {
        let val = row[h];
        if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        if (val === undefined || val === null) {
          val = '';
        }
        val = String(val).replace(/"/g, '""');
        return `"${val}"`;
      });
      csvLines.push(values.join(','));
    }

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${tableName}_smesa_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportAllDatabaseToJson() {
    const allData = this.getAllDatabaseTablesData();
    const payload = {
      app: 'Kesiswaan SMK Negeri 1 Jember',
      exportedAt: new Date().toISOString(),
      tablesCount: Object.keys(allData).length,
      database: allData
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `database_kesiswaan_smesa_full_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportAllDatabaseToSql() {
    const allData = this.getAllDatabaseTablesData();
    const lines: string[] = [
      '--',
      '-- Database Export: Kesiswaan SMK Negeri 1 Jember (SMESA)',
      `-- Generated: ${new Date().toISOString()}`,
      '--',
      ''
    ];

    for (const [tableName, rows] of Object.entries(allData)) {
      if (!Array.isArray(rows) || rows.length === 0) continue;

      const cols = Object.keys(rows[0]);
      lines.push(`-- Table: ${tableName}`);
      lines.push(`CREATE TABLE IF NOT EXISTS ${tableName} (`);
      lines.push(cols.map(c => `  ${c} TEXT`).join(',\n'));
      lines.push(');');
      lines.push('');

      for (const row of rows) {
        const vals = cols.map(c => {
          let v = (row as any)[c];
          if (typeof v === 'object' && v !== null) v = JSON.stringify(v);
          if (v === undefined || v === null) return 'NULL';
          v = String(v).replace(/'/g, "''");
          return `'${v}'`;
        });
        lines.push(`INSERT INTO ${tableName} (${cols.join(', ')}) VALUES (${vals.join(', ')});`);
      }
      lines.push('');
    }

    const blob = new Blob([lines.join('\n')], { type: 'application/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `database_kesiswaan_smesa_dump_${new Date().toISOString().slice(0, 10)}.sql`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
