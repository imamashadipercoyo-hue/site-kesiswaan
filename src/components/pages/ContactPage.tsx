import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Navigation,
  Globe,
  Instagram,
  Youtube,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { ContactMessage } from '../../types';
import { StorageService } from '../../services/storageService';

interface ContactPageProps {
  onMessageSent?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onMessageSent }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState<ContactMessage['topic']>('Informasi Kesiswaan');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      const saved = StorageService.submitContactMessage({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || '-',
        subject: subject.trim(),
        topic,
        message: message.trim()
      });

      setSubmitting(false);
      setSuccessReceipt(saved.ticketNumber);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      if (onMessageSent) onMessageSent();
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded">
            <Mail className="w-3.5 h-3.5" />
            <span>Pusat Layanan Kesiswaan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Kontak & Lokasi Sekolah
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            Hubungi Sekretariat Bidang Kesiswaan SMK Negeri 1 Jember untuk informasi kegiatan, koordinasi kejuaraan/lomba, kemitraan ekstrakurikuler, dan layanan peserta didik.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Information & Official Address Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Alamat Resmi
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  SMK Negeri 1 Jember
                </h2>
                <p className="text-xs text-slate-500">Unit Pengelola: Bidang Kesiswaan</p>
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Alamat Kampus:</strong>
                    <span>Jalan Jambu No. 17, Kel. Patrang, Kec. Patrang, Kabupaten Jember, Jawa Timur 68118</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Telepon & Fax:</strong>
                    <span>(0331) 486110 / 486112</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Surel Resmi:</strong>
                    <span>kesiswaan@smesa.sch.id</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Jam Layanan Kesiswaan:</strong>
                    <span>Senin – Kamis: 07.00 – 15.30 WIB</span>
                    <span className="block">Jumat: 07.00 – 11.30 & 13.00 – 15.00 WIB</span>
                  </div>
                </div>
              </div>

              {/* Direct Directions Button */}
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=SMK+Negeri+1+Jember+Jalan+Jambu+No+17+Patrang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Petunjuk Arah (Buka di Google Maps)</span>
                </a>
              </div>
            </div>

            {/* Social Media & School Channels */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Kanal Informasi Resmi SMESA:
              </h3>
              <div className="space-y-2 text-slate-700">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-900" />
                    <span>Website Induk SMKN 1 Jember</span>
                  </span>
                  <span className="text-[11px] text-blue-900 font-bold">smkn1jember.sch.id</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-amber-600" />
                    <span>Instagram Kesiswaan</span>
                  </span>
                  <span className="text-[11px] text-slate-600">@kesiswaan_smesa</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>YouTube Resmi</span>
                  </span>
                  <span className="text-[11px] text-slate-600">SMESA Jember Official</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Formulir Komunikasi
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Kirim Pesan ke Tim Kesiswaan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Silakan lengkapi formulir di bawah ini. Tim Kesiswaan SMESA akan menindaklanjuti pesan Anda pada hari dan jam kerja resmi sekolah.
              </p>
            </div>

            {successReceipt && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-xs space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Pesan Berhasil Terkirim!</span>
                </div>
                <p>
                  Nomor Resi Kontak: <strong>{successReceipt}</strong>. Staf Kesiswaan kami telah menerima surat Anda dan akan segera menghubungi Anda kembali melalui email atau nomor telepon yang tertera.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama Anda atau Instansi"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Topik Pertanyaan <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  >
                    <option value="Informasi Kesiswaan">Informasi Kesiswaan & Tata Tertib</option>
                    <option value="Prestasi Siswa">Verifikasi & Laporan Prestasi (SMESA JUARA)</option>
                    <option value="Ekstrakurikuler">Kemitraan & Kegiatan Ekstrakurikuler</option>
                    <option value="Izin & Kerjasama Lomba">Izin & Dispensasi Resmi Lomba</option>
                    <option value="Pengaduan Siswa">Layanan Konseling / Pengaduan</option>
                    <option value="Umum">Pertanyaan Umum Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subjek Pesan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Permohonan Dispensasi Lomba Sains Siswa"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Isi Pesan Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Jelaskan kebutuhan, rincian pertanyaan, atau informasi yang ingin Anda sampaikan..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Semua data dijaga kerahasiaannya.
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold text-xs px-6 py-3 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Mengirim...' : 'Kirim Pesan Resmi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Embedded Responsive Google Maps */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Peta Lokasi SMK Negeri 1 Jember
              </h3>
              <p className="text-xs text-slate-500">
                Jalan Jambu No. 17, Patrang, Kabupaten Jember, Jawa Timur 68118
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=SMK+Negeri+1+Jember+Jalan+Jambu+No+17+Patrang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-950 hover:text-amber-600"
            >
              <span>Buka Tampilan Satelit</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-xl overflow-hidden aspect-[16/7] border border-slate-200 w-full relative">
            <iframe
              title="Peta Lokasi SMKN 1 Jember"
              src="https://maps.google.com/maps?q=SMK+Negeri+1+Jember,+Jalan+Jambu+No.+17,+Patrang,+Jember&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
