"use client";
import SelectionButton from "@/components/shared/button/SelectionButton";
import React, { useState } from "react";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>("All");

  const handleSelect = (selection: string) => {
    setSelectedOption(selection); // Update selected option
  };

  return (
    <div className="p-4">
      <SelectionButton
        selection_title={["All", "Option 1", "Option 2", "Option 3"]}
        SetSelection={selectedOption}
        onSelect={handleSelect} // Function to handle option selection
        width="w-[125px]"
      />
      <p className="mt-4">Selected: {selectedOption}</p>
    </div>
  );
};

export default Page;
