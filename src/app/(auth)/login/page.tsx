"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@acestetica.com.br");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulated authentication
    await new Promise((r) => setTimeout(r, 1200));

    if (
      email === "admin@acestetica.com.br" &&
      password === "admin123"
    ) {
      router.push("/dashboard");
    } else {
      setError("E-mail ou senha incorretos. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient - rich dark gold */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1200 0%, #3d2c00 40%, #2a1f00 100%)" }} />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: "#C9A84C" }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: "#D4AF37" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "#F0D060" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          {/* Logo area */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(201,168,76,0.2)", backdropFilter: "blur(10px)" }}>
              <Sparkles className="w-7 h-7 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-none">AC Estética</h1>
              <p className="text-sm" style={{ color: "#D4AF37" }}>Facial e Corporal</p>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ backgroundColor: "rgba(201,168,76,0.15)", backdropFilter: "blur(10px)" }}>
                <Shield className="w-4 h-4" style={{ color: "#D4AF37" }} />
                <span className="text-sm font-medium" style={{ color: "#F0D060" }}>Sistema ERP Profissional</span>
              </div>
              <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Gerencie sua clínica com{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #F0D060, #C9A84C)" }}>
                  excelência
                </span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "#D4C080" }}>
                Controle total de agendamentos, clientes, financeiro, estoque e muito mais em um único sistema.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {[
                "📅 Agenda Inteligente",
                "💰 Controle Financeiro",
                "👤 Gestão de Clientes",
                "📊 Relatórios Avançados",
                "💬 WhatsApp Integrado",
                "📦 Controle de Estoque",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ backgroundColor: "rgba(201,168,76,0.12)", backdropFilter: "blur(10px)" }}
                >
                  <span className="text-sm text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div>
            <div className="h-px mb-4" style={{ backgroundColor: "rgba(201,168,76,0.3)" }} />
            <div className="flex items-center justify-between">
              <p className="text-sm" style={{ color: "#C9A84C" }}>
                Responsável: <span className="text-white font-medium">Ana Claudia Coutinho</span>
              </p>
              <p className="text-xs" style={{ color: "#8B6914" }}>v1.0.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)" }}>
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900 leading-none">AC Estética</h1>
              <p className="text-sm" style={{ color: "#8B6914" }}>Facial e Corporal</p>
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vinda de volta! 👋</h2>
              <p className="text-gray-500">Entre com suas credenciais para acessar o sistema</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200"
                    style={{ outlineColor: "#C9A84C" }}
                    onFocus={(e) => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 2px rgba(201,168,76,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200"
                    onFocus={(e) => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 2px rgba(201,168,76,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18px] h-[18px]" />
                    ) : (
                      <Eye className="w-[18px] h-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                    style={{ accentColor: "#C9A84C" }}
                  />
                  <span className="text-sm text-gray-600">Lembrar de mim</span>
                </label>
                <button
                  type="button"
                  className="text-sm font-medium transition-colors"
                  style={{ color: "#8B6914" }}
                >
                  Esqueci a senha
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                  boxShadow: "0 8px 24px rgba(201,168,76,0.35)"
                }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar no Sistema</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 rounded-xl border" style={{ backgroundColor: "rgba(201,168,76,0.06)", borderColor: "rgba(201,168,76,0.2)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#6B4F0A" }}>
                🔑 Credenciais de demonstração:
              </p>
              <p className="text-xs" style={{ color: "#8B6914" }}>
                Email: <span className="font-mono font-medium">admin@acestetica.com.br</span>
              </p>
              <p className="text-xs" style={{ color: "#8B6914" }}>
                Senha: <span className="font-mono font-medium">admin123</span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-xs mt-6">
            © {new Date().getFullYear()} AC Estética - Facial e Corporal · Desenvolvido por Felipe Augusto
          </p>
        </div>
      </div>
    </div>
  );
}
