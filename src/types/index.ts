export type NewsCategory = 
  | 'Kegiatan Sekolah'
  | 'Pembinaan Karakter'
  | 'OSIS dan MPK'
  | 'Ekstrakurikuler'
  | 'Prestasi Siswa'
  | 'Lomba dan Kompetisi'
  | 'Kegiatan Sosial'
  | 'Pengumuman Resmi';

export type NewsStatus = 'draft' | 'pending' | 'published' | 'archived';

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  imageUrl: string;
  galleryImages?: string[];
  isFeatured?: boolean;
  isPinned?: boolean;
  status: NewsStatus;
  tags: string[];
  views?: number;
}

export type AgendaCategory = 
  | 'Upacara & Peringatan'
  | 'Kegiatan OSIS & MPK'
  | 'Lomba & Kompetisi'
  | 'Ekstrakurikuler'
  | 'Pembinaan Karakter'
  | 'Kegiatan Sosial'
  | 'Peringatan Hari Besar'
  | 'Kegiatan Akademik Siswa';

export type AgendaStatus = 'akan_datang' | 'berlangsung' | 'selesai';

export interface AgendaItem {
  id: string;
  title: string;
  category: AgendaCategory;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD
  time: string;
  location: string;
  organizer: string;
  description: string;
  posterUrl?: string;
  status: AgendaStatus;
  targetAudience: string;
  contactPerson?: string;
}

export type AchievementCategory = 
  | 'Akademik'
  | 'Olahraga'
  | 'Seni dan Budaya'
  | 'Kompetensi Keahlian'
  | 'Teknologi dan Inovasi'
  | 'Kewirausahaan'
  | 'Organisasi & Kepemimpinan';

export type AchievementLevel = 'Internasional' | 'Nasional' | 'Provinsi' | 'Kabupaten/Kota';

export interface AchievementItem {
  id: string;
  title: string;
  competitionName: string;
  award: string; // e.g. "Juara 1", "Medali Emas", "Juara Harapan 1"
  category: AchievementCategory;
  level: AchievementLevel;
  year: number;
  date: string;
  students: string[]; // nama siswa (yang disetujui publikasi)
  gradeAndMajor: string; // e.g. "XII RPL 1", "XI AKL 2"
  mentors?: string[];
  description: string;
  imageUrl: string;
  certificateUrl?: string;
  featured?: boolean;
}

export type ExtraCategory = 
  | 'Olahraga'
  | 'Seni dan Budaya'
  | 'Kepemimpinan dan Bela Negara'
  | 'Keagamaan'
  | 'Kemanusiaan dan Sosial'
  | 'Teknologi dan Keterampilan';

export interface ExtracurricularItem {
  id: string;
  name: string;
  shortName: string;
  category: ExtraCategory;
  description: string;
  purpose: string;
  leaderName?: string;
  mentorName: string;
  schedule: string;
  location: string;
  achievements: string[];
  imageUrl: string;
  galleryUrls?: string[];
  memberCount: number;
  contactInfo?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 
    | 'Kegiatan Sekolah'
    | 'Upacara & Peringatan'
    | 'OSIS dan MPK'
    | 'Ekstrakurikuler'
    | 'Lomba dan Prestasi'
    | 'Kegiatan Sosial'
    | 'Pembinaan Karakter';
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  date: string;
  year: number;
  photographer?: string;
}

export interface StudentAspiration {
  id: string;
  ticketNumber: string;
  name: string;
  isAnonymous: boolean;
  studentClass?: string;
  category: 'Fasilitas Kesiswaan' | 'Kegiatan Siswa' | 'Ekstrakurikuler' | 'Ketertiban & Disiplin' | 'Inovasi & Ide' | 'Lainnya';
  title: string;
  content: string;
  createdAt: string;
  status: 'menunggu_review' | 'disetujui' | 'ditindaklanjuti' | 'ditolak';
  adminResponse?: string;
  respondedAt?: string;
}

export interface ContactMessage {
  id: string;
  ticketNumber: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  topic: 'Informasi Kesiswaan' | 'Prestasi Siswa' | 'Ekstrakurikuler' | 'Izin & Kerjasama Lomba' | 'Pengaduan Siswa' | 'Umum';
  message: string;
  createdAt: string;
  isRead: boolean;
  status: 'baru' | 'dibalas' | 'arsip';
}

export type AdminRole = 
  | 'Administrator'
  | 'Tim Kesiswaan'
  | 'Super Admin' 
  | 'Editor Kesiswaan' 
  | 'Kontributor Berita';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  password?: string;
  status?: 'aktif' | 'nonaktif';
  phone?: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface PasswordResetToken {
  token: string;
  email: string;
  expiresAt: number;
  createdAt: string;
  isUsed: boolean;
}

export interface AuditLog {
  id: string;
  action: string;
  module: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

export interface SchoolProfileData {
  schoolName: string;
  tagline: string;
  wakaName: string;
  wakaTitle: string;
  wakaGreeting: string;
  wakaPhoto: string;
  vision: string;
  missions: string[];
  disciplineCulture: {
    title: string;
    description: string;
    points: string[];
  };
  runningAnnouncement: string;
}
