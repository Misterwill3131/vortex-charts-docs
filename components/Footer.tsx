import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[rgba(160,200,230,0.1)] bg-[#020616] py-8 text-center text-xs text-[#8290a5]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono">
          <span className="font-bold text-white">VorteX<span className="text-[#38bdf8]">bot.app</span></span>
          <span>•</span>
          <span>VortexLIB v0.8.0</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Misterwill3131/vortex-charts"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#38bdf8] transition-colors"
          >
            GitHub Repository
          </a>
          <a
            href="https://vortexbot.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#38bdf8] transition-colors"
          >
            VorteXbot Platform
          </a>
        </div>
        <p className="text-[11px]">
          100% Propriétaire • 0% TradingView • Canvas 2D Retina
        </p>
      </div>
    </footer>
  );
};
