"use client";
import React, { useState } from "react";
import InputEdit from "../../shared/input/InputEdit";
import InputDate from "../../shared/input/InputDate";
import InputSelection from "@/components/shared/input/InputSelection";

type UserTable = {
  id: string;
  createAt: Date;
  createBy: string;
  quantity: number;
  staffId: string; // Only one staffId now
  staffName: string;
};

const staffMapping: Record<"S101" | "S102" | "S103" | "S104" | "S105", string> =
  {
    S101: "John",
    S102: "Jane",
    S103: "Alice",
    S104: "Bob",
    S105: "Emma",
  }; // Map staffId to staffName

const AddExportInformation = () => {
  // Initialize the state with default values
  const [updatedItem, setUpdatedItem] = useState<UserTable>({
    id: "",
    createAt: new Date(),
    createBy: "",
    quantity: 0,
    staffId: "", // Default to an empty string
    staffName: "", // Default to an empty string
  });

  // Update state when user changes input values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value, // Dynamically update the state
      });
    }
  };

  const handleDateChange = (date: string) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        createAt: new Date(date),
      });
    }
  };

  const handleStaffChange = (selectedId: keyof typeof staffMapping) => {
    if (updatedItem) {
      // Update both staffId and staffName
      setUpdatedItem({
        ...updatedItem,
        staffId: selectedId,
        staffName: staffMapping[selectedId], // Automatically set the staffName
      });
    }
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <InputEdit
        titleInput="ID"
        width="w-[536px]"
        onChange={handleChange}
        name="id"
        placeholder="Enter ID"
        value={updatedItem.id} // Display the current value of ID
      />

      <InputDate
        titleInput="Created at"
        width="w-[536px]"
        onChange={handleDateChange}
        value={updatedItem.createAt.toISOString()} // Display the current value of the date
      />

      <InputEdit
        titleInput="Quantity"
        width="w-[536px]"
        onChange={handleChange}
        name="quantity"
        placeholder="Enter Quantity"
        value={updatedItem.quantity.toString()} // Display the current value of Quantity
      />

      <InputEdit
        titleInput="Created by"
        width="w-[536px]"
        onChange={handleChange}
        name="createBy"
        placeholder="Enter Creator"
        value={updatedItem.createBy} // Display the current value of Creator
      />

      <InputSelection
        options={Object.keys(staffMapping)}
        titleInput="Staff id"
        width="w-[536px]"
        value={updatedItem.staffId} // Bind the value to staffId
        onChange={
          (value) => handleStaffChange(value as keyof typeof staffMapping) // Update staffId and staffName
        }
      />

      <InputEdit
        titleInput="Staff name"
        width="w-[536px]"
        value={updatedItem.staffName} // Display the staffName based on staffId
        onChange={handleChange}
        name="staffName"
        placeholder="Staff Name"
      />
    </div>
  );
};

export default AddExportInformation;
