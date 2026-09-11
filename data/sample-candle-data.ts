import type { Candle, PriceLine } from "vortex-charts";

// SPY 60 bougies quotidiennes réalistes
const START_TIME_DAILY = new Date("2026-06-01T09:30:00Z").getTime();
const ONE_DAY_MS = 86400 * 1000;

export const SPY_CANDLES: Candle[] = Array.from({ length: 60 }, (_, i) => {
  const baseTime = START_TIME_DAILY + i * ONE_DAY_MS;
  const basePrice = 575 + Math.sin(i / 6) * 6 + (i * 0.15);
  const open = Math.round((basePrice + (Math.sin(i) * 0.8)) * 100) / 100;
  const close = Math.round((basePrice + (Math.cos(i) * 0.9)) * 100) / 100;
  const high = Math.round((Math.max(open, close) + Math.random() * 0.8 + 0.2) * 100) / 100;
  const low = Math.round((Math.min(open, close) - Math.random() * 0.8 - 0.2) * 100) / 100;
  const volume = Math.floor(400000 + Math.random() * 800000);
  return { t: baseTime, open, high, low, close, volume };
});

export const SPY_PRICE_LINES: PriceLine[] = [
  { price: 586.40, color: "#f43f5e", title: "Swing High (20j)", lineStyle: "dashed" },
  { price: 571.20, color: "#10b981", title: "Swing Low (20j)", lineStyle: "dashed" },
  { price: 582.85, color: "#38bdf8", title: "Spot Price", lineStyle: "solid", lineWidth: 2 },
];

export const SPY_SWING_HIGH = 586.40;
export const SPY_SWING_LOW = 571.20;
export const SPY_SPOT_PRICE = 582.85;
export const SPY_ATR_BOUNDS = {
  upper: 588.50,
  lower: 568.90,
};

// QQQ 60 bougies quotidiennes
export const QQQ_CANDLES: Candle[] = Array.from({ length: 60 }, (_, i) => {
  const baseTime = START_TIME_DAILY + i * ONE_DAY_MS;
  const basePrice = 485 + Math.cos(i / 5) * 8 + (i * 0.2);
  const open = Math.round((basePrice + (Math.sin(i * 1.5) * 1.1)) * 100) / 100;
  const close = Math.round((basePrice + (Math.cos(i * 1.5) * 1.2)) * 100) / 100;
  const high = Math.round((Math.max(open, close) + Math.random() * 1.2 + 0.3) * 100) / 100;
  const low = Math.round((Math.min(open, close) - Math.random() * 0.8 - 0.2) * 100) / 100;
  const volume = Math.floor(600000 + Math.random() * 1200000);
  return { t: baseTime, open, high, low, close, volume };
});

export const QQQ_SWING_HIGH = 494.50;
export const QQQ_SWING_LOW = 478.10;
export const QQQ_SPOT_PRICE = 491.20;
export const QQQ_ATR_BOUNDS = {
  upper: 496.00,
  lower: 476.00,
};

// NVDA 60 bougies quotidiennes
export const NVDA_CANDLES: Candle[] = Array.from({ length: 60 }, (_, i) => {
  const baseTime = START_TIME_DAILY + i * ONE_DAY_MS;
  const basePrice = 125 + Math.sin(i / 4) * 4 + (i * 0.12);
  const open = Math.round((basePrice + (Math.sin(i) * 0.6)) * 100) / 100;
  const close = Math.round((basePrice + (Math.cos(i) * 0.7)) * 100) / 100;
  const high = Math.round((Math.max(open, close) + Math.random() * 0.9 + 0.2) * 100) / 100;
  const low = Math.round((Math.min(open, close) - Math.random() * 0.9 - 0.2) * 100) / 100;
  const volume = Math.floor(1500000 + Math.random() * 3000000);
  return { t: baseTime, open, high, low, close, volume };
});

export const NVDA_SWING_HIGH = 132.80;
export const NVDA_SWING_LOW = 121.50;
export const NVDA_SPOT_PRICE = 129.45;
export const NVDA_ATR_BOUNDS = {
  upper: 135.00,
  lower: 119.00,
};
