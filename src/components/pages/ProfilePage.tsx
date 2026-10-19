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
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  Sparkles,
  Lock,
  UserCheck,
  AlertCircle,
  Building2
} from 'lucide-react';
import { 
  SchoolProfileData, 
  AdminUser, 
  AnnualWorkProgram, 
  StaffMember, 
  PublicDocumentItem 
} from '../../types';
import { StorageService } from '../../services/storageService';

interface ProfilePageProps {
  profile: SchoolProfileData;
  onNavigate: (tab: string) => void;
  currentAdmin?: AdminUser | null;
  onOpenLoginModal?: () => void;
  onOpenAdminPanel?: () => void;
  onDataChanged?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ 
  profile, 
  onNavigate,
  currentAdmin,
  onOpenLoginModal,
  onOpenAdminPanel,
  onDataChanged
}) => {
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  // Modals state
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [profileEditForm, setProfileEditForm] = useState({
    wakaName: profile.wakaName,
    wakaTitle: profile.wakaTitle,
    wakaGreeting: profile.wakaGreeting,
    wakaPhoto: profile.wakaPhoto,
    vision: profile.vision,
    overview: profile.overview || 'Bidang Kesiswaan SMK Negeri 1 Jember merupakan unit kerja strategis di bawah kepemimpinan Kepala Sekolah yang secara khusus bertugas merancang, mengawal, dan mengevaluasi seluruh kebijakan pembinaan peserta didik selama menempuh pendidikan di SMESA.',
    rolesText: (profile.rolesAndFunctions || [
      'Pembinaan Karakter & Budi Pekerti: Menerapkan pembiasaan 5S, kedisiplinan berkeadilan, dan nilai Profil Pelajar Pancasila.',
      'Pengawalan Organisasi Siswa: Membina kemandirian fungsionaris OSIS, MPK, dan kepanitiaan kegiatan siswa.',
      'Pengembangan 22 Ekstrakurikuler: Memfasilitasi sarana latihan, regenerasi anggota, dan kompetisi unjuk karya.',
      'Akselerasi Prestasi Lomba (SMESA JUARA): Membina kontingen kompetisi kejuruan LKS, O2SN, FLS2N, hingga level nasional.',
      'Perlindungan Siswa & Lingkungan Aman: Mencegah tindak kekerasan, perundungan siber, dan menciptakan rasa aman inklusif.'
    ]).join('\n'),
    missionsText: profile.missions.join('\n'),
    disciplinePointsText: profile.disciplineCulture.points.join('\n')
  });

  // Program Modal
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Partial<AnnualWorkProgram> | null>(null);

  // Staff Modal
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Partial<StaffMember> | null>(null);

  // Document Modal
  const [showDocModal, setShowDocModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Partial<PublicDocumentItem> | null>(null);

  const adminName = currentAdmin ? currentAdmin.name : 'Staf Kesiswaan SMESA';

  const requireAuth = (callback: () => void) => {
    if (!currentAdmin) {
      if (onOpenLoginModal) onOpenLoginModal();
    } else {
      callback();
    }
  };

  const openProfileEditModal = () => {
    requireAuth(() => {
      setProfileEditForm({
        wakaName: profile.wakaName,
        wakaTitle: profile.wakaTitle,
        wakaGreeting: profile.wakaGreeting,
        wakaPhoto: profile.wakaPhoto,
        vision: profile.vision,
        overview: profile.overview || 'Bidang Kesiswaan SMK Negeri 1 Jember merupakan unit kerja strategis di bawah kepemimpinan Kepala Sekolah yang secara khusus bertugas merancang, mengawal, dan mengevaluasi seluruh kebijakan pembinaan peserta didik selama menempuh pendidikan di SMESA.',
        rolesText: (profile.rolesAndFunctions && profile.rolesAndFunctions.length > 0 ? profile.rolesAndFunctions : [
          'Pembinaan Karakter & Budi Pekerti: Menerapkan pembiasaan 5S, kedisiplinan berkeadilan, dan nilai Profil Pelajar Pancasila.',
          'Pengawalan Organisasi Siswa: Membina kemandirian fungsionaris OSIS, MPK, dan kepanitiaan kegiatan siswa.',
          'Pengembangan 22 Ekstrakurikuler: Memfasilitasi sarana latihan, regenerasi anggota, dan kompetisi unjuk karya.',
          'Akselerasi Prestasi Lomba (SMESA JUARA): Membina kontingen kompetisi kejuruan LKS, O2SN, FLS2N, hingga level nasional.',
          'Perlindungan Siswa & Lingkungan Aman: Mencegah tindak kekerasan, perundungan siber, dan menciptakan rasa aman inklusif.'
        ]).join('\n'),
        missionsText: profile.missions.join('\n'),
        disciplinePointsText: profile.disciplineCulture.points.join('\n')
      });
      setShowProfileEditModal(true);
    });
  };

  const handleDownload = (docName: string) => {
    setDownloadNotification(`Mengunduh dokumen: "${docName}"...`);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  // Profile Save
  const handleSaveProfileData = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRoles = profileEditForm.rolesText
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);
    const updatedMissions = profileEditForm.missionsText
      .split('\n')
      .map(m => m.trim())
      .filter(Boolean);
    const updatedPoints = profileEditForm.disciplinePointsText
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);

    StorageService.updateProfile({
      overview: profileEditForm.overview,
      rolesAndFunctions: updatedRoles.length > 0 ? updatedRoles : profile.rolesAndFunctions,
      wakaName: profileEditForm.wakaName,
      wakaTitle: profileEditForm.wakaTitle,
      wakaGreeting: profileEditForm.wakaGreeting,
      wakaPhoto: profileEditForm.wakaPhoto,
      vision: profileEditForm.vision,
      missions: updatedMissions.length > 0 ? updatedMissions : profile.missions,
      disciplineCulture: {
        ...profile.disciplineCulture,
        points: updatedPoints.length > 0 ? updatedPoints : profile.disciplineCulture.points
      }
    }, adminName);

    setShowProfileEditModal(false);
    if (onDataChanged) onDataChanged();
  };

  // Program Save & Delete
  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram || !editingProgram.title) return;

    StorageService.saveAnnualProgram({
      id: editingProgram.id,
      title: editingProgram.title,
      category: editingProgram.category || 'Program Kerja Kesiswaan',
      period: editingProgram.period || 'Tahun Ajaran 2026/2027',
      target: editingProgram.target || 'Seluruh Siswa SMESA',
      description: editingProgram.description || '',
      status: editingProgram.status || 'terencana'
    }, adminName);

    setShowProgramModal(false);
    setEditingProgram(null);
    if (onDataChanged) onDataChanged();
  };

  const handleDeleteProgram = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus program kerja ini?')) {
      StorageService.deleteAnnualProgram(id, adminName);
      if (onDataChanged) onDataChanged();
    }
  };

  // Staff Save & Delete
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff || !editingStaff.name || !editingStaff.title) return;

    StorageService.saveStaffMember({
      id: editingStaff.id,
      title: editingStaff.title,
      name: editingStaff.name,
      role: editingStaff.role || 'Staf Pembina Kesiswaan',
      avatar: editingStaff.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      desc: editingStaff.desc || ''
    }, adminName);

    setShowStaffModal(false);
    setEditingStaff(null);
    if (onDataChanged) onDataChanged();
  };

  const handleDeleteStaff = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus anggota struktur ini?')) {
      StorageService.deleteStaffMember(id, adminName);
      if (onDataChanged) onDataChanged();
    }
  };

  // Document Save & Delete
  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !editingDoc.title) return;

    StorageService.savePublicDocument({
      id: editingDoc.id,
      title: editingDoc.title,
      category: editingDoc.category || 'Dokumen Resmi Kesiswaan',
      format: editingDoc.format || 'PDF',
      size: editingDoc.size || '1.5 MB',
      updated: editingDoc.updated || 'Oktober 2026',
      url: editingDoc.url || '#'
    }, adminName);

    setShowDocModal(false);
    setEditingDoc(null);
    if (onDataChanged) onDataChanged();
  };

  const handleDeleteDoc = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokumen publik ini?')) {
      StorageService.deletePublicDocument(id, adminName);
      if (onDataChanged) onDataChanged();
    }
  };

  const annualPrograms = profile.annualPrograms || [];
  const organizationalStructure = profile.organizationalStructure || [];
  const publicDocuments = profile.publicDocuments || [];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-lg shadow-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>Profil Resmi Kesiswaan</span>
            </div>

            {/* Admin Management Status Indicator */}
            {currentAdmin ? (
              <div className="flex items-center gap-2.5 bg-slate-900/90 border border-emerald-500/40 px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="leading-tight mr-1">
                  <span className="font-extrabold text-white text-xs block truncate max-w-[140px]">{currentAdmin.name}</span>
                  <span className="text-[10px] text-amber-400 font-semibold">{currentAdmin.role}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenAdminPanel ? onOpenAdminPanel() : (onOpenLoginModal && onOpenLoginModal())}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm ml-1"
                  title="Buka Pengelolaan Profil Kesiswaan di Panel Admin"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Buka Panel Admin</span>
                </button>
              </div>
            ) : null}
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
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm relative">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Tentang Kami
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Gambaran Umum & Peran Kesiswaan
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {profile.overview || 'Bidang Kesiswaan SMK Negeri 1 Jember merupakan unit kerja strategis di bawah kepemimpinan Kepala Sekolah yang secara khusus bertugas merancang, mengawal, dan mengevaluasi seluruh kebijakan pembinaan peserta didik selama menempuh pendidikan di SMESA.'}
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Fungsi & Tanggung Jawab Utama:
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {(profile.rolesAndFunctions && profile.rolesAndFunctions.length > 0 ? profile.rolesAndFunctions : [
                  'Pembinaan Karakter & Budi Pekerti: Menerapkan pembiasaan 5S, kedisiplinan berkeadilan, dan nilai Profil Pelajar Pancasila.',
                  'Pengawalan Organisasi Siswa: Membina kemandirian fungsionaris OSIS, MPK, dan kepanitiaan kegiatan siswa.',
                  'Pengembangan 22 Ekstrakurikuler: Memfasilitasi sarana latihan, regenerasi anggota, dan kompetisi unjuk karya.',
                  'Akselerasi Prestasi Lomba (SMESA JUARA): Membina kontingen kompetisi kejuruan LKS, O2SN, FLS2N, hingga level nasional.',
                  'Perlindungan Siswa & Lingkungan Aman: Mencegah tindak kekerasan, perundungan siber, dan menciptakan rasa aman inklusif.'
                ]).map((rf, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span>{rf}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visi dan Misi */}
          <div className="lg:col-span-5 bg-blue-950 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-blue-900 relative">
            <div className="space-y-1">
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

        {/* SECTION: PROGRAM KERJA TAHUNAN KESISWAAN */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Program Kerja Tahunan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Agenda & Program Kerja Bidang Kesiswaan
            </h2>
            <p className="text-xs text-slate-500">
              Program strategis tahunan pembinaan karakter, masa pengenalan, pemusatan lomba, dan gelar kreasi pelajar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {annualPrograms.map((prog) => (
              <div 
                key={prog.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                      {prog.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      prog.status === 'selesai' ? 'bg-emerald-100 text-emerald-800' :
                      prog.status === 'berjalan' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {prog.status === 'selesai' ? 'Selesai' : prog.status === 'berjalan' ? 'Sedang Berjalan' : 'Terencana'}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <div>
                    <span className="block font-semibold text-slate-700">{prog.period}</span>
                    <span className="text-[10px] text-slate-500">Target: {prog.target}</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Resmi Kesiswaan
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Budaya Disiplin 5S Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 relative">
          <div className="flex items-start justify-between gap-4">
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

            <button
              onClick={openProfileEditModal}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300/70 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Budaya 5S</span>
            </button>
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
          <div className="space-y-1">
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
            {organizationalStructure.map((staff) => (
              <div
                key={staff.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 group-hover:border-amber-400 transition-colors"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider truncate">
                        {staff.title}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug truncate">
                        {staff.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{staff.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {staff.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="text-[10px] text-slate-400">Tim Kesiswaan SMESA</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                    Fungsionaris
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unduhan Dokumen Publik */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publicDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between gap-4 transition-colors group"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 leading-snug truncate">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <span className="font-semibold text-amber-700">{doc.category}</span>
                      <span>·</span>
                      <span>{doc.format}</span>
                      <span>·</span>
                      <span>{doc.size}</span>
                      <span>·</span>
                      <span>{doc.updated}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownload(doc.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-600" />
                    <span className="hidden sm:inline">Unduh</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL 1: EDIT PROFIL & VISI MISI */}
      {showProfileEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Edit Profil Kesiswaan & Visi Misi
                </h3>
              </div>
              <button 
                onClick={() => setShowProfileEditModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfileData} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Pimpinan / Waka Kesiswaan</label>
                  <input
                    type="text"
                    required
                    value={profileEditForm.wakaName}
                    onChange={(e) => setProfileEditForm({ ...profileEditForm, wakaName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan Resmi</label>
                  <input
                    type="text"
                    required
                    value={profileEditForm.wakaTitle}
                    onChange={(e) => setProfileEditForm({ ...profileEditForm, wakaTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Waka Kesiswaan</label>
                <input
                  type="url"
                  value={profileEditForm.wakaPhoto}
                  onChange={(e) => setProfileEditForm({ ...profileEditForm, wakaPhoto: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sambutan Resmi Waka Kesiswaan</label>
                <textarea
                  rows={4}
                  required
                  value={profileEditForm.wakaGreeting}
                  onChange={(e) => setProfileEditForm({ ...profileEditForm, wakaGreeting: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gambaran Umum Bidang Kesiswaan SMESA</label>
                <textarea
                  rows={3}
                  required
                  value={profileEditForm.overview}
                  onChange={(e) => setProfileEditForm({ ...profileEditForm, overview: e.target.value })}
                  placeholder="Deskripsikan gambaran umum peran dan unit kerja kesiswaan..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Peran & Tanggung Jawab Utama (Satu poin per baris)</label>
                <textarea
                  rows={4}
                  value={profileEditForm.rolesText}
                  onChange={(e) => setProfileEditForm({ ...profileEditForm, rolesText: e.target.value })}
                  placeholder="Contoh: Pembinaan Karakter & Budi Pekerti: Menerapkan pembiasaan 5S..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Visi Kesiswaan SMESA</label>
                <textarea
                  rows={3}
                  required
                  value={profileEditForm.vision}
                  onChange={(e) => setProfileEditForm({ ...profileEditForm, vision: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Misi Kesiswaan (Satu misi per baris)</label>
                <textarea
                  rows={4}
                  value={profileEditForm.missionsText}
                  onChange={(e) => setProfileEditForm({ ...profileEditForm, missionsText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Poin Budaya Disiplin 5S (Satu poin per baris)</label>
                <textarea
                  rows={4}
                  value={profileEditForm.disciplinePointsText}
                  onChange={(e) => setProfileEditForm({ ...profileEditForm, disciplinePointsText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowProfileEditModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: TAMBAH / EDIT PROGRAM KERJA */}
      {showProgramModal && editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-900" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingProgram.id ? 'Edit Program Kerja Kesiswaan' : 'Tambah Program Kerja Baru'}
                </h3>
              </div>
              <button 
                onClick={() => setShowProgramModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Program Kerja</label>
                <input
                  type="text"
                  required
                  value={editingProgram.title || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                  placeholder="Contoh: Pemusatan Latihan Kontingen LKS 2026"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    required
                    value={editingProgram.category || ''}
                    onChange={(e) => setEditingProgram({ ...editingProgram, category: e.target.value })}
                    placeholder="Contoh: Prestasi / Karakter / Seni"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Program</label>
                  <select
                    value={editingProgram.status || 'terencana'}
                    onChange={(e) => setEditingProgram({ ...editingProgram, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium bg-white"
                  >
                    <option value="terencana">Terencana</option>
                    <option value="berjalan">Sedang Berjalan</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Periode / Waktu</label>
                  <input
                    type="text"
                    required
                    value={editingProgram.period || ''}
                    onChange={(e) => setEditingProgram({ ...editingProgram, period: e.target.value })}
                    placeholder="Contoh: Oktober - November 2026"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sasaran Target Peserta</label>
                  <input
                    type="text"
                    required
                    value={editingProgram.target || ''}
                    onChange={(e) => setEditingProgram({ ...editingProgram, target: e.target.value })}
                    placeholder="Contoh: Seluruh Siswa Kelas X"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Lengkap Program</label>
                <textarea
                  rows={4}
                  required
                  value={editingProgram.description || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                  placeholder="Jelaskan tujuan dan rencana aksi program kesiswaan ini..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowProgramModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Simpan Program Kerja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: TAMBAH / EDIT STRUKTUR KESISWAAN */}
      {showStaffModal && editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-900" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingStaff.id ? 'Edit Anggota Struktur Kesiswaan' : 'Tambah Anggota Struktur Baru'}
                </h3>
              </div>
              <button 
                onClick={() => setShowStaffModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={editingStaff.name || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  placeholder="Contoh: Dedy Kurniawan, S.Pd."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan / Posisi</label>
                  <input
                    type="text"
                    required
                    value={editingStaff.title || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, title: e.target.value })}
                    placeholder="Contoh: Pembina OSIS & MPK"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Peran / Fokus Bidang</label>
                  <input
                    type="text"
                    required
                    value={editingStaff.role || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                    placeholder="Contoh: Demokrasi & Kaderisasi Pelajar"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil</label>
                <input
                  type="url"
                  value={editingStaff.avatar || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Uraian Tugas & Tanggung Jawab</label>
                <textarea
                  rows={3}
                  required
                  value={editingStaff.desc || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, desc: e.target.value })}
                  placeholder="Deskripsikan peran dan tanggung jawab jabatan ini..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowStaffModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Simpan Anggota Struktur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: TAMBAH / EDIT DOKUMEN PUBLIK */}
      {showDocModal && editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-900" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingDoc.id ? 'Edit Dokumen Resmi Kesiswaan' : 'Tambah Dokumen Unduhan Baru'}
                </h3>
              </div>
              <button 
                onClick={() => setShowDocModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Dokumen Publik</label>
                <input
                  type="text"
                  required
                  value={editingDoc.title || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  placeholder="Contoh: Buku Pedoman Tata Tertib Siswa SMESA 2026/2027"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Dokumen</label>
                  <input
                    type="text"
                    required
                    value={editingDoc.category || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                    placeholder="Contoh: Tata Tertib / Formulir Lomba"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Format Berkas</label>
                  <input
                    type="text"
                    required
                    value={editingDoc.format || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, format: e.target.value })}
                    placeholder="Contoh: PDF / DOCX"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ukuran Berkas</label>
                  <input
                    type="text"
                    required
                    value={editingDoc.size || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, size: e.target.value })}
                    placeholder="Contoh: 2.4 MB"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bulan & Tahun Update</label>
                  <input
                    type="text"
                    required
                    value={editingDoc.updated || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, updated: e.target.value })}
                    placeholder="Contoh: Oktober 2026"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowDocModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
