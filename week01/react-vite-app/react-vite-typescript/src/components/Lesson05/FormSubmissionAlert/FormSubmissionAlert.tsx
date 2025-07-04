import { useState } from 'react';

export default function FormSubmit() {
  const [input, setInput] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`You submitted: ${input}`);
    setInput('');
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </>
  );
}