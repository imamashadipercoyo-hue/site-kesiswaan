import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight, CalendarPlus } from 'lucide-react';
import { AgendaItem } from '../../types';

interface UpcomingAgendaSectionProps {
  agenda: AgendaItem[];
  onSelectAgenda: (item: AgendaItem) => void;
  onExploreAll: () => void;
}

export const UpcomingAgendaSection: React.FC<UpcomingAgendaSectionProps> = ({
  agenda,
  onSelectAgenda,
  onExploreAll
}) => {
  // Show upcoming agenda items first
  const upcomingList = agenda
    .filter(a => a.status !== 'selesai')
    .slice(0, 3);

  const formatEventDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const day = date.getDate();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      return {
        day: String(day).padStart(2, '0'),
        month: monthNames[date.getMonth()],
        year: date.getFullYear()
      };
    } catch {
      return { day: '28', month: 'Okt', year: 2026 };
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Jadwal & Agenda Siswa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Agenda Kegiatan Mendatang
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Agenda upacara, latihan kepemimpinan OSIS/MPK, turnamen ekstrakurikuler, dan peringatan hari besar sekolah.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-950 hover:text-amber-600 transition-colors shrink-0 group cursor-pointer"
          >
            <span>Buka Kalender Lengkap</span>
            <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingList.map((item) => {
            const dateObj = formatEventDate(item.startDate);
            return (
              <div
                key={item.id}
                onClick={() => onSelectAgenda(item)}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-200 group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Top row: Date block & Category */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-950 text-white flex flex-col items-center justify-center shrink-0 border border-amber-500/30 group-hover:bg-slate-900 transition-colors">
                      <span className="text-lg font-black text-amber-400 leading-none">
                        {dateObj.day}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mt-0.5">
                        {dateObj.month}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                        {item.category}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Meta Details */}
                  <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
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

                {/* Footer action */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Oleh: {item.organizer}
                  </span>
                  <span className="font-bold text-blue-950 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                    <span>Detail</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
