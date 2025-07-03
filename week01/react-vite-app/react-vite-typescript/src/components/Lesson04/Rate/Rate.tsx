import { Star } from "lucide-react";
import React, { useState } from "react";

const Rate: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-1 text-2xl cursor-pointer items-center">
      <span>Rate: </span>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          onClick={() => setRating(star)}>
          <span
            className={`${
              (hover ?? rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}>
            <Star />
          </span>
        </span>
      ))}
    </div>
  );
};

export default Rate;
