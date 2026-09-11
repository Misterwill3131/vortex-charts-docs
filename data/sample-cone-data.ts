import type { Candle, ExpectedMoveSpec, TargetRange } from "vortex-charts";

// Historical candles for cone reference (past 20 days leading to 5 DTE)
const CONE_EXPIRATION_MS = new Date("2026-09-18T20:00:00Z").getTime();
const ONE_DAY_MS = 86400 * 1000;
const CONE_START_MS = CONE_EXPIRATION_MS - 25 * ONE_DAY_MS;

export const CONE_HISTORICAL_CANDLES: Candle[] = Array.from({ length: 20 }, (_, i) => {
  const baseTime = CONE_START_MS + i * ONE_DAY_MS;
  const basePrice = 120 + i * 0.45 + Math.sin(i / 3) * 2;
  const open = Math.round((basePrice + (Math.sin(i) * 0.5)) * 100) / 100;
  const close = Math.round((basePrice + (Math.cos(i) * 0.55)) * 100) / 100;
  const high = Math.round((Math.max(open, close) + 0.8) * 100) / 100;
  const low = Math.round((Math.min(open, close) - 0.8) * 100) / 100;
  return { t: baseTime, open, high, low, close };
});

export const SAMPLE_EXPECTED_MOVE: ExpectedMoveSpec = {
  movePct: 0.048,
  moveAbs: 6.20,
  expiration: "2026-09-18",
  dte: 5,
};

export const SAMPLE_TARGET_RANGE: TargetRange = {
  high: 135.50,
  low: 123.10,
};

export const CONE_CURRENT_PRICE = 129.30;
export const CONE_EXPIRATION_DATE = "2026-09-18";
