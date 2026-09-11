"use client";

import React, { useState, useEffect } from "react";
import { Maximize2, X } from "lucide-react";

export interface GalleryItem {
  title: string;
  description: string;
  src: string;
  tag: string;
}

interface ImageGalleryProps {
  items: GalleryItem[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded-xl border border-[rgba(160,200,230,0.12)] bg-[#04091e] overflow-hidden hover:border-[rgba(56,189,248,0.3)] transition-all cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] w-full bg-[#020616] overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#020616]/80 text-[#38bdf8] border border-[rgba(56,189,248,0.3)] backdrop-blur-sm">
                {item.tag}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#04091e] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-[rgba(10,20,40,0.7)] text-[#9fb0c4] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {/* Info */}
            <div className="p-3 border-t border-[rgba(160,200,230,0.08)]">
              <h4 className="text-xs font-semibold text-white">{item.title}</h4>
              <p className="text-[11px] text-[#8290a5] mt-0.5 line-clamp-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020616]/90 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#04091e] border border-[rgba(160,200,230,0.2)] rounded-2xl p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(160,200,230,0.1)]">
              <div>
                <span className="text-xs font-mono text-[#38bdf8] font-bold">
                  {selectedImage.tag}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-lg hover:bg-[rgba(160,200,230,0.1)] text-[#9fb0c4] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 max-h-[75vh] flex items-center justify-center overflow-hidden rounded-lg bg-[#020616]">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <p className="mt-3 text-xs text-[#9fb0c4]">
              {selectedImage.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
