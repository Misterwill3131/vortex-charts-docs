import type {
  Candle,
  LineSeriesPoint,
  FootprintBar,
  HeatmapData,
  ScatterPoint,
  BoxPlotItem,
  WaterfallBar,
  RadarDimension,
  RadarSeries,
  PieSlice,
  GeoRegion,
  BarDatum,
} from "vortex-charts";

// 1. Line Chart Data (Close Price Trajectory)
export const SAMPLE_LINE_SERIES: LineSeriesPoint[] = Array.from({ length: 30 }, (_, i) => {
  const base = 560;
  const trend = Math.sin(i / 4) * 8 + i * 0.6;
  const noise = (Math.sin(i * 13) * 2);
  return {
    price: +(base + trend + noise).toFixed(2),
    label: `Day ${i + 1}`,
  };
});

// 2. OHLC Bars & Heikin-Ashi Data
export const SAMPLE_OHLC_CANDLES: Candle[] = Array.from({ length: 35 }, (_, i) => {
  const open = 550 + Math.sin(i / 3) * 12 + i * 0.8;
  const move = (Math.cos(i * 7) * 3);
  const close = open + move;
  const high = Math.max(open, close) + Math.abs(Math.sin(i * 5) * 2.5) + 0.5;
  const low = Math.min(open, close) - Math.abs(Math.cos(i * 3) * 2.5) - 0.5;
  return {
    t: 1710000000 + i * 86400,
    open: +open.toFixed(2),
    high: +high.toFixed(2),
    low: +low.toFixed(2),
    close: +close.toFixed(2),
    volume: Math.floor(45000 + Math.abs(Math.sin(i)) * 30000),
  };
});

// 3. Footprint Order Flow Clusters
export const SAMPLE_FOOTPRINT_BARS: FootprintBar[] = Array.from({ length: 7 }, (_, bIdx) => {
  const open = 565 + bIdx * 1.5;
  const close = open + (bIdx % 2 === 0 ? 1.5 : -1.0);
  const high = Math.max(open, close) + 1.0;
  const low = Math.min(open, close) - 1.0;
  const levels = [];
  let totalVol = 0;

  for (let p = low; p <= high; p += 0.5) {
    const bid = Math.floor(120 + Math.abs(Math.sin(p * 11 + bIdx)) * 350);
    const ask = Math.floor(110 + Math.abs(Math.cos(p * 7 + bIdx)) * 340);
    totalVol += bid + ask;
    levels.push({
      price: +p.toFixed(2),
      bidVolume: bid,
      askVolume: ask,
      delta: ask - bid,
    });
  }

  return {
    t: 1710000000 + bIdx * 300,
    open: +open.toFixed(2),
    high: +high.toFixed(2),
    low: +low.toFixed(2),
    close: +close.toFixed(2),
    totalVolume: totalVol,
    levels,
  };
});

// 4. Multi-Series Line Data
export const SAMPLE_MULTI_SERIES = [
  {
    name: "SPY (S&P 500)",
    color: "#38bdf8",
    data: Array.from({ length: 25 }, (_, i) => +(560 + Math.sin(i / 3) * 8 + i * 0.7).toFixed(2)),
  },
  {
    name: "QQQ (Nasdaq 100)",
    color: "#10b981",
    data: Array.from({ length: 25 }, (_, i) => +(480 + Math.sin(i / 2.5) * 12 + i * 1.1).toFixed(2)),
  },
  {
    name: "NVDA (Beta Leader)",
    color: "#c084fc",
    data: Array.from({ length: 25 }, (_, i) => +(120 + Math.sin(i / 2) * 15 + i * 1.8).toFixed(2)),
  },
];

// 5. Scatter Plot (Volatility vs Return)
export const SAMPLE_SCATTER_POINTS: ScatterPoint[] = [
  { x: 12, y: 18, size: 8, label: "AAPL", color: "#38bdf8" },
  { x: 15, y: 22, size: 9, label: "MSFT", color: "#38bdf8" },
  { x: 28, y: 48, size: 14, label: "NVDA", color: "#10b981" },
  { x: 32, y: 35, size: 11, label: "TSLA", color: "#f43f5e" },
  { x: 18, y: 24, size: 8, label: "AMZN", color: "#38bdf8" },
  { x: 14, y: 15, size: 7, label: "GOOGL", color: "#38bdf8" },
  { x: 24, y: 31, size: 10, label: "META", color: "#10b981" },
  { x: 10, y: 9, size: 6, label: "BRK.B", color: "#eab308" },
  { x: 16, y: 14, size: 7, label: "JPM", color: "#eab308" },
  { x: 38, y: 55, size: 12, label: "SMCI", color: "#f43f5e" },
];

// 6. Heatmap Correlation Matrix
export const SAMPLE_HEATMAP: HeatmapData = {
  xLabels: ["SPY", "QQQ", "NVDA", "AAPL", "MSFT", "TSLA", "BTC"],
  yLabels: ["SPY", "QQQ", "NVDA", "AAPL", "MSFT", "TSLA", "BTC"],
  values: [
    [1.00, 0.92, 0.78, 0.85, 0.88, 0.62, 0.41],
    [0.92, 1.00, 0.86, 0.89, 0.91, 0.68, 0.48],
    [0.78, 0.86, 1.00, 0.72, 0.76, 0.71, 0.52],
    [0.85, 0.89, 0.72, 1.00, 0.82, 0.54, 0.35],
    [0.88, 0.91, 0.76, 0.82, 1.00, 0.58, 0.39],
    [0.62, 0.68, 0.71, 0.54, 0.58, 1.00, 0.59],
    [0.41, 0.48, 0.52, 0.35, 0.39, 0.59, 1.00],
  ],
  minValue: 0,
  maxValue: 1,
};

// 7. Area Chart (Portfolio Equity Curve)
export const SAMPLE_AREA_DATA = Array.from({ length: 30 }, (_, i) => ({
  y: Math.round(100000 + i * 1500 + Math.sin(i / 3) * 6000),
  label: `Day ${i + 1}`,
}));

// 8. Box Plot (Sector Return Distributions)
export const SAMPLE_BOX_PLOT: BoxPlotItem[] = [
  { label: "Tech", min: -4.2, q1: 1.5, median: 4.8, q3: 8.2, max: 13.5, outliers: [18.2] },
  { label: "Financials", min: -2.8, q1: 0.8, median: 2.4, q3: 4.6, max: 8.1 },
  { label: "Energy", min: -6.5, q1: -1.2, median: 1.8, q3: 5.5, max: 11.0, outliers: [-9.8] },
  { label: "Healthcare", min: -1.5, q1: 0.5, median: 1.9, q3: 3.4, max: 6.2 },
  { label: "Consumer", min: -3.0, q1: 0.2, median: 2.1, q3: 4.1, max: 7.5 },
];

// 9. Waterfall Chart (Quarterly PnL Walk)
export const SAMPLE_WATERFALL: WaterfallBar[] = [
  { label: "Starting Cash", value: 120000, isTotal: true },
  { label: "Option Prem.", value: 45000 },
  { label: "Long Stock", value: 28000 },
  { label: "Short Covers", value: -14000 },
  { label: "Hedging Fees", value: -6500 },
  { label: "Dividends", value: 4200 },
  { label: "Ending Cash", value: 176700, isTotal: true },
];

// 10. Radar / Spider Multi-Factor Asset Scores
export const SAMPLE_RADAR_DIMENSIONS: RadarDimension[] = [
  { name: "Momentum", max: 100 },
  { name: "Quality", max: 100 },
  { name: "Value", max: 100 },
  { name: "Growth", max: 100 },
  { name: "Volatility", max: 100 },
  { name: "Liquidity", max: 100 },
];

export const SAMPLE_RADAR_SERIES: RadarSeries[] = [
  {
    name: "NVDA",
    values: [96, 92, 42, 98, 85, 95],
    color: "#10b981",
    fillOpacity: 0.25,
  },
  {
    name: "SPY",
    values: [74, 82, 65, 70, 45, 99],
    color: "#38bdf8",
    fillOpacity: 0.2,
  },
];

// 11. Donut / Pie Allocation
export const SAMPLE_PIE_SLICES: PieSlice[] = [
  { label: "Mega-Cap Tech", value: 42, color: "#38bdf8" },
  { label: "Semiconductors", value: 24, color: "#10b981" },
  { label: "Crypto / BTC", value: 14, color: "#eab308" },
  { label: "Options Cash", value: 12, color: "#c084fc" },
  { label: "Precious Metals", value: 8, color: "#f97316" },
];

// 12. Choropleth Map (Global Regional Markets)
export const SAMPLE_CHOROPLETH_REGIONS: GeoRegion[] = [
  {
    id: "NA",
    name: "North America",
    value: 88,
    polygons: [
      {
        points: [
          [0.15, 0.20],
          [0.35, 0.20],
          [0.32, 0.48],
          [0.20, 0.45],
        ],
      },
    ],
  },
  {
    id: "EU",
    name: "Europe",
    value: 64,
    polygons: [
      {
        points: [
          [0.45, 0.22],
          [0.58, 0.22],
          [0.56, 0.42],
          [0.46, 0.40],
        ],
      },
    ],
  },
  {
    id: "APAC",
    name: "Asia Pacific",
    value: 78,
    polygons: [
      {
        points: [
          [0.65, 0.25],
          [0.85, 0.25],
          [0.82, 0.60],
          [0.68, 0.58],
        ],
      },
    ],
  },
  {
    id: "LATAM",
    name: "Latin America",
    value: 46,
    polygons: [
      {
        points: [
          [0.25, 0.52],
          [0.35, 0.52],
          [0.32, 0.82],
          [0.26, 0.78],
        ],
      },
    ],
  },
];

// 13. Bar Chart (Categorical Greeks / PnL)
export const SAMPLE_BAR_GREEKS: BarDatum[] = [
  { x: 1, label: "Delta", value: 142 },
  { x: 2, label: "Gamma", value: 38 },
  { x: 3, label: "Theta", value: -84 },
  { x: 4, label: "Vega", value: -45 },
  { x: 5, label: "Rho", value: 12 },
];
