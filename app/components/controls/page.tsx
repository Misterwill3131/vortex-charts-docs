"use client";

import React from "react";
import { VortexCandleChart } from "vortex-charts";
import { SPY_CANDLES, SPY_PRICE_LINES, SPY_SPOT_PRICE } from "../../../data/sample-candle-data";
import { InteractiveDemo } from "../../../components/InteractiveDemo";
import { ImageGallery, type GalleryItem } from "../../../components/ImageGallery";
import { CodeBlock } from "../../../components/CodeBlock";
import {
  Sliders,
  ZoomIn,
  Move,
  Ruler,
  RotateCcw,
  MousePointer,
  Check,
} from "lucide-react";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Barre d'Outils Flottante Glassmorphique",
    description: "Boutons Zoom+, Zoom-, Règle, Fit/Reset et badge de niveau de zoom 1.0x à 5.0x.",
    src: "/images/controls-toolbar.png",
    tag: "Toolbar v0.3.0",
  },
  {
    title: "Mesure Vectorielle avec la Règle",
    description: "Sélectionnez 2 points avec Shift+glisser pour afficher l'écart en dollars, % et nombre de séances.",
    src: "/images/candle-chart-ruler.png",
    tag: "Outil Règle",
  },
];

const CODE_EXAMPLE = `import React from "react";
import { VortexCandleChart } from "vortex-charts";

export const InteractiveChart = ({ candles }: { candles: any[] }) => {
  return (
    // La prop showControls active automatiquement la barre flottante et les raccourcis
    <VortexCandleChart
      candles={candles}
      showControls={true}
      height={320}
    />
  );
};`;

export default function ControlsDocPage() {
  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div className="space-y-2 border-b border-[rgba(160,200,230,0.1)] pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
            <Sliders className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-semibold">
            Moteur Interactif v0.3.0
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Contrôles & Gestes Utilisateur
        </h1>
        <p className="text-sm text-[#9fb0c4]">
          Découvrez les interactions avancées introduites dans VortexLIB v0.3.0 : 
          zoom continu, panoramique dynamique, règle vectorielle de mesure et réinitialisation instantanée.
        </p>
      </div>

      {/* 1. Démo Live */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Démo Interactive des Commandes</h2>
        <p className="text-xs text-[#9fb0c4]">
          Utilisez la barre d'outils en haut à droite du graphique ou les gestes souris :
        </p>

        <InteractiveDemo
          title="Contrôles Flottants & Règle — Test en Direct"
          description="Testez le zoom avec [+] et [-], activez la règle [??] ou double-cliquez pour réinitialiser."
          code={CODE_EXAMPLE}
        >
          <div className="w-full">
            <VortexCandleChart
              candles={SPY_CANDLES}
              priceLines={SPY_PRICE_LINES}
              spotPrice={SPY_SPOT_PRICE}
              height={340}
              showControls={true}
              showWatermark={true}
            />
          </div>
        </InteractiveDemo>
      </section>

      {/* 2. Guide des Raccourcis et Gestes */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">2. Guide Complet des Gestes et Raccourcis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] shrink-0 mt-0.5">
              <ZoomIn className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                Zoom Continu (Molette)
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[rgba(56,189,248,0.1)] text-[#38bdf8]">
                  Wheel / Pinch
                </span>
              </h4>
              <p className="text-xs text-[#9fb0c4] leading-relaxed">
                Faites tourner la molette de la souris pour zoomer de 1.0x à 5.0x. 
                Le point sous le curseur reste ancré pour une navigation ultra-naturelle.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <Move className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                Panoramique (Glisser-Déposer)
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-400">
                  Click + Drag
                </span>
              </h4>
              <p className="text-xs text-[#9fb0c4] leading-relaxed">
                Cliquez et déplacez la souris latéralement lorsque le zoom est supérieur à 1.0x pour naviguer dans l'historique temporel.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Ruler className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                Règle de Mesure Vectorielle
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400">
                  Shift + Drag
                </span>
              </h4>
              <p className="text-xs text-[#9fb0c4] leading-relaxed">
                Maintenez <kbd className="px-1.5 py-0.5 rounded bg-[#020616] border border-[#8290a5]/40 text-[#38bdf8] font-mono">Shift</kbd> et glissez entre deux chandeliers, ou cliquez sur l'icône règle de la barre d'outils.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(160,200,230,0.1)] bg-[#04091e] flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                Réinitialisation (Fit All)
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400">
                  Double Clic
                </span>
              </h4>
              <p className="text-xs text-[#9fb0c4] leading-relaxed">
                Double-cliquez n'importe où sur le canvas ou cliquez sur le bouton <strong className="text-white">Fit</strong> pour réinitialiser le viewport à 1.0x.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Galerie Visuelle */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Rendu de la Barre d'Outils et de la Règle</h2>
        <ImageGallery items={GALLERY_ITEMS} />
      </section>

      {/* 4. Architecture Viewport */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Fonctions Moteur Bas-Niveau</h2>
        <p className="text-xs text-[#9fb0c4]">
          Pour les intégrations personnalisées, VortexLIB exporte directement les fonctions mathématiques pures :
        </p>

        <div className="overflow-x-auto rounded-xl border border-[rgba(160,200,230,0.12)]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(160,200,230,0.1)] bg-[rgba(14,25,50,0.6)] font-mono text-[11px] text-[#8290a5]">
                <th className="py-3 px-4">Fonction</th>
                <th className="py-3 px-4">Signature</th>
                <th className="py-3 px-4">Rôle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(160,200,230,0.06)] bg-[#04091e]/50 font-mono">
              <tr>
                <td className="py-2.5 px-4 text-[#38bdf8] font-bold">createViewport</td>
                <td className="py-2.5 px-4 text-[#9fb0c4]">(totalCount: number) =&gt; ViewportState</td>
                <td className="py-2.5 px-4 text-[#8290a5] font-sans">Initialise le viewport à 100% de visibilité (1.0x).</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-[#38bdf8] font-bold">zoomViewport</td>
                <td className="py-2.5 px-4 text-[#9fb0c4]">(state, factor, anchorIndex) =&gt; ViewportState</td>
                <td className="py-2.5 px-4 text-[#8290a5] font-sans">Zoom centré sur un index spécifique avec clamp sécurisé.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-[#38bdf8] font-bold">panViewport</td>
                <td className="py-2.5 px-4 text-[#9fb0c4]">(state, deltaBars) =&gt; ViewportState</td>
                <td className="py-2.5 px-4 text-[#8290a5] font-sans">Déplace la fenêtre visible vers la gauche ou la droite.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-[#38bdf8] font-bold">drawRulerOverlay</td>
                <td className="py-2.5 px-4 text-[#9fb0c4]">(ctx, ruler, bounds, padding) =&gt; void</td>
                <td className="py-2.5 px-4 text-[#8290a5] font-sans">Dessine le rectangle de mesure et le badge de statistiques.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
