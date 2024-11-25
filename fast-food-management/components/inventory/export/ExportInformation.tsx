"use client";
import React, { useState, useEffect } from "react";
import InputEdit from "../../shared/input/InputEdit";
import InputDate from "../../shared/input/InputDate";
import { RequestExportList } from "@/constants/data";

type UserTable = {
  id: string;
  createAt: Date;
  createBy: string;
  quantity: number;
  staffId: string; // Chỉ một staffId, không phải mảng nữa
  staffName: string;
};

const ExportInformation = ({ itemId }: { itemId: string }) => {
  const [item, setItem] = useState<UserTable | null>(null);

  useEffect(() => {
    if (itemId) {
      const foundItem = RequestExportList.find((item) => item.id === itemId);
      setItem(foundItem || null); // Update the item data
    }
  }, [itemId]);

  if (!itemId) {
    return <p>No product found for the given ID.</p>; // Display message if no item found
  }

  const handleChange = () => {};

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <InputEdit
        titleInput="ID"
        width="w-[536px]"
        placeholder="Enter ID"
        value={item ? item.id : "###"}
        onChange={handleChange}
      />

      <InputDate
        titleInput="Created at"
        width="w-[536px]"
        value={item ? item.createAt.toISOString() : ""}
        onChange={handleChange}
      />

      <InputEdit
        titleInput="Quantity"
        width="w-[536px]"
        placeholder="Enter Quantity"
        value={item ? item.quantity.toString() : "0"}
        onChange={handleChange}
      />

      <InputEdit
        titleInput="Created by"
        width="w-[536px]"
        placeholder="Enter Creator"
        value={item ? item.createBy : ""}
        onChange={handleChange}
      />

      <InputEdit
        titleInput="Created by"
        width="w-[536px]"
        placeholder="Enter Creator"
        value={item ? item.staffId : ""}
        onChange={handleChange}
      />

      <InputEdit
        titleInput="Created by"
        width="w-[536px]"
        placeholder="Enter Creator"
        value={item ? item.staffName : ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExportInformation;
