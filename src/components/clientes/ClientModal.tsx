"use client";

import { useState } from "react";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  FileText,
  Camera,
  Star,
  Clock,
  Package,
  DollarSign,
  Edit,
  MessageCircle,
  Instagram,
  Heart,
  Activity,
  ChevronRight,
} from "lucide-react";
import type { Client } from "@/types";
import {
  formatDate,
  formatPhone,
  formatCPF,
  calculateAge,
  getStatusBadgeColor,
  getStatusLabel,
  getInitials,
  formatCurrency,
} from "@/lib/utils";

interface ClientModalProps {
  client: Client | null;
  mode: "view" | "edit" | "create";
  onClose: () => void;
}

const tabs = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "anamnese", label: "Anamnese", icon: Heart },
  { id: "atendimentos", label: "Atendimentos", icon: Clock },
  { id: "pacotes", label: "Pacotes", icon: Package },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "galeria", label: "Galeria", icon: Camera },
  { id: "documentos", label: "Documentos", icon: FileText },
];

const mockHistory = [
  { date: new Date("2025-06-15"), service: "Limpeza de Pele Profunda", professional: "Ana Claudia", value: 180 },
  { date: new Date("2025-05-20"), service: "Peeling Químico", professional: "Ana Claudia", value: 220 },
  { date: new Date("2025-04-10"), service: "Microagulhamento", professional: "Ana Claudia", value: 380 },
  { date: new Date("2025-03-05"), service: "Drenagem Linfática", professional: "Mariana Santos", value: 150 },
];

export default function ClientModal({ client, mode, onClose }: ClientModalProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [currentMode, setCurrentMode] = useState(mode);

  const isView = currentMode === "view";

  if (!client && mode !== "create") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-rose-950 to-pink-900 p-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {client?.photo ? (
              <img src={client.photo} alt={client.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-xl border-2 border-white/30">
                {client ? getInitials(client.name) : "NC"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">
                {client?.name || "Novo Cliente"}
              </h2>
              {client && (
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeColor(client.status)}`}>
                    {getStatusLabel(client.status)}
                  </span>
                  <span className="text-pink-200 text-xs">•</span>
                  <span className="text-pink-200 text-xs">{calculateAge(client.birthDate)} anos</span>
                  <span className="text-pink-200 text-xs">•</span>
                  <span className="text-pink-200 text-xs">Cliente desde {formatDate(client.registrationDate)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {isView && client && (
                <>
                  <button
                    onClick={() => setCurrentMode("edit")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-white text-sm font-medium transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Editar
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/80 hover:bg-green-500 rounded-xl text-white text-sm font-medium transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick stats */}
          {client && isView && (
            <div className="flex gap-3 mt-4">
              {[
                { label: "Pontos", value: client.loyaltyPoints.toLocaleString("pt-BR"), icon: Star, color: "text-amber-300" },
                { label: "Cashback", value: formatCurrency(client.cashbackBalance), icon: DollarSign, color: "text-green-300" },
                { label: "Atendimentos", value: "12", icon: Activity, color: "text-blue-300" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <div>
                    <p className="text-[10px] text-pink-200">{label}</p>
                    <p className="text-white font-bold text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 px-4 flex overflow-x-auto scrollbar-hide flex-shrink-0 bg-white">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "profile" && client && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal data */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-500" />
                  Dados Pessoais
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "CPF", value: formatCPF(client.cpf) },
                    { label: "RG", value: client.rg || "—" },
                    { label: "Data de Nascimento", value: `${formatDate(client.birthDate)} (${calculateAge(client.birthDate)} anos)` },
                    { label: "Sexo", value: client.gender === "F" ? "Feminino" : client.gender === "M" ? "Masculino" : "Outro" },
                    { label: "Estado Civil", value: client.maritalStatus || "—" },
                    { label: "Profissão", value: client.profession || "—" },
                    { label: "Indicação", value: client.referral || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex">
                      <span className="text-gray-500 text-xs w-40 flex-shrink-0 pt-0.5">{label}</span>
                      <span className="text-gray-900 text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-pink-500" />
                  Contato
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Telefone</p>
                      <p className="text-sm font-semibold text-gray-900">{formatPhone(client.phone)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">WhatsApp</p>
                      <p className="text-sm font-semibold text-gray-900">{formatPhone(client.whatsapp)}</p>
                    </div>
                    <button className="text-xs bg-green-500 text-white px-2 py-1 rounded-lg font-medium hover:bg-green-600 transition-colors">
                      Enviar
                    </button>
                  </div>
                  {client.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">E-mail</p>
                        <p className="text-sm font-semibold text-gray-900">{client.email}</p>
                      </div>
                    </div>
                  )}
                  {client.instagram && (
                    <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
                      <Instagram className="w-4 h-4 text-pink-500" />
                      <div>
                        <p className="text-xs text-gray-500">Instagram</p>
                        <p className="text-sm font-semibold text-gray-900">{client.instagram}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Address */}
                <h3 className="font-bold text-gray-900 mt-6 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  Endereço
                </h3>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm font-semibold text-gray-900">
                    {client.address.street}, {client.address.number}
                    {client.address.complement && ` — ${client.address.complement}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {client.address.neighborhood} • {client.address.city}/{client.address.state}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">CEP: {client.address.zipCode}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "atendimentos" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Histórico de Atendimentos</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 text-pink-600 rounded-xl text-xs font-semibold hover:bg-pink-100 transition-colors">
                  <Calendar className="w-3.5 h-3.5" />
                  Novo Agendamento
                </button>
              </div>
              <div className="space-y-3">
                {mockHistory.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                    <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-pink-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{h.service}</p>
                      <p className="text-xs text-gray-500">{h.professional} • {formatDate(h.date)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(h.value)}</p>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">Concluído</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "anamnese" && (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-pink-200 mx-auto mb-3" />
              <h3 className="font-bold text-gray-700 mb-1">Ficha de Anamnese</h3>
              <p className="text-gray-400 text-sm mb-4">Preencha a ficha de anamnese completa da cliente</p>
              <button className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-pink-500/20">
                Preencher Anamnese
              </button>
            </div>
          )}

          {activeTab === "galeria" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Galeria de Fotos</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 text-pink-600 rounded-xl text-xs font-semibold hover:bg-pink-100 transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                  Upload Foto
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-300" />
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-400 text-sm mt-4">Nenhuma foto cadastrada</p>
            </div>
          )}

          {activeTab === "pacotes" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Pacotes Adquiridos</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 text-pink-600 rounded-xl text-xs font-semibold hover:bg-pink-100 transition-colors">
                  <Package className="w-3.5 h-3.5" />
                  Novo Pacote
                </button>
              </div>
              <div className="space-y-3">
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Pacote Renovação Facial</h4>
                      <p className="text-xs text-gray-500">Comprado em 15/04/2025 • Válido até 15/08/2025</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">Ativo</span>
                  </div>
                  <div className="flex gap-4">
                    {[
                      { label: "Total", value: 8, color: "bg-gray-200" },
                      { label: "Realizadas", value: 3, color: "bg-pink-500" },
                      { label: "Restantes", value: 5, color: "bg-green-400" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="text-center">
                        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white font-bold text-lg mx-auto`}>
                          {value}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                      <span>Progresso</span>
                      <span>3/8 sessões</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: "37.5%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "financeiro" && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Histórico Financeiro</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Total Gasto", value: formatCurrency(1930), color: "text-pink-600", bg: "bg-pink-50" },
                  { label: "Em Aberto", value: formatCurrency(0), color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Cashback", value: formatCurrency(client?.cashbackBalance || 0), color: "text-green-600", bg: "bg-green-50" },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
                    <p className={`text-lg font-bold ${color}`}>{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {mockHistory.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{h.service}</p>
                      <p className="text-xs text-gray-400">{formatDate(h.date)} • PIX</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(h.value)}</p>
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">Pago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "documentos" && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <h3 className="font-bold text-gray-700 mb-1">Documentos</h3>
              <p className="text-gray-400 text-sm mb-4">Contratos, termos, receitas e outros documentos</p>
              <button className="px-6 py-2.5 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl text-sm font-semibold hover:border-pink-300 hover:text-pink-500 transition-colors">
                + Adicionar Documento
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isView && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0 bg-gray-50">
            <button
              onClick={onClose}
              className="px-5 py-2 text-gray-600 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button className="px-5 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-pink-500/20 hover:from-pink-700 hover:to-rose-700 transition-all">
              {mode === "create" ? "Cadastrar Cliente" : "Salvar Alterações"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
