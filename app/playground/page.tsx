"use client";

import React, { useState, useMemo } from "react";
import {
  VortexCandleChart,
  VortexRangeChart,
  VortexConeChart,
} from "vortex-charts";
import {
  SPY_CANDLES,
  SPY_SWING_HIGH,
  SPY_SWING_LOW,
  SPY_SPOT_PRICE,
  SPY_ATR_BOUNDS,
  QQQ_CANDLES,
  QQQ_SWING_HIGH,
  QQQ_SWING_LOW,
  QQQ_SPOT_PRICE,
  QQQ_ATR_BOUNDS,
  NVDA_CANDLES,
  NVDA_SWING_HIGH,
  NVDA_SWING_LOW,
  NVDA_SPOT_PRICE,
  NVDA_ATR_BOUNDS,
} from "../../data/sample-candle-data";
import {
  INTRADAY_CANDLES,
  SAMPLE_PRIOR_DAY,
  SAMPLE_PREMARKET,
  SAMPLE_VWAP_SERIES,
} from "../../data/sample-range-data";
import {
  CONE_HISTORICAL_CANDLES,
  SAMPLE_EXPECTED_MOVE,
  SAMPLE_TARGET_RANGE,
  CONE_CURRENT_PRICE,
  CONE_EXPIRATION_DATE,
} from "../../data/sample-cone-data";
import { CodeBlock } from "../../components/CodeBlock";
import {
  Gamepad2,
  Sparkles,
  CandlestickChart,
  Layers,
  TrendingUp,
} from "lucide-react";

type ChartType = "candle" | "range" | "cone";
type Ticker = "SPY" | "QQQ" | "NVDA";

export default function PlaygroundPage() {
  const [chartType, setChartType] = useState<ChartType>("candle");
  const [ticker, setTicker] = useState<Ticker>("SPY");
  const [height, setHeight] = useState<number>(320);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [overlayMode, setOverlayMode] = useState<"all" | "boxes" | "vwap" | "none">("all");

  // Selected candle set
  const currentCandles = useMemo(() => {
    switch (ticker) {
      case "QQQ":
        return QQQ_CANDLES;
      case "NVDA":
        return NVDA_CANDLES;
      default:
        return SPY_CANDLES;
    }
  }, [ticker]);

  const currentLevels = useMemo(() => {
    switch (ticker) {
      case "QQQ":
        return {
          high: QQQ_SWING_HIGH,
          low: QQQ_SWING_LOW,
          spot: QQQ_SPOT_PRICE,
          atr: QQQ_ATR_BOUNDS,
        };
      case "NVDA":
        return {
          high: NVDA_SWING_HIGH,
          low: NVDA_SWING_LOW,
          spot: NVDA_SPOT_PRICE,
          atr: NVDA_ATR_BOUNDS,
        };
      default:
        return {
          high: SPY_SWING_HIGH,
          low: SPY_SWING_LOW,
          spot: SPY_SPOT_PRICE,
          atr: SPY_ATR_BOUNDS,
        };
    }
  }, [ticker]);

  // Generated code string
  const generatedCode = useMemo(() => {
    if (chartType === "candle") {
      return `<VortexCandleChart
  candles={${ticker}_CANDLES}
  swingHigh={${currentLevels.high}}
  swingLow={${currentLevels.low}}
  spotPrice={${currentLevels.spot}}
  atrBounds={{ upper: ${currentLevels.atr.upper}, lower: ${currentLevels.atr.lower} }}
  height={${height}}
  showWatermark={${showWatermark}}
  showControls={${showControls}}
/>`;
    } else if (chartType === "range") {
      return `<VortexRangeChart
  candles={INTRADAY_CANDLES}
  priorDay={priorDayRange}
  premarket={premarketRange}
  vwapSeries={vwapSeries}
  overlayMode="${overlayMode}"
  height={${height}}
  showWatermark={${showWatermark}}
  showControls={${showControls}}
/>`;
    } else {
      return `<VortexConeChart
  candles={HISTORICAL_CANDLES}
  currentPrice={${currentLevels.spot}}
  expectedMove={expectedMoveSpec}
  targetRange={targetRange}
  dte={5}
  expirationDate="2026-09-18"
  height={${height}}
  showWatermark={${showWatermark}}
/>`;
    }
  }, [chartType, ticker, height, showWatermark, showControls, overlayMode, currentLevels]);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="space-y-2 border-b border-[rgba(160,200,230,0.1)] pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-semibold">
            Bac à Sable
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Playground Live Interactif
        </h1>
        <p className="text-sm text-[#9fb0c4]">
          Ajustez les paramètres en temps réel, testez les interactions et générez le code TypeScript correspondant en 1 clic.
        </p>
      </div>

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl border border-[rgba(160,200,230,0.12)] bg-[#04091e]">
        {/* Modèle de Graphique */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-[#8290a5] uppercase tracking-wider">
            Composant
          </label>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setChartType("candle")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                chartType === "candle"
                  ? "bg-[#38bdf8] text-[#020616] font-bold shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                  : "text-[#9fb0c4] hover:bg-[rgba(160,200,230,0.06)]"
              }`}
            >
              <CandlestickChart className="w-3.5 h-3.5" />
              VortexCandleChart
            </button>
            <button
              onClick={() => setChartType("range")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                chartType === "range"
                  ? "bg-emerald-400 text-[#020616] font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "text-[#9fb0c4] hover:bg-[rgba(160,200,230,0.06)]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              VortexRangeChart
            </button>
            <button
              onClick={() => setChartType("cone")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                chartType === "cone"
                  ? "bg-purple-400 text-[#020616] font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                  : "text-[#9fb0c4] hover:bg-[rgba(160,200,230,0.06)]"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              VortexConeChart
            </button>
          </div>
        </div>

        {/* Ticker */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-[#8290a5] uppercase tracking-wider">
            Actif Sous-Jacent
          </label>
          <div className="grid grid-cols-3 gap-1">
            {(["SPY", "QQQ", "NVDA"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTicker(t)}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  ticker === t
                    ? "bg-[#38bdf8] text-[#020616]"
                    : "text-[#9fb0c4] bg-[#020616] hover:bg-[rgba(160,200,230,0.06)] border border-[rgba(160,200,230,0.08)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[#8290a5] pt-1">
            Spot : <span className="text-white font-mono font-semibold">${currentLevels.spot}</span>
          </p>
        </div>

        {/* Hauteur */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-[#8290a5]">
            <label className="uppercase tracking-wider">Hauteur</label>
            <span className="text-white font-bold">{height}px</span>
          </div>
          <input
            type="range"
            min="240"
            max="460"
            step="20"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-[#38bdf8] cursor-pointer"
          />
          <span className="text-[10px] text-[#8290a5] block">
            Largeur 100% responsive automatique
          </span>
        </div>

        {/* Toggles */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-[#8290a5] uppercase tracking-wider block">
            Options d'Affichage
          </label>
          <label className="flex items-center gap-2 text-xs text-[#9fb0c4] cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showWatermark}
              onChange={(e) => setShowWatermark(e.target.checked)}
              className="rounded accent-[#38bdf8]"
            />
            <span>Watermark VorteXbot.app</span>
          </label>
          {chartType !== "cone" && (
            <label className="flex items-center gap-2 text-xs text-[#9fb0c4] cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={showControls}
                onChange={(e) => setShowControls(e.target.checked)}
                className="rounded accent-[#38bdf8]"
              />
              <span>Toolbar Zoom & Règle</span>
            </label>
          )}
          {chartType === "range" && (
            <div className="pt-1">
              <span className="text-[10px] text-[#8290a5] block mb-1">Calque Range :</span>
              <div className="grid grid-cols-2 gap-1">
                {(["all", "boxes", "vwap", "none"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setOverlayMode(m)}
                    className={`text-[10px] font-mono py-0.5 rounded ${
                      overlayMode === m ? "bg-[#38bdf8] text-black font-bold" : "bg-[#020616] text-[#8290a5]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Chart Container */}
      <div className="p-4 rounded-2xl border border-[rgba(160,200,230,0.12)] bg-[#020616] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(160,200,230,0.08)]">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white">{ticker}</span>
            <span className="text-[#8290a5]">•</span>
            <span className="text-[#38bdf8] uppercase">{chartType}</span>
          </div>
          <span className="text-[11px] font-mono text-[#8290a5]">
            Molette: Zoom • Shift+Drag: Règle
          </span>
        </div>

        {chartType === "candle" && (
          <VortexCandleChart
            key={`${ticker}-${height}`}
            candles={currentCandles}
            swingHigh={currentLevels.high}
            swingLow={currentLevels.low}
            spotPrice={currentLevels.spot}
            atrBounds={currentLevels.atr}
            height={height}
            showWatermark={showWatermark}
            showControls={showControls}
          />
        )}

        {chartType === "range" && (
          <VortexRangeChart
            key={`range-${height}-${overlayMode}`}
            candles={INTRADAY_CANDLES}
            priorDay={SAMPLE_PRIOR_DAY}
            premarket={SAMPLE_PREMARKET}
            vwapSeries={SAMPLE_VWAP_SERIES}
            overlayMode={overlayMode}
            height={height}
            showWatermark={showWatermark}
            showControls={showControls}
          />
        )}

        {chartType === "cone" && (
          <VortexConeChart
            key={`cone-${height}`}
            candles={CONE_HISTORICAL_CANDLES}
            currentPrice={currentLevels.spot}
            expectedMove={SAMPLE_EXPECTED_MOVE}
            targetRange={SAMPLE_TARGET_RANGE}
            dte={5}
            expirationDate={CONE_EXPIRATION_DATE}
            height={height}
            showWatermark={showWatermark}
          />
        )}
      </div>

      {/* Generated Code */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#8290a5] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            Code TypeScript Généré en Temps Réel
          </h3>
          <span className="text-[11px] text-[#8290a5]">
            Copiez et collez directement dans votre projet
          </span>
        </div>
        <CodeBlock code={generatedCode} language="tsx" filename="ComponentIntegration.tsx" />
      </div>
    </div>
  );
}
