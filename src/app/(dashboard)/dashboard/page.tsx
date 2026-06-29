"use client";

import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  AlertCircle,
  Clock,
  CheckCircle2,
  Package,
  Star,
  ArrowUpRight,
  Gift,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  mockDashboardData,
  mockAppointments,
  mockClients,
  monthlyRevenueData,
  weeklyAppointmentsData,
  serviceDistributionData,
  paymentMethodData,
  clientGrowthData,
} from "@/lib/mock-data";
import { formatCurrency, formatDate, getStatusBadgeColor, getStatusLabel } from "@/lib/utils";

const kpiCards = [
  {
    title: "Faturamento Hoje",
    value: formatCurrency(mockDashboardData.financial.dailyRevenue),
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    sub: `Semana: ${formatCurrency(mockDashboardData.financial.weeklyRevenue)}`,
  },
  {
    title: "Faturamento Mensal",
    value: formatCurrency(mockDashboardData.financial.monthlyRevenue),
    change: "+8.3%",
    positive: true,
    icon: TrendingUp,
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    sub: `Ticket Médio: ${formatCurrency(mockDashboardData.financial.averageTicket)}`,
  },
  {
    title: "Clientes Ativos",
    value: mockDashboardData.clients.active.toString(),
    change: `+${mockDashboardData.clients.newThisMonth} este mês`,
    positive: true,
    icon: Users,
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    sub: `Retorno: ${mockDashboardData.clients.returnRate}%`,
  },
  {
    title: "Agendamentos Hoje",
    value: mockDashboardData.appointments.today.toString(),
    change: `${mockDashboardData.appointments.inProgress} em atendimento`,
    positive: true,
    icon: Calendar,
    color: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-700",
    sub: `Faltas: ${mockDashboardData.appointments.absenceRate}%`,
  },
  {
    title: "Contas a Receber",
    value: formatCurrency(mockDashboardData.financial.accountsReceivable),
    change: "3 pendentes",
    positive: true,
    icon: ArrowUpRight,
    color: "from-amber-500 to-orange-400",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    sub: "Vence hoje",
  },
  {
    title: "Contas Vencidas",
    value: formatCurrency(mockDashboardData.financial.overduePayable),
    change: "1 em atraso",
    positive: false,
    icon: AlertCircle,
    color: "from-red-500 to-amber-900",
    bg: "bg-red-50",
    iconColor: "text-red-600",
    sub: "Ação necessária",
  },
  {
    title: "Lucro do Mês",
    value: formatCurrency(mockDashboardData.financial.profit),
    change: "+15.2% vs mês ant.",
    positive: true,
    icon: Activity,
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50",
    iconColor: "text-green-600",
    sub: `Margem: ${((mockDashboardData.financial.profit / mockDashboardData.financial.monthlyRevenue) * 100).toFixed(1)}%`,
  },
  {
    title: "Pacotes Vencendo",
    value: "3",
    change: "nos próximos 30 dias",
    positive: false,
    icon: Package,
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    sub: "Atenção necessária",
  },
];

const todayAppointments = mockAppointments.slice(0, 6);

const birthdayClients = mockClients.filter((c) => {
  const birth = new Date(c.birthDate);
  const today = new Date();
  const thisMonth = today.getMonth();
  const bMonth = birth.getMonth();
  const daysLeft = birth.getDate() - today.getDate();
  return bMonth === thisMonth && daysLeft >= 0 && daysLeft <= 7;
});

export default function DashboardPage() {
  const today = new Date();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-stone-950 via-amber-950 to-stone-900 rounded-2xl p-6 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -right-4 bottom-0 w-64 h-24 bg-yellow-400/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-yellow-200 text-sm font-medium mb-1">
              {today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">
              Olá, Ana Claudia! 👋
            </h1>
            <p className="text-yellow-200 mt-1.5 text-sm">
              Você tem <span className="font-bold text-white">{mockDashboardData.appointments.today} agendamentos</span> hoje e{" "}
              <span className="font-bold text-white">{mockDashboardData.financial.dailyRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span> em faturamento.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center border border-white/10">
              <p className="text-yellow-200 text-[10px] uppercase font-bold tracking-wide">Realizados</p>
              <p className="text-white text-2xl font-bold">{mockDashboardData.appointments.completed}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center border border-white/10">
              <p className="text-yellow-200 text-[10px] uppercase font-bold tracking-wide">Em Andamento</p>
              <p className="text-white text-2xl font-bold">{mockDashboardData.appointments.inProgress}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center border border-white/10">
              <p className="text-yellow-200 text-[10px] uppercase font-bold tracking-wide">A Realizar</p>
              <p className="text-white text-2xl font-bold">{mockDashboardData.appointments.upcoming.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    card.positive
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {card.positive ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  {card.change}
                </span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-gray-500 text-[11px] mt-0.5 font-medium">{card.title}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue chart - 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900">Faturamento x Despesas x Lucro</h3>
              <p className="text-gray-400 text-xs mt-0.5">Últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />Receita</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" />Despesas</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />Lucro</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", fontSize: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                formatter={(value: number) => [formatCurrency(value), ""]}
              />
              <Area type="monotone" dataKey="receita" stroke="#ec4899" strokeWidth={2.5} fill="url(#colorReceita)" dot={{ fill: "#ec4899", r: 3, strokeWidth: 0 }} />
              <Area type="monotone" dataKey="despesas" stroke="#f87171" strokeWidth={2} strokeDasharray="4 2" fill="none" dot={false} />
              <Area type="monotone" dataKey="lucro" stroke="#10b981" strokeWidth={2.5} fill="url(#colorLucro)" dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="mb-4">
            <h3 className="font-bold text-gray-900">Distribuição de Serviços</h3>
            <p className="text-gray-400 text-xs mt-0.5">Por categoria</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={serviceDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {serviceDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", fontSize: "12px" }}
                formatter={(value: number) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {serviceDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-gray-600 truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly appointments */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900">Atendimentos por Dia</h3>
              <p className="text-gray-400 text-xs mt-0.5">Esta semana</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyAppointmentsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", fontSize: "12px" }}
              />
              <Bar dataKey="realizados" name="Realizados" fill="#ec4899" radius={[4, 4, 0, 0]} />
              <Bar dataKey="confirmados" name="Confirmados" fill="#f9a8d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="faltas" name="Faltas" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Client growth */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900">Crescimento de Clientes</h3>
              <p className="text-gray-400 text-xs mt-0.5">Últimos 6 meses</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={clientGrowthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", fontSize: "12px" }}
              />
              <Bar dataKey="novos" name="Novos" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="recorrentes" name="Recorrentes" stackId="a" fill="#c4b5fd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900">Agenda de Hoje</h3>
              <p className="text-gray-400 text-xs mt-0.5">
                {formatDate(new Date())} — {mockDashboardData.appointments.today} agendamentos
              </p>
            </div>
            <a
              href="/agenda"
              className="text-xs font-semibold text-yellow-700 hover:text-yellow-800 flex items-center gap-1 transition-colors"
            >
              Ver agenda
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="space-y-2">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div
                  className="w-1 h-12 rounded-full flex-shrink-0"
                  style={{ backgroundColor: apt.color || "#ec4899" }}
                />
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs font-bold text-gray-700 font-mono">
                    {apt.startTime}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">{apt.clientName}</p>
                  <p className="text-xs text-gray-500 truncate">{apt.serviceName}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="hidden sm:block text-right">
                    <p className="text-[11px] text-gray-500 truncate max-w-[100px]">{apt.professionalName.split(" ")[0]}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeColor(apt.status)}`}>
                    {getStatusLabel(apt.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Professionals ranking */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">Ranking Profissionais</h3>
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <div className="space-y-3">
              {mockDashboardData.professionals.ranking.map((prof, idx) => (
                <div key={prof.professionalId} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 ${
                    idx === 0 ? "bg-amber-400" : idx === 1 ? "bg-gray-400" : "bg-amber-700"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {prof.professionalName.split(" ")[0]}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 bg-gray-100 rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"
                          style={{ width: `${(prof.revenue / 28560) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-700 flex-shrink-0">
                    {formatCurrency(prof.revenue).replace("R$ ", "R$")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top services */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">Top Serviços</h3>
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="space-y-2.5">
              {mockDashboardData.services.topSelling.slice(0, 4).map((service, idx) => (
                <div key={service.id} className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-400 w-4">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-gray-800 truncate">{service.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 bg-gray-100 rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-900"
                          style={{ width: `${(service.count / 87) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-gray-600">{service.count}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Birthdays this month */}
          {birthdayClients.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-500 to-amber-900 rounded-2xl border border-yellow-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-4 h-4 text-yellow-500" />
                <h3 className="font-bold text-gray-900 text-sm">Aniversariantes</h3>
              </div>
              <div className="space-y-2">
                {birthdayClients.map((client) => (
                  <div key={client.id} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                      {client.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-800 truncate">{client.name}</p>
                      <p className="text-[10px] text-yellow-500">
                        {new Date(client.birthDate).toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
