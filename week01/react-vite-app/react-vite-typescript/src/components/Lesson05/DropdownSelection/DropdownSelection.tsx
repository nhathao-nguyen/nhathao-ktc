import { useState } from "react";

export default function DropdownSelection() {
  const [selected, setSelected] = useState("Apple");
  return (
    <>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border rounded px-3 py-2">
        <option>Apple</option>
        <option>Banana</option>
        <option>Orange</option>
      </select>
      <p className="mt-2 text-gray-700">Selected fruit: {selected}</p>
    </>
  );
}
