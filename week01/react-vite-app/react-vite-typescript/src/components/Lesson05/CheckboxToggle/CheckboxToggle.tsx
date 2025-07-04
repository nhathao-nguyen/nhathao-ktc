import { useState } from 'react';

export default function CheckboxToggle() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="w-4 h-4"
        />
        Toggle me
      </label>
      <p className="mt-2 text-gray-700">Checkbox is: {checked ? 'checked' : 'unchecked'}</p>
    </>
  );
}