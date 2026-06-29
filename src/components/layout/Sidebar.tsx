"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  MessageCircle,
  Scissors,
  UserCog,
  Sparkles,
  TrendingUp,
  FileText,
  ChevronRight,
  Star,
  Archive,
  Building2,
  X,
} from "lucide-react";

const navGroups = [
  {
    label: "Principal",
    items: [
      {
        href: "/dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
        badge: null,
      },
    ],
  },
  {
    label: "Atendimento",
    items: [
      {
        href: "/clientes",
        icon: Users,
        label: "Clientes",
        badge: null,
      },
      {
        href: "/agenda",
        icon: Calendar,
        label: "Agenda",
        badge: "6",
      },
      {
        href: "/servicos",
        icon: Scissors,
        label: "Serviços",
        badge: null,
      },
      {
        href: "/pacotes",
        icon: Package,
        label: "Pacotes",
        badge: null,
      },
    ],
  },
  {
    label: "Financeiro",
    items: [
      {
        href: "/financeiro",
        icon: DollarSign,
        label: "Financeiro",
        badge: "3",
      },
      {
        href: "/orcamentos",
        icon: FileText,
        label: "Orçamentos",
        badge: null,
      },
    ],
  },
  {
    label: "Operacional",
    items: [
      {
        href: "/profissionais",
        icon: UserCog,
        label: "Profissionais",
        badge: null,
      },
      {
        href: "/estoque",
        icon: Archive,
        label: "Estoque",
        badge: "2",
      },
      {
        href: "/fornecedores",
        icon: Building2,
        label: "Fornecedores",
        badge: null,
      },
    ],
  },
  {
    label: "Marketing",
    items: [
      {
        href: "/whatsapp",
        icon: MessageCircle,
        label: "WhatsApp",
        badge: null,
      },
      {
        href: "/fidelidade",
        icon: Star,
        label: "Fidelidade",
        badge: null,
      },
      {
        href: "/vendas",
        icon: ShoppingBag,
        label: "Vendas",
        badge: null,
      },
    ],
  },
  {
    label: "Relatórios",
    items: [
      {
        href: "/relatorios",
        icon: BarChart3,
        label: "Relatórios",
        badge: null,
      },
      {
        href: "/indicadores",
        icon: TrendingUp,
        label: "KPIs",
        badge: null,
      },
    ],
  },
  {
    label: "Sistema",
    items: [
      {
        href: "/configuracoes",
        icon: Settings,
        label: "Configurações",
        badge: null,
      },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ open, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-full bg-gray-950 border-r border-gray-800 transition-all duration-300 ease-in-out flex-shrink-0",
          open ? "w-64" : "w-16"
        )}
      >
        <SidebarContent open={open} pathname={pathname} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col w-72 bg-gray-950 border-r border-gray-800 transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)", boxShadow: "0 4px 15px rgba(201,168,76,0.3)" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm leading-none">AC Estética</h1>
              <p className="text-gray-400 text-xs">Facial e Corporal</p>
            </div>
          </div>
          <button
            onClick={onMobileClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <SidebarContent open={true} pathname={pathname} />
      </aside>
    </>
  );
}

function SidebarContent({
  open,
  pathname,
}: {
  open: boolean;
  pathname: string;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)", boxShadow: "0 4px 12px rgba(201,168,76,0.25)" }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {open && (
          <div className="min-w-0">
            <h1 className="text-white font-bold text-sm leading-none truncate">
              AC Estética
            </h1>
            <p className="text-gray-500 text-xs truncate">Facial e Corporal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {open && (
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5">
                {group.label}
              </p>
            )}
            {!open && <div className="h-1" />}
            {group.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!open ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 mx-2 rounded-xl transition-all duration-150 group relative",
                    isActive
                      ? "text-white shadow-md"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                  )}
                  style={isActive ? {
                    background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                    boxShadow: "0 4px 12px rgba(201,168,76,0.25)"
                  } : undefined}
                >
                  <Icon
                    className={cn(
                      "w-[18px] h-[18px] flex-shrink-0 transition-transform",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-200",
                      !open && "mx-auto"
                    )}
                  />
                  {open && (
                    <>
                      <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center",
                            isActive
                              ? "bg-white/20 text-white"
                              : "text-yellow-600"
                          )}
                          style={!isActive ? { backgroundColor: "rgba(201,168,76,0.15)" } : undefined}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed state */}
                  {!open && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-gray-700">
                      {item.label}
                      {item.badge && (
                        <span className="ml-1.5 text-white text-[10px] px-1 rounded-full" style={{ backgroundColor: "#C9A84C" }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-gray-800">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800 cursor-pointer transition-colors",
            !open && "justify-center"
          )}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-sm"
            style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)" }}
          >
            AC
          </div>
          {open && (
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-semibold truncate">Ana Claudia</p>
              <p className="text-gray-500 text-[10px] truncate">Administradora</p>
            </div>
          )}
        </div>
        {open && (
          <p className="text-gray-700 text-[9px] text-center mt-2 leading-tight">
            Desenvolvido por Felipe Augusto
          </p>
        )}
      </div>
    </div>
  );
}
