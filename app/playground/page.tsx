"use client";

import React, { useState, useMemo } from "react";
import {
  VortexCandleChart,
  VortexLineChart,
  VortexOhlcChart,
  VortexHeikinAshiChart,
  VortexRenkoChart,
  VortexPointFigureChart,
  VortexRangeBarChart,
  VortexFootprintChart,
  VortexVolumeProfileChart,
  VortexBarChart,
  VortexConeChart,
  VortexRangeChart,
  VortexMultiLineChart,
  VortexScatterPlot,
  VortexHeatmap,
  VortexBoxPlot,
  VortexAreaChart,
  VortexWaterfallChart,
  VortexRadarChart,
  VortexPieChart,
  VortexChoroplethMap,
  VortexWhaleBiasChart,
} from "vortex-charts";

import {
  SPY_CANDLES,
  SPY_SWING_HIGH,
  SPY_SWING_LOW,
  SPY_SPOT_PRICE,
  SPY_ATR_BOUNDS,
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
import {
  SAMPLE_LINE_SERIES,
  SAMPLE_OHLC_CANDLES,
  SAMPLE_FOOTPRINT_BARS,
  SAMPLE_MULTI_SERIES,
  SAMPLE_SCATTER_POINTS,
  SAMPLE_HEATMAP,
  SAMPLE_AREA_DATA,
  SAMPLE_BOX_PLOT,
  SAMPLE_WATERFALL,
  SAMPLE_RADAR_DIMENSIONS,
  SAMPLE_RADAR_SERIES,
  SAMPLE_PIE_SLICES,
  SAMPLE_CHOROPLETH_REGIONS,
  SAMPLE_BAR_GREEKS,
  SAMPLE_WHALE_BIAS_POINTS,
} from "../../data/sample-suite-data";
import { CodeBlock } from "../../components/CodeBlock";
import {
  Sparkles,
  CandlestickChart,
  TrendingUp,
  Activity,
  Layers,
  PieChart as PieIcon,
  BarChart2,
  Grid,
  MapPin,
  Maximize2,
  Settings,
} from "lucide-react";

type ChartCategory = "price" | "volume" | "quant" | "portfolio";

interface ChartMeta {
  id: string;
  name: string;
  category: ChartCategory;
  description: string;
}

const ALL_CHARTS: ChartMeta[] = [
  // Price Action
  { id: "candle", name: "Candlestick", category: "price", description: "Standard OHLC Japanese candlesticks with zoom/pan and price targets" },
  { id: "line", name: "Line Chart", category: "price", description: "Minimalist close price trajectory with gradient glow" },
  { id: "ohlc", name: "OHLC Bars", category: "price", description: "Western High-Low spine with Open left tick and Close right tick" },
  { id: "heikin-ashi", name: "Heikin-Ashi", category: "price", description: "Noise-filtered smoothed momentum candles" },
  { id: "renko", name: "Renko Chart", category: "price", description: "Time-independent constant price step bricks" },
  { id: "point-figure", name: "Point & Figure", category: "price", description: "Classic X/O columns with box size and multi-box reversal" },
  { id: "range-bars", name: "Range Bars", category: "price", description: "Constant volatility price range bars sealed at exact threshold" },

  // Order Flow & Volume
  { id: "footprint", name: "Footprint Chart", category: "volume", description: "Order flow Bid x Ask volume executed clusters per price rung" },
  { id: "volume-profile", name: "Volume Profile", category: "volume", description: "Horizontal volume histogram with POC, VAH, and VAL nodes" },
  { id: "bar", name: "Bar / Greeks", category: "volume", description: "Categorical histogram for option Greeks and volume distribution" },
  { id: "whale-bias", name: "Whale Flow Bias", category: "volume", description: "Intraday institutional call vs put accumulation ratio with 50% equilibrium threshold" },

  // Quantitative & Derivatives
  { id: "cone", name: "Expected Move Cone", category: "quant", description: "Options implied volatility cone and strike probabilities" },
  { id: "range", name: "Daily Levels & VWAP", category: "quant", description: "Prior-day high/low, premarket breakout zones, and rolling VWAP" },
  { id: "multi-line", name: "Multi-Series", category: "quant", description: "Simultaneous comparison of normalized asset trajectories" },
  { id: "scatter", name: "Scatter / Beta", category: "quant", description: "2D Cartesian correlation with bubble sizing and linear regression" },
  { id: "heatmap", name: "Correlation Heatmap", category: "quant", description: "2D asset cross-correlation matrix with color gradient scales" },
  { id: "box-plot", name: "Box Plot", category: "quant", description: "Tukey 5-number statistical summary with outlier fences" },

  // Portfolio & Performance
  { id: "area", name: "Area / Equity Curve", category: "portfolio", description: "Cumulative portfolio equity curve with smooth filled gradient" },
  { id: "waterfall", name: "Waterfall Walk", category: "portfolio", description: "Sequential cumulative revenue, profit, costs and net delta" },
  { id: "radar", name: "Radar / Spider", category: "portfolio", description: "Multi-factor asset score polygons across radial axes" },
  { id: "pie", name: "Donut / Allocation", category: "portfolio", description: "Asset class portfolio weights with hover slice displacement" },
  { id: "choropleth", name: "Choropleth Map", category: "portfolio", description: "Global regional heat map with vector polygon hit testing" },
];

export default function PlaygroundPage() {
  const [activeCategory, setActiveCategory] = useState<ChartCategory>("price");
  const [selectedChartId, setSelectedChartId] = useState<string>("candle");
  const [height, setHeight] = useState<number>(360);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  // Chart specific tweakable parameters
  const [renkoBrickSize, setRenkoBrickSize] = useState<number>(1.0);
  const [pnfBoxSize, setPnfBoxSize] = useState<number>(1.0);
  const [pieDonutHole, setPieDonutHole] = useState<number>(0.55);
  const [heatmapScale, setHeatmapScale] = useState<"vortex" | "coolwarm" | "emerald">("vortex");

  const currentChart = useMemo(
    () => ALL_CHARTS.find((c) => c.id === selectedChartId) || ALL_CHARTS[0],
    [selectedChartId]
  );

  const filteredCharts = useMemo(
    () => ALL_CHARTS.filter((c) => c.category === activeCategory),
    [activeCategory]
  );

  const activeCodeSnippet = useMemo(() => {
    switch (selectedChartId) {
      case "candle":
        return `<VortexCandleChart\n  candles={data}\n  height={${height}}\n  showWatermark={${showWatermark}}\n  swingHigh={${SPY_SWING_HIGH}}\n  swingLow={${SPY_SWING_LOW}}\n/>`;
      case "line":
        return `<VortexLineChart\n  data={lineSeries}\n  height={${height}}\n  showArea={true}\n  showWatermark={${showWatermark}}\n/>`;
      case "ohlc":
        return `<VortexOhlcChart\n  data={ohlcData}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "heikin-ashi":
        return `<VortexHeikinAshiChart\n  data={candles}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "renko":
        return `<VortexRenkoChart\n  data={candles}\n  brickSize={${renkoBrickSize}}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "point-figure":
        return `<VortexPointFigureChart\n  data={candles}\n  boxSize={${pnfBoxSize}}\n  reversal={3}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "range-bars":
        return `<VortexRangeBarChart\n  data={ticksOrCandles}\n  rangeSize={0.5}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "footprint":
        return `<VortexFootprintChart\n  data={footprintBars}\n  height={${height}}\n  showText={true}\n  showWatermark={${showWatermark}}\n/>`;
      case "volume-profile":
        return `<VortexVolumeProfileChart\n  data={candles}\n  rows={28}\n  alignment="right"\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "bar":
        return `<VortexBarChart\n  data={greeksData}\n  height={${height}}\n  symmetric={true}\n  showWatermark={${showWatermark}}\n/>`;
      case "whale-bias":
        return `<VortexWhaleBiasChart\n  points={whalePoints}\n  label="Call share intraday timeline · $501.0M total tracked"\n  height={${height}}\n  showWatermark={${showWatermark}}\n  showEquilibrium={true}\n/>`;
      case "cone":
        return `<VortexConeChart\n  candles={historicalCandles}\n  expectedMove={expectedMoveSpec}\n  targetRange={targetRangeSpec}\n  currentPrice={${CONE_CURRENT_PRICE}}\n  expirationDate="${CONE_EXPIRATION_DATE}"\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "range":
        return `<VortexRangeChart\n  intradayCandles={intradayData}\n  priorDay={priorDayRange}\n  premarket={premarketRange}\n  vwapSeries={vwapData}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "multi-line":
        return `<VortexMultiLineChart\n  series={multiSeriesData}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "scatter":
        return `<VortexScatterPlot\n  data={scatterPoints}\n  showTrendLine={true}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "heatmap":
        return `<VortexHeatmap\n  data={correlationMatrix}\n  colorScale="${heatmapScale}"\n  showValues={true}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "box-plot":
        return `<VortexBoxPlot\n  data={sectorDistributions}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "area":
        return `<VortexAreaChart\n  data={equityCurvePoints}\n  color="#38bdf8"\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "waterfall":
        return `<VortexWaterfallChart\n  data={waterfallBars}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "radar":
        return `<VortexRadarChart\n  dimensions={factorDimensions}\n  series={assetSeries}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "pie":
        return `<VortexPieChart\n  data={portfolioSlices}\n  donutHole={${pieDonutHole}}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      case "choropleth":
        return `<VortexChoroplethMap\n  regions={geoRegions}\n  height={${height}}\n  showWatermark={${showWatermark}}\n/>`;
      default:
        return "";
    }
  }, [selectedChartId, height, showWatermark, renkoBrickSize, pnfBoxSize, pieDonutHole, heatmapScale]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-6 items-center rounded-md bg-cyan-950/80 px-2 text-xs font-mono text-cyan-400 border border-cyan-800/40">
            Interactive Suite
          </span>
          <span className="text-xs text-zinc-500 font-mono">v0.9.0 � 19 Models</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          VorteX Charts Playground
        </h1>
        <p className="text-zinc-400 max-w-3xl">
          Test and preview all 19 proprietary native Canvas 2D charting models. Explore interactive crosshairs, tooltips, responsive rendering, and copy ready-to-use React code.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: "price", label: "Trading & Price Action", count: 7, icon: CandlestickChart },
          { id: "volume", label: "Order Flow & Volume", count: 4, icon: BarChart2 },
          { id: "quant", label: "Quantitative & Derivatives", count: 6, icon: Activity },
          { id: "portfolio", label: "Portfolio & Allocation", count: 5, icon: PieIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as ChartCategory);
                const firstOfCat = ALL_CHARTS.find((c) => c.category === tab.id);
                if (firstOfCat) setSelectedChartId(firstOfCat.id);
              }}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-950/40"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-transparent"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? "bg-cyan-500/20 text-cyan-200" : "bg-white/5 text-zinc-500"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-selector pills for current category */}
      <div className="flex flex-wrap gap-2">
        {filteredCharts.map((chart) => {
          const isSelected = selectedChartId === chart.id;
          return (
            <button
              key={chart.id}
              onClick={() => setSelectedChartId(chart.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                isSelected
                  ? "bg-white/15 text-white font-semibold border border-white/20 shadow-md"
                  : "bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05] border border-white/5"
              }`}
            >
              {chart.name}
            </button>
          );
        })}
      </div>

      {/* Main Sandbox Card */}
      <div className="rounded-xl border border-white/10 bg-[#060a17]/80 backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Top Info Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-5 py-3 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="font-semibold text-white text-sm">{currentChart.name}</h2>
            <span className="text-xs text-zinc-500 hidden sm:inline">� {currentChart.description}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-zinc-400 hover:text-zinc-200">
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                className="rounded border-white/20 bg-black/40 text-cyan-500 focus:ring-0"
              />
              Watermark
            </label>
            <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setHeight(280)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${height === 280 ? "bg-white/20 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                280px
              </button>
              <button
                onClick={() => setHeight(360)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${height === 360 ? "bg-white/20 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                360px
              </button>
              <button
                onClick={() => setHeight(440)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${height === 440 ? "bg-white/20 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                440px
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Parameter Bar for charts with specific configs */}
        {(selectedChartId === "renko" || selectedChartId === "point-figure" || selectedChartId === "pie" || selectedChartId === "heatmap") && (
          <div className="flex flex-wrap items-center gap-6 px-5 py-2.5 border-b border-white/5 bg-black/40 text-xs font-mono text-zinc-300">
            {selectedChartId === "renko" && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Brick Size:</span>
                {[0.5, 1.0, 2.0].map((bs) => (
                  <button
                    key={bs}
                    onClick={() => setRenkoBrickSize(bs)}
                    className={`px-2 py-0.5 rounded border ${renkoBrickSize === bs ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-white/5 text-zinc-400 border-white/10"}`}
                  >
                    ${bs.toFixed(1)}
                  </button>
                ))}
              </div>
            )}

            {selectedChartId === "point-figure" && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Box Size:</span>
                {[0.5, 1.0, 2.0].map((bs) => (
                  <button
                    key={bs}
                    onClick={() => setPnfBoxSize(bs)}
                    className={`px-2 py-0.5 rounded border ${pnfBoxSize === bs ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-white/5 text-zinc-400 border-white/10"}`}
                  >
                    ${bs.toFixed(1)}
                  </button>
                ))}
              </div>
            )}

            {selectedChartId === "pie" && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Hole Ratio:</span>
                {[0, 0.4, 0.6, 0.75].map((hr) => (
                  <button
                    key={hr}
                    onClick={() => setPieDonutHole(hr)}
                    className={`px-2 py-0.5 rounded border ${pieDonutHole === hr ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-white/5 text-zinc-400 border-white/10"}`}
                  >
                    {hr === 0 ? "Pie (0%)" : `${Math.round(hr * 100)}%`}
                  </button>
                ))}
              </div>
            )}

            {selectedChartId === "heatmap" && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Color Palette:</span>
                {(["vortex", "coolwarm", "emerald"] as const).map((sc) => (
                  <button
                    key={sc}
                    onClick={() => setHeatmapScale(sc)}
                    className={`px-2 py-0.5 rounded capitalize border ${heatmapScale === sc ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-white/5 text-zinc-400 border-white/10"}`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Live Canvas Render Surface */}
        <div className="p-4 bg-[#02050f]/70">
          {selectedChartId === "candle" && (
            <VortexCandleChart
              candles={SPY_CANDLES}
              height={height}
              showWatermark={showWatermark}
              swingHigh={SPY_SWING_HIGH}
              swingLow={SPY_SWING_LOW}
              spotPrice={SPY_SPOT_PRICE}
              atrBounds={SPY_ATR_BOUNDS}
            />
          )}

          {selectedChartId === "line" && (
            <VortexLineChart
              data={SAMPLE_LINE_SERIES}
              height={height}
              showWatermark={showWatermark}
              showArea={true}
              showPoints={true}
            />
          )}

          {selectedChartId === "ohlc" && (
            <VortexOhlcChart
              data={SAMPLE_OHLC_CANDLES}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "heikin-ashi" && (
            <VortexHeikinAshiChart
              data={SAMPLE_OHLC_CANDLES}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "renko" && (
            <VortexRenkoChart
              data={SAMPLE_OHLC_CANDLES}
              brickSize={renkoBrickSize}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "point-figure" && (
            <VortexPointFigureChart
              data={SAMPLE_OHLC_CANDLES}
              boxSize={pnfBoxSize}
              reversal={3}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "range-bars" && (
            <VortexRangeBarChart
              data={SAMPLE_OHLC_CANDLES}
              rangeSize={0.8}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "footprint" && (
            <VortexFootprintChart
              data={SAMPLE_FOOTPRINT_BARS}
              height={height}
              showText={true}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "volume-profile" && (
            <VortexVolumeProfileChart
              data={SAMPLE_OHLC_CANDLES}
              rows={26}
              alignment="right"
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "bar" && (
            <VortexBarChart
              data={SAMPLE_BAR_GREEKS}
              height={height}
              symmetric={true}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "whale-bias" && (
            <VortexWhaleBiasChart
              points={SAMPLE_WHALE_BIAS_POINTS}
              height={height}
              label="Call share intraday timeline · $501.0M total tracked"
              showWatermark={showWatermark}
              showEquilibrium={true}
            />
          )}

          {selectedChartId === "cone" && (
            <VortexConeChart
              candles={CONE_HISTORICAL_CANDLES}
              expectedMove={SAMPLE_EXPECTED_MOVE}
              targetRange={SAMPLE_TARGET_RANGE}
              currentPrice={CONE_CURRENT_PRICE}
              expirationDate={CONE_EXPIRATION_DATE}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "range" && (
            <VortexRangeChart
              candles={INTRADAY_CANDLES}
              priorDay={SAMPLE_PRIOR_DAY}
              premarket={SAMPLE_PREMARKET}
              vwapSeries={SAMPLE_VWAP_SERIES}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "multi-line" && (
            <VortexMultiLineChart
              series={SAMPLE_MULTI_SERIES}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "scatter" && (
            <VortexScatterPlot
              data={SAMPLE_SCATTER_POINTS}
              showTrendLine={true}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "heatmap" && (
            <VortexHeatmap
              data={SAMPLE_HEATMAP}
              colorScale={heatmapScale}
              showValues={true}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "box-plot" && (
            <VortexBoxPlot
              data={SAMPLE_BOX_PLOT}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "area" && (
            <VortexAreaChart
              data={SAMPLE_AREA_DATA}
              color="#38bdf8"
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "waterfall" && (
            <VortexWaterfallChart
              data={SAMPLE_WATERFALL}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "radar" && (
            <VortexRadarChart
              dimensions={SAMPLE_RADAR_DIMENSIONS}
              series={SAMPLE_RADAR_SERIES}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "pie" && (
            <VortexPieChart
              data={SAMPLE_PIE_SLICES}
              donutHole={pieDonutHole}
              height={height}
              showWatermark={showWatermark}
            />
          )}

          {selectedChartId === "choropleth" && (
            <VortexChoroplethMap
              regions={SAMPLE_CHOROPLETH_REGIONS}
              height={height}
              showWatermark={showWatermark}
            />
          )}
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            React Usage for {currentChart.name}
          </h3>
          <span className="text-xs text-zinc-500 font-mono">100% Pure Canvas 2D Native</span>
        </div>
        <CodeBlock code={activeCodeSnippet} language="tsx" />
      </div>
    </div>
  );
}
