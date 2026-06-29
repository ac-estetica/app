"use client";

import { useState } from "react";
import {
  BarChart3, Download, FileText, Users, DollarSign, Calendar, Package, TrendingUp, Filter
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { monthlyRevenueData, serviceDistributionData, paymentMethodData, mockDashboardData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const reportTypes = [
  { id: "financial", label: "Financeiro", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
  { id: "clients", label: "Clientes", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "appointments", label: "Atendimentos", icon: Calendar, color: "text-violet-600", bg: "bg-violet-50" },
  { id: "packages", label: "Pacotes", icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
  { id: "professionals", label: "Profissionais", icon: TrendingUp, color: "text-pink-600", bg: "bg-pink-50" },
  { id: "services", label: "Serviços", icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50" },
];

export default function RelatoriosPage() {
  const [activeReport, setActiveReport] = useState("financial");
  const [period, setPeriod] = useState("month");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">Relatórios e Análises</h2>
            <p className="text-gray-400 text-sm">Exporte e analise todos os dados da clínica</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-xl p-0.5">
              {[
                { value: "today", label: "Hoje" },
                { value: "week", label: "Semana" },
                { value: "month", label: "Mês" },
                { value: "year", label: "Ano" },
              ].map(({ value, label }) => (
                <button key={value} onClick={() => setPeriod(value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
                  {label}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-rose-700 transition-all shadow-md shadow-pink-500/20">
              <Download className="w-4 h-4" /> Exportar PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" /> Excel
            </button>
          </div>
        </div>
      </div>

      {/* Report type selector */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {reportTypes.map(({ id, label, icon: Icon, color, bg }) => (
          <button
            key={id}
            onClick={() => setActiveReport(id)}
            className={`p-4 rounded-2xl border-2 transition-all text-center ${
              activeReport === id
                ? "border-pink-400 bg-pink-50 shadow-md"
                : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className={`text-xs font-bold ${activeReport === id ? "text-pink-600" : "text-gray-600"}`}>
              {label}
            </p>
          </button>
        ))}
      </div>

      {/* Financial Report */}
      {activeReport === "financial" && (
        <div className="space-y-5">
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Receita Total", value: formatCurrency(mockDashboardData.financial.monthlyRevenue) },
              { label: "Despesas", value: formatCurrency(mockDashboardData.financial.expenses) },
              { label: "Lucro Líquido", value: formatCurrency(mockDashboardData.financial.profit) },
              { label: "Margem", value: `${((mockDashboardData.financial.profit / mockDashboardData.financial.monthlyRevenue) * 100).toFixed(1)}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Receita vs Despesas (6 meses)</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={monthlyRevenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", fontSize: "12px" }} formatter={(v: number) => [formatCurrency(v), ""]} />
                  <Legend />
                  <Bar dataKey="receita" name="Receita" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lucro" name="Lucro" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Formas de Pagamento</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={paymentMethodData} cx="50%" cy="50%" outerRadius={70} paddingAngle={3} dataKey="value">
                    {paymentMethodData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {paymentMethodData.map(({ name, value, color }) => (
                  <div key={name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-gray-600">{name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clients Report */}
      {activeReport === "clients" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Crescimento de Clientes</h3>
            <div className="space-y-3">
              {[
                { label: "Total de Clientes", value: mockDashboardData.clients.total },
                { label: "Clientes Ativos", value: mockDashboardData.clients.active },
                { label: "Clientes Inativos", value: mockDashboardData.clients.inactive },
                { label: "Novos este mês", value: mockDashboardData.clients.newThisMonth },
                { label: "Taxa de Retorno", value: `${mockDashboardData.clients.returnRate}%` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-700">{label}</span>
                  <span className="text-sm font-bold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Distribuição por Procedimento</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={serviceDistributionData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {serviceDistributionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend />
                <Tooltip formatter={(v: number) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeReport !== "financial" && activeReport !== "clients" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <BarChart3 className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <h3 className="font-bold text-gray-700 mb-1">Relatório em desenvolvimento</h3>
          <p className="text-gray-400 text-sm">Este relatório estará disponível em breve com dados detalhados</p>
        </div>
      )}
    </div>
  );
}
