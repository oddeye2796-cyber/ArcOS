import React from 'react';
import {
  Layers,
  Calculator,
  Server,
  BookOpen,
  Building,
  CheckCircle2,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { NavRoute } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface SidebarProps {
  currentRoute: NavRoute;
  onRouteChange: (route: NavRoute) => void;
  cartCount: number;
  installedCount: number;
  tenantName: string;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onRouteChange,
  cartCount,
  installedCount,
  tenantName,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  const navItems = [
    {
      id: 'catalog' as NavRoute,
      label: t.navMarketplace,
      sublabel: t.navMarketplaceSub,
      icon: Layers,
      badge: null
    },
    {
      id: 'quote' as NavRoute,
      label: t.navQuote,
      sublabel: t.navQuoteSub,
      icon: Calculator,
      badge: cartCount > 0 ? `${cartCount}${t.navItemsCount}` : null,
      badgeHighlight: true
    },
    {
      id: 'workspace' as NavRoute,
      label: t.navWorkspace,
      sublabel: t.navWorkspaceSub,
      icon: Server,
      badge: `${installedCount} ${t.navActiveCount}`,
      badgeHighlight: false
    },
    {
      id: 'patches' as NavRoute,
      label: t.navPatchNotes,
      sublabel: t.navPatchNotesSub,
      icon: ShieldCheck,
      badge: t.navZeroDowntimeBadge,
      badgeHighlight: false
    },
    {
      id: 'architecture' as NavRoute,
      label: t.navArchitecture,
      sublabel: t.navArchitectureSub,
      icon: BookOpen,
      badge: t.navWhitepaperBadge
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 min-h-screen border-r border-slate-800">
      {/* Brand */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white tracking-tight text-base">{t.brandName}</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                {t.hybridBadge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{t.brandTagline}</p>
          </div>
        </div>

        {/* Current Tenant Card */}
        <div className="mt-4 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium break-keep">{t.connectedTenantLabel}</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> {t.normalStatus}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-slate-100 font-medium text-xs">
            <Building className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="truncate">{tenantName}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-3 space-y-1 flex-1">
        <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Platform Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onRouteChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all text-sm ${
                isActive
                  ? 'bg-blue-700 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                <div className="min-w-0 text-left">
                  <div className="truncate text-xs font-medium">{item.label}</div>
                  <div
                    className={`text-[10.5px] truncate ${
                      isActive ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ml-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-800 text-white'
                      : item.badgeHighlight
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer: Version Support Rule & Deploy Window */}
      <div className="p-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-300 break-keep">{t.runtimePolicyLabel}</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono whitespace-nowrap">
            {t.runtimePolicyRule}
          </span>
        </div>
        <p className="text-slate-400 text-[10.5px] leading-relaxed break-keep">
          {t.runtimePolicyDesc}
        </p>
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
          <span>{t.partnerSupport}</span>
        </div>
      </div>
    </aside>
  );
};

