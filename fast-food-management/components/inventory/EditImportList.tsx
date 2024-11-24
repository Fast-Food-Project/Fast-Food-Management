"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../shared/orther/SearchBar";
import FilterButton from "../shared/button/FilterButton";
import { PaginationProps } from "@/types/pagination";
import Table from "../shared/orther/Table";
import PaginationUI from "../shared/orther/Pagination";
import LabelStatus from "../shared/label/LabelStatus";
import { InventoryListData } from "@/constants/data";
import SelectionProductCard from "./SelectionProductCard";
import ButtonFunction from "../shared/button/ButtonFunction";
import { useRouter } from "next/navigation";

type UserTable = {
  id: string;
  name: string;
  stockLevel: number;
  unit: string;
  supplier: string;
  status: number;
};

const columns = [
  { header: "ID", accessor: "id" },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Stock Level",
    accessor: "stockLevel",
  },
  { header: "Unit", accessor: "unit" },
  { header: "Supplier", accessor: "supplier" },
  { header: "Status", accessor: "status" },
];

const EditImportList = ({ nameAction }: { nameAction: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<UserTable[]>([]); // State to track selected items
  const rowsPerPage = 8;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = InventoryListData.slice(startIndex, endIndex);
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages: Math.ceil(InventoryListData.length / itemsPerPage),
    dataLength: InventoryListData.length,
  };
  const router = useRouter(); // Initialize the router

  const handleCloseClick = () => {
    router.back(); // Navigate back to the previous page
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Function to handle row click and add item to selection
  const handleSelectItem = (item: UserTable) => {
    const isItemAlreadySelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );

    if (!isItemAlreadySelected) {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  // Function to handle delete action and remove item from selection
  const handleDeleteSelectedItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const renderRow = (item: UserTable) => (
    <tr
      key={item.id}
      className="my-4 border-t border-gray-300 text-sm cursor-pointer"
      onClick={() => handleSelectItem(item)} // Handle row click to select item
    >
      <td className="px-4 py-2">
        <h3 className="text-base">{item.id}</h3>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.name}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.stockLevel}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.unit}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.supplier}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <div className="text-base text-text-dark-500">
          {item.status === 0 ? (
            <LabelStatus
              background="bg-light-red"
              text_color="text-dark-red"
              title="Out of stock"
            />
          ) : item.status === 1 ? (
            <LabelStatus
              background="bg-light-yellow"
              text_color="text-dark-yellow"
              title="Expired"
            />
          ) : (
            <LabelStatus
              background="bg-light-green"
              text_color="text-dark-green"
              title="In stock"
            />
          )}
        </div>
      </td>
    </tr>
  );

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm); // Add logic for handling search
  };

  const handleSetFilter = (filter: string) => {
    console.log("Selected filter:", filter); // Update state or trigger API calls based on filter
  };

  const filterStatus = ["Date", "Name", "Id"];

  const handleCreate = () => {};

  return (
    <div className="w-full flex flex-col gap-2 mt-4">
      {/* Search and Filter Section */}
      <div className="flex gap-2">
        <SearchBar onSearch={handleSearch} />
        <FilterButton status_title={filterStatus} SetFilter={handleSetFilter} />
      </div>
      <div className="w-full px-4">
        <Table columns={columns} renderRow={renderRow} data={currentData} />
      </div>
      {/* PAGINATION */}
      <div className=" mt-4 flex items-center justify-center p-4 text-sm text-text-dark-500 md:justify-between">
        <PaginationUI paginationUI={paginationUI} />
      </div>

      {/* Display selected products */}
      <div className="flex-col w-full py-4">
        {selectedItems.length > 0 && (
          <p className="text-[20px] text-text-dark-500 pb-4">
            Your selected products:
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {selectedItems.map((item, index) => (
            <SelectionProductCard
              key={`${item.id}`}
              item={item}
              background={index % 2 === 0 ? "bg-white" : "bg-active-background"} // Kiểm tra chỉ số của item
              onClick={() => handleDeleteSelectedItem(item.id)} // Xóa item khỏi selection
            />
          ))}
        </div>
      </div>
      <div className="w-full p-4 flex items-center justify-end gap-4">
        <ButtonFunction
          event={handleCloseClick}
          title="Cancel"
          width="w-[86px]"
          background="bg-white"
          border_radius="rounded-[8px]"
          height="h-[36px]"
          text_color="text-text-dark-500"
          border_color="border-gray-400"
        />
        <ButtonFunction
          event={handleCreate}
          title={nameAction}
          width="w-[86px]"
          background="bg-dark-green"
          border_radius="rounded-[8px]"
          height="h-[36px]"
          text_color="text-white"
          border_color="border-active-background"
        />
      </div>
    </div>
  );
};

export default EditImportList;
