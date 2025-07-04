import { useState } from "react";

type Props = {
  images: string[];
};

export const LightboxGallery = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = () => setSelectedIndex(null);
  const handlePrev = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
  const handleNext = () =>
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));

  return (
    <div className="flex flex-wrap gap-4">
      {/* Thumbnails */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`thumb-${i}`}
          className="w-32 h-32 object-cover rounded cursor-pointer"
          onClick={() => setSelectedIndex(i)}
        />
      ))}

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* Ảnh lớn */}
            <img
              src={images[selectedIndex]}
              alt="lightbox"
              className="w-full h-full object-contain rounded-md"
            />

            {/* Nút Close */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-black/60 text-white text-xl px-3 py-1 rounded hover:bg-red-600 transition">
              &times;
            </button>

            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white text-2xl px-3 py-1 rounded hover:bg-white/20">
              &#x276E;
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white text-2xl px-3 py-1 rounded hover:bg-white/20">
              &#x276F;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
