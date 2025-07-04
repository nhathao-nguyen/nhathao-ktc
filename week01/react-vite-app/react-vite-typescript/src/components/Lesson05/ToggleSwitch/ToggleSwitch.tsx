import { useState } from "react";

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOn(!isOn)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {isOn ? "Turn OFF" : "Turn ON"}
      </button>
      <p className="mt-2 text-gray-700">State: {isOn ? "ON" : "OFF"}</p>
    </>
  );
}
