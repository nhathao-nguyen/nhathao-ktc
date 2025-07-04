import React, { useEffect, useState } from "react";

type Props = {
  images: string[];
};

export const Slide2 = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplay, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-left w-full">Slider2</h2>

      {/* Image container (bao cả ảnh + dots + nút) */}
      <div className="relative w-[600px] h-[400px]">
        {/* Ảnh chính */}
        <img
          src={images[currentIndex]}
          alt="Main"
          className="w-full h-full object-cover rounded-md"
        />

        {/* Dot indicators */}
        {!showThumbnails && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-gray-400 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}

        {/* Nút chuyển ảnh */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 text-black px-2 py-1 rounded shadow hover:bg-white">
          &#x276E;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 text-black px-2 py-1 rounded shadow hover:bg-white">
          &#x276F;
        </button>
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="flex gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumb ${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition ${
                index === currentIndex
                  ? "border-orange-500"
                  : "border-transparent hover:border-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Toggle buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setAutoplay(!autoplay)}
          className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">
          Autoplay on/OFF
        </button>
        <button
          onClick={() => setShowThumbnails(!showThumbnails)}
          className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">
          Thumbnails/ Dots
        </button>
      </div>

      {/* Trạng thái */}
      <div className="text-sm text-gray-600">
        Autoplay: <span className="font-mono">{String(autoplay)}</span> <br />
        Controls:{" "}
        <span className="font-mono">
          {showThumbnails ? "thumbnails" : "dots"}
        </span>
      </div>
    </div>
  );
};
