import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';

interface CustomSelectProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label: string;
}

export default function CustomSelect({ options, selectedValue, onSelect, label }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div class="relative w-full" ref={selectRef}>
      <button
        type="button"
        class="relative w-full h-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-white text-left text-sm sm:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span class="block truncate">{selectedValue === 'Tất cả' ? label : selectedValue}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            class={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      
      <div
        class={`absolute z-10 mt-2 w-full bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-lg shadow-xl transition-all duration-200 ease-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <ul class="max-h-60 overflow-y-auto p-2">
          {options.map((option) => (
            <li
              key={option}
              class={`cursor-pointer select-none relative p-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-cyan-500/20 ${selectedValue === option ? 'bg-cyan-500/20 text-white' : ''}`}
              onClick={() => handleSelect(option)}
            >
              <span class={`block truncate ${selectedValue === option ? 'font-semibold' : 'font-normal'}`}>
                {option}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
