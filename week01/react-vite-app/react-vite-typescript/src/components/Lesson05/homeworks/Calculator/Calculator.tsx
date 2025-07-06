import React, { useState } from "react";

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "-"],
  ["0", ".", "C", "+"],
  ["=", "", "", ""], // nút = lên đầu dòng, chiếm 3 ô sau
];

export const Calculator = () => {
  const [display, setDisplay] = useState("");

  const handleClick = (value: string) => {
    if (value === "C") {
      setDisplay("");
    } else if (value === "=") {
      try {
        const safeExpression = display.replace(/x/g, "*");
        const result = eval(safeExpression);
        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-gray-800 rounded-2xl shadow-xl">
      <div className="bg-black text-white text-right text-3xl p-4 rounded mb-4 min-h-[64px] break-words">
        {display || "0"}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((row, rowIndex) =>
          row.map((btn, colIndex) => {
            if (btn === "") return <div key={`${rowIndex}-${colIndex}`} />;

            const isEqual = btn === "=";
            const baseStyle =
              "text-white text-xl font-semibold p-4 rounded transition-all";

            const isOperator = ["+", "-", "x", "/"].includes(btn);

            const btnStyle = isEqual
            ? "col-span-4 h-16 bg-green-500 hover:bg-green-600"
            : btn === "C"
            ? "bg-red-500 hover:bg-red-600 aspect-square"
            : isOperator
            ? "bg-orange-500 hover:bg-orange-600 aspect-square"
            : "bg-gray-700 hover:bg-gray-600 aspect-square";


            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(btn)}
                className={`w-full ${btnStyle} ${baseStyle}`}
              >
                {btn}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
