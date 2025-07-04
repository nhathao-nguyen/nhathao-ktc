import { useState } from "react";

export default function HoverHighlight() {
  // const [hover, setHover] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <>
      {/* <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`p-4 border rounded text-center cursor-pointer ${
          hover ? "bg-yellow-200" : "bg-white"
        }`}>
        Hover me!
      </div> */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`p-4 border rounded text-center cursor-pointer ${
          hover ? "bg-yellow-200" : "bg-white"
        }`}>
        Hover me!
      </div>
    </>
  );
}
