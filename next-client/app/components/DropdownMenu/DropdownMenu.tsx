import React, { useState } from "react";
import Button from "../Button";
import { FaCaretDown } from "react-icons/fa";

type DropdownOption = {
  action: () => void;
  label: string;
};

type Props = {
  label: string;
  options: Array<DropdownOption>;
};

const DropdownMenu = ({ label, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DropdownOption) => {
    setIsOpen(false); // Close the dropdown after selecting an option
    option.action();
    // Add specific functionality based on the option here if needed
  };

  return (
    <div className="relative inline-block">
      <Button variant="default" handler={toggleDropdown}>
        File <FaCaretDown />
      </Button>
      {isOpen && (
        <div className="absolute mt-1 w-[164px] bg-white border border-gray-200 rounded shadow-lg z-10">
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
