import { useState } from "react";

export default function InputTracker() {
  const [input, setInput] = useState("");
  return (
    // <>
    //   <input
    //     type="text"
    //     onChange={(e) => setInput(e.target.value)}
    //     className="border rounded px-3 py-2 w-full"
    //     placeholder="Type something..."
    //   />
    //   <p className="mt-2 text-gray-700">You typed: {input || "nothing"}</p>
    // </>
    <>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        placeholder="Type Something"
      />
      <p className="mt-2 text-gray-700">You type:{input || "nothing"}</p>
    </>
  );
}
