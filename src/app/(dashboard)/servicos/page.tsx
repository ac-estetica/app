"use client";

import { useState } from "react";
import { Search, Plus, Scissors, Clock, DollarSign, Star, Filter, Edit, Trash2, ToggleLeft } from "lucide-react";
import { mockServices } from "@/lib/mock-data";
import { formatCurrency, formatMinutes } from "@/lib/utils";

export default function ServicosPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [modalOpen, setModalOpen] = useState(false);

  const categories = ["Todos", ...Array.from(new Set(mockServices.map((s) => s.category)))];

  const filtered = mockServices.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Todos" || s.category === category;
    return matchSearch && matchCat;
  });

  const serviceColors: Record<string, string> = {
    "#ec4899": "from-pink-500 to-rose-500",
    "#8b5cf6": "from-violet-500 to-purple-500",
    "#f59e0b": "from-amber-400 to-orange-500",
    "#06b6d4": "from-cyan-500 to-blue-500",
    "#10b981": "from-emerald-500 to-green-500",
    "#ef4444": "from-red-500 to-rose-600",
    "#6366f1": "from-indigo-500 to-violet-500",
    "#84cc16": "from-lime-500 to-green-500",
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total de Serviços", value: mockServices.length, icon: Scissors, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "Serviços Ativos", value: mockServices.filter((s) => s.active).length, icon: Star, color: "text-green-600", bg: "bg-green-50" },
          { label: "Ticket Médio", value: formatCurrency(mockServices.reduce((a, s) => a + s.price, 0) / mockServices.length), icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Duração Média", value: formatMinutes(Math.floor(mockServices.reduce((a, s) => a + s.duration, 0) / mockServices.length)), icon: Clock, color: "text-violet-600", bg: "bg-violet-50" },
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-900">Serviços e Procedimentos</h2>
            <p className="text-gray-400 text-sm">{filtered.length} serviço(s)</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Buscar serviço..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all w-52" />
          </div>
          <div className="flex bg-gray-100 rounded-xl p-0.5 overflow-x-auto">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${category === cat ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
                {cat}
              </button>
            ))}
          </div>
          <button onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-rose-700 transition-all shadow-md shadow-pink-500/20">
            <Plus className="w-4 h-4" /> Novo Serviço
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((service) => {
            const gradientClass = serviceColors[service.color || "#ec4899"] || "from-pink-500 to-rose-500";
            return (
              <div key={service.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 transition-all group">
                {/* Color bar */}
                <div className={`h-1.5 bg-gradient-to-r ${gradientClass}`} />

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <Scissors className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{service.name}</h3>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{service.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 flex items-center justify-center transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>

                  {service.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{service.description}</p>
                  )}

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 bg-gray-50 rounded-xl">
                      <p className="text-xs font-bold text-gray-900">{formatCurrency(service.price)}</p>
                      <p className="text-[9px] text-gray-400">Valor</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-xl">
                      <p className="text-xs font-bold text-gray-900">{formatMinutes(service.duration)}</p>
                      <p className="text-[9px] text-gray-400">Duração</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-xl">
                      <p className="text-xs font-bold text-gray-900">{service.commission}%</p>
                      <p className="text-[9px] text-gray-400">Comissão</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${service.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {service.active ? "Ativo" : "Inativo"}
                    </span>
                    <span className="text-[10px] text-gray-400">{service.professionalIds.length} profissional(is)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
