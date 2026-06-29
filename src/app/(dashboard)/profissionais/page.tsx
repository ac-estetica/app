"use client";

import { useState } from "react";
import { UserCog, Star, DollarSign, Calendar, Plus, Award, Phone, Mail, ChevronRight } from "lucide-react";
import { mockProfessionals, mockDashboardData } from "@/lib/mock-data";
import { formatCurrency, getInitials, formatPhone } from "@/lib/utils";

export default function ProfissionaisPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const profRanking = mockDashboardData.professionals.ranking;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Profissionais", value: mockProfessionals.length, icon: UserCog, color: "text-yellow-700", bg: "bg-yellow-50" },
          { label: "Ativas", value: mockProfessionals.filter(p => p.active).length, icon: Star, color: "text-green-600", bg: "bg-green-50" },
          { label: "Comissões do Mês", value: formatCurrency(profRanking.reduce((s, p) => s + p.commission, 0)), icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Atendimentos do Mês", value: profRanking.reduce((s, p) => s + p.appointments, 0), icon: Calendar, color: "text-violet-600", bg: "bg-violet-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-gray-500 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Professionals grid */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900">Equipe Profissional</h2>
            <p className="text-gray-400 text-sm">{mockProfessionals.length} profissional(is)</p>
          </div>
          <button onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl text-sm font-semibold hover:from-yellow-700 hover:to-amber-900 transition-all shadow-md shadow-yellow-500/20">
            <Plus className="w-4 h-4" /> Nova Profissional
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockProfessionals.map((prof) => {
            const rank = profRanking.find(r => r.professionalId === prof.id);
            return (
              <div key={prof.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-yellow-300 transition-all cursor-pointer group">
                {/* Header */}
                <div className="h-20 relative" style={{ background: `linear-gradient(135deg, ${prof.color}22, ${prof.color}11)` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      style={{ backgroundColor: prof.color }}
                    >
                      {prof.photo ? <img src={prof.photo} alt={prof.name} className="w-full h-full rounded-2xl object-cover" /> : getInitials(prof.name)}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2">
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-gray-900">{prof.name}</h3>
                    <p className="text-gray-500 text-xs">{prof.role}</p>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${prof.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {prof.active ? "Ativa" : "Inativa"}
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {prof.specialties.slice(0, 3).map(spec => (
                      <span key={spec} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{spec}</span>
                    ))}
                    {prof.specialties.length > 3 && (
                      <span className="text-[9px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">+{prof.specialties.length - 3}</span>
                    )}
                  </div>

                  {/* Stats */}
                  {rank && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { label: "Atend.", value: rank.appointments },
                        { label: "Receita", value: formatCurrency(rank.revenue).replace("R$", "") },
                        { label: "Comissão", value: `${prof.commissionValue}%` },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center p-2 bg-gray-50 rounded-xl">
                          <p className="text-xs font-bold text-gray-900">{value}</p>
                          <p className="text-[9px] text-gray-400">{label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Contact */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {formatPhone(prof.phone)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {prof.email}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: prof.color }}
                      title="Cor na agenda"
                    />
                    <button className="text-xs font-semibold text-yellow-700 hover:text-yellow-800 flex items-center gap-1 transition-colors">
                      Ver detalhes <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commission report */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          Ranking de Desempenho — Mês Atual
        </h3>
        <div className="space-y-3">
          {profRanking.map((rank, idx) => {
            const prof = mockProfessionals.find(p => p.id === rank.professionalId);
            const pct = (rank.revenue / profRanking[0].revenue) * 100;
            return (
              <div key={rank.professionalId} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                  idx === 0 ? "bg-amber-400" : idx === 1 ? "bg-gray-400" : "bg-amber-700/60"
                }`}>
                  {idx + 1}
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: prof?.color || "#ec4899" }}
                >
                  {prof ? getInitials(prof.name) : "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{rank.professionalName}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: prof?.color || "#ec4899" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(rank.revenue)}</p>
                  <p className="text-[10px] text-gray-400">Comissão: {formatCurrency(rank.commission)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-700">{rank.appointments}</p>
                  <p className="text-[10px] text-gray-400">atendimentos</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
