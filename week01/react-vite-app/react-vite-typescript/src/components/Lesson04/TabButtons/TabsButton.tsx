import React, { useState } from "react";

type TabData = {
  label: string;
  content: string;
};

type TabsProps = {
  tabs: TabData[];
};

const TabsButton = ({ tabs }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Tab Header */}
      <div className="flex bg-gray-100 rounded overflow-hidden">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-6 py-2 text-sm font-medium transition ${
              activeIndex === index
                ? "bg-green-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-2xl text-center text-gray-600 leading-relaxed">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default TabsButton;
