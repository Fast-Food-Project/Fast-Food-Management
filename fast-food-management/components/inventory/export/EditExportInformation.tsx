"use client";
import { RequestExportList } from "@/constants/data";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import InputEdit from "../../shared/input/InputEdit";
import InputDate from "../../shared/input/InputDate";
import InputSelection from "@/components/shared/input/InputSelection";

type UserTable = {
  id: string;
  createAt: Date;
  createBy: string;
  quantity: number;
  staffId: string; // Chỉ một staffId, không phải mảng nữa
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

const EditExportInformation = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string
  const cleanId = typeof id === "string" ? id.replace("edit-", "") : "";

  const [item, setItem] = useState<UserTable | null>(null);
  const [updatedItem, setUpdatedItem] = useState<UserTable | null>(null);

  useEffect(() => {
    if (cleanId) {
      const foundItem = RequestExportList.find((item) => item.id === cleanId);
      setItem(foundItem || null);
      setUpdatedItem(foundItem || null);
    }
  }, [cleanId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value,
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
      // Cập nhật cả staffId và staffName
      setUpdatedItem({
        ...updatedItem,
        staffId: selectedId,
        staffName: staffMapping[selectedId], // staffName sẽ tự động thay đổi khi chọn staffId
      });
    }
  };

  const formatDate = (date: Date | string): string => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime()) // Check for a valid date
      ? parsedDate.toISOString()
      : ""; // Return empty string if invalid date
  };

  if (!item) {
    return <div>Loading...</div>;
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

      {/* Chuyển options thành mảng các chuỗi */}
      <InputSelection
        options={Object.keys(staffMapping)}
        titleInput="Staff id"
        width="w-[536px]"
        value={updatedItem?.staffId ?? ""} // Chỉ dùng staffId ở đây
        onChange={(value) =>
          handleStaffChange(value as keyof typeof staffMapping)
        } // Cập nhật staffId và staffName
      />

      <InputEdit
        titleInput="Staff name"
        width="w-[536px]"
        value={updatedItem?.staffName ?? ""}
        onChange={handleChange}
        name="staffName"
        placeholder="Staff Name"
      />
    </div>
  );
};

export default EditExportInformation;
