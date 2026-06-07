"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const baseButtonClass =
  "flex w-full items-center justify-between rounded border border-white/15 px-4 py-3 text-left text-sm uppercase tracking-[0.2em] transition-colors";

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select option",
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const currentIndex = options.findIndex((option) => option.value === value);
      setHighlightIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  }, [isOpen, options, value]);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={`${baseButtonClass} ${
          value ? "text-white" : "text-white"
        } bg-black/60 hover:border-[#FF9500]/40 hover:bg-white/5`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setIsOpen(true);
            setHighlightIndex((prev) => {
              const direction = event.key === "ArrowDown" ? 1 : -1;
              const nextIndex = prev + direction;
              if (nextIndex < 0) return options.length - 1;
              if (nextIndex >= options.length) return 0;
              return nextIndex;
            });
          }
          if (event.key === "Enter" && isOpen) {
            event.preventDefault();
            if (highlightIndex >= 0) {
              handleOptionClick(options[highlightIndex].value);
            }
          }
          if (event.key === "Escape") {
            setIsOpen(false);
            setHighlightIndex(-1);
          }
        }}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`ml-3 h-5 w-5 text-white transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-40 mt-2 w-full border border-white/10 bg-black/90 backdrop-blur-lg shadow-lg"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === highlightIndex;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightIndex(index)}
                onMouseLeave={() => setHighlightIndex(-1)}
                onClick={() => handleOptionClick(option.value)}
                className={`flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer ${
                  isActive
                    ? "bg-white/15 text-white"
                    : isSelected
                    ? "bg-[#FF9500]/20 text-[#FF9500]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && <Check className="ml-3 h-4 w-4" />}
              </li>
            );
          })}
        </ul>
      )}
      <input type="hidden" value={value} required={required} />
    </div>
  );
}
