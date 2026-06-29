"use client";

import { useState } from "react";
import {
  Settings, Building2, Shield, Bell, Palette, Clock, Users, Database, FileText, Globe, Save
} from "lucide-react";

const tabs = [
  { id: "clinic", label: "Clínica", icon: Building2 },
  { id: "users", label: "Usuários", icon: Users },
  { id: "appearance", label: "Aparência", icon: Palette },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "schedule", label: "Horários", icon: Clock },
  { id: "security", label: "Segurança", icon: Shield },
  { id: "backup", label: "Backup", icon: Database },
  { id: "lgpd", label: "LGPD", icon: FileText },
];

const userProfiles = [
  { id: "admin", name: "Administrador", description: "Acesso total ao sistema", permissions: ["Tudo"] },
  { id: "manager", name: "Gerente", description: "Gestão operacional completa", permissions: ["Dashboard", "Clientes", "Agenda", "Financeiro", "Relatórios"] },
  { id: "recepcao", name: "Recepção", description: "Agendamentos e clientes", permissions: ["Agenda", "Clientes", "WhatsApp"] },
  { id: "esteticista", name: "Esteticista", description: "Atendimentos e agenda pessoal", permissions: ["Agenda Pessoal", "Clientes (leitura)"] },
  { id: "financial", name: "Financeiro", description: "Controle financeiro", permissions: ["Financeiro", "Relatórios", "Estoque"] },
];

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("clinic");

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-2 sticky top-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-500/20"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {activeTab === "clinic" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-lg">Dados da Clínica</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-rose-700 transition-all shadow-md shadow-pink-500/20">
                <Save className="w-4 h-4" /> Salvar
              </button>
            </div>

            {/* Logo upload */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl font-bold">AC</span>
              </div>
              <div>
                <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-colors">
                  Carregar Logo
                </button>
                <p className="text-xs text-gray-400 mt-1">PNG ou SVG, máx. 2MB, fundo transparente</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Nome da Empresa", value: "AC Beauty Clinic", placeholder: "Nome da empresa" },
                { label: "Nome Fantasia", value: "AC Beauty", placeholder: "Nome fantasia" },
                { label: "CNPJ", value: "12.345.678/0001-90", placeholder: "00.000.000/0001-00" },
                { label: "Responsável Técnica", value: "Ana Claudia Coutinho", placeholder: "Nome completo" },
                { label: "E-mail", value: "contato@acbeautyclinic.com.br", placeholder: "email@empresa.com" },
                { label: "WhatsApp", value: "(11) 99999-0000", placeholder: "(00) 00000-0000" },
                { label: "Telefone", value: "(11) 4444-5555", placeholder: "(00) 0000-0000" },
                { label: "Instagram", value: "@acbeautyclinic", placeholder: "@perfil" },
              ].map(({ label, value, placeholder }) => (
                <div key={label} className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">{label}</label>
                  <input
                    type="text"
                    defaultValue={value}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Endereço Completo</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="md:col-span-2 space-y-1.5">
                  <input type="text" defaultValue="Rua das Rosas" placeholder="Rua/Av." className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
                </div>
                <input type="text" defaultValue="123" placeholder="Número" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
                <input type="text" defaultValue="Jardins" placeholder="Bairro" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
                <input type="text" defaultValue="São Paulo" placeholder="Cidade" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
                <input type="text" defaultValue="01452-000" placeholder="CEP" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 text-lg">Perfis de Acesso</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-rose-700 transition-all shadow-md shadow-pink-500/20">
                <Users className="w-4 h-4" /> Novo Usuário
              </button>
            </div>
            <div className="space-y-3">
              {userProfiles.map((profile) => (
                <div key={profile.id} className="border border-gray-100 rounded-xl p-4 hover:border-pink-200 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{profile.name}</h3>
                      <p className="text-xs text-gray-500">{profile.description}</p>
                    </div>
                    <button className="text-xs text-pink-600 hover:text-pink-700 font-semibold">Editar permissões</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.permissions.map(p => (
                      <span key={p} className="text-[11px] bg-pink-50 text-pink-700 px-2 py-0.5 rounded-lg font-medium">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-bold text-gray-900 text-lg">Aparência e Tema</h2>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Cor Principal</label>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "Rosa (Padrão)", color: "#ec4899" },
                  { name: "Roxo", color: "#8b5cf6" },
                  { name: "Azul", color: "#3b82f6" },
                  { name: "Verde", color: "#10b981" },
                  { name: "Dourado", color: "#f59e0b" },
                ].map(({ name, color }) => (
                  <button key={name} className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl border-2 border-white shadow-md group-hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                    <span className="text-[10px] text-gray-500">{name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Modo</label>
              <div className="flex gap-3">
                {["Claro", "Escuro", "Automático"].map(mode => (
                  <button key={mode} className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${mode === "Claro" ? "border-pink-500 text-pink-600 bg-pink-50" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                    {mode === "Claro" ? "☀️" : mode === "Escuro" ? "🌙" : "🌓"} {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "backup" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-bold text-gray-900 text-lg">Backup e Restauração</h2>
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-800 text-sm">Último backup realizado</p>
                <p className="text-green-700 text-xs">Hoje às 03:00 — 128 MB</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">✓ Sucesso</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all text-center">
                <Database className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Fazer Backup Agora</p>
                <p className="text-xs text-gray-400">Exportar todos os dados</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all text-center">
                <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Restaurar Backup</p>
                <p className="text-xs text-gray-400">Importar dados anteriores</p>
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Backups Automáticos</h3>
              <div className="space-y-2">
                {["Diário às 03:00", "Semanal (Domingo)", "Mensal (dia 1)"].map(b => (
                  <div key={b} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-700">{b}</span>
                    <span className="text-xs font-bold text-green-600">Ativo</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "lgpd" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-bold text-gray-900 text-lg">LGPD — Proteção de Dados</h2>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              O sistema está configurado em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
            </div>
            <div className="space-y-3">
              {[
                { label: "Coleta de dados pessoais", desc: "Consentimento explícito ao cadastrar", active: true },
                { label: "Autorização de uso de imagem", desc: "Assinatura digital obrigatória", active: true },
                { label: "Direito ao esquecimento", desc: "Exclusão de dados sob solicitação", active: true },
                { label: "Portabilidade de dados", desc: "Exportação em formato legível", active: true },
                { label: "Log de acessos", desc: "Auditoria completa de ações", active: true },
              ].map(({ label, desc, active }) => (
                <div key={label} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${active ? "bg-green-50" : "bg-gray-50"}`}>
                    <Shield className={`w-4 h-4 ${active ? "text-green-500" : "text-gray-300"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {active ? "✓ Ativo" : "Inativo"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!["clinic", "users", "appearance", "backup", "lgpd"].includes(activeTab) && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Settings className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="font-bold text-gray-700 mb-1">Configurações em desenvolvimento</h3>
            <p className="text-gray-400 text-sm">Esta seção estará disponível em breve</p>
          </div>
        )}
      </div>
    </div>
  );
}
