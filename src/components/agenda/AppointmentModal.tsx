"use client";

import { X, Calendar, User, Clock, FileText, MessageCircle, Check, AlertTriangle } from "lucide-react";
import type { Appointment } from "@/types";
import { getStatusBadgeColor, getStatusLabel, formatPhone } from "@/lib/utils";
import { mockClients, mockServices, mockProfessionals } from "@/lib/mock-data";

interface AppointmentModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export default function AppointmentModal({ appointment, onClose }: AppointmentModalProps) {
  const isNew = !appointment;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div
          className="p-5 flex items-center justify-between"
          style={{ background: appointment ? `linear-gradient(135deg, ${appointment.color}22, ${appointment.color}11)` : "linear-gradient(135deg, #fdf2f8, #fff1f2)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: appointment?.color || "#ec4899" }}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">
                {isNew ? "Novo Agendamento" : appointment.clientName}
              </h2>
              {!isNew && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeColor(appointment.status)}`}>
                  {getStatusLabel(appointment.status)}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {!isNew && appointment ? (
            <>
              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Calendar, label: "Data", value: new Date(appointment.date).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }) },
                  { icon: Clock, label: "Horário", value: `${appointment.startTime} – ${appointment.endTime}` },
                  { icon: User, label: "Profissional", value: appointment.professionalName },
                  { icon: FileText, label: "Serviço", value: appointment.serviceName },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">{label}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Contato</p>
                  <p className="text-sm font-semibold text-gray-900">{formatPhone(appointment.clientPhone)}</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-xl text-xs font-semibold hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
              </div>

              {/* Notes */}
              {appointment.notes && (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-xs font-semibold text-amber-700 mb-0.5">Observações:</p>
                  <p className="text-sm text-amber-800">{appointment.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-600 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors border border-green-200">
                  <Check className="w-4 h-4" />
                  Confirmar
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-50 text-amber-600 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors border border-amber-200">
                  <AlertTriangle className="w-4 h-4" />
                  Falta
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors border border-red-200">
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            /* New appointment form */
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Cliente</label>
                <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all">
                  <option value="">Selecione um cliente...</option>
                  {mockClients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Serviço</label>
                <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all">
                  <option value="">Selecione um serviço...</option>
                  {mockServices.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Profissional</label>
                <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all">
                  <option value="">Selecione a profissional...</option>
                  {mockProfessionals.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Data</label>
                  <input type="date" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Início</label>
                  <input type="time" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Fim</label>
                  <input type="time" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Observações</label>
                <textarea
                  rows={2}
                  placeholder="Observações do agendamento..."
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button className="flex-1 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-pink-500/20 hover:from-pink-700 hover:to-rose-700 transition-all">
                  Agendar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
