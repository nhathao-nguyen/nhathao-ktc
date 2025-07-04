import React, { useState } from "react";

type AccordionItem = {
  title: string;
  content: string;
};

type Props = {
  data: AccordionItem[];
  mode?: "single" | "multi"; // Default: single
};

const Accordion: React.FC<Props> = ({ data, mode = "single" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggleSingle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const toggleMulti = (index: number) => {
    const newSet = new Set(openSet);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setOpenSet(newSet);
  };

  const isItemOpen = (index: number) => {
    return mode === "single" ? openIndex === index : openSet.has(index);
  };

  const handleToggle = (index: number) => {
    if (mode === "single") {
      toggleSingle(index);
    } else {
      toggleMulti(index);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-2">
      {data.map((item, index) => {
        const isOpen = isItemOpen(index);

        return (
          <div key={index} className="rounded overflow-hidden">
            {/* Nút chính */}
            <button
              onClick={() => handleToggle(index)}
              className={`w-full text-left px-4 py-3 font-semi transition-colors ${
                isOpen ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"
              }`}>
              {item.title}
            </button>

            {/* Nội dung */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 py-3 px-4 bg-white" : "max-h-0"
              }`}>
              <p className="text-sm text-gray-600">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
