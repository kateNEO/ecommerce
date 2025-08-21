import { useState } from 'react';

export type FilterProps = {
  title: string;
  options: string[];
  selected: string[];
  onChange: (title: string, option: string, isChecked: boolean) => void;
};

export function Filter({ title, options, selected, onChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center text-left font-medium text-black text-sm uppercase tracking-wide hover:text-[#9a2ee8] transition"
      >
        {title}
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </button>
      <div
        className={`mt-3 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {/* {isOpen && ( */}
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-black cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(e) => onChange(title, option, e.target.checked)}
                className="w-4 h-4 text-black accent-black"
              />
              {option}
              {/* <label key={option}>{option}</label> */}
            </label>
          ))}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
