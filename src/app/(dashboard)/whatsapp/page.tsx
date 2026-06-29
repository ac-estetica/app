"use client";

import { useState } from "react";
import {
  MessageCircle, Send, Users, CheckCircle2, Clock, Zap, Plus, Phone, QrCode, Settings, Bell
} from "lucide-react";
import { mockClients, mockAppointments } from "@/lib/mock-data";
import { formatPhone } from "@/lib/utils";

const templates = [
  { id: "t1", name: "Confirmação de Agendamento", category: "Agenda", variables: ["cliente", "servico", "data", "hora"], active: true,
    text: "Olá {cliente}! ✨ Confirmamos seu agendamento para *{servico}* no dia {data} às {hora}. Aguardamos você! 💕 AC Beauty Clinic" },
  { id: "t2", name: "Lembrete 24h antes", category: "Agenda", variables: ["cliente", "servico", "data", "hora"], active: true,
    text: "Oi {cliente}! 🌸 Lembrando que amanhã você tem *{servico}* às {hora}. Caso precise remarcar, entre em contato. Até amanhã! AC Beauty Clinic" },
  { id: "t3", name: "Aniversário", category: "Relacionamento", variables: ["cliente"], active: true,
    text: "Feliz aniversário, {cliente}! 🎉🎂 A AC Beauty Clinic te deseja um lindo dia! Como presente, você ganhou 10% de desconto na sua próxima visita. 💝" },
  { id: "t4", name: "Pacote Vencendo", category: "Fidelização", variables: ["cliente", "pacote", "sessoes", "dias"], active: true,
    text: "Oi {cliente}! Seu pacote *{pacote}* está vencendo em {dias} dias e ainda tem {sessoes} sessões para usar. Vamos agendar? 💕" },
  { id: "t5", name: "Retorno de Inativo", category: "Relacionamento", variables: ["cliente"], active: false,
    text: "Oi {cliente}, sentimos sua falta! 🥺 Faz um tempo que não te vemos por aqui. Que tal uma sessão especial? Temos novidades incríveis pra te mostrar! 💆‍♀️" },
];

const automations = [
  { name: "Confirmação de Agendamento", trigger: "Ao agendar", template: "Confirmação de Agendamento", active: true },
  { name: "Lembrete 24h", trigger: "1 dia antes", template: "Lembrete 24h antes", active: true },
  { name: "Lembrete 2h", trigger: "2 horas antes", template: "Lembrete Curto", active: true },
  { name: "Pós-Atendimento", trigger: "Após conclusão", template: "Pesquisa de Satisfação", active: false },
  { name: "Aniversariantes", trigger: "No aniversário", template: "Aniversário", active: true },
];

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "templates" | "bulk" | "automations">("dashboard");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    await new Promise(r => setTimeout(r, 2000));
    setConnected(true);
    setConnecting(false);
  };

  return (
    <div className="space-y-6">
      {/* Connection status */}
      <div className={`rounded-2xl p-5 flex items-center gap-4 ${connected ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${connected ? "bg-green-100" : "bg-amber-100"}`}>
          <MessageCircle className={`w-6 h-6 ${connected ? "text-green-600" : "text-amber-600"}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <div className={`w-2.5 h-2.5 rounded-full ${connected ? "bg-green-500" : "bg-amber-500"} ${!connected ? "animate-pulse" : ""}`} />
            <h3 className={`font-bold ${connected ? "text-green-800" : "text-amber-800"}`}>
              {connected ? "WhatsApp Conectado via Evolution API" : "WhatsApp Desconectado"}
            </h3>
          </div>
          <p className={`text-sm ${connected ? "text-green-700" : "text-amber-700"}`}>
            {connected
              ? "Número: (11) 99999-0000 • Todas as automações ativas"
              : "Conecte-se escaneando o QR Code com o WhatsApp Business"}
          </p>
        </div>
        {!connected && (
          <button onClick={handleConnect} disabled={connecting}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-70">
            {connecting ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Conectando...</>
            ) : (
              <><QrCode className="w-4 h-4" /> Conectar WhatsApp</>
            )}
          </button>
        )}
        {connected && (
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">✓ Online</span>
            <button className="p-2 hover:bg-green-100 rounded-xl text-green-600 transition-colors"><Settings className="w-4 h-4" /></button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="border-b border-gray-100 px-5 flex">
          {[
            { id: "dashboard", label: "Dashboard", icon: Zap },
            { id: "templates", label: "Modelos", icon: MessageCircle },
            { id: "bulk", label: "Envio em Massa", icon: Users },
            { id: "automations", label: "Automações", icon: Bell },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${activeTab === id ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === "dashboard" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Enviados Hoje", value: 24, icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Confirmações", value: 6, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
                  { label: "Lembretes", value: 12, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Taxa de Leitura", value: "89%", icon: MessageCircle, color: "text-violet-600", bg: "bg-violet-50" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className="border border-gray-100 rounded-xl p-4 flex items-center gap-3">
                    <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-4.5 h-4.5 ${color} w-[18px] h-[18px]`} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{value}</p>
                      <p className="text-gray-400 text-[10px]">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Próximos a Receber Mensagens Hoje</h3>
                <div className="space-y-2">
                  {mockAppointments.slice(0, 4).map((apt) => (
                    <div key={apt.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{apt.clientName}</p>
                        <p className="text-xs text-gray-500">{apt.serviceName} às {apt.startTime}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {apt.reminderSent ? (
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ Enviado</span>
                        ) : (
                          <button className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold hover:bg-green-600 transition-colors">
                            Enviar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Modelos de Mensagem</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-xl text-xs font-semibold hover:bg-green-600 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Novo Modelo
                </button>
              </div>
              <div className="space-y-3">
                {templates.map((tpl) => (
                  <div key={tpl.id} className="border border-gray-100 rounded-xl p-4 hover:border-green-200 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{tpl.name}</h4>
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tpl.category}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${tpl.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {tpl.active ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">Editar</button>
                        <button className="text-xs text-green-600 hover:text-green-700 px-2 py-1 rounded-lg hover:bg-green-50 transition-colors">Testar</button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">{tpl.text}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tpl.variables.map(v => (
                        <span key={v} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono">{`{${v}}`}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "automations" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Automações Ativas</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-xl text-xs font-semibold hover:bg-green-600 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Nova Automação
                </button>
              </div>
              <div className="space-y-3">
                {automations.map((auto, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${auto.active ? "bg-green-50" : "bg-gray-50"}`}>
                      <Zap className={`w-5 h-5 ${auto.active ? "text-green-500" : "text-gray-400"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{auto.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-500">Gatilho: <strong>{auto.trigger}</strong></span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[10px] text-gray-500">Modelo: <strong>{auto.template}</strong></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${auto.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {auto.active ? "Ativo" : "Inativo"}
                      </span>
                      <button className={`w-10 h-6 rounded-full transition-colors relative ${auto.active ? "bg-green-500" : "bg-gray-300"}`}>
                        <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${auto.active ? "left-5" : "left-1"}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "bulk" && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Envio em Massa</h3>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                ⚠️ Use com responsabilidade. Envios em massa devem respeitar a política de uso do WhatsApp.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Selecionar Destinatários</label>
                  <div className="space-y-2">
                    {["Todos os clientes ativos", "Aniversariantes do mês", "Clientes com pacotes vencendo", "Clientes inativos", "Segmento personalizado"].map(opt => (
                      <label key={opt} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-pink-200 cursor-pointer transition-colors">
                        <input type="checkbox" className="w-4 h-4 accent-pink-500" />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Modelo de Mensagem</label>
                  <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all">
                    {templates.map(t => <option key={t.id}>{t.name}</option>)}
                  </select>
                  <label className="text-sm font-semibold text-gray-700">Ou mensagem personalizada</label>
                  <textarea rows={5} placeholder="Digite a mensagem..." className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all" />
                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                      Pré-visualizar
                    </button>
                    <button className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Enviar Agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
