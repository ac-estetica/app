"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  Filter,
  MoreVertical,
  Phone,
  MessageCircle,
  Star,
  ChevronRight,
  Users,
  UserCheck,
  UserX,
  Gift,
  Tag,
  Instagram,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { mockClients } from "@/lib/mock-data";
import type { Client } from "@/types";
import {
  formatDate,
  formatPhone,
  calculateAge,
  getStatusBadgeColor,
  getStatusLabel,
  getInitials,
} from "@/lib/utils";
import ClientModal from "@/components/clientes/ClientModal";

const statusFilters = [
  { label: "Todos", value: "all" },
  { label: "Ativos", value: "active" },
  { label: "Inativos", value: "inactive" },
];

const tagColors: Record<string, string> = {
  VIP: "bg-amber-100 text-amber-700",
  "Pacote Ativo": "bg-green-100 text-green-700",
  Regular: "bg-blue-100 text-blue-700",
  Novo: "bg-violet-100 text-violet-700",
  Inativo: "bg-gray-100 text-gray-500",
  "Top Cliente": "bg-rose-100 text-rose-700",
};

const summaryCards = [
  { label: "Total de Clientes", value: 284, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Clientes Ativos", value: 231, icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
  { label: "Clientes Inativos", value: 53, icon: UserX, color: "text-gray-500", bg: "bg-gray-100" },
  { label: "Aniversariantes do Mês", value: 8, icon: Gift, color: "text-pink-600", bg: "bg-pink-50" },
];

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredClients = mockClients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      (c.email?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      c.cpf.includes(search);
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openClient = (client: Client, mode: "view" | "edit" = "view") => {
    setSelectedClient(client);
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
              <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-gray-500 text-xs">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table area */}
      <div className="bg-white rounded-2xl border border-gray-100">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">Clientes</h2>
              <p className="text-gray-400 text-sm">{filteredClients.length} cliente(s) encontrado(s)</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar cliente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all"
                />
              </div>

              {/* Status filter */}
              <div className="flex bg-gray-100 rounded-xl p-0.5">
                {statusFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setStatusFilter(f.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === f.value
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Filter button */}
              <button className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
              </button>

              {/* Add client */}
              <button
                onClick={() => {
                  setModalMode("create");
                  setSelectedClient(null);
                  setModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-rose-700 transition-all shadow-md shadow-pink-500/20"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Novo Cliente</span>
              </button>
            </div>
          </div>
        </div>

        {/* Client cards grid */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="relative group border border-gray-100 rounded-2xl p-4 hover:border-pink-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => openClient(client, "view")}
              >
                {/* Top row */}
                <div className="flex items-start gap-3 mb-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {client.photo ? (
                      <img
                        src={client.photo}
                        alt={client.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-base">
                        {getInitials(client.name)}
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        client.status === "active" ? "bg-green-400" : "bg-gray-300"
                      }`}
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{client.name}</h3>
                    <p className="text-gray-500 text-xs">{client.profession || "Profissão não informada"}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${getStatusBadgeColor(client.status)}`}>
                        {getStatusLabel(client.status)}
                      </span>
                      <span className="text-[10px] text-gray-400">•</span>
                      <span className="text-[10px] text-gray-400">{calculateAge(client.birthDate)} anos</span>
                    </div>
                  </div>

                  {/* Menu */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(menuOpen === client.id ? null : client.id);
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown menu */}
                  {menuOpen === client.id && (
                    <div className="absolute right-4 top-12 z-20 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); openClient(client, "view"); setMenuOpen(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <Eye className="w-3.5 h-3.5" /> Ver perfil completo
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); openClient(client, "edit"); setMenuOpen(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <Edit className="w-3.5 h-3.5" /> Editar cadastro
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Enviar WhatsApp
                      </button>
                      <div className="h-px bg-gray-100 my-1" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Excluir cliente
                      </button>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {client.tags && client.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {client.tags.map((tag) => (
                      <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[tag] || "bg-gray-100 text-gray-600"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Contact info */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-600">{formatPhone(client.whatsapp || client.phone)}</span>
                  </div>
                  {client.instagram && (
                    <div className="flex items-center gap-2">
                      <Instagram className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{client.instagram}</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  {/* Loyalty points */}
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">{client.loyaltyPoints.toLocaleString("pt-BR")} pts</span>
                  </div>

                  {/* Since */}
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">Cliente desde</p>
                    <p className="text-[10px] font-semibold text-gray-600">{formatDate(client.registrationDate)}</p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-pink-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-gray-500 font-semibold mb-1">Nenhum cliente encontrado</h3>
              <p className="text-gray-400 text-sm">Tente ajustar os filtros ou adicione um novo cliente</p>
            </div>
          )}
        </div>
      </div>

      {/* Client Modal */}
      {modalOpen && (
        <ClientModal
          client={selectedClient}
          mode={modalMode}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Click outside to close menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
      )}
    </div>
  );
}
