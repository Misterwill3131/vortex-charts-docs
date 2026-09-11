"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  Sparkles,
  Menu,
  X,
  Home,
  Rocket,
  CandlestickChart,
  Layers,
  TrendingUp,
  Sliders,
  Gamepad2,
  BookOpen,
} from "lucide-react";

const MOBILE_LINKS = [
  { label: "Vue d'ensemble", href: "/", icon: Home },
  { label: "Démarrage Rapide", href: "/quickstart", icon: Rocket },
  { label: "VortexCandleChart", href: "/components/candle-chart", icon: CandlestickChart },
  { label: "VortexRangeChart", href: "/components/range-chart", icon: Layers },
  { label: "VortexConeChart", href: "/components/cone-chart", icon: TrendingUp },
  { label: "Contrôles & Gestes", href: "/components/controls", icon: Sliders },
  { label: "Playground Live", href: "/playground", icon: Gamepad2 },
  { label: "Référence API", href: "/api-reference", icon: BookOpen },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(160,200,230,0.1)] bg-[#020616]/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center font-black text-[#020616] text-lg shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-wider text-base text-white flex items-center gap-1.5">
              Vortex<span className="text-[#38bdf8]">LIB</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[rgba(56,189,248,0.15)] text-[#38bdf8] border border-[rgba(56,189,248,0.3)]">
                v0.3.0
              </span>
            </span>
            <span className="text-[11px] text-[#8290a5] font-mono">
              by VorteXbot.app
            </span>
          </div>
        </Link>

        {/* Action Links */}
        <div className="flex items-center gap-3">
          <Link
            href="/playground"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[rgba(56,189,248,0.1)] text-[#38bdf8] hover:bg-[rgba(56,189,248,0.2)] border border-[rgba(56,189,248,0.25)] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Playground Live
          </Link>
          <a
            href="https://github.com/Misterwill3131/vortex-charts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#9fb0c4] hover:text-white hover:bg-[rgba(160,200,230,0.05)] transition-colors"
            aria-label="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="hidden md:inline">GitHub</span>
            <ExternalLink className="w-3 h-3 text-[#8290a5]" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#9fb0c4] hover:text-white hover:bg-[rgba(160,200,230,0.08)] transition-colors"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[rgba(160,200,230,0.1)] bg-[#020616]/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {MOBILE_LINKS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[rgba(56,189,248,0.15)] text-[#38bdf8] font-bold border border-[rgba(56,189,248,0.25)]"
                    : "text-[#9fb0c4] hover:text-white hover:bg-[rgba(160,200,230,0.05)]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#38bdf8]" : "text-[#8290a5]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
