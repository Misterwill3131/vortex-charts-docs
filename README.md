# VortexLIB Documentation & Showcase (`vortex-charts-docs`)

Site web officiel de documentation technique et de vitrine interactive pour la bibliothèque graphique financière **VortexLIB (`vortex-charts`)** propulsée par **VorteXbot.app**.

## 🚀 Fonctionnalités

- **Aperçus Interactifs en Direct** : Démonstrations en temps réel de `<VortexCandleChart />`, `<VortexRangeChart />`, `<VortexConeChart />` et `<VortexChartControls />`.
- **Galeries HD Annotées** : Captures d'écran haute résolution détaillant les indicateurs financiers (Swing High/Low 20j, Prior-Day, Premarket, VWAP, Expected Move, Règle de mesure).
- **Playground Interactif** : Bac à sable permettant de tester les graphiques sur SPY, QQQ, NVDA, avec réglage de hauteur, bascule de filigrane et génération de code TypeScript en temps réel.
- **Référence API Complète** : Documentation exhaustive des interfaces TypeScript, des fonctions mathématiques du moteur Canvas 2D et des tokens de design system (`VORTEX_THEME`).
- **100% Canvas 2D Propriétaire** : Zéro dépendance externe TradingView.

## 🛠️ Stack Technique

- [Next.js 16 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [vortex-charts v0.8.0](https://github.com/Misterwill3131/vortex-charts)

## 📦 Installation & Lancement Local

```bash
# Cloner le dépôt
git clone https://github.com/Misterwill3131/vortex-charts-docs.git
cd vortex-charts-docs

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🚢 Déploiement

Le site est optimisé pour être déployé sur **Vercel** en 1 clic :
- Domaine cible : `charts.vortexbot.app`
- Build command : `npm run build`
- Output directory : `.next`

---
© 2026 VorteXbot.app — Tous droits réservés.
