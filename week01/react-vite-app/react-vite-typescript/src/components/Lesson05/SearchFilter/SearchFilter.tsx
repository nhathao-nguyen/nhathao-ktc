import { useState } from 'react';

export default function SearchFilter() {
  const [search, setSearch] = useState('');
  const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple'];

  const filtered = items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <ul className="mt-3 list-disc pl-5 text-gray-700">
        {filtered.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}