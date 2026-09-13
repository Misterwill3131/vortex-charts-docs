import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Move,
  Palette,
  CandlestickChart,
  Layers,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";

export default function HomePage() {
  return (
    <div className="space-y-16 max-w-5xl">
      {/* Hero Section */}
      <section className="relative pt-4 pb-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(56,189,248,0.1)] border border-[rgba(56,189,248,0.25)] text-xs font-mono text-[#38bdf8]">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          <span>VortexLIB v0.8.0 disponible</span>
          <span className="text-[#8290a5]">•</span>
          <span className="text-white font-semibold">100% Canvas 2D Propriétaire</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          La Bibliothèque Graphique Financière{" "}
          <span className="bg-gradient-to-r from-[#38bdf8] via-[#5fd9e6] to-[#38bdf8] bg-clip-text text-transparent">
            Ultra-Rapide & Sur-Mesure
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#9fb0c4] max-w-2xl leading-relaxed">
          Conçue sur-mesure pour <strong className="text-white">VorteXbot.app</strong>. 
          Remplace 100% des dépendances tierces lourdes comme TradingView par un moteur 
          Canvas 2D fluide à 60 FPS doté de zoom continu, déplacement panoramique, 
          règle de mesure et filigrane officiel intégré.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/quickstart"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-[#020616] font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            Démarrage Rapide
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/playground"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(56,189,248,0.3)] bg-[rgba(56,189,248,0.08)] text-[#38bdf8] font-semibold text-sm hover:bg-[rgba(56,189,248,0.15)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Playground Live
          </Link>
          <Link
            href="/components/candle-chart"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(160,200,230,0.12)] bg-[rgba(10,20,40,0.5)] text-[#9fb0c4] hover:text-white font-medium text-sm hover:border-[rgba(160,200,230,0.25)] transition-all"
          >
            Voir les Composants
          </Link>
        </div>
      </section>

      {/* 4 Piliers */}
      <section className="space-y-6">
        <div className="border-b border-[rgba(160,200,230,0.1)] pb-3">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Pourquoi VortexLIB ?
          </h2>
          <p className="text-xs text-[#8290a5] mt-1">
            Les fondations architecturales pensées pour l'environnement quantitatif de VorteX.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[rgba(10,20,40,0.4)] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">0% Dépendance TradingView</h3>
            <p className="text-xs text-[#9fb0c4] leading-relaxed">
              Totalement libéré des bibliothèques externes propriétaires (lightweight-charts). 
              Zéro watermark tiers, zéro contrainte de licence, code 100% contrôlé en interne.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[rgba(10,20,40,0.4)] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Canvas 2D Ultra-Fluide 60 FPS</h3>
            <p className="text-xs text-[#9fb0c4] leading-relaxed">
              Moteur de rendu mathématique vectoriel sur Canvas 2D natif avec gestion automatique 
              du ratio Retina HiDPI (`devicePixelRatio`) et ResizeObserver réactif.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[rgba(10,20,40,0.4)] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Move className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Suite Interactive Complète</h3>
            <p className="text-xs text-[#9fb0c4] leading-relaxed">
              Zoom à la molette, pan par glissement de souris, outil de règle de mesure (prix %, 
              points, nb de barres), auto-scaling automatique de l'axe Y et bouton Fit/Reset.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[rgba(10,20,40,0.4)] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Identité Visuelle VorteX</h3>
            <p className="text-xs text-[#9fb0c4] leading-relaxed">
              Palette sombre (`#020616`), touches néon cyan (`#38bdf8`), bougies émeraude/rose, 
              survol réticulaire et filigrane officiel <strong className="text-white">VorteXbot.app</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Grille des 3 Modèles Graphiques */}
      <section className="space-y-6">
        <div className="border-b border-[rgba(160,200,230,0.1)] pb-3">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Les Composants Phares
          </h2>
          <p className="text-xs text-[#8290a5] mt-1">
            Trois architectures visuelles spécialisées pour l'analyse technique et les options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Candle Chart Card */}
          <Link
            href="/components/candle-chart"
            className="group rounded-xl border border-[rgba(160,200,230,0.12)] bg-[#04091e] overflow-hidden hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-[#020616] overflow-hidden">
              <img
                src="/images/candle-chart-default.png"
                alt="VortexCandleChart"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#020616]/80 text-[#38bdf8] border border-[#38bdf8]/30">
                OHLCV + Niveaux
              </div>
            </div>
            <div className="p-4 space-y-2 border-t border-[rgba(160,200,230,0.08)] flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <CandlestickChart className="w-4 h-4 text-[#38bdf8]" />
                  VortexCandleChart
                </h3>
                <p className="text-xs text-[#9fb0c4] mt-1 leading-relaxed">
                  Chandelier japonais avec niveaux de cassure 20 séances (Swing High/Low), 
                  Spot Price, ATR bounds et infobulle enrichie.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#38bdf8] pt-3">
                <span>Voir la documentation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Range Chart Card */}
          <Link
            href="/components/range-chart"
            className="group rounded-xl border border-[rgba(160,200,230,0.12)] bg-[#04091e] overflow-hidden hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-[#020616] overflow-hidden">
              <img
                src="/images/range-chart-default.png"
                alt="VortexRangeChart"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#020616]/80 text-emerald-400 border border-emerald-400/30">
                Sessions + VWAP
              </div>
            </div>
            <div className="p-4 space-y-2 border-t border-[rgba(160,200,230,0.08)] flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  VortexRangeChart
                </h3>
                <p className="text-xs text-[#9fb0c4] mt-1 leading-relaxed">
                  Graphique intraday avec boîtes de session Prior-Day et Premarket, 
                  courbe VWAP continue et sélecteur de calques d'affichage.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#38bdf8] pt-3">
                <span>Voir la documentation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Cone Chart Card */}
          <Link
            href="/components/cone-chart"
            className="group rounded-xl border border-[rgba(160,200,230,0.12)] bg-[#04091e] overflow-hidden hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-[#020616] overflow-hidden">
              <img
                src="/images/cone-chart-default.png"
                alt="VortexConeChart"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#020616]/80 text-purple-400 border border-purple-400/30">
                Options Expected Move
              </div>
            </div>
            <div className="p-4 space-y-2 border-t border-[rgba(160,200,230,0.08)] flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  VortexConeChart
                </h3>
                <p className="text-xs text-[#9fb0c4] mt-1 leading-relaxed">
                  Cône forward d'incertitude et Expected Move d'options projetant les fourchettes 
                  jusqu'à la date d'expiration (DTE).
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#38bdf8] pt-3">
                <span>Voir la documentation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Install Section */}
      <section className="space-y-4">
        <div className="border-b border-[rgba(160,200,230,0.1)] pb-3">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Installation en 1 Commande
          </h2>
          <p className="text-xs text-[#8290a5] mt-1">
            Ajoutez VortexLIB directement à votre projet Next.js ou React.
          </p>
        </div>

        <CodeBlock
          code="npm install github:Misterwill3131/vortex-charts#main"
          language="bash"
          filename="Terminal"
        />
      </section>
    </div>
  );
}
