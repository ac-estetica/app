"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Visão geral da clínica" },
  "/clientes": { title: "Clientes", subtitle: "Gestão de clientes" },
  "/agenda": { title: "Agenda", subtitle: "Agendamentos e horários" },
  "/financeiro": { title: "Financeiro", subtitle: "Controle financeiro" },
  "/servicos": { title: "Serviços", subtitle: "Cadastro de procedimentos" },
  "/pacotes": { title: "Pacotes", subtitle: "Gestão de pacotes" },
  "/profissionais": { title: "Profissionais", subtitle: "Equipe e comissões" },
  "/estoque": { title: "Estoque", subtitle: "Controle de produtos" },
  "/relatorios": { title: "Relatórios", subtitle: "Análises e exportações" },
  "/configuracoes": { title: "Configurações", subtitle: "Configurações do sistema" },
  "/whatsapp": { title: "WhatsApp", subtitle: "Mensagens e automação" },
  "/fidelidade": { title: "Fidelidade", subtitle: "Programa de pontos" },
  "/orcamentos": { title: "Orçamentos", subtitle: "Propostas e contratos" },
  "/fornecedores": { title: "Fornecedores", subtitle: "Gestão de fornecedores" },
  "/indicadores": { title: "KPIs", subtitle: "Indicadores de desempenho" },
  "/vendas": { title: "Vendas", subtitle: "Histórico de vendas" },
};

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Pacote vencendo",
    message: "Patrícia Oliveira tem 2 sessões restantes",
    time: "há 5 min",
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    id: 2,
    type: "info",
    title: "Agendamento confirmado",
    message: "Juliana Ferreira - 09:00h Limpeza de Pele",
    time: "há 12 min",
    icon: Calendar,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: 3,
    type: "warning",
    title: "Estoque baixo",
    message: "Peeling Mandélico 30% - apenas 3 unidades",
    time: "há 1h",
    icon: AlertCircle,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const routeKey = Object.keys(routeTitles).find((key) => pathname.startsWith(key)) || "/dashboard";
  const { title, subtitle } = routeTitles[routeKey] || routeTitles["/dashboard"];

  return (
    <header className="bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 h-16 flex-shrink-0 relative z-10">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-gray-900 font-bold text-lg leading-none">{title}</h2>
          <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Search bar - desktop */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar clientes, agendamentos..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-yellow-400 transition-all"
            style={{ "--tw-ring-color": "rgba(201,168,76,0.2)" } as React.CSSProperties}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono hidden lg:block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-1.5">
        {/* Mobile search */}
        <button
          className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl shadow-gray-200 border border-gray-100 z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notificações</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#8B6914" }}>
                  {notifications.length} novas
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      className="p-4 flex gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.bg}`}>
                        <Icon className={`w-4.5 h-4.5 ${notif.color} w-[18px] h-[18px]`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{notif.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{notif.message}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{notif.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button className="w-full text-center text-xs font-medium py-1 transition-colors" style={{ color: "#8B6914" }}>
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)" }}>
              AC
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-gray-800 leading-none">Ana Claudia</p>
              <p className="text-[10px] text-gray-400">Administradora</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden lg:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-gray-200 border border-gray-100 z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Ana Claudia Coutinho</p>
                <p className="text-xs text-gray-500">Administradora</p>
                <p className="text-xs text-gray-400 mt-0.5">ana@acestetica.com.br</p>
              </div>
              <div className="p-2">
                {[
                  { icon: User, label: "Meu Perfil" },
                  { icon: Settings, label: "Configurações" },
                  { icon: HelpCircle, label: "Ajuda e Suporte" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                  >
                    <Icon className="w-4 h-4 text-gray-400" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-medium">
                  <LogOut className="w-4 h-4" />
                  Sair do Sistema
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setNotifOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </header>
  );
}
