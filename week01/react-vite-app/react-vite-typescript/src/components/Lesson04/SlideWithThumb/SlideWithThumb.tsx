import { useState } from "react";

type Props = {
  images: string[];
};

export const SlideWithThumb = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Ảnh lớn */}
      <div className="relative w-[300px] h-[300px] mb-4">
        <img
          src={images[currentIndex]}
          alt="Main"
          className="w-full h-full object-contain rounded-xl"
        />

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow px-2 py-1 rounded hover:bg-gray-100">
          &lt;
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow px-2 py-1 rounded hover:bg-gray-100">
          &gt;
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumb ${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
              index === currentIndex
                ? "border-orange-500"
                : "border-transparent hover:border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
