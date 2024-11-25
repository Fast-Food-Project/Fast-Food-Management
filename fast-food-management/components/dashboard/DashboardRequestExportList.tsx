"use client";
import React, { useEffect, useState } from "react";
import { RequestExportList } from "../../constants/data";
import { format } from "date-fns";
import LabelStatus from "../shared/label/LabelStatus";
import { PaginationProps } from "@/types/pagination";
import PaginationUI from "../shared/orther/Pagination";
import Table from "../shared/orther/Table";
import { Icon } from "@iconify/react";
import Overlay from "../shared/orther/Overlay";
import InputEdit from "../shared/input/InputEdit";
import InputDate from "../shared/input/InputDate";
import InputSelection from "../shared/input/InputSelection";
import ButtonFunction from "../shared/button/ButtonFunction";

type UserTable = {
  id: string;
  createAt: Date;
  createBy: string;
  orderId: string;
  status: number;
  quantity: number;
  staffId: string;
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

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Created At", accessor: "createAt" },
  { header: "Created By", accessor: "createBy" },
  { header: "Order Id", accessor: "orderId" },
  { header: "Status", accessor: "status" },
  { header: "Action", accessor: "action" },
];

const DashboardRequestExportList = ({
  haveHeader,
}: {
  haveHeader: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exportList, setExportList] = useState(RequestExportList); // Track the filtered/export list
  const [selectedItem, setSelectedItem] = useState<UserTable | null>(null); // Lưu thông tin item được chọn

  const rowsPerPage = 8;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = exportList.slice(startIndex, endIndex);
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages: Math.ceil(exportList.length / itemsPerPage),
    dataLength: exportList.length,
  };
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelectionChange = (value: string) => {
    console.log("Selected value:", value);
    setSelectedValue(value);
  };

  const toggleOverlay = (item: UserTable) => {
    setSelectedItem(item); // Cập nhật selectedItem khi chọn item
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleDelete = (id: string) => {
    // Hiển thị hộp thoại xác nhận
    const confirmDelete = window.confirm("Confirm delete this item?");

    if (!confirmDelete) {
      // Nếu người dùng chọn 'Hủy', thoát hàm
      return;
    }

    // Tiến hành xóa phần tử
    const updatedList = exportList.filter((item) => item.id !== id);

    // Cập nhật lại danh sách
    setExportList(updatedList);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDateChange = (date: string) => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        createAt: new Date(date),
      });
    }
  };

  const handleStaffChange = (selectedId: keyof typeof staffMapping) => {
    if (selectedItem) {
      // Cập nhật cả staffId và staffName
      setSelectedItem({
        ...selectedItem,
        staffId: selectedId,
        staffName: staffMapping[selectedId], // staffName sẽ tự động thay đổi khi chọn staffId
      });
    }
  };

  const handleSave = () => {};

  const handleCancel = () => {
    setIsOverlayOpen(false);
  };

  const formatDate = (date: Date | string): string => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime()) // Check for a valid date
      ? parsedDate.toISOString()
      : ""; // Return empty string if invalid date
  };

  const renderRow = (item: UserTable) => (
    <tr key={item.id} className="my-4 border-t border-gray-300 text-sm">
      <td className="px-4 py-2">
        <h3 className="text-base">{item.id}</h3>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">
          {format(item.createAt, "PPP")}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.createBy}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.orderId}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <div className="text-base text-text-dark-500">
          {item.status === 0 ? (
            <LabelStatus
              background="bg-light-red"
              text_color="text-dark-red"
              title="Pending"
            />
          ) : item.status === 1 ? (
            <LabelStatus
              background="bg-light-yellow"
              text_color="text-dark-yellow"
              title="In progress"
            />
          ) : (
            <LabelStatus
              background="bg-light-green"
              text_color="text-dark-green"
              title="Confirmed"
            />
          )}
        </div>
      </td>
      <td>
        <div className="flex gap-4 items-start justify-start px-4">
          <Icon
            icon="fluent:edit-16-regular"
            className="text-[18px] hover:cursor-pointer"
            onClick={() => toggleOverlay(item)} // Truyền item vào toggleOverlay
          />
          <Icon
            icon="gg:trash"
            className="text-[18px] hover:cursor-pointer"
            onClick={() => handleDelete(item.id.toString())}
          />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex size-full flex-col text-base">
      <div className=" mt-4 w-full rounded-md shadow-md">
        {haveHeader && (
          <p className="text-[22px] font-bold text-text-dark-500 p-3">
            Requests Exportation List
          </p>
        )}

        <div className="w-full px-4">
          <Table columns={columns} renderRow={renderRow} data={currentData} />
        </div>

        <div className="mt-4 flex items-center justify-center p-4 text-sm text-text-dark-500 md:justify-between">
          <PaginationUI paginationUI={paginationUI} />
        </div>
      </div>

      {/* Overlay */}
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)} // Đóng overlay khi nhấp ngoài
        header="Request Export Inventory"
        width="w-4/5"
      >
        <div className="w-full flex flex-col gap-4 mt-6">
          <div className="w-full grid grid-cols-2 gap-4">
            <InputEdit
              titleInput="ID"
              width="w-[536px]"
              value={selectedItem?.id ?? ""}
              onChange={handleChange}
              name="id"
              placeholder="Enter ID"
            />

            <InputDate
              titleInput="Created at"
              width="w-[536px]"
              value={selectedItem ? formatDate(selectedItem.createAt) : ""}
              onChange={handleDateChange}
            />
            <InputSelection
              titleInput="Status"
              options={["Pending", "Confirmed", "In progress"]}
              width="w-[536px]" // Chiều rộng custom (có thể thay bằng lớp Tailwind CSS)
              value={selectedItem?.status.toString() ?? ""}
              onChange={handleSelectionChange}
            />

            <InputSelection
              titleInput="Order Id"
              options={["001", "002", "003", "004", "005", "006", "007", "008"]}
              width="w-[536px]" // Chiều rộng custom (có thể thay bằng lớp Tailwind CSS)
              value={selectedValue}
              onChange={handleSelectionChange}
            />

            <InputSelection
              options={["S101", "S102", "S103", "S104", "S105"]} // Tùy chỉnh danh sách options
              titleInput="Staff id"
              width="w-[536px]"
              value={selectedItem?.staffId ?? ""}
              onChange={(value) =>
                handleStaffChange(value as keyof typeof staffMapping)
              }
            />

            <InputEdit
              titleInput="Staff name"
              width="w-[536px]"
              value={selectedItem?.staffName ?? ""}
              onChange={handleChange}
              name="staffName"
              placeholder="Staff Name"
            />
          </div>
          <div className="w-full p-4 flex items-end justify-end gap-4 mt-14">
            <ButtonFunction
              event={handleCancel}
              title="Cancel"
              width="w-[86px]"
              background="bg-white"
              border_radius="rounded-[8px]"
              height="h-[36px]"
              text_color="text-text-dark-500"
              border_color="border-gray-400"
            />
            <ButtonFunction
              event={handleSave}
              title="Save"
              width="w-[86px]"
              background="bg-dark-green"
              border_radius="rounded-[8px]"
              height="h-[36px]"
              text_color="text-white"
              border_color="border-gray-400"
            />
          </div>
        </div>
      </Overlay>
    </div>
  );
};

export default DashboardRequestExportList;
