"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import classNames from "classnames";

type SelectionProps = {
  selection_title: string[]; // List of selection options
  SetSelection: string; // Current selected option
  onSelect: (selection: string) => void; // Function to handle selection change
  width: string;
};

const SelectionButton: React.FC<SelectionProps> = ({
  selection_title,
  SetSelection,
  onSelect,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Track whether dropdown is open

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  return (
    <div
      className={classNames(
        "relative flex justify-center items-center drop-shadow-lg", // Center content and add shadow
        "border-[0.5px] rounded-[8px]", // Default border width and radius
        width
      )}
    >
      {/* Filter button with icon */}
      <button
        onClick={toggleDropdown}
        className={classNames(
          "flex items-center gap-[4px] text-text-color", // Button styling
          "py-2 px-4 rounded-lg" // Button shape
        )}
      >
        {/* Filter icon */}
        <p>{SetSelection}</p>
        <Icon icon="ri:arrow-drop-down-line" className="text-[18px]" />{" "}
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div
          className="absolute top-[100%] left-12 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
          onClick={() => setIsOpen(false)} // Close dropdown when clicking outside
        >
          {selection_title.map((title) => (
            <button
              key={title}
              onClick={() => onSelect(title)} // Handle option selection
              className={classNames(
                "block text-[14px] w-[125px] py-2 px-6 text-left text-gray-700 hover:bg-gray-200", // Option styling
                {
                  "bg-primary-100 text-white hover:bg-primary-100":
                    SetSelection === title, // Highlight selected option
                }
              )}
            >
              {title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionButton;
