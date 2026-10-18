import React, { useState } from 'react';
import { 
  Shield, 
  Target, 
  Compass, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  Award, 
  HeartHandshake, 
  Calendar,
  FileText,
  FileCheck,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { SchoolProfileData } from '../../types';

interface ProfilePageProps {
  profile: SchoolProfileData;
  onNavigate: (tab: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onNavigate }) => {
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const handleDownload = (docName: string) => {
    setDownloadNotification(`Mengunduh dokumen: "${docName}"...`);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  const organizationalStructure = [
    {
      title: 'Wakil Kepala Sekolah Bidang Kesiswaan',
      name: profile.wakaName,
      role: 'Penanggung Jawab Kebijakan & Pembinaan Kesiswaan',
      avatar: profile.wakaPhoto,
      desc: 'Memimpin perencanaan, pelaksanaan pembinaan kedisiplinan, koordinasi organisasi siswa, pembinaan prestasi, dan hubungan kemitraan kesiswaan.'
    },
    {
      title: 'Staf Pembina OSIS & MPK',
      name: 'Dedy Kurniawan, S.Pd.',
      role: 'Koordinator Kepengurusan & Demokrasi Siswa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      desc: 'Mendampingi regenerasi pengurus OSIS/MPK, manajemen agenda kerja, pelaksanaan PEMILOS, dan ruang aspirasi siswa.'
    },
    {
      title: 'Koordinator Ekstrakurikuler',
      name: 'Dewi Anggraeni, S.Sn.',
      role: 'Pengembangan Minat, Bakat & Gelar Karya',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      desc: 'Mengkoordinir 22 cabang ekstrakurikuler, evaluasi pembina, penjadwalan latihan, dan pementasan seni budaya.'
    },
    {
      title: 'Ketua Tim Ketertiban & Disiplin Karakter',
      name: 'Budi Santoso, S.Pd.',
      role: 'Penegakan Tata Tertib & Budaya 5S SMESA',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      desc: 'Mengawal ketertiban harian, apel pagi, kepatuhan seragam, pembinaan kedisiplinan humanis, dan pengawasan gerbang.'
    },
    {
      title: 'Koordinator SMESA JUARA & Lomba',
      name: 'Ahmad Fauzi, S.Kom.',
      role: 'Pemusatan Latihan & Talenta Berprestasi',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
      desc: 'Memfasilitasi kontingen lomba kejuruan LKS, O2SN, FLS2N, administrasi dispensasi, dan sertifikasi pendamping ijazah (SKPI).'
    },
    {
      title: 'Koordinator Bimbingan Konseling & Layanan Karakter',
      name: 'Dra. Hj. Sri Wahyuni, M.Psi.',
      role: 'Konseling Preventif & Satgas Sekolah Ramah Anak',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=400&auto=format&fit=crop',
      desc: 'Memberikan layanan bimbingan pribadi-sosial, pendampingan karir, serta pencegahan perundungan di lingkungan sekolah.'
    }
  ];

  const publicDocuments = [
    {
      title: 'Buku Pedoman Tata Tertib & Karakter Siswa SMESA 2026/2027',
      category: 'Tata Tertib Resmi',
      format: 'PDF',
      size: '2.4 MB',
      updated: 'Oktober 2026'
    },
    {
      title: 'Formulir Permohonan Izin & Dispensasi Resmi Mengikuti Lomba',
      category: 'Administrasi Lomba',
      format: 'DOCX / PDF',
      size: '450 KB',
      updated: 'September 2026'
    },
    {
      title: 'Buku Panduan & Anggaran Dasar Organisasi Siswa OSIS & MPK',
      category: 'Pedoman Organisasi',
      format: 'PDF',
      size: '1.8 MB',
      updated: 'Agustus 2026'
    },
    {
      title: 'Katalog Jadwal & Tata Cara Registrasi 22 Ekstrakurikuler SMESA',
      category: 'Panduan Ekstra',
      format: 'PDF',
      size: '3.1 MB',
      updated: 'Juli 2026'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Download toast notification */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-amber-500/40 flex items-center gap-2.5 animate-fadeIn">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>{downloadNotification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded">
            <Shield className="w-3.5 h-3.5" />
            <span>Profil Resmi Kesiswaan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Bidang Kesiswaan SMK Negeri 1 Jember
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Unit pengelola pembinaan karakter, penegakan kedisiplinan, pengembangan potensi minat bakat, organisasi peserta didik, dan pendampingan prestasi SMESA.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-16">
        {/* Gambaran Umum & Peran Fungsi */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Tentang Kami
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Gambaran Umum & Peran Kesiswaan
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Bidang Kesiswaan SMK Negeri 1 Jember merupakan unit kerja strategis di bawah kepemimpinan Kepala Sekolah yang secara khusus bertugas merancang, mengawal, dan mengevaluasi seluruh kebijakan pembinaan peserta didik selama menempuh pendidikan di SMESA.
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Fungsi & Tanggung Jawab Utama:
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <span><strong>Pembinaan Karakter & Budi Pekerti:</strong> Menerapkan pembiasaan 5S, kedisiplinan berkeadilan, dan nilai Profil Pelajar Pancasila.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <span><strong>Pengawalan Organisasi Siswa:</strong> Membina kemandirian fungsionaris OSIS, MPK, dan kepanitiaan kegiatan siswa.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <span><strong>Pengembangan 22 Ekstrakurikuler:</strong> Memfasilitasi sarana latihan, regenerasi anggota, dan kompetisi unjuk karya.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <span><strong>Akselerasi Prestasi Lomba (SMESA JUARA):</strong> Membina kontingen kompetisi kejuruan LKS, O2SN, FLS2N, hingga level nasional.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <span><strong>Perlindungan Siswa & Lingkungan Aman:</strong> Mencegah tindak kekerasan, perundungan siber, dan menciptakan rasa aman inklusif.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Visi dan Misi */}
          <div className="lg:col-span-5 bg-blue-950 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-blue-900">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span>Arah Kebijakan</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Visi & Misi Kesiswaan
              </h2>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-blue-900/60 space-y-2">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Visi Kesiswaan SMESA:
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{profile.vision}"
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Misi Pembinaan:
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {profile.missions.map((mission, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-amber-400">{idx + 1}.</span>
                    <span className="leading-relaxed">{mission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Budaya Disiplin 5S Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Pembiasaan Harian
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {profile.disciplineCulture.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {profile.disciplineCulture.description}
            </p>
          </div>

          {/* 5S Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { letter: 'S', word: 'Senyum', desc: 'Menghadirkan kehangatan dan ketulusan dalam setiap perjumpaan.' },
              { letter: 'S', word: 'Salam', desc: 'Menyapa dengan doa keselamatan dan penghormatan kepada sesama.' },
              { letter: 'S', word: 'Sapa', desc: 'Membangun komunikasi ramah dan mempererat persaudaraan pelajar.' },
              { letter: 'S', word: 'Sopan', desc: 'Menjaga tata krama, etika berpakaian, dan sikap menghormati.' },
              { letter: 'S', word: 'Santun', desc: 'Berbicara dengan tutur kata yang santun, tertib, dan tidak menyakiti.' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-2 hover:border-amber-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-950 text-amber-400 font-black text-lg mx-auto flex items-center justify-center">
                  {item.letter}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.word}</h3>
                <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-5 space-y-2.5">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-700" />
              <span>Ketentuan Inti Budaya Disiplin Peserta Didik SMESA:</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-amber-950">
              {profile.disciplineCulture.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Struktur Organisasi Kesiswaan */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Pengelola Kesiswaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Struktur Organisasi Kesiswaan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Susunan tim pembina kesiswaan yang senantiasa mendampingi perjalanan akademik dan kepribadian peserta didik di SMK Negeri 1 Jember.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizationalStructure.map((staff, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 group-hover:border-amber-400 transition-colors"
                    />
                    <div>
                      <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                        {staff.title}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {staff.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{staff.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {staff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unduhan Dokumen Publik */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Transparansi Publik</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Unduhan Dokumen Resmi Kesiswaan
              </h2>
              <p className="text-xs text-slate-500">
                Dokumen tata tertib, formulir dispensasi lomba resmi, dan pedoman organisasi untuk siswa dan wali murid.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publicDocuments.map((doc, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <span>{doc.format}</span>
                      <span>·</span>
                      <span>{doc.size}</span>
                      <span>·</span>
                      <span>{doc.updated}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(doc.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Unduh</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
