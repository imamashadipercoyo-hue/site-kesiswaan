import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  CalendarPlus, 
  Download, 
  Filter, 
  List, 
  Grid, 
  X, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { AgendaItem, AgendaCategory } from '../../types';

interface AgendaPageProps {
  agenda: AgendaItem[];
  selectedAgenda: AgendaItem | null;
  onSelectAgenda: (item: AgendaItem | null) => void;
}

const CATEGORIES: AgendaCategory[] = [
  'Upacara & Peringatan',
  'Kegiatan OSIS & MPK',
  'Lomba & Kompetisi',
  'Ekstrakurikuler',
  'Pembinaan Karakter',
  'Kegiatan Sosial',
  'Peringatan Hari Besar',
  'Kegiatan Akademik Siswa'
];

export const AgendaPage: React.FC<AgendaPageProps> = ({
  agenda,
  selectedAgenda,
  onSelectAgenda
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [statusFilter, setStatusFilter] = useState<'all' | 'akan_datang' | 'selesai'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState<number>(9); // 0-indexed: 9 = October 2026
  const [currentCalendarYear, setCurrentCalendarYear] = useState<number>(2026);

  // Month names in Indonesian
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Filtered agenda
  const filteredAgenda = useMemo(() => {
    return agenda.filter(item => {
      const matchStatus = statusFilter === 'all' 
        ? true 
        : statusFilter === 'akan_datang' 
          ? (item.status === 'akan_datang' || item.status === 'berlangsung') 
          : item.status === 'selesai';

      const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;

      return matchStatus && matchCategory;
    });
  }, [agenda, statusFilter, categoryFilter]);

  // Calendar helpers
  const daysInMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentCalendarYear, currentCalendarMonth, 1).getDay(); // 0 = Sun

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = (item: AgendaItem) => {
    const title = encodeURIComponent(item.title);
    const details = encodeURIComponent(`${item.description}\n\nPenyelenggara: ${item.organizer}\nLokasi: ${item.location}`);
    const location = encodeURIComponent(item.location);
    // Simple date formatting for Google Calendar: YYYYMMDDTHHmmssZ
    const cleanDate = item.startDate.replace(/-/g, '');
    const dates = `${cleanDate}T010000Z/${cleanDate}T050000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Generate .ics download
  const downloadIcs = (item: AgendaItem) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SMKN 1 Jember//Kesiswaan Digital//ID
BEGIN:VEVENT
SUMMARY:${item.title}
DESCRIPTION:${item.description}
LOCATION:${item.location}
DTSTART:${item.startDate.replace(/-/g, '')}T070000
DTEND:${(item.endDate || item.startDate).replace(/-/g, '')}T120000
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${item.title.slice(0, 25).replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded inline-block">
            Kalender Kesiswaan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Agenda Kegiatan Peserta Didik
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Jadwal resmi upacara bendera, pembinaan karakter, latihan dasar kepemimpinan OSIS & MPK, turnamen ekstra, dan peringatan hari besar SMK Negeri 1 Jember.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* View Switcher & Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Agenda
            </button>
            <button
              onClick={() => setStatusFilter('akan_datang')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'akan_datang' ? 'bg-white text-blue-950 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Akan Datang & Berlangsung
            </button>
            <button
              onClick={() => setStatusFilter('selesai')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'selesai' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Arsip Selesai
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
            >
              <option value="all">Semua Kategori</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* List / Calendar View Mode */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Tampilan Daftar"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'calendar' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Tampilan Kalender Bulanan"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View: Monthly Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-amber-500" />
                <span>{monthNames[currentCalendarMonth]} {currentCalendarYear}</span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (currentCalendarMonth === 0) {
                      setCurrentCalendarMonth(11);
                      setCurrentCalendarYear(y => y - 1);
                    } else {
                      setCurrentCalendarMonth(m => m - 1);
                    }
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-600"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (currentCalendarMonth === 11) {
                      setCurrentCalendarMonth(0);
                      setCurrentCalendarYear(y => y + 1);
                    } else {
                      setCurrentCalendarMonth(m => m + 1);
                    }
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d, i) => (
                <div key={i} className="py-2 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                  {d}
                </div>
              ))}

              {/* Blank offset days */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`blank-${i}`} className="h-20 sm:h-24 bg-slate-50/50 rounded-lg" />
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateKey = `${currentCalendarYear}-${String(currentCalendarMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const eventsOnThisDay = agenda.filter(a => a.startDate === dateKey);

                return (
                  <div
                    key={dayNum}
                    className={`h-20 sm:h-24 border border-slate-100 rounded-lg p-1.5 text-left flex flex-col justify-between transition-colors ${
                      eventsOnThisDay.length > 0 ? 'bg-amber-50/40 border-amber-200' : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className={`text-xs font-bold ${eventsOnThisDay.length > 0 ? 'text-amber-800' : 'text-slate-600'}`}>
                      {dayNum}
                    </span>

                    <div className="space-y-1 overflow-hidden">
                      {eventsOnThisDay.map(ev => (
                        <button
                          key={ev.id}
                          onClick={() => onSelectAgenda(ev)}
                          className="w-full text-left bg-blue-950 text-white text-[10px] p-1 rounded font-semibold truncate hover:bg-slate-900 transition-colors cursor-pointer"
                          title={ev.title}
                        >
                          {ev.title}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View: List View Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgenda.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAgenda(item)}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-200 group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                    {item.category}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.status === 'akan_datang'
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : item.status === 'berlangsung'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status === 'akan_datang' ? 'Akan Datang' : item.status === 'berlangsung' ? 'Sedang Berlangsung' : 'Selesai'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.startDate} {item.endDate && item.endDate !== item.startDate ? `s.d. ${item.endDate}` : ''}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.time}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-slate-500">
                  Penyelenggara: {item.organizer}
                </span>

                <span className="font-bold text-blue-950 group-hover:text-amber-600">
                  Detail →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agenda Detail Modal with Google Calendar export */}
      {selectedAgenda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  {selectedAgenda.category}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  {selectedAgenda.title}
                </h3>
              </div>

              <button
                onClick={() => onSelectAgenda(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedAgenda.posterUrl && (
              <div className="rounded-xl overflow-hidden aspect-[16/9] border border-slate-200">
                <img src={selectedAgenda.posterUrl} alt={selectedAgenda.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-amber-600" />
                <span>{selectedAgenda.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>{selectedAgenda.time}</span>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{selectedAgenda.location}</span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-slate-200 text-slate-500">
                <strong>Sasaran Peserta:</strong> {selectedAgenda.targetAudience}
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900">Deskripsi Kegiatan:</h4>
              <p>{selectedAgenda.description}</p>
            </div>

            {/* Calendar Export Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <a
                  href={getGoogleCalendarUrl(selectedAgenda)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-950 hover:bg-slate-900 text-amber-400 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Google Calendar</span>
                </a>

                <button
                  onClick={() => downloadIcs(selectedAgenda)}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Unduh iCal (.ics)</span>
                </button>
              </div>

              <button
                onClick={() => onSelectAgenda(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
