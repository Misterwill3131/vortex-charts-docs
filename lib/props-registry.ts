export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
}

export const CANDLE_CHART_PROPS: PropDefinition[] = [
  {
    name: "candles",
    type: "Candle[]",
    required: true,
    description: "Tableau de bougies OHLCV ({ t: number, open, high, low, close, volume? }). Trié automatiquement par timestamp.",
  },
  {
    name: "priceLines",
    type: "PriceLine[]",
    defaultValue: "[]",
    description: "Lignes de prix horizontales (Swing High, Swing Low, Stop Loss, Take Profit) avec label d'axe et style configurable.",
  },
  {
    name: "swingHigh",
    type: "number",
    defaultValue: "undefined",
    description: "Niveau de résistance majeur (Swing High 20j). Trace une ligne pointillée rose sur le graphique.",
  },
  {
    name: "swingLow",
    type: "number",
    defaultValue: "undefined",
    description: "Niveau de support majeur (Swing Low 20j). Trace une ligne pointillée verte émeraude.",
  },
  {
    name: "spotPrice",
    type: "number",
    defaultValue: "undefined",
    description: "Prix courant en temps réel. Trace une ligne pleine cyan avec badge de prix sur l'axe Y.",
  },
  {
    name: "atrBounds",
    type: "{ upper?: number; lower?: number }",
    defaultValue: "undefined",
    description: "Limites de volatilité ATR (Average True Range) projetées pour la séance.",
  },
  {
    name: "height",
    type: "number",
    defaultValue: "300",
    description: "Hauteur du conteneur en pixels. La largeur s'adapte automatiquement de façon 100% responsive via ResizeObserver.",
  },
  {
    name: "className",
    type: "string",
    defaultValue: '""',
    description: "Classes Tailwind ou CSS additionnelles pour le conteneur englobant.",
  },
  {
    name: "isIntraday",
    type: "boolean",
    defaultValue: "false",
    description: "Si true, formate les labels de temps en format horaire (HH:mm) plutôt qu'en date (MM/DD).",
  },
  {
    name: "showWatermark",
    type: "boolean",
    defaultValue: "true",
    description: 'Affiche le filigrane officiel propriétaire VorteXbot.app intégré directement au Canvas 2D.',
  },
  {
    name: "showControls",
    type: "boolean",
    defaultValue: "true",
    description: "Affiche la barre d'outils flottante glassmorphique (Zoom+, Zoom-, Outil Règle, Reset/Fit, Badge de zoom).",
  },
  {
    name: "theme",
    type: "Partial<VortexTheme>",
    defaultValue: "{}",
    description: "Surcharge partielle des tokens de couleurs (background, grid, bull, bear, text, etc.).",
  },
];

export const RANGE_CHART_PROPS: PropDefinition[] = [
  {
    name: "candles",
    type: "Candle[]",
    required: true,
    description: "Bougies intraday (1m, 5m, 15m) de la séance active.",
  },
  {
    name: "priorDay",
    type: "PriorDayRange | null",
    defaultValue: "null",
    description: "Boîte de session veille ({ high, low, mid }). Rendue en zone ombrée semi-transparente.",
  },
  {
    name: "premarket",
    type: "PremarketRange | null",
    defaultValue: "null",
    description: "Boîte de session pré-marché ({ high, low, mid }). Rendue en zone cyan douce.",
  },
  {
    name: "vwapSeries",
    type: "VwapPoint[]",
    defaultValue: "[]",
    description: "Série de points VWAP ({ t, vwap }) tracée en courbe fluide cyan avec épaisseur 2px.",
  },
  {
    name: "overlayMode",
    type: '"all" | "boxes" | "vwap" | "none"',
    defaultValue: '"all"',
    description: "Mode d'affichage sélectif des calques : toutes les boîtes + VWAP, boîtes seules, VWAP seul, ou chandeliers nus.",
  },
  {
    name: "height",
    type: "number",
    defaultValue: "300",
    description: "Hauteur du canvas en pixels.",
  },
  {
    name: "showWatermark",
    type: "boolean",
    defaultValue: "true",
    description: "Affichage du watermark VorteXbot.app.",
  },
  {
    name: "showControls",
    type: "boolean",
    defaultValue: "true",
    description: "Activation de la barre d'outils de navigation et règle interactive.",
  },
];

export const CONE_CHART_PROPS: PropDefinition[] = [
  {
    name: "candles",
    type: "Candle[]",
    required: false,
    description: "Bougies récentes servant de contexte à gauche du graphique.",
  },
  {
    name: "historicalCandles",
    type: "Candle[]",
    required: false,
    description: "Historique complémentaire pour le calibrage de la volatilité passée.",
  },
  {
    name: "currentPrice",
    type: "number",
    required: false,
    description: "Prix de référence initial à partir duquel le cône d'incertitude se propage.",
  },
  {
    name: "spotPrice",
    type: "number",
    required: false,
    description: "Prix spot actuel. Utilisé si currentPrice n'est pas spécifié.",
  },
  {
    name: "expectedMove",
    type: "ExpectedMoveSpec",
    required: false,
    description: "Spécification du mouvement attendu d'options ({ movePct, moveAbs, strike?, expiration, dte? }).",
  },
  {
    name: "targetRange",
    type: "TargetRange",
    required: false,
    description: "Fourchette cible dérivée de l'Expected Move ({ high, low }).",
  },
  {
    name: "dte",
    type: "number",
    defaultValue: "1",
    description: "Jours restants jusqu'à expiration (Days To Expiration) définissant l'ouverture de l'entonnoir temporel.",
  },
  {
    name: "height",
    type: "number",
    defaultValue: "280",
    description: "Hauteur du graphique en pixels.",
  },
  {
    name: "showWatermark",
    type: "boolean",
    defaultValue: "true",
    description: "Affichage du watermark VorteXbot.app.",
  },
];
