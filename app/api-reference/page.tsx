import React from "react";
import { CodeBlock } from "../../components/CodeBlock";
import { BookOpen, Code2, Cpu, Palette } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div className="space-y-2 border-b border-[rgba(160,200,230,0.1)] pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-semibold">
            Documentation Technique
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Référence de l'API VortexLIB
        </h1>
        <p className="text-sm text-[#9fb0c4]">
          Spécification exhaustive des interfaces TypeScript, des fonctions du moteur Canvas 2D et des tokens de design system.
        </p>
      </div>

      {/* 1. Types TypeScript */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[rgba(160,200,230,0.1)] pb-2">
          <Code2 className="w-4 h-4 text-[#38bdf8]" />
          <h2 className="text-lg font-bold text-white">1. Types TypeScript</h2>
        </div>
        <p className="text-xs text-[#9fb0c4]">
          Importez ces types depuis <code className="text-[#38bdf8] font-mono">vortex-charts</code> pour typer vos états et payloads :
        </p>

        <CodeBlock
          code={`import type {
  Candle,
  PriceLine,
  PriorDayRange,
  PremarketRange,
  VwapPoint,
  ExpectedMoveSpec,
  TargetRange,
  ViewportState,
  RulerState,
  RulerPoint
} from "vortex-charts";

// Structure d'une bougie financière unifiée
export type Candle = {
  t: number;        // Timestamp UNIX en secondes
  open: number;     // Cours d'ouverture
  high: number;     // Plus haut de la séance
  low: number;      // Plus bas de la séance
  close: number;    // Cours de clôture
  volume?: number;  // Volume échangé (optionnel)
};

// Ligne horizontale personnalisée (résistance, support, stop)
export type PriceLine = {
  price: number;
  color: string;
  title: string;
  lineWidth?: 1 | 2 | 3 | 4;
  lineStyle?: "solid" | "dotted" | "dashed";
  axisLabelVisible?: boolean;
};

// Boîte de négociation veille (Prior-Day)
export type PriorDayRange = {
  high: number;
  low: number;
  mid: number;
};

// Boîte de négociation pré-marché (Premarket)
export type PremarketRange = {
  high: number;
  low: number;
  mid: number;
};

// Point de la courbe VWAP
export type VwapPoint = {
  t: number;
  vwap: number;
};

// Paramètres de l'Expected Move d'options
export type ExpectedMoveSpec = {
  movePct: number;       // Ex: 0.045 pour 4.5%
  moveAbs: number;       // Ex: 6.20 $
  strike?: number;       // Strike ATM de référence
  expiration: string;    // Date ISO YYYY-MM-DD
  dte?: number;          // Days to expiration
};

// Fourchette cible dérivée de l'Expected Move
export type TargetRange = {
  high: number;
  low: number;
};

// État interne du Viewport interactif
export interface ViewportState {
  startIndex: number;    // Premier index de bougie affiché
  endIndex: number;      // Dernier index affiché
  totalCount: number;    // Nombre total de bougies en mémoire
}

// État de l'outil Règle de mesure
export interface RulerState {
  active: boolean;
  startPoint: RulerPoint | null;
  currentPoint: RulerPoint | null;
}

export interface RulerPoint {
  x: number;
  y: number;
  price: number;
  index: number;
}`}
          language="typescript"
          filename="vortex-charts/src/types/index.ts"
        />
      </section>

      {/* 2. Fonctions du Moteur Engine */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[rgba(160,200,230,0.1)] pb-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">2. Fonctions du Moteur Canvas 2D</h2>
        </div>
        <p className="text-xs text-[#9fb0c4]">
          Le moteur de VortexLIB est composé de fonctions pures sans effet de bord, utilisables indépendamment de React :
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-2">
            <h3 className="text-xs font-mono font-bold text-[#38bdf8]">
              Viewport & Navigation
            </h3>
            <ul className="text-xs text-[#9fb0c4] space-y-1.5 list-disc pl-4 font-mono">
              <li>
                <strong className="text-white">createViewport(totalCount)</strong> : Initialise le viewport englobant toutes les bougies (zoom = 1.0x).
              </li>
              <li>
                <strong className="text-white">zoomViewport(state, factor, anchorIndex)</strong> : Multiplie le zoom par un facteur (clamp entre 1.0x et 5.0x) en ancrant la bougie sous la souris.
              </li>
              <li>
                <strong className="text-white">panViewport(state, deltaBars)</strong> : Translate horizontalement la plage visible en maintenant le nombre de barres fixes.
              </li>
              <li>
                <strong className="text-white">resetViewport(totalCount)</strong> : Raccourci réinitialisant l'état du viewport.
              </li>
              <li>
                <strong className="text-white">getZoomLevel(state)</strong> : Renvoie le multiplicateur de zoom (ex: 1.5 pour 150%).
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-2">
            <h3 className="text-xs font-mono font-bold text-emerald-400">
              Coordonnées & Projections
            </h3>
            <ul className="text-xs text-[#9fb0c4] space-y-1.5 list-disc pl-4 font-mono">
              <li>
                <strong className="text-white">computeBounds(candles, padding)</strong> : Calcule le min, max, delta et échelle de prix avec marges de sécurité.
              </li>
              <li>
                <strong className="text-white">priceToY(price, bounds, height, padding)</strong> : Convertit un prix en coordonnée verticale Canvas Y en pixels.
              </li>
              <li>
                <strong className="text-white">yToPrice(y, bounds, height, padding)</strong> : Projection inverse d'un pixel Y vers le prix correspondant.
              </li>
              <li>
                <strong className="text-white">viewportIndexToX(index, viewport, width, padding)</strong> : Calcule la position X d'une bougie en tenant compte de la plage zoomée.
              </li>
              <li>
                <strong className="text-white">viewportXToIndex(x, viewport, width, padding)</strong> : Inverse pour détecter la bougie sous le curseur.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] space-y-2">
            <h3 className="text-xs font-mono font-bold text-purple-400">
              Formatage & Interaction
            </h3>
            <ul className="text-xs text-[#9fb0c4] space-y-1.5 list-disc pl-4 font-mono">
              <li>
                <strong className="text-white">formatChange(open, close)</strong> : Retourne la chaîne formatée de variation (ex: <span className="text-emerald-400">+1.25%</span> ou <span className="text-rose-400">-0.82%</span>).
              </li>
              <li>
                <strong className="text-white">formatVolume(vol)</strong> : Formate les grands nombres en notation K, M, B (ex: <code className="text-white">1.45M</code>).
              </li>
              <li>
                <strong className="text-white">drawRulerOverlay(ctx, ruler, bounds, padding)</strong> : Rendu vectoriel du polygone de sélection de la règle et de la bulle d'informations.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Tokens de Thème & Design */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[rgba(160,200,230,0.1)] pb-2">
          <Palette className="w-4 h-4 text-purple-400" />
          <h2 className="text-lg font-bold text-white">3. Tokens de Design System (VORTEX_THEME)</h2>
        </div>
        <p className="text-xs text-[#9fb0c4]">
          L'objet <code className="text-[#38bdf8] font-mono">VORTEX_THEME</code> contient toutes les constantes graphiques certifiées conformes à la charte VorteX :
        </p>

        <CodeBlock
          code={`export const VORTEX_THEME = {
  colors: {
    background: "#020616",
    grid: "rgba(160, 200, 230, 0.07)",
    axisText: "#8290a5",
    crosshair: "rgba(56, 189, 248, 0.4)",
    
    // Bougies japonaises
    bullCandle: "#10b981",    // Vert émeraude
    bearCandle: "#f43f5e",    // Rose framboise vif
    bullWick: "#10b981",
    bearWick: "#f43f5e",
    
    // Niveaux et indicateurs
    spotPrice: "#38bdf8",     // Cyan électrique
    swingHigh: "#f43f5e",
    swingLow: "#10b981",
    vwap: "#38bdf8",
    
    // Boîtes de session
    priorDayBox: "rgba(16, 185, 129, 0.08)",
    priorDayBorder: "rgba(16, 185, 129, 0.35)",
    premarketBox: "rgba(56, 189, 248, 0.08)",
    premarketBorder: "rgba(56, 189, 248, 0.35)",
    
    // Filigrane officiel
    watermarkText: "#ffffff",
    watermarkAccent: "#38bdf8",
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monoFont: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
};`}
          language="typescript"
          filename="vortex-charts/src/theme/tokens.ts"
        />
      </section>

      {/* 4. Suite des 19 Composants Graphiques */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[rgba(160,200,230,0.1)] pb-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">4. Suite des 19 Composants Graphiques (v0.9.0)</h2>
        </div>
        <p className="text-xs text-[#9fb0c4]">
          Tous les composants sont disponibles et exportés directement depuis <code className="text-[#38bdf8] font-mono">vortex-charts</code> :
        </p>

        <CodeBlock
          code={`import {
  // Trading & Price Action
  VortexCandleChart,
  VortexLineChart,
  VortexOhlcChart,
  VortexHeikinAshiChart,
  VortexRenkoChart,
  VortexPointFigureChart,
  VortexRangeBarChart,

  // Order Flow & Volume
  VortexFootprintChart,
  VortexVolumeProfileChart,
  VortexBarChart,

  // Quantitative & Derivatives
  VortexConeChart,
  VortexRangeChart,
  VortexMultiLineChart,
  VortexScatterPlot,
  VortexHeatmap,
  VortexBoxPlot,

  // Portfolio & Performance
  VortexAreaChart,
  VortexWaterfallChart,
  VortexRadarChart,
  VortexPieChart,
  VortexChoroplethMap,

  // Utilities
  colorWithAlpha,
  formatPrice,
  formatCandleTime,
} from "vortex-charts";`}
          language="typescript"
        />
      </section>
    </div>
  );
}
