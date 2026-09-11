"use client";

import React, { useState } from "react";
import { Code2, Play, RefreshCw } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

interface InteractiveDemoProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  title,
  description,
  code,
  children,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [key, setKey] = useState<number>(0);

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="rounded-xl border border-[rgba(160,200,230,0.12)] bg-[#04091e] overflow-hidden my-6">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(160,200,230,0.08)] bg-[rgba(10,20,40,0.6)]">
        <div>
          <h3 className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            {title}
          </h3>
          {description && (
            <p className="text-[11px] text-[#8290a5] mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-0.5 rounded-lg bg-[#020616] border border-[rgba(160,200,230,0.1)]">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-[rgba(56,189,248,0.2)] text-[#38bdf8] font-semibold"
                  : "text-[#8290a5] hover:text-white"
              }`}
            >
              <Play className="w-3 h-3" />
              Aperçu Live
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === "code"
                  ? "bg-[rgba(56,189,248,0.2)] text-[#38bdf8] font-semibold"
                  : "text-[#8290a5] hover:text-white"
              }`}
            >
              <Code2 className="w-3 h-3" />
              Code
            </button>
          </div>

          {activeTab === "preview" && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-[#8290a5] hover:text-white hover:bg-[rgba(160,200,230,0.08)] transition-colors"
              title="Réinitialiser l'état du graphique"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 bg-[#020616]">
        {activeTab === "preview" ? (
          <div key={key} className="w-full">
            {children}
          </div>
        ) : (
          <div className="my-0">
            <CodeBlock code={code} />
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 border-t border-[rgba(160,200,230,0.06)] bg-[rgba(10,20,40,0.3)] flex items-center justify-between text-[11px] text-[#8290a5]">
        <span>💡 Astuce : Utilisez la molette pour zoomer, Shift+glisser pour mesurer.</span>
        <span className="font-mono text-[10px] text-[#38bdf8]">Retina HiDPI 60 FPS</span>
      </div>
    </div>
  );
};
