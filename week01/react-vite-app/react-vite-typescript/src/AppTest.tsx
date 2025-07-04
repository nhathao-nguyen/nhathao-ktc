import { useState } from "react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-xl shadow p-6 mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">{title}</h2>
      {children}
    </section>
  );
}

function ClickCounter() {
  const [count, setCount] = useState(0);
  return (
    <Section title="Exercise 1: Click Counter">
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
        Click Me
      </button>
      <p className="mt-2 text-gray-700">Clicked: {count} times</p>
    </Section>
  );
}

function InputTracker() {
  const [input, setInput] = useState("");
  return (
    <Section title="Exercise 2: Input Tracker">
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        placeholder="Type something..."
      />
      <p className="mt-2 text-gray-700">You typed: {input || "nothing"}</p>
    </Section>
  );
}

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);
  return (
    <Section title="Exercise 3: Toggle Switch">
      <button
        onClick={() => setIsOn(!isOn)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {isOn ? "Turn OFF" : "Turn ON"}
      </button>
      <p className="mt-2 text-gray-700">State: {isOn ? "ON" : "OFF"}</p>
    </Section>
  );
}

function HoverHighlight() {
  const [hover, setHover] = useState(false);
  return (
    <Section title="Exercise 4: Hover Highlight">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`p-4 border rounded text-center cursor-pointer ${
          hover ? "bg-yellow-200" : "bg-white"
        }`}>
        Hover me!
      </div>
    </Section>
  );
}

function FormSubmit() {
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`You submitted: ${input}`);
    setInput("");
  };
  return (
    <Section title="Exercise 5: Form Submission">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Submit
        </button>
      </form>
    </Section>
  );
}

function KeyPressDisplay() {
  const [key, setKey] = useState("");
  return (
    <Section title="Exercise 6: Key Press Display">
      <input
        type="text"
        onKeyDown={(e) => setKey(e.key)}
        className="border rounded px-3 py-2 w-full"
        placeholder="Press a key..."
      />
      <p className="mt-2 text-gray-700">Last key: {key}</p>
    </Section>
  );
}

function DoubleClickMessage() {
  const [show, setShow] = useState(false);
  const handleDoubleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };
  return (
    <Section title="Exercise 7: Double Click Message">
      <button
        onDoubleClick={handleDoubleClick}
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
        Double Click Me
      </button>
      {show && (
        <p className="mt-2 text-red-500 font-semibold">Double-clicked!</p>
      )}
    </Section>
  );
}

function DropdownSelection() {
  const [selected, setSelected] = useState("Apple");
  return (
    <Section title="Exercise 8: Dropdown Selection">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border rounded px-3 py-2">
        <option>Apple</option>
        <option>Banana</option>
        <option>Orange</option>
      </select>
      <p className="mt-2 text-gray-700">Selected fruit: {selected}</p>
    </Section>
  );
}

function CheckboxToggle() {
  const [checked, setChecked] = useState(false);
  return (
    <Section title="Exercise 9: Checkbox Toggle">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="w-4 h-4"
        />
        Toggle me
      </label>
      <p className="mt-2 text-gray-700">
        Checkbox is: {checked ? "checked" : "unchecked"}
      </p>
    </Section>
  );
}

function SearchFilter() {
  const [search, setSearch] = useState("");
  const items = ["Apple", "Banana", "Orange", "Grapes", "Pineapple"];

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Section title="Exercise 10: Search Filter">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <ul className="mt-3 list-disc pl-5 text-gray-700">
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        React Event Handling Practice
      </h1>
      <ClickCounter />
      <InputTracker />
      <ToggleSwitch />
      <HoverHighlight />
      <FormSubmit />
      <KeyPressDisplay />
      <DoubleClickMessage />
      <DropdownSelection />
      <CheckboxToggle />
      <SearchFilter />
    </div>
  );
}
