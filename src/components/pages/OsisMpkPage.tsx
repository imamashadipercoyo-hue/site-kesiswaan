import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  Vote, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Calendar,
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { StudentAspiration } from '../../types';
import { StorageService } from '../../services/storageService';

interface OsisMpkPageProps {
  aspirations: StudentAspiration[];
  onAspirationSubmitted: () => void;
}

export const OsisMpkPage: React.FC<OsisMpkPageProps> = ({
  aspirations,
  onAspirationSubmitted
}) => {
  const [activeTab, setActiveTab] = useState<'osis' | 'mpk' | 'aspirasi'>('osis');
  
  // Aspiration Form State
  const [aspirationTitle, setAspirationTitle] = useState('');
  const [aspirationContent, setAspirationContent] = useState('');
  const [aspirationCategory, setAspirationCategory] = useState<StudentAspiration['category']>('Fasilitas Kesiswaan');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const approvedAspirations = aspirations.filter(a => a.status === 'disetujui' || a.status === 'ditindaklanjuti');

  const handleSubmitAspiration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aspirationTitle.trim() || !aspirationContent.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      const newAsp = StorageService.submitAspiration({
        title: aspirationTitle.trim(),
        content: aspirationContent.trim(),
        category: aspirationCategory,
        isAnonymous,
        name: isAnonymous ? 'Siswa SMESA (Anonim)' : (studentName.trim() || 'Peserta Didik SMESA'),
        studentClass: studentClass.trim() || undefined
      });

      setSubmitting(false);
      setSubmissionSuccess(newAsp.ticketNumber);
      setAspirationTitle('');
      setAspirationContent('');
      setStudentName('');
      setStudentClass('');
      onAspirationSubmitted();
    }, 600);
  };

  const sekbids = [
    { num: 'Sekbid 1', title: 'Pembinaan Keimanan & Ketaqwaan', desc: 'Pengelolaan kegiatan hari besar keagamaan, tadarus Al-Qur’an, santunan sosial, dan toleransi beragama.' },
    { num: 'Sekbid 2', title: 'Budi Pekerti Luhur & Akhlak Mulia', desc: 'Pelopor budaya 5S, penegakan tata tertib pelajar, dan kampanye anti-perundungan di lingkungan sekolah.' },
    { num: 'Sekbid 3', title: 'Kepribadian Unggul & Wawasan Kebangsaan', desc: 'Upacara bendera, peringatan hari nasional, kepramukaan, dan pendidikan bela negara.' },
    { num: 'Sekbid 4', title: 'Prestasi Akademik, Seni, dan Olahraga', desc: 'Penyelenggaraan SMESA Cup, pembinaan delegasi lomba, dan festival kreativitas seni.' },
    { num: 'Sekbid 5', title: 'Demokrasi, HAM, & Pendidikan Politik Siswa', desc: 'Penyelenggaraan PEMILOS, pelatihan kepemimpinan dasar, dan forum aspirasi siswa.' },
    { num: 'Sekbid 6', title: 'Kreativitas, Keterampilan, & Kewirausahaan', desc: 'Bazar kewirausahaan siswa, pameran produk jurusan, dan pelatihan literasi finansial.' },
    { num: 'Sekbid 7', title: 'Kualitas Jasmani, Kesehatan, & Gizi', desc: 'Senam kesegaran jasmani, aksi donor darah, dan pengawasan higienitas kantin sehat.' },
    { num: 'Sekbid 8', title: 'Sastra, Budaya, & Teknologi Informasi', desc: 'Penerbitan warta digital kesiswaan, media sosial OSIS, dan pembuatan konten kreatif positif.' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded">
            <Users className="w-3.5 h-3.5" />
            <span>Organisasi Kesiswaan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            OSIS & MPK SMK Negeri 1 Jember
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            Wadah kepemimpinan, kreasi, dan demokrasi pelajar SMESA. Mengembangkan potensi diri menjadi pemimpin masa depan yang berintegritas dan solutif.
          </p>

          {/* Switcher Tab */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('osis')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'osis'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Organisasi Siswa Intra Sekolah (OSIS)
            </button>
            <button
              onClick={() => setActiveTab('mpk')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'mpk'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Majelis Perwakilan Kelas (MPK)
            </button>
            <button
              onClick={() => setActiveTab('aspirasi')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'aspirasi'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ruang Aspirasi Siswa</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        {/* TAB 1: OSIS */}
        {activeTab === 'osis' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Profile Card */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Masa Bakti 2026/2027
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Profil Kepengurusan OSIS SMESA
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  OSIS SMK Negeri 1 Jember bertindak sebagai penggerak aktivitas kesiswaan, penyalur minat bakat rekan-rekan pelajar, dan mitra strategis sekolah dalam memelihara iklim belajar yang berdisiplin serta berprestasi.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Ketua OSIS</span>
                    <h3 className="font-bold text-sm text-slate-900">Rayhan Aditya</h3>
                    <p className="text-xs text-slate-500">XII Rekayasa Perangkat Lunak 1</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Wakil Ketua OSIS</span>
                    <h3 className="font-bold text-sm text-slate-900">Nabila Maharani</h3>
                    <p className="text-xs text-slate-500">XI Bisnis Daring & Pemasaran 2</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Sekretaris Umum</span>
                    <h3 className="font-bold text-sm text-slate-900">Zahra Amanda Putri</h3>
                    <p className="text-xs text-slate-500">XI Manajemen Perkantoran 1</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Bendahara Umum</span>
                    <h3 className="font-bold text-sm text-slate-900">Ahmad Ilham Saputra</h3>
                    <p className="text-xs text-slate-500">XII Akuntansi & Keuangan 2</p>
                  </div>
                </div>
              </div>

              {/* Visi Misi OSIS */}
              <div className="lg:col-span-5 bg-blue-950 text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl border border-blue-900">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Visi & Misi OSIS
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  Visi Kepengurusan:
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-slate-900/80 p-4 rounded-xl border border-blue-900/60">
                  "Menjadikan OSIS SMESA sebagai lokomotif kreasi pelajar yang berakhlak mulia, adaptif dengan teknologi, menjunjung tinggi nilai persaudaraan, dan aktif mengukir prestasi."
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase">Misi Utama:</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>Meningkatkan kedisiplinan dan sopan santun warga sekolah.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>Menyelenggarakan program kerja interaktif yang mengembangkan potensi kejuruan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>Menjadi jembatan aspirasi yang cepat tanggap antara siswa dan kesiswaan.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 8 Seksi Bidang OSIS */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Struktur Seksi Bidang
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  8 Seksi Bidang (Sekbid) OSIS SMESA
                </h3>
                <p className="text-xs text-slate-500">
                  Pembagian divisi kerja kepengurusan dalam mengeksekusi program pembinaan peserta didik.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sekbids.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 space-y-2">
                    <span className="text-[11px] font-bold text-blue-900 uppercase">{item.num}</span>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MPK */}
        {activeTab === 'mpk' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Legislatif Siswa
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Majelis Perwakilan Kelas (MPK) SMESA
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  MPK adalah lembaga perwakilan legislatif siswa yang beranggotakan perwakilan dari setiap kelas di SMK Negeri 1 Jember. Bertugas mengawasi kinerja OSIS, menyerap aspirasi siswa, serta menyelenggarakan PEMILOS (Pemilihan Ketua OSIS).
                </p>
              </div>

              {/* PEMILOS Showcase */}
              <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Vote className="w-4 h-4 text-amber-400" />
                  <span>Demokrasi Pelajar SMESA</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  PEMILOS Digital: E-Voting Terbuka & Akuntabel
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Setiap tahun ajaran baru, MPK menyelenggarakan Pemilihan Ketua dan Wakil Ketua OSIS berbasis digital karya siswa RPL SMESA. Sistem e-voting ini menjamin prinsip LUBER JURDIL (Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil) serta melatih literasi politik generasi muda.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-slate-400 font-medium">Partisipasi Siswa:</span>
                    <p className="text-base font-extrabold text-amber-400 mt-0.5">97.8%</p>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-slate-400 font-medium">Metode Pemilihan:</span>
                    <p className="text-base font-extrabold text-white mt-0.5">Digital E-Voting Lab SMESA</p>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-slate-400 font-medium">Hasil Perhitungan:</span>
                    <p className="text-base font-extrabold text-emerald-400 mt-0.5">Realtime & Transparan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RUANG ASPIRASI SISWA */}
        {activeTab === 'aspirasi' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Header / Disclaimer */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Kanal Suara Pelajar
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Ruang Aspirasi & Saran Kesiswaan SMESA
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sampaikan saran konstruktif, usulan fasilitas kesiswaan, atau kritik membangun untuk kemajuan SMK Negeri 1 Jember. Seluruh aspirasi dimoderasi oleh Tim Kesiswaan & MPK untuk memastikan kesantunan dan perlindungan privasi.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-950">
                <ShieldCheck className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong>Kebijakan Privasi & Moderasi:</strong>
                  <p className="text-blue-900 leading-relaxed">
                    Anda dapat mengirimkan aspirasi secara <strong>Anonim</strong> atau mencantumkan identitas kelas. Dilarang menggunakan ujaran kebencian, pencemaran nama baik, atau kata kasar. Setiap aspirasi yang disetujui akan ditampilkan beserta tanggapan resmi dari pihak kesiswaan.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitAspiration} className="space-y-4 pt-4 border-t border-slate-100">
                {submissionSuccess && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-xs space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Aspirasi Berhasil Dikirimkan!</span>
                    </div>
                    <p>
                      Nomor Tiket Aspirasi: <strong>{submissionSuccess}</strong>. Pesan Anda sedang dalam tahap telaah dan moderasi oleh Tim Kesiswaan.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kategori Aspirasi
                    </label>
                    <select
                      value={aspirationCategory}
                      onChange={(e) => setAspirationCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                    >
                      <option value="Fasilitas Kesiswaan">Fasilitas Kesiswaan & Sarana</option>
                      <option value="Kegiatan Siswa">Kegiatan & Acara Siswa</option>
                      <option value="Ekstrakurikuler">Ekstrakurikuler & Latihan</option>
                      <option value="Ketertiban & Disiplin">Ketertiban, Seragam & Disiplin</option>
                      <option value="Inovasi & Ide">Inovasi, Ide & Saran Kreatif</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  {/* Anonymity toggle */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Privasi Pengirim
                    </label>
                    <div className="flex items-center gap-4 py-2">
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="anonymity"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(true)}
                          className="text-blue-900"
                        />
                        <span>Anonim (Rahasia)</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="anonymity"
                          checked={!isAnonymous}
                          onChange={() => setIsAnonymous(false)}
                          className="text-blue-900"
                        />
                        <span>Cantumkan Nama & Kelas</span>
                      </label>
                    </div>
                  </div>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Kelas & Jurusan</label>
                      <input
                        type="text"
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        placeholder="Contoh: XI RPL 1 / XII AKL 2"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Judul Pokok Pikiran / Usulan
                  </label>
                  <input
                    type="text"
                    required
                    value={aspirationTitle}
                    onChange={(e) => setAspirationTitle(e.target.value)}
                    placeholder="Contoh: Usulan Penyelenggaraan Workshop Public Speaking untuk Kelas XII"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Uraian Ide, Saran, atau Aspirasi Lengkap
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={aspirationContent}
                    onChange={(e) => setAspirationContent(e.target.value)}
                    placeholder="Tuliskan alasan, latar belakang masalah, dan usulan solusi konkret yang Anda harapkan..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    * Aspirasi akan diverifikasi sebelum ditampilkan ke publik.
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Mengirim...' : 'Kirim Aspirasi'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Approved & Acted-Upon Aspirations List */}
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Aspirasi Siswa yang Telah Ditanggapi & Ditindaklanjuti</span>
              </h3>

              <div className="space-y-4">
                {approvedAspirations.map((asp) => (
                  <div
                    key={asp.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                          <span className="font-bold text-amber-700">{asp.category}</span>
                          <span>·</span>
                          <span>Tiket: {asp.ticketNumber}</span>
                          <span>·</span>
                          <span>{asp.createdAt}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mt-1">
                          {asp.title}
                        </h4>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {asp.status === 'ditindaklanjuti' ? 'Telah Ditindaklanjuti' : 'Disetujui'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      "{asp.content}"
                    </p>

                    <div className="text-[11px] text-slate-500">
                      Pengirim: <strong>{asp.name}</strong> {asp.studentClass ? `(${asp.studentClass})` : ''}
                    </div>

                    {asp.adminResponse && (
                      <div className="bg-blue-50/80 border-l-4 border-blue-900 p-3.5 rounded-r-lg space-y-1 text-xs">
                        <span className="font-bold text-blue-950 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-blue-900" />
                          <span>Tanggapan Resmi Tim Kesiswaan ({asp.respondedAt || 'Terbaru'}):</span>
                        </span>
                        <p className="text-blue-900 leading-relaxed">
                          {asp.adminResponse}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
