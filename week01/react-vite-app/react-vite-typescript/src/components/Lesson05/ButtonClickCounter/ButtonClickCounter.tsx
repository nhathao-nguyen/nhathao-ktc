import { useState } from "react";

export default function ButtonClickCounter() {
  // const [count, setCount] = useState(0);
  const [count, setCount] = useState(0);
  return (
    <>
      {/* <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
        Click Me
      </button>
      <p className="mt-2 text-gray-700">Clicked: {count} times</p> */}

      <button
        className={
          "bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600"
        }
        onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p className="mt-2 text-red-600">Clicked: {count}</p>
    </>
  );
}
