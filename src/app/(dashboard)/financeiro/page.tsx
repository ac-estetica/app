"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockTransactions, monthlyRevenueData, mockDashboardData } from "@/lib/mock-data";
import { formatCurrency, formatDate, getStatusBadgeColor, getStatusLabel, getPaymentMethodLabel } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Visão Geral" },
  { id: "receivable", label: "A Receber" },
  { id: "payable", label: "A Pagar" },
  { id: "cashflow", label: "Fluxo de Caixa" },
  { id: "daily", label: "Caixa Diário" },
];

const paymentIcons: Record<string, string> = {
  pix: "🟢",
  cash: "💵",
  credit_card: "💳",
  debit_card: "🏧",
  transfer: "🔄",
  boleto: "📃",
  digital_wallet: "📱",
  multiple: "🔀",
};

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"income" | "expense">("income");

  const filteredTransactions = mockTransactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const income = filteredTransactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = filteredTransactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const kpis = [
    {
      label: "Faturamento do Mês",
      value: formatCurrency(mockDashboardData.financial.monthlyRevenue),
      change: "+8.3%",
      positive: true,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Despesas do Mês",
      value: formatCurrency(mockDashboardData.financial.expenses),
      change: "+2.1%",
      positive: false,
      icon: TrendingDown,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      label: "Lucro Líquido",
      value: formatCurrency(mockDashboardData.financial.profit),
      change: "+15.2%",
      positive: true,
      icon: DollarSign,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "A Receber",
      value: formatCurrency(mockDashboardData.financial.accountsReceivable),
      change: "3 pendentes",
      positive: true,
      icon: ArrowDownLeft,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "A Pagar",
      value: formatCurrency(mockDashboardData.financial.accountsPayable),
      change: "4 pendentes",
      positive: false,
      icon: ArrowUpRight,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Vencido",
      value: formatCurrency(mockDashboardData.financial.overduePayable),
      change: "Urgente",
      positive: false,
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all">
              <div className={`w-9 h-9 ${kpi.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-4.5 h-4.5 ${kpi.color} w-[18px] h-[18px]`} />
              </div>
              <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
              <p className="text-gray-500 text-[10px] mt-0.5">{kpi.label}</p>
              <span className={`inline-flex items-center text-[10px] font-semibold mt-1 ${kpi.positive ? "text-green-600" : "text-red-500"}`}>
                {kpi.positive ? "↑" : "↓"} {kpi.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100">
        {/* Tab header */}
        <div className="border-b border-gray-100 px-5 flex items-center justify-between">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "border-yellow-500 text-yellow-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => { setModalType("income"); setModalOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-xl text-xs font-semibold hover:bg-green-100 transition-colors border border-green-200"
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              Receita
            </button>
            <button
              onClick={() => { setModalType("expense"); setModalOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors border border-red-200"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              Despesa
            </button>
          </div>
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div className="p-5 space-y-6">
            {/* Chart */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Evolução Financeira</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors">
                    Últimos 6 meses <ChevronDown className="w-3 h-3" />
                  </button>
                  <button className="p-1.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyRevenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReceita2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDespesas2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(value: number) => [formatCurrency(value), ""]}
                  />
                  <Area type="monotone" dataKey="receita" name="Receita" stroke="#10b981" strokeWidth={2.5} fill="url(#colorReceita2)" />
                  <Area type="monotone" dataKey="despesas" name="Despesas" stroke="#ef4444" strokeWidth={2} fill="url(#colorDespesas2)" />
                  <Area type="monotone" dataKey="lucro" name="Lucro" stroke="#ec4899" strokeWidth={2.5} fill="none" strokeDasharray="5 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Recent transactions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Últimas Transações</h3>
                <button className="text-xs font-semibold text-yellow-700 hover:text-yellow-800">Ver todas</button>
              </div>
              <TransactionList transactions={mockTransactions.slice(0, 6)} />
            </div>
          </div>
        )}

        {/* Receivable / Payable tabs */}
        {(activeTab === "receivable" || activeTab === "payable") && (
          <div className="p-5">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-400 transition-all"
                />
              </div>
              <div className="flex bg-gray-100 rounded-xl p-0.5">
                {["all", "pending", "paid", "overdue"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === s ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {s === "all" ? "Todos" : s === "pending" ? "Pendentes" : s === "paid" ? "Pagos" : "Vencidos"}
                  </button>
                ))}
              </div>
              <button className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1.5 p-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <TransactionList
              transactions={filteredTransactions.filter((t) =>
                activeTab === "receivable" ? t.type === "income" : t.type === "expense"
              )}
              showActions
            />
          </div>
        )}

        {/* Cash flow tab */}
        {activeTab === "cashflow" && (
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Saldo Atual", value: formatCurrency(28992), color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Entradas Previstas", value: formatCurrency(3280), color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Saídas Previstas", value: formatCurrency(7850), color: "text-red-500", bg: "bg-red-50" },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className={`${bg} rounded-xl p-4`}>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyRevenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", fontSize: "12px" }}
                  formatter={(value: number) => [formatCurrency(value), ""]}
                />
                <Area type="monotone" dataKey="lucro" name="Saldo" stroke="#ec4899" strokeWidth={3} fill="url(#colorCF)" />
                <Area type="monotone" dataKey="receita" name="Entradas" stroke="#10b981" strokeWidth={2} fill="none" />
                <Area type="monotone" dataKey="despesas" name="Saídas" stroke="#ef4444" strokeWidth={2} fill="none" strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Daily cash tab */}
        {activeTab === "daily" && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-gray-900">Caixa Diário</h3>
                <p className="text-gray-400 text-sm">{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-xl text-xs font-semibold border border-green-200">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Caixa Aberto
                </span>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
                  Fechar Caixa
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Abertura", value: formatCurrency(500) },
                { label: "Entradas", value: formatCurrency(2110) },
                { label: "Saídas", value: formatCurrency(0) },
                { label: "Saldo Atual", value: formatCurrency(2610) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold text-gray-900">{value}</p>
                  <p className="text-gray-500 text-xs">{label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">Movimentações do Dia</h4>
              <TransactionList transactions={mockTransactions.filter((t) => t.paymentDate)} />
            </div>
          </div>
        )}
      </div>

      {/* New transaction modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className={`p-5 ${modalType === "income" ? "bg-green-50" : "bg-red-50"} border-b border-gray-100`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${modalType === "income" ? "bg-green-500" : "bg-red-500"} rounded-xl flex items-center justify-center`}>
                    {modalType === "income" ? <ArrowDownLeft className="w-5 h-5 text-white" /> : <ArrowUpRight className="w-5 h-5 text-white" />}
                  </div>
                  <h2 className="font-bold text-gray-900">
                    Nova {modalType === "income" ? "Receita" : "Despesa"}
                  </h2>
                </div>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: "Descrição", placeholder: "Ex: Limpeza de Pele", type: "text" },
                { label: "Valor (R$)", placeholder: "0,00", type: "number" },
                { label: "Vencimento", placeholder: "", type: "date" },
              ].map(({ label, placeholder, type }) => (
                <div key={label} className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-400 transition-all"
                  />
                </div>
              ))}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Categoria</label>
                <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-400 transition-all">
                  {modalType === "income"
                    ? ["Serviços", "Pacotes", "Produtos", "Outros"].map((c) => <option key={c}>{c}</option>)
                    : ["Fornecedores", "Aluguel", "Salários", "Marketing", "Manutenção", "Outros"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button className="flex-1 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-yellow-500/20 hover:from-yellow-700 hover:to-amber-900 transition-all">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TransactionList({
  transactions,
  showActions = false,
}: {
  transactions: typeof mockTransactions;
  showActions?: boolean;
}) {
  return (
    <div className="space-y-2">
      {transactions.length === 0 ? (
        <div className="text-center py-10">
          <DollarSign className="w-10 h-10 text-gray-200 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Nenhuma transação encontrada</p>
        </div>
      ) : (
        transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 p-3.5 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group"
          >
            {/* Type icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              t.type === "income" ? "bg-green-50" : "bg-red-50"
            }`}>
              {t.type === "income" ? (
                <ArrowDownLeft className="w-4.5 h-4.5 text-green-500 w-[18px] h-[18px]" />
              ) : (
                <ArrowUpRight className="w-4.5 h-4.5 text-red-500 w-[18px] h-[18px]" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{t.description}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-400">{t.category}</span>
                {t.paymentMethod && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] text-gray-400">
                      {paymentIcons[t.paymentMethod] || ""} {getPaymentMethodLabel(t.paymentMethod)}
                    </span>
                  </>
                )}
                <span className="text-gray-300">•</span>
                <span className="text-[10px] text-gray-400">
                  {t.paymentDate ? `Pago em ${formatDate(t.paymentDate)}` : `Vence ${formatDate(t.dueDate)}`}
                </span>
              </div>
            </div>

            {/* Amount + status */}
            <div className="text-right flex-shrink-0">
              <p className={`text-sm font-bold ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </p>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${getStatusBadgeColor(t.status)}`}>
                {getStatusLabel(t.status)}
              </span>
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <button className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </button>
                {t.status === "pending" && (
                  <button className="w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
