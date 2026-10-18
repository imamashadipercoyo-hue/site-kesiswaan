import React, { useState } from 'react';
import { 
  Shield, 
  Heart, 
  Trophy, 
  Users, 
  Sparkles, 
  ShieldAlert, 
  HandHeart, 
  Laptop, 
  ArrowRight, 
  X,
  CheckCircle
} from 'lucide-react';

interface ProgramDetail {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortDesc: string;
  fullDesc: string;
  points: string[];
  target: string;
}

export const FlagshipPrograms: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);

  const programs: ProgramDetail[] = [
    {
      id: 'prog-1',
      icon: Shield,
      title: 'Pembinaan Disiplin dan Ketertiban',
      shortDesc: 'Penerapan tata tertib sekolah humanis, pembiasaan kehadiran tepat waktu, kerapian seragam, dan apel pagi terpadu.',
      fullDesc: 'Program pembinaan kedisiplinan di SMK Negeri 1 Jember diarahkan secara edukatif dan humanis. Bertujuan membentuk kesiapan mental kerja peserta didik yang terbiasa tepat waktu, mematuhi standar operasional prosedur, dan menghargai kesepakatan bersama.',
      points: [
        'Pemeriksaan rutin kelengkapan atribut seragam dan tata rambut/penampilan profesional.',
        'Sistem pencatatan kehadiran digital terpadu dan pembinaan konseling preventif.',
        'Apel pagi terjadwal penguatan komitmen kedisiplinan dan rasa kebangsaan.',
        'Pemberian apresiasi kelas paling tertib dan disiplin setiap bulannya.'
      ],
      target: 'Seluruh peserta didik kelas X, XI, dan XII SMKN 1 Jember'
    },
    {
      id: 'prog-2',
      icon: Heart,
      title: 'Penguatan Karakter & Budaya Positif',
      shortDesc: 'Penanaman nilai budi pekerti, etika 5S (Senyum, Salam, Sapa, Sopan, Santun), dan Profil Pelajar Pancasila.',
      fullDesc: 'Karakter adalah fondasi utama keberhasilan masa depan. Bidang kesiswaan mengintegrasikan nilai-nilai Profil Pelajar Pancasila ke dalam pembiasaan harian, pembinaan rohani, dan etika berkomunikasi baik di dunia nyata maupun digital.',
      points: [
        'Pembiasaan salam dan sapaan santun kepada guru, karyawan, dan tamu di gerbang sekolah.',
        'Kajian kerohanian berkala bagi seluruh penganut agama dan kepercayaan.',
        'Edukasi literasi etika bermedia sosial dan pencegahan disinformasi.',
        'Peringatan Hari Besar Nasional dan Keagamaan sebagai wahana refleksi moral.'
      ],
      target: 'Civitas akademika dan seluruh warga sekolah'
    },
    {
      id: 'prog-3',
      icon: Trophy,
      title: 'Pengembangan Prestasi Akademik & Nonakademik',
      shortDesc: 'Fasilitasi bimbingan intensif talenta siswa dalam LKS SMK, O2SN, FLS2N, olimpiade, dan kompetisi inovasi.',
      fullDesc: 'Melalui program SMESA JUARA, sekolah memberikan pendampingan terstruktur bagi siswa berpotensi. Mulai dari pemetaan bakat di kelas X, pembinaan intensif bersama guru pembimbing kompetensi, simulasi tanding, hingga pemberian beasiswa apresiasi.',
      points: [
        'Pemusatan latihan (training camp) Lomba Kompetensi Siswa (LKS) tingkat provinsi dan nasional.',
        'Bimbingan khusus lomba olahraga prestasi (futsal, basket, pencak silat, atletik).',
        'Pendampingan lomba seni dan desain kreatif (film pendek, desain grafis, tari).',
        'Pencatatan resmi sertifikat kejuaraan pada Surat Keterangan Pendamping Ijazah (SKPI).'
      ],
      target: 'Atlet pelajar, talenta kejuruan, dan delegasi lomba sekolah'
    },
    {
      id: 'prog-4',
      icon: Users,
      title: 'Penguatan OSIS dan MPK',
      shortDesc: 'Regenerasi kepemimpinan pelajar, demokrasi PEMILOS digital, dan manajemen organisasi yang akuntabel.',
      fullDesc: 'OSIS dan MPK adalah motor penggerak keaktifan siswa. Bidang kesiswaan menyelenggarakan pelatihan dasar kepemimpinan (LDKS), bimbingan pembuatan proposal kegiatan, tata kelola sidang aspirasi, dan evaluasi berkala.',
      points: [
        'Latihan Dasar Kepemimpinan Siswa (LDKS) berbasis studi kasus dan alam terbuka.',
        'Pemilihan Ketua OSIS (PEMILOS) digital berbasis e-voting karya siswa.',
        'Penyusunan Anggaran Program Kerja Mandiri yang transparan dan terukur.',
        'Rapat koordinasi berkala fungsionaris kesiswaan bersama Kepala Sekolah.'
      ],
      target: 'Pengurus OSIS, MPK, dan perwakilan ketua kelas'
    },
    {
      id: 'prog-5',
      icon: Sparkles,
      title: 'Pengembangan 22 Ekstrakurikuler',
      shortDesc: 'Penyaluran minat bakat di bidang bela negara, kemanusiaan, sains teknologi, seni budaya, dan olahraga.',
      fullDesc: 'Tersedia 22 cabang ekstrakurikuler resmi yang didampingi pembina profesional dan fasilitas memadai. Siswa diberi kebebasan memilih ekstrakurikuler sesuai bakat serta diasah untuk unjuk kebolehan di berbagai panggung publik.',
      points: [
        'Pekan Orientasi Ekstrakurikuler (Demo Ekstra) di awal tahun ajaran baru.',
        'Jadwal latihan teratur tanpa mengganggu jam pelajaran akademik formal.',
        'Gelar karya dan turnamen internal SMESA Cup secara berkala.',
        'Monitoring dan evaluasi keaktifan serta pencapaian prestasi masing-masing ekstra.'
      ],
      target: 'Seluruh peserta didik aktif SMK Negeri 1 Jember'
    },
    {
      id: 'prog-6',
      icon: ShieldAlert,
      title: 'Pencegahan Perundungan & Sekolah Aman',
      shortDesc: 'Satgas Anti-Bullying, posko pengaduan rahasia, edukasi teman sebaya, dan perlindungan rasa aman siswa.',
      fullDesc: 'SMK Negeri 1 Jember berkomitmen mewujudkan Zero Tolerance terhadap tindakan perundungan fisik, verbal, relasional, maupun siber. Sekolah menyediakan kanal pelaporan yang aman dan prosedur pendampingan psikologis terpercaya.',
      points: [
        'Deklarasi tahunan Sekolah Ramah Anak bersama Komite Sekolah dan Aparat Terkait.',
        'Pembentukan Duta Pelajar Anti-Perundungan di setiap tingkatan kelas.',
        'Kanal pelaporan tertutup Ruang Aspirasi Kesiswaan yang terjamin privasinya.',
        'Pendampingan konseling intensif dari Guru BK dan psikolog mitra.'
      ],
      target: 'Seluruh siswa dan lingkungan sekolah'
    },
    {
      id: 'prog-7',
      icon: HandHeart,
      title: 'Gerakan Kepedulian Sosial & Lingkungan',
      shortDesc: 'Aksi relawan kemanusiaan, donor darah rutin, bakti sosial warga sekitar Patrang, dan gerakan adiwiyata hijau.',
      fullDesc: 'Menumbuhkan kepekaan nurani bahwa kesuksesan tidak hanya tentang diri sendiri, melainkan kebermanfaatan bagi masyarakat. Siswa dilibatkan dalam kegiatan tanggap bencana, santunan kaum duafa, dan perawatan keasrian lingkungan.',
      points: [
        'Aksi donor darah sukarela rutin bekerja sama dengan Palang Merah Indonesia (PMI).',
        'Program Jumat Berkah dan santunan sosial hari besar keagamaan.',
        'Bakti lingkungan bersih sungai dan penanaman pohon di kawasan Patrang.',
        'Edukasi pengurangan sampah plastik sekali pakai di kantin sekolah.'
      ],
      target: 'Masyarakat sekitar sekolah dan komunitas yang membutuhkan'
    },
    {
      id: 'prog-8',
      icon: Laptop,
      title: 'Digitalisasi Layanan Kesiswaan',
      shortDesc: 'Portal kesiswaan terintegrasi, administrasi dispensasi lomba online, etalase prestasi SMESA JUARA, dan aspirasi digital.',
      fullDesc: 'Memanfaatkan keunggulan teknologi SMK untuk mempermudah akses informasi peserta didik, wali murid, dan publik secara cepat, akuntabel, dan ramah lingkungan (paperless).',
      points: [
        'Akses terbuka kalender agenda kegiatan kesiswaan dengan sinkronisasi kalender.',
        'Katalog interaktif profil organisasi, ekstrakurikuler, dan pencapaian prestasi.',
        'Kanal Ruang Aspirasi Siswa termoderasi untuk masukan konstruktif warga sekolah.',
        'Panel pengelolaan konten (CMS) mandiri bagi staf kesiswaan dan pengurus OSIS.'
      ],
      target: 'Siswa, guru, orang tua, alumni, dan masyarakat luas'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full inline-block">
            Pilar Pembinaan Peserta Didik
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program Unggulan Kesiswaan SMESA
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Delapan fokus strategis Bidang Kesiswaan SMK Negeri 1 Jember dalam menumbuhkan generasi yang berdisiplin tinggi, berkarakter mulia, dan siap mengukir prestasi terbaik.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {prog.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProgram(prog)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-950 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    <span>Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link to Profile Page */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('profil')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer"
          >
            <span>Pelajari Roadmap Arah Pembinaan Kesiswaan Lengkap</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                  <selectedProgram.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    Program Unggulan SMESA
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    {selectedProgram.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedProgram(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>{selectedProgram.fullDesc}</p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Aktivitas & Implementasi Program:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedProgram.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
              <strong>Sasaran Program:</strong> {selectedProgram.target}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-5 py-2.5 bg-blue-950 text-white hover:bg-slate-900 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
