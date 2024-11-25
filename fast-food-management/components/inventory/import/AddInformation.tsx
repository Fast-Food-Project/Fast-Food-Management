"use client";
import React, { useState } from "react";
import InputEdit from "../../shared/input/InputEdit";
import InputDate from "../../shared/input/InputDate";

type UserTable = {
  id: string;
  createAt: Date;
  createBy: string;
  quantity: number;
};

const AddInformation = () => {
  const [updatedItem, setUpdatedItem] = useState<UserTable | null>(null); // Lưu trạng thái chỉnh sửa

  // Hàm cập nhật khi người dùng chỉnh sửa
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value, // Update the value dynamically
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

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <InputEdit
        titleInput="ID"
        width="w-[536px]"
        onChange={handleChange}
        name="id" // Pass name to identify the field
        placeholder="Enter ID"
      />

      <InputDate
        titleInput="Created at"
        width="w-[536px]"
        onChange={handleDateChange}
      />

      <InputEdit
        titleInput="Quantity"
        width="w-[536px]"
        onChange={handleChange}
        name="quantity" // Pass name to identify the field
        placeholder="Enter Quantity"
      />

      <InputEdit
        titleInput="Created by"
        width="w-[536px]"
        onChange={handleChange}
        name="createBy" // Pass name to identify the field
        placeholder="Enter Creator"
      />
    </div>
  );
};

export default AddInformation;
