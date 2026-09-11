"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Rocket,
  CandlestickChart,
  Layers,
  TrendingUp,
  Sliders,
  Gamepad2,
  BookOpen,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: { title: string; items: NavItem[] }[] = [
  {
    title: "Guide",
    items: [
      { label: "Vue d'ensemble", href: "/", icon: Home },
      { label: "Démarrage Rapide", href: "/quickstart", icon: Rocket },
    ],
  },
  {
    title: "Composants",
    items: [
      { label: "VortexCandleChart", href: "/components/candle-chart", icon: CandlestickChart },
      { label: "VortexRangeChart", href: "/components/range-chart", icon: Layers },
      { label: "VortexConeChart", href: "/components/cone-chart", icon: TrendingUp },
      { label: "Contrôles & Gestes", href: "/components/controls", icon: Sliders, badge: "v0.3.0" },
    ],
  },
  {
    title: "Outils & Référence",
    items: [
      { label: "Playground Live", href: "/playground", icon: Gamepad2, badge: "Interactif" },
      { label: "Référence API", href: "/api-reference", icon: BookOpen },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-[rgba(160,200,230,0.1)] bg-[#020616]/60 backdrop-blur-sm min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        {NAV_ITEMS.map((section) => (
          <div key={section.title} className="space-y-1.5">
            <h3 className="px-3 text-[11px] font-mono uppercase tracking-wider text-[#8290a5]">
              {section.title}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[rgba(56,189,248,0.15)] text-[#38bdf8] font-semibold border border-[rgba(56,189,248,0.25)] shadow-[0_0_10px_rgba(56,189,248,0.1)]"
                        : "text-[#9fb0c4] hover:text-white hover:bg-[rgba(160,200,230,0.05)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#38bdf8]" : "text-[#8290a5]"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                        isActive
                          ? "bg-[#38bdf8] text-[#020616] font-bold"
                          : "bg-[rgba(56,189,248,0.1)] text-[#38bdf8] border border-[rgba(56,189,248,0.2)]"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Watermark badge */}
      <div className="p-3 rounded-xl border border-[rgba(160,200,230,0.08)] bg-[rgba(10,20,40,0.4)] text-center">
        <div className="text-xs font-bold text-white tracking-wider">
          VorteX<span className="text-[#38bdf8]">bot.app</span>
        </div>
        <p className="text-[10px] text-[#8290a5] mt-1">
          Moteur graphique Canvas 2D propriétaire 60 FPS
        </p>
      </div>
    </aside>
  );
};
