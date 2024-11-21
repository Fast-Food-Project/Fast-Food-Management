"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

// Defining the types for the props that AddPageButton will receive
type AddPageButtonProps = {
  onClick: () => void; // The onClick handler passed from the parent
};

const AddPageButton: React.FC<AddPageButtonProps> = ({ onClick }) => {
  return (
    <div
      className="h-[51px] w-[115px] border border-gray-300 flex justify-center items-center rounded-lg bg-primary-100"
      style={{
        borderWidth: "0.5px", // Border thickness
      }}
    >
      <button
        className="h-full w-full flex text-[14px] gap-1 justify-center items-center text-white rounded-lg"
        onClick={onClick} // Using the onClick prop passed from the parent
      >
        <Icon
          icon="ic:round-add"
          className="text-[14px] text-gray-700 text-white " // Biểu tượng filter
        />
        Add more
      </button>
    </div>
  );
};

export default AddPageButton;
