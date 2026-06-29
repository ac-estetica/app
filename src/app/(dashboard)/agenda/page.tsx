"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  Check,
  X,
  Phone,
  MessageCircle,
  Calendar,
  LayoutGrid,
  List,
  Filter,
} from "lucide-react";
import { mockAppointments, mockProfessionals } from "@/lib/mock-data";
import type { Appointment } from "@/types";
import { getStatusBadgeColor, getStatusLabel, formatPhone } from "@/lib/utils";
import AppointmentModal from "@/components/agenda/AppointmentModal";

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8-20
const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const VIEWS = [
  { id: "day", label: "Dia", icon: Clock },
  { id: "week", label: "Semana", icon: LayoutGrid },
  { id: "list", label: "Lista", icon: List },
];

const professionalColors: Record<string, string> = {
  p1: "#ec4899",
  p2: "#8b5cf6",
  p3: "#06b6d4",
};

function getWeekDays(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function AgendaPage() {
  const [view, setView] = useState<"day" | "week" | "list">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const weekDays = getWeekDays(new Date(currentDate));

  const filteredAppointments = mockAppointments.filter(
    (a) => selectedProfessional === "all" || a.professionalId === selectedProfessional
  );

  const goBack = () => {
    const d = new Date(currentDate);
    if (view === "week") d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const goForward = () => {
    const d = new Date(currentDate);
    if (view === "week") d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const goToday = () => setCurrentDate(new Date());

  const getAppointmentStyle = (apt: Appointment) => {
    const [startH, startM] = apt.startTime.split(":").map(Number);
    const [endH, endM] = apt.endTime.split(":").map(Number);
    const top = ((startH - 8) * 60 + startM) * (56 / 60);
    const height = ((endH - startH) * 60 + (endM - startM)) * (56 / 60);
    return { top, height };
  };

  const getAppointmentsForSlot = (day: Date, hour: number) => {
    return filteredAppointments.filter((a) => {
      const aptDate = new Date(a.date);
      const [aptH] = a.startTime.split(":").map(Number);
      return (
        aptDate.toDateString() === day.toDateString() && aptH === hour
      );
    });
  };

  const getAppointmentsForDay = (day: Date) => {
    return filteredAppointments.filter((a) => {
      const aptDate = new Date(a.date);
      return aptDate.toDateString() === day.toDateString();
    });
  };

  const formatWeekHeader = () => {
    const start = weekDays[0];
    const end = weekDays[weekDays.length - 1];
    const opts: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} de ${start.toLocaleDateString("pt-BR", opts)}`;
    }
    return `${start.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })} - ${end.toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}`;
  };

  const today = new Date();

  return (
    <div className="flex flex-col h-full" style={{ minHeight: "calc(100vh - 120px)" }}>
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex flex-wrap items-center gap-3">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToday}
            className="px-3 py-1.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Hoje
          </button>
          <button
            onClick={goForward}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <h3 className="font-bold text-gray-900 text-sm hidden md:block">
            {view === "week" ? formatWeekHeader() : currentDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
          </h3>
        </div>

        {/* View switcher */}
        <div className="flex bg-gray-100 rounded-xl p-0.5">
          {VIEWS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id as "day" | "week" | "list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Professional filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedProfessional("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedProfessional === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {mockProfessionals.map((prof) => (
            <button
              key={prof.id}
              onClick={() => setSelectedProfessional(prof.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedProfessional === prof.id
                  ? "text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              style={selectedProfessional === prof.id ? { backgroundColor: prof.color } : {}}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedProfessional === prof.id ? "white" : prof.color }}
              />
              {prof.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Filter + New appointment */}
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedAppointment(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl text-sm font-semibold hover:from-yellow-700 hover:to-amber-900 transition-all shadow-md shadow-yellow-500/20"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo Agendamento</span>
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 flex-1 overflow-hidden flex flex-col">
        {view === "week" && (
          <>
            {/* Week header */}
            <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: "60px repeat(6, 1fr)" }}>
              <div className="p-3" />
              {weekDays.map((day, idx) => {
                const isToday = day.toDateString() === today.toDateString();
                const apts = getAppointmentsForDay(day);
                return (
                  <div
                    key={idx}
                    className={`p-3 text-center border-l border-gray-100 ${isToday ? "bg-yellow-50" : ""}`}
                  >
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{DAYS[idx]}</p>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mt-1 ${
                      isToday
                        ? "bg-gradient-to-br from-yellow-500 to-amber-600 text-white"
                        : "text-gray-900"
                    }`}>
                      <span className="text-sm font-bold">{day.getDate()}</span>
                    </div>
                    {apts.length > 0 && (
                      <div className="flex justify-center gap-0.5 mt-1">
                        {apts.slice(0, 3).map((a, i) => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color || "#ec4899" }} />
                        ))}
                        {apts.length > 3 && <span className="text-[8px] text-gray-400">+{apts.length - 3}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Time grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="relative" style={{ gridTemplateColumns: "60px repeat(6, 1fr)" }}>
                {HOURS.map((hour) => (
                  <div key={hour} className="grid border-b border-gray-50" style={{ gridTemplateColumns: "60px repeat(6, 1fr)", minHeight: "56px" }}>
                    {/* Time label */}
                    <div className="p-2 flex items-start justify-end pr-3">
                      <span className="text-[10px] text-gray-400 font-mono font-semibold">{hour}:00</span>
                    </div>

                    {/* Day columns */}
                    {weekDays.map((day, dayIdx) => {
                      const isToday = day.toDateString() === today.toDateString();
                      const apts = filteredAppointments.filter((a) => {
                        const aptDate = new Date(a.date);
                        const [startH] = a.startTime.split(":").map(Number);
                        const [endH] = a.endTime.split(":").map(Number);
                        return aptDate.toDateString() === day.toDateString() && startH <= hour && endH > hour;
                      });

                      return (
                        <div
                          key={dayIdx}
                          className={`relative border-l border-gray-100 min-h-[56px] group cursor-pointer ${
                            isToday ? "bg-yellow-50/40" : "hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setSelectedAppointment(null);
                            setModalOpen(true);
                          }}
                        >
                          {/* New appointment hint */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute top-1 left-1 right-1 h-6 bg-yellow-100 border border-yellow-300 border-dashed rounded-lg flex items-center justify-center">
                              <Plus className="w-3 h-3 text-yellow-500" />
                            </div>
                          </div>

                          {/* Appointments */}
                          {apts.filter(a => {
                            const [startH] = a.startTime.split(":").map(Number);
                            return startH === hour;
                          }).map((apt) => (
                            <div
                              key={apt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAppointment(apt);
                                setModalOpen(true);
                              }}
                              className="absolute left-1 right-1 rounded-lg p-1.5 cursor-pointer hover:brightness-110 transition-all z-10"
                              style={{
                                backgroundColor: `${apt.color || "#ec4899"}20`,
                                borderLeft: `3px solid ${apt.color || "#ec4899"}`,
                                top: "2px",
                                minHeight: "52px",
                              }}
                            >
                              <p className="text-[10px] font-bold truncate" style={{ color: apt.color || "#ec4899" }}>
                                {apt.startTime} — {apt.clientName.split(" ")[0]}
                              </p>
                              <p className="text-[9px] text-gray-600 truncate">{apt.serviceName}</p>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {view === "list" && (
          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-3">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400">Nenhum agendamento encontrado</p>
                </div>
              ) : (
                filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-yellow-300 hover:shadow-sm transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedAppointment(apt);
                      setModalOpen(true);
                    }}
                  >
                    {/* Color indicator */}
                    <div
                      className="w-1 h-14 rounded-full flex-shrink-0"
                      style={{ backgroundColor: apt.color || "#ec4899" }}
                    />

                    {/* Time */}
                    <div className="text-center flex-shrink-0 w-16">
                      <p className="text-sm font-bold text-gray-900 font-mono">{apt.startTime}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{apt.endTime}</p>
                    </div>

                    {/* Client */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {apt.clientName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{apt.clientName}</p>
                      <p className="text-xs text-gray-500 truncate">{apt.serviceName}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-[10px] text-gray-400">{apt.professionalName.split(" ")[0]}</span>
                      </div>
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeColor(apt.status)}`}>
                        {getStatusLabel(apt.status)}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="Confirmar"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="w-7 h-7 rounded-lg bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="Cancelar"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {view === "day" && (
          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-2">
              {HOURS.map((hour) => {
                const apts = filteredAppointments.filter((a) => {
                  const aptDate = new Date(a.date);
                  const [startH] = a.startTime.split(":").map(Number);
                  return aptDate.toDateString() === currentDate.toDateString() && startH === hour;
                });
                return (
                  <div key={hour} className="flex gap-4 min-h-[56px]">
                    <div className="w-16 flex items-start pt-2 flex-shrink-0">
                      <span className="text-xs font-mono text-gray-400">{hour}:00</span>
                    </div>
                    <div className="flex-1 border-t border-gray-100 pt-1">
                      {apts.length === 0 ? (
                        <div className="h-12 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center cursor-pointer hover:border-yellow-300 hover:bg-yellow-50 transition-all group"
                          onClick={() => { setSelectedAppointment(null); setModalOpen(true); }}>
                          <Plus className="w-4 h-4 text-gray-300 group-hover:text-yellow-500 transition-colors" />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {apts.map((apt) => (
                            <div
                              key={apt.id}
                              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:brightness-95 transition-all"
                              style={{ backgroundColor: `${apt.color || "#ec4899"}15`, borderLeft: `4px solid ${apt.color || "#ec4899"}` }}
                              onClick={() => { setSelectedAppointment(apt); setModalOpen(true); }}
                            >
                              <div>
                                <p className="text-xs font-bold" style={{ color: apt.color || "#ec4899" }}>
                                  {apt.startTime} – {apt.endTime}
                                </p>
                                <p className="text-sm font-bold text-gray-900">{apt.clientName}</p>
                                <p className="text-xs text-gray-500">{apt.serviceName} • {apt.professionalName.split(" ")[0]}</p>
                              </div>
                              <div className="ml-auto">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeColor(apt.status)}`}>
                                  {getStatusLabel(apt.status)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
