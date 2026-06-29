import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR").format(d);
}

export function formatDatetime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(d);
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, "");
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
}

export function formatCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, "");
  return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
}

export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, "");
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
}

export function calculateAge(birthDate: Date | string): number {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Abaixo do peso";
  if (bmi < 25) return "Peso normal";
  if (bmi < 30) return "Sobrepeso";
  if (bmi < 35) return "Obesidade Grau I";
  if (bmi < 40) return "Obesidade Grau II";
  return "Obesidade Grau III";
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "text-green-500",
    inactive: "text-gray-400",
    scheduled: "text-blue-500",
    confirmed: "text-green-500",
    in_progress: "text-yellow-500",
    completed: "text-green-600",
    missed: "text-red-500",
    canceled: "text-red-400",
    pending: "text-yellow-500",
    paid: "text-green-500",
    overdue: "text-red-500",
    expired: "text-orange-500",
  };
  return colors[status] || "text-gray-500";
}

export function getStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
    scheduled: "bg-blue-100 text-blue-700",
    confirmed: "bg-emerald-100 text-emerald-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    missed: "bg-red-100 text-red-700",
    canceled: "bg-red-50 text-red-500",
    pending: "bg-amber-100 text-amber-700",
    paid: "bg-green-100 text-green-700",
    overdue: "bg-red-100 text-red-700",
    expired: "bg-orange-100 text-orange-700",
  };
  return colors[status] || "bg-gray-100 text-gray-600";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: "Ativo",
    inactive: "Inativo",
    scheduled: "Agendado",
    confirmed: "Confirmado",
    in_progress: "Em Atendimento",
    completed: "Concluído",
    missed: "Falta",
    canceled: "Cancelado",
    pending: "Pendente",
    paid: "Pago",
    overdue: "Vencido",
    expired: "Expirado",
    open: "Aberto",
    closed: "Fechado",
    draft: "Rascunho",
    sent: "Enviado",
    signed: "Assinado",
    accepted: "Aceito",
    rejected: "Recusado",
  };
  return labels[status] || status;
}

export function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    pix: "PIX",
    cash: "Dinheiro",
    credit_card: "Cartão de Crédito",
    debit_card: "Cartão de Débito",
    transfer: "Transferência",
    boleto: "Boleto",
    installment: "Crediário",
    digital_wallet: "Carteira Digital",
    multiple: "Múltiplas Formas",
  };
  return labels[method] || method;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function isBirthday(birthDate: Date | string): boolean {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  const today = new Date();
  return birth.getMonth() === today.getMonth() && birth.getDate() === today.getDate();
}

export function isUpcomingBirthday(birthDate: Date | string, days: number = 7): boolean {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  const today = new Date();
  const upcoming = new Date(today);
  upcoming.setDate(today.getDate() + days);

  const birthThisYear = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

  return birthThisYear >= today && birthThisYear <= upcoming;
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
