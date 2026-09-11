"use client";

import React, { useState } from "react";
import { VortexRangeChart } from "vortex-charts";
import {
  INTRADAY_CANDLES,
  SAMPLE_PRIOR_DAY,
  SAMPLE_PREMARKET,
  SAMPLE_VWAP_SERIES,
} from "../../../data/sample-range-data";
import { RANGE_CHART_PROPS } from "../../../lib/props-registry";
import { InteractiveDemo } from "../../../components/InteractiveDemo";
import { ImageGallery, type GalleryItem } from "../../../components/ImageGallery";
import { PropsTable } from "../../../components/PropsTable";
import { CodeBlock } from "../../../components/CodeBlock";
import { Layers, Sliders } from "lucide-react";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Boîtes de Session & Courbe VWAP",
    description: "Zones colorées Prior-Day (veille), Premarket (matin) et courbe continue VWAP (cyan) avec indicateur de biais.",
    src: "/images/range-chart-default.png",
    tag: "Sessions & VWAP",
  },
];

const CODE_EXAMPLE = `import React, { useState } from "react";
import { VortexRangeChart, type Candle, type PriorDayRange, type PremarketRange, type VwapPoint } from "vortex-charts";

export const IntradayRangeView = ({
  candles,
  priorDay,
  premarket,
  vwapSeries,
}: {
  candles: Candle[];
  priorDay: PriorDayRange;
  premarket: PremarketRange;
  vwapSeries: VwapPoint[];
}) => {
  const [overlayMode, setOverlayMode] = useState<"all" | "boxes" | "vwap" | "none">("all");

  return (
    <div className="w-full bg-[#020616] p-4 rounded-xl border border-[rgba(160,200,230,0.1)] space-y-4">
      <div className="flex gap-2">
        {(["all", "boxes", "vwap", "none"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setOverlayMode(mode)}
            className={\`px-3 py-1 rounded text-xs font-mono \${
              overlayMode === mode ? "bg-[#38bdf8] text-black font-bold" : "bg-[rgba(160,200,230,0.1)] text-[#9fb0c4]"
            }\`}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>

      <VortexRangeChart
        candles={candles}
        priorDay={priorDay}
        premarket={premarket}
        vwapSeries={vwapSeries}
        overlayMode={overlayMode}
        height={320}
        showControls={true}
        showWatermark={true}
      />
    </div>
  );
};`;

export default function RangeChartDocPage() {
  const [overlayMode, setOverlayMode] = useState<"all" | "boxes" | "vwap" | "none">("all");

  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div className="space-y-2 border-b border-[rgba(160,200,230,0.1)] pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            Composant
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          &lt;VortexRangeChart /&gt;
        </h1>
        <p className="text-sm text-[#9fb0c4]">
          Graphique de session intraday avec affichage vectoriel des boîtes de négociation (Prior-Day, Premarket), 
          traçage du VWAP continu et sélecteur dynamique de calques d'affichage.
        </p>
      </div>

      {/* 1. Démo Live Interactive */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">1. Démo Interactive en Direct</h2>
          {/* Overlay Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#04091e] border border-[rgba(160,200,230,0.12)]">
            <Sliders className="w-3.5 h-3.5 text-[#8290a5] ml-1.5 mr-1" />
            <span className="text-[11px] text-[#8290a5] font-mono mr-1">Calques :</span>
            {(["all", "boxes", "vwap", "none"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setOverlayMode(mode)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                  overlayMode === mode
                    ? "bg-[#38bdf8] text-[#020616] font-bold shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                    : "text-[#9fb0c4] hover:text-white hover:bg-[rgba(160,200,230,0.06)]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <InteractiveDemo
          title="VortexRangeChart — Intraday SPY (5 min)"
          description="Boîtes Prior-Day et Premarket avec courbe VWAP superposée."
          code={CODE_EXAMPLE}
        >
          <div className="w-full">
            <VortexRangeChart
              candles={INTRADAY_CANDLES}
              priorDay={SAMPLE_PRIOR_DAY}
              premarket={SAMPLE_PREMARKET}
              vwapSeries={SAMPLE_VWAP_SERIES}
              overlayMode={overlayMode}
              height={340}
              showControls={true}
              showWatermark={true}
            />
          </div>
        </InteractiveDemo>
      </section>

      {/* 2. Galerie Visuelle */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Aperçu Visuel des Sessions</h2>
        <ImageGallery items={GALLERY_ITEMS} />
      </section>

      {/* 3. Guide Métier Intraday */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Les Piliers de Session Intraday</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-emerald-400">Prior-Day Session Box</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              Zone englobant le High, le Low et le Mid de la séance précédente (Regular Trading Hours). Permet de repérer instantanément si la journée ouvre au-dessus ou en-dessous de la valeur établie.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-[#38bdf8]">Premarket Range Box</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              Fourchette des cours négociés entre 04:00 et 09:30 EST. Indique la pression acheteuse/vendeuse avant la cloche d'ouverture officielle.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-cyan-400">Courbe VWAP</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              Prix moyen pondéré par les volumes. La position du cours par rapport au VWAP constitue le premier filtre directionnel algorithmique de VorteX.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Table des Props */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Référence des Props</h2>
        <PropsTable props={RANGE_CHART_PROPS} />
      </section>

      {/* 5. Code d'Intégration */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Exemple d'Intégration</h2>
        <CodeBlock code={CODE_EXAMPLE} language="tsx" filename="components/IntradayRangeView.tsx" />
      </section>
    </div>
  );
}
