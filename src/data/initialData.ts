import {
  NewsItem,
  AgendaItem,
  AchievementItem,
  ExtracurricularItem,
  GalleryItem,
  StudentAspiration,
  ContactMessage,
  SchoolProfileData
} from '../types';

export const INITIAL_SCHOOL_PROFILE: SchoolProfileData = {
  schoolName: 'SMK Negeri 1 Jember',
  tagline: 'Disiplin • Berkarakter • Berprestasi',
  wakaName: 'Drs. H. Bambang Sudarsono, M.Pd.',
  wakaTitle: 'Wakil Kepala Sekolah Bidang Kesiswaan',
  wakaGreeting: 'Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera untuk kita semua. Selamat datang di Portal Resmi Kesiswaan SMK Negeri 1 Jember. Bidang Kesiswaan SMESA berkomitmen penuh untuk membentuk generasi muda yang tidak hanya unggul dalam kompetensi kejuruan dan teknologi, tetapi juga berakar kuat pada nilai-nilai integritas, kedisiplinan, budi pekerti luhur, dan jiwa kepemimpinan. Melalui wadah organisasi siswa, 22 ekstrakurikuler aktif, serta program pembinaan karakter terpadu, kami senantiasa mendampingi putra-putri SMESA untuk berani bermimpi, gigih berjuang, dan meraih prestasi gemilang di tingkat daerah, nasional, hingga internasional.',
  wakaPhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
  vision: 'Mewujudkan peserta didik SMK Negeri 1 Jember yang berakhlak mulia, berkarakter Pancasila, berdisiplin tinggi, mandiri, berdaya saing global, serta berprestasi unggul di bidang akademik dan kejuruan.',
  missions: [
    'Menanamkan nilai-nilai keimanan, ketakwaan, dan etika moral dalam setiap gerak langkah aktivitas kesiswaan.',
    'Menerapkan budaya disiplin sekolah yang konsisten, humanis, dan berkeadilan melalui pembiasaan positif.',
    'Mengembangkan potensi, minat, dan bakat peserta didik melalui organisasi kesiswaan dan ekstrakurikuler berkualitas.',
    'Membina tradisi juara dalam kompetensi kejuruan (LKS), sains, olahraga, seni budaya, dan teknologi informasi.',
    'Menciptakan lingkungan sekolah yang aman, inklusif, ramah anak, serta bebas dari perundungan (anti-bullying).',
    'Menumbuhkan kepekaan sosial, jiwa kerelawanan, dan kepedulian terhadap kelestarian lingkungan hidup.'
  ],
  disciplineCulture: {
    title: 'Budaya 5S dan Disiplin SMESA',
    description: 'Pedoman pembiasaan karakter luhur harian peserta didik SMK Negeri 1 Jember sejak memasuki gerbang sekolah.',
    points: [
      'Senyum, Salam, Sapa, Sopan, dan Santun (5S) kepada guru, karyawan, sesama rekan, dan tamu sekolah.',
      'Ketepatan waktu hadir di sekolah maksimal pukul 06.45 WIB dan keikutsertaan tertib pada apel pagi/upacara bendera.',
      'Kerapian seragam sekolah lengkap dengan atribut resmi SMESA, sepatu pantofel/sneaker hitam sesuai ketentuan hari.',
      'Menjaga kebersihan lingkungan belajar dan pemilahan sampah di area green school SMESA.',
      'Penggunaan gawai cerdas (smartphone) yang bertanggung jawab untuk keperluan pembelajaran dan literasi digital.'
    ]
  },
  runningAnnouncement: '📢 Pendaftaran Seleksi Calon Pengurus OSIS & MPK Masa Bakti 2026/2027 telah dibuka! Pantau jadwal dan unduh formulir di menu OSIS & MPK.'
};

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Kontingen SMESA Raih Juara 1 & Medali Emas LKS Tingkat Provinsi Jawa Timur Bidang IT Software Solutions',
    slug: 'smesa-raih-emas-lks-jatim-it-software',
    excerpt: 'Prestasi membanggakan kembali dipersembahkan siswa jurusan Rekayasa Perangkat Lunak SMK Negeri 1 Jember pada ajang Lomba Kompetensi Siswa (LKS) SMK Tingkat Jawa Timur.',
    content: `Jember — Prestasi membanggakan kembali ditorehkan oleh perwakilan peserta didik SMK Negeri 1 Jember (SMESA) pada ajang bergengsi Lomba Kompetensi Siswa (LKS) SMK Tingkat Provinsi Jawa Timur yang berlangsung di Surabaya.

Ananda Muhammad Farel Danendra, siswa kelas XII program keahlian Rekayasa Perangkat Lunak (RPL), sukses menyabet Juara 1 sekaligus Medali Emas pada bidang lomba *IT Software Solutions for Business*. Kompetisi berlangsung intensif selama tiga hari dengan menguji kemampuan perancangan arsitektur sistem, pemrograman backend, pengujian fungsional, dan penyajian antarmuka responsif modern.

Kepala SMK Negeri 1 Jember bersama Wakil Kepala Sekolah Bidang Kesiswaan menyampaikan apresiasi setinggi-tingginya kepada ananda dan tim guru pembimbing produktif RPL. "Kemenangan ini adalah buah dari ketekunan latihan berbulan-bulan, kedisiplinan pembinaan, serta doa restu seluruh civitas akademika SMESA. Langkah selanjutnya, SMESA siap mengharumkan Jawa Timur di LKS Tingkat Nasional," ungkap Waka Kesiswaan.

Kemenangan ini memperpanjang rekor tradisi emas SMESA di bidang teknologi kejuruan dan memotivasi seluruh adik kelas untuk terus memacu kompetensi digital.`,
    category: 'Prestasi Siswa',
    author: 'Tim Jurnalistik SMESA',
    authorRole: 'Editor Kesiswaan',
    date: '14 Oktober 2026',
    readTime: '3 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
    ],
    isFeatured: true,
    isPinned: true,
    status: 'published',
    tags: ['LKS SMK', 'Prestasi', 'RPL', 'SMESA Juara', 'Teknologi'],
    views: 1420
  },
  {
    id: 'news-2',
    title: 'Pelantikan Pengurus OSIS dan MPK SMESA Masa Bakti Baru: Meneguhkan Kepemimpinan Pelajar Berintegritas',
    slug: 'pelantikan-pengurus-osis-mpk-smesa',
    excerpt: 'Upacara khidmat pelantikan pengurus OSIS dan Majelis Perwakilan Kelas (MPK) SMK Negeri 1 Jember berlangsung di lapangan upacara dengan semangat kebersamaan baru.',
    content: `Senin pagi di lapangan utama SMK Negeri 1 Jember, suasana hening dan khidmat mengiringi upacara serah terima jabatan serta pelantikan resmi pengurus OSIS dan MPK SMESA untuk masa bakti mendatang.

Sebanyak 45 pengurus OSIS terpilih bersama 30 anggota MPK mengucapkan sumpah janji kepengurusan di hadapan Kepala Sekolah, Wakil Kepala Sekolah, jajaran dewan guru, dan seluruh peserta didik. Kepemimpinan baru OSIS dipimpin oleh ananda Rayhan Aditya sebagai Ketua OSIS terpilih hasil PEMILOS demokratis berbasis e-voting.

Dalam amanatnya, Pembina Kesiswaan menekankan bahwa menjadi fungsionaris organisasi adalah amanah pengabdian untuk melayani dan menjadi teladan bagi rekan-rekan sebaya. Pengurus OSIS baru berkomitmen menghadirkan program-program kreatif, seperti Pekan Literasi Digital, SMESA Cup Olahraga Antar-Jurusan, serta program Peduli Lingkungan Hijau di sekitar Patrang.`,
    category: 'OSIS dan MPK',
    author: 'Redaksi Kesiswaan',
    authorRole: 'Editor Kesiswaan',
    date: '06 Oktober 2026',
    readTime: '4 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop'
    ],
    isFeatured: true,
    isPinned: false,
    status: 'published',
    tags: ['OSIS', 'MPK', 'Kepemimpinan', 'Karakter'],
    views: 980
  },
  {
    id: 'news-3',
    title: 'Sosialisasi Sekolah Ramah Anak & Deklarasi Bersama Tolak Perundungan (Anti-Bullying) di SMESA',
    slug: 'sosialisasi-sekolah-ramah-anak-anti-bullying',
    excerpt: 'Mewujudkan iklim belajar yang aman dan nyaman, Bidang Kesiswaan menggandeng psikolog dan Komisi Perlindungan Anak dalam deklarasi sekolah ramah anak.',
    content: `Sebagai wujud komitmen nyata menciptakan iklim belajar yang harmonis, aman, dan beradab, SMK Negeri 1 Jember menyelenggarakan seminar bertajuk "Membangun Empati, Menolak Perundungan di Era Digital".

Kegiatan ini diikuti oleh perwakilan ketua kelas, duta ketertiban kesiswaan, pengurus PMR, dan guru Bimbingan Konseling. Selain pemaparan materi mengenai dampak psikologis perundungan siber (cyberbullying) dan fisik, acara dipuncaki dengan penandatanganan petisi deklarasi komitmen bersama di spanduk kain putih sepanjang 20 meter.

Waka Kesiswaan menegaskan: "Tidak ada ruang untuk intimidasi atau kekerasan dalam bentuk apa pun di SMESA. Setiap siswa berhak merasa dihargai, aman, dan didukung untuk mengeksplorasi potensi terbaik mereka."`,
    category: 'Pembinaan Karakter',
    author: 'Tim Ketertiban & Karakter',
    authorRole: 'Editor Kesiswaan',
    date: '28 September 2026',
    readTime: '3 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop',
    isFeatured: false,
    isPinned: false,
    status: 'published',
    tags: ['Anti-Bullying', 'Sekolah Ramah Anak', 'Karakter', 'Disiplin'],
    views: 740
  },
  {
    id: 'news-4',
    title: 'PMR Wira SMESA Jember Galang Aksi Donor Darah Sukarela dan Bakti Lingkungan Sosial Masyarakat',
    slug: 'pmr-wira-smesa-donor-darah-bakti-sosial',
    excerpt: 'Bekerja sama dengan PMI Cabang Jember, ekstrakurikuler PMR SMESA berhasil menghimpun lebih dari 120 kantong darah sukarela dari guru dan peserta didik.',
    content: `Aksi kemanusiaan rutin Palang Merah Remaja (PMR) Wira SMK Negeri 1 Jember kembali digelar di Aula Graha SMESA. Kegiatan donor darah sukarela dan penyuluhan kesehatan remaja ini disambut antusias tinggi oleh siswa kelas XI, XII, dan dewan guru yang telah memenuhi syarat kesehatan donor.

Ketua PMR Wira SMESA menyampaikan bahwa kegiatan ini bertujuan memupuk rasa kemanusiaan dan kepedulian nyata terhadap sesama, selaras dengan prinsip dasar Palang Merah. Selain donor darah, anggota PMR juga membagikan paket sembako kepada warga prasejahtera di sekitar Kelurahan Patrang.`,
    category: 'Kegiatan Sosial',
    author: 'PMR Wira SMESA',
    authorRole: 'Kontributor Berita',
    date: '18 September 2026',
    readTime: '2 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000&auto=format&fit=crop',
    isFeatured: false,
    isPinned: false,
    status: 'published',
    tags: ['PMR', 'Bakti Sosial', 'Donor Darah', 'Kemanusiaan'],
    views: 610
  },
  {
    id: 'news-5',
    title: 'Gelar Karya Ekstrakurikuler Seni & Tari SMESA Warnai Peringatan Hari Sumpah Pemuda',
    slug: 'gelar-karya-seni-dan-tari-smp-smesa',
    excerpt: 'Penampilan memukau tari tradisional kolosal dan atraksi teater SMESA memikat ratusan pasang mata dalam festival unjuk bakat siswa.',
    content: `Panggung terbuka SMK Negeri 1 Jember bergemuruh oleh tepuk tangan meriah saat tim Sanggar Seni Tari Tradisional SMESA menampilkan koreografi Tari Gandrung Banyuwangi dan Tari Labako khas Jember.

Gelar karya ini merupakan wadah apresiasi seni yang diprakarsai seksi bidang apresiasi seni budaya OSIS bersama pembina ekstrakurikuler tari, karawitan, dan teater. Melalui kegiatan ini, siswa diajak mencintai warisan budaya nusantara sekaligus melatih kepercayaan diri tampil di panggung publik.`,
    category: 'Ekstrakurikuler',
    author: 'Divisi Seni Budaya OSIS',
    authorRole: 'Kontributor Berita',
    date: '02 September 2026',
    readTime: '3 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    isFeatured: false,
    isPinned: false,
    status: 'published',
    tags: ['Ekstrakurikuler', 'Seni Budaya', 'Tari Tradisional', 'Kreativitas'],
    views: 520
  },
  {
    id: 'news-6',
    title: 'Pengumuman Resmi Jadwal Verifikasi Dispensasi Lomba dan Rekapitulasi Poin Keaktifan Siswa Semester Ganjil',
    slug: 'pengumuman-dispensasi-lomba-semester-ganjil',
    excerpt: 'Pemberitahuan kepada seluruh siswa perwakilan kontingen lomba dan ketua ekstrakurikuler mengenai batas akhir unggah berkas dispensasi resmi.',
    content: `Diberitahukan kepada seluruh peserta didik SMK Negeri 1 Jember yang mengikuti kegiatan perlombaan atau pembinaan intensif di luar sekolah selama semester ganjil tahun ajaran berjalan:

1. Surat dispensasi wajib diajukan melalui Tim Kesiswaan minimal H-3 sebelum pelaksanaan kegiatan dengan melampirkan surat undangan resmi panitia penyelenggara.
2. Setiap sertifikat atau penghargaan yang diraih wajib dilaporkan ke laman 'SMESA JUARA' untuk diverifikasi dan dicatat dalam Surat Keterangan Pendamping Ijazah (SKPI).
3. Batas akhir pengumpulan bukti fisik berkas dispensasi dan piagam ke ruang Kesiswaan adalah Jumat, 20 November 2026 pukul 14.00 WIB.

Demikian pengumuman ini disampaikan agar menjadi perhatian bersama demi tertib administrasi akademik dan kesiswaan.`,
    category: 'Pengumuman Resmi',
    author: 'Sekretariat Kesiswaan',
    authorRole: 'Editor Kesiswaan',
    date: '20 Agustus 2026',
    readTime: '2 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop',
    isFeatured: false,
    isPinned: false,
    status: 'published',
    tags: ['Pengumuman', 'Dispensasi', 'Administrasi', 'Kesiswaan'],
    views: 1105
  }
];

export const INITIAL_AGENDA: AgendaItem[] = [
  {
    id: 'agenda-1',
    title: 'Upacara Peringatan Hari Sumpah Pemuda & Parade Budaya Nusantara Siswa SMESA',
    category: 'Upacara & Peringatan',
    startDate: '2026-10-28',
    endDate: '2026-10-28',
    time: '07.00 - 10.30 WIB',
    location: 'Lapangan Utama SMESA, Jl. Jambu 17 Patrang Jember',
    organizer: 'Bidang Kesiswaan & OSIS SMESA',
    description: 'Upacara bendera peringatan Hari Sumpah Pemuda dilanjutkan dengan parade pakaian adat nusantara oleh perwakilan seluruh kelas X, XI, dan XII sebagai penguatan Profil Pelajar Pancasila.',
    posterUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
    status: 'akan_datang',
    targetAudience: 'Seluruh Siswa, Guru, dan Karyawan SMK Negeri 1 Jember',
    contactPerson: 'Kesiswaan (0331-486110)'
  },
  {
    id: 'agenda-2',
    title: 'Latihan Dasar Kepemimpinan Siswa (LDKS) Calon Pengurus OSIS & MPK',
    category: 'Kegiatan OSIS & MPK',
    startDate: '2026-11-06',
    endDate: '2026-11-08',
    time: '08.00 WIB - Selesai',
    location: 'Bumi Perkemahan & Pusat Pelatihan Karakter, Jember',
    organizer: 'Tim Pembina Kesiswaan SMESA',
    description: 'Pelatihan kepemimpinan, manajemen organisasi, penyusunan proposal kegiatan, teknik diplomasi sidang MPK, dan pembentukan karakter tangguh serta berintegritas bagi calon fungsionaris OSIS/MPK.',
    posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
    status: 'akan_datang',
    targetAudience: 'Calon Pengurus OSIS & MPK Terpilih',
    contactPerson: 'Pembina OSIS'
  },
  {
    id: 'agenda-3',
    title: 'Turnamen Futsal & Basket SMESA Cup Antar-Kompetensi Keahlian 2026',
    category: 'Ekstrakurikuler',
    startDate: '2026-11-16',
    endDate: '2026-11-20',
    time: '14.30 - 17.30 WIB',
    location: 'Gelanggang Olahraga & Lapangan Futsal SMESA',
    organizer: 'Ekstrakurikuler Olahraga & Sekbid Olahraga OSIS',
    description: 'Ajang kompetisi olahraga tahunan antar jurusan (AKL, MPLB, BDP, RPL, DKV, ULP) guna mempererat sportivitas, kekompakan, dan menjaring bibit atlet berbakat sekolah.',
    posterUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop',
    status: 'akan_datang',
    targetAudience: 'Tim Perwakilan Seluruh Jurusan SMESA',
    contactPerson: 'Koordinator SMESA Cup'
  },
  {
    id: 'agenda-4',
    title: 'Workshop Literasi Digital & Etika Komunikasi Media Sosial Remaja',
    category: 'Pembinaan Karakter',
    startDate: '2026-11-25',
    endDate: '2026-11-25',
    time: '08.30 - 12.00 WIB',
    location: 'Aula Graha SMESA',
    organizer: 'Kesiswaan & IT Club SMESA',
    description: 'Edukasi pemanfaatan media sosial yang santun, penangkalan hoaks, pencegahan cyberbullying, dan personal branding positif bagi siswa SMK di era kecerdasan buatan.',
    posterUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop',
    status: 'akan_datang',
    targetAudience: 'Siswa Kelas X & Pengurus Kelas',
    contactPerson: 'Kesiswaan SMESA'
  },
  {
    id: 'agenda-5',
    title: 'Simulasi dan Pemilihan Ketua OSIS Digital (PEMILOS) Masa Bakti Baru',
    category: 'Kegiatan OSIS & MPK',
    startDate: '2026-09-30',
    endDate: '2026-09-30',
    time: '07.30 - 13.00 WIB',
    location: 'Lab Komputer 1-6 & Akses Portal Siswa SMESA',
    organizer: 'Komisi Pemilihan Siswa (KPS) MPK SMESA',
    description: 'Pesta demokrasi pelajar SMK Negeri 1 Jember menggunakan sistem e-voting karya siswa RPL untuk memilih pasangan Ketua dan Wakil Ketua OSIS secara jujur, adil, dan transparan.',
    posterUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=600&auto=format&fit=crop',
    status: 'selesai',
    targetAudience: 'Seluruh Siswa SMESA',
    contactPerson: 'Ketua KPS MPK'
  },
  {
    id: 'agenda-6',
    title: 'Aksi Bersih Lingkungan Hijau & Penanaman Pohon di Kawasan Patrang Jember',
    category: 'Kegiatan Sosial',
    startDate: '2026-09-12',
    endDate: '2026-09-12',
    time: '06.30 - 10.00 WIB',
    location: 'Bantaran Sungai dan RTH Patrang Jember',
    organizer: 'Pramuka Gudep SMESA & Pecinta Alam',
    description: 'Kegiatan bakti sosial kesiswaan SMESA menjaga kelestarian lingkungan hidup dan mengedukasi masyarakat sekitar mengenai pemilahan sampah organik dan anorganik.',
    posterUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop',
    status: 'selesai',
    targetAudience: 'Anggota Pramuka & Relawan Siswa',
    contactPerson: 'Pembina Pramuka'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Juara 1 & Medali Emas LKS Tingkat Provinsi Jawa Timur',
    competitionName: 'Lomba Kompetensi Siswa (LKS) SMK Tingkat Jawa Timur XXXIV',
    award: 'Juara 1 (Medali Emas)',
    category: 'Teknologi dan Inovasi',
    level: 'Provinsi',
    year: 2026,
    date: '12 Oktober 2026',
    students: ['Muhammad Farel Danendra'],
    gradeAndMajor: 'XII Rekayasa Perangkat Lunak 1',
    mentors: ['Ahmad Fauzi, S.Kom.', 'Nurul Hidayati, S.T.'],
    description: 'Meraih skor tertinggi dalam perancangan aplikasi enterprise modern, optimasi basis data, dan implementasi UI/UX profesional pada bidang IT Software Solutions for Business.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'ach-2',
    title: 'Juara 1 Lomba Akuntansi & Keuangan Lembaga Tingkat Nasional',
    competitionName: 'National Accounting Olympiad (NAO) Universitas Negeri Surabaya',
    award: 'Juara 1 Nasional',
    category: 'Kompetensi Keahlian',
    level: 'Nasional',
    year: 2026,
    date: '24 September 2026',
    students: ['Siti Nur Aisyah', 'Alvinda Rahmadani', 'Dwi Kartika'],
    gradeAndMajor: 'XII Akuntansi dan Keuangan Lembaga 2',
    mentors: ['Dra. Endang Purwanti', 'Sri Wahyuni, M.Pd.'],
    description: 'Tim akuntansi SMESA menunjukkan kecermatan analisa laporan keuangan berbasis SAK ETAP serta kecepatan penyusunan siklus akuntansi terkomputerisasi.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'ach-3',
    title: 'Medali Emas Kejuaraan Pencak Silat Antar-Pelajar Jawa Timur',
    competitionName: 'Piala Gubernur Jawa Timur Kejuaraan Silat Pelajar 2026',
    award: 'Medali Emas Kelas C Putra',
    category: 'Olahraga',
    level: 'Provinsi',
    year: 2026,
    date: '05 September 2026',
    students: ['Bagus Prasetyo'],
    gradeAndMajor: 'XI Bisnis Daring dan Pemasaran 1',
    mentors: ['Budi Santoso, S.Pd.'],
    description: 'Menampilkan ketangkasan teknik serang bela diri pencak silat serta sportivitas tinggi, berhasil menundukkan lawan di babak final dengan keunggulan poin mutlak.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'ach-4',
    title: 'Juara 2 Festival & Lomba Seni Siswa Nasional (FLS2N) Bidang Film Pendek',
    competitionName: 'FLS2N Tingkat Provinsi Jawa Timur 2026',
    award: 'Juara 2 Provinsi',
    category: 'Seni dan Budaya',
    level: 'Provinsi',
    year: 2026,
    date: '18 Agustus 2026',
    students: ['Rian Ardiansyah (Sutradara)', 'Nabila Putri (Editor)'],
    gradeAndMajor: 'XII Desain Komunikasi Visual',
    mentors: ['Deni Irawan, M.Sn.'],
    description: 'Karya film pendek fiksi dokumenter bertema kearifan budaya kopi lereng Argopuro Jember berhasil memikat dewan juri melalui visual sinematik dan narasi emosional.',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'ach-5',
    title: 'Juara 1 Lomba Business Plan & Startup Pelajar Jawa Timur',
    competitionName: 'East Java Youth Entrepreneurship Summit 2026',
    award: 'Juara 1 & Best Pitching',
    category: 'Kewirausahaan',
    level: 'Provinsi',
    year: 2026,
    date: '02 Agustus 2026',
    students: ['Anisa Tri Wahyuni', 'Kevin Mahendra'],
    gradeAndMajor: 'XII Pemasaran & MPLB',
    mentors: ['Rina Kusuma Dewi, S.E.'],
    description: 'Mempresentasikan produk inovasi olahan edamame Jember bernilai tambah ekspor dengan strategi pemasaran multichannel berbasis digital funneling.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'ach-6',
    title: 'Juara Umum Lomba Ketangkasan Baris-Berbaris (LKBB) Tingkat Karesidenan Besuki',
    competitionName: 'LKBB Satria Baskara Se-Jawa Timur Wilayah Timur 2026',
    award: 'Juara Umum Bergilir & Danton Terbaik',
    category: 'Organisasi & Kepemimpinan',
    level: 'Kabupaten/Kota',
    year: 2026,
    date: '25 Juli 2026',
    students: ['Pasukan Khusus Paskibra SMESA (30 Siswa)'],
    gradeAndMajor: 'Gabungan Siswa X, XI, XII',
    mentors: ['Serka Agus Sugiarto', 'Dedy Kurniawan, S.Pd.'],
    description: 'Kekompakan formasi variasi baris berbaris dan kepemimpinan komandan peleton yang tegas mengantarkan Paskibra SMESA mempertahankan piala bergilir.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
    featured: false
  }
];

export const INITIAL_EXTRACURRICULARS: ExtracurricularItem[] = [
  {
    id: 'extra-1',
    name: 'Paskibra SMESA (Pasukan Pengibar Bendera)',
    shortName: 'PASKIBRA',
    category: 'Kepemimpinan dan Bela Negara',
    description: 'Wadah pembinaan kedisiplinan tingkat tinggi, kepemimpinan tangguh, loyalitas patriotik, dan ketangkasan baris berbaris formal serta variasi kreasi.',
    purpose: 'Membentuk pribadi pelajar yang berdisiplin baja, berpostur tegap, memiliki mental kepemimpinan kuat, dan siap mengabdi pada kehormatan bangsa dan sekolah.',
    mentorName: 'Dedy Kurniawan, S.Pd.',
    schedule: 'Selasa & Jumat, 15.30 - 17.30 WIB',
    location: 'Lapangan Upacara SMESA Jember',
    achievements: [
      'Juara Umum LKBB Karesidenan Besuki 2026',
      'Penyumbang Paskibraka Tingkat Kabupaten Jember & Provinsi Jatim 2025'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
    memberCount: 65,
    contactInfo: 'Instagram: @paskibra_smesa'
  },
  {
    id: 'extra-2',
    name: 'PMR Wira SMESA (Palang Merah Remaja)',
    shortName: 'PMR WIRA',
    category: 'Kemanusiaan dan Sosial',
    description: 'Organisasi pertolongan pertama, edukasi kesehatan remaja sebaya, kesiapsiagaan bencana, dan aksi donor darah sukarela terpadu bersama PMI Cabang Jember.',
    purpose: 'Menanamkan 7 Prinsip Dasar Gerakan Palang Merah dan memupuk kepedulian sosial yang tulus tanpa membeda-bedakan.',
    mentorName: 'Yuliana Wardani, S.Kep., Ners.',
    schedule: 'Rabu, 15.30 - 17.00 WIB',
    location: 'Ruang UKS Terpadu & Gazebo Kesiswaan',
    achievements: [
      'Peringkat 1 Jumpa Bakti Gembira (JUMBARA) PMR Kabupaten Jember',
      'Pemberian Penghargaan Unit Donor Darah Teraktif Sekolah 2025'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop',
    memberCount: 82,
    contactInfo: 'Ruang UKS SMESA Lantai 1'
  },
  {
    id: 'extra-3',
    name: 'Pramuka Gugus Depan SMESA',
    shortName: 'PRAMUKA',
    category: 'Kepemimpinan dan Bela Negara',
    description: 'Pendidikan kepanduan kepramukaan penegak yang aktif mengasah survival skills, pioneering, tali-temali, penjelajahan alam, dan bakti karya sosial kemasyarakatan.',
    purpose: 'Mewujudkan Dasa Darma Pramuka dalam karakter mandiri, cinta alam, hemat, cermat, dan bersahaja.',
    mentorName: 'Kak Drs. Mulyadi',
    schedule: 'Jumat, 13.30 - 16.00 WIB',
    location: 'Sanggar Pramuka SMESA & Halaman Belakang',
    achievements: [
      'Juara 1 Lomba Pionering Putra & Putri Jambore Penegak Jember',
      'Kontingen Raimuna Daerah Jawa Timur'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop',
    memberCount: 110,
    contactInfo: 'Sanggar Pramuka SMESA'
  },
  {
    id: 'extra-4',
    name: 'SMESA IT & Robotics Club',
    shortName: 'IT CLUB',
    category: 'Teknologi dan Keterampilan',
    description: 'Komunitas pecinta teknologi informasi, programming, web & mobile app development, competitive programming, desain UI/UX, dan mikrokontroler robotik IoT.',
    purpose: 'Mempersiapkan talenta digital unggulan SMESA siap tempur di LKS tingkat nasional dan industri teknologi global.',
    mentorName: 'Ahmad Fauzi, S.Kom.',
    schedule: 'Kamis, 15.30 - 17.30 WIB',
    location: 'Laboratorium Rekayasa Perangkat Lunak 2',
    achievements: [
      'Medali Emas LKS Wilker 3 Jatim Bidang IT Software 2026',
      'Finalis Hackathon Pelajar Nasional 2025'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    memberCount: 54,
    contactInfo: 'Email: itclub@smesa.sch.id'
  },
  {
    id: 'extra-5',
    name: 'Seni Tari Tradisional & Modern SMESA',
    shortName: 'SANGGAR TARI',
    category: 'Seni dan Budaya',
    description: 'Eksplorasi keindahan seni gerak tari nusantara seperti Tari Labako khas Jember, Gandrung Banyuwangi, serta tarian kontemporer untuk pengisi acara resmi.',
    purpose: 'Melestarikan warisan budaya lokal Jawa Timur serta melatih kelembutan budi pekerti dan apresiasi seni siswa.',
    mentorName: 'Dewi Anggraeni, S.Sn.',
    schedule: 'Senin & Kamis, 15.30 - 17.00 WIB',
    location: 'Studio Kesenian & Panggung Terbuka SMESA',
    achievements: [
      'Penyaji Terbaik Festival Seni Budaya Pelajar Jember 2026',
      'Duta Budaya Jember Karnaval Budaya'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    memberCount: 42,
    contactInfo: 'Studio Seni Budaya SMESA'
  },
  {
    id: 'extra-6',
    name: 'Futsal & Sepak Bola SMESA',
    shortName: 'FUTSAL',
    category: 'Olahraga',
    description: 'Klub futsal siswa dengan pembinaan intensif teknik dasar, taktik formasi, ketahanan stamina fisik, serta sportivitas bertanding di berbagai turnamen.',
    purpose: 'Menumbuhkan sportivitas, daya juang pantang menyerah, kerja sama tim solid, dan kebugaran jasmani optimal.',
    mentorName: 'Iwan Setiawan, S.Pd.',
    schedule: 'Senin & Rabu, 15.30 - 17.30 WIB',
    location: 'Lapangan Futsal SMESA / Lapangan Patrang',
    achievements: [
      'Juara 1 Liga Futsal Pelajar SMA/SMK Se-Jember 2025',
      'Piala Bergilir Dandim Cup Jember'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    memberCount: 50,
    contactInfo: 'Koordinator Futsal'
  },
  {
    id: 'extra-7',
    name: 'Kerohanian Islam (Rohis Nurul Ilmi)',
    shortName: 'ROHIS',
    category: 'Keagamaan',
    description: 'Wadah kajian keislaman, tadarus Al-Qur’an bersama, pembinaan akhlak mulia, hadrah shalawat, bakti sosial Ramadhan, serta peringatan hari besar Islam (PHBI).',
    purpose: 'Membina generasi muslim pelajar yang berakhlakul karimah, toleran, cerdas spiritual, dan berwawasan rahmatan lil alamin.',
    mentorName: 'Ust. Moh. Syafi’i, M.Pd.I.',
    schedule: 'Kamis (Kajian) & Jumat (Tadarus), 12.30 - 14.00 WIB',
    location: 'Masjid Nurul Ilmi SMESA',
    achievements: [
      'Juara 1 Lomba Festival Nasyid & Hadrah Pelajar Jember 2025',
      'Pengelola Program Infaq Harian Siswa Terpadu'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop',
    memberCount: 95,
    contactInfo: 'Masjid Nurul Ilmi SMESA'
  },
  {
    id: 'extra-8',
    name: 'English Conversation & Debate Society',
    shortName: 'ENGLISH CLUB',
    category: 'Teknologi dan Keterampilan',
    description: 'Komunitas bahasa Inggris interaktif yang melatih public speaking, speech contest, story telling, parliamentary debate, dan persiapan tes sertifikasi TOEIC.',
    purpose: 'Meningkatkan rasa percaya diri siswa SMESA berkomunikasi secara global dan bersaing di pasar kerja internasional.',
    mentorName: 'Retno Wulandari, S.Pd., M.Hum.',
    schedule: 'Selasa, 15.30 - 17.00 WIB',
    location: 'Laboratorium Bahasa SMESA',
    achievements: [
      'Juara 2 National English Debate Championship Politeknik Jember',
      'Juara 1 Speech Contest Tingkat Kabupaten 2025'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    memberCount: 38,
    contactInfo: 'Lab Bahasa Lantai 2'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Upacara Peringatan Hari Kemerdekaan RI di SMESA',
    description: 'Pasukan Pengibar Bendera Pusaka SMESA bertugas dengan sempurna di hadapan seluruh peserta upacara.',
    category: 'Upacara & Peringatan',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
    date: '17 Agustus 2026',
    year: 2026,
    photographer: 'Tim Dokumentasi Kesiswaan'
  },
  {
    id: 'gal-2',
    title: 'Karantina & Pembinaan Peserta LKS Jatim di Lab Komputer',
    description: 'Siswa RPL sedang melakukan simulasi modul pemrograman perangkat lunak intensif.',
    category: 'Lomba dan Prestasi',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    date: '02 Oktober 2026',
    year: 2026,
    photographer: 'Redaksi IT Club'
  },
  {
    id: 'gal-3',
    title: 'Aksi Solidaritas Donor Darah Palang Merah Remaja SMESA',
    description: 'Partisipasi antusias siswa kelas XII mendonorkan darah secara sukarela bekerja sama dengan PMI Jember.',
    category: 'Kegiatan Sosial',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop',
    date: '18 September 2026',
    year: 2026,
    photographer: 'Humas PMR Wira'
  },
  {
    id: 'gal-4',
    title: 'Atraksi Seni Tari Tradisional Labako di Panggung Budaya',
    description: 'Penampilan tari khas Jember oleh siswi ekstrakurikuler tari menyambut tamu dinas pendidikan.',
    category: 'Ekstrakurikuler',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    date: '28 Agustus 2026',
    year: 2026,
    photographer: 'Tim Media OSIS'
  },
  {
    id: 'gal-5',
    title: 'Apel Pagi Penguatan Budaya Disiplin & Senyum Salam Sapa',
    description: 'Pembiasaan pagi di gerbang masuk sekolah menyambut peserta didik dengan salam hangat guru piket.',
    category: 'Pembinaan Karakter',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
    date: '10 September 2026',
    year: 2026,
    photographer: 'Tim Ketertiban SMESA'
  },
  {
    id: 'gal-6',
    title: 'Final Turnamen Basket Antar Jurusan SMESA Cup',
    description: 'Momen sportivitas tim basket MPLB dan Akuntansi di lapangan basket outdoor SMESA.',
    category: 'Kegiatan Sekolah',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    date: '14 Agustus 2026',
    year: 2026,
    photographer: 'Seksi Olahraga OSIS'
  }
];

export const INITIAL_ASPIRATIONS: StudentAspiration[] = [
  {
    id: 'asp-1',
    ticketNumber: 'ASP-2026-001',
    name: 'Siswa Kelas XI RPL',
    isAnonymous: true,
    studentClass: 'XI RPL 1',
    category: 'Fasilitas Kesiswaan',
    title: 'Penambahan Stopkontak dan Titik Akses Wi-Fi di Area Gazebo Belajar',
    content: 'Mohon izin kepada Bidang Kesiswaan agar gazebo taman samping perpustakaan ditambahkan colokan listrik dan jangkauan sinyal Wi-Fi yang lebih stabil agar siswa dapat berdiskusi tugas organisasi dan lomba di sore hari secara nyaman.',
    createdAt: '2026-10-10 14:20',
    status: 'ditindaklanjuti',
    adminResponse: 'Terima kasih atas aspirasi yang sangat baik. Usulan telah dikoordinasikan dengan Tim Sarana Prasarana dan teknisi IT. Penambahan 4 titik stopkontak dan repeater Wi-Fi dijadwalkan terpasang akhir pekan ini.',
    respondedAt: '2026-10-12 09:30'
  },
  {
    id: 'asp-2',
    ticketNumber: 'ASP-2026-002',
    name: 'Aditia Pratama',
    isAnonymous: false,
    studentClass: 'XII AKL 3',
    category: 'Kegiatan Siswa',
    title: 'Usulan Penyelenggaraan Pelatihan Public Speaking & CV Review untuk Kelas XII',
    content: 'Apakah OSIS atau Kesiswaan bisa menyelenggarakan workshop public speaking dan review portofolio kerja sebelum masa kelulusan? Hal ini akan sangat membantu kami yang bersiap menghadapi wawancara kerja dan rekrutmen magang industri.',
    createdAt: '2026-10-08 11:15',
    status: 'disetujui',
    adminResponse: 'Usulan disetujui. Program ini telah dimasukkan ke dalam agenda kerja Sekbid Pengembangan Diri OSIS bekerja sama dengan BKK (Bursa Kerja Khusus) SMESA untuk bulan November mendatang.',
    respondedAt: '2026-10-09 13:40'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    ticketNumber: 'MSG-2026-001',
    fullName: 'Hendrawan Pratama (Wali Murid)',
    email: 'hendrawan.p@gmail.com',
    phone: '081234567890',
    subject: 'Prosedur Izin Siswa Mengikuti Lomba Olahraga Mandiri Tingkat Provinsi',
    topic: 'Izin & Kerjasama Lomba',
    message: 'Selamat siang Tim Kesiswaan SMESA. Anak saya terpilih mewakili klub bulutangkis Jember untuk kejuaraan provinsi di Malang pekan depan. Bagaimana prosedur resmi pengajuan surat dispensasi dari sekolah agar absensi tetap tercatat resmi? Terima kasih.',
    createdAt: '2026-10-11 10:05',
    isRead: true,
    status: 'dibalas'
  }
];
