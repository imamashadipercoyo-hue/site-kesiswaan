import React, { useState, useEffect } from 'react';
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
  Clock,
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  UserCheck
} from 'lucide-react';
import { 
  StudentAspiration, 
  AdminUser, 
  OsisMpkData, 
  OsisSekbid, 
  OsisProker, 
  PilketosStage, 
  MpkCommission 
} from '../../types';
import { StorageService } from '../../services/storageService';

interface OsisMpkPageProps {
  aspirations: StudentAspiration[];
  onAspirationSubmitted: () => void;
  currentAdmin?: AdminUser | null;
  onOpenLoginModal?: () => void;
  onDataChanged?: () => void;
}

export const OsisMpkPage: React.FC<OsisMpkPageProps> = ({
  aspirations,
  onAspirationSubmitted,
  currentAdmin,
  onOpenLoginModal,
  onDataChanged
}) => {
  const [activeTab, setActiveTab] = useState<'osis' | 'mpk' | 'aspirasi'>('osis');
  const [osisData, setOsisData] = useState<OsisMpkData>(() => StorageService.getOsisMpk());

  // Aspiration Form State
  const [aspirationTitle, setAspirationTitle] = useState('');
  const [aspirationContent, setAspirationContent] = useState('');
  const [aspirationCategory, setAspirationCategory] = useState<StudentAspiration['category']>('Fasilitas Kesiswaan');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Modals State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    cabinetName: '',
    osisPeriod: '',
    chiefName: '',
    chiefClass: '',
    viceChiefName: '',
    viceChiefClass: '',
    osisDescription: '',
    osisVision: '',
    missionsText: ''
  });

  const [showSekbidModal, setShowSekbidModal] = useState(false);
  const [editingSekbid, setEditingSekbid] = useState<Partial<OsisSekbid> | null>(null);

  const [showProkerModal, setShowProkerModal] = useState(false);
  const [editingProker, setEditingProker] = useState<Partial<OsisProker> | null>(null);

  const [showStageModal, setShowStageModal] = useState(false);
  const [editingStage, setEditingStage] = useState<Partial<PilketosStage> | null>(null);

  const adminName = currentAdmin ? currentAdmin.name : 'Staf Kesiswaan SMESA';

  const reloadData = () => {
    setOsisData(StorageService.getOsisMpk());
    if (onDataChanged) onDataChanged();
  };

  const requireAuth = (callback: () => void) => {
    if (!currentAdmin) {
      if (onOpenLoginModal) onOpenLoginModal();
    } else {
      callback();
    }
  };

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

  // Save OSIS Profile & Visi Misi
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMissions = profileForm.missionsText
      .split('\n')
      .map(m => m.trim())
      .filter(Boolean);

    StorageService.updateOsisMpk({
      cabinetName: profileForm.cabinetName,
      osisPeriod: profileForm.osisPeriod,
      chiefName: profileForm.chiefName,
      chiefClass: profileForm.chiefClass,
      viceChiefName: profileForm.viceChiefName,
      viceChiefClass: profileForm.viceChiefClass,
      osisDescription: profileForm.osisDescription,
      osisVision: profileForm.osisVision,
      osisMissions: updatedMissions.length > 0 ? updatedMissions : osisData.osisMissions
    }, adminName);

    setShowProfileModal(false);
    reloadData();
  };

  // Save & Delete Sekbid
  const handleSaveSekbid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSekbid || !editingSekbid.title || !editingSekbid.num) return;

    StorageService.saveOsisSekbid({
      id: editingSekbid.id,
      num: editingSekbid.num,
      title: editingSekbid.title,
      coordinator: editingSekbid.coordinator || '',
      desc: editingSekbid.desc || ''
    }, adminName);

    setShowSekbidModal(false);
    setEditingSekbid(null);
    reloadData();
  };

  const handleDeleteSekbid = (id: string) => {
    if (window.confirm('Hapus divisi / sekbid OSIS ini?')) {
      StorageService.deleteOsisSekbid(id, adminName);
      reloadData();
    }
  };

  // Save & Delete Proker
  const handleSaveProker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProker || !editingProker.name) return;

    StorageService.saveOsisProker({
      id: editingProker.id,
      name: editingProker.name,
      division: editingProker.division || 'Sekbid OSIS',
      month: editingProker.month || 'November 2026',
      status: editingProker.status || 'terencana',
      desc: editingProker.desc || ''
    }, adminName);

    setShowProkerModal(false);
    setEditingProker(null);
    reloadData();
  };

  const handleDeleteProker = (id: string) => {
    if (window.confirm('Hapus program kerja OSIS ini?')) {
      StorageService.deleteOsisProker(id, adminName);
      reloadData();
    }
  };

  // Save & Delete Pilketos Stage
  const handleSaveStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStage || !editingStage.stage) return;

    StorageService.savePilketosStage({
      id: editingStage.id,
      stage: editingStage.stage,
      date: editingStage.date || '',
      status: editingStage.status || 'akan_datang',
      desc: editingStage.desc || ''
    }, adminName);

    setShowStageModal(false);
    setEditingStage(null);
    reloadData();
  };

  const handleDeleteStage = (id: string) => {
    if (window.confirm('Hapus tahapan PEMILOS ini?')) {
      StorageService.deletePilketosStage(id, adminName);
      reloadData();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded">
              <Users className="w-3.5 h-3.5" />
              <span>Organisasi Kesiswaan</span>
            </div>

            {/* Quick Management Badge / Login Trigger */}
            {currentAdmin ? (
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-lg">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Login: {currentAdmin.name} ({currentAdmin.role})</span>
              </div>
            ) : (
              <button
                onClick={() => onOpenLoginModal && onOpenLoginModal()}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-400/30 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Login Pengelola untuk Edit & Tambah</span>
              </button>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            OSIS & MPK SMK Negeri 1 Jember
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            Wadah kepemimpinan, kreasi, dan demokrasi pelajar SMESA. Mengembangkan potensi diri menjadi pemimpin masa depan yang berintegritas dan solutif.
          </p>

          {/* Quick Management Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => requireAuth(() => {
                setProfileForm({
                  cabinetName: osisData.cabinetName,
                  osisPeriod: osisData.osisPeriod,
                  chiefName: osisData.chiefName,
                  chiefClass: osisData.chiefClass,
                  viceChiefName: osisData.viceChiefName,
                  viceChiefClass: osisData.viceChiefClass,
                  osisDescription: osisData.osisDescription,
                  osisVision: osisData.osisVision,
                  missionsText: osisData.osisMissions.join('\n')
                });
                setShowProfileModal(true);
              })}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profil & Visi OSIS</span>
            </button>

            <button
              onClick={() => requireAuth(() => {
                setEditingProker({
                  name: '',
                  division: 'Sekbid OSIS',
                  month: 'November 2026',
                  status: 'terencana',
                  desc: ''
                });
                setShowProkerModal(true);
              })}
              className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-colors cursor-pointer border border-blue-700"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Tambah Program Kerja</span>
            </button>

            <button
              onClick={() => requireAuth(() => {
                setEditingSekbid({
                  num: `Sekbid ${osisData.sekbids.length + 1}`,
                  title: '',
                  coordinator: '',
                  desc: ''
                });
                setShowSekbidModal(true);
              })}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-colors cursor-pointer border border-slate-700"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Tambah Sekbid Baru</span>
            </button>

            <button
              onClick={() => requireAuth(() => {
                setEditingStage({
                  stage: '',
                  date: '',
                  status: 'akan_datang',
                  desc: ''
                });
                setShowStageModal(true);
              })}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-colors cursor-pointer border border-slate-700"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Tambah Tahapan Pilketos</span>
            </button>
          </div>

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
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {osisData.osisPeriod} · {osisData.cabinetName}
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      Profil Kepengurusan OSIS SMESA
                    </h2>
                  </div>

                  <button
                    onClick={() => requireAuth(() => {
                      setProfileForm({
                        cabinetName: osisData.cabinetName,
                        osisPeriod: osisData.osisPeriod,
                        chiefName: osisData.chiefName,
                        chiefClass: osisData.chiefClass,
                        viceChiefName: osisData.viceChiefName,
                        viceChiefClass: osisData.viceChiefClass,
                        osisDescription: osisData.osisDescription,
                        osisVision: osisData.osisVision,
                        missionsText: osisData.osisMissions.join('\n')
                      });
                      setShowProfileModal(true);
                    })}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300/70 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profil</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {osisData.osisDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Ketua OSIS</span>
                    <h3 className="font-bold text-sm text-slate-900">{osisData.chiefName}</h3>
                    <p className="text-xs text-slate-500">{osisData.chiefClass}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Wakil Ketua OSIS</span>
                    <h3 className="font-bold text-sm text-slate-900">{osisData.viceChiefName}</h3>
                    <p className="text-xs text-slate-500">{osisData.viceChiefClass}</p>
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
              <div className="lg:col-span-5 bg-blue-950 text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl border border-blue-900 relative">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Visi & Misi OSIS
                  </span>
                  <button
                    onClick={() => requireAuth(() => {
                      setProfileForm({
                        cabinetName: osisData.cabinetName,
                        osisPeriod: osisData.osisPeriod,
                        chiefName: osisData.chiefName,
                        chiefClass: osisData.chiefClass,
                        viceChiefName: osisData.viceChiefName,
                        viceChiefClass: osisData.viceChiefClass,
                        osisDescription: osisData.osisDescription,
                        osisVision: osisData.osisVision,
                        missionsText: osisData.osisMissions.join('\n')
                      });
                      setShowProfileModal(true);
                    })}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-white/10 hover:bg-white/20 border border-amber-400/40 px-2 py-1 rounded-md transition-colors cursor-pointer shrink-0"
                  >
                    <Edit3 className="w-3 h-3 text-amber-400" />
                    <span>Edit</span>
                  </button>
                </div>

                <h3 className="text-xl font-bold tracking-tight">
                  Visi Kepengurusan:
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-slate-900/80 p-4 rounded-xl border border-blue-900/60">
                  "{osisData.osisVision}"
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase">Misi Utama:</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {osisData.osisMissions.map((mis, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{mis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Program Kerja Unggulan OSIS (Edit & Tambah) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Program Kerja
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Program Kerja Unggulan OSIS SMESA
                  </h3>
                  <p className="text-xs text-slate-500">
                    Rangkaian inisiatif kegiatan kreasi, kepemimpinan, dan kewirausahaan siswa SMESA.
                  </p>
                </div>

                <button
                  onClick={() => requireAuth(() => {
                    setEditingProker({
                      name: '',
                      division: 'Sekbid OSIS',
                      month: 'November 2026',
                      status: 'terencana',
                      desc: ''
                    });
                    setShowProkerModal(true);
                  })}
                  className="inline-flex items-center gap-1.5 bg-blue-950 hover:bg-slate-900 text-amber-400 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Proker Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {osisData.prokers.map((prok) => (
                  <div 
                    key={prok.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-300 flex flex-col justify-between space-y-3 transition-colors group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                          {prok.division}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          prok.status === 'terlaksana' ? 'bg-emerald-100 text-emerald-800' :
                          prok.status === 'berjalan' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {prok.status === 'terlaksana' ? 'Terlaksana' : prok.status === 'berjalan' ? 'Sedang Berjalan' : 'Terencana'}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 leading-snug">
                        {prok.name}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {prok.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        <span>{prok.month}</span>
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => requireAuth(() => {
                            setEditingProker(prok);
                            setShowProkerModal(true);
                          })}
                          className="p-1.5 text-blue-900 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                          title="Edit Program Kerja"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => requireAuth(() => handleDeleteProker(prok.id))}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Hapus Program Kerja"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8 Seksi Bidang OSIS (Edit & Tambah) */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Struktur Seksi Bidang
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Seksi Bidang (Sekbid) OSIS SMESA
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pembagian divisi kerja kepengurusan dalam mengeksekusi program pembinaan peserta didik.
                  </p>
                </div>

                <button
                  onClick={() => requireAuth(() => {
                    setEditingSekbid({
                      num: `Sekbid ${osisData.sekbids.length + 1}`,
                      title: '',
                      coordinator: '',
                      desc: ''
                    });
                    setShowSekbidModal(true);
                  })}
                  className="inline-flex items-center gap-1.5 bg-blue-950 hover:bg-slate-900 text-amber-400 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Sekbid</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {osisData.sekbids.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 space-y-2 flex flex-col justify-between group">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-blue-900 uppercase">{item.num}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => requireAuth(() => {
                              setEditingSekbid(item);
                              setShowSekbidModal(true);
                            })}
                            className="p-1 text-slate-400 hover:text-blue-900 transition-colors cursor-pointer"
                            title="Edit Sekbid"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => requireAuth(() => handleDeleteSekbid(item.id))}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Hapus Sekbid"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">{item.title}</h4>
                      {item.coordinator && (
                        <p className="text-[10px] font-semibold text-amber-700">Koord: {item.coordinator}</p>
                      )}
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">{item.desc}</p>
                    </div>
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
                  {osisData.mpkDescription}
                </p>
              </div>

              {/* Komisi-komisi MPK */}
              <div className="space-y-4 pt-2">
                <h3 className="font-extrabold text-base text-slate-900">
                  Komisi-Komisi Kerja MPK SMESA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {osisData.mpkCommissions.map((kom) => (
                    <div key={kom.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <span className="text-xs font-bold text-blue-900">{kom.name}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{kom.focus}</p>
                      <span className="text-[10px] text-slate-500 font-semibold block">{kom.members}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PEMILOS Showcase & Tahapan (Edit & Tambah) */}
              <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <Vote className="w-4 h-4 text-amber-400" />
                      <span>Demokrasi Pelajar SMESA</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">
                      PEMILOS Digital: E-Voting Terbuka & Akuntabel
                    </h3>
                  </div>

                  <button
                    onClick={() => requireAuth(() => {
                      setEditingStage({
                        stage: '',
                        date: '',
                        status: 'akan_datang',
                        desc: ''
                      });
                      setShowStageModal(true);
                    })}
                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Tahapan PEMILOS</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
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

                {/* Tahapan Pilketos Cards */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-sm text-slate-200">
                    Agenda & Tahapan Pelaksanaan PEMILOS SMESA:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {osisData.pilketosStages.map((stg) => (
                      <div key={stg.id} className="p-3.5 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-amber-300">{stg.stage}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              stg.status === 'selesai' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              stg.status === 'berlangsung' ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-slate-700 text-slate-300'
                            }`}>
                              {stg.status === 'selesai' ? 'Selesai' : stg.status === 'berlangsung' ? 'Berlangsung' : 'Akan Datang'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300">{stg.desc}</p>
                          <span className="text-[10px] text-amber-400 font-semibold block">{stg.date}</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => requireAuth(() => {
                              setEditingStage(stg);
                              setShowStageModal(true);
                            })}
                            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Edit Tahapan"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => requireAuth(() => handleDeleteStage(stg.id))}
                            className="p-1 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Hapus Tahapan"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
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
                          name="privacy"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(true)}
                          className="text-blue-900 focus:ring-blue-900"
                        />
                        <span>Kirim Anonim (Rahasia)</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="privacy"
                          checked={!isAnonymous}
                          onChange={() => setIsAnonymous(false)}
                          className="text-blue-900 focus:ring-blue-900"
                        />
                        <span>Sertakan Nama & Kelas</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Identity fields if not anonymous */}
                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Contoh: Muhammad Farel"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kelas & Jurusan</label>
                      <input
                        type="text"
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        placeholder="Contoh: XI RPL 1"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Judul Aspirasi / Saran
                  </label>
                  <input
                    type="text"
                    required
                    value={aspirationTitle}
                    onChange={(e) => setAspirationTitle(e.target.value)}
                    placeholder="Contoh: Usulan Penambahan Rak Buku Bacaan di Gazebo Kesiswaan"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Isi Pesan Aspirasi
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={aspirationContent}
                    onChange={(e) => setAspirationContent(e.target.value)}
                    placeholder="Tuliskan saran, kritik, atau usulan Anda secara santun dan terperinci..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Mengirimkan...' : 'Kirim Aspirasi ke Tim Kesiswaan'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Approved Aspirations Feed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Aspirasi Siswa yang Telah Ditindaklanjuti
                  </h3>
                  <p className="text-xs text-slate-500">
                    Transparansi aspirasi yang telah diverifikasi dan mendapat tanggapan resmi dari kesiswaan.
                  </p>
                </div>
                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                  {approvedAspirations.length} Aspirasi Terpublikasi
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approvedAspirations.map((asp) => (
                  <div key={asp.id} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {asp.category}
                      </span>
                      <span className="text-slate-400 font-mono">{asp.ticketNumber} · {asp.createdAt}</span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{asp.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{asp.content}</p>

                    <div className="text-[11px] text-slate-400">
                      Pengirim: <span className="font-semibold text-slate-600">{asp.name} {asp.studentClass ? `(${asp.studentClass})` : ''}</span>
                    </div>

                    {asp.adminResponse && (
                      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-950 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-800 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tanggapan Resmi Tim Kesiswaan ({asp.respondedAt}):</span>
                        </div>
                        <p className="leading-relaxed text-[11px] text-slate-700">{asp.adminResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: EDIT PROFIL & VISI OSIS */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Edit Profil & Visi Misi OSIS SMESA
                </h3>
              </div>
              <button onClick={() => setShowProfileModal(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Kabinet OSIS</label>
                  <input
                    type="text"
                    required
                    value={profileForm.cabinetName}
                    onChange={(e) => setProfileForm({ ...profileForm, cabinetName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Masa Bakti</label>
                  <input
                    type="text"
                    required
                    value={profileForm.osisPeriod}
                    onChange={(e) => setProfileForm({ ...profileForm, osisPeriod: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Ketua OSIS</label>
                  <input
                    type="text"
                    required
                    value={profileForm.chiefName}
                    onChange={(e) => setProfileForm({ ...profileForm, chiefName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas Ketua OSIS</label>
                  <input
                    type="text"
                    required
                    value={profileForm.chiefClass}
                    onChange={(e) => setProfileForm({ ...profileForm, chiefClass: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Wakil Ketua OSIS</label>
                  <input
                    type="text"
                    required
                    value={profileForm.viceChiefName}
                    onChange={(e) => setProfileForm({ ...profileForm, viceChiefName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas Wakil Ketua OSIS</label>
                  <input
                    type="text"
                    required
                    value={profileForm.viceChiefClass}
                    onChange={(e) => setProfileForm({ ...profileForm, viceChiefClass: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Kepengurusan OSIS</label>
                <textarea
                  rows={3}
                  required
                  value={profileForm.osisDescription}
                  onChange={(e) => setProfileForm({ ...profileForm, osisDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Visi OSIS</label>
                <textarea
                  rows={3}
                  required
                  value={profileForm.osisVision}
                  onChange={(e) => setProfileForm({ ...profileForm, osisVision: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Misi OSIS (Satu baris per misi)</label>
                <textarea
                  rows={4}
                  value={profileForm.missionsText}
                  onChange={(e) => setProfileForm({ ...profileForm, missionsText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
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

      {/* MODAL 2: TAMBAH / EDIT SEKBID */}
      {showSekbidModal && editingSekbid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-900" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingSekbid.id ? 'Edit Seksi Bidang OSIS' : 'Tambah Seksi Bidang Baru'}
                </h3>
              </div>
              <button onClick={() => setShowSekbidModal(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSekbid} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Sekbid</label>
                  <input
                    type="text"
                    required
                    value={editingSekbid.num || ''}
                    onChange={(e) => setEditingSekbid({ ...editingSekbid, num: e.target.value })}
                    placeholder="Contoh: Sekbid 1"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Koordinator Divisi</label>
                  <input
                    type="text"
                    value={editingSekbid.coordinator || ''}
                    onChange={(e) => setEditingSekbid({ ...editingSekbid, coordinator: e.target.value })}
                    placeholder="Contoh: Fadhil Nur (XI DKV)"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama / Fokus Seksi Bidang</label>
                <input
                  type="text"
                  required
                  value={editingSekbid.title || ''}
                  onChange={(e) => setEditingSekbid({ ...editingSekbid, title: e.target.value })}
                  placeholder="Contoh: Pembinaan Keimanan & Ketaqwaan"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Uraian Ruang Lingkup Kerja</label>
                <textarea
                  rows={4}
                  required
                  value={editingSekbid.desc || ''}
                  onChange={(e) => setEditingSekbid({ ...editingSekbid, desc: e.target.value })}
                  placeholder="Jelaskan program dan bidang kerja divisi ini..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSekbidModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Simpan Sekbid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: TAMBAH / EDIT PROKER */}
      {showProkerModal && editingProker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-900" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingProker.id ? 'Edit Program Kerja OSIS' : 'Tambah Program Kerja Baru'}
                </h3>
              </div>
              <button onClick={() => setShowProkerModal(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProker} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Program Kerja</label>
                <input
                  type="text"
                  required
                  value={editingProker.name || ''}
                  onChange={(e) => setEditingProker({ ...editingProker, name: e.target.value })}
                  placeholder="Contoh: SMESA Cup Antar Jurusan 2026"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Divisi / Sekbid Penanggung Jawab</label>
                  <input
                    type="text"
                    required
                    value={editingProker.division || ''}
                    onChange={(e) => setEditingProker({ ...editingProker, division: e.target.value })}
                    placeholder="Contoh: Sekbid 4 (Olahraga)"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Proker</label>
                  <select
                    value={editingProker.status || 'terencana'}
                    onChange={(e) => setEditingProker({ ...editingProker, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium bg-white"
                  >
                    <option value="terencana">Terencana</option>
                    <option value="berjalan">Sedang Berjalan</option>
                    <option value="terlaksana">Terlaksana</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Bulan / Tanggal</label>
                <input
                  type="text"
                  required
                  value={editingProker.month || ''}
                  onChange={(e) => setEditingProker({ ...editingProker, month: e.target.value })}
                  placeholder="Contoh: November 2026"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi & Rincian Proker</label>
                <textarea
                  rows={4}
                  required
                  value={editingProker.desc || ''}
                  onChange={(e) => setEditingProker({ ...editingProker, desc: e.target.value })}
                  placeholder="Jelaskan tujuan dan mekanisme pelaksanaan program kerja ini..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowProkerModal(false)}
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

      {/* MODAL 4: TAMBAH / EDIT TAHAPAN PEMILOS */}
      {showStageModal && editingStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Vote className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingStage.id ? 'Edit Tahapan PEMILOS' : 'Tambah Tahapan PEMILOS Baru'}
                </h3>
              </div>
              <button onClick={() => setShowStageModal(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStage} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Tahapan</label>
                <input
                  type="text"
                  required
                  value={editingStage.stage || ''}
                  onChange={(e) => setEditingStage({ ...editingStage, stage: e.target.value })}
                  placeholder="Contoh: E-Voting Pemilihan Suara (PEMILOS)"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jadwal Tanggal</label>
                  <input
                    type="text"
                    required
                    value={editingStage.date || ''}
                    onChange={(e) => setEditingStage({ ...editingStage, date: e.target.value })}
                    placeholder="Contoh: 25 September 2026"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Tahapan</label>
                  <select
                    value={editingStage.status || 'akan_datang'}
                    onChange={(e) => setEditingStage({ ...editingStage, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium bg-white"
                  >
                    <option value="akan_datang">Akan Datang</option>
                    <option value="berlangsung">Sedang Berlangsung</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Tahapan</label>
                <textarea
                  rows={3}
                  required
                  value={editingStage.desc || ''}
                  onChange={(e) => setEditingStage({ ...editingStage, desc: e.target.value })}
                  placeholder="Keterangan proses tahapan pemilihan..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowStageModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Simpan Tahapan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
