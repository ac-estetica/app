"use client";

import { useState } from "react";
import { Archive, AlertTriangle, Plus, Search, Package, DollarSign, TrendingDown } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  cosmetic: "Cosmético",
  material: "Material",
  disposable: "Descartável",
  equipment: "Equipamento",
};

const categoryColors: Record<string, string> = {
  cosmetic: "bg-pink-100 text-pink-700",
  material: "bg-blue-100 text-blue-700",
  disposable: "bg-amber-100 text-amber-700",
  equipment: "bg-violet-100 text-violet-700",
};

export default function EstoquePage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setcategoryFilter] = useState("all");

  const lowStock = mockProducts.filter(p => p.quantity <= p.minQuantity);
  const filtered = mockProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const totalValue = mockProducts.reduce((s, p) => s + p.quantity * p.unitPrice, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total de Itens", value: mockProducts.length, icon: Archive, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "Estoque Baixo", value: lowStock.length, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
          { label: "Valor Total", value: formatCurrency(totalValue), icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "Movimentações Mês", value: 48, icon: TrendingDown, color: "text-blue-600", bg: "bg-blue-50" },
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

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-red-700">⚠️ Estoque Crítico — {lowStock.length} produto(s) abaixo do mínimo</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(p => (
              <span key={p.id} className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-xl font-semibold">
                {p.name} ({p.quantity}/{p.minQuantity} {p.unit})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Product table */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-900">Controle de Estoque</h2>
            <p className="text-gray-400 text-sm">{filtered.length} produto(s)</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Buscar produto..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all w-52" />
          </div>
          <div className="flex bg-gray-100 rounded-xl p-0.5">
            {[
              { value: "all", label: "Todos" },
              { value: "cosmetic", label: "Cosméticos" },
              { value: "disposable", label: "Descartáveis" },
              { value: "material", label: "Materiais" },
            ].map(({ value, label }) => (
              <button key={value} onClick={() => setcategoryFilter(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${categoryFilter === value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
                {label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-rose-700 transition-all shadow-md shadow-pink-500/20">
            <Plus className="w-4 h-4" /> Novo Produto
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Produto", "Categoria", "Quantidade", "Estoque Mín.", "Valor Unit.", "Valor Total", "Status"].map(h => (
                  <th key={h} className="text-left p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const isLow = product.quantity <= product.minQuantity;
                const stockPct = Math.min((product.quantity / (product.minQuantity * 2)) * 100, 100);
                return (
                  <tr key={product.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${isLow ? "bg-red-50/30" : ""}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${categoryColors[product.category] || "bg-gray-100"}`}>
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          {product.description && <p className="text-xs text-gray-400 truncate max-w-[180px]">{product.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${categoryColors[product.category] || "bg-gray-100 text-gray-600"}`}>
                        {categoryLabels[product.category]}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className={`text-sm font-bold ${isLow ? "text-red-600" : "text-gray-900"}`}>
                          {product.quantity} {product.unit}
                        </p>
                        <div className="h-1.5 bg-gray-100 rounded-full mt-1 w-24">
                          <div
                            className={`h-1.5 rounded-full ${isLow ? "bg-red-400" : "bg-green-400"}`}
                            style={{ width: `${stockPct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{product.minQuantity} {product.unit}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900">{formatCurrency(product.unitPrice)}</td>
                    <td className="p-4 text-sm font-bold text-gray-900">{formatCurrency(product.quantity * product.unitPrice)}</td>
                    <td className="p-4">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isLow ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {isLow ? "Crítico" : "Normal"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
