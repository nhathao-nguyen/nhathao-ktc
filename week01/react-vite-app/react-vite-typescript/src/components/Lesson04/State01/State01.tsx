import React, { useState } from "react";

type Props = {};

const State01 = (props: Props) => {
  const [SelectedButton, setSelectedButton] = useState<string>("Black");

  const colors = ["Black", "Pink", "Green"];

  return (
    <div className="flex flex-row items-center gap-4 ">
      <div>Color:</div>
      {colors.map((color) => {
        const isSelected = SelectedButton === color;
        return (
          <button
            key={color}
            onClick={() => setSelectedButton(color)}
            className={`px-4 py-2 border-1 ${
              isSelected ? "border-amber-600 text-amber-600" : "border-gray-300"
            }`}>
            {color}
          </button>
        );
      })}
    </div>
  );
};

export default State01;
