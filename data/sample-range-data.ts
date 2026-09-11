import type { Candle, PriorDayRange, PremarketRange, VwapPoint } from "vortex-charts";

// Intraday 5-minute candles (78 candles = 6.5 hours, 09:30 - 16:00 EST)
const INTRADAY_START_MS = new Date("2026-09-11T09:30:00-04:00").getTime();
const FIVE_MIN_MS = 300 * 1000;

export const INTRADAY_CANDLES: Candle[] = Array.from({ length: 78 }, (_, i) => {
  const baseTime = INTRADAY_START_MS + i * FIVE_MIN_MS;
  const basePrice = 580 + Math.sin(i / 10) * 3.5 + (i * 0.04);
  const open = Math.round((basePrice + (Math.sin(i) * 0.4)) * 100) / 100;
  const close = Math.round((basePrice + (Math.cos(i) * 0.45)) * 100) / 100;
  const high = Math.round((Math.max(open, close) + Math.random() * 0.5 + 0.1) * 100) / 100;
  const low = Math.round((Math.min(open, close) - Math.random() * 0.5 - 0.1) * 100) / 100;
  const volume = Math.floor(80000 + Math.random() * 200000);
  return { t: baseTime, open, high, low, close, volume };
});

export const SAMPLE_PRIOR_DAY: PriorDayRange = {
  high: 584.20,
  low: 577.80,
  mid: 581.00,
};

export const SAMPLE_PREMARKET: PremarketRange = {
  high: 582.60,
  low: 579.10,
  mid: 580.85,
};

export const SAMPLE_VWAP_SERIES: VwapPoint[] = INTRADAY_CANDLES.map((c, i) => {
  return {
    t: c.t,
    vwap: Math.round((580.5 + Math.sin(i / 15) * 1.8 + i * 0.03) * 100) / 100,
  };
});
