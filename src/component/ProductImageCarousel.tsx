"use client";
import React from "react";
import { useState } from "react";
import { ImageCarouselProps } from "@/type";

function ProductImageCarousel({ images }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-xl">
        <p>No image avaliable</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-lg mb-6 relative group">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200">
          <img
            src={images[currentImageIndex]}
            alt={`Product Image ${currentImageIndex + 1}`}
            className="w-full h-96 object-cover"
          />

          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 max-w-lg">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
            className={`flex-shrink-0 w-20 h-20 object-cover rounded-xl border-3 cursor-pointer transition-all ${
              index === currentImageIndex
                ? "border-blue-600 ring-2 ring-blue-600 ring-offset-2 scale-110"
                : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImageCarousel;
