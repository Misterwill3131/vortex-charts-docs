"use client";

import React from "react";
import { VortexCandleChart } from "vortex-charts";
import {
  SPY_CANDLES,
  SPY_SWING_HIGH,
  SPY_SWING_LOW,
  SPY_SPOT_PRICE,
  SPY_ATR_BOUNDS,
  SPY_PRICE_LINES,
} from "../../../data/sample-candle-data";
import { CANDLE_CHART_PROPS } from "../../../lib/props-registry";
import { InteractiveDemo } from "../../../components/InteractiveDemo";
import { ImageGallery, type GalleryItem } from "../../../components/ImageGallery";
import { PropsTable } from "../../../components/PropsTable";
import { CodeBlock } from "../../../components/CodeBlock";
import { CandlestickChart } from "lucide-react";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Vue Standard — Chandelier & Niveaux Clés",
    description: "Affichage par défaut avec Swing High 20j (rose), Swing Low (vert), Spot Price (cyan) et watermark VorteXbot.app.",
    src: "/images/candle-chart-default.png",
    tag: "Aperçu Global",
  },
  {
    title: "Zoom Continu 1.5x & Barre Flottante",
    description: "Zoom dynamique à la molette avec recentrage automatique de l'échelle des prix Y et toolbar glassmorphique.",
    src: "/images/candle-chart-zoom.png",
    tag: "Zoom & Pan",
  },
  {
    title: "Outil Règle de Mesure Active",
    description: "Calcul vectoriel direct de l'écart de prix en dollars ($), pourcentage (%) et nombre de barres sélectionnées.",
    src: "/images/candle-chart-ruler.png",
    tag: "Règle de Mesure",
  },
];

const CODE_EXAMPLE = `import React from "react";
import { VortexCandleChart, type Candle, type PriceLine } from "vortex-charts";

export const SpyChart = ({ candles }: { candles: Candle[] }) => {
  const priceLines: PriceLine[] = [
    { price: 586.40, color: "#f43f5e", title: "Swing High (20j)", lineStyle: "dashed" },
    { price: 571.20, color: "#10b981", title: "Swing Low (20j)", lineStyle: "dashed" },
    { price: 582.85, color: "#38bdf8", title: "Spot Price", lineStyle: "solid", lineWidth: 2 },
  ];

  return (
    <div className="w-full bg-[#020616] p-4 rounded-xl border border-[rgba(160,200,230,0.1)]">
      <VortexCandleChart
        candles={candles}
        priceLines={priceLines}
        swingHigh={586.40}
        swingLow={571.20}
        spotPrice={582.85}
        atrBounds={{ upper: 588.50, lower: 568.90 }}
        height={320}
        showControls={true}
        showWatermark={true}
      />
    </div>
  );
};`;

export default function CandleChartDocPage() {
  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div className="space-y-2 border-b border-[rgba(160,200,230,0.1)] pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
            <CandlestickChart className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-semibold">
            Composant
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          &lt;VortexCandleChart /&gt;
        </h1>
        <p className="text-sm text-[#9fb0c4]">
          Le composant chandelier japonais propriétaire avec calcul automatique des échelles de prix, 
          lignes de niveaux majeurs (Swing High/Low, Spot), limites ATR et suite interactive complète.
        </p>
      </div>

      {/* 1. Démo Live Interactive */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Démo Interactive en Direct</h2>
        <p className="text-xs text-[#9fb0c4]">
          Testez directement le zoom (molette), le panoramique (glisser), la règle (Shift+glisser) et le survol réticulaire :
        </p>

        <InteractiveDemo
          title="VortexCandleChart — SPY 60 Séances"
          description="Données réelles simulées avec Swing High 586.40, Swing Low 571.20 et Spot 582.85."
          code={CODE_EXAMPLE}
        >
          <div className="w-full">
            <VortexCandleChart
              candles={SPY_CANDLES}
              priceLines={SPY_PRICE_LINES}
              swingHigh={SPY_SWING_HIGH}
              swingLow={SPY_SWING_LOW}
              spotPrice={SPY_SPOT_PRICE}
              atrBounds={SPY_ATR_BOUNDS}
              height={340}
              showControls={true}
              showWatermark={true}
            />
          </div>
        </InteractiveDemo>
      </section>

      {/* 2. Galerie d'Images & Cas d'Usage */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Galerie d'Aperçus Visuels HD</h2>
        <p className="text-xs text-[#9fb0c4]">
          Consultez les rendus détaillés dans différentes configurations. Cliquez sur une image pour l'agrandir.
        </p>
        <ImageGallery items={GALLERY_ITEMS} />
      </section>

      {/* 3. Guide Métier & Niveaux */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Niveaux Techniques Spécifiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-rose-400">Swing High (20j)</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              Plus haut cours enregistré sur les 20 dernières séances. Agit comme résistance psychologique et seuil de déclenchement breakout haussier.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-emerald-400">Swing Low (20j)</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              Plus bas cours des 20 dernières séances. Agit comme support fort ou zone de rebond d'achat stratégique.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-[#38bdf8]">Limites ATR (Upper/Lower)</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              Enveloppe d'amplitude quotidienne attendue calculée selon la moyenne vraie de volatilité (Average True Range).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Table des Props */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Référence des Props</h2>
        <PropsTable props={CANDLE_CHART_PROPS} />
      </section>

      {/* 5. Intégration Complète */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Exemple d'Intégration Complète</h2>
        <CodeBlock code={CODE_EXAMPLE} language="tsx" filename="components/SpyChart.tsx" />
      </section>
    </div>
  );
}
