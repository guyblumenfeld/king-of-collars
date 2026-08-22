"use client";
import { useState } from "react";
import type { WooImage } from "@/lib/types";

export default function ProductGallery({ images, name }: { images: WooImage[]; name: string }) {
  const [active, setActive] = useState(0);
  if (!images?.length) return <div className="aspect-square bg-white rounded-2xl" />;
  return (
    <div>
      <div className="aspect-square bg-white rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active].src} alt={images[active].alt || name} className="w-full h-full object-contain" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((im, i) => (
            <button
              key={im.id}
              onClick={() => setActive(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === active ? "border-brand" : "border-transparent"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.thumbnail || im.src} alt="" className="w-full h-full object-contain bg-paper" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
