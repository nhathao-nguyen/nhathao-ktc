import { useState } from "react";

export default function DoubleClickMessage() {
  const [show, setShow] = useState(false);
  const handleDoubleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };
  return (
    <>
      <button
        onDoubleClick={handleDoubleClick}
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
        Double Click Me
      </button>
      {show && (
        <p className="mt-2 text-red-500 font-semibold">Double-clicked!</p>
      )}
    </>
  );
}
