// ==========================================
// TIPOS PRINCIPAIS DO SISTEMA AC BEAUTY CLINIC
// ==========================================

export type UserRole = "admin" | "recepcao" | "financeiro" | "esteticista" | "gerente";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  active: boolean;
  createdAt: Date;
}

// ==========================================
// CLIENTE
// ==========================================
export interface Client {
  id: string;
  photo?: string;
  name: string;
  cpf: string;
  rg?: string;
  gender: "M" | "F" | "O";
  birthDate: Date;
  maritalStatus?: string;
  profession?: string;
  address: Address;
  phone: string;
  whatsapp: string;
  email?: string;
  instagram?: string;
  referral?: string;
  healthPlan?: string;
  notes?: string;
  registrationDate: Date;
  status: "active" | "inactive";
  responsibleName?: string;
  responsibleCpf?: string;
  responsiblePhone?: string;
  tags?: string[];
  loyaltyPoints: number;
  cashbackBalance: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

// ==========================================
// ANAMNESE
// ==========================================
export interface Anamnese {
  id: string;
  clientId: string;
  date: Date;
  mainComplaint: string;
  treatmentGoal: string;
  estheticHistory: string;
  medicalHistory: MedicalHistory;
  lifestyle: Lifestyle;
  measurements: Measurements;
  treatmentPlan?: string;
  clinicalEvolution?: string;
  contraindications?: string;
  clientSignature?: string;
  professionalSignature?: string;
  professionalId: string;
}

export interface MedicalHistory {
  diseases: string[];
  surgeries: string;
  allergies: string;
  medications: string;
  pregnant: boolean;
  breastfeeding: boolean;
  pacemaker: boolean;
  hypertension: boolean;
  diabetes: boolean;
  hormonalProblems: boolean;
  circulatoryProblems: boolean;
  dermatologicalProblems: boolean;
  cancer: boolean;
  epilepsy: boolean;
  varicoseVeins: boolean;
  observations?: string;
}

export interface Lifestyle {
  smoking: boolean;
  alcohol: boolean;
  sleepQuality: "good" | "regular" | "bad";
  stressLevel: "low" | "medium" | "high";
  diet: string;
  waterConsumption: string;
  physicalActivity: string;
}

export interface Measurements {
  weight: number;
  height: number;
  bmi?: number;
  bloodPressure?: string;
  observations?: string;
}

// ==========================================
// SERVIÇOS
// ==========================================
export interface Service {
  id: string;
  name: string;
  category: string;
  description?: string;
  duration: number; // em minutos
  price: number;
  commission: number; // percentual
  professionalIds: string[];
  equipmentIds?: string[];
  productIds?: string[];
  notes?: string;
  active: boolean;
  image?: string;
  color?: string;
  costBreakdown?: CostBreakdown;
}

export interface CostBreakdown {
  products: CostItem[];
  disposables: CostItem[];
  equipment: number;
  energy: number;
  water: number;
  professionalTime: number;
  indirectCosts: number;
  taxes: number;
  desiredMargin: number;
  minimumPrice: number;
  idealPrice: number;
  suggestedPrice: number;
}

export interface CostItem {
  name: string;
  quantity: number;
  unitPrice: number;
  technicalLoss?: number;
  total: number;
}

// ==========================================
// PACOTES
// ==========================================
export interface Package {
  id: string;
  name: string;
  description?: string;
  sessions: number;
  validityDays: number;
  services: PackageService[];
  discount: number;
  price: number;
  maxInstallments: number;
  notes?: string;
  image?: string;
  active: boolean;
}

export interface PackageService {
  serviceId: string;
  serviceName: string;
  sessions: number;
}

// ==========================================
// VENDA / PACOTE DE CLIENTE
// ==========================================
export interface ClientPackage {
  id: string;
  clientId: string;
  packageId: string;
  packageName: string;
  totalSessions: number;
  completedSessions: number;
  remainingSessions: number;
  canceledSessions: number;
  missedSessions: number;
  purchaseDate: Date;
  expirationDate: Date;
  status: "active" | "expired" | "completed" | "canceled";
  totalValue: number;
  paidValue: number;
  sessions: SessionRecord[];
}

export interface SessionRecord {
  id: string;
  date: Date;
  professionalId: string;
  professionalName: string;
  serviceId: string;
  serviceName: string;
  status: "completed" | "missed" | "canceled" | "replacement";
  notes?: string;
  photos?: string[];
  evolution?: string;
}

// ==========================================
// AGENDA / AGENDAMENTOS
// ==========================================
export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  professionalId: string;
  professionalName: string;
  serviceId: string;
  serviceName: string;
  roomId?: string;
  packageId?: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "missed" | "canceled";
  color?: string;
  notes?: string;
  reminderSent: boolean;
  confirmationSent: boolean;
  recurrence?: RecurrenceConfig;
  isRecurring?: boolean;
  parentAppointmentId?: string;
}

export interface RecurrenceConfig {
  type: "weekly" | "biweekly" | "monthly";
  endDate?: Date;
  occurrences?: number;
}

export interface BlockedTime {
  id: string;
  professionalId: string;
  date: Date;
  startTime: string;
  endTime: string;
  reason: string;
}

// ==========================================
// PROFISSIONAIS
// ==========================================
export interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  photo?: string;
  role: string;
  specialties: string[];
  commissionType: "percentage" | "fixed";
  commissionValue: number;
  active: boolean;
  schedule: WorkSchedule;
  color: string;
  notes?: string;
}

export interface WorkSchedule {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

// ==========================================
// FINANCEIRO
// ==========================================
export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  subcategory?: string;
  description: string;
  clientId?: string;
  supplierId?: string;
  appointmentId?: string;
  packageId?: string;
  amount: number;
  dueDate: Date;
  paymentDate?: Date;
  status: "pending" | "paid" | "overdue" | "canceled";
  paymentMethod?: PaymentMethod;
  installments?: number;
  currentInstallment?: number;
  parentTransactionId?: string;
  notes?: string;
  attachments?: string[];
  costCenter?: string;
  discount?: number;
  interest?: number;
  fine?: number;
}

export type PaymentMethod =
  | "pix"
  | "cash"
  | "credit_card"
  | "debit_card"
  | "transfer"
  | "boleto"
  | "installment"
  | "digital_wallet"
  | "multiple";

export interface CashFlow {
  date: Date;
  openingBalance: number;
  incomes: number;
  expenses: number;
  closingBalance: number;
  transactions: Transaction[];
}

export interface DailyCash {
  id: string;
  date: Date;
  openedBy: string;
  openingAmount: number;
  closedBy?: string;
  closingAmount?: number;
  expectedAmount?: number;
  difference?: number;
  status: "open" | "closed";
  withdrawals: Withdrawal[];
  additions: Addition[];
}

export interface Withdrawal {
  id: string;
  amount: number;
  reason: string;
  responsibleId: string;
  date: Date;
}

export interface Addition {
  id: string;
  amount: number;
  reason: string;
  responsibleId: string;
  date: Date;
}

// ==========================================
// ESTOQUE
// ==========================================
export interface Product {
  id: string;
  name: string;
  category: "cosmetic" | "material" | "disposable" | "equipment";
  description?: string;
  barcode?: string;
  supplierId?: string;
  unitPrice: number;
  salePrice?: number;
  quantity: number;
  minQuantity: number;
  unit: string;
  batch?: string;
  expirationDate?: Date;
  active: boolean;
  image?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: "in" | "out" | "adjustment";
  quantity: number;
  reason: string;
  appointmentId?: string;
  clientId?: string;
  date: Date;
  responsibleId: string;
  unitPrice?: number;
  totalValue?: number;
  notes?: string;
}

// ==========================================
// FORNECEDORES
// ==========================================
export interface Supplier {
  id: string;
  name: string;
  fantasyName?: string;
  cnpj?: string;
  cpf?: string;
  email?: string;
  phone: string;
  whatsapp?: string;
  address?: Address;
  contacts: SupplierContact[];
  paymentTerms?: string;
  notes?: string;
  active: boolean;
  category?: string;
}

export interface SupplierContact {
  name: string;
  role: string;
  phone: string;
  email?: string;
}

// ==========================================
// SALA / EQUIPAMENTO
// ==========================================
export interface Room {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  equipmentIds?: string[];
  active: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate?: Date;
  warrantyExpiration?: Date;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  status: "operational" | "maintenance" | "inactive";
  location?: string;
  notes?: string;
  documents?: string[];
}

// ==========================================
// ORÇAMENTO / CONTRATO
// ==========================================
export interface Quote {
  id: string;
  clientId: string;
  clientName: string;
  items: QuoteItem[];
  subtotal: number;
  discount: number;
  total: number;
  validUntil: Date;
  status: "pending" | "accepted" | "rejected" | "expired";
  notes?: string;
  createdAt: Date;
  createdBy: string;
}

export interface QuoteItem {
  serviceId?: string;
  packageId?: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  total: number;
}

export interface Contract {
  id: string;
  type: "treatment" | "package" | "consent" | "lgpd" | "image_authorization";
  clientId: string;
  templateId: string;
  content: string;
  status: "draft" | "sent" | "signed" | "expired";
  clientSignature?: string;
  professionalSignature?: string;
  signedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
}

// ==========================================
// NPS / SATISFAÇÃO
// ==========================================
export interface NPS {
  id: string;
  clientId: string;
  appointmentId?: string;
  score: number; // 0-10
  comment?: string;
  date: Date;
  category?: string;
}

// ==========================================
// FIDELIDADE
// ==========================================
export interface LoyaltyConfig {
  pointsPerReal: number;
  redemptionRate: number; // pontos por real de desconto
  expirationDays: number;
  levels: LoyaltyLevel[];
}

export interface LoyaltyLevel {
  name: string;
  minPoints: number;
  benefits: string[];
  color: string;
}

// ==========================================
// AUDITORIA
// ==========================================
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  recordId: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  ip: string;
  userAgent: string;
  timestamp: Date;
}

// ==========================================
// CONFIGURAÇÕES
// ==========================================
export interface ClinicConfig {
  name: string;
  fantasyName: string;
  cnpj: string;
  responsibleName: string;
  responsibleCpf: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook?: string;
  website?: string;
  address: Address;
  logo?: string;
  theme: ThemeConfig;
  workingHours: WorkSchedule;
  appointmentInterval: number;
  cancelationPolicy: string;
  lgpdText: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  darkMode: boolean;
  accentColor: string;
}

// ==========================================
// DASHBOARD / KPIs
// ==========================================
export interface DashboardData {
  financial: FinancialSummary;
  clients: ClientSummary;
  appointments: AppointmentSummary;
  services: ServiceSummary;
  professionals: ProfessionalSummary;
}

export interface FinancialSummary {
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  profit: number;
  expenses: number;
  accountsPayable: number;
  overduePayable: number;
  accountsReceivable: number;
  cashFlow: number;
  averageTicket: number;
}

export interface ClientSummary {
  total: number;
  active: number;
  inactive: number;
  newThisMonth: number;
  recurring: number;
  returnRate: number;
  birthdays: Client[];
}

export interface AppointmentSummary {
  today: number;
  upcoming: Appointment[];
  inProgress: number;
  absenceRate: number;
  cancellations: number;
  completed: number;
}

export interface ServiceSummary {
  topSelling: TopItem[];
  mostProfitable: TopItem[];
  mostUsedProducts: TopItem[];
  packagesExpiring: ClientPackage[];
}

export interface ProfessionalSummary {
  ranking: ProfessionalRank[];
}

export interface TopItem {
  id: string;
  name: string;
  count: number;
  revenue?: number;
}

export interface ProfessionalRank {
  professionalId: string;
  professionalName: string;
  appointments: number;
  revenue: number;
  commission: number;
}

// ==========================================
// PHOTO GALLERY
// ==========================================
export interface ClientPhoto {
  id: string;
  clientId: string;
  treatmentId?: string;
  treatmentName?: string;
  type: "before" | "during" | "after";
  url: string;
  thumbnail?: string;
  date: Date;
  sessionNumber?: number;
  notes?: string;
  watermarked?: boolean;
}
