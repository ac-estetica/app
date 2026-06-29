"use client";

import { useState } from "react";
import { Package, Star, DollarSign, Calendar, Plus, Tag, Clock, CheckCircle } from "lucide-react";
import { mockPackages, mockClientPackages, mockClients } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function PacotesPage() {
  const [activeTab, setActiveTab] = useState<"packages" | "client-packages">("packages");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pacotes Cadastrados", value: mockPackages.length, icon: Package, color: "text-yellow-700", bg: "bg-yellow-50" },
          { label: "Pacotes Ativos (Clientes)", value: mockClientPackages.filter(p => p.status === "active").length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "Receita de Pacotes", value: formatCurrency(mockClientPackages.reduce((s, p) => s + p.totalValue, 0)), icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Vencendo em 30 dias", value: 2, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
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

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex bg-gray-100 rounded-xl p-0.5">
            {[
              { id: "packages", label: "Pacotes Disponíveis" },
              { id: "client-packages", label: "Pacotes de Clientes" },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => setActiveTab(id as typeof activeTab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl text-sm font-semibold hover:from-yellow-700 hover:to-amber-900 transition-all shadow-md shadow-yellow-500/20">
            <Plus className="w-4 h-4" /> {activeTab === "packages" ? "Novo Pacote" : "Vender Pacote"}
          </button>
        </div>

        <div className="p-5">
          {activeTab === "packages" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPackages.map((pkg) => (
                <div key={pkg.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-yellow-300 transition-all">
                  <div className="h-1.5 bg-gradient-to-r from-yellow-500 to-amber-500" />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                        {pkg.description && <p className="text-gray-500 text-xs mt-0.5">{pkg.description}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(pkg.price)}</p>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                          {pkg.discount}% OFF
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: "Sessões", value: pkg.sessions, icon: CheckCircle },
                        { label: "Validade", value: `${pkg.validityDays}d`, icon: Calendar },
                        { label: "Parcelas", value: `${pkg.maxInstallments}x`, icon: DollarSign },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="text-center p-2 bg-gray-50 rounded-xl">
                          <p className="text-sm font-bold text-gray-900">{value}</p>
                          <p className="text-[9px] text-gray-400">{label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Services in package */}
                    <div className="space-y-1.5 mb-4">
                      {pkg.services.map((s) => (
                        <div key={s.serviceId} className="flex items-center justify-between text-xs">
                          <span className="text-gray-700">✓ {s.serviceName}</span>
                          <span className="font-semibold text-gray-500">{s.sessions} sessões</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-yellow-500/20 hover:from-yellow-700 hover:to-amber-900 transition-all">
                      Vender Pacote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "client-packages" && (
            <div className="space-y-3">
              {mockClientPackages.map((cp) => {
                const client = mockClients.find((c) => c.id === cp.clientId);
                const progressPct = (cp.completedSessions / cp.totalSessions) * 100;
                const daysLeft = Math.ceil((new Date(cp.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

                return (
                  <div key={cp.id} className="border border-gray-100 rounded-2xl p-4 hover:border-yellow-300 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-900 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {client?.name[0] || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900 text-sm truncate">{client?.name || "Cliente"}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 ${
                            cp.status === "active" ? "bg-green-100 text-green-700" :
                            cp.status === "expired" ? "bg-red-100 text-red-600" :
                            "bg-gray-100 text-gray-500"
                          }`}>
                            {cp.status === "active" ? "Ativo" : cp.status === "expired" ? "Vencido" : "Concluído"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{cp.packageName}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { label: "Total", value: cp.totalSessions, color: "bg-gray-100 text-gray-700" },
                        { label: "Realizadas", value: cp.completedSessions, color: "bg-green-100 text-green-700" },
                        { label: "Restantes", value: cp.remainingSessions, color: "bg-blue-100 text-blue-700" },
                        { label: "Faltas", value: cp.missedSessions, color: "bg-red-100 text-red-500" },
                      ].map(({ label, value, color }) => (
                        <div key={label} className={`${color} rounded-xl py-2 text-center`}>
                          <p className="text-base font-bold">{value}</p>
                          <p className="text-[9px] font-medium">{label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-2">
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span>Progresso</span>
                        <span>{cp.completedSessions}/{cp.totalSessions} sessões ({progressPct.toFixed(0)}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all" style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span>Válido até: {new Date(cp.expirationDate).toLocaleDateString("pt-BR")}</span>
                      <span className={daysLeft <= 15 ? "text-red-500 font-semibold" : daysLeft <= 30 ? "text-amber-500 font-semibold" : ""}>
                        {daysLeft > 0 ? `${daysLeft} dias restantes` : "Vencido"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
