import React from "react";
import { CodeBlock } from "../../components/CodeBlock";
import { Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function QuickstartPage() {
  return (
    <div className="space-y-12 max-w-4xl">
      {/* Title */}
      <div className="space-y-2 border-b border-[rgba(160,200,230,0.1)] pb-6">
        <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-semibold">
          Guide de Démarrage
        </span>
        <h1 className="text-3xl font-extrabold text-white">
          Installer et Intégrer VortexLIB
        </h1>
        <p className="text-sm text-[#9fb0c4]">
          Suivez ces étapes simples pour ajouter les graphiques VortexLIB à votre application en moins de 3 minutes.
        </p>
      </div>

      {/* Étape 1 : Installation */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center font-mono font-bold text-xs text-[#38bdf8]">
            1
          </div>
          <h2 className="text-lg font-bold text-white">Installer le package</h2>
        </div>
        <p className="text-xs text-[#9fb0c4] leading-relaxed">
          Le package est distribué directement via le dépôt GitHub de l'organisation VorteX :
        </p>
        <CodeBlock
          code="npm install github:Misterwill3131/vortex-charts#main"
          language="bash"
          filename="Terminal"
        />
        <div className="p-3 rounded-xl border border-[rgba(56,189,248,0.15)] bg-[rgba(56,189,248,0.03)] text-xs text-[#9fb0c4] flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Peer Dependencies requises :</strong> Assurez-vous d'avoir <code className="text-[#38bdf8] font-mono">react ^18 ou ^19</code>, <code className="text-[#38bdf8] font-mono">react-dom</code> et <code className="text-[#38bdf8] font-mono">lucide-react</code> installés dans votre projet hôte.
          </span>
        </div>
      </section>

      {/* Étape 2 : Exemple Hello World */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center font-mono font-bold text-xs text-[#38bdf8]">
            2
          </div>
          <h2 className="text-lg font-bold text-white">Exemple Chandelier Minimal (Hello World)</h2>
        </div>
        <p className="text-xs text-[#9fb0c4] leading-relaxed">
          Créez un composant client simple et passez-lui un tableau de bougies standard :
        </p>

        <CodeBlock
          code={`"use client";

import React from "react";
import { VortexCandleChart, type Candle } from "vortex-charts";

const sampleData: Candle[] = [
  { t: 1718000000, open: 575.2, high: 578.4, low: 574.1, close: 577.8, volume: 540000 },
  { t: 1718003600, open: 577.8, high: 580.1, low: 576.9, close: 579.5, volume: 620000 },
  { t: 1718007200, open: 579.5, high: 582.0, low: 578.8, close: 581.4, volume: 810000 },
];

export default function MyChartPage() {
  return (
    <div className="w-full max-w-4xl p-6 bg-[#020616] rounded-2xl border border-[rgba(160,200,230,0.1)]">
      <h2 className="text-lg font-bold text-white mb-4">SPY — Analyse Technique</h2>
      <VortexCandleChart
        candles={sampleData}
        spotPrice={581.4}
        swingHigh={585.0}
        swingLow={573.0}
        height={320}
        showControls={true}
        showWatermark={true}
      />
    </div>
  );
}`}
          language="tsx"
          filename="src/components/MyChart.tsx"
        />
      </section>

      {/* Étape 3 : Interactions intégrées */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center font-mono font-bold text-xs text-[#38bdf8]">
            3
          </div>
          <h2 className="text-lg font-bold text-white">Contrôles & Raccourcis Utilisateur</h2>
        </div>
        <p className="text-xs text-[#9fb0c4] leading-relaxed">
          Dès que <code className="text-[#38bdf8] font-mono">showControls=&#123;true&#125;</code> est activé, l'utilisateur bénéficie des gestes suivants :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-[rgba(160,200,230,0.08)] bg-[#04091e] space-y-1">
            <span className="font-mono font-bold text-[#38bdf8]">Molette de la souris</span>
            <p className="text-[#9fb0c4]">Zoom avant / arrière continu centré sur le curseur.</p>
          </div>
          <div className="p-3 rounded-lg border border-[rgba(160,200,230,0.08)] bg-[#04091e] space-y-1">
            <span className="font-mono font-bold text-[#38bdf8]">Clic gauche + Glisser</span>
            <p className="text-[#9fb0c4]">Déplacement panoramique (Pan) horizontal à travers l'historique.</p>
          </div>
          <div className="p-3 rounded-lg border border-[rgba(160,200,230,0.08)] bg-[#04091e] space-y-1">
            <span className="font-mono font-bold text-[#38bdf8]">Shift + Clic & Glisser</span>
            <p className="text-[#9fb0c4]">Active la règle de mesure (calcul delta prix $, % et barres).</p>
          </div>
          <div className="p-3 rounded-lg border border-[rgba(160,200,230,0.08)] bg-[#04091e] space-y-1">
            <span className="font-mono font-bold text-[#38bdf8]">Double-clic (ou bouton Fit)</span>
            <p className="text-[#9fb0c4]">Réinitialise le zoom à 1.0x pour afficher l'ensemble des données.</p>
          </div>
        </div>
      </section>

      {/* Prochaines étapes */}
      <div className="pt-6 border-t border-[rgba(160,200,230,0.1)] flex items-center justify-between">
        <Link
          href="/components/candle-chart"
          className="flex items-center gap-2 text-xs font-semibold text-[#38bdf8] hover:underline"
        >
          <span>Continuer vers VortexCandleChart</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/playground"
          className="text-xs text-[#8290a5] hover:text-white"
        >
          Ouvrir le Playground ?
        </Link>
      </div>
    </div>
  );
}
