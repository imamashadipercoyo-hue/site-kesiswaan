import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  ExternalLink,
  Award,
  ChevronRight
} from 'lucide-react';
import { SchoolLogo } from '../common/SchoolLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-amber-500">
      {/* Anti-Bullying and Student Safety Banner */}
      <div className="bg-blue-950/80 border-b border-blue-900/50 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-200">
            <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong className="text-white">Komitmen Sekolah Ramah Anak & Anti-Perundungan:</strong>{' '}
              SMESA menjamin ruang belajar yang aman, inklusif, dan bebas dari intimidasi.
            </span>
          </div>
          <button
            onClick={() => onNavigate('osis-mpk')}
            className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white font-semibold transition-colors cursor-pointer shrink-0"
          >
            <span>Sampaikan Aspirasi Siswa</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <SchoolLogo size="lg" />
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">
                  KESISWAAN SMESA
                </h3>
                <p className="text-xs font-semibold text-slate-300">SMK NEGERI 1 JEMBER</p>
                <p className="text-[11px] text-amber-400 font-medium mt-0.5">
                  Disiplin · Berkarakter · Berprestasi
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Portal informasi resmi kegiatan peserta didik, pembinaan karakter, prestasi, organisasi siswa, dan ekstrakurikuler di bawah naungan Wakil Kepala Sekolah Bidang Kesiswaan SMK Negeri 1 Jember.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Terakreditasi A · SMK Pusat Keunggulan</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'beranda', label: 'Beranda Utama' },
                { id: 'profil', label: 'Profil & Pembinaan Kesiswaan' },
                { id: 'berita', label: 'Berita & Pengumuman Resmi' },
                { id: 'agenda', label: 'Kalender & Agenda Kegiatan' },
                { id: 'prestasi', label: 'Etalase Prestasi (SMESA JUARA)' },
                { id: 'osis-mpk', label: 'OSIS & MPK SMESA' },
                { id: 'ekstra', label: 'Katalog 22 Ekstrakurikuler' },
                { id: 'galeri', label: 'Galeri Foto & Video Kegiatan' },
                { id: 'kontak', label: 'Kontak & Lokasi Sekolah' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 text-slate-400 hover:translate-x-1 duration-150 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Program & Pembinaan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Arah Pembinaan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Pembinaan Kedisiplinan & Budaya 5S Harian</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Penguatan Karakter Profil Pelajar Pancasila</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Pembinaan Talenta LKS, O2SN, dan FLS2N</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Pengkaderan Demokrasi Pelajar PEMILOS Digital</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Aksi Solidaritas Sosial & Relawan Siswa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Digitalisasi Pelayanan Kesiswaan & Portofolio Siswa</span>
              </li>
            </ul>

            <div className="pt-3">
              <button
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-2 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 px-3 py-2 rounded border border-slate-800 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Login Administrator Kesiswaan</span>
              </button>
            </div>
          </div>

          {/* Col 4: Official Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Sekretariat Kesiswaan
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">SMK Negeri 1 Jember</p>
                  <p>Jalan Jambu No. 17, Kel. Patrang, Kec. Patrang, Kabupaten Jember, Jawa Timur 68118</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Telepon: (0331) 486110 / 486112</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Email: kesiswaan@smesa.sch.id</span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-300">Jam Layanan Kesiswaan:</p>
                  <p>Senin – Kamis: 07.00 – 15.30 WIB</p>
                  <p>Jumat: 07.00 – 11.30 & 13.00 – 15.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Legal disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            <strong>Privasi & Keamanan Data Siswa:</strong> Website publik Kesiswaan SMK Negeri 1 Jember mematuhi prinsip perlindungan privasi peserta didik. Data nilai individual, nomor identitas pribadi siswa, catatan konseling pribadi, atau rekam pelanggaran tidak dipublikasikan pada sistem publik ini.
          </p>
          <div className="shrink-0 text-slate-400">
            <span>© {new Date().getFullYear()} Bidang Kesiswaan SMK Negeri 1 Jember</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
