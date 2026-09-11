import React from "react";
import type { PropDefinition } from "../lib/props-registry";

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-[rgba(160,200,230,0.12)] my-6">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-[rgba(160,200,230,0.1)] bg-[rgba(14,25,50,0.6)] font-mono text-[11px] uppercase tracking-wider text-[#8290a5]">
            <th className="py-3 px-4 font-semibold">Prop</th>
            <th className="py-3 px-4 font-semibold">Type</th>
            <th className="py-3 px-4 font-semibold">Défaut</th>
            <th className="py-3 px-4 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(160,200,230,0.06)] bg-[#04091e]/50">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-[rgba(56,189,248,0.03)] transition-colors">
              <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                {prop.name}
                {prop.required && (
                  <span className="ml-1.5 text-[10px] text-rose-400 font-mono">*requis</span>
                )}
              </td>
              <td className="py-3 px-4 font-mono text-[#38bdf8] whitespace-nowrap">
                {prop.type}
              </td>
              <td className="py-3 px-4 font-mono text-[#8290a5] whitespace-nowrap">
                {prop.defaultValue ?? "—"}
              </td>
              <td className="py-3 px-4 text-[#9fb0c4] leading-relaxed">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
