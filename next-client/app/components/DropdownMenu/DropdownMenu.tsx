import React, { JSX, useEffect, useRef, useState } from "react";
import Button from "../Button";

type DropdownOption = {
  action: () => void;
  label: string;
};

type Props = {
  label: string | JSX.Element;
  options: Array<DropdownOption>;
};

const DropdownMenu = ({ label, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to track the dropdown element
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DropdownOption) => {
    setIsOpen(false); // Close the dropdown after selecting an option
    option.action();
    // Add specific functionality based on the option here if needed
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button variant="secondary" handler={toggleDropdown}>
        {label}
      </Button>
      {isOpen && (
        <div className="absolute mt-1 w-[200px] bg-white border border-gray-200 rounded shadow-sm z-10">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => handleOptionClick(option)}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 text-sm"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
