"use client";
import { RequestExportList } from "@/constants/data";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import InputEdit from "../shared/input/InputEdit";
import InputDate from "../shared/input/InputDate";

type UserTable = {
  id: string;
  createAt: Date;
  createBy: string;
  quantity: number;
};

const EditInformation = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string

  // Remove the 'edit-' prefix if present
  const cleanId = typeof id === "string" ? id.replace("edit-", "") : "";

  const [item, setItem] = useState<UserTable | null>(null);
  const [updatedItem, setUpdatedItem] = useState<UserTable | null>(null); // Store the edited item

  useEffect(() => {
    if (cleanId) {
      const foundItem = RequestExportList.find((item) => item.id === cleanId);
      setItem(foundItem || null); // Update the item data
      setUpdatedItem(foundItem || null); // Initialize the updated item with found item
    }
  }, [cleanId]);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value, // Dynamically update the value
      });
    }
  };

  // Handle date changes from the DatePicker
  const handleDateChange = (date: string) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        createAt: new Date(date),
      });
    }
  };

  // Format the date to ISO string, or return empty if invalid
  const formatDate = (date: any): string => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime()) // Check for a valid date
      ? parsedDate.toISOString()
      : ""; // Return empty string if invalid date
  };

  if (!item) {
    return <div>Loading...</div>; // Show loading if no item is found
  }

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <InputEdit
        titleInput="ID"
        width="w-[536px]"
        value={updatedItem?.id ?? ""}
        onChange={handleChange}
        name="id"
        placeholder="Enter ID"
      />

      <InputDate
        titleInput="Created at"
        width="w-[536px]"
        value={updatedItem ? formatDate(updatedItem.createAt) : ""}
        onChange={handleDateChange}
      />

      <InputEdit
        titleInput="Quantity"
        width="w-[536px]"
        value={updatedItem?.quantity.toString() ?? ""}
        onChange={handleChange}
        name="quantity"
        placeholder="Enter Quantity"
      />

      <InputEdit
        titleInput="Created by"
        width="w-[536px]"
        value={updatedItem?.createBy ?? ""}
        onChange={handleChange}
        name="createBy"
        placeholder="Enter Creator"
      />
    </div>
  );
};

export default EditInformation;
