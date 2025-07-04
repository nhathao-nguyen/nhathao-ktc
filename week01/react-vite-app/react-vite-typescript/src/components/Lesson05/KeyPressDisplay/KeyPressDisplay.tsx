import { useState } from 'react';

export default function KeyPressDisplay() {
  const [key, setKey] = useState('');
  return (
    <>
      <input
        type="text"
        onKeyDown={(e) => setKey(e.key)}
        className="border rounded px-3 py-2 w-full"
        placeholder="Press a key..."
      />
      <p className="mt-2 text-gray-700">Last key: {key}</p>
    </>
  );
}
