"use client";

import React from "react";
import { VortexConeChart } from "vortex-charts";
import {
  CONE_HISTORICAL_CANDLES,
  SAMPLE_EXPECTED_MOVE,
  SAMPLE_TARGET_RANGE,
  CONE_CURRENT_PRICE,
  CONE_EXPIRATION_DATE,
} from "../../../data/sample-cone-data";
import { CONE_CHART_PROPS } from "../../../lib/props-registry";
import { InteractiveDemo } from "../../../components/InteractiveDemo";
import { ImageGallery, type GalleryItem } from "../../../components/ImageGallery";
import { PropsTable } from "../../../components/PropsTable";
import { CodeBlock } from "../../../components/CodeBlock";
import { TrendingUp } from "lucide-react";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Cône Forward & Target Range",
    description: "Projection de la volatilité implicite des options avec entonnoir de dispersion jusqu'à la date d'expiration.",
    src: "/images/cone-chart-default.png",
    tag: "Options & IV",
  },
];

const CODE_EXAMPLE = `import React from "react";
import { VortexConeChart, type Candle, type ExpectedMoveSpec, type TargetRange } from "vortex-charts";

export const OptionVolatilityCone = ({
  historicalCandles,
  currentPrice,
  expectedMove,
  targetRange,
}: {
  historicalCandles: Candle[];
  currentPrice: number;
  expectedMove: ExpectedMoveSpec;
  targetRange: TargetRange;
}) => {
  return (
    <div className="w-full bg-[#020616] p-4 rounded-xl border border-[rgba(160,200,230,0.1)]">
      <VortexConeChart
        candles={historicalCandles}
        currentPrice={currentPrice}
        expectedMove={expectedMove}
        targetRange={targetRange}
        dte={5}
        expirationDate="2026-09-18"
        height={300}
        showWatermark={true}
      />
    </div>
  );
};`;

export default function ConeChartDocPage() {
  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div className="space-y-2 border-b border-[rgba(160,200,230,0.1)] pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
            Composant
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          &lt;VortexConeChart /&gt;
        </h1>
        <p className="text-sm text-[#9fb0c4]">
          Projection forward d'incertitude dérivée de la volatilité implicite des contrats d'options (Expected Move) 
          avec zone cible de dispersion et décompte DTE (Days to Expiration).
        </p>
      </div>

      {/* 1. Démo Live Interactive */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Démo Interactive en Direct</h2>
        <p className="text-xs text-[#9fb0c4]">
          Observez le cône de probabilité projeté vers l'expiration avec les bornes supérieure et inférieure de l'Expected Move :
        </p>

        <InteractiveDemo
          title="VortexConeChart — NVDA Projection Options (5 DTE)"
          description="Spot $129.30, Expected Move ±$6.20 (4.8%), Expiration 2026-09-18."
          code={CODE_EXAMPLE}
        >
          <div className="w-full">
            <VortexConeChart
              candles={CONE_HISTORICAL_CANDLES}
              currentPrice={CONE_CURRENT_PRICE}
              expectedMove={SAMPLE_EXPECTED_MOVE}
              targetRange={SAMPLE_TARGET_RANGE}
              dte={5}
              expirationDate={CONE_EXPIRATION_DATE}
              height={320}
              showWatermark={true}
            />
          </div>
        </InteractiveDemo>
      </section>

      {/* 2. Galerie Visuelle */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Rendu Visuel du Cône de Volatilité</h2>
        <ImageGallery items={GALLERY_ITEMS} />
      </section>

      {/* 3. Concepts Quantitatifs */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Modélisation Quantitative</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-purple-400">Expected Move (EM)</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              Variation standard calculée à partir du straddle ATM (At-The-Money). Représente le mouvement 1-sigma (68% de probabilité statistique) anticipé par les teneurs de marché.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-[#38bdf8]">Entonnoir Temporel (DTE)</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              La largeur de dispersion s'élargit en racine carrée du temps (vt), modélisant l'accroissement continu de l'incertitude jusqu'à l'expiration du contrat d'option.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-1.5">
            <span className="font-mono font-bold text-emerald-400">Target Range Cible</span>
            <p className="text-[#9fb0c4] leading-relaxed">
              Fourchette de négociation optimale définie par les algorithmes de VorteX pour le cadrage des positions d'options (Iron Condors, Spreads verticaux).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Table des Props */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Référence des Props</h2>
        <PropsTable props={CONE_CHART_PROPS} />
      </section>

      {/* 5. Code d'Intégration */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Exemple d'Intégration</h2>
        <CodeBlock code={CODE_EXAMPLE} language="tsx" filename="components/OptionVolatilityCone.tsx" />
      </section>
    </div>
  );
}
